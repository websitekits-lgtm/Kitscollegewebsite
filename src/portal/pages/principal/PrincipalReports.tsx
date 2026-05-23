import { BarChart3, Download, FileText, CalendarCheck, Award, Briefcase, Building2, GraduationCap } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: "Attendance" | "Results" | "Faculty" | "Departments" | "Placement";
  lastGenerated: string;
  format: "PDF" | "Excel" | "Both";
}

const reports: ReportTemplate[] = [
  { id: "PR01", title: "Institutional Attendance Summary",  description: "All departments, monthly.",                          category: "Attendance",  lastGenerated: "2026-05-01", format: "Both" },
  { id: "PR02", title: "Shortage Consolidated Report",      description: "Students below 75% across the college.",             category: "Attendance",  lastGenerated: "2026-05-15", format: "PDF" },
  { id: "PR03", title: "Result Roll-up — last 5 semesters", description: "Pass %, SGPA distribution, distinction count.",      category: "Results",     lastGenerated: "2026-04-30", format: "Both" },
  { id: "PR04", title: "Backlog Tracker",                   description: "Active backlogs per department + subject.",          category: "Results",     lastGenerated: "2026-05-09", format: "Excel" },
  { id: "PR05", title: "Faculty Strength & Workload",       description: "Hours, mentee load, student rating per faculty.",    category: "Faculty",     lastGenerated: "2026-05-10", format: "Excel" },
  { id: "PR06", title: "Faculty Leave Ledger",              description: "Approved / pending leaves for the year.",            category: "Faculty",     lastGenerated: "2026-05-12", format: "Excel" },
  { id: "PR07", title: "Department Performance Matrix",     description: "Att / Pass / Plc / Fee per department.",              category: "Departments", lastGenerated: "2026-05-05", format: "PDF" },
  { id: "PR08", title: "Faculty-to-Student Ratio",          description: "Department-wise S:F ratio.",                          category: "Departments", lastGenerated: "2026-05-05", format: "Excel" },
  { id: "PR09", title: "Placement Statistics",              description: "Drive results, salary stats, top recruiters.",       category: "Placement",   lastGenerated: "2026-04-15", format: "PDF" },
  { id: "PR10", title: "Recruiter History",                 description: "Year-on-year company list and CTC trends.",          category: "Placement",   lastGenerated: "2026-03-20", format: "Excel" },
];

const categoryIcon = {
  Attendance: CalendarCheck,
  Results: Award,
  Faculty: GraduationCap,
  Departments: Building2,
  Placement: Briefcase,
};

const categoryTint = {
  Attendance: "from-accent/15 to-accent/5 text-accent",
  Results:    "from-emerald-400/20 to-emerald-400/5 text-emerald-600 dark:text-emerald-300",
  Faculty:    "from-purple-400/20 to-purple-400/5 text-purple-600 dark:text-purple-300",
  Departments:"from-amber-400/20 to-amber-400/5 text-amber-600 dark:text-amber-300",
  Placement:  "from-rose-400/20 to-rose-400/5 text-rose-600 dark:text-rose-300",
};

const grouped = reports.reduce<Record<ReportTemplate["category"], ReportTemplate[]>>(
  (acc, r) => {
    (acc[r.category] = acc[r.category] || []).push(r);
    return acc;
  },
  {} as Record<ReportTemplate["category"], ReportTemplate[]>,
);

const PrincipalReports = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Reports & Analytics"
      subtitle="Institution-wide reports — PDF or Excel exports."
      icon={BarChart3}
      breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Reports" }]}
    />

    <div className="space-y-6">
      {(Object.keys(grouped) as ReportTemplate["category"][]).map((cat) => {
        const Icon = categoryIcon[cat];
        return (
          <SectionCard key={cat} title={`${cat} Reports`} description={`${grouped[cat].length} templates`}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[cat].map((r) => (
                <div key={r.id} className="rounded-lg border border-border p-4 hover:border-accent/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`grid size-10 place-items-center rounded-md bg-gradient-to-br shrink-0 ${categoryTint[cat]}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{r.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                    <Badge variant="outline" className="text-[10px]"><FileText className="size-3 mr-1" /> {r.format}</Badge>
                    <span className="text-muted-foreground tabular-nums">Last: {r.lastGenerated}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="flex-1 h-8 gap-1.5"><Download className="size-3.5" /> Generate</Button>
                    <Button size="sm" variant="outline" className="h-8">Schedule</Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        );
      })}
    </div>
  </PortalLayout>
);

export default PrincipalReports;
