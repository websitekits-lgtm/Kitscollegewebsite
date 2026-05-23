import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  /** Optional helper text below the value */
  helper?: string;
  icon?: LucideIcon;
  /** Trend percentage (positive = up, negative = down). Omit for neutral. */
  trend?: number;
  /** Optional Tailwind classes for an accent tint (e.g., "from-accent/20 to-accent/5"). */
  tint?: string;
}

/**
 * Compact KPI card used on dashboards.
 * Layout: icon top-right + label + big value + helper + optional trend arrow.
 */
export const StatCard = ({ label, value, helper, icon: Icon, trend, tint = "from-accent/15 to-accent/5" }: StatCardProps) => {
  const trendUp = typeof trend === "number" && trend > 0;
  const trendDown = typeof trend === "number" && trend < 0;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 shadow-[0_2px_12px_-6px_hsl(var(--primary)/0.1)]">
      <span aria-hidden className={cn("absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br pointer-events-none", tint)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground leading-tight min-w-0 break-words">
            {label}
          </p>
          {Icon && (
            <div className="hidden sm:grid size-8 lg:size-9 place-items-center rounded-lg bg-accent/10 text-accent shrink-0">
              <Icon className="size-4" />
            </div>
          )}
        </div>
        <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground tabular-nums break-words leading-tight">
          {value}
        </p>
        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
          {helper && <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{helper}</p>}
          {typeof trend === "number" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold shrink-0",
                trendUp && "text-emerald-600 dark:text-emerald-400",
                trendDown && "text-destructive",
                !trendUp && !trendDown && "text-muted-foreground",
              )}
            >
              {trendUp && <ArrowUpRight className="size-3" />}
              {trendDown && <ArrowDownRight className="size-3" />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
