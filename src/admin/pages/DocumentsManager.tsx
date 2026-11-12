import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Loader2, FileText, ExternalLink, Plus, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { uploadMedia, formatBytes, MAX_UPLOAD_BYTES } from "@/lib/media";
import { SINGLE_DOC_SLOTS, DOC_CATEGORIES } from "@/lib/docRegistry";
import { ALL_COMMITTEES } from "@/lib/committeesContent";

interface DocRow {
  id: string;
  doc_key: string | null;
  category: string | null;
  title: string;
  label: string | null;
  file_url: string;
  file_name: string;
  file_size: string | null;
  storage_path: string | null;
  sort_order: number;
}

type Tab = "slots" | "lists" | "committees";

const DocumentsManager = () => {
  const [tab, setTab] = useState<Tab>("slots");
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [listCategory, setListCategory] = useState(DOC_CATEGORIES[0].key);
  const [listForm, setListForm] = useState({ title: "", label: "" });
  const [showListForm, setShowListForm] = useState(false);
  const listFileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("site_documents").select("*").order("sort_order");
    setDocs((data as DocRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const docByKey = (key: string) => docs.find((d) => d.doc_key === key);
  const docsInCategory = (cat: string) => docs.filter((d) => d.category === cat);

  /** Upload to the documents bucket (also listed in the Media Library); returns url + path + size. */
  const uploadFile = async (file: File, folder: string) => {
    const item = await uploadMedia(file, { bucket: "documents", folder });
    return { url: item.file_url, path: item.storage_path, size: formatBytes(file.size), name: file.name };
  };

  const removeStorageObject = async (storagePath: string | null) => {
    if (!storagePath) return;
    await supabase!.storage.from("documents").remove([storagePath]);
    await supabase!.from("media_library").delete().eq("bucket", "documents").eq("storage_path", storagePath);
  };

  /** Upload/replace a single-slot document (or a committee slot). */
  const handleSlotUpload = async (key: string, title: string, file: File, category?: string) => {
    if (!supabase) return;
    setBusyKey(key);
    try {
      const existing = docByKey(key);
      if (existing) await removeStorageObject(existing.storage_path); // no orphan files
      const up = await uploadFile(file, key.replace(/[^a-zA-Z0-9-]/g, "-"));
      const { error: dbErr } = await supabase.from("site_documents").upsert(
        {
          doc_key: key,
          category: category ?? null,
          title,
          file_url: up.url,
          file_name: up.name,
          file_size: up.size,
          storage_path: up.path,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "doc_key" },
      );
      if (dbErr) throw new Error(dbErr.message);
      await load();
    } catch (e) {
      alert(`Upload failed: ${(e as Error).message}`);
    } finally {
      setBusyKey(null);
    }
  };

  const handleDelete = async (row: DocRow) => {
    if (!supabase) return;
    if (!confirm(`Remove "${row.title}"? The file will be deleted from storage.`)) return;
    await removeStorageObject(row.storage_path);
    await supabase.from("site_documents").delete().eq("id", row.id);
    load();
  };

  /** Add a document to a list category (question papers, calendars, …). */
  const handleListUpload = async (file: File) => {
    if (!supabase || !listForm.title.trim()) {
      alert("Enter a document title first.");
      return;
    }
    setBusyKey("list-upload");
    try {
      const up = await uploadFile(file, listCategory);
      const count = docsInCategory(listCategory).length;
      const { error: dbErr } = await supabase.from("site_documents").insert({
        category: listCategory,
        title: listForm.title.trim(),
        label: listForm.label.trim() || null,
        file_url: up.url,
        file_name: up.name,
        file_size: up.size,
        storage_path: up.path,
        sort_order: count,
      });
      if (dbErr) throw new Error(dbErr.message);
      setListForm({ title: "", label: "" });
      setShowListForm(false);
      await load();
    } catch (e) {
      alert(`Upload failed: ${(e as Error).message}`);
    } finally {
      setBusyKey(null);
    }
  };

  const SlotUploadButton = ({ slotKey, title, category }: { slotKey: string; title: string; category?: string }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const existing = docByKey(slotKey);
    const busy = busyKey === slotKey;
    return (
      <div className="flex items-center gap-2 shrink-0">
        {existing && (
          <>
            <a href={existing.file_url} target="_blank" rel="noopener noreferrer" className="text-accent" title={existing.file_name}>
              <ExternalLink className="size-4" />
            </a>
            <button onClick={() => handleDelete(existing)} className="text-slate-400 hover:text-red-500" title="Remove document">
              <Trash2 className="size-4" />
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleSlotUpload(slotKey, title, f, category);
            e.target.value = "";
          }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
            existing ? "border border-slate-300 text-slate-600 hover:bg-slate-50" : "bg-accent text-accent-foreground hover:bg-accent/90"
          }`}
        >
          {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          {existing ? "Replace" : "Upload"}
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Documents & PDFs</h1>
      <p className="text-sm text-slate-500 mb-6">
        Upload the actual files behind every "Coming soon" button on the website. Any file type (PDF, Word, Excel, PowerPoint, images, ZIP…), up to {formatBytes(MAX_UPLOAD_BYTES)} each. Changes show on the website instantly.
      </p>

      <div className="flex gap-2 mb-6">
        {([
          ["slots", "Page Documents"],
          ["lists", "Document Lists"],
          ["committees", "Committee PDFs"],
        ] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${tab === t ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : tab === "slots" ? (
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
          {SINGLE_DOC_SLOTS.map((slot) => {
            const existing = docByKey(slot.key);
            return (
              <div key={slot.key} className="flex items-center gap-3 px-4 py-3">
                <FileText className={`size-4 shrink-0 ${existing ? "text-accent" : "text-slate-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{slot.label}</p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {existing ? `${existing.file_name} · ${existing.file_size ?? ""}` : `Shown on ${slot.page} — not uploaded yet`}
                  </p>
                </div>
                <SlotUploadButton slotKey={slot.key} title={slot.label} />
              </div>
            );
          })}
        </div>
      ) : tab === "lists" ? (
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <select
              value={listCategory}
              onChange={(e) => setListCategory(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
            >
              {DOC_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
            <span className="text-xs text-slate-400">
              Shown on {DOC_CATEGORIES.find((c) => c.key === listCategory)?.page}
            </span>
            <button
              onClick={() => setShowListForm(true)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <Plus className="size-3.5" /> Add Document
            </button>
          </div>

          {showListForm && (
            <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4 grid sm:grid-cols-2 gap-3">
              <input
                placeholder="Document title, e.g. Academic Calendar 2026-27 (UG)"
                value={listForm.title}
                onChange={(e) => setListForm((f) => ({ ...f, title: e.target.value }))}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Details (year / branch / semester) — optional"
                value={listForm.label}
                onChange={(e) => setListForm((f) => ({ ...f, label: e.target.value }))}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                ref={listFileRef}
                type="file"
                
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleListUpload(f);
                  e.target.value = "";
                }}
              />
              <div className="sm:col-span-2 flex gap-2">
                <button
                  onClick={() => listFileRef.current?.click()}
                  disabled={busyKey === "list-upload"}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                >
                  {busyKey === "list-upload" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                  Choose File & Upload
                </button>
                <button onClick={() => setShowListForm(false)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  <X className="size-4" /> Cancel
                </button>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
            {docsInCategory(listCategory).length === 0 && (
              <p className="px-4 py-8 text-sm text-slate-400 text-center">
                No documents yet — the website shows its "Coming soon" placeholders until you add some.
              </p>
            )}
            {docsInCategory(listCategory).map((d) => (
              <div key={d.id} className="flex items-center gap-3 px-4 py-3">
                <FileText className="size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{d.title}</p>
                  <p className="text-[11px] text-slate-400 truncate">{d.label ? `${d.label} · ` : ""}{d.file_name} · {d.file_size}</p>
                </div>
                <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="text-accent shrink-0"><ExternalLink className="size-4" /></a>
                <button onClick={() => handleDelete(d)} className="text-slate-400 hover:text-red-500 shrink-0"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
          {ALL_COMMITTEES.map((c) => {
            const key = `committee:${c.id}`;
            const existing = docByKey(key);
            return (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                <FileText className={`size-4 shrink-0 ${existing ? "text-accent" : "text-slate-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{c.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{existing ? `${existing.file_name} · ${existing.file_size ?? ""}` : "Members PDF not uploaded yet"}</p>
                </div>
                <SlotUploadButton slotKey={key} title={`${c.name} — Members`} category="committees" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentsManager;
