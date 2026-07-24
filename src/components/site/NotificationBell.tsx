import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/lib/useNotifications";

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "just now" : `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

/** Header bell — shows admin-published updates, live via Supabase realtime. */
export const NotificationBell = () => {
  const { items, unseenCount, markSeen } = useNotifications();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const toggle = () => {
    setOpen((o) => {
      if (!o) markSeen();
      return !o;
    });
  };

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={toggle}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative inline-flex size-9 sm:size-10 items-center justify-center rounded-sm border border-border text-foreground/80 hover:text-foreground hover:bg-secondary/30 transition-colors"
      >
        <Bell className="size-4 sm:size-[18px]" />
        {unseenCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 grid min-w-[18px] h-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground shadow-sm">
            {unseenCount > 9 ? "9+" : unseenCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[70vh] overflow-y-auto z-[60]",
            "rounded-xl border border-border bg-background shadow-2xl animate-fade-in",
          )}
        >
          <div className="px-4 py-3 border-b border-border flex items-center justify-between sticky top-0 bg-background">
            <p className="text-sm font-bold text-foreground">Updates & Announcements</p>
            <Bell className="size-4 text-accent" />
          </div>

          {items.length === 0 ? (
            <p className="px-4 py-8 text-sm text-muted-foreground text-center">
              No announcements right now. Check back soon.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((n) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground leading-snug">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">{timeAgo(n.created_at)}</span>
                    </div>
                    {n.body && <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{n.body}</p>}
                    {n.link_url && (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                        View <ArrowRight className="size-3" />
                      </span>
                    )}
                  </>
                );
                const cls = "block px-4 py-3 hover:bg-secondary/30 transition-colors";
                const external = n.link_url && /^https?:\/\//.test(n.link_url);
                return (
                  <li key={n.id}>
                    {n.link_url ? (
                      external ? (
                        <a href={n.link_url} target="_blank" rel="noopener noreferrer" className={cls} onClick={() => setOpen(false)}>
                          {inner}
                        </a>
                      ) : (
                        <Link to={n.link_url} className={cls} onClick={() => setOpen(false)}>
                          {inner}
                        </Link>
                      )
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
