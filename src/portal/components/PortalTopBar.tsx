import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/portal/lib/auth";
import { ROLE_CONFIG } from "@/portal/lib/roles";
import { ThemeToggle } from "./ThemeToggle";

interface PortalTopBarProps {
  /** Mobile menu toggle handler */
  onOpenMobileNav: () => void;
}

/**
 * Top bar shown on every portal page.
 * - Mobile menu button (md:hidden)
 * - Search (placeholder for now)
 * - Notifications bell + theme toggle + user avatar (with dropdown)
 */
export const PortalTopBar = ({ onOpenMobileNav }: PortalTopBarProps) => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const cfg = ROLE_CONFIG[user.role];
  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-card/95 px-3 py-3 backdrop-blur sm:px-5">
      {/* Mobile menu */}
      <button
        type="button"
        className="grid size-9 place-items-center rounded-md border border-border md:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </button>

      {/* Search */}
      <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background/60 px-3 max-w-md">
        <Search className="size-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search…"
          className="h-9 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />

        <Link
          to={`${cfg.portalRoot}/notifications`}
          className="relative grid size-9 place-items-center rounded-md border border-border text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
        </Link>

        {/* Avatar w/ menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md border border-border px-2 py-1 hover:border-accent/40 transition-colors"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className={cn(
              "grid size-7 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white",
              cfg.accentClass,
            )}>
              {initials || "U"}
            </span>
            <span className="hidden sm:block max-w-[140px] truncate text-sm font-medium text-foreground">
              {user.name}
            </span>
          </button>

          {menuOpen && (
            <>
              {/* click-away */}
              <button
                aria-hidden
                tabIndex={-1}
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setMenuOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 z-20 mt-2 w-56 rounded-md border border-border bg-card p-2 shadow-lg"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <p className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {cfg.title}
                  </p>
                </div>
                <div className="my-1 h-px bg-border" />
                <Link
                  to={`${cfg.portalRoot}/settings`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-secondary/15 hover:text-foreground"
                  role="menuitem"
                >
                  Profile & Settings
                </Link>
                <Link
                  to={`${cfg.portalRoot}/support`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-secondary/15 hover:text-foreground"
                  role="menuitem"
                >
                  Support
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
