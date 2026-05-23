import { Wallet, CheckCircle2, AlertCircle, Receipt, CreditCard, Download, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { feeInvoices, totalPendingFees, type FeeInvoice } from "@/portal/mock/studentData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const totalPaid = feeInvoices.filter((f) => f.status === "Paid").reduce((s, f) => s + f.amount, 0);

const pendingCols: DataTableColumn<FeeInvoice>[] = [
  { key: "id", header: "Invoice", render: (f) => <span className="font-mono text-xs">{f.id}</span> },
  { key: "desc", header: "Description", render: (f) => <span className="font-medium">{f.description}</span> },
  { key: "due", header: "Due Date", render: (f) => <span className="tabular-nums">{f.dueDate}</span>, hideOnMobile: true },
  { key: "amount", header: "Amount", render: (f) => formatINR(f.amount), align: "right" },
  {
    key: "status", header: "Status", align: "center",
    render: (f) => (
      <Badge variant="outline" className={
        f.status === "Overdue"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{f.status}</Badge>
    ),
  },
  {
    key: "pay", header: "", align: "center",
    render: () => <Button size="sm" className="h-8 gap-1.5"><CreditCard className="size-3.5" /> Pay</Button>,
  },
];

const historyCols: DataTableColumn<FeeInvoice>[] = [
  { key: "receipt", header: "Receipt", render: (f) => <span className="font-mono text-xs">{f.receiptNo}</span> },
  { key: "desc", header: "Description", render: (f) => <span className="font-medium">{f.description}</span> },
  { key: "paidOn", header: "Paid On", render: (f) => <span className="tabular-nums">{f.paidOn}</span>, hideOnMobile: true },
  { key: "amount", header: "Amount", render: (f) => formatINR(f.amount), align: "right" },
  {
    key: "action", header: "", align: "center",
    render: () => <Button size="sm" variant="ghost" className="h-8 gap-1.5"><Download className="size-3.5" /> Receipt</Button>,
  },
];

const pending = feeInvoices.filter((f) => f.status !== "Paid");
const paid = feeInvoices.filter((f) => f.status === "Paid");

const ParentFees = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Fees"
      subtitle="View your ward's pending dues and payment history."
      icon={Wallet}
      breadcrumb={[{ label: "Parent Portal", to: "/portal/parent" }, { label: "Fees" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>Invoices and receipts are owned by the Accounts office — the same records visible in your ward's portal.</span>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Pending" value={formatINR(totalPendingFees)} helper={`${pending.length} invoices`} icon={AlertCircle} tint="from-amber-400/20 to-amber-400/5" />
      <StatCard label="Paid till date" value={formatINR(totalPaid)} helper="All semesters" icon={CheckCircle2} tint="from-emerald-400/20 to-emerald-400/5" />
      <StatCard label="Total invoices" value={feeInvoices.length} helper="Lifetime" icon={Receipt} />
      <StatCard label="Next due" value={pending[0]?.dueDate ?? "—"} helper={pending[0]?.description ?? "All cleared"} icon={Wallet} />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="pending">
        <TabsList className="bg-secondary/10 mb-5">
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="history">Payment History ({paid.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <SectionCard title="Pending Invoices" description="Pay before the due date to avoid late fee.">
            <DataTable columns={pendingCols} rows={pending} rowKey={(f) => f.id} emptyTitle="All fees cleared!" />
          </SectionCard>
        </TabsContent>

        <TabsContent value="history">
          <SectionCard title="Payment History" description="All successful payments — receipts available for download.">
            <DataTable columns={historyCols} rows={paid} rowKey={(f) => f.id} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

export default ParentFees;
