import { GraduationCap, Star, Calendar, BadgeCheck, Link2, Check, X } from "lucide-react";
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

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const cols: DataTableColumn<FacultyDirectoryEntry>[] = [
  { key: "id", header: "ID", render: (f) => <span className="font-mono text-xs">{f.id}</span> },
  { key: "name", header: "Name", render: (f) => <span className="font-medium">{f.name}</span> },
  { key: "dept", header: "Dept", render: (f) => f.department, align: "center" },
  { key: "des", header: "Designation", render: (f) => f.designation, hideOnMobile: true },
  { key: "exp", header: "Exp", render: (f) => `${f.experience}y`, align: "center" },
  { key: "qual", header: "Qualification", render: (f) => f.qualification, hideOnMobile: true },
];

const leaveCols: DataTableColumn<FacultyLeaveRequest>[] = [
  { key: "fac", header: "Faculty", render: (l) => <span className="font-medium">{l.facultyName}</span> },
  { key: "type", header: "Type", render: (l) => <Badge variant="outline">{l.type}</Badge>, hideOnMobile: true, align: "center" },
  { key: "dates", header: "Dates", render: (l) => <span className="tabular-nums">{l.from} → {l.to}</span> },
  {
    key: "status", header: "Status", align: "center",
    render: (l) => (
      <Badge variant="outline" className={
        l.status === "Approved"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : l.status === "Pending"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : "border-destructive/30 bg-destructive/10 text-destructive"
      }>{l.status}</Badge>
    ),
  },
  {
    key: "action", header: "Action", align: "center",
    render: (l) => l.status === "Pending" ? (
      <div className="flex gap-1 justify-center">
        <Button size="sm" className="h-7 gap-1"><Check className="size-3.5" /> Approve</Button>
        <Button size="sm" variant="outline" className="h-7 gap-1"><X className="size-3.5" /> Reject</Button>
      </div>
    ) : null,
  },
];

const PrincipalFaculty = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Faculty Overview"
      subtitle="Institution-wide faculty directory, performance and leave queue."
      icon={GraduationCap}
      breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Faculty" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>Shares the <span className="font-semibold">facultyDirectory</span> and leave queue with HOD portals.</span>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Faculty" value={142} helper="Institution-wide" icon={GraduationCap} />
      <StatCard label="Avg Rating" value={(facultyWorkload.reduce((s, w) => s + w.classAvgRating, 0) / facultyWorkload.length).toFixed(2)} helper="Out of 5" icon={Star} tint="from-emerald-400/20 to-emerald-400/5" />
      <StatCard label="Pending Leaves" value={facultyLeaveRequests.filter((l) => l.status === "Pending").length} helper="Awaiting decision" icon={Calendar} tint="from-amber-400/20 to-amber-400/5" />
      <StatCard label="Avg Workload" value={`${Math.round(facultyWorkload.reduce((s, w) => s + w.weeklyHours, 0) / facultyWorkload.length)} hrs`} helper="per week" icon={BadgeCheck} />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="list">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="list">Directory</TabsTrigger>
          <TabsTrigger value="attendance">Faculty Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <SectionCard title="Faculty Directory" description="All faculty across departments.">
            <DataTable columns={cols} rows={facultyDirectory} rowKey={(f) => f.id} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="attendance">
          <SectionCard title="Faculty Attendance" description="HR-tracked attendance — yearly view.">
            <ul className="space-y-2">
              {facultyDirectory.map((f) => {
                const att = 92 + (f.id.charCodeAt(2) % 8);
                return (
                  <li key={f.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.department} • {f.designation}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{att}%</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Attendance</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="performance">
          <ChartCard title="Faculty Performance — student ratings" description="Out of 5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyWorkload} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="facultyName" tickFormatter={(s: string) => s.split(" ").slice(-1)[0]} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="classAvgRating" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="workload">
          <SectionCard title="Workload Overview" description="Weekly hours per faculty.">
            <DataTable
              columns={[
                { key: "name", header: "Faculty", render: (w) => w.facultyName },
                { key: "des", header: "Designation", render: (w) => w.designation, hideOnMobile: true },
                { key: "h", header: "Hrs / wk", render: (w) => <span className="tabular-nums font-bold">{w.weeklyHours}</span>, align: "center" },
                { key: "m", header: "Mentees", render: (w) => w.mentees, align: "center" },
                {
                  key: "r", header: "Rating", align: "center",
                  render: (w) => (
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-300">
                      <Star className="size-3.5 fill-current" /> {w.classAvgRating.toFixed(1)}
                    </span>
                  ),
                },
              ]}
              rows={facultyWorkload}
              rowKey={(w) => w.facultyId}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="leaves">
          <SectionCard title="Leave Requests" description="Escalated and high-level reviews.">
            <DataTable columns={leaveCols} rows={facultyLeaveRequests} rowKey={(l) => l.id} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

export default PrincipalFaculty;
