import { useState } from "react";
import { Wallet, Search, Link2, AlertCircle, Bus, Building2, ClipboardCheck, Receipt, BadgePercent } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roster, type RosterStudent } from "@/portal/mock/college";
import { feeInvoices, type FeeInvoice } from "@/portal/mock/studentData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const profileCols: DataTableColumn<RosterStudent>[] = [
  { key: "roll", header: "Roll", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Student", render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "dept", header: "Dept", render: (r) => r.department, align: "center", hideOnMobile: true },
  {
    key: "fee", header: "Fee Status", align: "center",
    render: (r) => (
      <Badge variant="outline" className={
        r.feeStatus === "Paid"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : r.feeStatus === "Pending"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : "border-destructive/30 bg-destructive/10 text-destructive"
      }>{r.feeStatus}</Badge>
    ),
  },
  {
    key: "actions", header: "", align: "center",
    render: (r) => r.feeStatus === "Paid"
      ? <Button size="sm" variant="ghost" className="h-8">Statement</Button>
      : <Button size="sm" className="h-8">Collect</Button>,
  },
];

const invoiceCols: DataTableColumn<FeeInvoice>[] = [
  { key: "id", header: "Invoice", render: (f) => <span className="font-mono text-xs">{f.id}</span> },
  { key: "desc", header: "Description", render: (f) => <span className="font-medium">{f.description}</span> },
  { key: "due", header: "Due", render: (f) => <span className="tabular-nums">{f.dueDate}</span>, hideOnMobile: true },
  { key: "amount", header: "Amount", render: (f) => formatINR(f.amount), align: "right" },
  {
    key: "status", header: "Status", align: "center",
    render: (f) => (
      <Badge variant="outline" className={
        f.status === "Paid"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : f.status === "Pending"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : "border-destructive/30 bg-destructive/10 text-destructive"
      }>{f.status}</Badge>
    ),
  },
];

interface Fine { id: string; rollNo: string; reason: string; amount: number; status: "Pending" | "Paid"; raisedOn: string; }
const fines: Fine[] = [
  { id: "F-101", rollNo: "22B81A0506", reason: "Library — overdue book (12 days)", amount:  350, status: "Pending", raisedOn: "2026-05-15" },
  { id: "F-102", rollNo: "22B81A0516", reason: "Lab — equipment damage",             amount: 1200, status: "Pending", raisedOn: "2026-05-12" },
  { id: "F-103", rollNo: "22B81A0510", reason: "Hostel — late return curfew",        amount:  500, status: "Paid",    raisedOn: "2026-05-08" },
];

interface Concession { id: string; rollNo: string; type: "Merit" | "Sibling" | "Staff Ward" | "Sports"; amount: number; status: "Approved" | "Pending"; }
const concessions: Concession[] = [
  { id: "C-201", rollNo: "22B81A0505", type: "Merit",      amount: 15000, status: "Approved" },
  { id: "C-202", rollNo: "22B81A0509", type: "Sports",     amount: 10000, status: "Approved" },
  { id: "C-203", rollNo: "22B81A0519", type: "Sibling",    amount:  8000, status: "Pending"  },
];

const AccountsFees = () => {
  const [search, setSearch] = useState("");
  const filtered = roster.filter((r) =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const tuition = feeInvoices.filter((f) => /tuition/i.test(f.description));
  const hostel = feeInvoices.filter((f) => /hostel/i.test(f.description));
  const exam = feeInvoices.filter((f) => /exam/i.test(f.description));
  const pending = feeInvoices.filter((f) => f.status !== "Paid");

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Student Fee Management"
        subtitle="Profiles, tuition, hostel, bus, exam, fines and concessions."
        icon={Wallet}
        breadcrumb={[{ label: "Accounts", to: "/portal/accounts" }, { label: "Student Fees" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Reads the shared <span className="font-semibold">roster</span>. Status changes here update the student's Fees page.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Roster" value={roster.length} icon={Receipt} />
        <StatCard label="Paid" value={roster.filter((r) => r.feeStatus === "Paid").length} icon={Wallet} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Pending" value={roster.filter((r) => r.feeStatus === "Pending").length} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Overdue" value={roster.filter((r) => r.feeStatus === "Overdue").length} icon={AlertCircle} tint="from-destructive/20 to-destructive/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="profiles">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="tuition">Tuition</TabsTrigger>
            <TabsTrigger value="hostel">Hostel</TabsTrigger>
            <TabsTrigger value="bus">Bus</TabsTrigger>
            <TabsTrigger value="exam">Exam</TabsTrigger>
            <TabsTrigger value="dues">Pending Dues</TabsTrigger>
            <TabsTrigger value="fines">Fines</TabsTrigger>
            <TabsTrigger value="conc">Concessions</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles">
            <SectionCard title="Student Fee Profiles" description={`${filtered.length} students`}>
              <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-secondary/5 px-3">
                <Search className="size-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or roll no…" className="border-0 h-10 px-0 focus-visible:ring-0" />
              </div>
              <DataTable columns={profileCols} rows={filtered} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="tuition">
            <SectionCard title="Tuition Fee Records" description="Currently published invoices.">
              <DataTable columns={invoiceCols} rows={tuition} rowKey={(f) => f.id} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="hostel">
            <SectionCard title="Hostel Fee Records">
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="size-3.5" /> Boys: 248 inmates • Girls: 196 inmates
              </div>
              <DataTable columns={invoiceCols} rows={hostel} rowKey={(f) => f.id} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="bus">
            <SectionCard title="Bus Fee">
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Bus className="size-3.5" /> 12 routes • 480 students opted
              </div>
              <p className="rounded-md border border-dashed border-border bg-secondary/5 p-6 text-center text-sm text-muted-foreground">
                Bus fee for Sem 6 collected with tuition — separate invoice line item.
              </p>
            </SectionCard>
          </TabsContent>

          <TabsContent value="exam">
            <SectionCard title="Exam Fee Records">
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <ClipboardCheck className="size-3.5" /> Owned by Exam Cell • collected here
              </div>
              <DataTable columns={invoiceCols} rows={exam} rowKey={(f) => f.id} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="dues">
            <SectionCard title="Pending Dues">
              <DataTable columns={invoiceCols} rows={pending} rowKey={(f) => f.id} emptyTitle="All dues cleared!" />
            </SectionCard>
          </TabsContent>

          <TabsContent value="fines">
            <SectionCard title="Fine Management">
              <DataTable
                columns={[
                  { key: "id", header: "ID", render: (f) => <span className="font-mono text-xs">{f.id}</span> },
                  { key: "roll", header: "Roll", render: (f) => <span className="font-mono text-xs">{f.rollNo}</span> },
                  { key: "reason", header: "Reason", render: (f) => f.reason },
                  { key: "amount", header: "Amount", render: (f) => formatINR(f.amount), align: "right" },
                  {
                    key: "status", header: "Status", align: "center",
                    render: (f) =>
                      f.status === "Paid"
                        ? <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">Paid</Badge>
                        : <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">Pending</Badge>,
                  },
                ]}
                rows={fines}
                rowKey={(f) => f.id}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="conc">
            <SectionCard title="Fee Concessions" description="Merit / sibling / staff-ward / sports concessions.">
              <DataTable
                columns={[
                  { key: "id", header: "ID", render: (c) => <span className="font-mono text-xs">{c.id}</span> },
                  { key: "roll", header: "Roll", render: (c) => <span className="font-mono text-xs">{c.rollNo}</span> },
                  { key: "type", header: "Type", render: (c) => <Badge variant="outline"><BadgePercent className="size-3 mr-1" /> {c.type}</Badge>, align: "center" },
                  { key: "amount", header: "Amount", render: (c) => formatINR(c.amount), align: "right" },
                  {
                    key: "status", header: "Status", align: "center",
                    render: (c) =>
                      c.status === "Approved"
                        ? <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">Approved</Badge>
                        : <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">Pending</Badge>,
                  },
                ]}
                rows={concessions}
                rowKey={(c) => c.id}
              />
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default AccountsFees;
