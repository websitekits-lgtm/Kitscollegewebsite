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

interface HodTicket {
  id: string;
  category: "Admin" | "IT" | "Infrastructure" | "Other";
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  raisedOn: string;
}

const tickets: HodTicket[] = [
  { id: "HTK-301", category: "Infrastructure", subject: "AC malfunctioning in CSE-201",       status: "In Progress", raisedOn: "2026-05-12" },
  { id: "HTK-305", category: "IT",             subject: "Bulk roster import for Sem 7 admits", status: "Open",        raisedOn: "2026-05-18" },
  { id: "HTK-308", category: "Admin",          subject: "Budget approval for FDP",             status: "Resolved",    raisedOn: "2026-05-08" },
];

const cols: DataTableColumn<HodTicket>[] = [
  { key: "id", header: "Ticket", render: (t) => <span className="font-mono text-xs">{t.id}</span> },
  { key: "subject", header: "Subject", render: (t) => <span className="font-medium">{t.subject}</span> },
  { key: "cat", header: "Category", render: (t) => <Badge variant="outline">{t.category}</Badge>, align: "center", hideOnMobile: true },
  {
    key: "status",
    header: "Status",
    render: (t) => (
      <Badge
        variant="outline"
        className={
          t.status === "Resolved"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : t.status === "In Progress"
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        }
      >
        {t.status}
      </Badge>
    ),
    align: "center",
  },
  { key: "date", header: "Raised", render: (t) => <span className="tabular-nums">{t.raisedOn}</span>, align: "right", hideOnMobile: true },
];

const HodSupport = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Support"
      subtitle="Admin / IT / infrastructure escalations from the department."
      icon={HelpCircle}
      breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Support" }]}
      actions={<RaiseTicketDialog />}
    />
    <div className="grid gap-6 lg:grid-cols-3">
      <SectionCard title="My Tickets" className="lg:col-span-2">
        <DataTable columns={cols} rows={tickets} rowKey={(t) => t.id} />
      </SectionCard>
      <SectionCard title="Escalations">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <Mail className="size-4 text-accent" />
            <div><p className="text-xs text-muted-foreground">Principal's office</p><p className="text-sm font-medium text-foreground">principal@kits-anna.com</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <Phone className="size-4 text-accent" />
            <div><p className="text-xs text-muted-foreground">Admin officer</p><p className="text-sm font-medium text-foreground tabular-nums">+91 9153019999</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <MessageSquare className="size-4 text-accent" />
            <div><p className="text-xs text-muted-foreground">IT services</p><p className="text-sm font-medium text-foreground">Mon–Sat • 8 AM – 8 PM</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <BookOpen className="size-4 text-accent" />
            <div><p className="text-xs text-muted-foreground">HOD handbook</p><p className="text-sm font-medium text-foreground">Policies & SOPs</p></div>
          </li>
        </ul>
      </SectionCard>
    </div>
  </PortalLayout>
);

const RaiseTicketDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2"><Plus className="size-4" /> Raise Ticket</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Support Ticket</DialogTitle>
          <DialogDescription>Routed to the admin office and IT services.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select defaultValue="admin">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="infra">Infrastructure</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subj">Subject</Label>
            <Input id="subj" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" rows={3} className="mt-1.5" />
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

export default HodSupport;
