import { useState } from "react";
import { HelpCircle, Plus, Mail, Phone, MessageSquare, BookOpen } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Ticket { id: string; category: "IT" | "JNTUA" | "Process" | "Other"; subject: string; status: "Open" | "In Progress" | "Resolved"; raisedOn: string; }

const tickets: Ticket[] = [
  { id: "ETK-501", category: "IT",     subject: "Bulk grade-sheet generator timing out",           status: "In Progress", raisedOn: "2026-05-18" },
  { id: "ETK-505", category: "JNTUA",  subject: "External evaluator allocation for revaluation",   status: "Open",        raisedOn: "2026-05-19" },
  { id: "ETK-510", category: "Process",subject: "Hall ticket photo upload failing for 14 students",status: "Resolved",    raisedOn: "2026-05-10" },
];

const cols: DataTableColumn<Ticket>[] = [
  { key: "id", header: "Ticket", render: (t) => <span className="font-mono text-xs">{t.id}</span> },
  { key: "subject", header: "Subject", render: (t) => <span className="font-medium">{t.subject}</span> },
  { key: "cat", header: "Category", render: (t) => <Badge variant="outline">{t.category}</Badge>, align: "center", hideOnMobile: true },
  {
    key: "status", header: "Status", align: "center",
    render: (t) => <Badge variant="outline" className={
      t.status === "Resolved" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : t.status === "In Progress" ? "border-accent/30 bg-accent/10 text-accent"
      : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
    }>{t.status}</Badge>,
  },
  { key: "date", header: "Raised", render: (t) => <span className="tabular-nums">{t.raisedOn}</span>, align: "right", hideOnMobile: true },
];

const ExamSupport = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Support"
      subtitle="IT / JNTUA process tickets."
      icon={HelpCircle}
      breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Support" }]}
      actions={<TicketDialog />}
    />
    <div className="grid gap-6 lg:grid-cols-3">
      <SectionCard title="My Tickets" className="lg:col-span-2">
        <DataTable columns={cols} rows={tickets} rowKey={(t) => t.id} />
      </SectionCard>
      <SectionCard title="Help-Desk">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><Mail className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">JNTUA exam section</p><p className="text-sm font-medium text-foreground">exams.coe@jntua.ac.in</p></div></li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><Phone className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">IT support</p><p className="text-sm font-medium text-foreground tabular-nums">+91 9153019999</p></div></li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><MessageSquare className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">Live chat</p><p className="text-sm font-medium text-foreground">Mon–Sat • 9 AM – 6 PM</p></div></li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><BookOpen className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">Process manual</p><p className="text-sm font-medium text-foreground">CoE handbook</p></div></li>
        </ul>
      </SectionCard>
    </div>
  </PortalLayout>
);

const TicketDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2"><Plus className="size-4" /> Raise Ticket</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Support Ticket</DialogTitle>
          <DialogDescription>Routed to IT / Process owner.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select defaultValue="it">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="jntua">JNTUA</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="s">Subject</Label><Input id="s" className="mt-1.5" /></div>
          <div><Label htmlFor="d">Description</Label><Textarea id="d" rows={3} className="mt-1.5" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamSupport;
