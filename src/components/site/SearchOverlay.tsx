import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, GraduationCap, Calendar, Info, ArrowRight } from "lucide-react";
import { searchAll, type SearchResult, type SearchResultType } from "@/lib/searchIndex";

const ICON_BY_TYPE: Record<SearchResultType, typeof FileText> = {
  page: FileText,
  department: GraduationCap,
  event: Calendar,
  info: Info,
};

const TYPE_LABEL: Record<SearchResultType, string> = {
  page: "Page",
  department: "Department",
  event: "Event",
  info: "Info",
};

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchAll(query, 12), [query]);

  // Focus input when overlay opens; clear when closed
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setActiveIdx(0);
    }
  }, [open]);

  // Reset highlighted result when query changes
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  const goTo = (item: SearchResult) => {
    onClose();
    navigate(item.url);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[activeIdx]) {
      e.preventDefault();
      goTo(results[activeIdx]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in" role="dialog" aria-modal="true" aria-label="Search">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative mx-auto mt-[10vh] sm:mt-[15vh] w-[92%] max-w-2xl rounded-2xl border border-border bg-background shadow-[var(--shadow-elegant)] overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-border">
          <Search className="size-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages, departments, events..."
            className="flex-1 bg-transparent border-0 outline-none text-base sm:text-lg text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary/40 transition-colors shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <EmptyHints onPick={goTo} />
          ) : results.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No results found for &ldquo;<span className="text-foreground">{query}</span>&rdquo;.
            </div>
          ) : (
            <ul className="py-2">
              {results.map((r, idx) => {
                const Icon = ICON_BY_TYPE[r.type];
                const active = idx === activeIdx;
                return (
                  <li key={`${r.type}-${r.url}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => goTo(r)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`w-full flex items-start gap-3 px-4 sm:px-5 py-3 text-left transition-colors ${
                        active ? "bg-secondary/30" : "hover:bg-secondary/20"
                      }`}
                    >
                      <div className="grid size-9 place-items-center rounded-md bg-accent/10 text-accent shrink-0 mt-0.5">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-accent font-medium mb-0.5">
                          {TYPE_LABEL[r.type]}
                        </div>
                        <div className="text-sm font-medium text-foreground line-clamp-1">
                          {r.title}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {r.description}
                        </div>
                      </div>
                      <ArrowRight
                        className={`size-4 shrink-0 transition-opacity mt-2 ${
                          active ? "opacity-100 text-accent" : "opacity-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer hints */}
        <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-border bg-secondary/10 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">↑↓</kbd>
            Navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">Enter</kbd>
            Open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
};

// Quick suggestions when search is empty
const EmptyHints = ({ onPick }: { onPick: (item: SearchResult) => void }) => {
  const popular: SearchResult[] = [
    { type: "info", title: "Apply Now — Admissions 2025-26", description: "Submit application for the upcoming academic year", url: "/admissions" },
    { type: "page", title: "Departments", description: "Explore our seven engineering branches", url: "/departments" },
    { type: "page", title: "Placements", description: "Latest placement statistics and recruiters", url: "/placements" },
    { type: "info", title: "EAPCET Code: KCIT", description: "Use code KCIT during counselling", url: "/admissions" },
    { type: "page", title: "Contact", description: "Reach us by phone, email or visit campus", url: "/contact" },
  ];

  return (
    <div className="px-4 sm:px-5 py-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2 px-1">
        Popular
      </div>
      <ul className="space-y-1">
        {popular.map((p) => {
          const Icon = ICON_BY_TYPE[p.type];
          return (
            <li key={p.url + p.title}>
              <button
                type="button"
                onClick={() => onPick(p)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left hover:bg-secondary/20 transition-colors"
              >
                <Icon className="size-4 text-accent shrink-0" />
                <span className="text-sm text-foreground flex-1 line-clamp-1">{p.title}</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
