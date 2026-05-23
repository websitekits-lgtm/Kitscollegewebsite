import { ClipboardCheck, Award, FileWarning, TrendingUp, Link2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { departmentResults, type DepartmentResult } from "@/portal/mock/hodData";
import { examSchedule, notifications, type ExamSchedule } from "@/portal/mock/studentData";
import { roster } from "@/portal/mock/college";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const resultCols: DataTableColumn<DepartmentResult>[] = [
  { key: "sem", header: "Semester", render: (r) => `Sem ${r.semester}` },
  { key: "app", header: "Appeared", render: (r) => r.appeared, align: "center" },
  { key: "pass", header: "Passed", render: (r) => r.passed, align: "center" },
  { key: "pct", header: "Pass %", render: (r) => <span className="font-bold text-emerald-600 dark:text-emerald-400">{r.passPct}%</span>, align: "center" },
  { key: "sgpa", header: "Avg SGPA", render: (r) => <span className="tabular-nums">{r.avgSgpa.toFixed(2)}</span>, align: "center", hideOnMobile: true },
  { key: "dist", header: "Distinction", render: (r) => r.distinction, align: "center", hideOnMobile: true },
];

const examCols: DataTableColumn<ExamSchedule>[] = [
  { key: "date", header: "Date", render: (e) => <span className="font-mono text-xs tabular-nums">{e.date}</span> },
  { key: "code", header: "Code", render: (e) => <span className="font-mono text-xs">{e.code}</span> },
  { key: "name", header: "Subject", render: (e) => <span className="font-medium">{e.subject}</span> },
  { key: "time", header: "Time", render: (e) => e.time, hideOnMobile: true },
  { key: "venue", header: "Venue", render: (e) => e.venue, hideOnMobile: true },
];

const HodExaminations = () => {
  const latest = departmentResults.at(-1)!;
  const totalBacklogs = roster.reduce((s, r) => s + r.backlogs, 0);
  const studentsWithBacklog = roster.filter((r) => r.backlogs > 0).length;
  const examNotices = notifications.filter((n) => n.category === "Exam");

  const backlogDistribution = [
    { range: "0", count: roster.filter((r) => r.backlogs === 0).length },
    { range: "1", count: roster.filter((r) => r.backlogs === 1).length },
    { range: "2", count: roster.filter((r) => r.backlogs === 2).length },
    { range: "3+", count: roster.filter((r) => r.backlogs >= 3).length },
  ];

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Examination Overview"
        subtitle="Department-level exam status, results and backlog analytics."
        icon={ClipboardCheck}
        breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Examinations" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Exam schedule, notices and results are owned by the Exam Cell — this view is read-only.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Latest Pass %" value={`${latest.passPct}%`} helper={`Sem ${latest.semester}`} icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Avg SGPA" value={latest.avgSgpa.toFixed(2)} helper="All branches" icon={TrendingUp} />
        <StatCard label="With Backlogs" value={studentsWithBacklog} helper={`${totalBacklogs} active subjects`} icon={FileWarning} tint="from-destructive/20 to-destructive/5" />
        <StatCard label="Upcoming Papers" value={examSchedule.length} helper="External — Sem 6" icon={ClipboardCheck} tint="from-rose-400/20 to-rose-400/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="results">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="results">Dept. Results</TabsTrigger>
            <TabsTrigger value="internals">Internal Status</TabsTrigger>
            <TabsTrigger value="external">External Schedule</TabsTrigger>
            <TabsTrigger value="backlogs">Backlog Analytics</TabsTrigger>
            <TabsTrigger value="notices">Exam Notices</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Pass % trend" description="Semester-wise" height="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={departmentResults} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="semester" tickFormatter={(s) => `Sem ${s}`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="passPct" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <SectionCard title="Result Summary">
                <DataTable columns={resultCols} rows={departmentResults} rowKey={(r) => r.semester} />
              </SectionCard>
            </div>
          </TabsContent>

          <TabsContent value="internals">
            <SectionCard title="Internal Exam Status — Sem 6" description="Status reported by each section's coordinator.">
              <ul className="space-y-2">
                {["CS601", "CS602", "CS603", "CS604", "CS605"].map((c, i) => (
                  <li key={c} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                      <ClipboardCheck className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-foreground">Internal 2 — {c}</p>
                      <p className="text-xs text-muted-foreground">Marks entry deadline: 2026-05-{20 + i}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        i < 3
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      }
                    >
                      {i < 3 ? "Marks Submitted" : "Pending"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="external">
            <SectionCard title="External Examination Schedule" description="Sem-end exam timetable.">
              <DataTable columns={examCols} rows={examSchedule} rowKey={(e) => e.code} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="backlogs">
            <ChartCard title="Backlog Distribution" description="How many students hold N backlogs.">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={backlogDistribution} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </TabsContent>

          <TabsContent value="notices">
            <SectionCard title="Exam Notices" description="Same notices students see in their inbox.">
              <ul className="divide-y divide-border">
                {examNotices.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="grid size-10 place-items-center rounded-md bg-rose-500/10 text-rose-600 shrink-0">
                      <ClipboardCheck className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{n.title}</p>
                      <p className="text-sm text-muted-foreground">{n.body}</p>
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground shrink-0">{n.date}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default HodExaminations;
