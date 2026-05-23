import { NavLink, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { PORTAL_NAV } from "@/portal/lib/nav";
import { ROLE_CONFIG } from "@/portal/lib/roles";
import { useAuth } from "@/portal/lib/auth";

interface PortalSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  /** Mobile only — closes the drawer when a nav item is tapped */
  onNavigate?: () => void;
}

/**
 * Role-aware portal sidebar.
 * - Reads the current user's role from auth context
 * - Renders sections defined in PORTAL_NAV
 * - Highlights the active route (NavLink end-matches root, prefix-matches others)
 */
export const PortalSidebar = ({ collapsed, onToggleCollapsed, onNavigate }: PortalSidebarProps) => {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();

  if (!user) return null;

  const role = user.role;
  const sections = PORTAL_NAV[role];
  const cfg = ROLE_CONFIG[role];
  const Icon = cfg.Icon;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-card transition-[width] duration-200",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Brand + role */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-border px-4 py-4",
          collapsed && "justify-center px-2",
        )}
      >
        <div
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white",
            cfg.accentClass,
          )}
        >
          <Icon className="size-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">KITS Portal</p>
            <p className="truncate text-sm font-semibold text-foreground">{cfg.title}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className={cn(sIdx > 0 && "mt-6")}>
            {section.heading && !collapsed && (
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {section.heading}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const ItemIcon = item.Icon;
                // Root portal route (e.g. /portal/student) must end-match;
                // sub-routes can prefix-match so nested pages stay highlighted.
                const isRoot = item.to === cfg.portalRoot;
                const active = isRoot ? pathname === item.to : pathname.startsWith(item.to);

                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={isRoot}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent/10 text-accent"
                          : "text-foreground/75 hover:bg-secondary/15 hover:text-foreground",
                        collapsed && "justify-center px-2",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <ItemIcon className="size-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer — collapse + sign out */}
      <div className={cn("border-t border-border p-3", collapsed ? "space-y-2" : "flex items-center justify-between gap-2") }>
        <button
          type="button"
          onClick={signOut}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "w-full justify-center px-0",
          )}
          title="Sign out"
        >
          <LogOut className="size-4" />
          {!collapsed && <span>Sign out</span>}
        </button>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className={cn(
            "hidden md:grid size-9 place-items-center rounded-md border border-border text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors",
            collapsed && "mx-auto",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
    </aside>
  );
};
