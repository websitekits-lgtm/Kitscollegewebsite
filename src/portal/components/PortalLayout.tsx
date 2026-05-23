import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PortalSidebar } from "./PortalSidebar";
import { PortalTopBar } from "./PortalTopBar";

interface PortalLayoutProps {
  children: ReactNode;
}

/**
 * Shared shell for every portal page.
 * Composition: fixed sidebar (left) + sticky top bar + scrollable content.
 * The sidebar has two states: full (w-64) and collapsed (w-16) on desktop;
 * on mobile it is a drawer overlay.
 */
export const PortalLayout = ({ children }: PortalLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <PortalSidebar
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="md:hidden">
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 animate-in slide-in-from-left">
            <PortalSidebar
              collapsed={false}
              onToggleCollapsed={() => setMobileOpen(false)}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content area — offset for the fixed desktop sidebar */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding] duration-200",
          collapsed ? "md:pl-16" : "md:pl-64",
        )}
      >
        <PortalTopBar onOpenMobileNav={() => setMobileOpen(true)} />
        <main className="flex-1 px-3 py-5 sm:px-5 sm:py-7 lg:px-6 lg:py-8 min-w-0">{children}</main>
      </div>
    </div>
  );
};
