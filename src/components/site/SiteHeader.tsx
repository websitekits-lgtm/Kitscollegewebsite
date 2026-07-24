import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Search, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLLEGE } from "@/lib/college";
import { isNested, type NavItem, type NavLeaf, type NavNestedLeaf } from "@/lib/navigation";
import { useMergedNav } from "@/lib/useMergedNav";
import { Button } from "@/components/ui/button";
import { SearchOverlay } from "@/components/site/SearchOverlay";
import { NotificationBell } from "@/components/site/NotificationBell";

export const SiteHeader = () => {
  const TOP_NAV = useMergedNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  const openNav = useCallback((label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDropdown(label);
  }, []);

  const closeNav = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

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
    const matchesLeaf = (l: NavLeaf | NavNestedLeaf): boolean =>
      isNested(l) ? l.nested.some((sub) => pathname === sub.to) : pathname === l.to;
    if (item.links?.some(matchesLeaf)) return true;
    if (item.groups?.some((g) => g.links.some(matchesLeaf))) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 bg-background border-b border-border",
        scrolled && "shadow-[0_2px_8px_-2px_hsl(var(--border))]",
      )}
    >
      <div className="w-full px-3 sm:px-5 lg:px-6 flex items-center gap-3 lg:gap-4 xl:gap-5 py-3 sm:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0" aria-label="KITS Home">
          <img
            src="/kits-logo.png"
            alt="KITS Markapur Logo"
            className="h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 xl:h-14 xl:w-14 object-contain shrink-0"
          />
          <div className="leading-tight">
            <div className="font-display text-sm sm:text-base font-semibold text-foreground whitespace-nowrap">
              {COLLEGE.shortName} <span className="hidden sm:inline">Markapur</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap hidden sm:block">
              Krishna Chaitanya
            </div>
          </div>
        </Link>

        {/* Desktop nav — single row inline */}
        <nav ref={navRef} className="hidden xl:flex items-center gap-0 flex-1 justify-center min-w-0 px-4 2xl:px-8">
          {TOP_NAV.map((item) => (
            <NavItemDesktop
              key={item.label}
              item={item}
              active={isActive(item)}
              isOpen={openDropdown === item.label}
              onOpen={() => openNav(item.label)}
              onClose={closeNav}
              onCancelClose={cancelClose}
              onCloseImmediate={() => setOpenDropdown(null)}
              currentPath={pathname}
            />
          ))}
        </nav>

        {/* Spacer for narrow widths (when nav hidden) */}
        <div className="flex-1 xl:hidden" aria-hidden />

        {/* Right side actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="inline-flex size-9 sm:size-10 items-center justify-center rounded-sm border border-border text-foreground/80 hover:text-foreground hover:bg-secondary/30 transition-colors shrink-0"
          >
            <Search className="size-4 sm:size-[18px]" />
          </button>

          <NotificationBell />

          {/* Login — icon-only on small, full label on md+ */}
          <Link
            to="/login"
            className="hidden sm:inline-flex md:hidden size-10 items-center justify-center rounded-sm border border-border text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
            aria-label="Login"
          >
            <LogIn className="size-4" />
          </Link>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden md:inline-flex rounded-sm font-medium whitespace-nowrap border-border hover:border-accent/40 hover:text-accent"
          >
            <Link to="/login">
              <LogIn className="size-4" /> Login
            </Link>
          </Button>

          <Button asChild size="sm" className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-medium whitespace-nowrap">
            <Link to="/admissions/apply">Apply Now</Link>
          </Button>

          {/* Hamburger — visible until full nav (xl) shows */}
          <button
            className="xl:hidden inline-flex size-9 sm:size-10 items-center justify-center rounded-sm border border-border text-foreground shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer — shown below xl when hamburger clicked */}
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
            <div className="sm:hidden pt-3 border-t border-border mt-3 grid grid-cols-2 gap-2">
              <Button asChild size="sm" variant="outline" className="rounded-sm font-medium">
                <Link to="/login">
                  <LogIn className="size-4" /> Login
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-medium">
                <Link to="/admissions/apply">Apply Now</Link>
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
  onOpen,
  onClose,
  onCancelClose,
  onCloseImmediate,
  currentPath,
}: {
  item: NavItem;
  active: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCancelClose: () => void;
  onCloseImmediate: () => void;
  currentPath: string;
}) => {
  const baseLinkCls = cn(
    "px-2.5 2xl:px-3 py-1.5 rounded-md text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-150 relative whitespace-nowrap",
    active
      ? "text-foreground hover:bg-secondary/40"
      : "text-foreground/70 hover:text-foreground hover:bg-secondary/40",
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

  const dropdownPositionCls = wide
    ? item.dropdownAlign === "right"
      ? "right-0 w-[620px]"
      : "left-0 w-[620px]"
    : "left-1/2 -translate-x-1/2 w-72";

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          baseLinkCls,
          "flex items-center gap-1",
          isOpen && "text-foreground bg-secondary/40",
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
            "absolute top-full pt-2 z-50",
            dropdownPositionCls,
          )}
          onMouseEnter={onCancelClose}
          onMouseLeave={onClose}
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
                        <DropdownEntry
                          key={l.label}
                          link={l}
                          currentPath={currentPath}
                          onClose={onCloseImmediate}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className={cn(wide && "grid grid-cols-2 gap-1")}>
                {item.links!.map((l) => (
                  <DropdownEntry
                    key={l.label}
                    link={l}
                    currentPath={currentPath}
                    onClose={onCloseImmediate}
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

/**
 * One entry inside a dropdown.
 * - A regular leaf renders a Link.
 * - A nested-leaf renders a button that expands to show its child links inline below.
 */
const DropdownEntry = ({
  link,
  currentPath,
  onClose,
}: {
  link: NavLeaf | NavNestedLeaf;
  currentPath: string;
  onClose: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  if (isNested(link)) {
    const anyChildActive = link.nested.some((c) => currentPath === c.to);
    return (
      <li>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={cn(
            "w-full flex items-center justify-between rounded px-3 py-2 text-sm transition-colors",
            anyChildActive
              ? "bg-secondary/40 text-foreground font-medium"
              : "text-foreground/80 hover:bg-secondary/30 hover:text-foreground",
          )}
        >
          <span>{link.label}</span>
          <ChevronRight
            className={cn("size-3.5 transition-transform", expanded && "rotate-90")}
          />
        </button>
        {expanded && (
          <ul className="ml-3 mt-1 mb-1 pl-3 border-l border-border space-y-0.5">
            {link.nested.map((sub) => (
              <li key={sub.to}>
                <Link
                  to={sub.to}
                  onClick={onClose}
                  className={cn(
                    "block rounded px-3 py-1.5 text-sm transition-colors",
                    currentPath === sub.to
                      ? "bg-secondary/40 text-foreground font-medium"
                      : "text-foreground/75 hover:bg-secondary/30 hover:text-foreground",
                  )}
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <DropdownLink
      to={link.to}
      label={link.label}
      active={currentPath === link.to}
      onClick={onClose}
    />
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

  // Has dropdown — flat or grouped. Flatten for "active child" detection (skip nested for now).
  const flatLinks: NavLeaf[] = (item.links ?? item.groups?.flatMap((g) => g.links) ?? [])
    .flatMap((l) => (isNested(l) ? l.nested : [l]));
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
                    <MobileEntry key={l.label} link={l} currentPath={currentPath} />
                  ))}
                </div>
              ))
            : item.links!.map((l) => (
                <MobileEntry key={l.label} link={l} currentPath={currentPath} />
              ))}
        </div>
      )}
    </div>
  );
};

/** Renders either a regular Link or an expandable nested-section in the mobile drawer. */
const MobileEntry = ({
  link,
  currentPath,
}: {
  link: NavLeaf | NavNestedLeaf;
  currentPath: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  if (isNested(link)) {
    const anyActive = link.nested.some((c) => currentPath === c.to);
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={cn(
            "w-full flex items-center justify-between rounded px-3 py-2 text-sm",
            anyActive ? "bg-secondary text-foreground font-medium" : "text-foreground/75 hover:bg-secondary/40",
          )}
        >
          <span>{link.label}</span>
          <ChevronRight className={cn("size-4 transition-transform", expanded && "rotate-90")} />
        </button>
        {expanded && (
          <div className="ml-3 pl-3 border-l border-border my-1 space-y-0.5">
            {link.nested.map((sub) => (
              <Link
                key={sub.to}
                to={sub.to}
                className={cn(
                  "block rounded px-3 py-1.5 text-sm",
                  currentPath === sub.to
                    ? "bg-secondary text-foreground font-medium"
                    : "text-foreground/75 hover:bg-secondary/40",
                )}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={link.to}
      className={cn(
        "block rounded px-3 py-2 text-sm",
        currentPath === link.to
          ? "bg-secondary text-foreground font-medium"
          : "text-foreground/75 hover:bg-secondary/40",
      )}
    >
      {link.label}
    </Link>
  );
};
