import { ClipboardCheck, Award, Download, FileWarning, Send, ScrollText, Link2 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  currentCGPA,
  examSchedule,
  internalMarks,
  semesterResults,
  studentProfile,
  type ExamSchedule,
  type InternalMark,
  type SemesterResult,
} from "@/portal/mock/studentData";
import { revaluationRequests, type RevaluationRequest } from "@/portal/mock/examData";

const internalCols: DataTableColumn<InternalMark>[] = [
  { key: "code", header: "Code", render: (m) => <span className="font-mono text-xs">{m.code}</span> },
  { key: "name", header: "Subject", render: (m) => <span className="font-medium">{m.name}</span> },
  { key: "mid1", header: "Mid 1", render: (m) => `${m.mid1}/${m.outOf}`, align: "center" },
  { key: "mid2", header: "Mid 2", render: (m) => `${m.mid2}/${m.outOf}`, align: "center" },
  { key: "assignment", header: "Asgn.", render: (m) => m.assignment, align: "center", hideOnMobile: true },
  {
    key: "total",
    header: "Best of 2 + Asgn.",
    render: (m) => <span className="font-semibold tabular-nums">{Math.max(m.mid1, m.mid2) + m.assignment}</span>,
    align: "right",
  },
];

const examCols: DataTableColumn<ExamSchedule>[] = [
  { key: "date", header: "Date", render: (e) => <span className="font-mono text-xs tabular-nums">{e.date}</span> },
  { key: "code", header: "Code", render: (e) => <span className="font-mono text-xs">{e.code}</span> },
  { key: "name", header: "Subject", render: (e) => <span className="font-medium">{e.subject}</span> },
  { key: "time", header: "Time", render: (e) => e.time, hideOnMobile: true },
  { key: "venue", header: "Venue", render: (e) => e.venue, hideOnMobile: true },
  {
    key: "type",
    header: "Type",
    render: (e) => (
      <Badge variant="outline" className={e.type === "External" ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300" : "border-border"}>
        {e.type}
      </Badge>
    ),
    align: "center",
  },
];

const revalCols: DataTableColumn<RevaluationRequest>[] = [
  { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
  { key: "paper", header: "Paper", render: (r) => <><span className="font-medium">{r.paperName}</span><p className="text-[10px] font-mono text-muted-foreground">{r.paperCode}</p></> },
  { key: "orig", header: "Original", render: (r) => <span className="tabular-nums">{r.originalMarks}</span>, align: "center" },
  {
    key: "rev", header: "Revised", align: "center",
    render: (r) =>
      r.revisedMarks !== undefined ? (
        <span className={r.revisedMarks > r.originalMarks ? "font-bold text-emerald-600 dark:text-emerald-400 tabular-nums" : r.revisedMarks < r.originalMarks ? "font-bold text-destructive tabular-nums" : "font-bold tabular-nums"}>
          {r.revisedMarks}
        </span>
      ) : "—",
  },
  { key: "fee", header: "Fee", render: (r) => `₹ ${r.fee}`, align: "right", hideOnMobile: true },
  { key: "date", header: "Raised", render: (r) => <span className="tabular-nums">{r.raisedOn}</span>, align: "right", hideOnMobile: true },
  {
    key: "status", header: "Status", align: "center",
    render: (r) => (
      <Badge variant="outline" className={
        r.status === "Awarded" || r.status === "Re-evaluated"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : r.status === "No Change"
            ? "border-border"
            : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{r.status}</Badge>
    ),
  },
];

const resultCols: DataTableColumn<SemesterResult>[] = [
  { key: "sem", header: "Semester", render: (s) => `Sem ${s.semester}` },
  { key: "sgpa", header: "SGPA", render: (s) => <span className="font-bold tabular-nums">{s.sgpa.toFixed(2)}</span>, align: "center" },
  { key: "credits", header: "Credits", render: (s) => s.credits, align: "center" },
  {
    key: "backlogs",
    header: "Backlogs",
    render: (s) =>
      s.backlogs > 0 ? (
        <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{s.backlogs}</Badge>
      ) : (
        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>
      ),
    align: "center",
  },
  {
    key: "action",
    header: "",
    render: () => (
      <Button size="sm" variant="ghost" className="h-8 gap-1.5"><Download className="size-3.5" /> Memo</Button>
    ),
    align: "center",
  },
];

const cgpaTrend = semesterResults.map((s) => ({ sem: `S${s.semester}`, value: s.sgpa }));
const totalBacklogs = semesterResults.reduce((sum, s) => sum + s.backlogs, 0);

const StudentExaminations = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Examinations"
      subtitle="Internal marks, hall tickets, results, SGPA / CGPA, backlogs and revaluation."
      icon={ClipboardCheck}
      breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Examinations" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Schedules, hall tickets and results are published by the
        <span className="font-semibold"> Exam Cell</span>. Internal marks come from your Faculty.
      </span>
    </div>

    {/* KPI strip */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Current CGPA" value={currentCGPA.toFixed(2)} helper="Up to Sem 5" icon={Award} tint="from-emerald-400/20 to-emerald-400/5" />
      <StatCard label="Latest SGPA" value={semesterResults.at(-1)?.sgpa.toFixed(2) ?? "—"} helper="Sem 5" tint="from-accent/20 to-accent/5" />
      <StatCard label="Active backlogs" value={totalBacklogs} helper="All semesters" icon={FileWarning} tint={totalBacklogs ? "from-destructive/20 to-destructive/5" : "from-emerald-400/20 to-emerald-400/5"} />
      <StatCard label="Upcoming exams" value={examSchedule.length} helper="External — Sem 6" icon={ScrollText} tint="from-rose-400/20 to-rose-400/5" />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="internals">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="internals">Internal Marks</TabsTrigger>
          <TabsTrigger value="schedule">Exam Timetable</TabsTrigger>
          <TabsTrigger value="hall">Hall Tickets</TabsTrigger>
          <TabsTrigger value="results">Results / SGPA</TabsTrigger>
          <TabsTrigger value="revaluation">Revaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="internals">
          <SectionCard title="Internal Marks — Semester 6" description="Best of two mid-term tests plus assignment marks count.">
            <DataTable columns={internalCols} rows={internalMarks} rowKey={(m) => m.code} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="schedule">
          <SectionCard title="Semester-End Exam Timetable" description="Reporting time 30 min before commencement.">
            <DataTable columns={examCols} rows={examSchedule} rowKey={(e) => e.code} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="hall">
          <SectionCard title="Hall Ticket — Semester 6" description="Download and carry a printed copy to every exam.">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border-2 border-dashed border-border p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-md bg-rose-500/10 text-rose-600">
                  <ClipboardCheck className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Hall Ticket — May/June 2026</p>
                  <p className="text-xs text-muted-foreground">Released on 2026-05-18 • Valid for all Sem 6 papers</p>
                </div>
              </div>
              <Button className="gap-2"><Download className="size-4" /> Download PDF</Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid gap-6 lg:grid-cols-3">
            <ChartCard title="SGPA Trend" description="Semester-wise performance" height="h-56" >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cgpaTrend} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sem" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[6, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <SectionCard title="Semester Results" description={`CGPA ${currentCGPA.toFixed(2)} across ${semesterResults.length} semesters.`} className="lg:col-span-2">
              <DataTable columns={resultCols} rows={semesterResults} rowKey={(s) => s.semester} />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="revaluation">
          <SectionCard
            title="Revaluation Requests"
            description="Filed within 7 working days of result publication."
            action={{ label: "New request", onClick: () => alert("Revaluation form opens here.") }}
          >
            {(() => {
              const myReq = revaluationRequests.filter((r) => r.rollNo === studentProfile.rollNo);
              if (myReq.length === 0) {
                return (
                  <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                    <p className="font-semibold text-foreground">No revaluation requests filed</p>
                    <p className="mt-1 text-sm text-muted-foreground">Once results are out, you can file revaluation here.</p>
                    <Button className="mt-4 gap-2"><Send className="size-4" /> Raise Revaluation Request</Button>
                  </div>
                );
              }
              return <DataTable columns={revalCols} rows={myReq} rowKey={(r) => r.id} />;
            })()}
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

export default StudentExaminations;
