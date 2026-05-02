import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, ExternalLink, type LucideIcon } from "lucide-react";

export interface LinkCard {
  label: string;
  description?: string;
  to?: string;        // internal route
  href?: string;      // external link
  isPdf?: boolean;    // marks PDFs (will show "Coming soon" tag)
  icon?: LucideIcon;  // custom icon
}

interface LinkCardGridProps {
  cards: LinkCard[];
  columns?: 2 | 3;
}

/**
 * Grid of link cards used on landing pages (Alumni, Examination, NAAC, IQAC, etc.).
 */
export const LinkCardGrid = ({ cards, columns = 3 }: LinkCardGridProps) => {
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-5`}>
      {cards.map((c) => {
        const Icon = c.icon ?? (c.isPdf ? FileText : c.href ? ExternalLink : ArrowUpRight);

        const inner = (
          <>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                <Icon className="size-5" />
              </div>
              {c.isPdf && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700">
                  Coming soon
                </span>
              )}
            </div>
            <h3 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug mb-1.5 group-hover:text-accent transition-colors">
              {c.label}
            </h3>
            {c.description && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {c.description}
              </p>
            )}
          </>
        );

        if (c.isPdf) {
          // PDF placeholder — non-clickable
          return (
            <div
              key={c.label}
              className="group relative rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] opacity-90 cursor-not-allowed"
            >
              {inner}
            </div>
          );
        }
        if (c.href) {
          return (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] hover:border-accent/40 transition-all duration-300"
            >
              {inner}
            </a>
          );
        }
        return (
          <Link
            key={c.label}
            to={c.to ?? "#"}
            className="group relative rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] hover:border-accent/40 transition-all duration-300"
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
};
