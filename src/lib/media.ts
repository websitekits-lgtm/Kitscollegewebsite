import { supabase } from "@/lib/supabaseClient";

/** Matches the bucket limit set in scripts/migrate-v7.sql. */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export interface MediaItem {
  id: string;
  title: string;
  alt_text: string | null;
  file_name: string;
  file_url: string;
  bucket: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  folder: string;
  created_at: string;
}

export type MediaKind = "image" | "video" | "audio" | "pdf" | "document" | "other";

export const formatBytes = (bytes: number | null | undefined): string => {
  if (!bytes) return "";
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

export const mediaKind = (mime: string | null | undefined, name = ""): MediaKind => {
  const m = mime ?? "";
  if (m.startsWith("image/")) return "image";
  if (m.startsWith("video/")) return "video";
  if (m.startsWith("audio/")) return "audio";
  if (m === "application/pdf" || /\.pdf$/i.test(name)) return "pdf";
  if (/word|excel|spreadsheet|presentation|powerpoint|msword|text\//.test(m) || /\.(docx?|xlsx?|pptx?|csv|txt)$/i.test(name)) return "document";
  return "other";
};

export const isImageUrl = (url: string | null | undefined) =>
  !!url && /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(url);

const titleFromFileName = (name: string) =>
  name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim() || name;

/**
 * Uploads a file to Supabase Storage and records it in the Media Library.
 * Every admin upload goes through here, so every file shows up under Admin → Media.
 */
export const uploadMedia = async (
  file: File,
  opts: { folder?: string; bucket?: string; title?: string } = {},
): Promise<MediaItem> => {
  if (!supabase) throw new Error("Supabase is not configured.");
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`"${file.name}" is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_UPLOAD_BYTES)} per file.`);
  }

  const bucket = opts.bucket ?? "media";
  const folder = (opts.folder ?? "general").replace(/[^a-zA-Z0-9/_-]/g, "-");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${safeName}`;

  const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type || undefined,
    cacheControl: "3600",
  });
  if (upErr) {
    if (/row-level security|unauthorized|jwt/i.test(upErr.message)) {
      throw new Error("Your admin session has expired. Sign in again and retry the upload.");
    }
    throw new Error(upErr.message);
  }

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);

  const { data, error } = await supabase
    .from("media_library")
    .insert({
      title: opts.title?.trim() || titleFromFileName(file.name),
      file_name: file.name,
      file_url: pub.publicUrl,
      bucket,
      storage_path: path,
      mime_type: file.type || null,
      size_bytes: file.size,
      folder,
    })
    .select("*")
    .single();

  if (error) {
    // Don't leave an orphaned file in storage if the library row failed.
    await supabase.storage.from(bucket).remove([path]);
    throw new Error(error.message);
  }
  return data as MediaItem;
};

/** Deletes the file from storage and its Media Library row. */
export const deleteMedia = async (item: Pick<MediaItem, "id" | "bucket" | "storage_path">) => {
  if (!supabase) return;
  const { error } = await supabase.storage.from(item.bucket).remove([item.storage_path]);
  if (error) throw new Error(error.message);
  await supabase.from("media_library").delete().eq("id", item.id);
};

/**
 * Removes a file given only its public URL (used when a document/image slot is
 * replaced). Silently ignores URLs that aren't in our storage.
 */
export const deleteMediaByUrl = async (url: string | null | undefined) => {
  if (!supabase || !url) return;
  const { data } = await supabase.from("media_library").select("id, bucket, storage_path").eq("file_url", url).maybeSingle();
  if (data) await deleteMedia(data as MediaItem);
};
