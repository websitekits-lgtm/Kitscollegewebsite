import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { MediaField } from "../components/MediaPicker";

interface ClubRow {
  id: string;
  name: string;
  category: string;
  description: string | null;
  coordinator: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const CATEGORIES = ["Technical", "Cultural", "Sports", "Social Service", "General"];
const EMPTY_FORM = { name: "", category: "Technical", description: "", coordinator: "", image_url: "" };

const ClubsManager = () => {
  const [rows, setRows] = useState<ClubRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("clubs").select("*").order("sort_order");
    setRows((data as ClubRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (row: ClubRow) => {
    setForm({
      name: row.name, category: row.category,
      description: row.description ?? "", coordinator: row.coordinator ?? "",
      image_url: row.image_url ?? "",
    });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!supabase || !form.name.trim()) return;
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim() || null,
      coordinator: form.coordinator.trim() || null,
      image_url: form.image_url || null,
    };
    const { error } = editingId
      ? await supabase.from("clubs").update(payload).eq("id", editingId)
      : await supabase.from("clubs").insert({ ...payload, sort_order: rows.length });
    setSaving(false);
    if (error) return alert(`Save failed: ${error.message}`);
    resetForm();
    load();
  };

  const toggleActive = async (row: ClubRow) => {
    if (!supabase) return;
    await supabase.from("clubs").update({ is_active: !row.is_active }).eq("id", row.id);
    load();
  };

  const remove = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Delete this club?")) return;
    await supabase.from("clubs").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Clubs & Activities</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
          <Plus className="size-4" /> Add Club
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">Shown on Student Life → Clubs & Activities.</p>

      {showForm && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">{editingId ? "Edit Club" : "New Club"}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Club name" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="sm:col-span-2">
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} placeholder="What does this club do?" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
            </div>
            <input value={form.coordinator} onChange={(e) => setForm((f) => ({ ...f, coordinator: e.target.value }))} placeholder="Coordinator (e.g. Dept. of CSE)" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
            <MediaField value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} folder="clubs" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {editingId ? "Save Changes" : "Add Club"}
            </button>
            <button onClick={resetForm} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p className="text-sm text-slate-400 col-span-full text-center py-8">Loading…</p>}
        {!loading && rows.length === 0 && <p className="text-sm text-slate-400 col-span-full text-center py-8">No clubs yet.</p>}
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            {row.image_url && <img src={row.image_url} alt={row.name} className="w-full h-24 object-cover" />}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-accent">{row.category}</span>
                <button onClick={() => toggleActive(row)} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {row.is_active ? "Active" : "Hidden"}
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">{row.name}</p>
              {row.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{row.description}</p>}
              <div className="flex items-center justify-between mt-3">
                <p className="text-[11px] text-slate-400">{row.coordinator}</p>
                <div className="space-x-2">
                  <button onClick={() => startEdit(row)} className="text-slate-400 hover:text-accent"><Pencil className="size-4" /></button>
                  <button onClick={() => remove(row.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsManager;
