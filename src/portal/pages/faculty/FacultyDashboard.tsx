import { Link } from "react-router-dom";
import {
  UserCog,
  Calendar,
  CalendarCheck,
  ClipboardCheck,
  BookOpen,
  Bell,
  Send,
  Upload,
  AlertTriangle,
  Users,
} from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/portal/lib/auth";
import {
  assignedFaculty,
  facultyTimetable,
  facultySubjects,
  pendingAttendanceSessions,
  mentoringNotes,
  invigilationDuties,
} from "@/portal/mock/facultyData";
import { roster } from "@/portal/mock/college";
import { notifications } from "@/portal/mock/studentData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const todayCode = DAYS[new Date().getDay()];

const FacultyDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Faculty";

  const todayClasses = facultyTimetable
    .filter((t) => t.day === todayCode)
    .sort((a, b) => a.period - b.period);

  // Students who would be flagged based on shared roster data
  const shortageStudents = roster.filter((s) => s.attendancePct < 75).length;
  const criticalMentees = mentoringNotes.filter((n) => n.flag === "critical").length;
  const recentNotifications = notifications.slice(0, 4);

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome, ${firstName}`}
        subtitle={`${assignedFaculty.designation} • ${assignedFaculty.department} Department`}
        icon={UserCog}
      />

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's Classes"
          value={todayClasses.length}
          helper={`${todayCode}`}
          icon={Calendar}
        />
        <StatCard
          label="Pending Attendance"
          value={pendingAttendanceSessions.length}
          helper="Sessions to mark"
          icon={CalendarCheck}
          tint={pendingAttendanceSessions.length ? "from-amber-400/20 to-amber-400/5" : "from-emerald-400/20 to-emerald-400/5"}
        />
        <StatCard
          label="Subjects Assigned"
          value={facultySubjects.length}
          helper="This semester"
          icon={BookOpen}
        />
        <StatCard
          label="Students at risk"
          value={shortageStudents}
          helper="Attendance < 75%"
          icon={AlertTriangle}
          tint="from-destructive/20 to-destructive/5"
        />
      </div>

      {/* Row 1: Today's classes (2/3) + stacked sidebar (Quick Actions + Pending Attendance) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Today's Classes"
          description={todayClasses.length ? `${todayClasses.length} sessions scheduled` : "No classes today."}
          action={{ label: "Full timetable", to: "/portal/faculty/timetable" }}
          className="lg:col-span-2"
        >
          {todayClasses.length === 0 ? (
            <p className="rounded-md border border-dashed border-border bg-secondary/5 px-4 py-6 text-center text-sm text-muted-foreground">
              Free day — catch up on lesson plans!
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
                    <p className="truncate text-xs text-muted-foreground">{cls.code} • {cls.room}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cls.type === "Lab" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border"}
                  >
                    {cls.type}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <div className="flex flex-col gap-6">
          <SectionCard title="Quick Actions" description="Frequent faculty workflows.">
            <div className="grid grid-cols-3 gap-2">
              <QuickAction icon={CalendarCheck} label="Mark Att." to="/portal/faculty/attendance" />
              <QuickAction icon={Upload} label="Material" to="/portal/faculty/academics" />
              <QuickAction icon={Send} label="Notice" to="/portal/faculty/notifications" />
              <QuickAction icon={Users} label="Students" to="/portal/faculty/students" />
              <QuickAction icon={ClipboardCheck} label="Assign." to="/portal/faculty/academics" />
              <QuickAction icon={Calendar} label="Timetable" to="/portal/faculty/timetable" />
            </div>
          </SectionCard>

          <SectionCard
            title="Pending Attendance"
            description={pendingAttendanceSessions.length ? "Mark before end of day." : "All caught up!"}
            action={pendingAttendanceSessions.length ? { label: "Mark now", to: "/portal/faculty/attendance" } : undefined}
            className="flex-1"
          >
            {pendingAttendanceSessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sessions waiting.</p>
            ) : (
              <ul className="space-y-2">
                {pendingAttendanceSessions.map((s) => (
                  <li key={s.code + s.period} className="flex items-start gap-3 rounded-md border border-border p-2.5">
                    <div className="grid size-9 place-items-center rounded-md bg-amber-500/10 text-amber-600 shrink-0">
                      <CalendarCheck className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{s.subject}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.startTime} • {s.room}</p>
                    </div>
                    <Button asChild size="sm" className="h-8">
                      <Link to="/portal/faculty/attendance">Mark</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>

        {/* Row 2: Mentoring (2/3) + Invigilation (1/3) — both already similar height */}
        <SectionCard
          title="Mentoring Alerts"
          description={`${criticalMentees} critical • ${mentoringNotes.length - criticalMentees} watch`}
          action={{ label: "View students", to: "/portal/faculty/students" }}
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border">
            {mentoringNotes.slice(0, 4).map((n) => (
              <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className={`mt-0.5 size-2.5 rounded-full shrink-0 ${
                  n.flag === "critical" ? "bg-destructive" : n.flag === "watch" ? "bg-amber-500" : "bg-emerald-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {n.studentName} <span className="font-mono text-xs font-normal text-muted-foreground">• {n.rollNo}</span>
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{n.note}</p>
                </div>
                <span className="text-xs tabular-nums text-foreground/70 shrink-0">{n.date}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Upcoming invigilation */}
        <SectionCard
          title="Invigilation Duties"
          description={`${invigilationDuties.length} upcoming`}
        >
          <ul className="space-y-2">
            {invigilationDuties.map((d) => (
              <li key={d.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                <div className="grid size-9 place-items-center rounded-md bg-rose-500/10 text-rose-600 shrink-0">
                  <ClipboardCheck className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{d.paper}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {d.date} • {d.session === "FN" ? "Forenoon" : "Afternoon"} • {d.hall}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Notifications strip — same source as student inbox */}
        <SectionCard
          title="Recent Notices"
          description="Same inbox students see"
          action={{ label: "All notices", to: "/portal/faculty/notifications" }}
          className="lg:col-span-3"
        >
          <ul className="divide-y divide-border">
            {recentNotifications.map((n) => (
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

const QuickAction = ({ icon: Icon, label, to }: { icon: typeof Calendar; label: string; to: string }) => (
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

export default FacultyDashboard;
