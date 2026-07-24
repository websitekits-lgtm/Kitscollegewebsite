import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Check, ChevronUp, ChevronDown, Pencil, X, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface NavItemRow {
  id: string;
  parent_id: string | null;
  label: string;
  url: string | null;
  kind: "top" | "group" | "link";
  sort_order: number;
  is_active: boolean;
}

/**
 * Menu Order — simple view of the existing header menu.
 * Rename, reorder, hide, or remove items. To ADD a new page to the menu,
 * use Admin → Pages (it creates the page and its menu link together).
 */
const MenuManager = () => {
  const [rows, setRows] = useState<NavItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");

  const load = async () => {
    if (!supabase) return setLoading(false);
    setLoading(true);
    const { data } = await supabase.from("nav_items").select("id, parent_id, label, url, kind, sort_order, is_active").order("sort_order");
    setRows((data as NavItemRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const childrenOf = (parentId: string | null) =>
    rows.filter((r) => r.parent_id === parentId).sort((a, b) => a.sort_order - b.sort_order);

  const saveLabel = async (id: string) => {
    if (!supabase || !editLabel.trim()) return;
    await supabase.from("nav_items").update({ label: editLabel.trim() }).eq("id", id);
    setEditingId(null);
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
      ? `"${row.label}" contains sub-items — removing it removes them too. Continue?`
      : `Remove "${row.label}" from the menu?`;
    if (!confirm(msg)) return;
    await supabase.from("nav_items").delete().eq("id", row.id);
    load();
  };

  const move = async (row: NavItemRow, dir: -1 | 1) => {
    if (!supabase) return;
    const siblings = childrenOf(row.parent_id);
    const idx = siblings.findIndex((s) => s.id === row.id);
    const swap = siblings[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("nav_items").update({ sort_order: swap.sort_order }).eq("id", row.id),
      supabase.from("nav_items").update({ sort_order: row.sort_order }).eq("id", swap.id),
    ]);
    load();
  };

  const Row = ({ row, depth }: { row: NavItemRow; depth: number }) => (
    <>
      <div
        className={`flex items-center gap-2 py-2.5 border-b border-slate-100 ${!row.is_active ? "opacity-50" : ""}`}
        style={{ paddingLeft: `${depth * 26 + 8}px` }}
      >
        {editingId === row.id ? (
          <>
            <input
              autoFocus
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveLabel(row.id); if (e.key === "Escape") setEditingId(null); }}
              className="flex-1 max-w-xs rounded-md border border-accent/50 px-2.5 py-1.5 text-sm"
            />
            <button onClick={() => saveLabel(row.id)} className="text-accent p-1"><Check className="size-4" /></button>
            <button onClick={() => setEditingId(null)} className="text-slate-400 p-1"><X className="size-4" /></button>
          </>
        ) : (
          <>
            <span className={`text-sm truncate ${row.kind === "top" ? "font-bold text-slate-900" : row.kind === "group" ? "font-semibold text-slate-500 uppercase text-xs tracking-wide" : "text-slate-700"}`}>
              {row.label}
            </span>
            <div className="ml-auto flex items-center gap-0.5 shrink-0">
              <button onClick={() => move(row, -1)} title="Move up" className="text-slate-300 hover:text-accent p-1.5"><ChevronUp className="size-4" /></button>
              <button onClick={() => move(row, 1)} title="Move down" className="text-slate-300 hover:text-accent p-1.5"><ChevronDown className="size-4" /></button>
              <button onClick={() => { setEditingId(row.id); setEditLabel(row.label); }} title="Rename" className="text-slate-300 hover:text-accent p-1.5"><Pencil className="size-4" /></button>
              <button
                onClick={() => toggleActive(row)}
                className={`text-[10px] font-semibold px-2 py-1 rounded-full mx-1 ${row.is_active ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"}`}
              >
                {row.is_active ? "Shown" : "Hidden"}
              </button>
              <button onClick={() => remove(row)} title="Remove" className="text-slate-300 hover:text-red-500 p-1.5"><Trash2 className="size-4" /></button>
            </div>
          </>
        )}
      </div>
      {childrenOf(row.id).map((kid) => <Row key={kid.id} row={kid} depth={depth + 1} />)}
    </>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Menu Order</h1>
      <p className="text-sm text-slate-500 mb-4">
        The header menu as visitors see it. Rename, reorder (↑↓), hide, or remove items.
      </p>

      <Link
        to="/admin/pages"
        className="mb-6 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-accent/10 transition-colors"
      >
        <span>Want to <strong>add a new page</strong> to the menu? Create it in <strong>Pages</strong> — it handles the menu link automatically.</span>
        <ArrowRight className="size-4 text-accent shrink-0" />
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white px-2 py-1">
        {loading && <p className="text-sm text-slate-400 text-center py-8">Loading…</p>}
        {!loading && childrenOf(null).map((top) => <Row key={top.id} row={top} depth={0} />)}
      </div>
    </div>
  );
};

export default MenuManager;
