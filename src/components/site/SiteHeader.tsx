import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLLEGE, NAV, DEPARTMENTS } from "@/lib/college";
import { Button } from "@/components/ui/button";
import { SearchOverlay } from "@/components/site/SearchOverlay";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDept, setOpenDept] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const deptRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDept(false);
  }, [pathname]);

  // Close department dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!openDept) return;
    const onDown = (e: MouseEvent) => {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setOpenDept(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDept(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDept]);

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 bg-background border-b border-border",
        scrolled && "shadow-[0_2px_8px_-2px_hsl(var(--border))]",
      )}
    >
      <div className="w-full px-4 sm:px-5 lg:px-8 flex items-center justify-between gap-2 sm:gap-3 py-3 sm:py-5">
        <Link to="/" className="flex items-center gap-2 group shrink-0 min-w-0" aria-label="KITS Home">
          <img
            src="/kits-logo.png"
            alt="KITS Markapur Logo"
            className="h-10 w-10 sm:h-14 sm:w-14 object-contain shrink-0"
          />
          <div className="leading-tight block xl:hidden 2xl:block">
            <div className="font-display text-sm font-semibold text-foreground whitespace-nowrap">{COLLEGE.shortName} Markapur</div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap hidden sm:block">Krishna Chaitanya</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 flex-1 justify-center min-w-0">
          {NAV.filter((n) => n.label !== "Departments").slice(0, 4).map((n) => (
            <NavItem key={n.to} to={n.to} label={n.label} active={pathname === n.to} />
          ))}
          <div ref={deptRef} className="relative">
            <button
              type="button"
              onClick={() => setOpenDept((o) => !o)}
              aria-expanded={openDept}
              aria-haspopup="true"
              className="flex items-center gap-1 px-2 2xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-medium text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Departments
              <ChevronDown className={cn("size-3.5 transition-transform", openDept && "rotate-180")} />
            </button>
            {openDept && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-72 z-50">
                <div className="rounded-md border border-border bg-popover shadow-[var(--shadow-elegant)] p-2 animate-fade-in">
                  {DEPARTMENTS.map((d) => (
                    <Link
                      key={d.slug}
                      to={`/departments/${d.slug}`}
                      onClick={() => setOpenDept(false)}
                      className="block rounded px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      <div className="font-medium">{d.code}</div>
                      <div className="text-xs text-muted-foreground">{d.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {NAV.filter((n) => n.label !== "Departments").slice(4).map((n) => (
            <NavItem key={n.to} to={n.to} label={n.label} active={pathname === n.to} />
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="inline-flex size-9 sm:size-10 items-center justify-center rounded-sm border border-border text-foreground/80 hover:text-foreground hover:bg-secondary/30 transition-colors shrink-0"
          >
            <Search className="size-4 sm:size-[18px]" />
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-medium whitespace-nowrap">
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <button
            className="xl:hidden inline-flex size-9 sm:size-10 items-center justify-center rounded-sm border border-border text-foreground shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {open && (
        <div className="xl:hidden border-t border-border bg-background animate-fade-in max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="container-tight py-4 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "block rounded px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === n.to
                    ? "bg-secondary text-foreground"
                    : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                )}
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <div className="px-3 text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Departments</div>
              {DEPARTMENTS.map((d) => (
                <Link
                  key={d.slug}
                  to={`/departments/${d.slug}`}
                  className="block rounded px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                >
                  {d.code} — {d.name}
                </Link>
              ))}
            </div>
            <div className="sm:hidden pt-3 border-t border-border mt-3">
              <Button asChild size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-medium">
                <Link to="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavItem = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "px-2 2xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-medium transition-colors relative whitespace-nowrap",
      active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
    )}
  >
    {label}
    {active && <span className="absolute left-2 right-2 -bottom-0.5 h-px bg-accent" />}
  </Link>
);
