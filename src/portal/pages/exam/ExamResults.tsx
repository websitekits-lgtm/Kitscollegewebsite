import { useState } from "react";
import { Award, Upload, Send, Download, Edit, CheckCircle2, Lock, Link2 } from "lucide-react";
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
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { marksUploadJobs, type MarksUploadJob } from "@/portal/mock/examData";
import { semesterResults, internalMarks, type SemesterResult, type InternalMark } from "@/portal/mock/studentData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const uploadCols: DataTableColumn<MarksUploadJob>[] = [
  { key: "code", header: "Code", render: (m) => <span className="font-mono text-xs">{m.paperCode}</span> },
  { key: "name", header: "Paper", render: (m) => <span className="font-medium">{m.paperName}</span> },
  { key: "type", header: "Type", render: (m) => m.examType, align: "center", hideOnMobile: true },
  {
    key: "status", header: "Status", align: "center",
    render: (m) => (
      <Badge variant="outline" className={
        m.status === "Published" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : m.status === "Uploaded" ? "border-accent/30 bg-accent/10 text-accent"
        : m.status === "Locked"   ? "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300"
        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{m.status}</Badge>
    ),
  },
  { key: "by", header: "Uploaded By", render: (m) => m.uploadedBy ?? "—", hideOnMobile: true },
  { key: "on", header: "On", render: (m) => <span className="tabular-nums">{m.uploadedOn ?? "—"}</span>, hideOnMobile: true, align: "right" },
  {
    key: "actions", header: "Action", align: "center",
    render: (m) => (
      <div className="flex gap-1 justify-center">
        {m.status === "Pending"  && <Button size="sm" className="h-7 gap-1"><Upload className="size-3.5" /> Upload</Button>}
        {m.status === "Uploaded" && <Button size="sm" variant="outline" className="h-7 gap-1"><Lock className="size-3.5" /> Lock</Button>}
        {m.status === "Locked"   && <Button size="sm" className="h-7 gap-1"><Send className="size-3.5" /> Publish</Button>}
        {m.status === "Published"&& <Button size="sm" variant="ghost" className="h-7 gap-1"><Edit className="size-3.5" /> Correct</Button>}
      </div>
    ),
  },
];

const semCols: DataTableColumn<SemesterResult>[] = [
  { key: "sem", header: "Semester", render: (s) => `Sem ${s.semester}` },
  { key: "sgpa", header: "Avg SGPA", render: (s) => <span className="font-bold tabular-nums">{s.sgpa.toFixed(2)}</span>, align: "center" },
  { key: "credits", header: "Credits", render: (s) => s.credits, align: "center" },
  {
    key: "back", header: "Backlogs", align: "center",
    render: (s) => s.backlogs > 0
      ? <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{s.backlogs}</Badge>
      : <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>,
  },
  {
    key: "actions", header: "Sheet", align: "center",
    render: () => <Button size="sm" variant="ghost" className="h-8 gap-1.5"><Download className="size-3.5" /> Grade</Button>,
  },
];

const internalCols: DataTableColumn<InternalMark>[] = [
  { key: "code", header: "Code", render: (m) => <span className="font-mono text-xs">{m.code}</span> },
  { key: "name", header: "Subject", render: (m) => <span className="font-medium">{m.name}</span> },
  { key: "m1", header: "Mid 1", render: (m) => `${m.mid1}/${m.outOf}`, align: "center" },
  { key: "m2", header: "Mid 2", render: (m) => `${m.mid2}/${m.outOf}`, align: "center" },
  { key: "asg", header: "Asgn.", render: (m) => m.assignment, align: "center", hideOnMobile: true },
];

const ExamResults = () => {
  const published = marksUploadJobs.filter((m) => m.status === "Published").length;
  const totalPapers = marksUploadJobs.length;

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Results Management"
        subtitle="Upload marks, process results and publish to students."
        icon={Award}
        breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Results" }]}
        actions={<UploadMarksDialog />}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Once published, marks appear in <span className="font-semibold">Student → Examinations</span> and roll up to HoD / Principal dashboards.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Papers" value={totalPapers} helper="Sem 6 internals" />
        <StatCard label="Published" value={published} helper={`${Math.round(published / totalPapers * 100)}% complete`} icon={CheckCircle2} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Awaiting upload" value={marksUploadJobs.filter(m => m.status === "Pending").length} helper="Pending faculty submission" tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Latest SGPA" value={semesterResults.at(-1)?.sgpa.toFixed(2) ?? "—"} helper="Sem 5 institutional" icon={Award} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="upload">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="upload">Marks Upload Pipeline</TabsTrigger>
            <TabsTrigger value="internals">Internal Marks</TabsTrigger>
            <TabsTrigger value="sgpa">SGPA / CGPA</TabsTrigger>
            <TabsTrigger value="grades">Grade Sheets</TabsTrigger>
            <TabsTrigger value="corrections">Corrections</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <SectionCard title="Pipeline" description="Upload → Lock → Publish workflow.">
              <DataTable columns={uploadCols} rows={marksUploadJobs} rowKey={(m) => m.id} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="internals">
            <SectionCard title="Internal Marks — Sem 6" description="Submitted by class faculty.">
              <DataTable columns={internalCols} rows={internalMarks} rowKey={(m) => m.code} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="sgpa">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="SGPA Trend" description="Last 5 semesters" height="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={semesterResults} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="semester" tickFormatter={(s) => `Sem ${s}`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[6, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <SectionCard title="Semester-wise Results">
                <DataTable columns={semCols} rows={semesterResults} rowKey={(s) => s.semester} />
              </SectionCard>
            </div>
          </TabsContent>

          <TabsContent value="grades">
            <SectionCard title="Grade Sheets" description="Bulk-generate consolidated grade sheets.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {semesterResults.map((s) => (
                  <div key={s.semester} className="rounded-lg border border-border p-4 bg-card">
                    <p className="font-display text-lg font-semibold">Sem {s.semester}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.credits} credits • Avg SGPA {s.sgpa.toFixed(2)}</p>
                    <Button size="sm" variant="outline" className="mt-3 w-full gap-1.5"><Download className="size-3.5" /> Generate Sheets</Button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="corrections">
            <SectionCard title="Result Corrections" description="Approved corrections after publication.">
              <p className="rounded-md border border-dashed border-border bg-secondary/5 p-6 text-center text-sm text-muted-foreground">
                No corrections pending. Recent revaluation awards update results automatically.
              </p>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

const UploadMarksDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Upload className="size-4" /> Upload Marks</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Marks (CSV)</DialogTitle>
          <DialogDescription>Upload locks the marks immediately. Publish moves them to student portals.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Paper</Label>
            <Select defaultValue="CS604">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CS604">CS604 — Cloud Computing</SelectItem>
                <SelectItem value="CS605">CS605 — Cyber Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Exam Type</Label>
            <Select defaultValue="internal">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="external">Sem-End</SelectItem>
                <SelectItem value="supp">Supplementary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="f">CSV File</Label>
            <Input id="f" type="file" accept=".csv" className="mt-1.5" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}><Upload className="size-4" /> Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamResults;
