import { useState } from "react";
import { HandCoins, Check, X, Link2, Plus, Send } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { scholarships, type Scholarship } from "@/portal/mock/accountsData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const cols: DataTableColumn<Scholarship>[] = [
  { key: "id", header: "ID", render: (s) => <span className="font-mono text-xs">{s.id}</span> },
  { key: "roll", header: "Roll", render: (s) => <span className="font-mono text-xs">{s.studentRoll}</span> },
  { key: "name", header: "Student", render: (s) => <span className="font-medium">{s.studentName}</span>, hideOnMobile: true },
  { key: "scheme", header: "Scheme", render: (s) => s.scheme },
  { key: "src", header: "Source", render: (s) => <Badge variant="outline" className="text-[10px]">{s.source}</Badge>, align: "center", hideOnMobile: true },
  { key: "amount", header: "Amount", render: (s) => formatINR(s.amount), align: "right" },
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
  {
    key: "actions", header: "Action", align: "center",
    render: (s) =>
      s.status === "Pending"
        ? <div className="flex gap-1 justify-center">
            <Button size="sm" className="h-7 gap-1"><Check className="size-3.5" /> Approve</Button>
            <Button size="sm" variant="outline" className="h-7 gap-1"><X className="size-3.5" /> Reject</Button>
          </div>
        : s.status === "Approved"
          ? <Button size="sm" className="h-7 gap-1"><Send className="size-3.5" /> Disburse</Button>
          : null,
  },
];

const AccountsScholarships = () => {
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});

  const govt = scholarships.filter((s) => s.source === "Government");
  const priv = scholarships.filter((s) => s.source === "Private");
  const inst = scholarships.filter((s) => s.source === "Institute");
  const pending = scholarships.filter((s) => s.status === "Pending");
  const approved = scholarships.filter((s) => s.status === "Approved");
  const disbursed = scholarships.filter((s) => s.status === "Disbursed");

  const totalAmt = scholarships.reduce((s, x) => s + x.amount, 0);
  const disbursedAmt = disbursed.reduce((s, x) => s + x.amount, 0);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Scholarship Management"
        subtitle="Government, private and institute scholarships — track approvals and reimbursement."
        icon={HandCoins}
        breadcrumb={[{ label: "Accounts", to: "/portal/accounts" }, { label: "Scholarships" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Approvals here adjust the student's net fee due — once a scholarship is disbursed it appears in their payment history.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Applications" value={scholarships.length} icon={HandCoins} />
        <StatCard label="Approved" value={approved.length + disbursed.length} helper="Disbursed: " icon={Check} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Pending" value={pending.length} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Amount disbursed" value={formatINR(disbursedAmt)} helper={`of ${formatINR(totalAmt)}`} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="all">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="all">All ({scholarships.length})</TabsTrigger>
            <TabsTrigger value="govt">Government ({govt.length})</TabsTrigger>
            <TabsTrigger value="priv">Private ({priv.length})</TabsTrigger>
            <TabsTrigger value="inst">Institute ({inst.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Claims ({pending.length})</TabsTrigger>
            <TabsTrigger value="reimb">Reimbursement</TabsTrigger>
          </TabsList>

          {[
            { v: "all",  rows: scholarships },
            { v: "govt", rows: govt },
            { v: "priv", rows: priv },
            { v: "inst", rows: inst },
            { v: "pending", rows: pending },
            { v: "reimb", rows: disbursed },
          ].map(({ v, rows }) => (
            <TabsContent key={v} value={v}>
              <SectionCard
                title={v === "reimb" ? "Reimbursement Status" : "Scholarships"}
                description={v === "pending" ? "Awaiting your decision." : v === "reimb" ? "Disbursed to students." : undefined}
                action={v === "pending" ? { label: "Approve all", onClick: () => alert("Bulk-approve not enabled in demo.") } : undefined}
              >
                <DataTable columns={cols} rows={rows} rowKey={(s) => s.id} />
              </SectionCard>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* keep decisions state used */}
      <button hidden onClick={() => setDecisions(decisions)}>noop</button>

      {/* Helper button — Add Application (not in workflow but useful) */}
      <div className="mt-6">
        <NewScholarshipDialog />
      </div>
    </PortalLayout>
  );
};

const NewScholarshipDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2"><Plus className="size-4" /> Record New Application</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Scholarship Application</DialogTitle>
          <DialogDescription>Adds an entry to the queue for approval / disbursement.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="rs">Student Roll No</Label>
            <Input id="rs" className="mt-1.5" placeholder="22B81A05XX" />
          </div>
          <div>
            <Label htmlFor="sc">Scheme</Label>
            <Input id="sc" className="mt-1.5" placeholder="e.g. AP EAMCET Fee Reimbursement" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Source</Label>
              <Select defaultValue="government">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="institute">Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="am">Amount</Label>
              <Input id="am" type="number" className="mt-1.5" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountsScholarships;
