import { useState } from "react";
import { Users, Search, Link2, AlertTriangle, BookOpenCheck, CalendarCheck, FileText } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { roster, type RosterStudent } from "@/portal/mock/college";
import { semesterResults } from "@/portal/mock/studentData";
import { regulations } from "@/portal/mock/examData";

const studentCols: DataTableColumn<RosterStudent>[] = [
  { key: "roll", header: "Roll No", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "dept", header: "Dept", render: (r) => r.department, align: "center", hideOnMobile: true },
  {
    key: "att", header: "Att %", align: "center",
    render: (r) => <span className={r.attendancePct < 75 ? "text-destructive font-bold" : "text-foreground font-semibold"}>{r.attendancePct}%</span>,
  },
  { key: "cgpa", header: "CGPA", render: (r) => r.cgpa.toFixed(2), align: "center", hideOnMobile: true },
  {
    key: "back", header: "Backlogs", align: "center",
    render: (r) =>
      r.backlogs > 0
        ? <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{r.backlogs}</Badge>
        : <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>,
  },
  {
    key: "elig", header: "Eligibility", align: "center",
    render: (r) => (
      <Badge variant="outline" className={
        r.attendancePct >= 75
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      }>{r.attendancePct >= 75 ? "Eligible" : "Detained"}</Badge>
    ),
  },
];

const ExamRecords = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RosterStudent | null>(null);

  const filtered = roster.filter(
    (r) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.rollNo.toLowerCase().includes(search.toLowerCase()),
  );
  const shortage = roster.filter((r) => r.attendancePct < 75);
  const backlogs = roster.filter((r) => r.backlogs > 0).sort((a, b) => b.backlogs - a.backlogs);
  const eligibleForSupp = roster.filter((r) => r.backlogs > 0);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Student Records"
        subtitle="Profiles, academic history and exam eligibility."
        icon={Users}
        breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Records" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>Reads the shared <span className="font-semibold">roster</span> — same students seen by Faculty / HOD / Principal.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={roster.length} helper="Sample section" icon={Users} />
        <StatCard label="Detained (att.)" value={shortage.length} icon={AlertTriangle} tint="from-destructive/20 to-destructive/5" />
        <StatCard label="With Backlogs" value={backlogs.length} icon={BookOpenCheck} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Supp candidates" value={eligibleForSupp.length} icon={FileText} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="profiles">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="history">Academic History</TabsTrigger>
            <TabsTrigger value="credits">Credits & Regulations</TabsTrigger>
            <TabsTrigger value="eligibility">Attendance Eligibility</TabsTrigger>
            <TabsTrigger value="backlogs">Backlogs</TabsTrigger>
            <TabsTrigger value="status">Academic Status</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles">
            <SectionCard title="Student Profiles" description={`${filtered.length} students`}>
              <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-secondary/5 px-3">
                <Search className="size-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or roll no…" className="border-0 h-10 px-0 focus-visible:ring-0" />
              </div>
              <DataTable columns={studentCols} rows={filtered} rowKey={(r) => r.rollNo} onRowClick={(r) => setSelected(r)} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="history">
            <SectionCard title="Academic History" description="Latest sample student — semester results.">
              <DataTable
                columns={[
                  { key: "sem", header: "Semester", render: (s) => `Sem ${s.semester}` },
                  { key: "sgpa", header: "SGPA", render: (s) => <span className="font-bold tabular-nums">{s.sgpa.toFixed(2)}</span>, align: "center" },
                  { key: "credits", header: "Credits", render: (s) => s.credits, align: "center" },
                  {
                    key: "back", header: "Backlogs", align: "center",
                    render: (s) =>
                      s.backlogs > 0
                        ? <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{s.backlogs}</Badge>
                        : <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>,
                  },
                ]}
                rows={semesterResults}
                rowKey={(s) => s.semester}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="credits">
            <SectionCard title="Credits & Active Regulations" description="Applicable regulation per batch.">
              <ul className="space-y-3">
                {regulations.map((r) => (
                  <li key={r.code} className="rounded-lg border border-border p-4 bg-card">
                    <div className="flex items-start gap-3">
                      <div className="grid size-12 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                        <span className="font-display font-bold">{r.code}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.scheme}</p>
                        <p className="mt-1 text-sm text-foreground/85">{r.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold tabular-nums">{r.totalCredits}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">credits</p>
                        <Badge variant="outline" className={r.active ? "mt-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "mt-1 border-border"}>
                          {r.active ? "Active" : "Legacy"}
                        </Badge>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="eligibility">
            <SectionCard title="Attendance-based Eligibility" description="Below 75% — detained from end-sem.">
              <DataTable columns={studentCols} rows={shortage} rowKey={(r) => r.rollNo} emptyTitle="All eligible" />
            </SectionCard>
          </TabsContent>

          <TabsContent value="backlogs">
            <SectionCard title="Backlog Students" description="Active unclear papers.">
              <DataTable columns={studentCols} rows={backlogs} rowKey={(r) => r.rollNo} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="status">
            <SectionCard title="Academic Status Overview" description="Promotion eligibility summary.">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <StatusBox label="Promoted (no backlogs)" value={roster.filter(r => r.backlogs === 0 && r.attendancePct >= 75).length} tone="emerald" icon={CalendarCheck} />
                <StatusBox label="Promoted with backlogs" value={roster.filter(r => r.backlogs > 0 && r.attendancePct >= 75).length} tone="amber" icon={BookOpenCheck} />
                <StatusBox label="Detained (attendance)" value={roster.filter(r => r.attendancePct < 75).length} tone="rose" icon={AlertTriangle} />
                <StatusBox label="On notice (multiple BL)" value={roster.filter(r => r.backlogs >= 3).length} tone="rose" icon={FileText} />
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription className="font-mono">{selected.rollNo} • {selected.department} • Sem {selected.semester}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Field label="Attendance" value={`${selected.attendancePct}%`} bad={selected.attendancePct < 75} />
                <Field label="CGPA" value={selected.cgpa.toFixed(2)} />
                <Field label="Backlogs" value={selected.backlogs} bad={selected.backlogs > 0} />
                <Field label="Eligibility" value={selected.attendancePct >= 75 ? "Eligible" : "Detained"} bad={selected.attendancePct < 75} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                <Button>Open Grade Sheet</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
};

const StatusBox = ({ label, value, tone, icon: Icon }: { label: string; value: number; tone: "emerald" | "amber" | "rose"; icon: typeof CalendarCheck }) => (
  <div className="rounded-md border border-border p-3 bg-secondary/5">
    <div className="flex items-center gap-2">
      <Icon className={
        tone === "emerald" ? "size-4 text-emerald-600 dark:text-emerald-400" :
        tone === "amber"   ? "size-4 text-amber-500" :
        "size-4 text-destructive"
      } />
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
    <p className="font-display text-2xl font-bold mt-1 tabular-nums">{value}</p>
  </div>
);

const Field = ({ label, value, bad }: { label: string; value: string | number; bad?: boolean }) => (
  <div className="rounded-md border border-border p-3 bg-secondary/5">
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`font-display text-xl font-bold mt-1 ${bad ? "text-destructive" : "text-foreground"}`}>{value}</p>
  </div>
);

export default ExamRecords;
