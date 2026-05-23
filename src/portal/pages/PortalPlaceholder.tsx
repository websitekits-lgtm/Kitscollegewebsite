import { Construction, LayoutDashboard } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { EmptyState } from "@/portal/components/EmptyState";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { useAuth } from "@/portal/lib/auth";
import { ROLE_CONFIG } from "@/portal/lib/roles";

interface PortalPlaceholderProps {
  /** Module name (e.g. "Attendance"). Omit for the portal dashboard. */
  moduleName?: string;
  /** Optional supporting copy */
  description?: string;
}

/**
 * Temporary page used while the real portal modules are being built.
 * Renders the full PortalLayout shell so the sidebar / topbar / dark mode
 * can be tested end-to-end before any feature work begins.
 */
const PortalPlaceholder = ({ moduleName, description }: PortalPlaceholderProps) => {
  const { user } = useAuth();
  if (!user) return null;
  const cfg = ROLE_CONFIG[user.role];

  const isDashboard = !moduleName;
  const title = isDashboard ? `Welcome, ${user.name.split(" ")[0] || "there"}` : moduleName;

  return (
    <PortalLayout>
      <PortalPageHeader
        title={title}
        subtitle={
          description ??
          (isDashboard
            ? `You are signed in as ${cfg.title}. This dashboard will be filled in next.`
            : "This module is being built. Real data, charts, and actions will replace this placeholder soon.")
        }
        icon={isDashboard ? LayoutDashboard : Construction}
        breadcrumb={
          isDashboard
            ? undefined
            : [
                { label: cfg.title, to: cfg.portalRoot },
                { label: moduleName! },
              ]
        }
      />

      {isDashboard ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active modules" value="—" helper="Sample widget" />
          <StatCard label="Pending tasks" value="—" helper="Sample widget" />
          <StatCard label="Notifications" value="—" helper="Sample widget" />
          <StatCard label="This week" value="—" helper="Sample widget" />
        </div>
      ) : null}

      <div className="mt-6">
        <SectionCard
          title={isDashboard ? "Your portal is ready" : "Module under construction"}
          description={isDashboard ? "Sidebar, top bar, dark mode, and routing are wired up." : undefined}
        >
          <EmptyState
            icon={Construction}
            title="Coming soon"
            description="Real data and interactions will appear here as we build each module."
          />
        </SectionCard>
      </div>
    </PortalLayout>
  );
};

export default PortalPlaceholder;
