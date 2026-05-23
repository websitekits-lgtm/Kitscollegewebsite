import { useState } from "react";
import { ScrollText, Check, X, Link2, Calculator, FileText } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revaluationRequests, recountingRequests, type RevaluationRequest, type RecountingRequest } from "@/portal/mock/examData";

const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const revalCols: DataTableColumn<RevaluationRequest>[] = [
  { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
  { key: "roll", header: "Roll", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Student", render: (r) => <span className="font-medium">{r.studentName}</span>, hideOnMobile: true },
  { key: "paper", header: "Paper", render: (r) => `${r.paperCode} — ${r.paperName}` },
  { key: "orig", header: "Original", render: (r) => <span className="tabular-nums">{r.originalMarks}</span>, align: "center" },
  {
    key: "rev", header: "Revised", align: "center",
    render: (r) =>
      r.revisedMarks !== undefined ? (
        <span className={r.revisedMarks > r.originalMarks ? "font-bold text-emerald-600 dark:text-emerald-400" : r.revisedMarks < r.originalMarks ? "font-bold text-destructive" : "font-bold"}>
          {r.revisedMarks}
        </span>
      ) : "—",
  },
  {
    key: "status", header: "Status", align: "center",
    render: (r) => (
      <Badge variant="outline" className={
        r.status === "Awarded" || r.status === "Re-evaluated"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : r.status === "No Change"
            ? "border-border"
            : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{r.status}</Badge>
    ),
  },
];

const recountCols: DataTableColumn<RecountingRequest>[] = [
  { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
  { key: "roll", header: "Roll", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "paper", header: "Paper", render: (r) => r.paperCode },
  { key: "fee", header: "Fee", render: (r) => formatINR(r.fee), align: "right" },
  {
    key: "status", header: "Status", align: "center",
    render: (r) => (
      <Badge variant="outline" className={
        r.status === "Completed"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{r.status}</Badge>
    ),
  },
  { key: "date", header: "Raised", render: (r) => <span className="tabular-nums">{r.raisedOn}</span>, align: "right" },
];

const ExamRevaluation = () => {
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});

  const pending = revaluationRequests.filter((r) => r.status === "Pending");
  const completed = revaluationRequests.filter((r) => r.status !== "Pending");
  const totalFee = revaluationRequests.reduce((s, r) => s + r.fee, 0);
  const awardedCount = revaluationRequests.filter((r) => r.status === "Awarded" || r.status === "Re-evaluated").length;

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Revaluation & Corrections"
        subtitle="Process student revaluation and recounting requests."
        icon={ScrollText}
        breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Revaluation" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Requests originate from <span className="font-semibold">Student → Examinations → Revaluation</span>. Outcomes update the student's grade sheet automatically.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending" value={pending.length} helper="Awaiting evaluator" tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Completed" value={completed.length} helper={`${awardedCount} marks awarded`} icon={Check} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Fee collected" value={formatINR(totalFee)} helper="Revaluation + recounting" icon={Calculator} />
        <StatCard label="Recounting" value={recountingRequests.length} helper="Open + closed" icon={FileText} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="reval">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="reval">Revaluation</TabsTrigger>
            <TabsTrigger value="recount">Recounting</TabsTrigger>
            <TabsTrigger value="updated">Updated Results</TabsTrigger>
            <TabsTrigger value="report">Correction Report</TabsTrigger>
          </TabsList>

          <TabsContent value="reval">
            <SectionCard title="Revaluation Requests" description="Decide each request — students notified instantly.">
              <ul className="space-y-3">
                {revaluationRequests.map((r) => {
                  const decision = decisions[r.id];
                  return (
                    <li key={r.id} className="rounded-lg border border-border p-4 bg-card">
                      <div className="flex items-start gap-3">
                        <div className="grid size-10 place-items-center rounded-md bg-amber-500/10 text-amber-600 shrink-0">
                          <ScrollText className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">{r.paperName} <span className="font-mono text-xs font-normal text-muted-foreground">({r.paperCode})</span></p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {r.studentName} • <span className="font-mono">{r.rollNo}</span> • Original {r.originalMarks}{r.revisedMarks !== undefined && <> → Revised <span className="font-semibold">{r.revisedMarks}</span></>} • Fee {formatINR(r.fee)} • {r.raisedOn}
                          </p>
                        </div>
                        <Badge variant="outline" className={
                          r.status === "Awarded" || r.status === "Re-evaluated"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : r.status === "No Change"
                              ? "border-border"
                              : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        }>{r.status}</Badge>
                      </div>
                      {r.status === "Pending" && (
                        <div className="mt-3 flex items-center gap-2">
                          {decision === "approved" && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400"><Check className="size-4" /> Sent for evaluation</span>}
                          {decision === "rejected" && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-destructive"><X className="size-4" /> Rejected</span>}
                          {!decision && (
                            <>
                              <Button size="sm" className="gap-1.5" onClick={() => setDecisions((d) => ({ ...d, [r.id]: "approved" }))}><Check className="size-3.5" /> Send for evaluation</Button>
                              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setDecisions((d) => ({ ...d, [r.id]: "rejected" }))}><X className="size-3.5" /> Reject</Button>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="recount">
            <SectionCard title="Recounting Requests" description="Total marks recheck (no re-evaluation).">
              <DataTable columns={recountCols} rows={recountingRequests} rowKey={(r) => r.id} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="updated">
            <SectionCard title="Updated Results" description="Records where revaluation changed the awarded marks.">
              <DataTable
                columns={revalCols}
                rows={revaluationRequests.filter((r) => r.status === "Awarded" || r.status === "Re-evaluated")}
                rowKey={(r) => r.id}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="report">
            <SectionCard title="Correction Report" description="Audit log of all marks corrections.">
              <DataTable columns={revalCols} rows={revaluationRequests.filter((r) => r.status !== "Pending")} rowKey={(r) => r.id} />
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default ExamRevaluation;
