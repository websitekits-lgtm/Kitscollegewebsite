import { Building2, Users, CalendarCheck, Award, Briefcase, Wallet, Link2 } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { departmentSnapshots, type DepartmentSnapshot } from "@/portal/mock/principalData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const cols: DataTableColumn<DepartmentSnapshot>[] = [
  { key: "code", header: "Code", render: (d) => <span className="font-mono text-xs">{d.code}</span> },
  { key: "name", header: "Department", render: (d) => <span className="font-medium">{d.shortName}</span> },
  { key: "hod", header: "HOD", render: (d) => d.hod, hideOnMobile: true },
  { key: "students", header: "Students", render: (d) => d.students, align: "center" },
  { key: "faculty", header: "Faculty", render: (d) => d.faculty, align: "center", hideOnMobile: true },
  {
    key: "att", header: "Att %", align: "center",
    render: (d) => (
      <span className={d.attendancePct < 75 ? "text-destructive font-bold" : "text-foreground font-semibold"}>
        {d.attendancePct}%
      </span>
    ),
  },
  { key: "pass", header: "Pass %", render: (d) => <span className="text-emerald-600 dark:text-emerald-400 font-bold">{d.passPct}%</span>, align: "center" },
  {
    key: "plc", header: "Plc %", align: "center",
    render: (d) => (
      <Badge variant="outline" className={d.placementPct >= 85 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : d.placementPct < 75 ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"}>
        {d.placementPct}%
      </Badge>
    ),
  },
];

const PrincipalDepartments = () => {
  // Pick CSE as the radar reference (any department can be picked)
  const cse = departmentSnapshots.find((d) => d.code === "CSE")!;
  const radarData = [
    { metric: "Attendance", value: cse.attendancePct },
    { metric: "Pass %", value: cse.passPct },
    { metric: "Placement %", value: cse.placementPct },
    { metric: "Fee Collection", value: cse.feeCollectedPct },
    { metric: "Faculty Ratio", value: Math.min(100, Math.round((cse.faculty / cse.students) * 100 * 3)) },
  ];

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Departments"
        subtitle="Performance and analytics across all departments."
        icon={Building2}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Departments" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Department snapshots are derived from the same <span className="font-semibold">departments</span> table used by HODs.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Departments" value={departmentSnapshots.length} icon={Building2} />
        <StatCard label="Best attendance" value={`${Math.max(...departmentSnapshots.map(d => d.attendancePct))}%`} helper={departmentSnapshots.reduce((b, d) => d.attendancePct > b.attendancePct ? d : b).shortName} icon={CalendarCheck} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Top placement" value={`${Math.max(...departmentSnapshots.map(d => d.placementPct))}%`} helper={departmentSnapshots.reduce((b, d) => d.placementPct > b.placementPct ? d : b).shortName} icon={Briefcase} tint="from-rose-400/20 to-rose-400/5" />
        <StatCard label="Top pass %" value={`${Math.max(...departmentSnapshots.map(d => d.passPct))}%`} helper={departmentSnapshots.reduce((b, d) => d.passPct > b.passPct ? d : b).shortName} icon={Award} tint="from-accent/20 to-accent/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="performance">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="performance">Performance Table</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="faculty">Faculty Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <SectionCard title="All Departments — at a glance">
              <DataTable columns={cols} rows={departmentSnapshots} rowKey={(d) => d.code} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="attendance">
            <ChartCard title="Department Attendance %" description="Weighted average per dept" height="h-72">
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
          </TabsContent>

          <TabsContent value="results">
            <ChartCard title="Department Pass %" description="Latest semester" height="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentSnapshots} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="shortName" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="passPct" fill="hsl(135 60% 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </TabsContent>

          <TabsContent value="faculty">
            <SectionCard title="Faculty Strength by Department">
              <ul className="space-y-2">
                {departmentSnapshots.map((d) => (
                  <li key={d.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                      <Users className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{d.name}</p>
                      <p className="text-xs text-muted-foreground">HoD: {d.hod}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums">{d.faculty}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Faculty</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold tabular-nums">{Math.round(d.students / d.faculty)}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">S : F</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="CSE — Radar profile" description="5-dimension snapshot" height="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="80%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Radar dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>

              <SectionCard title="Fee Collection by Department">
                <ul className="space-y-2">
                  {departmentSnapshots.map((d) => (
                    <li key={d.code} className="flex items-center gap-3 rounded-md border border-border p-3">
                      <Wallet className="size-4 text-accent shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{d.name}</p>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/15">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${d.feeCollectedPct}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-bold tabular-nums">{d.feeCollectedPct}%</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default PrincipalDepartments;
