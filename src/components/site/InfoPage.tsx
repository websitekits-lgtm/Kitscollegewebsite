import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

export interface SidebarLink {
  label: string;
  to: string;
}

interface InfoPageProps {
  /** Top eyebrow above the title (e.g., "About KITS") */
  eyebrow?: string;
  /** Main page title */
  title: string;
  /** Subtitle under the title */
  subtitle?: string;
  /** Breadcrumb items (Home is auto-prepended) */
  breadcrumb?: { label: string; to?: string }[];
  /** Optional sidebar with related links */
  sidebar?: { heading?: string; links: SidebarLink[] };
  /** Body content */
  children: ReactNode;
}

/**
 * Generic content page template — header + breadcrumb + body + optional sidebar.
 * Used for ~80% of static informational pages.
 */
export const InfoPage = ({ eyebrow, title, subtitle, breadcrumb, sidebar, children }: InfoPageProps) => {
  const { pathname } = useLocation();

  return (
    <SiteLayout>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} breadcrumb={breadcrumb} />

      {/* Body — subtle dot pattern background instead of pure white */}
      <section className="relative bg-background bg-dots py-12 md:py-16 lg:py-20">
        {/* Decorative blobs in the corners for visual interest */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="container-tight relative">
          <div className={`grid gap-10 ${sidebar ? "lg:grid-cols-12" : ""}`}>
            <article className={`prose prose-neutral max-w-none ${sidebar ? "lg:col-span-8" : ""}`}>
              {children}
            </article>

            {sidebar && (
              <aside className="lg:col-span-4">
                <div className="sticky top-28 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
                  {sidebar.heading && (
                    <h3 className="text-xs uppercase tracking-[0.22em] text-accent mb-4 font-bold flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {sidebar.heading}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {sidebar.links.map((l) => {
                      const active = pathname === l.to;
                      return (
                        <li key={l.to}>
                          <Link
                            to={l.to}
                            className={`group flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                              active
                                ? "bg-accent/10 text-accent border-l-2 border-accent"
                                : "text-foreground/85 hover:bg-secondary/30 hover:text-foreground"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {active && <ChevronRight className="size-3.5 text-accent" />}
                              {l.label}
                            </span>
                            {!active && (
                              <ArrowRight className="size-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};
