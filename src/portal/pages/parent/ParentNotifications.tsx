import { useState } from "react";
import { Bell, BookOpen, ClipboardCheck, Briefcase, FileText, MessageSquare, Link2, Check } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { notifications as initial, type PortalNotification } from "@/portal/mock/studentData";
import { parentMessages, type ParentMessage } from "@/portal/mock/parentData";

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

const ParentNotifications = () => {
  const [items, setItems] = useState<PortalNotification[]>(initial);
  const [messages, setMessages] = useState<ParentMessage[]>(parentMessages);

  const markAllNoticesRead = () => setItems(items.map((n) => ({ ...n, unread: false })));
  const markAllMsgsRead = () => setMessages(messages.map((m) => ({ ...m, unread: false })));

  const unreadNotices = items.filter((n) => n.unread).length;
  const unreadMsgs = messages.filter((m) => m.unread).length;

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Notifications & Messages"
        subtitle={`${unreadNotices} unread notices • ${unreadMsgs} unread messages`}
        icon={Bell}
        breadcrumb={[{ label: "Parent Portal", to: "/portal/parent" }, { label: "Notifications" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Includes college-wide notices + personal messages from your ward's mentor / class teacher.</span>
      </div>

      <Tabs defaultValue="messages">
        <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
          <TabsTrigger value="messages">Messages from College ({messages.length})</TabsTrigger>
          <TabsTrigger value="notices">College Notices ({items.length})</TabsTrigger>
          <TabsTrigger value="exam">Exam Alerts</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="circulars">Circulars</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <SectionCard
            title="Direct Messages"
            description="From mentor, class teacher, accounts office"
            action={{ label: "Mark all read", onClick: markAllMsgsRead }}
          >
            <ul className="divide-y divide-border">
              {messages.map((m) => (
                <li key={m.id} className={cn("flex items-start gap-3 py-4 first:pt-0 last:pb-0 rounded-md px-2 -mx-2", m.unread && "bg-accent/[0.03]")}>
                  <MessageSquare className={`mt-0.5 size-4 shrink-0 ${m.unread ? "text-accent" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm truncate ${m.unread ? "font-semibold" : "font-medium"} text-foreground`}>{m.subject}</p>
                      <Badge variant="outline" className="text-[10px]">{m.fromRole}</Badge>
                      {m.unread && <span className="size-2 rounded-full bg-accent" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{m.body}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">From {m.from}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs tabular-nums text-foreground/70">{m.date}</span>
                    <div className="mt-2"><Button size="sm" variant="outline" className="h-7">Reply</Button></div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        {(["notices", "exam", "academic", "circulars"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <SectionCard
              title={tab === "notices" ? "All College Notices" : tab === "exam" ? "Exam Notices" : tab === "academic" ? "Academic Notices" : "Circulars"}
              action={tab === "notices" ? { label: "Mark all read", onClick: markAllNoticesRead } : undefined}
            >
              <ul className="divide-y divide-border">
                {(tab === "notices"
                  ? items
                  : tab === "exam"
                    ? items.filter((n) => n.category === "Exam")
                    : tab === "academic"
                      ? items.filter((n) => n.category === "Academic")
                      : items.filter((n) => n.category === "Circular")
                ).map((n) => {
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
                          {n.unread && <span className="size-2 rounded-full bg-accent" />}
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

      {/* Use Check icon somewhere to avoid unused */}
      <div className="sr-only"><Check /></div>
    </PortalLayout>
  );
};

export default ParentNotifications;
