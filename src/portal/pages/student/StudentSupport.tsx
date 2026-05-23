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
import { supportTickets, type SupportTicket } from "@/portal/mock/studentData";

const ticketCols: DataTableColumn<SupportTicket>[] = [
  { key: "id", header: "Ticket", render: (t) => <span className="font-mono text-xs">{t.id}</span> },
  { key: "subject", header: "Subject", render: (t) => <span className="font-medium">{t.subject}</span> },
  { key: "category", header: "Category", render: (t) => <Badge variant="outline">{t.category}</Badge>, align: "center", hideOnMobile: true },
  {
    key: "status",
    header: "Status",
    render: (t) => (
      <Badge
        variant="outline"
        className={
          t.status === "Resolved" || t.status === "Closed"
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
  { key: "updated", header: "Last Update", render: (t) => <span className="tabular-nums">{t.lastUpdate}</span>, align: "right", hideOnMobile: true },
];

const StudentSupport = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Support"
      subtitle="Raise tickets, contact help-desk and track your requests."
      icon={HelpCircle}
      breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Support" }]}
      actions={<RaiseTicketDialog />}
    />

    <div className="grid gap-6 lg:grid-cols-3">
      <SectionCard title="My Tickets" description="All requests you've raised." className="lg:col-span-2">
        <DataTable columns={ticketCols} rows={supportTickets} rowKey={(t) => t.id} />
      </SectionCard>

      <SectionCard title="Contact Help-Desk" description="Reach out directly for urgent issues.">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <Mail className="size-4 text-accent" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground truncate">helpdesk@kits-anna.com</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <Phone className="size-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Help-desk phone</p>
              <p className="text-sm font-medium text-foreground tabular-nums">+91 9153019999</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <MessageSquare className="size-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Live chat</p>
              <p className="text-sm font-medium text-foreground">Mon–Sat • 9 AM – 6 PM</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <BookOpen className="size-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Knowledge base</p>
              <p className="text-sm font-medium text-foreground">Browse 120+ articles</p>
            </div>
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
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Raise Ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Support Ticket</DialogTitle>
          <DialogDescription>Our team responds within 24 working hours.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select defaultValue="technical">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="fees">Fees & Billing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subj">Subject</Label>
            <Input id="subj" className="mt-1.5" placeholder="Brief summary…" />
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" rows={4} className="mt-1.5" placeholder="Describe the issue with as much detail as possible." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit Ticket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentSupport;
