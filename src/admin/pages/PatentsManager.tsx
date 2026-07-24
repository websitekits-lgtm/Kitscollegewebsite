import { useEffect, useState } from "react";
import { Plus, Trash2, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface PatentRow {
  id: string;
  title: string;
  inventor: string | null;
  filing_no: string | null;
  year: string | null;
  status: "Filed" | "Published" | "Granted";
  is_active: boolean;
  sort_order: number;
}

const EMPTY_FORM = { title: "", inventor: "", filing_no: "", year: "", status: "Filed" as PatentRow["status"] };

const PatentsManager = () => {
  const [rows, setRows] = useState<PatentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("patents").select("*").order("sort_order");
    setRows((data as PatentRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!supabase || !form.title.trim()) return;
    setSaving(true);
    await supabase.from("patents").insert({
      title: form.title.trim(),
      inventor: form.inventor.trim() || null,
      filing_no: form.filing_no.trim() || null,
      year: form.year.trim() || null,
      status: form.status,
      sort_order: rows.length,
    });
    setSaving(false);
    setForm(EMPTY_FORM);
    setShowForm(false);
    load();
  };

  const updateField = (id: string, field: keyof PatentRow, value: string) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  const saveRow = async (row: PatentRow) => {
    if (!supabase) return;
    await supabase.from("patents").update({
      title: row.title, inventor: row.inventor, filing_no: row.filing_no, year: row.year, status: row.status,
    }).eq("id", row.id);
    load();
  };

  const remove = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Delete this patent entry?")) return;
    await supabase.from("patents").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Patents</h1>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
          <Plus className="size-4" /> Add Patent
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">Shown on Research → Patents.</p>

      {showForm && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-5 grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Patent title" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
          </div>
          <input value={form.inventor} onChange={(e) => setForm((f) => ({ ...f, inventor: e.target.value }))} placeholder="Inventor(s)" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
          <input value={form.filing_no} onChange={(e) => setForm((f) => ({ ...f, filing_no: e.target.value }))} placeholder="Filing / Application No." className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
          <input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="Year" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as PatentRow["status"] }))} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
            <option>Filed</option><option>Published</option><option>Granted</option>
          </select>
          <div className="sm:col-span-2 flex gap-2">
            <button onClick={add} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Add
            </button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
        {loading && <p className="text-sm text-slate-400 text-center py-6">Loading…</p>}
        {!loading && rows.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No patents yet.</p>}
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-2">
            <input value={row.title} onChange={(e) => updateField(row.id, "title", e.target.value)} className="flex-[2] rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
            <input value={row.inventor ?? ""} onChange={(e) => updateField(row.id, "inventor", e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
            <input value={row.filing_no ?? ""} onChange={(e) => updateField(row.id, "filing_no", e.target.value)} className="w-32 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-mono" />
            <input value={row.year ?? ""} onChange={(e) => updateField(row.id, "year", e.target.value)} className="w-16 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
            <select value={row.status} onChange={(e) => updateField(row.id, "status", e.target.value)} className="w-28 rounded-md border border-slate-300 px-2 py-1.5 text-sm">
              <option>Filed</option><option>Published</option><option>Granted</option>
            </select>
            <button onClick={() => saveRow(row)} className="shrink-0 text-accent hover:text-accent/80"><Check className="size-4" /></button>
            <button onClick={() => remove(row.id)} className="shrink-0 text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatentsManager;
