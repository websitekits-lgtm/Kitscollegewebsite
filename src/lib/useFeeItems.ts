import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface FeeItem {
  category: string;
  label: string;
  annual_fee: string;
  admission_fee: string | null;
}

/** Fetches all active fee_items, grouped by category. Falls back to bundled defaults until resolved. */
export const useFeeItems = (fallback: FeeItem[]): Record<string, FeeItem[]> => {
  const group = (items: FeeItem[]) =>
    items.reduce<Record<string, FeeItem[]>>((acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    }, {});

  const [grouped, setGrouped] = useState<Record<string, FeeItem[]>>(group(fallback));

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("fee_items")
      .select("category, label, annual_fee, admission_fee")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setGrouped(group(data as FeeItem[]));
      });
  }, []);

  return grouped;
};
