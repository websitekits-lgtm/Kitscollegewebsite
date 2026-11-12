import { useCallback, useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import library from "@/assets/campus-library.jpg";
import lab from "@/assets/campus-lab.jpg";
import grad from "@/assets/campus-graduation.jpg";
import campus from "@/assets/hero-campus.jpg";
import cse from "@/assets/dept-cse.jpg";
import mech from "@/assets/dept-mech.jpg";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { useRealtimeRefresh } from "@/lib/useRealtime";

// Built-in photos: shown only when Supabase isn't configured or can't be reached.
const FALLBACK_ITEMS: GalleryItem[] = [
  { src: campus, cat: "Campus" },
  { src: library, cat: "Campus" },
  { src: lab, cat: "Labs" },
  { src: cse, cat: "Labs" },
  { src: mech, cat: "Labs" },
  { src: grad, cat: "Events" },
  { src: campus, cat: "Sports" },
  { src: lab, cat: "Labs" },
  { src: library, cat: "Campus" },
  { src: grad, cat: "Events" },
];

interface GalleryItem { src: string; cat: string; caption?: string | null }

/** Gallery photos from Admin → Gallery, live-updated. */
const useGalleryItems = () => {
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_ITEMS);
  const load = useCallback(() => {
    if (!supabase) return;
    supabase
      .from("gallery_items")
      .select("image_url, category, caption")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (!error && data) setItems(data.map((r) => ({ src: r.image_url, cat: r.category, caption: r.caption })));
      });
  }, []);
  useEffect(() => { load(); }, [load]);
  useRealtimeRefresh("gallery_items", load);
  return items;
};

const Gallery = () => {
  const items = useGalleryItems();
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat)))];
  const filtered = filter === "All" ? items : items.filter((i) => i.cat === filter);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our campus."
        breadcrumb={[{ label: "Gallery" }]}
      />

      <section className="py-16 md:py-24 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div data-reveal className="flex flex-wrap gap-2 mb-10">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-4 py-2 rounded-sm text-sm font-medium border transition-colors",
                  filter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/70 hover:text-foreground hover:border-foreground/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 && <p className="text-sm text-muted-foreground">Photos are being added. Check back soon.</p>}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
            {filtered.map((item, i) => (
              <div data-reveal key={i} className="break-inside-avoid overflow-hidden rounded-md border border-border group">
                <img src={item.src} alt={item.caption || `${item.cat} ${i + 1}`} loading="lazy" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                {item.caption && <p className="px-3 py-2 text-xs text-muted-foreground border-t border-border">{item.caption}</p>}
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default Gallery;
