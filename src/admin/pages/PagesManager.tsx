import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Check, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface PageSection {
  heading: string;
  body: string;
  button_label: string;
  button_url: string;
}

interface CustomPageRow {
  id: string;
  slug: string;
  title: string;
  eyebrow: string | null;
  subtitle: string | null;
  sections: PageSection[];
  is_active: boolean;
}

interface NavParent {
  id: string;
  label: string;
  groups: { id: string; label: string }[];
}

const EMPTY_SECTION: PageSection = { heading: "", body: "", button_label: "", button_url: "" };
const EMPTY_FORM = {
  title: "", eyebrow: "", subtitle: "",
  sections: [{ ...EMPTY_SECTION }] as PageSection[],
  navParentId: "", navGroupId: "",
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

const PagesManager = () => {
  const [rows, setRows] = useState<CustomPageRow[]>([]);
  const [navParents, setNavParents] = useState<NavParent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const [pagesRes, navRes] = await Promise.all([
      supabase.from("custom_pages").select("*").order("created_at", { ascending: false }),
      supabase.from("nav_items").select("id, parent_id, label, kind").order("sort_order"),
    ]);
    setRows(((pagesRes.data as CustomPageRow[]) ?? []).map((p) => ({ ...p, sections: p.sections ?? [] })));

    const navRows = navRes.data ?? [];
    const tops = navRows.filter((n) => n.kind === "top" && n.label !== "Home");
    setNavParents(tops.map((t) => ({
      id: t.id,
      label: t.label,
      groups: navRows.filter((n) => n.parent_id === t.id && n.kind === "group").map((g) => ({ id: g.id, label: g.label })),
    })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (row: CustomPageRow) => {
    setForm({
      title: row.title,
      eyebrow: row.eyebrow ?? "",
      subtitle: row.subtitle ?? "",
      sections: row.sections.length ? row.sections.map((s) => ({ ...EMPTY_SECTION, ...s })) : [{ ...EMPTY_SECTION }],
      navParentId: "",
      navGroupId: "",
    });
    setEditingId(row.id);
    setShowForm(true);
  };

  const updateSection = (i: number, field: keyof PageSection, value: string) =>
    setForm((f) => ({ ...f, sections: f.sections.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)) }));

  const handleSubmit = async () => {
    if (!supabase || !form.title.trim()) return;
    setSaving(true);

    const sections = form.sections.filter((s) => s.heading.trim() || s.body.trim());

    if (editingId) {
      await supabase.from("custom_pages").update({
        title: form.title.trim(),
        eyebrow: form.eyebrow.trim() || null,
        subtitle: form.subtitle.trim() || null,
        sections,
        updated_at: new Date().toISOString(),
      }).eq("id", editingId);
    } else {
      const slug = slugify(form.title);
      const { data: created, error } = await supabase.from("custom_pages").insert({
        slug,
        title: form.title.trim(),
        eyebrow: form.eyebrow.trim() || null,
        subtitle: form.subtitle.trim() || null,
        sections,
      }).select("id, slug").single();

      if (error) {
        alert(error.message.includes("duplicate") ? "A page with this title already exists — use a different title." : error.message);
        setSaving(false);
        return;
      }

      // Attach to the chosen header dropdown
      if (created && form.navParentId) {
        const parentId = form.navGroupId || form.navParentId;
        const { count } = await supabase.from("nav_items").select("*", { count: "exact", head: true }).eq("parent_id", parentId);
        await supabase.from("nav_items").insert({
          parent_id: parentId,
          label: form.title.trim(),
          url: `/p/${created.slug}`,
          kind: "link",
          sort_order: count ?? 99,
        });
      }
    }

    setSaving(false);
    resetForm();
    load();
  };

  const toggleActive = async (row: CustomPageRow) => {
    if (!supabase) return;
    await supabase.from("custom_pages").update({ is_active: !row.is_active }).eq("id", row.id);
    load();
  };

  const remove = async (row: CustomPageRow) => {
    if (!supabase) return;
    if (!confirm(`Delete "${row.title}"? Its menu link (if any) will also be removed.`)) return;
    await supabase.from("nav_items").delete().eq("url", `/p/${row.slug}`);
    await supabase.from("custom_pages").delete().eq("id", row.id);
    load();
  };

  const selectedParent = navParents.find((p) => p.id === form.navParentId);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="size-4" /> Create New Page
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Create a complete new page (headings, paragraphs, optional buttons) and place it in any header dropdown — no developer needed.
      </p>

      {showForm && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">{editingId ? "Edit Page" : "New Page"}</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Page Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Alumni Meet 2026"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              {!editingId && form.title && (
                <p className="mt-1 text-[11px] text-slate-400 font-mono">Page address: /p/{slugify(form.title)}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Eyebrow (small label above title)</label>
              <input value={form.eyebrow} onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))} placeholder="e.g. Alumni" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Subtitle</label>
              <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} placeholder="One-line description under the title" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
            </div>
          </div>

          {/* Content sections */}
          <label className="block text-xs font-medium text-slate-600 mb-2">Content Sections</label>
          <div className="space-y-3 mb-3">
            {form.sections.map((s, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Section {i + 1}</p>
                  {form.sections.length > 1 && (
                    <button onClick={() => setForm((f) => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }))} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
                <input value={s.heading} onChange={(e) => updateSection(i, "heading", e.target.value)} placeholder="Heading" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium" />
                <textarea value={s.body} onChange={(e) => updateSection(i, "body", e.target.value)} rows={3} placeholder="Paragraph text…" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <div className="grid sm:grid-cols-2 gap-2">
                  <input value={s.button_label} onChange={(e) => updateSection(i, "button_label", e.target.value)} placeholder="Button text (optional)" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
                  <input value={s.button_url} onChange={(e) => updateSection(i, "button_url", e.target.value)} placeholder="Button link, e.g. /contact or https://…" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setForm((f) => ({ ...f, sections: [...f.sections, { ...EMPTY_SECTION }] }))}
            className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            <Plus className="size-3.5" /> Add another section
          </button>

          {/* Nav placement — new pages only */}
          {!editingId && (
            <div className="grid sm:grid-cols-2 gap-4 mb-4 rounded-lg border border-slate-200 bg-white p-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Show in header menu (optional)</label>
                <select
                  value={form.navParentId}
                  onChange={(e) => setForm((f) => ({ ...f, navParentId: e.target.value, navGroupId: "" }))}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  <option value="">— Don't add to menu —</option>
                  {navParents.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
              </div>
              {selectedParent && selectedParent.groups.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Section inside {selectedParent.label}</label>
                  <select
                    value={form.navGroupId}
                    onChange={(e) => setForm((f) => ({ ...f, navGroupId: e.target.value }))}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">— Choose section —</option>
                    {selectedParent.groups.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {editingId ? "Save Changes" : "Create Page"}
            </button>
            <button onClick={resetForm} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Title</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Address</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Sections</th>
              <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
              <th className="text-right font-medium text-slate-500 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No custom pages yet. Click "Create New Page".</td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-800">{row.title}</td>
                <td className="px-4 py-3">
                  <a href={`/p/${row.slug}`} target="_blank" rel="noopener noreferrer" className="text-accent font-mono text-xs inline-flex items-center gap-1 hover:underline">
                    /p/{row.slug} <ExternalLink className="size-3" />
                  </a>
                </td>
                <td className="px-4 py-3 text-slate-500">{row.sections.length}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(row)} className={`text-xs font-semibold px-2 py-1 rounded-full ${row.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {row.is_active ? "Published" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
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

export default PagesManager;
