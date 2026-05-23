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

interface Ticket { id: string; category: "IT" | "Admin" | "Vendor" | "Other"; subject: string; status: "Open" | "In Progress" | "Resolved"; raisedOn: string; }

const tickets: Ticket[] = [
  { id: "PTK-401", category: "IT",     subject: "ERP downtime on 18-May",       status: "Resolved",    raisedOn: "2026-05-18" },
  { id: "PTK-405", category: "Vendor", subject: "Library subscription renewal", status: "In Progress", raisedOn: "2026-05-19" },
  { id: "PTK-410", category: "Admin",  subject: "Governing-body meeting room",  status: "Open",        raisedOn: "2026-05-20" },
];

const cols: DataTableColumn<Ticket>[] = [
  { key: "id", header: "Ticket", render: (t) => <span className="font-mono text-xs">{t.id}</span> },
  { key: "subject", header: "Subject", render: (t) => <span className="font-medium">{t.subject}</span> },
  { key: "cat", header: "Category", render: (t) => <Badge variant="outline">{t.category}</Badge>, align: "center", hideOnMobile: true },
  {
    key: "status", header: "Status", align: "center",
    render: (t) => <Badge variant="outline" className={
      t.status === "Resolved"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : t.status === "In Progress"
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
    }>{t.status}</Badge>,
  },
  { key: "date", header: "Raised", render: (t) => <span className="tabular-nums">{t.raisedOn}</span>, align: "right", hideOnMobile: true },
];

const PrincipalSupport = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Support"
      subtitle="Administrative and vendor escalations."
      icon={HelpCircle}
      breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Support" }]}
      actions={<TicketDialog />}
    />
    <div className="grid gap-6 lg:grid-cols-3">
      <SectionCard title="My Tickets" className="lg:col-span-2">
        <DataTable columns={cols} rows={tickets} rowKey={(t) => t.id} />
      </SectionCard>
      <SectionCard title="Escalations">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><Mail className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">Governing body</p><p className="text-sm font-medium text-foreground">chairman@kits-anna.com</p></div></li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><Phone className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">Secretary</p><p className="text-sm font-medium text-foreground tabular-nums">+91 96663 01309</p></div></li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><MessageSquare className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">IT services</p><p className="text-sm font-medium text-foreground">Mon–Sat • 8 AM – 8 PM</p></div></li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3"><BookOpen className="size-4 text-accent" /><div><p className="text-xs text-muted-foreground">Policies</p><p className="text-sm font-medium text-foreground">Administrative manual</p></div></li>
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
          <DialogDescription>Sent to the office of the principal's admin team.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select defaultValue="it">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
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

export default PrincipalSupport;
