import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface SiteDocument {
  id: string;
  doc_key: string | null;
  category: string | null;
  title: string;
  label: string | null;
  file_url: string;
  file_name: string;
  file_size: string | null;
  updated_at: string;
}

/** Slugifies a page title into a stable doc_key, e.g. "College Brochure" → "college-brochure". */
export const docKeyFromTitle = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[()&/]/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Single-document slot lookup (PdfPage). Returns null until loaded / when absent. */
export const useDocument = (docKey: string | undefined): SiteDocument | null => {
  const [doc, setDoc] = useState<SiteDocument | null>(null);

  useEffect(() => {
    if (!supabase || !docKey) return;
    supabase
      .from("site_documents")
      .select("*")
      .eq("doc_key", docKey)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data }) => setDoc((data as SiteDocument) ?? null));
  }, [docKey]);

  return doc;
};

/** All documents in a list category (question-papers, academic-calendars, …). */
export const useDocumentsByCategory = (category: string | undefined): SiteDocument[] => {
  const [docs, setDocs] = useState<SiteDocument[]>([]);

  useEffect(() => {
    if (!supabase || !category) return;
    supabase
      .from("site_documents")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setDocs((data as SiteDocument[]) ?? []));
  }, [category]);

  return docs;
};

/** Documents whose doc_key starts with a prefix (e.g. "committee:") mapped by full key. */
export const useDocumentsByPrefix = (prefix: string): Record<string, SiteDocument> => {
  const [map, setMap] = useState<Record<string, SiteDocument>>({});

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("site_documents")
      .select("*")
      .like("doc_key", `${prefix}%`)
      .eq("is_active", true)
      .then(({ data }) => {
        const next: Record<string, SiteDocument> = {};
        for (const d of (data as SiteDocument[]) ?? []) {
          if (d.doc_key) next[d.doc_key] = d;
        }
        setMap(next);
      });
  }, [prefix]);

  return map;
};
