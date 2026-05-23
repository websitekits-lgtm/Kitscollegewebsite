import { Link } from "react-router-dom";
import {
  ClipboardCheck, ScrollText, Award, FileWarning, Bell, Send,
  Upload, Calendar, AlertTriangle, FileText, Link2, Check,
} from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/portal/lib/auth";
import {
  hallTicketReleases, pendingHallTickets, pendingResultsCount,
  pendingRevaluations, revaluationRequests, marksUploadJobs,
} from "@/portal/mock/examData";
import { examSchedule, notifications } from "@/portal/mock/studentData";
import { roster } from "@/portal/mock/college";

const ExamDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Officer";

  const upcomingExams = [...examSchedule].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const recentRevals = revaluationRequests.slice(0, 4);
  const examNotices = notifications.filter((n) => n.category === "Exam").slice(0, 4);
  const studentsWithBacklogs = roster.filter((r) => r.backlogs > 0).length;
  const shortageStudents = roster.filter((r) => r.attendancePct < 75).length;

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome, ${firstName}`}
        subtitle="Controller of Examinations — Exam Cell"
        icon={ClipboardCheck}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>This portal <span className="font-semibold">owns</span> exam schedules, hall tickets, results and revaluation. Student / HOD / Principal portals read this data.</span>
      </div>

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming Exams" value={examSchedule.length} helper="External — Sem 6" icon={ClipboardCheck} tint="from-rose-400/20 to-rose-400/5" />
        <StatCard label="Pending Results" value={pendingResultsCount} helper="To process & publish" icon={Award} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Hall Tickets" value={pendingHallTickets} helper="Pending releases" icon={ScrollText} tint={pendingHallTickets ? "from-destructive/20 to-destructive/5" : "from-emerald-400/20 to-emerald-400/5"} />
        <StatCard label="Revaluations" value={pendingRevaluations} helper="Awaiting decision" icon={FileWarning} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Upcoming exams */}
        <SectionCard
          title="Upcoming Exams"
          description={`${upcomingExams.length} papers in next 14 days`}
          action={{ label: "Manage", to: "/portal/exam/examinations" }}
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border">
            {upcomingExams.map((e) => (
              <li key={e.code} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="w-24 shrink-0 text-xs font-bold tabular-nums text-rose-500">{e.date}</div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-foreground">{e.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.code} • {e.time}</p>
                </div>
                <Badge variant="outline" className="border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300">{e.type}</Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Quick actions */}
        <SectionCard title="Quick Actions" description="Frequent workflows.">
          <div className="grid grid-cols-2 gap-2">
            <QuickAction icon={Calendar} label="Schedule Exam" to="/portal/exam/examinations" />
            <QuickAction icon={Upload} label="Upload Marks" to="/portal/exam/results" />
            <QuickAction icon={ScrollText} label="Hall Tickets" to="/portal/exam/examinations" />
            <QuickAction icon={Send} label="Publish Notice" to="/portal/exam/notifications" />
            <QuickAction icon={FileWarning} label="Revaluation" to="/portal/exam/revaluation" />
            <QuickAction icon={Award} label="Results" to="/portal/exam/results" />
          </div>
        </SectionCard>

        {/* Hall ticket alerts */}
        <SectionCard
          title="Hall Ticket Status"
          description={`${hallTicketReleases.filter(h => h.released).length} of ${hallTicketReleases.length} released`}
          action={{ label: "Manage", to: "/portal/exam/examinations" }}
        >
          <ul className="space-y-2">
            {hallTicketReleases.map((h) => (
              <li key={h.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                <ScrollText className="size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Sem {h.semester} • {h.examType}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {h.studentsCount} students • {h.releaseDate ?? "—"}
                  </p>
                </div>
                <Badge variant="outline" className={
                  h.released
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                }>
                  {h.released ? <><Check className="size-3 mr-1" /> Released</> : "Pending"}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Recent revaluation requests */}
        <SectionCard
          title="Recent Revaluation"
          description={`${pendingRevaluations} pending review`}
          action={{ label: "Open queue", to: "/portal/exam/revaluation" }}
        >
          <ul className="space-y-2">
            {recentRevals.map((r) => (
              <li key={r.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                <FileWarning className="mt-0.5 size-4 text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{r.paperName}</p>
                  <p className="text-xs font-mono text-muted-foreground">{r.rollNo} • {r.paperCode}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    r.status === "Awarded" || r.status === "Re-evaluated"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : r.status === "No Change"
                        ? "border-border"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  }
                >
                  {r.status}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Student eligibility alerts */}
        <SectionCard
          title="Eligibility Alerts"
          description="Students potentially ineligible to write exams"
          className="lg:col-span-2"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-border p-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Attendance below 75%</p>
              <p className="font-display text-2xl font-bold tabular-nums text-destructive mt-1">{shortageStudents}</p>
              <p className="text-xs text-muted-foreground">Sample roster — extrapolate</p>
              <Button asChild size="sm" variant="outline" className="mt-3 h-8">
                <Link to="/portal/exam/records">Open list</Link>
              </Button>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">With active backlogs</p>
              <p className="font-display text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-300 mt-1">{studentsWithBacklogs}</p>
              <p className="text-xs text-muted-foreground">Need supplementary registration</p>
              <Button asChild size="sm" variant="outline" className="mt-3 h-8">
                <Link to="/portal/exam/records">Backlogs</Link>
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* Marks-upload jobs */}
        <SectionCard
          title="Marks Upload Pipeline"
          description="Status per subject — Sem 6 internals"
          className="lg:col-span-3"
          action={{ label: "Open results", to: "/portal/exam/results" }}
        >
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {marksUploadJobs.map((m) => (
              <li key={m.id} className="rounded-md border border-border p-3 bg-card">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">{m.paperName}</p>
                  <Badge variant="outline" className={
                    m.status === "Published" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : m.status === "Uploaded" ? "border-accent/30 bg-accent/10 text-accent"
                    : m.status === "Locked"   ? "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  }>{m.status}</Badge>
                </div>
                <p className="text-xs font-mono text-muted-foreground mt-1">{m.paperCode}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {m.uploadedBy ? <>by {m.uploadedBy} • <span className="tabular-nums">{m.uploadedOn}</span></> : "—"}
                </p>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Exam notices */}
        <SectionCard
          title="Recent Notices"
          description="Same notices students see"
          className="lg:col-span-3"
          action={{ label: "All", to: "/portal/exam/notifications" }}
        >
          <ul className="divide-y divide-border">
            {examNotices.map((n) => (
              <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Bell className="mt-0.5 size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{n.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{n.body}</p>
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

export const _unused = { AlertTriangle, FileText };

export default ExamDashboard;
