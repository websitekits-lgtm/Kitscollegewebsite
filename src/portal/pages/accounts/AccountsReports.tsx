import { PieChart, Download, FileText, Wallet, AlertCircle, HandCoins, TrendingUp, Building2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: "Collection" | "Pending" | "Scholarships" | "Expenses" | "Departments";
  lastGenerated: string;
  format: "PDF" | "Excel" | "Both";
}

const reports: ReportTemplate[] = [
  { id: "AR01", title: "Daily Collection Sheet",          description: "Day-end summary of all collections.",        category: "Collection",    lastGenerated: "2026-05-20", format: "PDF" },
  { id: "AR02", title: "Monthly Collection — by category", description: "Tuition / Hostel / Bus / Exam splits.",      category: "Collection",    lastGenerated: "2026-05-01", format: "Both" },
  { id: "AR03", title: "Pending Fee Master",              description: "All students with outstanding dues.",         category: "Pending",       lastGenerated: "2026-05-19", format: "Excel" },
  { id: "AR04", title: "Overdue Notice Generator",        description: "PDF letters for overdue students.",           category: "Pending",       lastGenerated: "2026-05-18", format: "PDF" },
  { id: "AR05", title: "Scholarship Master",              description: "Government + private scholarships ledger.",   category: "Scholarships",  lastGenerated: "2026-05-10", format: "Excel" },
  { id: "AR06", title: "Reimbursement Tracker",           description: "Awaiting government reimbursement.",          category: "Scholarships",  lastGenerated: "2026-05-12", format: "Excel" },
  { id: "AR07", title: "Expense Ledger — YTD",            description: "Category-wise expenses for the year.",        category: "Expenses",      lastGenerated: "2026-05-15", format: "Both" },
  { id: "AR08", title: "Vendor Outstanding Report",       description: "Vendors with pending payment.",               category: "Expenses",      lastGenerated: "2026-05-14", format: "Excel" },
  { id: "AR09", title: "Department Financial Summary",    description: "Revenue vs expenses by department.",          category: "Departments",   lastGenerated: "2026-05-05", format: "PDF" },
  { id: "AR10", title: "TDS / GST Compliance",            description: "Quarterly statutory filings.",                category: "Expenses",      lastGenerated: "2026-04-15", format: "PDF" },
];

const categoryIcon = {
  Collection:    Wallet,
  Pending:       AlertCircle,
  Scholarships:  HandCoins,
  Expenses:      TrendingUp,
  Departments:   Building2,
};
const categoryTint = {
  Collection:   "from-emerald-400/20 to-emerald-400/5 text-emerald-600 dark:text-emerald-300",
  Pending:      "from-destructive/20 to-destructive/5 text-destructive",
  Scholarships: "from-amber-400/20 to-amber-400/5 text-amber-600 dark:text-amber-300",
  Expenses:     "from-accent/15 to-accent/5 text-accent",
  Departments:  "from-rose-400/20 to-rose-400/5 text-rose-600 dark:text-rose-300",
};

const grouped = reports.reduce<Record<ReportTemplate["category"], ReportTemplate[]>>(
  (acc, r) => {
    (acc[r.category] = acc[r.category] || []).push(r);
    return acc;
  },
  {} as Record<ReportTemplate["category"], ReportTemplate[]>,
);

const AccountsReports = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Reports & Analytics"
      subtitle="Finance reports — PDF / Excel exports."
      icon={PieChart}
      breadcrumb={[{ label: "Accounts", to: "/portal/accounts" }, { label: "Reports" }]}
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

export default AccountsReports;
