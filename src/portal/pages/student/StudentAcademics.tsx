import { BookOpen, Download, FileText, Film, FileType, NotebookPen, CalendarDays, FlaskConical, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  assignments,
  studyMaterials,
  subjects,
  type Assignment,
  type StudyMaterial,
  type Subject,
} from "@/portal/mock/studentData";

const subjectColumns: DataTableColumn<Subject>[] = [
  { key: "code", header: "Code", render: (s) => <span className="font-mono text-xs">{s.code}</span> },
  { key: "name", header: "Subject", render: (s) => <span className="font-medium">{s.name}</span> },
  { key: "faculty", header: "Faculty", render: (s) => s.faculty, hideOnMobile: true },
  { key: "credits", header: "Credits", render: (s) => s.credits, align: "center" },
  {
    key: "category",
    header: "Type",
    render: (s) => (
      <Badge variant="outline" className={s.category === "Lab" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border"}>
        {s.category}
      </Badge>
    ),
    align: "center",
  },
];

const materialColumns: DataTableColumn<StudyMaterial>[] = [
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
  {
    key: "actions",
    header: "Download",
    render: () => (
      <Button size="sm" variant="ghost" className="h-8 gap-1.5">
        <Download className="size-3.5" /> Get
      </Button>
    ),
    align: "center",
  },
];

const assignmentColumns: DataTableColumn<Assignment>[] = [
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
  {
    key: "action",
    header: "",
    render: (a) =>
      a.status === "Pending" ? (
        <Button size="sm" className="h-8">Submit</Button>
      ) : (
        <Button size="sm" variant="ghost" className="h-8">View</Button>
      ),
    align: "center",
  },
];

const academicCalendar = [
  { event: "Internal Test 2", date: "2026-05-10", status: "Completed" },
  { event: "Assignment Cycle 2 — submission close", date: "2026-05-25", status: "Upcoming" },
  { event: "Last working day for Sem 6", date: "2026-05-27", status: "Upcoming" },
  { event: "Semester-end exams begin", date: "2026-05-28", status: "Upcoming" },
  { event: "Sem 7 commencement (tentative)", date: "2026-07-15", status: "Planned" },
];

const StudentAcademics = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Academics"
      subtitle="Subjects, faculty, study materials, assignments and academic calendar."
      icon={BookOpen}
      breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Academics" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Materials, assignments and lesson plans are uploaded by your
        <span className="font-semibold"> Faculty</span>. New uploads appear here instantly.
      </span>
    </div>

    <Tabs defaultValue="subjects" className="w-full">
      <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
        <TabsTrigger value="subjects">Subjects & Faculty</TabsTrigger>
        <TabsTrigger value="materials">Study Materials</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
        <TabsTrigger value="labs">Lab Manuals</TabsTrigger>
      </TabsList>

      <TabsContent value="subjects">
        <SectionCard title="Semester 6 — Subjects" description="Current semester load and assigned faculty.">
          <DataTable columns={subjectColumns} rows={subjects} rowKey={(s) => s.code} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="materials">
        <SectionCard
          title="Study Materials"
          description="Uploaded by your faculty — PDFs, slides, notes and recorded lectures."
        >
          <DataTable
            columns={materialColumns}
            rows={studyMaterials}
            rowKey={(m) => m.id}
            emptyTitle="No materials uploaded yet"
          />
        </SectionCard>
      </TabsContent>

      <TabsContent value="assignments">
        <SectionCard title="Assignments" description="Submit your pending work and review past submissions.">
          <DataTable columns={assignmentColumns} rows={assignments} rowKey={(a) => a.id} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="calendar">
        <SectionCard title="Academic Calendar" description="Key dates for the current semester.">
          <ul className="divide-y divide-border">
            {academicCalendar.map((c) => (
              <li key={c.event} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                  <CalendarDays className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-foreground">{c.event}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">{c.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    c.status === "Completed"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : c.status === "Upcoming"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        : "border-border"
                  }
                >
                  {c.status}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>

      <TabsContent value="labs">
        <SectionCard title="Lab Manuals" description="Practical experiment manuals for your lab subjects.">
          <div className="grid gap-3 sm:grid-cols-2">
            {subjects.filter((s) => s.category === "Lab").map((s) => (
              <div key={s.code} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <div className="grid size-10 place-items-center rounded-md bg-emerald-500/10 text-emerald-600 shrink-0">
                  <FlaskConical className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.code} • {s.faculty}</p>
                  <Button size="sm" variant="outline" className="mt-3 h-8 gap-1.5">
                    <Download className="size-3.5" /> Manual.pdf
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </TabsContent>
    </Tabs>
  </PortalLayout>
);

export default StudentAcademics;
