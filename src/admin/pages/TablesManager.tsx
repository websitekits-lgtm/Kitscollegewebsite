import { useEffect, useState } from "react";
import { Plus, Trash2, Check, X, Loader2, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { TABLE_REGISTRY } from "@/lib/tableRegistry";

interface Row {
  id: string;
  cells: Record<string, string>;
  sort_order: number;
  is_active: boolean;
}

const TablesManager = () => {
  const [tableKey, setTableKey] = useState(TABLE_REGISTRY[0].key);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const def = TABLE_REGISTRY.find((t) => t.key === tableKey)!;

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase
      .from("data_table_rows")
      .select("id, cells, sort_order, is_active")
      .eq("table_key", tableKey)
      .order("sort_order");
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { setShowForm(false); setForm({}); load(); }, [tableKey]);

  const addRow = async () => {
    if (!supabase) return;
    const hasContent = def.columns.some((c) => (form[c.key] ?? "").trim());
    if (!hasContent) return;
    setSaving(true);
    await supabase.from("data_table_rows").insert({
      table_key: tableKey,
      cells: Object.fromEntries(def.columns.map((c) => [c.key, (form[c.key] ?? "").trim()])),
      sort_order: rows.length,
    });
    setSaving(false);
    setForm({});
    setShowForm(false);
    load();
  };

  const updateCell = (id: string, colKey: string, value: string) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, cells: { ...row.cells, [colKey]: value } } : row)));

  const saveRow = async (row: Row) => {
    if (!supabase) return;
    await supabase.from("data_table_rows").update({ cells: row.cells }).eq("id", row.id);
  };

  const removeRow = async (id: string) => {
    if (!supabase) return;
    if (!confirm("Delete this row?")) return;
    await supabase.from("data_table_rows").delete().eq("id", id);
    load();
  };

  const move = async (row: Row, dir: -1 | 1) => {
    if (!supabase) return;
    const idx = rows.findIndex((r) => r.id === row.id);
    const swap = rows[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("data_table_rows").update({ sort_order: swap.sort_order }).eq("id", row.id),
      supabase.from("data_table_rows").update({ sort_order: row.sort_order }).eq("id", swap.id),
    ]);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Data Tables</h1>
      <p className="text-sm text-slate-500 mb-6">
        Edit the rows behind the website's information tables — FDPs, publications, placement stats, intake, staff, and more.
      </p>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <select
          value={tableKey}
          onChange={(e) => setTableKey(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium"
        >
          {TABLE_REGISTRY.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
        </select>
        <a href={def.page} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline inline-flex items-center gap-1">
          View live page <ExternalLink className="size-3" />
        </a>
        <button
          onClick={() => setShowForm(true)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="size-3.5" /> Add Row
        </button>
      </div>

      {showForm && (
        <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            {def.columns.map((c) =>
              c.long ? (
                <textarea
                  key={c.key}
                  value={form[c.key] ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [c.key]: e.target.value }))}
                  placeholder={c.label}
                  rows={2}
                  className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                />
              ) : (
                <input
                  key={c.key}
                  value={form[c.key] ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [c.key]: e.target.value }))}
                  placeholder={c.label}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                />
              ),
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={addRow} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Add
            </button>
            <button onClick={() => { setShowForm(false); setForm({}); }} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <X className="size-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {def.columns.map((c) => (
                <th key={c.key} className="text-left font-medium text-slate-500 px-3 py-3 whitespace-nowrap">{c.label}</th>
              ))}
              <th className="text-right font-medium text-slate-500 px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={def.columns.length + 1} className="px-4 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={def.columns.length + 1} className="px-4 py-8 text-center text-slate-400">
                No rows yet — the website shows its built-in defaults until you add rows here.
              </td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0 align-top">
                {def.columns.map((c) => (
                  <td key={c.key} className="px-2 py-2" style={{ minWidth: c.long ? 220 : 110 }}>
                    {c.long ? (
                      <textarea
                        value={row.cells[c.key] ?? ""}
                        onChange={(e) => updateCell(row.id, c.key, e.target.value)}
                        onBlur={() => saveRow(row)}
                        rows={2}
                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-accent focus:outline-none"
                      />
                    ) : (
                      <input
                        value={row.cells[c.key] ?? ""}
                        onChange={(e) => updateCell(row.id, c.key, e.target.value)}
                        onBlur={() => saveRow(row)}
                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-accent focus:outline-none"
                      />
                    )}
                  </td>
                ))}
                <td className="px-2 py-2 text-right whitespace-nowrap">
                  <button onClick={() => move(row, -1)} className="text-slate-400 hover:text-accent p-1"><ChevronUp className="size-3.5" /></button>
                  <button onClick={() => move(row, 1)} className="text-slate-400 hover:text-accent p-1"><ChevronDown className="size-3.5" /></button>
                  <button onClick={() => removeRow(row.id)} className="text-slate-400 hover:text-red-500 p-1"><Trash2 className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400 mt-3">Edits save automatically when you click away from a cell.</p>
    </div>
  );
};

export default TablesManager;
