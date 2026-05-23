import { useState } from "react";
import { Bell, Send, BookOpen, ClipboardCheck, Briefcase, FileText, Link2, Plus, AlertTriangle } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { notifications as initial, type PortalNotification } from "@/portal/mock/studentData";
import { institutionAlerts } from "@/portal/mock/principalData";

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

const PrincipalNotifications = () => {
  const [items, setItems] = useState<PortalNotification[]>(initial);

  const send = (n: Omit<PortalNotification, "id" | "date" | "unread">) => {
    setItems([{ ...n, id: `N${Date.now()}`, date: new Date().toISOString().slice(0, 10), unread: true }, ...items]);
  };

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Notifications & Approvals"
        subtitle="College-wide notice board and emergency alerts."
        icon={Bell}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Notifications" }]}
        actions={<BroadcastDialog onSend={send} />}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Broadcast reaches Students, Faculty and HoDs simultaneously.</span>
      </div>

      <Tabs defaultValue="notices">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="notices">College Notices ({items.length})</TabsTrigger>
          <TabsTrigger value="circulars">Circulars</TabsTrigger>
          <TabsTrigger value="events">Event Announcements</TabsTrigger>
          <TabsTrigger value="alerts">Emergency Alerts ({institutionAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="notices">
          <SectionCard title="All Notices">
            <ul className="divide-y divide-border">
              {items.map((n) => {
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

        <TabsContent value="circulars">
          <SectionCard title="Circulars">
            <ul className="divide-y divide-border">
              {items.filter((n) => n.category === "Circular").map((n) => (
                <li key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <FileText className="mt-0.5 size-4 text-amber-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{n.title}</p>
                    <p className="text-sm text-muted-foreground">{n.body}</p>
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground shrink-0">{n.date}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="events">
          <SectionCard title="Event Announcements">
            <p className="rounded-md border border-dashed border-border bg-secondary/5 p-6 text-center text-sm text-muted-foreground">
              Use the Broadcast button (top-right) to announce a college event — choose the "Circular" category.
            </p>
          </SectionCard>
        </TabsContent>

        <TabsContent value="alerts">
          <SectionCard title="Emergency Alerts" description="Critical issues needing immediate attention.">
            <ul className="space-y-3">
              {institutionAlerts.map((a) => (
                <li key={a.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                  <AlertTriangle className={`mt-0.5 size-4 shrink-0 ${
                    a.severity === "critical" ? "text-destructive" : a.severity === "warning" ? "text-amber-500" : "text-accent"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.detail}</p>
                  </div>
                  <Badge variant="outline" className={
                    a.severity === "critical"
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : a.severity === "warning"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        : "border-border"
                  }>
                    {a.severity}
                  </Badge>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </PortalLayout>
  );
};

const BroadcastDialog = ({ onSend }: { onSend: (n: Omit<PortalNotification, "id" | "date" | "unread">) => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PortalNotification["category"]>("Circular");
  const [urgent, setUrgent] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Broadcast</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Broadcast Institution-wide Notice</DialogTitle>
          <DialogDescription>Reaches every Student, Faculty and HoD portal.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as PortalNotification["category"])}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Exam">Exam</SelectItem>
                <SelectItem value="Placement">Placement</SelectItem>
                <SelectItem value="Circular">Circular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="t">Title</Label>
            <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="b">Body</Label>
            <Textarea id="b" value={body} onChange={(e) => setBody(e.target.value)} rows={3} className="mt-1.5" />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-foreground/85">
            <Checkbox checked={urgent} onCheckedChange={(v) => setUrgent(!!v)} />
            Send as urgent / push notification
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            if (!title.trim()) return;
            onSend({ title: title.trim(), body: body.trim(), category });
            setTitle(""); setBody(""); setOpen(false);
          }} disabled={!title.trim()}>
            <Send className="size-4" /> Send {urgent ? "(Urgent)" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrincipalNotifications;
