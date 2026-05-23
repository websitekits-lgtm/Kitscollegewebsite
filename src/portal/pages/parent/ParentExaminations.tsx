import { ClipboardCheck, Award, TrendingUp, FileWarning, Link2 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  currentCGPA, examSchedule, internalMarks, semesterResults,
  type ExamSchedule, type InternalMark, type SemesterResult,
} from "@/portal/mock/studentData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const internalCols: DataTableColumn<InternalMark>[] = [
  { key: "code", header: "Code", render: (m) => <span className="font-mono text-xs">{m.code}</span> },
  { key: "name", header: "Subject", render: (m) => <span className="font-medium">{m.name}</span> },
  { key: "m1", header: "Mid 1", render: (m) => `${m.mid1}/${m.outOf}`, align: "center" },
  { key: "m2", header: "Mid 2", render: (m) => `${m.mid2}/${m.outOf}`, align: "center" },
  { key: "asg", header: "Asgn.", render: (m) => m.assignment, align: "center", hideOnMobile: true },
  {
    key: "total", header: "Best + Asgn.", align: "right",
    render: (m) => <span className="font-semibold tabular-nums">{Math.max(m.mid1, m.mid2) + m.assignment}</span>,
  },
];

const examCols: DataTableColumn<ExamSchedule>[] = [
  { key: "date", header: "Date", render: (e) => <span className="font-mono text-xs tabular-nums">{e.date}</span> },
  { key: "code", header: "Code", render: (e) => <span className="font-mono text-xs">{e.code}</span> },
  { key: "name", header: "Subject", render: (e) => <span className="font-medium">{e.subject}</span> },
  { key: "time", header: "Time", render: (e) => e.time, hideOnMobile: true },
  { key: "venue", header: "Venue", render: (e) => e.venue, hideOnMobile: true },
];

const resultCols: DataTableColumn<SemesterResult>[] = [
  { key: "sem", header: "Semester", render: (s) => `Sem ${s.semester}` },
  { key: "sgpa", header: "SGPA", render: (s) => <span className="font-bold tabular-nums">{s.sgpa.toFixed(2)}</span>, align: "center" },
  { key: "credits", header: "Credits", render: (s) => s.credits, align: "center" },
  {
    key: "back", header: "Backlogs", align: "center",
    render: (s) =>
      s.backlogs > 0
        ? <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{s.backlogs}</Badge>
        : <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>,
  },
];

const totalBacklogs = semesterResults.reduce((s, r) => s + r.backlogs, 0);

const ParentExaminations = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Examinations"
      subtitle="Read-only — internals, upcoming exams and SGPA / CGPA progression."
      icon={ClipboardCheck}
      breadcrumb={[{ label: "Parent Portal", to: "/portal/parent" }, { label: "Examinations" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>Marks shown here are the same numbers published by the Exam Cell and visible to your ward.</span>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Current CGPA" value={currentCGPA.toFixed(2)} icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
      <StatCard label="Latest SGPA" value={semesterResults.at(-1)?.sgpa.toFixed(2) ?? "—"} helper="Sem 5" icon={TrendingUp} />
      <StatCard label="Total Backlogs" value={totalBacklogs} helper="Across semesters" icon={FileWarning} tint={totalBacklogs ? "from-destructive/20 to-destructive/5" : "from-emerald-400/20 to-emerald-400/5"} />
      <StatCard label="Upcoming Exams" value={examSchedule.length} helper="Sem-end" icon={ClipboardCheck} tint="from-rose-400/20 to-rose-400/5" />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="results">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="results">SGPA / CGPA</TabsTrigger>
          <TabsTrigger value="internals">Internal Marks</TabsTrigger>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            <ChartCard title="SGPA Trend" description="Semester-wise" height="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={semesterResults} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="semester" tickFormatter={(s) => `S${s}`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[6, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <SectionCard title="Semester Results" className="lg:col-span-2">
              <DataTable columns={resultCols} rows={semesterResults} rowKey={(s) => s.semester} />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="internals">
          <SectionCard title="Internal Marks — Sem 6">
            <DataTable columns={internalCols} rows={internalMarks} rowKey={(m) => m.code} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="schedule">
          <SectionCard title="Upcoming External Exams">
            <DataTable columns={examCols} rows={examSchedule} rowKey={(e) => e.code} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

export default ParentExaminations;
