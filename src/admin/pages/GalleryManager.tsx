import { useEffect, useRef, useState } from "react";
import { Upload, Loader2, Trash2, Eye, EyeOff, ArrowLeft, ArrowRight, FolderOpen, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { uploadMedia } from "@/lib/media";
import { MediaPickerDialog } from "../components/MediaPicker";

interface GalleryRow {
  id: string;
  image_url: string;
  caption: string | null;
  category: string;
  sort_order: number;
  is_active: boolean;
}

const DEFAULT_CATEGORIES = ["Campus", "Labs", "Events", "Sports", "Cultural", "Placements"];

const GalleryManager = () => {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Campus");
  const [newCategory, setNewCategory] = useState("");
  const [filter, setFilter] = useState("All");
  const [progress, setProgress] = useState<{ done: number; total: number; errors: string[] } | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!supabase) return setLoading(false);
    const { data } = await supabase.from("gallery_items").select("*").order("sort_order");
    setRows((data as GalleryRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const categories = Array.from(new Set([...DEFAULT_CATEGORIES, ...rows.map((r) => r.category)]));
  const targetCategory = newCategory.trim() || category;

  const addRow = async (url: string, caption: string | null, offset: number) => {
    const { error } = await supabase!.from("gallery_items").insert({
      image_url: url, caption, category: targetCategory, sort_order: rows.length + offset,
    });
    if (error) throw new Error(error.message);
  };

  const uploadFiles = async (files: FileList) => {
    if (!supabase) return;
    const list = Array.from(files);
    setProgress({ done: 0, total: list.length, errors: [] });
    for (let i = 0; i < list.length; i++) {
      try {
        const item = await uploadMedia(list[i], { folder: "gallery" });
        await addRow(item.file_url, null, i);
      } catch (e) {
        setProgress((p) => p && { ...p, errors: [...p.errors, `${list[i].name}: ${(e as Error).message}`] });
      }
      setProgress((p) => p && { ...p, done: i + 1 });
    }
    setNewCategory("");
    await load();
  };

  const update = async (id: string, patch: Partial<GalleryRow>) => {
    if (!supabase) return;
    await supabase.from("gallery_items").update(patch).eq("id", id);
    load();
  };

  const remove = async (row: GalleryRow) => {
    if (!supabase || !confirm("Remove this photo from the gallery? (The file stays in the Media Library.)")) return;
    await supabase.from("gallery_items").delete().eq("id", row.id);
    load();
  };

  /** Swap sort order with the neighbour in the full list. */
  const move = async (index: number, dir: -1 | 1) => {
    if (!supabase) return;
    const a = rows[index], b = rows[index + dir];
    if (!a || !b) return;
    await Promise.all([
      supabase.from("gallery_items").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("gallery_items").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    // Rows may share a sort_order (bulk uploads); renumber if the swap was a no-op.
    if (a.sort_order === b.sort_order) {
      const reordered = [...rows];
      [reordered[index], reordered[index + dir]] = [reordered[index + dir], reordered[index]];
      await Promise.all(reordered.map((r, i) => supabase!.from("gallery_items").update({ sort_order: i }).eq("id", r.id)));
    }
    load();
  };

  const busy = progress !== null && progress.done < progress.total;
  const visible = filter === "All" ? rows : rows.filter((r) => r.category === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Gallery</h1>
      <p className="text-sm text-slate-500 mb-6">
        Photos shown on the <a href="/gallery" target="_blank" className="text-accent hover:underline">Gallery page</a>. Upload many at once. They appear on the website immediately.
      </p>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Add photos to category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!newCategory.trim()} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">…or a new category</label>
          <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Convocation 2026" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) uploadFiles(e.target.files); e.target.value = ""; }} />
        <button onClick={() => fileRef.current?.click()} disabled={busy} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Upload Photos
        </button>
        <button onClick={() => setPickerOpen(true)} disabled={busy} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
          <FolderOpen className="size-4" /> From Media Library
        </button>
        {progress && (
          <div className="w-full text-xs">
            <p className="text-slate-600">{busy ? `Uploading ${progress.done + 1} of ${progress.total}…` : `Uploaded ${progress.total - progress.errors.length} of ${progress.total} photos.`}</p>
            {progress.errors.map((e) => <p key={e} className="text-red-600">{e}</p>)}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["All", ...categories.filter((c) => rows.some((r) => r.category === c))].map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${filter === c ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}>
            {c} {c === "All" ? `(${rows.length})` : `(${rows.filter((r) => r.category === c).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && <p className="col-span-full py-10 text-center text-sm text-slate-400">Loading…</p>}
        {!loading && visible.length === 0 && <p className="col-span-full py-10 text-center text-sm text-slate-400">No photos yet.</p>}
        {visible.map((row) => {
          const index = rows.indexOf(row);
          const caption = captions[row.id] ?? row.caption ?? "";
          const dirty = caption !== (row.caption ?? "");
          return (
            <div key={row.id} className={`rounded-xl border bg-white overflow-hidden ${row.is_active ? "border-slate-200" : "border-dashed border-slate-300 opacity-60"}`}>
              <img src={row.image_url} alt={row.caption ?? ""} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <div className="p-2.5 space-y-2">
                <select value={row.category} onChange={(e) => update(row.id, { category: e.target.value })} className="w-full rounded border border-slate-200 px-2 py-1 text-xs">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <div className="flex gap-1">
                  <input value={caption} onChange={(e) => setCaptions((m) => ({ ...m, [row.id]: e.target.value }))} placeholder="Caption (optional)" className="flex-1 min-w-0 rounded border border-slate-200 px-2 py-1 text-xs" />
                  {dirty && (
                    <button onClick={() => update(row.id, { caption: caption.trim() || null })} className="rounded bg-accent px-1.5 text-accent-foreground" title="Save caption"><Check className="size-3.5" /></button>
                  )}
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex gap-1.5">
                    <button onClick={() => move(index, -1)} disabled={index === 0} className="hover:text-accent disabled:opacity-30" title="Move earlier"><ArrowLeft className="size-4" /></button>
                    <button onClick={() => move(index, 1)} disabled={index === rows.length - 1} className="hover:text-accent disabled:opacity-30" title="Move later"><ArrowRight className="size-4" /></button>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => update(row.id, { is_active: !row.is_active })} className="hover:text-accent" title={row.is_active ? "Hide" : "Show"}>
                      {row.is_active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                    </button>
                    <button onClick={() => remove(row)} className="hover:text-red-500" title="Remove"><Trash2 className="size-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MediaPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        accept="image"
        folder="gallery"
        onSelect={async (item) => {
          try { await addRow(item.file_url, item.alt_text, 0); setNewCategory(""); load(); }
          catch (e) { alert((e as Error).message); }
        }}
      />
    </div>
  );
};

export default GalleryManager;
