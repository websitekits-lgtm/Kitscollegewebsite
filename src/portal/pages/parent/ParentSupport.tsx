import { useState } from "react";
import { HelpCircle, Plus, Mail, Phone, MessageSquare, BookOpen } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wardMentor, wardClassTeacher } from "@/portal/mock/parentData";

const ParentSupport = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Support"
      subtitle="Reach the right office or your ward's teachers."
      icon={HelpCircle}
      breadcrumb={[{ label: "Parent Portal", to: "/portal/parent" }, { label: "Support" }]}
      actions={<ContactDialog />}
    />

    <div className="grid gap-6 md:grid-cols-2">
      <SectionCard title="Your Ward's Teachers">
        <div className="space-y-3">
          <ContactRow role="Mentor" name={wardMentor.name} email={wardMentor.email} phone={wardMentor.phone} />
          <ContactRow role="Class Teacher" name={wardClassTeacher.name} email={wardClassTeacher.email} phone={wardClassTeacher.phone} />
        </div>
      </SectionCard>

      <SectionCard title="College Offices">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <Mail className="size-4 text-accent" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Principal's office</p>
              <p className="text-sm font-medium text-foreground truncate">principal@kits-anna.com</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <Phone className="size-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Reception</p>
              <p className="text-sm font-medium text-foreground tabular-nums">+91 9153019999</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <MessageSquare className="size-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Accounts office</p>
              <p className="text-sm font-medium text-foreground">accounts@kits-anna.com • Mon–Sat 9 AM – 5 PM</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <BookOpen className="size-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Examination cell</p>
              <p className="text-sm font-medium text-foreground">exams@kits-anna.com</p>
            </div>
          </li>
        </ul>
      </SectionCard>
    </div>
  </PortalLayout>
);

const ContactRow = ({ role, name, email, phone }: { role: string; name: string; email: string; phone: string }) => (
  <div className="rounded-md border border-border p-3 bg-secondary/5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
      <Button size="sm" variant="outline" className="gap-1.5">Message</Button>
    </div>
    <div className="mt-2 grid gap-1 text-xs">
      <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-foreground/85 hover:text-accent"><Mail className="size-3 text-accent" /> {email}</a>
      <span className="flex items-center gap-1.5 text-foreground/85 tabular-nums"><Phone className="size-3 text-accent" /> {phone}</span>
    </div>
  </div>
);

const ContactDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2"><Plus className="size-4" /> Contact Us</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact the College</DialogTitle>
          <DialogDescription>We'll get back within 1 working day.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Who to reach</Label>
            <Select defaultValue="mentor">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="class-teacher">Class Teacher</SelectItem>
                <SelectItem value="hod">HOD — CSE</SelectItem>
                <SelectItem value="accounts">Accounts Office</SelectItem>
                <SelectItem value="exam">Examination Cell</SelectItem>
                <SelectItem value="principal">Principal's Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="s">Subject</Label><Input id="s" className="mt-1.5" /></div>
          <div><Label htmlFor="m">Message</Label><Textarea id="m" rows={4} className="mt-1.5" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ParentSupport;
