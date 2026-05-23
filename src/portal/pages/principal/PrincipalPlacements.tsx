import { Briefcase, Trophy, TrendingUp, Users, Building2, Link2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placementStats } from "@/portal/mock/hodData";
import { placementCompanies } from "@/portal/mock/studentData";
import { roster } from "@/portal/mock/college";
import { departmentSnapshots, institutionKPI } from "@/portal/mock/principalData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const PrincipalPlacements = () => {
  const latest = placementStats.at(-1)!;
  const eligible = roster.filter((r) => r.cgpa >= 7.0 && r.backlogs === 0);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Placement Overview"
        subtitle="Institution-wide statistics, drives and analytics."
        icon={Briefcase}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Placements" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Aggregates per-department stats from the HoD Placement view.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Placement %" value={`${institutionKPI.overallPlacementPct}%`} helper="All branches" icon={Briefcase} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Highest Package" value={`₹ ${institutionKPI.highestPackageLpa} LPA`} helper={`${latest.year}`} icon={Trophy} tint="from-rose-400/20 to-rose-400/5" />
        <StatCard label="Avg Package" value={`₹ ${latest.avgLpa} LPA`} helper="Median offer" icon={TrendingUp} />
        <StatCard label="Eligible Students" value={eligible.length} helper="CGPA ≥ 7 + clean" icon={Users} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="stats">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="dept">By Department</TabsTrigger>
            <TabsTrigger value="drives">Company Drives</TabsTrigger>
            <TabsTrigger value="eligible">Eligible Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Placement % — last 5 years" height="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementStats} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="placementPct" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Average Package" description="LPA trend" height="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementStats} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="avgLpa" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="dept">
            <ChartCard title="Placement % by Department" height="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentSnapshots} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="shortName" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="placementPct" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
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
            <SectionCard title="Eligible Students" description="From the sample roster — CGPA ≥ 7.0 and no backlogs.">
              <p className="mb-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{eligible.length}</span> students eligible from CSE 3rd-year section.
                Apply the same eligibility across all sections to project institution-wide.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {eligible.slice(0, 12).map((r) => (
                  <li key={r.rollNo} className="rounded-md border border-border p-3 bg-card">
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{r.rollNo}</p>
                    <p className="mt-1 text-xs text-foreground/80">CGPA {r.cgpa.toFixed(2)} • {r.attendancePct}% attendance</p>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="analytics">
            <SectionCard title="Year-on-Year Analytics">
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

export default PrincipalPlacements;
