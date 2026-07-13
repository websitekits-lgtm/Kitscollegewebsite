import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Row {
  id: string;
  category: "alumni" | "parents" | "recruiters";
  quote: string;
  name: string;
  role: string;
  initials: string;
  sort_order: number;
  is_active: boolean;
}

const EMPTY_FORM = { category: "alumni" as Row["category"], quote: "", name: "", role: "", initials: "", sort_order: 0 };
const CATEGORIES: { value: Row["category"]; label: string }[] = [
  { value: "alumni", label: "Alumni" },
  { value: "parents", label: "Parents" },
  { value: "recruiters", label: "Recruiters" },
];

const TestimonialsManager = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<Row["category"] | "all">("all");

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("category").order("sort_order");
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (row: Row) => {
    setForm({ category: row.category, quote: row.quote, name: row.name, role: row.role, initials: row.initials, sort_order: row.sort_order });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!supabase || !form.quote.trim() || !form.name.trim()) return;
    setSaving(true);
    const payload = {
      category: form.category,
      quote: form.quote.trim(),
      name: form.name.trim(),
      role: form.role.trim(),
      initials: form.initials.trim() || form.name.trim().slice(0, 2).toUpperCase(),
      sort_order: Number(form.sort_order) || 0,
    };
    if (editingId) {
      await supabase.from("testimonials").update(payload).eq("id", editingId);
    } else {
      await supabase.from("testimonials").insert(payload);
    }
    setSaving(false);
    resetForm();
    load();
  };

  const toggleActive = async (row: Row) => {
    if (!supabase) return;
    await supabase.from("testimonials").update({ is_active: !row.is_active }).eq("id", row.id);
    load();
  };

  const remove = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  const visibleRows = filter === "all" ? rows : rows.filter((r) => r.category === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="size-4" /> Add Testimonial
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Shown on the homepage in the Alumni / Parents / Recruiters tabs, right above the footer.
      </p>

      {showForm && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">{editingId ? "Edit Testimonial" : "New Testimonial"}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Category (Tab)</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Row["category"] }))}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="e.g. Sai Krishna Reddy" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Role / Designation</label>
              <input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="e.g. B.Tech CSE '24 · Software Engineer, Infosys" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Initials (avatar)</label>
              <input value={form.initials} onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value }))} maxLength={2} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="e.g. SK" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Quote</label>
              <textarea value={form.quote} onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))} rows={3} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="What they said about KITS..." />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {editingId ? "Save Changes" : "Add Testimonial"}
            </button>
            <button onClick={resetForm} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {(["all", "alumni", "parents", "recruiters"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize ${filter === f ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p className="text-sm text-slate-400 col-span-full text-center py-8">Loading…</p>}
        {!loading && visibleRows.length === 0 && (
          <p className="text-sm text-slate-400 col-span-full text-center py-8">No testimonials in this category yet.</p>
        )}
        {visibleRows.map((row) => (
          <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-accent">{row.category}</span>
              <button
                onClick={() => toggleActive(row)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
              >
                {row.is_active ? "Active" : "Hidden"}
              </button>
            </div>
            <p className="text-sm text-slate-700 line-clamp-3 mb-3">"{row.quote}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800">{row.name}</p>
                <p className="text-[11px] text-slate-400">{row.role}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => startEdit(row)} className="text-slate-400 hover:text-accent"><Pencil className="size-4" /></button>
                <button onClick={() => remove(row.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;
