import { Link } from "react-router-dom";
import {
  Crown, Users, GraduationCap, CalendarCheck, Award, Briefcase, Wallet,
  BarChart3, Building2, Bell, Send, CheckCircle, AlertTriangle, FileText,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/portal/lib/auth";
import { institutionKPI, departmentSnapshots, institutionAlerts, approvalQueue } from "@/portal/mock/principalData";
import { notifications } from "@/portal/mock/studentData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const PrincipalDashboard = () => {
  const { user } = useAuth();
  const name = user?.name ?? "Principal";

  const performanceData = departmentSnapshots.map((d) => ({
    dept: d.shortName,
    attendance: d.attendancePct,
    pass: d.passPct,
    placement: d.placementPct,
  }));

  const criticalAlerts = institutionAlerts.filter((a) => a.severity === "critical");
  const highPriorityApprovals = approvalQueue.filter((a) => a.priority === "High");

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome, ${name}`}
        subtitle="Institution-wide overview — Krishna Chaitanya Institute of Technology & Sciences"
        icon={Crown}
      />

      {/* Institution KPIs — 6 across only at very wide widths to keep labels readable */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Students" value={institutionKPI.totalStudents.toLocaleString("en-IN")} helper={`${departmentSnapshots.length} departments`} icon={Users} />
        <StatCard label="Faculty" value={institutionKPI.totalFaculty} helper="Active" icon={GraduationCap} />
        <StatCard label="Attendance" value={`${institutionKPI.overallAttendancePct}%`} helper="Weighted avg" icon={CalendarCheck} trend={2} />
        <StatCard label="Pass %" value={`${institutionKPI.overallPassPct}%`} helper="Last sem" icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Placement" value={`${institutionKPI.overallPlacementPct}%`} helper={`₹ ${institutionKPI.highestPackageLpa} LPA peak`} icon={Briefcase} tint="from-rose-400/20 to-rose-400/5" />
        <StatCard label="Fee Collected" value={`${institutionKPI.feeCollectedPct}%`} helper={`₹ ${institutionKPI.utilisedBudgetCr} / ${institutionKPI.annualBudgetCr} Cr`} icon={Wallet} tint="from-amber-400/20 to-amber-400/5" />
      </div>

      {/* Row 1: Chart (2/3) + a STACKED right column (Quick Actions + Approvals) so no dead space */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard
          title="Department Performance"
          description="Attendance %, Pass %, Placement %"
          action={{ label: "Open departments", to: "/portal/principal/departments" }}
          className="lg:col-span-2"
          height="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="dept" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="attendance" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pass" fill="hsl(135 60% 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="placement" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Right column — Quick Actions on top, Approvals below. Matches chart height. */}
        <div className="flex flex-col gap-6">
          <SectionCard title="Quick Actions">
            <div className="grid grid-cols-3 gap-2">
              <QuickAction icon={Send} label="Notice" to="/portal/principal/notifications" />
              <QuickAction icon={BarChart3} label="Reports" to="/portal/principal/reports" />
              <QuickAction icon={Building2} label="Depts" to="/portal/principal/departments" />
              <QuickAction icon={CheckCircle} label="Approvals" to="/portal/principal/approvals" />
              <QuickAction icon={Users} label="Students" to="/portal/principal/students" />
              <QuickAction icon={Briefcase} label="Placements" to="/portal/principal/placements" />
            </div>
          </SectionCard>

          <SectionCard
            title="High-Priority Approvals"
            description={`${highPriorityApprovals.length} need decision`}
            action={{ label: "Open queue", to: "/portal/principal/approvals" }}
            className="flex-1"
          >
            <ul className="space-y-2">
              {highPriorityApprovals.slice(0, 3).map((a) => (
                <li key={a.id} className="flex items-start gap-3 rounded-md border border-border p-2.5">
                  <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive shrink-0 text-[10px]">
                    {a.priority}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground line-clamp-1">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{a.department} • {a.raisedBy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>

      {/* Row 2: Important Alerts (full width) + Recent Notices */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Important Alerts"
          description={`${criticalAlerts.length} critical • ${institutionAlerts.length - criticalAlerts.length} other`}
        >
          <ul className="divide-y divide-border">
            {institutionAlerts.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <AlertTriangle className={`mt-0.5 size-4 shrink-0 ${
                  a.severity === "critical" ? "text-destructive" : a.severity === "warning" ? "text-amber-500" : "text-accent"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground truncate">{a.title}</p>
                    <Badge
                      variant="outline"
                      className={
                        a.severity === "critical"
                          ? "border-destructive/30 bg-destructive/10 text-destructive text-[10px]"
                          : a.severity === "warning"
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px]"
                            : "border-border text-[10px]"
                      }
                    >
                      {a.severity}
                    </Badge>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="text-xs tabular-nums text-foreground/70 shrink-0">{a.date}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Recent Notices"
          description="Institution-wide feed"
          action={{ label: "All", to: "/portal/principal/notifications" }}
        >
          <ul className="divide-y divide-border">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Bell className="mt-0.5 size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="truncate text-sm font-semibold text-foreground">{n.title}</p>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{n.category}</Badge>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{n.body}</p>
                </div>
                <span className="text-xs tabular-nums text-foreground/70 shrink-0">{n.date}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </PortalLayout>
  );
};

const QuickAction = ({ icon: Icon, label, to }: { icon: typeof Users; label: string; to: string }) => (
  <Link
    to={to}
    className="group flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-secondary/5 p-3 text-center transition-all hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-0.5"
  >
    <span className="grid size-9 place-items-center rounded-md bg-accent/10 text-accent group-hover:scale-110 transition-transform">
      <Icon className="size-4" />
    </span>
    <span className="text-xs font-semibold text-foreground/85 group-hover:text-accent">{label}</span>
  </Link>
);

export const _unused = { FileText };

export default PrincipalDashboard;
