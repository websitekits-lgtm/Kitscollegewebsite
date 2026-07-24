import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface SiteNotification {
  id: string;
  title: string;
  body: string | null;
  link_url: string | null;
  created_at: string;
}

const SEEN_KEY = "kits_notifications_seen_at";

/** Active notifications, newest first, kept live via Supabase realtime. */
export const useNotifications = () => {
  const [items, setItems] = useState<SiteNotification[]>([]);
  const [seenAt, setSeenAt] = useState<string>(() => localStorage.getItem(SEEN_KEY) ?? "");

  useEffect(() => {
    if (!supabase) return;

    const load = () =>
      supabase!
        .from("notifications")
        .select("id, title, body, link_url, created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(20)
        .then(({ data }) => setItems((data as SiteNotification[]) ?? []));

    load();

    // Realtime: refetch whenever admin adds/edits/removes a notification
    const channel = supabase
      .channel("public-notifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => load())
      .subscribe();

    return () => {
      supabase!.removeChannel(channel);
    };
  }, []);

  const unseenCount = seenAt
    ? items.filter((n) => n.created_at > seenAt).length
    : items.length;

  const markSeen = () => {
    const now = new Date().toISOString();
    localStorage.setItem(SEEN_KEY, now);
    setSeenAt(now);
  };

  return { items, unseenCount, markSeen };
};
