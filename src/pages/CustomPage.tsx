import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/lib/supabaseClient";
import { useRealtimeRefresh } from "@/lib/useRealtime";
import NotFound from "./NotFound";

interface PageSection {
  heading?: string;
  body?: string;
  button_label?: string;
  button_url?: string;
  image_url?: string;
  file_url?: string;
  file_label?: string;
}

interface CustomPageData {
  slug: string;
  title: string;
  eyebrow: string | null;
  subtitle: string | null;
  sections: PageSection[];
}

/** Renders admin-created template pages at /p/:slug (Admin → Pages). */
const CustomPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<CustomPageData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  const load = useCallback((initial: boolean) => {
    if (!supabase || !slug) {
      setStatus("missing");
      return;
    }
    if (initial) setStatus("loading");
    supabase
      .from("custom_pages")
      .select("slug, title, eyebrow, subtitle, sections")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setPage({ ...data, sections: (data.sections as PageSection[]) ?? [] });
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      });
  }, [slug]);

  useEffect(() => { load(true); }, [load]);
  // Admin edits show up without a reload.
  useRealtimeRefresh("custom_pages", () => load(false));

  if (status === "missing") return <NotFound />;
  if (status === "loading" || !page) {
    return (
      <SiteLayout>
        <div className="min-h-[50vh] grid place-items-center text-sm text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={page.eyebrow ?? undefined}
        title={page.title}
        subtitle={page.subtitle ?? undefined}
        breadcrumb={[{ label: page.title }]}
      />
      <section className="relative bg-background bg-dots py-12 md:py-16 lg:py-20">
        <div className="container-tight max-w-3xl space-y-10">
          {page.sections.map((s, i) => {
            const external = s.button_url && /^https?:\/\//.test(s.button_url);
            return (
              <div key={i}>
                {s.heading && (
                  <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">{s.heading}</h2>
                )}
                {s.image_url && (
                  <img src={s.image_url} alt={s.heading ?? ""} loading="lazy" className="w-full rounded-xl border border-border mb-5 object-cover" />
                )}
                {s.body && (
                  <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">{s.body}</p>
                )}
                {s.file_url && (
                  <a
                    href={s.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 mr-3 inline-flex items-center gap-2 rounded-md border border-accent px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Download className="size-4" /> {s.file_label || "Download"}
                  </a>
                )}
                {s.button_label && s.button_url && (
                  external ? (
                    <a
                      href={s.button_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
                    >
                      {s.button_label} <ArrowRight className="size-4" />
                    </a>
                  ) : (
                    <Link
                      to={s.button_url}
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
                    >
                      {s.button_label} <ArrowRight className="size-4" />
                    </Link>
                  )
                )}
              </div>
            );
          })}
          {page.sections.length === 0 && (
            <p className="text-sm text-muted-foreground">Content for this page is being prepared.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default CustomPage;
