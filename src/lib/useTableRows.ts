import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRealtimeRefresh } from "@/lib/useRealtime";

/**
 * Generic admin-editable table rows (Admin → Data Tables).
 * Returns DB rows for the table_key when present, else the static fallback.
 * Cell values are strings keyed by the columns in tableRegistry.
 */
export const useTableRows = <T extends Record<string, string>>(
  tableKey: string,
  fallback: T[],
): T[] => {
  const [rows, setRows] = useState<T[]>(fallback);

  const load = useCallback(() => {
    if (!supabase) return;
    supabase
      .from("data_table_rows")
      .select("cells")
      .eq("table_key", tableKey)
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setRows(data.map((r) => r.cells as T));
      });
  }, [tableKey]);
  useEffect(() => { load(); }, [load]);
  useRealtimeRefresh("data_table_rows", load);

  return rows;
};
