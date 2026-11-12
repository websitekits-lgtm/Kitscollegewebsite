import { useEffect, useRef, useState, DragEvent } from "react";
import { Upload, Loader2, Search, Trash2, Copy, ExternalLink, Check, X, CloudUpload } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { MediaItem, MediaKind, deleteMedia, formatBytes, mediaKind, uploadMedia, MAX_UPLOAD_BYTES } from "@/lib/media";
import { MediaThumb } from "../components/MediaPicker";

type Filter = "all" | MediaKind;
const FILTERS: [Filter, string][] = [
  ["all", "All"], ["image", "Images"], ["pdf", "PDFs"], ["document", "Documents"], ["video", "Videos"], ["audio", "Audio"], ["other", "Other"],
];

interface UploadJob { name: string; status: "uploading" | "done" | "error"; message?: string }

const MediaLibrary = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<UploadJob[]>([]);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [edit, setEdit] = useState({ title: "", alt_text: "" });
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!supabase) return setLoading(false);
    const { data } = await supabase.from("media_library").select("*").order("created_at", { ascending: false });
    setItems((data as MediaItem[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;
    setJobs(list.map((f) => ({ name: f.name, status: "uploading" })));
    // Upload sequentially so a big batch doesn't trip rate limits.
    for (let i = 0; i < list.length; i++) {
      try {
        await uploadMedia(list[i], { folder: "library" });
        setJobs((j) => j.map((job, idx) => (idx === i ? { ...job, status: "done" } : job)));
      } catch (e) {
        setJobs((j) => j.map((job, idx) => (idx === i ? { ...job, status: "error", message: (e as Error).message } : job)));
      }
    }
    await load();
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  const select = (item: MediaItem) => {
    setSelected(item);
    setEdit({ title: item.title, alt_text: item.alt_text ?? "" });
    setCopied(false);
  };

  const saveDetails = async () => {
    if (!supabase || !selected) return;
    setSaving(true);
    const { error } = await supabase.from("media_library").update({ title: edit.title.trim() || selected.file_name, alt_text: edit.alt_text.trim() || null }).eq("id", selected.id);
    setSaving(false);
    if (error) return alert(error.message);
    await load();
  };

  const remove = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.title}" permanently?\n\nIf this file is used anywhere on the website (a page, post, gallery or document), that link will stop working.`)) return;
    try {
      await deleteMedia(item);
      setSelected(null);
      await load();
    } catch (e) {
      alert(`Delete failed: ${(e as Error).message}`);
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const visible = items.filter((i) => {
    if (filter !== "all" && mediaKind(i.mime_type, i.file_name) !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return i.title.toLowerCase().includes(q) || i.file_name.toLowerCase().includes(q);
  });

  const totalBytes = items.reduce((sum, i) => sum + (i.size_bytes ?? 0), 0);
  const uploading = jobs.some((j) => j.status === "uploading");

  return (
    <div>
      <div className="flex items-center justify-between mb-1 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
        <div className="flex items-center gap-2">
          <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => { if (e.target.files) uploadFiles(e.target.files); e.target.value = ""; }} />
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Add New Files
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-5">
        Every image, PDF, video or document uploaded anywhere in the admin is stored here. Any file type, up to {formatBytes(MAX_UPLOAD_BYTES)} each.
        {items.length > 0 && <> {items.length} files · {formatBytes(totalBytes)} used.</>}
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className={`mb-5 cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${dragging ? "border-accent bg-accent/10" : "border-slate-300 bg-white hover:border-accent/60"}`}
      >
        <CloudUpload className="size-8 mx-auto text-slate-400 mb-2" />
        <p className="text-sm font-medium text-slate-700">Drop files here to upload</p>
        <p className="text-xs text-slate-400">or click to choose. You can select several files at once.</p>
      </div>

      {jobs.length > 0 && (
        <div className="mb-5 rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
          {jobs.map((j, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2 text-sm">
              {j.status === "uploading" && <Loader2 className="size-4 animate-spin text-accent" />}
              {j.status === "done" && <Check className="size-4 text-green-600" />}
              {j.status === "error" && <X className="size-4 text-red-500" />}
              <span className="flex-1 truncate text-slate-700">{j.name}</span>
              {j.message && <span className="text-xs text-red-600">{j.message}</span>}
            </div>
          ))}
          {!uploading && (
            <button onClick={() => setJobs([])} className="w-full px-4 py-2 text-xs text-slate-500 hover:bg-slate-50">Dismiss</button>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {FILTERS.map(([f, label]) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${filter === f ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}>
            {label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search media…" className="rounded-md border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
      </div>

      <div className="flex gap-5 items-start">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {loading && <p className="col-span-full py-10 text-center text-sm text-slate-400">Loading…</p>}
          {!loading && visible.length === 0 && <p className="col-span-full py-10 text-center text-sm text-slate-400">No files found.</p>}
          {visible.map((item) => (
            <button
              key={item.id}
              onClick={() => select(item)}
              className={`text-left rounded-lg border bg-white overflow-hidden transition-all ${selected?.id === item.id ? "border-accent ring-2 ring-accent/40" : "border-slate-200 hover:border-accent/60"}`}
            >
              <MediaThumb item={item} className="w-full aspect-square" />
              <div className="px-2 py-1.5">
                <p className="text-[11px] font-medium text-slate-700 truncate">{item.title}</p>
                <p className="text-[10px] text-slate-400">{formatBytes(item.size_bytes)}</p>
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <aside className="w-72 shrink-0 sticky top-6 rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">File details</p>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700"><X className="size-4" /></button>
            </div>
            <MediaThumb item={selected} className="w-full aspect-video rounded-md" />
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <p className="truncate"><span className="font-medium text-slate-700">File:</span> {selected.file_name}</p>
              <p><span className="font-medium text-slate-700">Type:</span> {selected.mime_type || "unknown"}</p>
              <p><span className="font-medium text-slate-700">Size:</span> {formatBytes(selected.size_bytes)}</p>
              <p><span className="font-medium text-slate-700">Uploaded:</span> {new Date(selected.created_at).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
              <input value={edit.title} onChange={(e) => setEdit((s) => ({ ...s, title: e.target.value }))} className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm" />
            </div>
            {mediaKind(selected.mime_type, selected.file_name) === "image" && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Alt text (for accessibility & SEO)</label>
                <input value={edit.alt_text} onChange={(e) => setEdit((s) => ({ ...s, alt_text: e.target.value }))} className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm" />
              </div>
            )}
            <button onClick={saveDetails} disabled={saving} className="w-full inline-flex justify-center items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />} Save details
            </button>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">File URL</label>
              <div className="flex gap-1">
                <input readOnly value={selected.file_url} className="flex-1 min-w-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-mono" />
                <button onClick={() => copyUrl(selected.file_url)} className="rounded-md border border-slate-300 px-2 text-slate-600 hover:bg-slate-50" title="Copy URL">
                  {copied ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
                </button>
              </div>
              <p className="mt-1 text-[10px] text-slate-400">Paste this link into any button, menu item or page field.</p>
            </div>
            <div className="flex gap-2 pt-1">
              <a href={selected.file_url} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                <ExternalLink className="size-3.5" /> Open
              </a>
              <button onClick={() => remove(selected)} className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
                <Trash2 className="size-3.5" /> Delete
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
