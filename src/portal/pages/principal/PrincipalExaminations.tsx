import { ClipboardCheck, Award, FileWarning, TrendingUp, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { departmentResults, type DepartmentResult } from "@/portal/mock/hodData";
import { departmentSnapshots, institutionKPI } from "@/portal/mock/principalData";
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
  { key: "sgpa", header: "Avg SGPA", render: (r) => r.avgSgpa.toFixed(2), align: "center", hideOnMobile: true },
  { key: "dist", header: "Distinction", render: (r) => r.distinction, align: "center", hideOnMobile: true },
];

const examCols: DataTableColumn<ExamSchedule>[] = [
  { key: "date", header: "Date", render: (e) => <span className="font-mono text-xs tabular-nums">{e.date}</span> },
  { key: "code", header: "Code", render: (e) => <span className="font-mono text-xs">{e.code}</span> },
  { key: "name", header: "Subject", render: (e) => <span className="font-medium">{e.subject}</span> },
  { key: "time", header: "Time", render: (e) => e.time, hideOnMobile: true },
];

const PrincipalExaminations = () => {
  const totalBacklogs = roster.reduce((s, r) => s + r.backlogs, 0);
  const examAlerts = notifications.filter((n) => n.category === "Exam");

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Examination Overview"
        subtitle="Institution-wide results, pass percentage and exam alerts."
        icon={ClipboardCheck}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Examinations" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Pass %" value={`${institutionKPI.overallPassPct}%`} helper="All departments" icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Latest SGPA Avg" value={departmentResults.at(-1)?.avgSgpa.toFixed(2)} helper="Sem 5 institutional" icon={TrendingUp} />
        <StatCard label="Active Backlogs" value={totalBacklogs} helper="Sample roster" icon={FileWarning} tint="from-destructive/20 to-destructive/5" />
        <StatCard label="Upcoming Exams" value={examSchedule.length} helper="External — Sem 6" icon={ClipboardCheck} tint="from-rose-400/20 to-rose-400/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="results">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="results">Overall Results</TabsTrigger>
            <TabsTrigger value="dept">Dept Comparison</TabsTrigger>
            <TabsTrigger value="internals">Internal Status</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="alerts">Exam Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Pass % trend" description="Across last 5 semesters" height="h-72">
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

          <TabsContent value="dept">
            <ChartCard title="Pass % by Department" description="Last sem" height="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentSnapshots} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="shortName" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="passPct" fill="hsl(135 60% 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </TabsContent>

          <TabsContent value="internals">
            <SectionCard title="Internal Exam Status" description="HOD-reported submissions for Sem 6 internals.">
              <ul className="space-y-2">
                {departmentSnapshots.map((d, i) => (
                  <li key={d.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                      <ClipboardCheck className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">Marks deadline 2026-05-{20 + (i % 6)}</p>
                    </div>
                    <Badge variant="outline" className={i % 3 === 0 ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}>
                      {i % 3 === 0 ? "Pending" : "Submitted"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="upcoming">
            <SectionCard title="Upcoming External Exams">
              <DataTable columns={examCols} rows={examSchedule} rowKey={(e) => e.code} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="alerts">
            <SectionCard title="Exam Alerts" description="Live notices in students' inboxes.">
              <ul className="divide-y divide-border">
                {examAlerts.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <AlertTriangle className="mt-0.5 size-4 text-rose-500 shrink-0" />
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

export default PrincipalExaminations;
