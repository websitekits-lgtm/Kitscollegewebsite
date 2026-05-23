import { useState } from "react";
import { Bell, Send, BookOpen, ClipboardCheck, Briefcase, FileText, Link2, Plus } from "lucide-react";
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

const HodNotifications = () => {
  const [items, setItems] = useState<PortalNotification[]>(initial);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Notifications"
        subtitle="Department-wide notice board — broadcasts reach students and faculty."
        icon={Bell}
        breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Notifications" }]}
        actions={<SendNoticeDialog onSend={(n) => setItems([{ ...n, id: `N${Date.now()}`, date: new Date().toISOString().slice(0, 10), unread: true }, ...items])} />}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Notices published here appear in students' and faculty's notification inboxes simultaneously.</span>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="Academic">Academic</TabsTrigger>
          <TabsTrigger value="Exam">Exam</TabsTrigger>
          <TabsTrigger value="Placement">Placement</TabsTrigger>
          <TabsTrigger value="Circular">Circulars</TabsTrigger>
        </TabsList>

        {(["all", "Academic", "Exam", "Placement", "Circular"] as const).map((cat) => (
          <TabsContent key={cat} value={cat}>
            <SectionCard title={cat === "all" ? "All Notices" : `${cat}`}>
              <ul className="divide-y divide-border">
                {(cat === "all" ? items : items.filter((n) => n.category === cat)).map((n) => {
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

const SendNoticeDialog = ({ onSend }: { onSend: (n: Omit<PortalNotification, "id" | "date" | "unread">) => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PortalNotification["category"]>("Circular");
  const [audience, setAudience] = useState<"all" | "students" | "faculty">("all");

  const submit = () => {
    if (!title.trim()) return;
    onSend({ title: title.trim(), body: body.trim(), category });
    setTitle("");
    setBody("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Broadcast</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Broadcast Department Notice</DialogTitle>
          <DialogDescription>Pick the audience and category.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Audience</Label>
              <Select value={audience} onValueChange={(v) => setAudience(v as typeof audience)}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Students + Faculty</SelectItem>
                  <SelectItem value="students">Students only</SelectItem>
                  <SelectItem value="faculty">Faculty only</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </div>
          <div>
            <Label htmlFor="t">Title</Label>
            <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="b">Body</Label>
            <Textarea id="b" value={body} onChange={(e) => setBody(e.target.value)} rows={3} className="mt-1.5" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} disabled={!title.trim()}>
            <Send className="size-4" /> Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HodNotifications;
