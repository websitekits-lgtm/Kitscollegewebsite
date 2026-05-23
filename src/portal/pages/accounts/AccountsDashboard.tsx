import { Link } from "react-router-dom";
import {
  Wallet, Receipt, HandCoins, TrendingUp, Bell, Send, AlertCircle, ArrowDownToLine,
  Building2, RotateCcw, CheckCircle2, Link2,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { StatCard } from "@/portal/components/StatCard";
import { SectionCard } from "@/portal/components/SectionCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/portal/lib/auth";
import {
  transactions, scholarships, totalCollected, totalPending, totalScholarship,
  dailyTxnCount, departmentRevenue, expenses,
} from "@/portal/mock/accountsData";
import { roster } from "@/portal/mock/college";
import { feeInvoices, notifications } from "@/portal/mock/studentData";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
};

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const formatINRShort = (n: number) => {
  if (n >= 1e7) return `₹ ${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹ ${(n / 1e5).toFixed(2)} L`;
  return formatINR(n);
};

const AccountsDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Officer";

  const recentTxns = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const pendingScholarships = scholarships.filter((s) => s.status === "Pending");
  const overdueStudents = roster.filter((r) => r.feeStatus === "Overdue");
  const pendingExpenseApprovals = expenses.filter((e) => e.status === "Pending");
  const feeNotices = notifications.filter((n) => /fee|payment|scholar/i.test(n.title));

  const deptChartData = departmentRevenue.map((d) => ({
    dept: d.shortName,
    collected: Math.round(d.collected / 1e5),
    pending: Math.round(d.pending / 1e5),
  }));

  return (
    <PortalLayout>
      <PortalPageHeader
        title={`Welcome, ${firstName}`}
        subtitle="Accounts & Finance Officer"
        icon={Wallet}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>This portal <span className="font-semibold">owns</span> fee invoices, payments, scholarships and expenses — student fee status flows from here.</span>
      </div>

      {/* KPI strip — 6 across only at very wide widths to keep labels readable */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Collected" value={formatINRShort(totalCollected)} helper="Year-to-date" icon={Wallet} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Pending" value={formatINRShort(totalPending)} helper={`${feeInvoices.filter(i => i.status !== "Paid").length} invoices`} icon={AlertCircle} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Scholarships" value={formatINRShort(totalScholarship)} helper={`${scholarships.length} students`} icon={HandCoins} />
        <StatCard label="Outstanding" value={overdueStudents.length} helper="Overdue students" icon={AlertCircle} tint="from-destructive/20 to-destructive/5" />
        <StatCard label="Daily Txns" value={dailyTxnCount} helper="Today" icon={Receipt} />
        <StatCard label="Pending Approvals" value={pendingExpenseApprovals.length} helper="Expense items" tint="from-rose-400/20 to-rose-400/5" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Department revenue chart */}
        <ChartCard
          title="Department-wise Collection (₹ Lakhs)"
          description="Collected vs Pending"
          className="lg:col-span-2"
          action={{ label: "Open reports", to: "/portal/accounts/reports" }}
          height="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptChartData} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="dept" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="collected" stackId="r" fill="hsl(var(--accent))" />
              <Bar dataKey="pending" stackId="r" fill="hsl(var(--destructive) / 0.6)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Quick actions */}
        <SectionCard title="Quick Actions">
          <div className="grid grid-cols-2 gap-2">
            <QuickAction icon={Wallet} label="Collect Fee" to="/portal/accounts/payments" />
            <QuickAction icon={Receipt} label="Generate Receipt" to="/portal/accounts/payments" />
            <QuickAction icon={RotateCcw} label="Approve Refund" to="/portal/accounts/payments" />
            <QuickAction icon={ArrowDownToLine} label="Export Reports" to="/portal/accounts/reports" />
            <QuickAction icon={HandCoins} label="Scholarships" to="/portal/accounts/scholarships" />
            <QuickAction icon={TrendingUp} label="Expenses" to="/portal/accounts/expenses" />
          </div>
        </SectionCard>

        {/* Recent transactions */}
        <SectionCard
          title="Recent Transactions"
          description="Last 5"
          action={{ label: "All transactions", to: "/portal/accounts/payments" }}
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border">
            {recentTxns.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Receipt className="size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{t.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.studentName ? `${t.studentName} • ` : ""}
                    <span className="font-mono">{t.studentRoll ?? "—"}</span> • {t.mode}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold tabular-nums text-foreground">{formatINR(t.amount)}</p>
                  <Badge variant="outline" className={
                    t.status === "Successful" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : t.status === "Pending Verification" ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    : t.status === "Failed" ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : "border-border"
                  }>{t.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Student fee alerts */}
        <SectionCard
          title="Student Fee Alerts"
          description="Outstanding & overdue cases"
        >
          <ul className="space-y-2">
            {overdueStudents.slice(0, 4).map((r) => (
              <li key={r.rollNo} className="flex items-center gap-3 rounded-md border border-border p-3">
                <AlertCircle className="size-4 text-destructive shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{r.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{r.rollNo}</p>
                </div>
                <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">Overdue</Badge>
              </li>
            ))}
            {!overdueStudents.length && (
              <p className="rounded-md border border-dashed border-border bg-secondary/5 px-3 py-4 text-center text-xs text-muted-foreground">
                No overdue students 🎉
              </p>
            )}
          </ul>
        </SectionCard>

        {/* Pending approvals (expenses + scholarships) */}
        <SectionCard
          title="Pending Approvals"
          description="Expenses + scholarship claims"
          action={{ label: "Open expenses", to: "/portal/accounts/expenses" }}
          className="lg:col-span-3"
        >
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...pendingExpenseApprovals.slice(0, 3).map((e) => ({
                title: e.description,
                kind: e.category,
                amount: e.amount,
                date: e.date,
              })),
              ...pendingScholarships.slice(0, 3).map((s) => ({
                title: `${s.studentName} — ${s.scheme}`,
                kind: `Scholarship • ${s.source}`,
                amount: s.amount,
                date: s.appliedOn,
              })),
            ].map((a, i) => (
              <li key={i} className="rounded-md border border-border p-3 bg-card">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px]">{a.kind}</Badge>
                  <p className="font-semibold tabular-nums text-foreground text-sm">{formatINR(a.amount)}</p>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">{a.date}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Fee notices */}
        <SectionCard
          title="Recent Notices"
          description="Same notices students see"
          action={{ label: "All", to: "/portal/accounts/notifications" }}
          className="lg:col-span-3"
        >
          <ul className="divide-y divide-border">
            {feeNotices.slice(0, 4).map((n) => (
              <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Bell className="mt-0.5 size-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{n.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{n.body}</p>
                </div>
                <span className="text-xs tabular-nums text-foreground/70 shrink-0">{n.date}</span>
              </li>
            ))}
            {!feeNotices.length && (
              <li className="py-3 text-center text-sm text-muted-foreground">No fee-related notices.</li>
            )}
          </ul>
        </SectionCard>
      </div>
    </PortalLayout>
  );
};

const QuickAction = ({ icon: Icon, label, to }: { icon: typeof Wallet; label: string; to: string }) => (
  <Link
    to={to}
    className="group flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-secondary/5 p-3 text-center transition-all hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-0.5"
  >
    <span className="grid size-9 place-items-center rounded-md bg-accent/10 text-accent group-hover:scale-110 transition-transform">
      <Icon className="size-4" />
    </span>
    <span className="text-xs font-semibold text-foreground/85 group-hover:text-accent">{label}</span>
  </Link>
);

export const _unused = { Send, CheckCircle2, Building2 };

export default AccountsDashboard;
