import { useState } from "react";
import { Receipt, Download, Check, X, RotateCcw, Link2, Search, Plus, CreditCard } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { transactions, type Transaction } from "@/portal/mock/accountsData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const txnCols: DataTableColumn<Transaction>[] = [
  { key: "id", header: "Txn ID", render: (t) => <span className="font-mono text-xs">{t.id}</span> },
  { key: "date", header: "Date", render: (t) => <span className="tabular-nums">{t.date}</span> },
  { key: "name", header: "Student", render: (t) => <><span className="font-medium">{t.studentName ?? "—"}</span>{t.studentRoll && <p className="text-[10px] font-mono text-muted-foreground">{t.studentRoll}</p>}</> },
  { key: "desc", header: "Description", render: (t) => t.description, hideOnMobile: true },
  { key: "mode", header: "Mode", render: (t) => <Badge variant="outline" className="text-[10px]">{t.mode}</Badge>, align: "center" },
  { key: "amount", header: "Amount", render: (t) => formatINR(t.amount), align: "right" },
  {
    key: "status", header: "Status", align: "center",
    render: (t) => (
      <Badge variant="outline" className={
        t.status === "Successful" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : t.status === "Pending Verification" ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : t.status === "Failed" ? "border-destructive/30 bg-destructive/10 text-destructive"
        : "border-border"
      }>{t.status}</Badge>
    ),
  },
  {
    key: "actions", header: "", align: "center",
    render: (t) =>
      t.status === "Successful" && t.receiptNo
        ? <Button size="sm" variant="ghost" className="h-8 gap-1.5"><Download className="size-3.5" /> Receipt</Button>
        : t.status === "Pending Verification"
          ? <div className="flex gap-1 justify-center">
              <Button size="sm" className="h-7 gap-1"><Check className="size-3.5" /> Verify</Button>
              <Button size="sm" variant="outline" className="h-7 gap-1"><X className="size-3.5" /> Reject</Button>
            </div>
          : null,
  },
];

const AccountsPayments = () => {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) =>
    !search ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    t.studentRoll?.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const online = filtered.filter((t) => t.mode === "Online" || t.mode === "UPI");
  const offline = filtered.filter((t) => t.mode === "Cash" || t.mode === "DD" || t.mode === "Cheque");
  const pending = filtered.filter((t) => t.status === "Pending Verification");
  const refunds = filtered.filter((t) => t.type === "Refund");

  const totalAmt = transactions.filter((t) => t.status === "Successful" && t.type !== "Refund").reduce((s, t) => s + t.amount, 0);
  const refundAmt = transactions.filter((t) => t.type === "Refund" && t.status === "Successful").reduce((s, t) => s + t.amount, 0);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Payment Management"
        subtitle="Online + offline transactions, verifications, refunds and receipts."
        icon={Receipt}
        breadcrumb={[{ label: "Accounts", to: "/portal/accounts" }, { label: "Payments" }]}
        actions={<CollectFeeDialog />}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Receipts generated here are downloadable from <span className="font-semibold">Student → Fees → Payment History</span>.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Transactions" value={transactions.length} icon={Receipt} />
        <StatCard label="Total Collected" value={formatINR(totalAmt)} helper="Successful only" tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Awaiting verify" value={pending.length} helper="Cheque / DD" tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Refunds issued" value={formatINR(refundAmt)} icon={RotateCcw} />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-secondary/5 px-3">
          <Search className="size-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by txn id / student / description…" className="border-0 h-10 px-0 focus-visible:ring-0" />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
            <TabsTrigger value="pending">Pending Verify ({pending.length})</TabsTrigger>
            <TabsTrigger value="refunds">Refunds ({refunds.length})</TabsTrigger>
          </TabsList>

          {[
            { v: "all", rows: filtered },
            { v: "online", rows: online },
            { v: "offline", rows: offline },
            { v: "pending", rows: pending },
            { v: "refunds", rows: refunds },
          ].map(({ v, rows }) => (
            <TabsContent key={v} value={v}>
              <SectionCard title="Transactions">
                <DataTable columns={txnCols} rows={rows} rowKey={(t) => t.id} emptyTitle="No transactions" />
              </SectionCard>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PortalLayout>
  );
};

const CollectFeeDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Collect Fee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Fee Collection</DialogTitle>
          <DialogDescription>Generates a receipt that appears in the student's Fee history.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="r">Student Roll No</Label>
            <Input id="r" className="mt-1.5" placeholder="22B81A05XX" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Type</Label>
              <Select defaultValue="tuition">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuition">Tuition</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="fine">Fine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Mode</Label>
              <Select defaultValue="upi">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="dd">DD</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="a">Amount</Label>
            <Input id="a" type="number" className="mt-1.5" placeholder="0" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} className="gap-2"><CreditCard className="size-4" /> Collect & Receipt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountsPayments;
