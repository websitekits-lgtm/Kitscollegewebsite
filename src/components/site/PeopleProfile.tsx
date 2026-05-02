import { ReactNode } from "react";
import { User, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

interface PeopleProfileProps {
  eyebrow?: string;
  title: string;
  breadcrumb?: { label: string; to?: string }[];
  /** Person's full name */
  name: string;
  /** Designation (e.g., "Chairman", "Secretary & Correspondent") */
  designation: string;
  /** Optional qualifications (e.g., "Ph.D., M.Tech.") */
  qualifications?: string;
  /** Photo URL — falls back to placeholder icon if not provided */
  photo?: string;
  /** Personal message / welcome note paragraphs */
  message?: string[];
  /** Optional bullet points (achievements, focus areas) */
  highlights?: string[];
  /** Optional extra body content */
  children?: ReactNode;
}

/**
 * Profile page for Chairman / Secretary / Principal / Governing Body members.
 */
export const PeopleProfile = ({
  eyebrow,
  title,
  breadcrumb,
  name,
  designation,
  qualifications,
  photo,
  message,
  highlights,
  children,
}: PeopleProfileProps) => {
  return (
    <SiteLayout>
      <PageHeader eyebrow={eyebrow} title={title} breadcrumb={breadcrumb} />

      <section className="bg-background py-12 md:py-16 lg:py-20">
        <div className="container-tight">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Photo + caption */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl overflow-hidden border border-border bg-muted shadow-[var(--shadow-card)] aspect-[3/4]">
                {photo ? (
                  <img
                    src={photo}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center bg-secondary/20">
                    <User className="size-24 text-muted-foreground/40" strokeWidth={1.2} />
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h2 className="font-display text-xl font-semibold text-foreground">{name}</h2>
                <p className="text-sm uppercase tracking-[0.18em] text-accent mt-1">{designation}</p>
                {qualifications && (
                  <p className="text-xs text-muted-foreground mt-1">{qualifications}</p>
                )}
              </div>
            </div>

            {/* Message + content */}
            <div className="lg:col-span-8">
              {message && message.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)] mb-8">
                  <Quote className="size-8 text-accent/40 mb-3" />
                  {message.map((para, i) => (
                    <p key={i} className="text-base text-foreground/85 leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                  <p className="mt-6 font-display text-base font-semibold text-foreground">— {name}</p>
                </div>
              )}

              {highlights && highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Key Highlights</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                      >
                        <span className="mt-1.5 inline-block size-2 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-foreground/85 leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {children && <div className="prose prose-neutral max-w-none">{children}</div>}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};
