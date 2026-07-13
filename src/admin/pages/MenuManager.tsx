import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Check, Loader2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface NavItemRow {
  id: string;
  parent_id: string | null;
  label: string;
  url: string | null;
  kind: "top" | "group" | "link";
  dropdown_align: "left" | "right" | null;
  sort_order: number;
  is_active: boolean;
}

type FormTarget = { kind: "top" } | { kind: "group" | "link"; parentId: string };

const EMPTY_FORM = { label: "", url: "", dropdown_align: "" as "" | "left" | "right" };

const MenuManager = () => {
  const [rows, setRows] = useState<NavItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingUnder, setAddingUnder] = useState<FormTarget | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("nav_items").select("*").order("sort_order");
    setRows((data as NavItemRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const childrenOf = (parentId: string | null) => rows.filter((r) => r.parent_id === parentId).sort((a, b) => a.sort_order - b.sort_order);
  const tops = childrenOf(null);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setAddingUnder(null);
  };

  const startEdit = (row: NavItemRow) => {
    setForm({ label: row.label, url: row.url ?? "", dropdown_align: row.dropdown_align ?? "" });
    setEditingId(row.id);
    setAddingUnder(null);
  };

  const startAdd = (target: FormTarget) => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setAddingUnder(target);
  };

  const handleSubmit = async () => {
    if (!supabase || !form.label.trim()) return;
    setSaving(true);

    if (editingId) {
      const existing = rows.find((r) => r.id === editingId)!;
      await supabase.from("nav_items").update({
        label: form.label.trim(),
        url: existing.kind === "group" ? null : (form.url.trim() || null),
        dropdown_align: existing.kind === "top" ? (form.dropdown_align || null) : existing.dropdown_align,
      }).eq("id", editingId);
    } else if (addingUnder) {
      const kind = addingUnder.kind;
      const parentId = kind === "top" ? null : addingUnder.parentId;
      const siblingCount = childrenOf(parentId).length;
      await supabase.from("nav_items").insert({
        parent_id: parentId,
        label: form.label.trim(),
        url: kind === "group" ? null : (form.url.trim() || null),
        kind,
        dropdown_align: kind === "top" ? (form.dropdown_align || null) : null,
        sort_order: siblingCount,
      });
    }

    setSaving(false);
    resetForm();
    load();
  };

  const toggleActive = async (row: NavItemRow) => {
    if (!supabase) return;
    await supabase.from("nav_items").update({ is_active: !row.is_active }).eq("id", row.id);
    load();
  };

  const remove = async (row: NavItemRow) => {
    if (!supabase) return;
    const hasChildren = rows.some((r) => r.parent_id === row.id);
    const msg = hasChildren
      ? `"${row.label}" has sub-items under it — deleting it will delete all of them too. Continue?`
      : `Remove "${row.label}"?`;
    if (!confirm(msg)) return;
    await supabase.from("nav_items").delete().eq("id", row.id);
    load();
  };

  const move = async (row: NavItemRow, direction: -1 | 1) => {
    if (!supabase) return;
    const siblings = childrenOf(row.parent_id);
    const idx = siblings.findIndex((s) => s.id === row.id);
    const swapWith = siblings[idx + direction];
    if (!swapWith) return;
    await Promise.all([
      supabase.from("nav_items").update({ sort_order: swapWith.sort_order }).eq("id", row.id),
      supabase.from("nav_items").update({ sort_order: row.sort_order }).eq("id", swapWith.id),
    ]);
    load();
  };

  const renderForm = () => {
    const isGroupKind = addingUnder?.kind === "group" || (editingId && rows.find((r) => r.id === editingId)?.kind === "group");
    const isTopKind = addingUnder?.kind === "top" || (editingId && rows.find((r) => r.id === editingId)?.kind === "top");
    return (
      <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Label</label>
            <input
              autoFocus
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              placeholder="e.g. Alumni Meet 2026"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          {!isGroupKind && (
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">URL {isTopKind && "(leave blank if it only opens a dropdown)"}</label>
              <input
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                placeholder="/about/alumni-meet-2026"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
          )}
          {isTopKind && (
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Dropdown opens toward</label>
              <select
                value={form.dropdown_align}
                onChange={(e) => setForm((f) => ({ ...f, dropdown_align: e.target.value as any }))}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Center (default)</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
            Save
          </button>
          <button onClick={resetForm} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <X className="size-4" /> Cancel
          </button>
        </div>
      </div>
    );
  };

  const Row = ({ row, depth }: { row: NavItemRow; depth: number }) => {
    const kids = childrenOf(row.id);
    const isEditingThis = editingId === row.id;
    const isAddingUnderThis = addingUnder && "parentId" in addingUnder && addingUnder.parentId === row.id;

    return (
      <div>
        <div
          className="flex items-center gap-2 py-2 border-b border-slate-100 last:border-0 group"
          style={{ paddingLeft: `${depth * 24}px` }}
        >
          <GripVertical className="size-3.5 text-slate-300 shrink-0" />
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 ${row.kind === "top" ? "bg-blue-100 text-blue-700" : row.kind === "group" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-500"}`}>
            {row.kind}
          </span>
          <span className="text-sm font-medium text-slate-800 truncate">{row.label}</span>
          {row.url && <span className="text-xs text-slate-400 font-mono truncate">{row.url}</span>}
          <div className="ml-auto flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => move(row, -1)} title="Move up" className="text-slate-400 hover:text-accent p-1"><ChevronUp className="size-3.5" /></button>
            <button onClick={() => move(row, 1)} title="Move down" className="text-slate-400 hover:text-accent p-1"><ChevronDown className="size-3.5" /></button>
            {row.kind !== "link" && (
              <button onClick={() => startAdd({ kind: row.kind === "top" ? "group" : "link", parentId: row.id } as FormTarget)} title="Add item under this" className="text-slate-400 hover:text-accent p-1"><Plus className="size-3.5" /></button>
            )}
            {row.kind === "top" && (
              <button onClick={() => startAdd({ kind: "link", parentId: row.id })} title="Add direct link (flat dropdown)" className="text-[10px] font-semibold text-slate-400 hover:text-accent px-1">+Link</button>
            )}
            <button onClick={() => toggleActive(row)} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${row.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {row.is_active ? "Active" : "Hidden"}
            </button>
            <button onClick={() => startEdit(row)} className="text-slate-400 hover:text-accent p-1"><Pencil className="size-3.5" /></button>
            <button onClick={() => remove(row)} className="text-slate-400 hover:text-red-500 p-1"><Trash2 className="size-3.5" /></button>
          </div>
        </div>
        {isEditingThis && <div style={{ marginLeft: `${depth * 24}px` }}>{renderForm()}</div>}
        {kids.map((kid) => <Row key={kid.id} row={kid} depth={depth + 1} />)}
        {isAddingUnderThis && <div style={{ marginLeft: `${(depth + 1) * 24}px` }}>{renderForm()}</div>}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-slate-900">Header Navigation</h1>
        <button
          onClick={() => startAdd({ kind: "top" })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="size-4" /> Add Top-Level Menu
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        This is the entire header menu — edit, reorder, hide, or delete anything, or add new items at any level. Hover a row to reveal its actions.
      </p>

      {addingUnder?.kind === "top" && renderForm()}

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        {loading && <p className="text-sm text-slate-400 text-center py-8">Loading…</p>}
        {!loading && tops.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No menu items yet.</p>}
        {tops.map((top) => <Row key={top.id} row={top} depth={0} />)}
      </div>
    </div>
  );
};

export default MenuManager;
