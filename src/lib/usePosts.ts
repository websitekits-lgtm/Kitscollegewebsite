import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { EVENTS, EventItem } from "@/lib/events";
import { useRealtimeRefresh } from "@/lib/useRealtime";

/** A post as the public site renders it. Same shape as the built-in EventItem, plus an optional attachment. */
export interface PostItem extends EventItem {
  attachmentUrl?: string | null;
  attachmentName?: string | null;
}

export interface PostRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  attachment_url: string | null;
  attachment_name: string | null;
  event_date: string;
  is_published: boolean;
}

export const POST_CATEGORIES = ["News", "Event", "Achievement", "Workshop", "Placement", "Partnership", "Circular"];

const toPostItem = (r: PostRow): PostItem => ({
  slug: r.slug,
  title: r.title,
  date: r.event_date,
  category: r.category,
  excerpt: r.excerpt ?? "",
  // Posts without a cover image fall back to the campus building photo.
  image: r.cover_image_url || "/KITS-building-2023.webp",
  body: r.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
  attachmentUrl: r.attachment_url,
  attachmentName: r.attachment_name,
});

/**
 * Published posts, newest first, live-updated.
 * The built-in EVENTS show only when Supabase isn't configured or can't be reached
 * (scripts/seed-v7.mjs copies them into the posts table).
 */
export const usePosts = (): { posts: PostItem[]; loading: boolean } => {
  const [posts, setPosts] = useState<PostItem[]>(EVENTS);
  const [loading, setLoading] = useState(Boolean(supabase));

  const load = useCallback(() => {
    if (!supabase) return;
    supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("event_date", { ascending: false })
      .then(({ data, error }) => {
        // On a network/DB error keep whatever is showing (built-in EVENTS on first load).
        if (!error && data) setPosts((data as PostRow[]).map(toPostItem));
        setLoading(false);
      });
  }, []);

  useEffect(() => { load(); }, [load]);
  useRealtimeRefresh("posts", load);

  return { posts, loading };
};
