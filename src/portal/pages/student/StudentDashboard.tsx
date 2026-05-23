import { Link } from "react-router-dom";
import {
  Award,
  Bell,
  Calendar,
  ClipboardCheck,
  CalendarCheck,
  GraduationCap,
  Wallet,
  Briefcase,
  CircleDot,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/portal/lib/auth";
import {
  attendanceTrend,
  assignments,
  currentCGPA,
  examSchedule,
  feeInvoices,
  notifications,
  pendingAssignmentsCount,
  timetable,
  totalAttendancePercent,
  totalPendingFees,
  unreadNotificationCount,
  upcomingExamCount,
} from "@/portal/mock/studentData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const todayCode = DAYS[new Date().getDay()];

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const StudentDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Student";

  const todayClasses = timetable.filter((t) => t.day === todayCode).sort((a, b) => a.period - b.period);
  const upcomingAssignments = assignments
    .filter((a) => a.status === "Pending")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);
  const upcomingExams = [...examSchedule].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const recentNotifications = notifications.slice(0, 4);

  const pendingFee = feeInvoices.find((i) => i.status !== "Paid");

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Here's a quick snapshot of your semester."
        icon={GraduationCap}
      />

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Attendance"
          value={`${totalAttendancePercent}%`}
          helper="This semester"
          icon={CalendarCheck}
          trend={totalAttendancePercent >= 75 ? 2 : -3}
        />
        <StatCard
          label="Current CGPA"
          value={currentCGPA.toFixed(2)}
          helper="Up to Sem 5"
          icon={Award}
          tint="from-emerald-400/20 to-emerald-400/5"
        />
        <StatCard
          label="Upcoming Exams"
          value={upcomingExamCount}
          helper="External — Sem 6"
          icon={ClipboardCheck}
          tint="from-rose-400/20 to-rose-400/5"
        />
        <StatCard
          label="Pending Fees"
          value={formatINR(totalPendingFees)}
          helper={pendingFee ? `Due ${pendingFee.dueDate}` : "Cleared"}
          icon={Wallet}
          tint="from-amber-400/20 to-amber-400/5"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Today's timetable */}
        <SectionCard
          title="Today's Timetable"
          description={todayClasses.length ? `${todayCode}, ${todayClasses.length} classes scheduled` : "No classes today — enjoy the break!"}
          action={{ label: "Full timetable", to: "/portal/student/timetable" }}
          className="lg:col-span-2"
        >
          {todayClasses.length === 0 ? (
            <p className="rounded-md border border-dashed border-border bg-secondary/5 px-4 py-6 text-center text-sm text-muted-foreground">
              No classes scheduled.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {todayClasses.map((cls) => (
                <li key={cls.period} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="w-20 shrink-0 text-xs font-bold tabular-nums text-accent">
                    {cls.startTime}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-foreground">{cls.subject}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {cls.faculty} • {cls.room}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      cls.type === "Lab"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "border-border"
                    }
                  >
                    {cls.type}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* Quick actions */}
        <SectionCard title="Quick Actions" description="Jump straight to a module.">
          <div className="grid grid-cols-2 gap-2">
            <QuickAction icon={CalendarCheck} label="Attendance" to="/portal/student/attendance" />
            <QuickAction icon={ClipboardCheck} label="Exams" to="/portal/student/examinations" />
            <QuickAction icon={Wallet} label="Pay Fees" to="/portal/student/fees" />
            <QuickAction icon={Briefcase} label="Placements" to="/portal/student/placements" />
            <QuickAction icon={Calendar} label="Timetable" to="/portal/student/timetable" />
            <QuickAction icon={Bell} label="Notifications" to="/portal/student/notifications" />
          </div>
        </SectionCard>

        {/* Attendance trend chart */}
        <ChartCard
          title="Attendance Trend"
          description="Monthly attendance — current semester"
          action={{ label: "Details", to: "/portal/student/attendance" }}
          height="h-56"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
              />
              <Line type="monotone" dataKey="percent" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Upcoming exams */}
        <SectionCard
          title="Upcoming Exams"
          description="Next 3 papers"
          action={{ label: "See all", to: "/portal/student/examinations" }}
        >
          <ul className="space-y-2">
            {upcomingExams.map((e) => (
              <li key={e.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                <div className="grid size-10 place-items-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-300 shrink-0">
                  <ClipboardCheck className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{e.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.code} • {e.time}</p>
                </div>
                <span className="text-xs font-medium tabular-nums text-foreground/80">{e.date}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Pending assignments */}
        <SectionCard
          title="Pending Assignments"
          description={`${pendingAssignmentsCount} due soon`}
          action={{ label: "Open Academics", to: "/portal/student/academics" }}
        >
          {upcomingAssignments.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing pending — well done!</p>
          ) : (
            <ul className="space-y-2">
              {upcomingAssignments.map((a) => (
                <li key={a.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                  <CircleDot className="mt-0.5 size-4 text-amber-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.subject}</p>
                  </div>
                  <span className="text-xs font-medium tabular-nums text-foreground/80">Due {a.dueDate}</span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* Recent notifications */}
        <SectionCard
          title="Recent Notifications"
          description={`${unreadNotificationCount} unread`}
          action={{ label: "Open all", to: "/portal/student/notifications" }}
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border">
            {recentNotifications.map((n) => (
              <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="mt-0.5">
                  {n.unread ? (
                    <AlertTriangle className="size-4 text-accent" />
                  ) : (
                    <CheckCircle2 className="size-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
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

const QuickAction = ({ icon: Icon, label, to }: { icon: typeof CalendarCheck; label: string; to: string }) => (
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

export default StudentDashboard;
