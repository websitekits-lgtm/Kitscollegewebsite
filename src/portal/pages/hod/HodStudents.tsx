import { useState } from "react";
import { Users, AlertTriangle, BookOpenCheck, TrendingUp, Search, Link2, Download } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roster, type RosterStudent } from "@/portal/mock/college";
import { mentoringNotes } from "@/portal/mock/facultyData";

const studentCols: DataTableColumn<RosterStudent>[] = [
  { key: "roll", header: "Roll No", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
  {
    key: "att",
    header: "Attendance",
    render: (r) => (
      <span className={r.attendancePct < 75 ? "text-destructive font-bold" : "text-foreground/85 font-semibold"}>
        {r.attendancePct}%
      </span>
    ),
    align: "center",
  },
  { key: "cgpa", header: "CGPA", render: (r) => <span className="tabular-nums font-medium">{r.cgpa.toFixed(2)}</span>, align: "center", hideOnMobile: true },
  {
    key: "back",
    header: "Backlogs",
    render: (r) =>
      r.backlogs > 0 ? (
        <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{r.backlogs}</Badge>
      ) : (
        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>
      ),
    align: "center",
    hideOnMobile: true,
  },
  {
    key: "fee",
    header: "Fees",
    render: (r) => (
      <Badge
        variant="outline"
        className={
          r.feeStatus === "Paid"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : r.feeStatus === "Pending"
              ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              : "border-destructive/30 bg-destructive/10 text-destructive"
        }
      >
        {r.feeStatus}
      </Badge>
    ),
    align: "center",
    hideOnMobile: true,
  },
];

const HodStudents = () => {
  const [search, setSearch] = useState("");
  const filtered = roster.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.rollNo.toLowerCase().includes(search.toLowerCase()));
  const shortage = roster.filter((r) => r.attendancePct < 75);
  const backlogs = roster.filter((r) => r.backlogs > 0).sort((a, b) => b.backlogs - a.backlogs);
  const topPerformers = [...roster].sort((a, b) => b.cgpa - a.cgpa);

  // Distribution bucketing for analytics
  const cgpaBuckets = [
    { range: "9+", count: roster.filter((r) => r.cgpa >= 9).length },
    { range: "8.5–9", count: roster.filter((r) => r.cgpa >= 8.5 && r.cgpa < 9).length },
    { range: "8–8.5", count: roster.filter((r) => r.cgpa >= 8 && r.cgpa < 8.5).length },
    { range: "7–8", count: roster.filter((r) => r.cgpa >= 7 && r.cgpa < 8).length },
    { range: "<7", count: roster.filter((r) => r.cgpa < 7).length },
  ];
  const attendanceBuckets = [
    { name: "Above 85%", value: roster.filter((r) => r.attendancePct >= 85).length, color: "hsl(var(--accent))" },
    { name: "75 – 85%", value: roster.filter((r) => r.attendancePct >= 75 && r.attendancePct < 85).length, color: "hsl(135 60% 70%)" },
    { name: "Below 75%", value: roster.filter((r) => r.attendancePct < 75).length, color: "hsl(var(--destructive))" },
  ];

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Student Monitoring"
        subtitle="Department roster — same data Faculty see, with department-wide rollups."
        icon={Users}
        breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Students" }]}
        actions={<Button variant="outline" className="gap-2"><Download className="size-4" /> Export</Button>}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>
          Shared with <span className="font-semibold">Faculty → Students</span> and the student's own portal.
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={roster.length} helper="3rd Year • Sec A" icon={Users} />
        <StatCard label="Shortage (att.)" value={shortage.length} helper="< 75%" icon={AlertTriangle} tint="from-destructive/20 to-destructive/5" />
        <StatCard label="With Backlogs" value={backlogs.length} icon={BookOpenCheck} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Top CGPA" value={topPerformers[0]?.cgpa.toFixed(2)} helper={topPerformers[0]?.name} icon={TrendingUp} tint="from-emerald-400/20 to-emerald-400/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="list">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="list">Roster</TabsTrigger>
            <TabsTrigger value="shortage">Attendance Shortage</TabsTrigger>
            <TabsTrigger value="backlogs">Backlogs</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <SectionCard title="Full Roster" description={`${filtered.length} students`}>
              <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-secondary/5 px-3">
                <Search className="size-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="border-0 h-10 px-0 focus-visible:ring-0" />
              </div>
              <DataTable columns={studentCols} rows={filtered} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="shortage">
            <SectionCard title="Attendance Shortage" description="Below 75% — mandatory parent notification required.">
              <DataTable columns={studentCols} rows={shortage} rowKey={(r) => r.rollNo} emptyTitle="No shortage cases" />
            </SectionCard>
          </TabsContent>

          <TabsContent value="backlogs">
            <SectionCard title="Backlog Students" description="Active unclear papers — flagged for remedial action.">
              <DataTable columns={studentCols} rows={backlogs} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="performance">
            <SectionCard title="Performance Ranking" description="Sorted by CGPA — high to low.">
              <DataTable columns={studentCols} rows={topPerformers} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="mentoring">
            <SectionCard title="Mentoring Overview" description="Notes from class mentors (same data Faculty see).">
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
                      <p className="text-sm text-muted-foreground mt-0.5">{n.note}</p>
                    </div>
                    <span className="text-xs tabular-nums text-foreground/70 shrink-0">{n.date}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="CGPA Distribution" description="Number of students per range" height="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cgpaBuckets} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Attendance Buckets" description="Distribution across the section" height="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceBuckets} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {attendanceBuckets.map((b) => <Cell key={b.name} fill={b.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

export default HodStudents;
