import { useState } from "react";
import {
  BookOpen, Upload, Plus, FileText, Film, FileType, NotebookPen, Link2, Calendar, ClipboardCheck, Lock, Send, Edit,
} from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assignedFaculty, facultySubjects, lessonPlans } from "@/portal/mock/facultyData";
import { studyMaterials, assignments, type StudyMaterial, type Assignment } from "@/portal/mock/studentData";
import { marksUploadJobs, type MarksUploadJob } from "@/portal/mock/examData";

const materialCols: DataTableColumn<StudyMaterial>[] = [
  { key: "title", header: "Title", render: (m) => <span className="font-medium">{m.title}</span> },
  { key: "subject", header: "Subject", render: (m) => m.subject, hideOnMobile: true },
  {
    key: "type",
    header: "Type",
    render: (m) => {
      const Icon = m.type === "PDF" ? FileText : m.type === "PPT" ? FileType : m.type === "Video" ? Film : NotebookPen;
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium">
          <Icon className="size-3.5 text-accent" /> {m.type}
        </span>
      );
    },
    align: "center",
  },
  { key: "size", header: "Size", render: (m) => m.size, align: "right", hideOnMobile: true },
  { key: "date", header: "Uploaded", render: (m) => m.uploadedAt, align: "right", hideOnMobile: true },
];

const assignmentCols: DataTableColumn<Assignment>[] = [
  { key: "title", header: "Title", render: (a) => <span className="font-medium">{a.title}</span> },
  { key: "subject", header: "Subject", render: (a) => a.subject, hideOnMobile: true },
  { key: "due", header: "Due", render: (a) => <span className="tabular-nums">{a.dueDate}</span> },
  {
    key: "status",
    header: "Status",
    render: (a) => (
      <Badge
        variant="outline"
        className={
          a.status === "Submitted"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : a.status === "Late"
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        }
      >
        {a.status}
      </Badge>
    ),
    align: "center",
  },
];

const FacultyAcademics = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Academics"
      subtitle="Assigned subjects, study materials, assignments and lesson plans."
      icon={BookOpen}
      breadcrumb={[{ label: "Faculty Portal", to: "/portal/faculty" }, { label: "Academics" }]}
    />

    {/* Cross-portal note */}
    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Materials and assignments uploaded here appear instantly in the
        <span className="font-semibold"> Student Portal → Academics</span> page.
      </span>
    </div>

    <Tabs defaultValue="subjects">
      <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
        <TabsTrigger value="subjects">Assigned Subjects</TabsTrigger>
        <TabsTrigger value="materials">Study Materials</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="lessons">Lesson Plans</TabsTrigger>
        <TabsTrigger value="marks">Marks Upload</TabsTrigger>
      </TabsList>

      <TabsContent value="subjects">
        <SectionCard title="Your Subjects — Semester 6" description="Class-strength shown is from the shared CSE-3A roster.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facultySubjects.map((s) => (
              <div key={s.code} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{s.code}</p>
                  </div>
                  <Badge variant="outline" className={s.category === "Lab" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border"}>
                    {s.category}
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Credits</p>
                    <p className="font-bold text-foreground tabular-nums">{s.credits}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Class strength</p>
                    <p className="font-bold text-foreground tabular-nums">24</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </TabsContent>

      <TabsContent value="materials">
        <SectionCard
          title="Study Materials"
          description="Uploaded to the shared materials library."
          action={{ label: "Upload new", onClick: () => document.getElementById("upload-mat-btn")?.click() }}
        >
          <UploadMaterialDialog />
          <DataTable columns={materialCols} rows={studyMaterials} rowKey={(m) => m.id} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="assignments">
        <SectionCard title="Assignments" description="Track submission status across your sections.">
          <DataTable columns={assignmentCols} rows={assignments} rowKey={(a) => a.id} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="lessons">
        <SectionCard title="Lesson Plans" description="Unit-wise lesson plan for your subjects.">
          <ul className="space-y-2">
            {lessonPlans.map((lp) => (
              <li key={lp.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                <div className="grid size-9 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                  <Calendar className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-foreground">
                    Unit {lp.unit}: {lp.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lp.subject} • Planned for <span className="tabular-nums">{lp.plannedDate}</span>
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    lp.status === "Completed"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : lp.status === "In Progress"
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  }
                >
                  {lp.status}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>

      <TabsContent value="marks">
        <SectionCard
          title="Marks Upload"
          description="Upload internal marks for your subjects. Exam Cell locks + publishes once received."
        >
          <div className="mb-3 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-foreground/85">
            <ClipboardCheck className="size-4 text-amber-500 mt-0.5 shrink-0" />
            <span>Once uploaded, marks move to the <span className="font-semibold">Exam Cell</span> pipeline for locking and publishing to students.</span>
          </div>
          <DataTable columns={marksCols} rows={myMarksJobs} rowKey={(m) => m.id} emptyTitle="No upload tasks" />
        </SectionCard>
      </TabsContent>
    </Tabs>
  </PortalLayout>
);

const myMarksJobs = marksUploadJobs.filter(
  (j) => assignedFaculty.subjectsTaught.includes(j.paperCode) || j.uploadedBy === assignedFaculty.name,
);

const marksCols: DataTableColumn<MarksUploadJob>[] = [
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
  { key: "on", header: "Uploaded", render: (m) => <span className="tabular-nums">{m.uploadedOn ?? "—"}</span>, align: "right", hideOnMobile: true },
  {
    key: "action", header: "", align: "center",
    render: (m) => (
      m.status === "Pending"  ? <Button size="sm" className="h-7 gap-1"><Upload className="size-3.5" /> Upload</Button>
      : m.status === "Uploaded" ? <Button size="sm" variant="outline" className="h-7 gap-1"><Lock className="size-3.5" /> Awaiting Exam</Button>
      : m.status === "Locked"   ? <Button size="sm" variant="ghost" className="h-7 gap-1"><Send className="size-3.5" /> Locked</Button>
      : <Button size="sm" variant="ghost" className="h-7 gap-1"><Edit className="size-3.5" /> View</Button>
    ),
  },
];

const UploadMaterialDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="upload-mat-btn" size="sm" className="mb-4 gap-2">
          <Upload className="size-4" /> Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Study Material</DialogTitle>
          <DialogDescription>
            Students in this subject will see the material in their Academics tab.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Subject</Label>
            <Select defaultValue={facultySubjects[0]?.code}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {facultySubjects.map((s) => (
                  <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" className="mt-1.5" placeholder="e.g. Unit 3 — Parsing Notes" />
          </div>
          <div>
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="desc">Description (optional)</Label>
            <Textarea id="desc" rows={2} className="mt-1.5" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>
            <Plus className="size-4" /> Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyAcademics;
