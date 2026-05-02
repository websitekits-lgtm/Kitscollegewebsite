import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
  return (
    <SiteLayout>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} breadcrumb={breadcrumb} />

      <section className="bg-background py-12 md:py-16 lg:py-20">
        <div className="container-tight">
          <div className={`grid gap-10 ${sidebar ? "lg:grid-cols-12" : ""}`}>
            <article className={`prose prose-neutral max-w-none ${sidebar ? "lg:col-span-8" : ""}`}>
              {children}
            </article>

            {sidebar && (
              <aside className="lg:col-span-4">
                <div className="sticky top-28 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
                  {sidebar.heading && (
                    <h3 className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
                      {sidebar.heading}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {sidebar.links.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="group flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/85 hover:bg-secondary/30 hover:text-foreground transition-colors"
                        >
                          <span>{l.label}</span>
                          <ArrowRight className="size-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-accent transition-all" />
                        </Link>
                      </li>
                    ))}
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
