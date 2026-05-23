import { useState } from "react";
import { Bell, Send, Wallet, Receipt, HandCoins, RotateCcw, FileText, Link2, Plus, BookOpen, ClipboardCheck, Briefcase } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { notifications as initial, type PortalNotification } from "@/portal/mock/studentData";

const ICONS: Record<PortalNotification["category"], typeof Bell> = {
  Academic: BookOpen, Exam: ClipboardCheck, Placement: Briefcase, Circular: FileText,
};
const categoryClass = (c: PortalNotification["category"]) =>
  c === "Exam"
    ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
    : c === "Placement"
      ? "border-accent/30 bg-accent/10 text-accent"
      : c === "Academic"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";

const AccountsNotifications = () => {
  const [items, setItems] = useState<PortalNotification[]>(initial);

  const send = (n: Omit<PortalNotification, "id" | "date" | "unread">) => {
    setItems([{ ...n, id: `N${Date.now()}`, date: new Date().toISOString().slice(0, 10), unread: true }, ...items]);
  };

  const feeDue = items.filter((n) => /due|deadline|pending/i.test(n.title) && /fee/i.test(n.title + n.body));
  const payConfirm = items.filter((n) => /payment|receipt|confirmation/i.test(n.title));
  const scholarNotices = items.filter((n) => /scholar/i.test(n.title + n.body));
  const refundNotices = items.filter((n) => /refund/i.test(n.title + n.body));
  const circulars = items.filter((n) => n.category === "Circular");

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Notifications"
        subtitle="Publish fee, payment, scholarship and refund notices."
        icon={Bell}
        breadcrumb={[{ label: "Accounts", to: "/portal/accounts" }, { label: "Notifications" }]}
        actions={<PublishDialog onSend={send} />}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Notices published here appear in <span className="font-semibold">Student → Notifications</span> instantly.</span>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="fee">Fee Due</TabsTrigger>
          <TabsTrigger value="pay">Payment Confirm</TabsTrigger>
          <TabsTrigger value="schol">Scholarships</TabsTrigger>
          <TabsTrigger value="refund">Refunds</TabsTrigger>
          <TabsTrigger value="circulars">Circulars</TabsTrigger>
        </TabsList>

        {[
          { v: "all",       rows: items,        icon: Bell },
          { v: "fee",       rows: feeDue,       icon: Wallet },
          { v: "pay",       rows: payConfirm,   icon: Receipt },
          { v: "schol",     rows: scholarNotices, icon: HandCoins },
          { v: "refund",    rows: refundNotices,  icon: RotateCcw },
          { v: "circulars", rows: circulars,    icon: FileText },
        ].map(({ v, rows }) => (
          <TabsContent key={v} value={v}>
            <SectionCard title="Notices">
              <ul className="divide-y divide-border">
                {rows.length === 0 && (
                  <li className="py-6 text-center text-sm text-muted-foreground">No notices in this category yet.</li>
                )}
                {rows.map((n) => {
                  const Icon = ICONS[n.category];
                  return (
                    <li key={n.id} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                      <div className={cn("grid size-10 place-items-center rounded-md shrink-0", categoryClass(n.category))}>
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-foreground truncate">{n.title}</p>
                          <Badge variant="outline" className={cn("text-[10px]", categoryClass(n.category))}>{n.category}</Badge>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground shrink-0">{n.date}</span>
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          </TabsContent>
        ))}
      </Tabs>
    </PortalLayout>
  );
};

const PublishDialog = ({ onSend }: { onSend: (n: Omit<PortalNotification, "id" | "date" | "unread">) => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PortalNotification["category"]>("Circular");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2"><Plus className="size-4" /> Publish Notice</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Finance Notice</DialogTitle>
          <DialogDescription>Goes out to all student inboxes.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as PortalNotification["category"])}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Circular">Circular (fee due / payment / refund)</SelectItem>
                <SelectItem value="Academic">Academic alert</SelectItem>
                <SelectItem value="Exam">Exam (e.g. exam fee due)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="t">Title</Label><Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" /></div>
          <div><Label htmlFor="b">Body</Label><Textarea id="b" value={body} onChange={(e) => setBody(e.target.value)} rows={3} className="mt-1.5" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            if (!title.trim()) return;
            onSend({ title: title.trim(), body: body.trim(), category });
            setTitle(""); setBody(""); setOpen(false);
          }} disabled={!title.trim()}><Send className="size-4" /> Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountsNotifications;
