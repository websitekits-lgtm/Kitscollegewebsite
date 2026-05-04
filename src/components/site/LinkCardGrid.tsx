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
 * Grid of link cards used on landing pages.
 * Cards have:
 *  - top accent gradient strip (animated on hover)
 *  - icon badge with subtle gradient + rotate hover
 *  - decorative corner shape
 *  - hover lift + accent border
 */
export const LinkCardGrid = ({ cards, columns = 3 }: LinkCardGridProps) => {
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-5`}>
      {cards.map((c) => {
        const Icon = c.icon ?? (c.isPdf ? FileText : c.href ? ExternalLink : ArrowUpRight);
        const baseCls =
          "group relative rounded-2xl border-2 border-border bg-card p-5 sm:p-6 shadow-[0_4px_20px_-8px_hsl(var(--primary)/0.08)] overflow-hidden transition-all duration-300";

        const inner = (
          <>
            {/* Decorative corner shape */}
            <span
              className="absolute -top-12 -right-12 size-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500"
              aria-hidden
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 text-accent border border-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icon className="size-5" />
                </div>
                {c.isPdf && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 shrink-0">
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

              {/* Bottom indicator — arrow appears on hover */}
              {!c.isPdf && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent mt-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  {c.href ? "Open external" : "Open page"}
                  <ArrowUpRight className="size-3.5" />
                </span>
              )}
            </div>
          </>
        );

        if (c.isPdf) {
          return (
            <div key={c.label} className={`${baseCls} opacity-90 cursor-not-allowed`}>
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
              className={`${baseCls} hover:shadow-[0_16px_40px_-12px_hsl(var(--primary)/0.18)] hover:border-accent/40 hover:-translate-y-1`}
            >
              {inner}
            </a>
          );
        }
        return (
          <Link
            key={c.label}
            to={c.to ?? "#"}
            className={`${baseCls} hover:shadow-[0_16px_40px_-12px_hsl(var(--primary)/0.18)] hover:border-accent/40 hover:-translate-y-1`}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
};
