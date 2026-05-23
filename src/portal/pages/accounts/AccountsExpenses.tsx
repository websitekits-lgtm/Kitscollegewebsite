import { TrendingUp, Users, Building2, Hammer, Truck, Check, X, Plus } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { expenses, vendors, totalExpenses, type Expense, type Vendor } from "@/portal/mock/accountsData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const formatINRShort = (n: number) => {
  if (n >= 1e7) return `₹ ${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹ ${(n / 1e5).toFixed(2)} L`;
  return formatINR(n);
};

const expenseCols: DataTableColumn<Expense>[] = [
  { key: "id", header: "ID", render: (e) => <span className="font-mono text-xs">{e.id}</span> },
  { key: "cat", header: "Category", render: (e) => <Badge variant="outline">{e.category}</Badge>, align: "center" },
  { key: "desc", header: "Description", render: (e) => <span className="font-medium">{e.description}</span> },
  { key: "date", header: "Date", render: (e) => <span className="tabular-nums">{e.date}</span>, align: "right", hideOnMobile: true },
  { key: "amount", header: "Amount", render: (e) => formatINR(e.amount), align: "right" },
  {
    key: "status", header: "Status", align: "center",
    render: (e) =>
      <Badge variant="outline" className={
        e.status === "Paid" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : e.status === "Approved" ? "border-accent/30 bg-accent/10 text-accent"
        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{e.status}</Badge>,
  },
  {
    key: "actions", header: "", align: "center",
    render: (e) =>
      e.status === "Pending"
        ? <div className="flex gap-1 justify-center">
            <Button size="sm" className="h-7 gap-1"><Check className="size-3.5" /> Approve</Button>
            <Button size="sm" variant="outline" className="h-7 gap-1"><X className="size-3.5" /> Reject</Button>
          </div>
        : e.status === "Approved"
          ? <Button size="sm" className="h-7">Mark Paid</Button>
          : null,
  },
];

const vendorCols: DataTableColumn<Vendor>[] = [
  { key: "id", header: "ID", render: (v) => <span className="font-mono text-xs">{v.id}</span> },
  { key: "name", header: "Vendor", render: (v) => <span className="font-medium">{v.name}</span> },
  { key: "cat", header: "Category", render: (v) => v.category, hideOnMobile: true },
  { key: "contact", header: "Contact", render: (v) => <span className="text-xs">{v.contact}</span>, hideOnMobile: true },
  { key: "billed", header: "Billed", render: (v) => formatINR(v.totalBilled), align: "right" },
  { key: "paid", header: "Paid", render: (v) => formatINR(v.totalPaid), align: "right" },
  {
    key: "outstanding", header: "Outstanding", align: "right",
    render: (v) => {
      const o = v.totalBilled - v.totalPaid;
      return <span className={o > 0 ? "font-semibold text-amber-600 dark:text-amber-300 tabular-nums" : "tabular-nums text-muted-foreground"}>{formatINR(o)}</span>;
    },
  },
];

const AccountsExpenses = () => {
  const salaries = expenses.filter((e) => e.category === "Salaries");
  const deptExp = expenses.filter((e) => e.category === "Department");
  const infra = expenses.filter((e) => e.category === "Infrastructure");
  const maint = expenses.filter((e) => e.category === "Maintenance");
  const vend = expenses.filter((e) => e.category === "Vendor");

  const byCategory = [
    { name: "Salaries",       value: salaries.reduce((s, e) => s + e.amount, 0), color: "hsl(var(--accent))" },
    { name: "Department",     value: deptExp.reduce((s, e) => s + e.amount, 0),  color: "hsl(135 60% 60%)" },
    { name: "Infrastructure", value: infra.reduce((s, e) => s + e.amount, 0),    color: "hsl(var(--secondary))" },
    { name: "Maintenance",    value: maint.reduce((s, e) => s + e.amount, 0),    color: "hsl(28 80% 60%)" },
    { name: "Vendor",         value: vend.reduce((s, e) => s + e.amount, 0),     color: "hsl(var(--destructive))" },
  ];

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Expense Management"
        subtitle="Salaries, department spend, infrastructure, maintenance and vendor payments."
        icon={TrendingUp}
        breadcrumb={[{ label: "Accounts", to: "/portal/accounts" }, { label: "Expenses" }]}
        actions={<NewExpenseDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Expenses" value={formatINRShort(totalExpenses)} helper="Year-to-date" icon={TrendingUp} />
        <StatCard label="Salaries paid" value={formatINRShort(byCategory[0].value)} icon={Users} tint="from-accent/15 to-accent/5" />
        <StatCard label="Department" value={formatINRShort(byCategory[1].value)} icon={Building2} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Vendor outstanding" value={formatINR(vendors.reduce((s, v) => s + (v.totalBilled - v.totalPaid), 0))} icon={Truck} tint="from-amber-400/20 to-amber-400/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="all">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="all">All ({expenses.length})</TabsTrigger>
            <TabsTrigger value="salaries">Staff Salaries</TabsTrigger>
            <TabsTrigger value="dept">Department</TabsTrigger>
            <TabsTrigger value="infra">Infrastructure</TabsTrigger>
            <TabsTrigger value="maint">Maintenance</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="chart">Breakup</TabsTrigger>
          </TabsList>

          {[
            { v: "all", rows: expenses, title: "All Expenses" },
            { v: "salaries", rows: salaries, title: "Staff Salaries" },
            { v: "dept", rows: deptExp, title: "Department Expenses" },
            { v: "infra", rows: infra, title: "Infrastructure" },
            { v: "maint", rows: maint, title: "Maintenance" },
          ].map(({ v, rows, title }) => (
            <TabsContent key={v} value={v}>
              <SectionCard title={title}>
                <DataTable columns={expenseCols} rows={rows} rowKey={(e) => e.id} />
              </SectionCard>
            </TabsContent>
          ))}

          <TabsContent value="vendors">
            <SectionCard title="Vendor Master" description="Total billed vs paid per vendor.">
              <DataTable columns={vendorCols} rows={vendors} rowKey={(v) => v.id} />
              <div className="mt-4">
                <SectionCard title="Vendor expense entries">
                  <DataTable columns={expenseCols} rows={vend} rowKey={(e) => e.id} />
                </SectionCard>
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="chart">
            <ChartCard title="Expense Breakup by Category" description="Year-to-date" height="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                    {byCategory.map((b) => <Cell key={b.name} fill={b.color} />)}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatINRShort(value)}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <KpiBox label="Largest single expense" value={formatINR(Math.max(...expenses.map(e => e.amount)))} />
        <KpiBox label="Pending approvals" value={String(expenses.filter(e => e.status === "Pending").length)} />
        <KpiBox label="Active vendors" value={String(vendors.length)} />
      </div>

      <p className="mt-6 text-xs text-muted-foreground inline-flex items-center gap-1.5">
        <Hammer className="size-3.5 text-accent" />
        Approved infrastructure budget releases require Principal sign-off — see <a className="underline" href="/portal/principal/approvals">Principal → Approvals</a>.
      </p>
    </PortalLayout>
  );
};

const KpiBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md border border-border p-3 bg-secondary/5">
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="font-display text-xl font-bold mt-1 tabular-nums">{value}</p>
  </div>
);

const NewExpenseDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2"><Plus className="size-4" /> New Expense</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record New Expense</DialogTitle>
          <DialogDescription>If amount &gt; ₹3 L, principal approval is required.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select defaultValue="department">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="salaries">Salaries</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="infra">Infrastructure</SelectItem>
                <SelectItem value="maint">Maintenance</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="d">Description</Label><Textarea id="d" rows={2} className="mt-1.5" /></div>
          <div><Label htmlFor="a">Amount</Label><Input id="a" type="number" className="mt-1.5" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountsExpenses;
