import { useEffect, useState } from "react";
import { Plus, Trash2, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface FeeRow {
  id: string;
  category: string;
  label: string;
  annual_fee: string;
  admission_fee: string | null;
  is_active: boolean;
  sort_order: number;
}

const CATEGORIES = [
  { value: "other", label: "Other Fee" },
  { value: "btech", label: "B.Tech" },
  { value: "diploma", label: "Diploma (Polytechnic)" },
  { value: "mtech", label: "M.Tech" },
  { value: "hostel", label: "Hostel" },
  { value: "transport_a", label: "Transport — Route A" },
  { value: "transport_b", label: "Transport — Route B" },
  { value: "transport_c", label: "Transport — Route C" },
];

const EMPTY_FORM = { label: "", annual_fee: "", admission_fee: "" };

const FeeStructureManager = () => {
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [rows, setRows] = useState<FeeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("fee_items").select("*").eq("category", category).order("sort_order");
    setRows((data as FeeRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [category]);

  const isDiploma = category === "diploma";

  const addRow = async () => {
    if (!supabase || !form.label.trim() || !form.annual_fee.trim()) return;
    await supabase.from("fee_items").insert({
      category,
      label: form.label.trim(),
      annual_fee: form.annual_fee.trim(),
      admission_fee: isDiploma ? (form.admission_fee.trim() || null) : null,
      sort_order: rows.length,
    });
    setForm(EMPTY_FORM);
    setShowForm(false);
    load();
  };

  const updateField = (id: string, field: keyof FeeRow, value: string) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  const saveRow = async (row: FeeRow) => {
    if (!supabase) return;
    await supabase.from("fee_items").update({ label: row.label, annual_fee: row.annual_fee, admission_fee: row.admission_fee }).eq("id", row.id);
    load();
  };

  const removeRow = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Remove this fee row?")) return;
    await supabase.from("fee_items").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Fee Structure</h1>
      <p className="text-sm text-slate-500 mb-6">Edit the branch/hostel/transport fees shown on the Fee Structure page.</p>

      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${category === c.value ? "bg-accent text-accent-foreground" : "bg-white border border-slate-200 text-slate-500"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">{CATEGORIES.find((c) => c.value === category)?.label}</h2>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
            <Plus className="size-3.5" /> Add Row
          </button>
        </div>

        {showForm && (
          <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4 grid sm:grid-cols-3 gap-3">
            <input placeholder="Branch / Item name" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input placeholder="Annual Fee (e.g. ₹ 45,000)" value={form.annual_fee} onChange={(e) => setForm((f) => ({ ...f, annual_fee: e.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            {isDiploma && (
              <input placeholder="Admission Fee (one-time)" value={form.admission_fee} onChange={(e) => setForm((f) => ({ ...f, admission_fee: e.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            )}
            <div className="sm:col-span-3 flex gap-2">
              <button onClick={addRow} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"><Check className="size-4" /> Add</button>
              <button onClick={() => setShowForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-slate-400 text-center py-8">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">No rows yet.</p>
        ) : (
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <input value={row.label} onChange={(e) => updateField(row.id, "label", e.target.value)} className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                <input value={row.annual_fee} onChange={(e) => updateField(row.id, "annual_fee", e.target.value)} className="w-36 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                {isDiploma && (
                  <input value={row.admission_fee ?? ""} onChange={(e) => updateField(row.id, "admission_fee", e.target.value)} placeholder="Admission fee" className="w-36 rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                )}
                <button onClick={() => saveRow(row)} className="shrink-0 text-accent hover:text-accent/80"><Check className="size-4" /></button>
                <button onClick={() => removeRow(row.id)} className="shrink-0 text-slate-400 hover:text-red-500"><Trash2 className="size-4" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeStructureManager;
