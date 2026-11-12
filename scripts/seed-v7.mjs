// Copies the built-in news posts (src/lib/events.ts) and gallery photos into
// Supabase so they become editable in Admin → Posts / Gallery / Media Library.
// Images are uploaded to the "media" storage bucket. Safe to re-run: it skips
// posts/gallery if those tables already have rows, and reuses uploaded images.
//
// Usage: node scripts/seed-v7.mjs   (needs SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env"), quiet: true });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const uploaded = new Map(); // asset file name → public URL

/** Upload a file from src/assets once; returns its public URL. */
const uploadAsset = async (fileName) => {
  if (uploaded.has(fileName)) return uploaded.get(fileName);

  const { data: existing } = await supabase.from("media_library").select("file_url").eq("file_name", fileName).eq("folder", "seed").maybeSingle();
  if (existing) {
    uploaded.set(fileName, existing.file_url);
    return existing.file_url;
  }

  const buf = fs.readFileSync(path.join(root, "src/assets", fileName));
  const storagePath = `seed/${fileName}`;
  const contentType = MIME[path.extname(fileName).toLowerCase()] ?? "application/octet-stream";
  const { error } = await supabase.storage.from("media").upload(storagePath, buf, { contentType, upsert: true });
  if (error) throw new Error(`upload ${fileName}: ${error.message}`);
  const { data } = supabase.storage.from("media").getPublicUrl(storagePath);

  const title = fileName.replace(/\.[^.]+$/, "").replace(/-/g, " ");
  const { error: dbErr } = await supabase.from("media_library").insert({
    title, file_name: fileName, file_url: data.publicUrl, bucket: "media",
    storage_path: storagePath, mime_type: contentType, size_bytes: buf.length, folder: "seed",
  });
  if (dbErr) throw new Error(`media_library ${fileName}: ${dbErr.message}`);

  uploaded.set(fileName, data.publicUrl);
  console.log(`  uploaded ${fileName}`);
  return data.publicUrl;
};

// Load events.ts through Vite so the "@/assets/x.jpg" imports resolve to paths.
const vite = await createServer({ root, logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
const { EVENTS } = await vite.ssrLoadModule("/src/lib/events.ts");
await vite.close();

// ── Posts ──
const { count: postCount } = await supabase.from("posts").select("*", { count: "exact", head: true });
if (postCount > 0) {
  console.log(`posts: ${postCount} already exist, skipping.`);
} else {
  for (const e of EVENTS) {
    const cover = await uploadAsset(path.basename(String(e.image)).split("?")[0]);
    const { error } = await supabase.from("posts").insert({
      slug: e.slug, title: e.title, category: e.category, excerpt: e.excerpt,
      body: e.body.join("\n\n"), cover_image_url: cover, event_date: e.date, is_published: true,
    });
    if (error) throw new Error(`post ${e.slug}: ${error.message}`);
  }
  console.log(`posts: inserted ${EVENTS.length}.`);
}

// ── Gallery ──
const GALLERY = [
  ["hero-campus.jpg", "Campus"], ["campus-library.jpg", "Campus"], ["campus-lab.jpg", "Labs"],
  ["dept-cse.jpg", "Labs"], ["dept-mech.jpg", "Labs"], ["dept-ece.jpg", "Labs"],
  ["dept-eee.jpg", "Labs"], ["dept-civil.jpg", "Labs"], ["dept-aiml.jpg", "Labs"],
  ["campus-graduation.jpg", "Events"],
];
const { count: galleryCount } = await supabase.from("gallery_items").select("*", { count: "exact", head: true });
if (galleryCount > 0) {
  console.log(`gallery: ${galleryCount} already exist, skipping.`);
} else {
  for (let i = 0; i < GALLERY.length; i++) {
    const [file, category] = GALLERY[i];
    const url = await uploadAsset(file);
    const { error } = await supabase.from("gallery_items").insert({ image_url: url, category, sort_order: i });
    if (error) throw new Error(`gallery ${file}: ${error.message}`);
  }
  console.log(`gallery: inserted ${GALLERY.length}.`);
}

console.log("Done.");
