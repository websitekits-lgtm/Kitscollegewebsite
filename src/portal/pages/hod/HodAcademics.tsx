import { BookOpen, CalendarDays, FlaskConical, FileText, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { lessonPlans, type LessonPlan } from "@/portal/mock/facultyData";
import { studyMaterials, subjects, timetable, type StudyMaterial } from "@/portal/mock/studentData";
import { departmentEvents } from "@/portal/mock/hodData";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const PERIODS = [1, 2, 3, 4, 5] as const;
const PERIOD_TIMES: Record<number, string> = {
  1: "09:00 – 09:50", 2: "09:50 – 10:40", 3: "11:00 – 11:50", 4: "11:50 – 12:40", 5: "13:30 – 16:00",
};

const lessonCols: DataTableColumn<LessonPlan>[] = [
  { key: "subj", header: "Subject", render: (l) => <span className="font-medium">{l.subject}</span> },
  { key: "unit", header: "Unit", render: (l) => `Unit ${l.unit}`, align: "center" },
  { key: "topic", header: "Topic", render: (l) => l.topic, hideOnMobile: true },
  { key: "date", header: "Planned", render: (l) => <span className="tabular-nums">{l.plannedDate}</span>, align: "right" },
  {
    key: "status",
    header: "Status",
    render: (l) => (
      <Badge
        variant="outline"
        className={
          l.status === "Completed"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : l.status === "In Progress"
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        }
      >
        {l.status}
      </Badge>
    ),
    align: "center",
  },
];

const materialCols: DataTableColumn<StudyMaterial>[] = [
  { key: "title", header: "Title", render: (m) => <span className="font-medium">{m.title}</span> },
  { key: "subject", header: "Subject", render: (m) => m.subject },
  { key: "type", header: "Type", render: (m) => m.type, align: "center", hideOnMobile: true },
  { key: "date", header: "Uploaded", render: (m) => <span className="tabular-nums">{m.uploadedAt}</span>, align: "right" },
];

const academicCalendar = [
  { event: "Internal Test 2 — End", date: "2026-05-10", status: "Completed" },
  { event: "Assignment Cycle 2 — close", date: "2026-05-25", status: "Upcoming" },
  { event: "Last working day Sem 6", date: "2026-05-27", status: "Upcoming" },
  { event: "Sem-end exams begin", date: "2026-05-28", status: "Upcoming" },
  { event: "Sem 7 commencement (tentative)", date: "2026-07-15", status: "Planned" },
];

const HodAcademics = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Academics"
      subtitle="Department-wide timetable, calendar, lesson plans and study material activity."
      icon={BookOpen}
      breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Academics" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>Timetable, lesson plans and materials shown here are the live data Faculty and Students see in their portals.</span>
    </div>

    <Tabs defaultValue="timetable">
      <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
        <TabsTrigger value="timetable">Dept. Timetable</TabsTrigger>
        <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
        <TabsTrigger value="lessons">Lesson Plan Tracking</TabsTrigger>
        <TabsTrigger value="labs">Lab Management</TabsTrigger>
        <TabsTrigger value="materials">Study Materials</TabsTrigger>
        <TabsTrigger value="activities">Academic Activities</TabsTrigger>
      </TabsList>

      <TabsContent value="timetable">
        <SectionCard title="3rd Year Section A — Weekly Grid">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr>
                  <th className="border-b border-border p-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Period</th>
                  {DAYS.map((d) => (
                    <th key={d} className="border-b border-border p-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((p) => (
                  <tr key={p} className="border-b border-border">
                    <td className="p-3 align-top text-xs font-medium text-foreground/70">
                      <p>P{p}</p>
                      <p className="font-mono text-[10px] text-muted-foreground tabular-nums">{PERIOD_TIMES[p]}</p>
                    </td>
                    {DAYS.map((d) => {
                      const slot = timetable.find((t) => t.day === d && t.period === p);
                      return (
                        <td key={d} className="p-2 align-top">
                          {slot ? (
                            <div className={cn("rounded-md border p-2", slot.type === "Lab" ? "border-emerald-500/30 bg-emerald-500/10" : "border-border bg-card")}>
                              <p className="text-xs font-semibold text-foreground leading-tight">{slot.subject}</p>
                              <p className="mt-0.5 text-[10px] text-muted-foreground truncate">{slot.faculty}</p>
                            </div>
                          ) : (
                            <span className="block py-2 text-center text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </TabsContent>

      <TabsContent value="calendar">
        <SectionCard title="Academic Calendar — Sem 6" description="Key milestones.">
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

      <TabsContent value="lessons">
        <SectionCard title="Lesson Plan Tracking" description="Progress per faculty / unit.">
          <DataTable columns={lessonCols} rows={lessonPlans} rowKey={(l) => l.id} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="labs">
        <SectionCard title="Lab Management" description="Departmental lab usage.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {subjects.filter((s) => s.category === "Lab").map((s) => (
              <li key={s.code} className="flex items-start gap-3 rounded-md border border-border p-3">
                <div className="grid size-10 place-items-center rounded-md bg-emerald-500/10 text-emerald-600">
                  <FlaskConical className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.code} • {s.faculty}</p>
                  <p className="text-xs text-muted-foreground mt-1">3 labs • 12 weeks scheduled</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>

      <TabsContent value="materials">
        <SectionCard title="Study Materials" description="Recent uploads across the department.">
          <DataTable columns={materialCols} rows={studyMaterials} rowKey={(m) => m.id} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="activities">
        <SectionCard title="Academic Activities" description="Workshops, seminars, hackathons and FDPs.">
          <ul className="space-y-2">
            {departmentEvents.map((e) => (
              <li key={e.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                  <FileText className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date} • {e.type}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    e.status === "Completed"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : e.status === "Cancelled"
                        ? "border-destructive/30 bg-destructive/10 text-destructive"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  }
                >
                  {e.status}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>
    </Tabs>
  </PortalLayout>
);

export default HodAcademics;
