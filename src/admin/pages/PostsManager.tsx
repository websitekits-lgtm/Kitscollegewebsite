import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Check, X, Loader2, ExternalLink, Search } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { POST_CATEGORIES, PostRow } from "@/lib/usePosts";
import { formatEventDate } from "@/lib/events";
import { MediaField } from "../components/MediaPicker";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY_FORM = {
  title: "", slug: "", category: "News", excerpt: "", body: "",
  cover_image_url: "", attachment_url: "", attachment_name: "",
  event_date: today(), is_published: true,
};

const PostsManager = () => {
  const [rows, setRows] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const load = async () => {
    if (!supabase) return setLoading(false);
    const { data } = await supabase.from("posts").select("*").order("event_date", { ascending: false });
    setRows((data as PostRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const set = <K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const resetForm = () => {
    setForm({ ...EMPTY_FORM, event_date: today() });
    setEditingId(null);
    setShowForm(false);
    setSlugTouched(false);
  };

  const startEdit = (row: PostRow) => {
    setForm({
      title: row.title, slug: row.slug, category: row.category, excerpt: row.excerpt ?? "", body: row.body,
      cover_image_url: row.cover_image_url ?? "", attachment_url: row.attachment_url ?? "", attachment_name: row.attachment_name ?? "",
      event_date: row.event_date, is_published: row.is_published,
    });
    setEditingId(row.id);
    setSlugTouched(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (publish: boolean) => {
    if (!supabase) return;
    if (!form.title.trim()) return alert("Enter a title.");
    const slug = slugify(form.slug || form.title);
    if (!slug) return alert("The page address can't be empty.");
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug,
      category: form.category,
      excerpt: form.excerpt.trim() || null,
      body: form.body.trim(),
      cover_image_url: form.cover_image_url || null,
      attachment_url: form.attachment_url || null,
      attachment_name: form.attachment_url ? (form.attachment_name.trim() || null) : null,
      event_date: form.event_date || today(),
      is_published: publish,
      updated_at: new Date().toISOString(),
    };
    const { error } = editingId
      ? await supabase.from("posts").update(payload).eq("id", editingId)
      : await supabase.from("posts").insert(payload);
    setSaving(false);
    if (error) {
      return alert(error.message.includes("duplicate") ? `Another post already uses the address /events/${slug}. Change the title or address.` : error.message);
    }
    resetForm();
    load();
  };

  const togglePublished = async (row: PostRow) => {
    if (!supabase) return;
    await supabase.from("posts").update({ is_published: !row.is_published }).eq("id", row.id);
    load();
  };

  const remove = async (row: PostRow) => {
    if (!supabase || !confirm(`Delete "${row.title}"?`)) return;
    await supabase.from("posts").delete().eq("id", row.id);
    load();
  };

  const visible = rows.filter((r) => {
    if (statusFilter === "published" && !r.is_published) return false;
    if (statusFilter === "draft" && r.is_published) return false;
    return !query || r.title.toLowerCase().includes(query.toLowerCase());
  });
  const publishedCount = rows.filter((r) => r.is_published).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Posts — News & Events</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
          <Plus className="size-4" /> Add New Post
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Posts appear in "Recent Events & Achievements" on the homepage, on <a href="/news" target="_blank" className="text-accent hover:underline">/news</a>, and each gets its own page. Changes show on the live site instantly.
      </p>

      {showForm && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">{editingId ? "Edit Post" : "New Post"}</h2>
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => { set("title", e.target.value); if (!slugTouched) set("slug", slugify(e.target.value)); }}
                  placeholder="e.g. KITS students win state-level hackathon"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
                />
                <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  /events/
                  <input value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} className="flex-1 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Short summary (shown on cards)</label>
                <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full content</label>
                <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={10} placeholder={"Write the full article.\n\nLeave a blank line between paragraphs."} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm leading-relaxed" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm">
                    {[...new Set([...POST_CATEGORIES, form.category])].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Date</label>
                  <input type="date" value={form.event_date} onChange={(e) => set("event_date", e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm" />
                </div>
              </div>
              <MediaField label="Cover image" value={form.cover_image_url} onChange={(url) => set("cover_image_url", url)} folder="posts" />
              <MediaField
                label="Attachment (optional): PDF, brochure, circular…"
                accept="all"
                value={form.attachment_url}
                onChange={(url, item) => setForm((f) => ({ ...f, attachment_url: url, attachment_name: item ? item.title : url ? f.attachment_name : "" }))}
                folder="posts"
              />
              {form.attachment_url && (
                <input value={form.attachment_name} onChange={(e) => set("attachment_name", e.target.value)} placeholder="Button text, e.g. Download Circular" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <button onClick={() => handleSubmit(true)} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {editingId && form.is_published ? "Update" : "Publish"}
            </button>
            <button onClick={() => handleSubmit(false)} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">
              Save as Draft
            </button>
            <button onClick={resetForm} className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-slate-500 hover:bg-slate-100">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {([["all", `All (${rows.length})`], ["published", `Published (${publishedCount})`], ["draft", `Drafts (${rows.length - publishedCount})`]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setStatusFilter(k)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusFilter === k ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}>{label}</button>
        ))}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts…" className="rounded-md border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Title</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Category</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Date</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
              <th className="text-right font-medium text-slate-500 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && visible.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No posts found.</td></tr>}
            {visible.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {row.cover_image_url ? <img src={row.cover_image_url} alt="" className="size-10 rounded object-cover shrink-0" /> : <div className="size-10 rounded bg-slate-100 shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 line-clamp-1">{row.title}</p>
                      <a href={`/events/${row.slug}`} target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent font-mono inline-flex items-center gap-1 hover:underline">
                        /events/{row.slug} <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.category}</td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatEventDate(row.event_date)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => togglePublished(row)} className={`text-xs font-semibold px-2 py-1 rounded-full ${row.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {row.is_published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => startEdit(row)} className="text-slate-400 hover:text-accent"><Pencil className="size-4" /></button>
                  <button onClick={() => remove(row)} className="text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsManager;
