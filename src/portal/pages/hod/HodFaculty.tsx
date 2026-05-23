import { GraduationCap, BookOpen, CalendarDays, Star, Mail, Phone, Link2, Check, X } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { facultyDirectory, type FacultyDirectoryEntry } from "@/portal/mock/college";
import { facultyWorkload, facultyLeaveRequests, type FacultyLeaveRequest } from "@/portal/mock/hodData";
import { subjects } from "@/portal/mock/studentData";

const cseFaculty = facultyDirectory.filter((f) => f.department === "CSE");

const facultyCols: DataTableColumn<FacultyDirectoryEntry>[] = [
  { key: "id", header: "ID", render: (f) => <span className="font-mono text-xs">{f.id}</span> },
  { key: "name", header: "Name", render: (f) => <span className="font-medium">{f.name}</span> },
  { key: "des", header: "Designation", render: (f) => f.designation, hideOnMobile: true },
  { key: "exp", header: "Exp", render: (f) => `${f.experience} yrs`, align: "center" },
  { key: "qual", header: "Qualification", render: (f) => f.qualification, hideOnMobile: true },
  { key: "subj", header: "Subjects", render: (f) => f.subjectsTaught.length, align: "center" },
];

const workloadCols: DataTableColumn<typeof facultyWorkload[number]>[] = [
  { key: "name", header: "Faculty", render: (w) => <span className="font-medium">{w.facultyName}</span> },
  { key: "des", header: "Designation", render: (w) => w.designation, hideOnMobile: true },
  { key: "h", header: "Hrs / week", render: (w) => <span className="tabular-nums font-bold">{w.weeklyHours}</span>, align: "center" },
  { key: "th", header: "Theory", render: (w) => w.theoryHours, align: "center", hideOnMobile: true },
  { key: "lh", header: "Lab", render: (w) => w.labHours, align: "center", hideOnMobile: true },
  { key: "m", header: "Mentees", render: (w) => w.mentees, align: "center" },
  {
    key: "r",
    header: "Rating",
    render: (w) => (
      <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-300">
        <Star className="size-3.5 fill-current" /> {w.classAvgRating.toFixed(1)}
      </span>
    ),
    align: "center",
  },
];

const leaveCols: DataTableColumn<FacultyLeaveRequest>[] = [
  { key: "fac", header: "Faculty", render: (l) => <span className="font-medium">{l.facultyName}</span> },
  { key: "type", header: "Type", render: (l) => <Badge variant="outline">{l.type}</Badge>, hideOnMobile: true, align: "center" },
  { key: "dates", header: "Dates", render: (l) => <span className="tabular-nums">{l.from} → {l.to}</span> },
  { key: "days", header: "Days", render: (l) => l.days, align: "center", hideOnMobile: true },
  {
    key: "status",
    header: "Status",
    render: (l) => (
      <Badge
        variant="outline"
        className={
          l.status === "Approved"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : l.status === "Pending"
              ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              : "border-destructive/30 bg-destructive/10 text-destructive"
        }
      >
        {l.status}
      </Badge>
    ),
    align: "center",
  },
  {
    key: "actions",
    header: "Action",
    render: (l) =>
      l.status === "Pending" ? (
        <div className="flex gap-1 justify-center">
          <Button size="sm" className="h-7 gap-1"><Check className="size-3.5" /> Approve</Button>
          <Button size="sm" variant="outline" className="h-7 gap-1"><X className="size-3.5" /> Reject</Button>
        </div>
      ) : null,
    align: "center",
  },
];

const HodFaculty = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Faculty Management"
      subtitle="Members, workload, subject allocation and leave approvals."
      icon={GraduationCap}
      breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Faculty" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Faculty list is the same directory used in <span className="font-semibold">Faculty profiles</span>; approving a leave here clears the request from their portal.
      </span>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Faculty Members" value={cseFaculty.length} icon={GraduationCap} />
      <StatCard label="Avg Workload" value={`${Math.round(facultyWorkload.reduce((s, w) => s + w.weeklyHours, 0) / facultyWorkload.length)} hrs`} helper="per week" icon={CalendarDays} />
      <StatCard label="Pending Leaves" value={facultyLeaveRequests.filter((l) => l.status === "Pending").length} helper="Awaiting approval" tint="from-amber-400/20 to-amber-400/5" />
      <StatCard label="Avg Rating" value={(facultyWorkload.reduce((s, w) => s + w.classAvgRating, 0) / facultyWorkload.length).toFixed(2)} helper="Student feedback" icon={Star} tint="from-emerald-400/20 to-emerald-400/5" />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="list">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="list">Faculty List</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
          <TabsTrigger value="subjects">Subject Allocation</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <SectionCard title="CSE Faculty">
            <DataTable columns={facultyCols} rows={cseFaculty} rowKey={(f) => f.id} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cseFaculty.map((f) => (
                <div key={f.id} className="rounded-lg border border-border p-3 bg-card">
                  <p className="font-semibold text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.designation} • {f.qualification}</p>
                  <div className="mt-2 space-y-1 text-xs">
                    <span className="flex items-center gap-1.5 text-foreground/85"><Mail className="size-3 text-accent" /> {f.email}</span>
                    <span className="flex items-center gap-1.5 text-foreground/85"><Phone className="size-3 text-accent" /> {f.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="workload">
          <SectionCard title="Faculty Workload — current semester" description="Weekly hours, mentee load, and student rating.">
            <DataTable columns={workloadCols} rows={facultyWorkload} rowKey={(w) => w.facultyId} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="subjects">
          <SectionCard title="Subject Allocation" description="Which faculty member teaches which subject this semester.">
            <ul className="space-y-2">
              {subjects.map((s) => (
                <li key={s.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                  <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                    <BookOpen className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.code} • {s.credits} credits</p>
                  </div>
                  <Badge variant="outline" className={s.category === "Lab" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border"}>
                    {s.category}
                  </Badge>
                  <span className="text-sm font-semibold text-foreground/85 ml-2">{s.faculty}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="leaves">
          <SectionCard title="Leave Requests" description="Approve or reject from here — faculty will see the decision instantly.">
            <DataTable columns={leaveCols} rows={facultyLeaveRequests} rowKey={(l) => l.id} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="performance">
          <ChartCard title="Faculty Performance — student ratings" description="Out of 5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyWorkload} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="facultyName" tickFormatter={(s: string) => s.split(" ").slice(-1)[0]} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Bar dataKey="classAvgRating" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

export default HodFaculty;
