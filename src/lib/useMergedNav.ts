import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRealtimeRefresh } from "@/lib/useRealtime";
import { TOP_NAV, type NavItem } from "@/lib/navigation";

interface NavItemRow {
  id: string;
  parent_id: string | null;
  label: string;
  url: string | null;
  kind: "top" | "group" | "link";
  dropdown_align: "left" | "right" | null;
  sort_order: number;
}

const buildTree = (rows: NavItemRow[]): NavItem[] => {
  const byParent = new Map<string | null, NavItemRow[]>();
  for (const row of rows) {
    const key = row.parent_id;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key)!.push(row);
  }
  for (const list of byParent.values()) list.sort((a, b) => a.sort_order - b.sort_order);

  const tops = byParent.get(null) ?? [];

  return tops.map((top): NavItem => {
    const children = byParent.get(top.id) ?? [];
    const hasGroups = children.some((c) => c.kind === "group");

    if (top.url && children.length === 0) {
      return { label: top.label, to: top.url };
    }

    if (hasGroups) {
      return {
        label: top.label,
        dropdownAlign: top.dropdown_align ?? undefined,
        groups: children
          .filter((c) => c.kind === "group")
          .map((group) => ({
            label: group.label,
            links: (byParent.get(group.id) ?? []).map((leaf) => ({ label: leaf.label, to: leaf.url ?? "#" })),
          })),
      };
    }

    return {
      label: top.label,
      dropdownAlign: top.dropdown_align ?? undefined,
      links: children.map((leaf) => ({ label: leaf.label, to: leaf.url ?? "#" })),
    };
  });
};

/** Nav is fully database-driven; falls back to the bundled static TOP_NAV until the fetch resolves (or if the DB is empty/unreachable). */
export const useMergedNav = (): NavItem[] => {
  const [tree, setTree] = useState<NavItem[] | null>(null);

  const load = useCallback(() => {
    if (!supabase) return;
    supabase
      .from("nav_items")
      .select("id, parent_id, label, url, kind, dropdown_align, sort_order")
      .eq("is_active", true)
      .then(({ data }) => {
        if (data && data.length > 0) setTree(buildTree(data as NavItemRow[]));
      });
  }, []);
  useEffect(() => { load(); }, [load]);
  useRealtimeRefresh("nav_items", load);

  return tree ?? TOP_NAV;
};
