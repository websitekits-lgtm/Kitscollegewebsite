import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface CommitteeMember {
  name: string;
  designation: string | null;
  role_label: string | null;
}

/** Fetches committee_members for a page (e.g. "student-life/anti-ragging"). Returns null while loading. */
export const useCommitteeMembers = (
  pageSlug: string,
  fallback: CommitteeMember[],
): CommitteeMember[] => {
  const [rows, setRows] = useState<CommitteeMember[] | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("committee_members")
      .select("name, designation, role_label")
      .eq("page_slug", pageSlug)
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setRows(data && data.length > 0 ? data : null));
  }, [pageSlug]);

  return rows ?? fallback;
};
