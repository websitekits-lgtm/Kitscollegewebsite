import { Link } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PortalPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  /** Breadcrumb items relative to the portal root. Leftmost should be the portal home. */
  breadcrumb?: { label: string; to?: string }[];
  /** Right-side actions (e.g., "Export", "Add new") */
  actions?: ReactNode;
}

/**
 * Page header used at the top of every portal page (under the top bar).
 * Composition: breadcrumb -> title row -> optional actions on the right.
 */
export const PortalPageHeader = ({ title, subtitle, icon: Icon, breadcrumb, actions }: PortalPageHeaderProps) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {b.to ? (
                <Link to={b.to} className="hover:text-accent transition-colors">
                  {b.label}
                </Link>
              ) : (
                <span>{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && <ChevronRight className="size-3" />}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent shrink-0">
            <Icon className="size-5" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);
