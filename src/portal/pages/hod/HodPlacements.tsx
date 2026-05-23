import { Briefcase, Trophy, TrendingUp, Users, Building2, Link2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placementStats } from "@/portal/mock/hodData";
import { placementCompanies, type PlacementCompany } from "@/portal/mock/studentData";
import { roster } from "@/portal/mock/college";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const driveCols: DataTableColumn<PlacementCompany>[] = [
  { key: "name", header: "Company", render: (c) => <span className="font-semibold">{c.name}</span> },
  { key: "role", header: "Role", render: (c) => c.role, hideOnMobile: true },
  { key: "ctc", header: "CTC", render: (c) => <span className="tabular-nums">{c.ctc}</span> },
  { key: "date", header: "Drive Date", render: (c) => <span className="tabular-nums">{c.driveDate}</span> },
  { key: "elig", header: "Eligibility", render: (c) => c.eligibility, hideOnMobile: true },
];

const eligibleStudents = roster.filter((r) => r.cgpa >= 7.0 && r.backlogs === 0);

const HodPlacements = () => {
  const latest = placementStats.at(-1)!;
  const placementYoY = placementStats.map((p) => ({ year: p.year, pct: p.placementPct, avg: p.avgLpa }));

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Placement Overview"
        subtitle="Department-wide placement statistics, drives and selections."
        icon={Briefcase}
        breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Placements" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Eligible-student list shares CGPA + backlog criteria with the Student Portal — only the cohort view changes.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Latest Placement %" value={`${latest.placementPct}%`} helper={`${latest.placed} / ${latest.registered}`} icon={Briefcase} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Highest Offer" value={`₹ ${latest.highestLpa} LPA`} helper={`Year ${latest.year}`} icon={Trophy} tint="from-rose-400/20 to-rose-400/5" />
        <StatCard label="Avg Offer" value={`₹ ${latest.avgLpa} LPA`} helper="Across selects" icon={TrendingUp} />
        <StatCard label="Eligible Students" value={eligibleStudents.length} helper="CGPA ≥ 7.0, no backlogs" icon={Users} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="stats">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="drives">Company Drives</TabsTrigger>
            <TabsTrigger value="eligible">Eligible Students</TabsTrigger>
            <TabsTrigger value="selected">Selected Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Placement %" description="Year-on-year">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementYoY} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="pct" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Average LPA" description="Year-on-year salary growth">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementYoY} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="avg" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="drives">
            <SectionCard title="Active Drives">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {placementCompanies.map((c) => (
                  <div key={c.id} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                          <Building2 className="size-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{c.status}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      CTC <span className="font-semibold text-foreground tabular-nums">{c.ctc}</span> • Drive <span className="font-semibold text-foreground tabular-nums">{c.driveDate}</span>
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="eligible">
            <SectionCard title="Eligible Students" description="CGPA ≥ 7.0 and no backlogs.">
              <DataTable
                columns={[
                  { key: "roll", header: "Roll No", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
                  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
                  { key: "cgpa", header: "CGPA", render: (r) => r.cgpa.toFixed(2), align: "center" },
                  { key: "att", header: "Attendance", render: (r) => `${r.attendancePct}%`, align: "center" },
                ]}
                rows={eligibleStudents}
                rowKey={(r) => r.rollNo}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="selected">
            <SectionCard title="Selected — current cycle">
              <DataTable
                columns={driveCols}
                rows={placementCompanies.filter((c) => c.status === "Applied")}
                rowKey={(c) => c.id}
                emptyTitle="No selections yet"
                emptyDescription="Once recruiters publish results, selections appear here."
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="analytics">
            <SectionCard title="Comparative Analytics">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 text-left text-xs uppercase tracking-wider text-muted-foreground">Year</th>
                      <th className="py-2 text-right text-xs uppercase tracking-wider text-muted-foreground">Registered</th>
                      <th className="py-2 text-right text-xs uppercase tracking-wider text-muted-foreground">Placed</th>
                      <th className="py-2 text-right text-xs uppercase tracking-wider text-muted-foreground">%</th>
                      <th className="py-2 text-right text-xs uppercase tracking-wider text-muted-foreground">Highest</th>
                      <th className="py-2 text-right text-xs uppercase tracking-wider text-muted-foreground">Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placementStats.map((s) => (
                      <tr key={s.year} className="border-b border-border last:border-0">
                        <td className="py-2 font-semibold">{s.year}</td>
                        <td className="py-2 text-right tabular-nums">{s.registered}</td>
                        <td className="py-2 text-right tabular-nums">{s.placed}</td>
                        <td className="py-2 text-right font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{s.placementPct}%</td>
                        <td className="py-2 text-right tabular-nums">₹ {s.highestLpa} LPA</td>
                        <td className="py-2 text-right tabular-nums">₹ {s.avgLpa} LPA</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default HodPlacements;
