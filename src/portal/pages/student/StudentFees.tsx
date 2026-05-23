import { Wallet, CheckCircle2, AlertCircle, Receipt, CreditCard, Download, HandCoins, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { feeInvoices, studentProfile, totalPendingFees, type FeeInvoice } from "@/portal/mock/studentData";
import { scholarships, type Scholarship } from "@/portal/mock/accountsData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const totalPaid = feeInvoices.filter((f) => f.status === "Paid").reduce((s, f) => s + f.amount, 0);

const pendingCols: DataTableColumn<FeeInvoice>[] = [
  { key: "id", header: "Invoice", render: (f) => <span className="font-mono text-xs">{f.id}</span> },
  { key: "desc", header: "Description", render: (f) => <span className="font-medium">{f.description}</span> },
  { key: "due", header: "Due Date", render: (f) => <span className="tabular-nums">{f.dueDate}</span>, hideOnMobile: true },
  { key: "amount", header: "Amount", render: (f) => formatINR(f.amount), align: "right" },
  {
    key: "status",
    header: "Status",
    render: (f) => (
      <Badge
        variant="outline"
        className={
          f.status === "Overdue"
            ? "border-destructive/30 bg-destructive/10 text-destructive"
            : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        }
      >
        {f.status}
      </Badge>
    ),
    align: "center",
  },
  {
    key: "pay",
    header: "",
    render: () => <Button size="sm" className="h-8 gap-1.5"><CreditCard className="size-3.5" /> Pay</Button>,
    align: "center",
  },
];

const historyCols: DataTableColumn<FeeInvoice>[] = [
  { key: "receipt", header: "Receipt", render: (f) => <span className="font-mono text-xs">{f.receiptNo}</span> },
  { key: "desc", header: "Description", render: (f) => <span className="font-medium">{f.description}</span> },
  { key: "paidOn", header: "Paid On", render: (f) => <span className="tabular-nums">{f.paidOn}</span>, hideOnMobile: true },
  { key: "amount", header: "Amount", render: (f) => formatINR(f.amount), align: "right" },
  {
    key: "action",
    header: "",
    render: () => <Button size="sm" variant="ghost" className="h-8 gap-1.5"><Download className="size-3.5" /> Receipt</Button>,
    align: "center",
  },
];

const pending = feeInvoices.filter((f) => f.status !== "Paid");
const paid = feeInvoices.filter((f) => f.status === "Paid");
const myScholarships = scholarships.filter((s) => s.studentRoll === studentProfile.rollNo);

const scholarshipCols: DataTableColumn<Scholarship>[] = [
  { key: "id", header: "ID", render: (s) => <span className="font-mono text-xs">{s.id}</span> },
  { key: "scheme", header: "Scheme", render: (s) => <span className="font-medium">{s.scheme}</span> },
  { key: "src", header: "Source", render: (s) => <Badge variant="outline" className="text-[10px]">{s.source}</Badge>, align: "center", hideOnMobile: true },
  { key: "amount", header: "Amount", render: (s) => formatINR(s.amount), align: "right" },
  { key: "applied", header: "Applied", render: (s) => <span className="tabular-nums">{s.appliedOn}</span>, align: "right", hideOnMobile: true },
  {
    key: "status", header: "Status", align: "center",
    render: (s) => (
      <Badge variant="outline" className={
        s.status === "Disbursed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : s.status === "Approved" ? "border-accent/30 bg-accent/10 text-accent"
        : s.status === "Rejected" ? "border-destructive/30 bg-destructive/10 text-destructive"
        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{s.status}</Badge>
    ),
  },
];

const StudentFees = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Fees"
      subtitle="Pay tuition, hostel and exam fees online. Download receipts anytime."
      icon={Wallet}
      breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Fees" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Invoices and receipts are managed by the
        <span className="font-semibold"> Accounts office</span>. Approved scholarships reduce your net dues automatically.
      </span>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Pending" value={formatINR(totalPendingFees)} helper={`${pending.length} invoices`} icon={AlertCircle} tint="from-amber-400/20 to-amber-400/5" />
      <StatCard label="Paid till date" value={formatINR(totalPaid)} helper="All semesters" icon={CheckCircle2} tint="from-emerald-400/20 to-emerald-400/5" />
      <StatCard label="Total invoices" value={feeInvoices.length} helper="Lifetime" icon={Receipt} />
      <StatCard label="Next due" value={pending[0]?.dueDate ?? "—"} helper={pending[0]?.description ?? "All cleared"} icon={Wallet} />
    </div>

    <div className="mt-6">
      <Tabs defaultValue="pending">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="history">Payment History ({paid.length})</TabsTrigger>
          <TabsTrigger value="scholarships">My Scholarships ({myScholarships.length})</TabsTrigger>
          <TabsTrigger value="breakup">Fee Breakup</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <SectionCard title="Pending Invoices" description="Pay before the due date to avoid late fee.">
            <DataTable
              columns={pendingCols}
              rows={pending}
              rowKey={(f) => f.id}
              emptyTitle="All fees cleared!"
              emptyDescription="You're up to date — nothing pending."
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="history">
          <SectionCard title="Payment History" description="All successful payments — receipts available for download.">
            <DataTable columns={historyCols} rows={paid} rowKey={(f) => f.id} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="scholarships">
          <SectionCard
            title="My Scholarships"
            description="Approved / disbursed by the Accounts office. Pending claims are with the Accounts office for processing."
          >
            {myScholarships.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                <HandCoins className="size-6 mx-auto text-muted-foreground" />
                <p className="mt-2 font-semibold text-foreground">No active scholarships</p>
                <p className="mt-1 text-sm text-muted-foreground">Apply through your department office.</p>
              </div>
            ) : (
              <DataTable columns={scholarshipCols} rows={myScholarships} rowKey={(s) => s.id} />
            )}
          </SectionCard>
        </TabsContent>

        <TabsContent value="breakup">
          <SectionCard title="Semester 6 — Fee Breakup" description="Detailed component-wise breakup.">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Tuition Fee", amount: 62000 },
                    { label: "Hostel Fee (10 months)", amount: 38000 },
                    { label: "University Exam Fee", amount: 4500 },
                    { label: "Library & Lab Fee", amount: 3500 },
                    { label: "Caution Deposit (refundable)", amount: 5000 },
                  ].map((r) => (
                    <tr key={r.label} className="border-b border-border last:border-0">
                      <td className="py-3 text-foreground">{r.label}</td>
                      <td className="py-3 text-right font-medium tabular-nums">{formatINR(r.amount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/5">
                    <td className="py-3 font-bold text-foreground">Total</td>
                    <td className="py-3 text-right font-display text-lg font-bold text-accent tabular-nums">
                      {formatINR(62000 + 38000 + 4500 + 3500 + 5000)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  </PortalLayout>
);

export default StudentFees;
