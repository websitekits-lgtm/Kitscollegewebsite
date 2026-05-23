import { Link } from "react-router-dom";
import {
  Heart, CalendarCheck, Award, Wallet, Bell, AlertTriangle, Phone, Mail, MessageSquare, Link2,
  GraduationCap,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  attendanceTrend, currentCGPA, examSchedule, feeInvoices, notifications,
  totalAttendancePercent, totalPendingFees,
} from "@/portal/mock/studentData";
import { ward, wardMentor, wardClassTeacher, parentMessages } from "@/portal/mock/parentData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const ParentDashboard = () => {
  const pendingFee = feeInvoices.find((i) => i.status !== "Paid");
  const upcomingExams = [...examSchedule].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const recentNotices = notifications.slice(0, 4);
  const unreadMessages = parentMessages.filter((m) => m.unread).length;

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome, ${ward.fatherName.split(" ").slice(0, 2).join(" ")}`}
        subtitle={`Parent of ${ward.name} • ${ward.rollNo}`}
        icon={Heart}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Read-only mirror of your ward's portal — attendance, marks, fees and notices update automatically.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Attendance"
          value={`${totalAttendancePercent}%`}
          helper={`Sem ${ward.semester}`}
          icon={CalendarCheck}
          trend={totalAttendancePercent >= 75 ? 2 : -3}
        />
        <StatCard label="CGPA" value={currentCGPA.toFixed(2)} helper="Up to last sem" icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Upcoming Exams" value={upcomingExams.length} helper="Sem-end" tint="from-rose-400/20 to-rose-400/5" />
        <StatCard label="Pending Fees" value={formatINR(totalPendingFees)} helper={pendingFee ? `Due ${pendingFee.dueDate}` : "Cleared"} icon={Wallet} tint="from-amber-400/20 to-amber-400/5" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Attendance trend */}
        <ChartCard
          title="Attendance Trend"
          description="Monthly attendance — current semester"
          action={{ label: "Details", to: "/portal/parent/attendance" }}
          className="lg:col-span-2"
          height="h-56"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="percent" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Ward summary */}
        <SectionCard title="Ward Details" description="Your child's profile.">
          <dl className="space-y-2 text-sm">
            <Row label="Name" value={ward.name} />
            <Row label="Roll" value={<span className="font-mono">{ward.rollNo}</span>} />
            <Row label="Branch" value={`${ward.branch} • Sec ${ward.section}`} />
            <Row label="Semester" value={`${ward.semester} (Year ${ward.year})`} />
            <Row label="Email" value={<span className="text-xs truncate">{ward.email}</span>} />
            <Row label="Phone" value={<span className="tabular-nums">{ward.phone}</span>} />
          </dl>
        </SectionCard>

        {/* Upcoming exams */}
        <SectionCard
          title="Upcoming Exams"
          description="Next papers"
          action={{ label: "All exams", to: "/portal/parent/examinations" }}
        >
          <ul className="space-y-2">
            {upcomingExams.map((e) => (
              <li key={e.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                <div className="grid size-9 place-items-center rounded-md bg-rose-500/10 text-rose-600 shrink-0">
                  <CalendarCheck className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{e.subject}</p>
                  <p className="text-xs text-muted-foreground">{e.code} • {e.time}</p>
                </div>
                <span className="text-xs font-medium tabular-nums">{e.date}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Messages from college */}
        <SectionCard
          title="Messages from College"
          description={`${unreadMessages} unread`}
          action={{ label: "Inbox", to: "/portal/parent/notifications" }}
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border">
            {parentMessages.slice(0, 3).map((m) => (
              <li key={m.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <MessageSquare className={`mt-0.5 size-4 shrink-0 ${m.unread ? "text-accent" : "text-muted-foreground"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm truncate ${m.unread ? "font-semibold" : "font-medium"} text-foreground`}>{m.subject}</p>
                    <Badge variant="outline" className="text-[10px]">{m.fromRole}</Badge>
                    {m.unread && <span className="size-2 rounded-full bg-accent" />}
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{m.body}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">From {m.from}</p>
                </div>
                <span className="text-xs tabular-nums text-foreground/70 shrink-0">{m.date}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Pending fee */}
        <SectionCard title="Fee Status" description="Quick view of pending dues.">
          {pendingFee ? (
            <div className="rounded-md border-2 border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold">Pending</p>
              <p className="font-display text-2xl font-bold text-foreground mt-1 tabular-nums">{formatINR(totalPendingFees)}</p>
              <p className="text-sm text-muted-foreground mt-1">{pendingFee.description}</p>
              <p className="text-xs text-muted-foreground tabular-nums mt-1">Due {pendingFee.dueDate}</p>
              <Button asChild size="sm" className="mt-3 w-full"><Link to="/portal/parent/fees">Pay Online</Link></Button>
            </div>
          ) : (
            <div className="rounded-md border-2 border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
              <p className="font-display text-2xl">🎉</p>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300 mt-1">All Fees Cleared</p>
            </div>
          )}
        </SectionCard>

        {/* Contact teachers */}
        <SectionCard
          title="Contact Teachers"
          description="Reach out to your ward's mentor / class teacher."
          className="lg:col-span-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <ContactCard role="Mentor" name={wardMentor.name} email={wardMentor.email} phone={wardMentor.phone} />
            <ContactCard role="Class Teacher" name={wardClassTeacher.name} email={wardClassTeacher.email} phone={wardClassTeacher.phone} />
          </div>
        </SectionCard>

        {/* Notices */}
        <SectionCard
          title="Recent Notices"
          description="College-wide announcements"
          action={{ label: "All", to: "/portal/parent/notifications" }}
          className="lg:col-span-3"
        >
          <ul className="divide-y divide-border">
            {recentNotices.map((n) => (
              <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Bell className="mt-0.5 size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground truncate">{n.title}</p>
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

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-3">
    <dt className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">{label}</dt>
    <dd className="text-sm text-foreground text-right min-w-0">{value}</dd>
  </div>
);

const ContactCard = ({ role, name, email, phone }: { role: string; name: string; email: string; phone: string }) => (
  <div className="rounded-lg border border-border p-4 bg-card">
    <div className="flex items-start gap-3">
      <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
        <GraduationCap className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
        <div className="mt-2 space-y-1 text-xs">
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-foreground/85 hover:text-accent"><Mail className="size-3 text-accent" /> {email}</a>
          <span className="flex items-center gap-1.5 text-foreground/85 tabular-nums"><Phone className="size-3 text-accent" /> {phone}</span>
        </div>
      </div>
    </div>
  </div>
);

export const _ = { AlertTriangle };

export default ParentDashboard;
