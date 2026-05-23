import { CalendarCheck, AlertTriangle, ShieldCheck, Link2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, LineChart, Line } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { attendanceBySubject, attendanceTrend, totalAttendancePercent } from "@/portal/mock/studentData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const chartData = attendanceBySubject.map((s) => ({
  code: s.code,
  percent: Math.round((s.attended / s.total) * 100),
}));

const ParentAttendance = () => {
  const shortageRows = attendanceBySubject.filter((s) => Math.round((s.attended / s.total) * 100) < 75);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Ward's Attendance"
        subtitle="Read-only view — minimum 75% required for sem-end eligibility."
        icon={CalendarCheck}
        breadcrumb={[{ label: "Parent Portal", to: "/portal/parent" }, { label: "Attendance" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Same data your ward sees in their Student → Attendance page.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall %" value={`${totalAttendancePercent}%`} helper="This semester" icon={CalendarCheck} trend={totalAttendancePercent >= 75 ? 2 : -4} />
        <StatCard label="Above threshold" value={attendanceBySubject.length - shortageRows.length} helper="≥ 75% subjects" icon={ShieldCheck} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Shortage subjects" value={shortageRows.length} helper="< 75%" icon={AlertTriangle} tint={shortageRows.length ? "from-destructive/20 to-destructive/5" : "from-emerald-400/20 to-emerald-400/5"} />
        <StatCard label="Status" value={totalAttendancePercent >= 75 ? "Eligible" : "At Risk"} helper="Sem-end eligibility" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Subject-wise Attendance" description="Red line marks 75% minimum.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="code" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip cursor={{ fill: "hsl(var(--secondary) / 0.15)" }} contentStyle={tooltipStyle} />
              <ReferenceLine y={75} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label={{ value: "75%", position: "right", fill: "hsl(var(--destructive))", fontSize: 11 }} />
              <Bar dataKey="percent" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Trend" description="Current semester">
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
      </div>

      <div className="mt-6">
        <SectionCard title="Subject Breakdown" description="Detailed attendance per subject.">
          <ul className="space-y-3">
            {attendanceBySubject.map((s) => {
              const pct = Math.round((s.attended / s.total) * 100);
              const short = pct < 75;
              return (
                <li key={s.code} className="rounded-md border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium text-foreground">{s.name}</p>
                        <span className="text-xs font-mono text-muted-foreground">{s.code}</span>
                        {short && <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive text-[10px]">Shortage</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">Attended {s.attended} / {s.total}</p>
                    </div>
                    <p className={`tabular-nums font-bold text-lg ${short ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>{pct}%</p>
                  </div>
                  <Progress value={pct} className={`mt-2 h-1.5 ${short ? "[&>div]:bg-destructive" : ""}`} />
                </li>
              );
            })}
          </ul>
        </SectionCard>
      </div>
    </PortalLayout>
  );
};

export default ParentAttendance;
