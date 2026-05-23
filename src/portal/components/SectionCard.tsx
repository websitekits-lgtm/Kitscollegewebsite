import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  /** Optional "See all" link */
  action?: { label: string; to?: string; onClick?: () => void };
  /** Extra class names for the outer container */
  className?: string;
  /** Inner content */
  children: ReactNode;
}

/**
 * Generic dashboard section wrapper: title row + optional action + body.
 */
export const SectionCard = ({ title, description, action, className = "", children }: SectionCardProps) => {
  const actionEl = action ? (
    action.to ? (
      <Link to={action.to} className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
        {action.label} <ArrowUpRight className="size-3.5" />
      </Link>
    ) : (
      <button
        type="button"
        onClick={action.onClick}
        className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
      >
        {action.label} <ArrowUpRight className="size-3.5" />
      </button>
    )
  ) : null;

  return (
    <section className={`rounded-xl border border-border bg-card p-5 shadow-[0_2px_12px_-6px_hsl(var(--primary)/0.08)] ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actionEl}
      </div>
      {children}
    </section>
  );
};
