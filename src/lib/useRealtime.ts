import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

let channelSeq = 0;

/**
 * Calls `onChange` whenever a row in `table` is inserted, updated, hidden or
 * deleted, so the public site reflects admin edits without a page reload.
 *
 * Listens to `site_changes` (bumped by a trigger on every content table, see
 * scripts/migrate-v7.sql) rather than the table itself: realtime only delivers
 * rows the visitor is allowed to read, so hiding a row would otherwise go unnoticed.
 */
export const useRealtimeRefresh = (table: string, onChange: () => void) => {
  const cb = useRef(onChange);
  cb.current = onChange;

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel(`live-${table}-${++channelSeq}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_changes", filter: `table_name=eq.${table}` },
        () => cb.current(),
      )
      .subscribe();
    return () => {
      supabase!.removeChannel(channel);
    };
  }, [table]);
};
