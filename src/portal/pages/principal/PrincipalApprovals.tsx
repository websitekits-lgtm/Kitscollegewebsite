import { useMemo, useState } from "react";
import { CheckCircle, X, Check, Link2, Search } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { approvalQueue, type ApprovalQueueItem } from "@/portal/mock/principalData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const typeColor = (t: ApprovalQueueItem["type"]) => {
  switch (t) {
    case "Budget":         return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "Recruitment":    return "border-accent/30 bg-accent/10 text-accent";
    case "Event":          return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "Curriculum":     return "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300";
    case "Infrastructure": return "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300";
    case "MoU":            return "border-secondary/30 bg-secondary/10 text-secondary-foreground";
    default:               return "border-border";
  }
};

const PrincipalApprovals = () => {
  const [items, setItems] = useState<ApprovalQueueItem[]>(approvalQueue);
  const [decided, setDecided] = useState<Record<string, "approved" | "rejected">>({});
  const [search, setSearch] = useState("");

  const decide = (id: string, decision: "approved" | "rejected") => {
    setDecided((prev) => ({ ...prev, [id]: decision }));
    // For demo, keep the item in the list but mark its status visually
  };

  const filter = (priority?: "High" | "Medium" | "Low") =>
    items.filter((i) => {
      const matchesPriority = !priority || i.priority === priority;
      const matchesSearch = !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.raisedBy.toLowerCase().includes(search.toLowerCase());
      return matchesPriority && matchesSearch;
    });

  const decidedToday = useMemo(() => Object.keys(decided).length, [decided]);
  const totalBudget = items
    .filter((i) => i.amount)
    .reduce((s, i) => s + (i.amount ?? 0), 0);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Approvals"
        subtitle="Decisions reach the originating HoD / faculty instantly."
        icon={CheckCircle}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Approvals" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Items below originate from <span className="font-semibold">HoD requests</span> and faculty escalations.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending" value={items.length - decidedToday} helper="In queue" />
        <StatCard label="High priority" value={items.filter((i) => i.priority === "High" && !decided[i.id]).length} helper="Need attention" tint="from-destructive/20 to-destructive/5" />
        <StatCard label="Decided today" value={decidedToday} helper={decidedToday > 0 ? "Approved + Rejected" : "—"} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Budget at stake" value={formatINR(totalBudget)} helper="Sum of budget items" />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-secondary/5 px-3">
          <Search className="size-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or originator…" className="border-0 h-10 px-0 focus-visible:ring-0" />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="all">All ({filter().length})</TabsTrigger>
            <TabsTrigger value="High">High Priority</TabsTrigger>
            <TabsTrigger value="Medium">Medium</TabsTrigger>
            <TabsTrigger value="Low">Low</TabsTrigger>
          </TabsList>

          {(["all", "High", "Medium", "Low"] as const).map((tab) => {
            const rows = tab === "all" ? filter() : filter(tab);
            return (
              <TabsContent key={tab} value={tab}>
                <SectionCard title={tab === "all" ? "All Requests" : `${tab} Priority`}>
                  <ul className="space-y-3">
                    {rows.map((a) => {
                      const status = decided[a.id];
                      return (
                        <li key={a.id} className="rounded-lg border border-border p-4 bg-card">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className={typeColor(a.type) + " shrink-0"}>{a.type}</Badge>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground">{a.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Raised by <span className="font-medium text-foreground/90">{a.raisedBy}</span>{" "}
                                • {a.department} • <span className="tabular-nums">{a.raisedOn}</span>
                                {a.amount && <> • Budget <span className="font-semibold text-foreground tabular-nums">{formatINR(a.amount)}</span></>}
                              </p>
                            </div>
                            <Badge variant="outline" className={
                              a.priority === "High"
                                ? "border-destructive/30 bg-destructive/10 text-destructive shrink-0"
                                : a.priority === "Medium"
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 shrink-0"
                                  : "border-border shrink-0"
                            }>{a.priority}</Badge>
                          </div>

                          <div className="mt-4 flex items-center gap-2">
                            {status === "approved" && (
                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                <Check className="size-4" /> Approved
                              </span>
                            )}
                            {status === "rejected" && (
                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-destructive">
                                <X className="size-4" /> Rejected
                              </span>
                            )}
                            {!status && (
                              <>
                                <Button size="sm" className="gap-1.5" onClick={() => decide(a.id, "approved")}>
                                  <Check className="size-3.5" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => decide(a.id, "rejected")}>
                                  <X className="size-3.5" /> Reject
                                </Button>
                                <Button size="sm" variant="ghost">View Details</Button>
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </SectionCard>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* keep setItems usage to avoid unused warning if not invoked yet */}
      <button hidden onClick={() => setItems(items)}>noop</button>
    </PortalLayout>
  );
};

export default PrincipalApprovals;
