import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRealtimeRefresh } from "@/lib/useRealtime";

/** Fetches editable text fields for a page as a { field_key: value } map, merged over a fallback map. */
export const usePageTexts = <T extends Record<string, string>>(
  pageSlug: string,
  fallback: T,
): T => {
  const [values, setValues] = useState<T>(fallback);

  const load = useCallback(() => {
    if (!supabase) return;
    supabase
      .from("page_texts")
      .select("field_key, field_value")
      .eq("page_slug", pageSlug)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        setValues((prev) => {
          const next = { ...prev };
          for (const row of data) {
            if (row.field_value) (next as any)[row.field_key] = row.field_value;
          }
          return next;
        });
      });
  }, [pageSlug]);
  useEffect(() => { load(); }, [load]);
  useRealtimeRefresh("page_texts", load);

  return values;
};
