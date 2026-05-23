import { Link } from "react-router-dom";
import {
  Users, GraduationCap, CalendarCheck, Award, Briefcase, TrendingUp,
  BarChart3, Bell, FileText, Send, ClipboardCheck, AlertTriangle, Building2,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/portal/lib/auth";
import { roster, facultyDirectory, departments } from "@/portal/mock/college";
import {
  pendingApprovals, departmentResults, placementStats, studentAlerts,
} from "@/portal/mock/hodData";
import { notifications } from "@/portal/mock/studentData";

const cseDept = departments.find((d) => d.code === "CSE")!;
const cseFaculty = facultyDirectory.filter((f) => f.department === "CSE");

const HodDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "HoD";

  const avgAttendance = Math.round(roster.reduce((s, r) => s + r.attendancePct, 0) / roster.length);
  const lastResult = departmentResults.at(-1)!;
  const lastPlacement = placementStats.at(-1)!;
  const passTrend = departmentResults.map((r) => ({ sem: `S${r.semester}`, pct: r.passPct }));

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome, ${firstName}`}
        subtitle={`${cseDept.name} — Department oversight`}
        icon={Building2}
      />

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={cseDept.totalStudents} helper={`Intake ${cseDept.intake}/yr`} icon={Users} />
        <StatCard label="Faculty" value={cseFaculty.length} helper="Active members" icon={GraduationCap} />
        <StatCard label="Avg Attendance" value={`${avgAttendance}%`} helper="3rd year • Sec A" icon={CalendarCheck} trend={avgAttendance >= 75 ? 2 : -4} />
        <StatCard label="Pass %" value={`${lastResult.passPct}%`} helper={`Sem ${lastResult.semester}`} icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
      </div>

      {/* Row 1: chart (2/3) + stacked sidebar (Alerts above, Quick Actions below) matching chart height */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Department Pass %" description="Across last 5 semesters" className="lg:col-span-2" height="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={passTrend} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="sem" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="pct" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="flex flex-col gap-6">
          <SectionCard
            title="Student Alerts"
            description="Issues needing your attention."
            action={{ label: "View students", to: "/portal/hod/students" }}
          >
            <ul className="space-y-2">
              <AlertRow icon={CalendarCheck} label="Attendance < 75%" value={studentAlerts.attendanceBelow75} tint="amber" />
              <AlertRow icon={Award} label="Multiple backlogs" value={studentAlerts.multipleBacklogs} tint="rose" />
              <AlertRow icon={AlertTriangle} label="Fee overdue" value={studentAlerts.feeOverdue} tint="rose" />
              <AlertRow icon={Users} label="Mentor escalations" value={studentAlerts.mentorEscalations} tint="amber" />
            </ul>
          </SectionCard>

          <SectionCard title="Quick Actions" description="Frequent HoD workflows." className="flex-1">
            <div className="grid grid-cols-3 gap-2">
              <QuickAction icon={CalendarCheck} label="Attendance" to="/portal/hod/students" />
              <QuickAction icon={GraduationCap} label="Faculty" to="/portal/hod/faculty" />
              <QuickAction icon={Send} label="Notice" to="/portal/hod/notifications" />
              <QuickAction icon={BarChart3} label="Reports" to="/portal/hod/reports" />
              <QuickAction icon={ClipboardCheck} label="Exams" to="/portal/hod/examinations" />
              <QuickAction icon={Briefcase} label="Placements" to="/portal/hod/placements" />
            </div>
          </SectionCard>
        </div>

        {/* Pending approvals — full width below the chart row */}
        <SectionCard
          title="Pending Approvals"
          description={`${pendingApprovals.length} items in your queue`}
          action={{ label: "Open queue", to: "/portal/hod/faculty" }}
          className="lg:col-span-3"
        >
          <ul className="divide-y divide-border">
            {pendingApprovals.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Badge
                  variant="outline"
                  className={
                    a.priority === "High"
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : a.priority === "Medium"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        : "border-border"
                  }
                >
                  {a.priority}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground truncate">{a.subject}</p>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{a.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">by {a.raisedBy} • {a.raisedOn}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" className="h-8">Approve</Button>
                  <Button size="sm" variant="outline" className="h-8">View</Button>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

      </div>

      {/* Row 3: Placement chart (2/3) + 2x2 KPI stack (1/3) so no dead space */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Placement % — last 5 years" description="Yearly trend" className="lg:col-span-2" height="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementStats} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="placementPct" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Placement / SGPA mini KPI stack — 2x2 grid in the remaining column */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Placement %" value={`${lastPlacement.placementPct}%`} helper={`${lastPlacement.placed} / ${lastPlacement.registered}`} icon={Briefcase} tint="from-emerald-400/20 to-emerald-400/5" />
          <StatCard label="Highest" value={`₹ ${lastPlacement.highestLpa} L`} helper={`Year ${lastPlacement.year}`} icon={TrendingUp} tint="from-rose-400/20 to-rose-400/5" />
          <StatCard label="Avg Offer" value={`₹ ${lastPlacement.avgLpa} L`} helper="Median" icon={Award} />
          <StatCard label="SGPA Avg" value={lastResult.avgSgpa.toFixed(2)} helper={`Sem ${lastResult.semester}`} icon={GraduationCap} tint="from-accent/20 to-accent/5" />
        </div>
      </div>

      {/* Recent notices — full width */}
      <div className="mt-6">
        <SectionCard
          title="Recent Notices"
          description="Department-wide feed"
          action={{ label: "All", to: "/portal/hod/notifications" }}
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

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const AlertRow = ({ icon: Icon, label, value, tint }: { icon: typeof Users; label: string; value: number; tint: "amber" | "rose" }) => (
  <li className="flex items-center justify-between rounded-md border border-border p-3">
    <div className="flex items-center gap-2">
      <Icon className={tint === "rose" ? "size-4 text-destructive" : "size-4 text-amber-500"} />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
    <Badge
      variant="outline"
      className={tint === "rose" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"}
    >
      {value}
    </Badge>
  </li>
);

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

// Avoid unused import warning if FileText not used elsewhere
export const _ = { FileText };

export default HodDashboard;
