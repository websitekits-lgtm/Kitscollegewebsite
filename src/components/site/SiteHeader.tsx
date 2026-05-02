import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLLEGE } from "@/lib/college";
import { TOP_NAV, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { SearchOverlay } from "@/components/site/SearchOverlay";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
    setOpenMobileSection(null);
  }, [pathname]);

  // Click-outside / Escape closes desktop dropdown
  useEffect(() => {
    if (!openDropdown) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

  // Cmd/Ctrl+K opens search
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

  const isActive = (item: NavItem): boolean => {
    if (item.to && pathname === item.to) return true;
    if (item.links?.some((l) => pathname === l.to)) return true;
    if (item.groups?.some((g) => g.links.some((l) => pathname === l.to))) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 bg-background border-b border-border",
        scrolled && "shadow-[0_2px_8px_-2px_hsl(var(--border))]",
      )}
    >
      <div className="w-full px-4 sm:px-5 lg:px-6 flex items-center justify-between gap-3 lg:gap-4 py-3 sm:py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="KITS Home">
          <img
            src="/kits-logo.png"
            alt="KITS Markapur Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 xl:h-14 xl:w-14 object-contain shrink-0"
          />
          <div className="leading-tight block">
            <div className="font-display text-sm font-semibold text-foreground whitespace-nowrap">{COLLEGE.shortName} Markapur</div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap hidden sm:block xl:hidden 2xl:block">
              Krishna Chaitanya
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden xl:flex items-center gap-0.5 2xl:gap-1 flex-1 justify-center min-w-0">
          {TOP_NAV.map((item) => (
            <NavItemDesktop
              key={item.label}
              item={item}
              active={isActive(item)}
              isOpen={openDropdown === item.label}
              onToggle={() =>
                setOpenDropdown((prev) => (prev === item.label ? null : item.label))
              }
              onClose={() => setOpenDropdown(null)}
              currentPath={pathname}
            />
          ))}
        </nav>

        {/* Right side: search + apply + hamburger */}
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

      {/* Mobile nav */}
      {open && (
        <div className="xl:hidden border-t border-border bg-background animate-fade-in max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="container-tight py-4 space-y-1">
            {TOP_NAV.map((item) => (
              <NavItemMobile
                key={item.label}
                item={item}
                isOpen={openMobileSection === item.label}
                onToggle={() =>
                  setOpenMobileSection((prev) => (prev === item.label ? null : item.label))
                }
                currentPath={pathname}
              />
            ))}
            <div className="sm:hidden pt-3 border-t border-border mt-3">
              <Button asChild size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-medium">
                <Link to="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

// ===========================================================================
// Desktop nav item — supports direct link, flat dropdown, or grouped dropdown
// ===========================================================================
const NavItemDesktop = ({
  item,
  active,
  isOpen,
  onToggle,
  onClose,
  currentPath,
}: {
  item: NavItem;
  active: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  currentPath: string;
}) => {
  const baseLinkCls = cn(
    "px-2 2xl:px-3 py-2 text-[14px] 2xl:text-[15px] font-medium transition-colors relative whitespace-nowrap",
    active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
  );
  const accentLine = (
    <span className="absolute left-2 right-2 -bottom-0.5 h-px bg-accent" />
  );

  // 1) Direct link, no dropdown
  if (item.to && !item.links && !item.groups) {
    return (
      <Link to={item.to} className={baseLinkCls}>
        {item.label}
        {active && accentLine}
      </Link>
    );
  }

  // 2) Has dropdown (flat or grouped)
  const hasGroups = !!item.groups?.length;
  const wide = hasGroups || (item.links?.length ?? 0) > 8;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          baseLinkCls,
          "flex items-center gap-1",
          (active || isOpen) && "text-foreground",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
        />
        {active && accentLine}
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50",
            wide ? "w-[640px]" : "w-72",
          )}
        >
          <div className="rounded-md border border-border bg-popover shadow-[var(--shadow-elegant)] p-2 animate-fade-in">
            {hasGroups ? (
              <div className="grid grid-cols-2 gap-1">
                {item.groups!.map((g) => (
                  <div key={g.label}>
                    <p className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
                      {g.label}
                    </p>
                    <ul>
                      {g.links.map((l) => (
                        <DropdownLink
                          key={l.to}
                          to={l.to}
                          label={l.label}
                          active={currentPath === l.to}
                          onClick={onClose}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className={cn(wide && "grid grid-cols-2 gap-1")}>
                {item.links!.map((l) => (
                  <DropdownLink
                    key={l.to}
                    to={l.to}
                    label={l.label}
                    active={currentPath === l.to}
                    onClick={onClose}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownLink = ({
  to,
  label,
  active,
  onClick,
}: {
  to: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "block rounded px-3 py-2 text-sm transition-colors",
        active
          ? "bg-secondary/40 text-foreground font-medium"
          : "text-foreground/80 hover:bg-secondary/30 hover:text-foreground",
      )}
    >
      {label}
    </Link>
  </li>
);

// ===========================================================================
// Mobile nav item
// ===========================================================================
const NavItemMobile = ({
  item,
  isOpen,
  onToggle,
  currentPath,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}) => {
  // Direct link
  if (item.to && !item.links && !item.groups) {
    return (
      <Link
        to={item.to}
        className={cn(
          "block rounded px-3 py-2.5 text-sm font-medium transition-colors",
          currentPath === item.to
            ? "bg-secondary text-foreground"
            : "text-foreground/80 hover:bg-secondary",
        )}
      >
        {item.label}
      </Link>
    );
  }

  // Has dropdown — flat or grouped
  const flatLinks = item.links ?? item.groups?.flatMap((g) => g.links) ?? [];
  const hasActiveChild = flatLinks.some((l) => currentPath === l.to);

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full flex items-center justify-between rounded px-3 py-2.5 text-sm font-medium transition-colors",
          hasActiveChild
            ? "bg-secondary text-foreground"
            : "text-foreground/80 hover:bg-secondary",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="ml-3 pl-3 border-l border-border my-1 space-y-0.5">
          {item.groups
            ? item.groups.map((g) => (
                <div key={g.label}>
                  <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.16em] text-accent font-semibold">
                    {g.label}
                  </p>
                  {g.links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={cn(
                        "block rounded px-3 py-2 text-sm",
                        currentPath === l.to
                          ? "bg-secondary text-foreground font-medium"
                          : "text-foreground/75 hover:bg-secondary/40",
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))
            : item.links!.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "block rounded px-3 py-2 text-sm",
                    currentPath === l.to
                      ? "bg-secondary text-foreground font-medium"
                      : "text-foreground/75 hover:bg-secondary/40",
                  )}
                >
                  {l.label}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};
