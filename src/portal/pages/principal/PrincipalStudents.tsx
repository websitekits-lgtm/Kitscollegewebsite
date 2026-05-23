import { Users, AlertTriangle, BookOpenCheck, TrendingUp, Link2, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roster, type RosterStudent } from "@/portal/mock/college";
import { mentoringNotes } from "@/portal/mock/facultyData";
import { departmentSnapshots, institutionKPI } from "@/portal/mock/principalData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const studentCols: DataTableColumn<RosterStudent>[] = [
  { key: "roll", header: "Roll No", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "dept", header: "Dept", render: (r) => r.department, align: "center", hideOnMobile: true },
  {
    key: "att", header: "Attendance", align: "center",
    render: (r) => <span className={r.attendancePct < 75 ? "text-destructive font-bold" : "text-foreground font-semibold"}>{r.attendancePct}%</span>,
  },
  { key: "cgpa", header: "CGPA", render: (r) => r.cgpa.toFixed(2), align: "center", hideOnMobile: true },
  {
    key: "back", header: "Backlogs", align: "center",
    render: (r) =>
      r.backlogs > 0
        ? <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{r.backlogs}</Badge>
        : <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>,
  },
];

const PrincipalStudents = () => {
  const backlogs = roster.filter((r) => r.backlogs > 0).sort((a, b) => b.backlogs - a.backlogs);
  const top = [...roster].sort((a, b) => b.cgpa - a.cgpa).slice(0, 10);

  const strengthByDept = departmentSnapshots.map((d) => ({ dept: d.shortName, students: d.students }));
  const attendanceBuckets = [
    { name: "Above 85%", value: roster.filter((r) => r.attendancePct >= 85).length, color: "hsl(var(--accent))" },
    { name: "75 – 85%", value: roster.filter((r) => r.attendancePct >= 75 && r.attendancePct < 85).length, color: "hsl(135 60% 70%)" },
    { name: "Below 75%", value: roster.filter((r) => r.attendancePct < 75).length, color: "hsl(var(--destructive))" },
  ];

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Student Overview"
        subtitle="Institution-wide student strength, performance and analytics."
        icon={Users}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Students" }]}
        actions={<Button variant="outline" className="gap-2"><Download className="size-4" /> Export</Button>}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Aggregated from the same <span className="font-semibold">roster</span> Faculty/HoD/Student portals read.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={institutionKPI.totalStudents.toLocaleString("en-IN")} icon={Users} />
        <StatCard label="Avg Attendance" value={`${institutionKPI.overallAttendancePct}%`} helper="All depts" trend={2} />
        <StatCard label="With Backlogs" value={backlogs.length} helper="From sample roster" icon={BookOpenCheck} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Mentoring flags" value={mentoringNotes.filter((m) => m.flag === "critical").length} helper="Critical cases" icon={AlertTriangle} tint="from-destructive/20 to-destructive/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="strength">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Analytics</TabsTrigger>
            <TabsTrigger value="backlogs">Backlog Students</TabsTrigger>
            <TabsTrigger value="performance">Top Performers</TabsTrigger>
            <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
          </TabsList>

          <TabsContent value="strength">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Student Strength by Department" description="Total students per branch" height="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={strengthByDept} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="dept" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="students" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <SectionCard title="Department Breakdown">
                <ul className="space-y-2">
                  {departmentSnapshots.map((d) => (
                    <li key={d.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.faculty} faculty • {Math.round(d.students / d.faculty)}:1</p>
                      </div>
                      <p className="text-lg font-bold tabular-nums">{d.students}</p>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Attendance Buckets" description="Distribution from sample roster" height="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceBuckets} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {attendanceBuckets.map((b) => <Cell key={b.name} fill={b.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Attendance % by Department" height="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentSnapshots} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="shortName" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="attendancePct" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="backlogs">
            <SectionCard title="Backlog Students" description="Sample from CSE 3rd-year section — multiply by enrollment ratios for institution view.">
              <DataTable columns={studentCols} rows={backlogs} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="performance">
            <SectionCard title="Top 10 — CGPA leaderboard">
              <DataTable columns={studentCols} rows={top} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="mentoring">
            <SectionCard title="Mentoring Overview" description="Critical and watch-list cases across the institution.">
              <ul className="space-y-3">
                {mentoringNotes.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                    <span className={`mt-1 size-2.5 rounded-full shrink-0 ${
                      n.flag === "critical" ? "bg-destructive" : n.flag === "watch" ? "bg-amber-500" : "bg-emerald-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">
                        {n.studentName} <span className="font-mono text-xs font-normal text-muted-foreground">• {n.rollNo}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{n.note}</p>
                    </div>
                    <TrendingUp className="size-4 text-accent shrink-0" />
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

export default PrincipalStudents;
