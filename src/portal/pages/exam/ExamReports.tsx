import { BarChart3, Download, FileText, Award, FileWarning, TrendingUp, ScrollText } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: "Results" | "Backlogs" | "Performance" | "Audit";
  lastGenerated: string;
  format: "PDF" | "Excel" | "Both";
}

const reports: ReportTemplate[] = [
  { id: "ER01", title: "Department Pass Percentage",     description: "Branch-wise pass % for the semester.",          category: "Results",     lastGenerated: "2026-04-30", format: "Both"  },
  { id: "ER02", title: "Subject Pass Percentage",        description: "Pass % per subject — flags weak subjects.",     category: "Results",     lastGenerated: "2026-04-30", format: "Excel" },
  { id: "ER03", title: "Distinction List",               description: "Students with CGPA ≥ 8 and no first-attempt fail.", category: "Performance",  lastGenerated: "2026-05-02", format: "PDF"   },
  { id: "ER04", title: "Backlog Master Report",          description: "Active backlog students per subject.",          category: "Backlogs",    lastGenerated: "2026-05-09", format: "Excel" },
  { id: "ER05", title: "Supplementary Roster",           description: "Backlog candidates eligible for supplementary.",category: "Backlogs",    lastGenerated: "2026-05-12", format: "Excel" },
  { id: "ER06", title: "Top Performers — All Branches",  description: "Top 100 students by CGPA.",                     category: "Performance", lastGenerated: "2026-05-08", format: "PDF"   },
  { id: "ER07", title: "Revaluation Audit",              description: "All revaluation outcomes for the cycle.",       category: "Audit",       lastGenerated: "2026-05-05", format: "Excel" },
  { id: "ER08", title: "Mark Correction Log",            description: "Audit trail of every post-publish correction.", category: "Audit",       lastGenerated: "2026-05-11", format: "Excel" },
];

const categoryIcon = { Results: Award, Backlogs: FileWarning, Performance: TrendingUp, Audit: ScrollText };
const categoryTint = {
  Results:     "from-emerald-400/20 to-emerald-400/5 text-emerald-600 dark:text-emerald-300",
  Backlogs:    "from-destructive/20 to-destructive/5 text-destructive",
  Performance: "from-accent/15 to-accent/5 text-accent",
  Audit:       "from-purple-400/20 to-purple-400/5 text-purple-600 dark:text-purple-300",
};

const grouped = reports.reduce<Record<ReportTemplate["category"], ReportTemplate[]>>(
  (acc, r) => {
    (acc[r.category] = acc[r.category] || []).push(r);
    return acc;
  },
  {} as Record<ReportTemplate["category"], ReportTemplate[]>,
);

const ExamReports = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Reports & Analytics"
      subtitle="Pre-built examination reports — PDF / Excel exports."
      icon={BarChart3}
      breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Reports" }]}
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

export default ExamReports;
