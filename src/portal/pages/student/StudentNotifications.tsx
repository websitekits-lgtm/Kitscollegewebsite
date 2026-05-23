import { useState } from "react";
import { Bell, Check, BookOpen, ClipboardCheck, Briefcase, FileText, Inbox, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { EmptyState } from "@/portal/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { notifications as initial, type PortalNotification } from "@/portal/mock/studentData";

const ICONS: Record<PortalNotification["category"], typeof Bell> = {
  Academic: BookOpen,
  Exam: ClipboardCheck,
  Placement: Briefcase,
  Circular: FileText,
};

const categoryClass = (c: PortalNotification["category"]) =>
  c === "Exam"
    ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
    : c === "Placement"
      ? "border-accent/30 bg-accent/10 text-accent"
      : c === "Academic"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";

const StudentNotifications = () => {
  const [items, setItems] = useState<PortalNotification[]>(initial);
  const markAll = () => setItems(items.map((n) => ({ ...n, unread: false })));
  const toggle = (id: string) =>
    setItems(items.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  const unread = items.filter((n) => n.unread).length;
  const filterBy = (cat: PortalNotification["category"] | "all") =>
    cat === "all" ? items : items.filter((n) => n.category === cat);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Notifications"
        subtitle={`${unread} unread • ${items.length} total`}
        icon={Bell}
        breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Notifications" }]}
        actions={
          <Button variant="outline" size="sm" onClick={markAll} disabled={unread === 0}>
            <Check className="size-4" /> Mark all read
          </Button>
        }
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>
          Notices come from your
          <span className="font-semibold"> Faculty, HOD, Principal, Exam Cell</span> and
          <span className="font-semibold"> Accounts office</span>.
        </span>
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
            <SectionCard title={cat === "all" ? "All Notifications" : `${cat} Notifications`}>
              <List items={filterBy(cat)} onToggle={toggle} />
            </SectionCard>
          </TabsContent>
        ))}
      </Tabs>
    </PortalLayout>
  );
};

const List = ({ items, onToggle }: { items: PortalNotification[]; onToggle: (id: string) => void }) => {
  if (!items.length) return <EmptyState icon={Inbox} title="Nothing here" description="No notifications in this category." />;
  return (
    <ul className="divide-y divide-border">
      {items.map((n) => {
        const Icon = ICONS[n.category];
        return (
          <li
            key={n.id}
            className={cn(
              "flex items-start gap-3 py-4 first:pt-0 last:pb-0 rounded-md px-2 -mx-2 cursor-pointer transition-colors",
              n.unread ? "bg-accent/[0.03] hover:bg-accent/5" : "hover:bg-secondary/10",
            )}
            onClick={() => onToggle(n.id)}
          >
            <div className={cn("grid size-10 place-items-center rounded-md shrink-0", categoryClass(n.category))}>
              <Icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className={cn("text-sm truncate", n.unread ? "font-semibold text-foreground" : "font-medium text-foreground/85")}>
                  {n.title}
                </p>
                <Badge variant="outline" className={cn("text-[10px]", categoryClass(n.category))}>
                  {n.category}
                </Badge>
                {n.unread && <span className="size-2 rounded-full bg-accent" />}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground shrink-0">{n.date}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default StudentNotifications;
