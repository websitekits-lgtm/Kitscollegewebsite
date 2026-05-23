import { Briefcase, Building2, CheckCircle2, Send, Trophy, TrendingUp, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { placementCompanies, type PlacementCompany } from "@/portal/mock/studentData";

const statusClass = (s: PlacementCompany["status"]) =>
  s === "Eligible"
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
    : s === "Applied"
      ? "border-accent/30 bg-accent/10 text-accent"
      : s === "Open"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : "border-border bg-secondary/10 text-foreground/70";

const eligible = placementCompanies.filter((c) => c.status === "Eligible" || c.status === "Applied");
const applied = placementCompanies.filter((c) => c.status === "Applied");
const upcoming = [...placementCompanies].sort((a, b) => a.driveDate.localeCompare(b.driveDate));

const StudentPlacements = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Placements"
      subtitle="Eligible companies, upcoming drives and placement notifications."
      icon={Briefcase}
      breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Placements" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Drives and eligibility lists are managed by the
        <span className="font-semibold"> Placement Cell</span>. HOD + Principal also see rollups of your section.
      </span>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Eligible drives" value={eligible.length} helper="Open to you" icon={CheckCircle2} tint="from-emerald-400/20 to-emerald-400/5" />
      <StatCard label="Applied" value={applied.length} helper="Track in 'Applied' tab" icon={Send} />
      <StatCard label="Upcoming drives" value={placementCompanies.length} helper="In next 60 days" icon={Building2} tint="from-amber-400/20 to-amber-400/5" />
      <StatCard label="Highest offer" value="₹ 9 LPA" helper="From Infosys (live)" icon={Trophy} tint="from-rose-400/20 to-rose-400/5" />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="eligible">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="eligible">Eligible</TabsTrigger>
          <TabsTrigger value="all">All Drives</TabsTrigger>
          <TabsTrigger value="applied">Applied ({applied.length})</TabsTrigger>
          <TabsTrigger value="results">My Results</TabsTrigger>
        </TabsList>

        <TabsContent value="eligible">
          <CompanyGrid rows={eligible} />
        </TabsContent>
        <TabsContent value="all">
          <CompanyGrid rows={upcoming} />
        </TabsContent>
        <TabsContent value="applied">
          {applied.length ? <CompanyGrid rows={applied} /> : (
            <SectionCard title="Applied">
              <p className="rounded-md border border-dashed border-border bg-secondary/5 p-6 text-center text-sm text-muted-foreground">
                You haven't applied to any drive yet.
              </p>
            </SectionCard>
          )}
        </TabsContent>
        <TabsContent value="results">
          <SectionCard title="Placement Results" description="Your offer letters and rejection notices will appear here.">
            <div className="rounded-md border border-dashed border-border bg-secondary/5 p-6 text-center">
              <TrendingUp className="size-6 mx-auto text-muted-foreground" />
              <p className="mt-2 font-semibold text-foreground">No results yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Once a recruiter announces results, they'll show up here.</p>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

const CompanyGrid = ({ rows }: { rows: PlacementCompany[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {rows.map((c) => (
      <div key={c.id} className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_30px_-12px_hsl(var(--primary)/0.18)]">
        <div className="flex items-start gap-3">
          <div className="grid size-12 place-items-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 text-accent shrink-0">
            <Building2 className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-lg font-semibold text-foreground truncate">{c.name}</p>
            <p className="truncate text-sm text-muted-foreground">{c.role}</p>
          </div>
          <Badge variant="outline" className={cn("shrink-0", statusClass(c.status))}>{c.status}</Badge>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">CTC</dt>
            <dd className="font-semibold text-foreground tabular-nums">{c.ctc}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Drive Date</dt>
            <dd className="font-semibold text-foreground tabular-nums">{c.driveDate}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/85">Eligibility:</span> {c.eligibility}
        </p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" disabled={c.status === "Applied" || c.status === "Closed"} className="flex-1">
            {c.status === "Applied" ? "Applied" : c.status === "Closed" ? "Closed" : "Apply Now"}
          </Button>
          <Button size="sm" variant="outline">Details</Button>
        </div>
      </div>
    ))}
  </div>
);

export default StudentPlacements;
