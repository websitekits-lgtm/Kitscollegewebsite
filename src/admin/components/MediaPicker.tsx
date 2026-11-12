import { useEffect, useRef, useState } from "react";
import { Upload, Loader2, FileText, Film, Music, File as FileIcon, Search, Check, X, ImageIcon, FolderOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { MediaItem, MediaKind, formatBytes, isImageUrl, mediaKind, uploadMedia } from "@/lib/media";

export const MediaThumb = ({ item, className = "" }: { item: Pick<MediaItem, "file_url" | "mime_type" | "file_name" | "title">; className?: string }) => {
  const kind = mediaKind(item.mime_type, item.file_name);
  if (kind === "image") {
    return <img src={item.file_url} alt={item.title} loading="lazy" className={`object-cover ${className}`} />;
  }
  const Icon = kind === "video" ? Film : kind === "audio" ? Music : kind === "pdf" || kind === "document" ? FileText : FileIcon;
  const ext = item.file_name.split(".").pop()?.toUpperCase().slice(0, 5) ?? "";
  return (
    <div className={`grid place-items-center bg-slate-100 text-slate-500 ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <Icon className="size-7" />
        <span className="text-[10px] font-bold tracking-wide">{ext}</span>
      </div>
    </div>
  );
};

type Filter = "all" | MediaKind;

/** Modal that lets the admin pick an existing file from the Media Library or upload a new one. */
export const MediaPickerDialog = ({
  open,
  onOpenChange,
  onSelect,
  accept = "all",
  folder = "general",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: MediaItem) => void;
  accept?: "image" | "all";
  folder?: string;
}) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || !supabase) return;
    setLoading(true);
    setError("");
    supabase
      .from("media_library")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data }) => {
        setItems((data as MediaItem[]) ?? []);
        setLoading(false);
      });
  }, [open]);

  const filter: Filter = accept === "image" ? "image" : "all";
  const visible = items.filter((i) => {
    if (filter !== "all" && mediaKind(i.mime_type, i.file_name) !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return i.title.toLowerCase().includes(q) || i.file_name.toLowerCase().includes(q);
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const item = await uploadMedia(file, { folder });
      onSelect(item);
      onOpenChange(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{accept === "image" ? "Choose an image" : "Choose a file"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the media library…" className="w-full rounded-md border border-slate-300 pl-9 pr-3 py-2 text-sm" />
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={accept === "image" ? "image/*" : undefined}
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload new
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="max-h-[55vh] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pr-1">
          {loading && <p className="col-span-full py-10 text-center text-sm text-slate-400">Loading…</p>}
          {!loading && visible.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-slate-400">
              Nothing here yet. Click "Upload new" to add a file.
            </p>
          )}
          {visible.map((item) => (
            <button
              key={item.id}
              onClick={() => { onSelect(item); onOpenChange(false); }}
              className="group text-left rounded-lg border border-slate-200 overflow-hidden hover:border-accent hover:ring-2 hover:ring-accent/30"
            >
              <MediaThumb item={item} className="w-full aspect-square" />
              <div className="px-2 py-1.5">
                <p className="text-[11px] font-medium text-slate-700 truncate">{item.title}</p>
                <p className="text-[10px] text-slate-400">{formatBytes(item.size_bytes)}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Form field for an image or file URL: shows a preview, uploads directly,
 * or picks from the Media Library. `value` is the public URL.
 */
export const MediaField = ({
  value,
  onChange,
  accept = "image",
  folder = "general",
  label,
}: {
  value: string;
  onChange: (url: string, item?: MediaItem) => void;
  accept?: "image" | "all";
  folder?: string;
  label?: string;
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const item = await uploadMedia(file, { folder });
      onChange(item.file_url, item);
    } catch (e) {
      alert(`Upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const fileName = value ? decodeURIComponent(value.split("/").pop() ?? "").replace(/^\d+-[a-z0-9]{5}-/, "") : "";

  return (
    <div>
      {label && <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>}
      <div className="flex items-center gap-3 rounded-md border border-slate-300 bg-white p-2">
        <div className="size-14 shrink-0 overflow-hidden rounded bg-slate-100 grid place-items-center">
          {value && (accept === "image" || isImageUrl(value)) ? (
            <img src={value} alt="" className="size-full object-cover" />
          ) : value ? (
            <FileText className="size-6 text-accent" />
          ) : accept === "image" ? (
            <ImageIcon className="size-6 text-slate-300" />
          ) : (
            <FileIcon className="size-6 text-slate-300" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {value ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="block text-xs text-accent truncate hover:underline">{fileName}</a>
          ) : (
            <p className="text-xs text-slate-400">{accept === "image" ? "No image selected" : "No file selected"}</p>
          )}
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <input
              ref={fileRef}
              type="file"
              accept={accept === "image" ? "image/*" : undefined}
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
            />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50">
              {uploading ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
              {value ? "Replace" : "Upload"}
            </button>
            <button type="button" onClick={() => setPickerOpen(true)} className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
              <FolderOpen className="size-3" /> Media Library
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-red-500">
                <X className="size-3" /> Remove
              </button>
            )}
          </div>
        </div>
        {value && <Check className="size-4 text-green-600 shrink-0" />}
      </div>
      <MediaPickerDialog open={pickerOpen} onOpenChange={setPickerOpen} accept={accept} folder={folder} onSelect={(item) => onChange(item.file_url, item)} />
    </div>
  );
};
