import { useMemo, useState } from "react";
import { CalendarCheck, Check, X, Save, AlertTriangle, FileDown, Link2, Plus } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { EmptyState } from "@/portal/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { assignedFaculty, pendingAttendanceSessions, facultySubjects } from "@/portal/mock/facultyData";
import { facultyLeaveRequests, type FacultyLeaveRequest } from "@/portal/mock/hodData";
import { roster, type RosterStudent } from "@/portal/mock/college";

type MarkValue = "P" | "A" | null;

const FacultyAttendance = () => {
  const [activeSession, setActiveSession] = useState(pendingAttendanceSessions[0]?.code ?? facultySubjects[0]?.code);
  const session = pendingAttendanceSessions.find((s) => s.code === activeSession) ?? null;

  // Per-student attendance marks for the active session (in-memory only)
  const [marks, setMarks] = useState<Record<string, MarkValue>>(() =>
    Object.fromEntries(roster.map((r) => [r.rollNo, null])),
  );

  const setAll = (v: MarkValue) =>
    setMarks(Object.fromEntries(roster.map((r) => [r.rollNo, v])));

  const presentCount = useMemo(() => Object.values(marks).filter((m) => m === "P").length, [marks]);
  const absentCount = useMemo(() => Object.values(marks).filter((m) => m === "A").length, [marks]);
  const unmarkedCount = roster.length - presentCount - absentCount;

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Attendance"
        subtitle="Mark today's session, edit past sessions and review shortage students."
        icon={CalendarCheck}
        breadcrumb={[{ label: "Faculty Portal", to: "/portal/faculty" }, { label: "Attendance" }]}
      />

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending sessions" value={pendingAttendanceSessions.length} helper="To mark today" tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Roster size" value={roster.length} helper="CSE • 3rd Year • Sec A" />
        <StatCard label="Above 75%" value={roster.filter((r) => r.attendancePct >= 75).length} tint="from-emerald-400/20 to-emerald-400/5" />
        <StatCard label="Shortage" value={roster.filter((r) => r.attendancePct < 75).length} helper="< 75%" icon={AlertTriangle} tint="from-destructive/20 to-destructive/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="mark">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
            <TabsTrigger value="summary">Subject-wise Summary</TabsTrigger>
            <TabsTrigger value="shortage">Shortage Students</TabsTrigger>
            <TabsTrigger value="myleaves">My Leaves</TabsTrigger>
          </TabsList>

          {/* ---------- Mark attendance ---------- */}
          <TabsContent value="mark">
            <SectionCard
              title="Mark Today's Session"
              description="Tap P / A for each student. Submitting updates the student's attendance % in their portal."
            >
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-secondary/5 p-3 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <Select value={activeSession} onValueChange={setActiveSession}>
                    <SelectTrigger><SelectValue placeholder="Choose session" /></SelectTrigger>
                    <SelectContent>
                      {pendingAttendanceSessions.map((s) => (
                        <SelectItem key={s.code} value={s.code}>
                          {s.subject} — {s.startTime}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {session && (
                  <div className="text-xs text-muted-foreground">
                    {session.date} • Period {session.period} • {session.room}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setAll("P")}>
                    <Check className="size-4" /> All Present
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setAll("A")}>
                    <X className="size-4" /> All Absent
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/10">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">#</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Roll No</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Student</th>
                      <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Mark</th>
                      <th className="px-3 py-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Sem %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.map((r, idx) => {
                      const mark = marks[r.rollNo];
                      return (
                        <tr key={r.rollNo} className={cn("border-t border-border", idx % 2 === 1 && "bg-secondary/5")}>
                          <td className="px-3 py-2 text-muted-foreground tabular-nums">{idx + 1}</td>
                          <td className="px-3 py-2 font-mono text-xs">{r.rollNo}</td>
                          <td className="px-3 py-2 font-medium">{r.name}</td>
                          <td className="px-3 py-2">
                            <div className="flex justify-center gap-1">
                              <MarkBtn active={mark === "P"} onClick={() => setMarks((m) => ({ ...m, [r.rollNo]: "P" }))} mode="P" />
                              <MarkBtn active={mark === "A"} onClick={() => setMarks((m) => ({ ...m, [r.rollNo]: "A" }))} mode="A" />
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums hidden md:table-cell">
                            <span className={r.attendancePct < 75 ? "text-destructive font-semibold" : "text-foreground/80"}>
                              {r.attendancePct}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Submit bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3">
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span><span className="font-bold text-emerald-600 dark:text-emerald-400">{presentCount}</span> present</span>
                  <span><span className="font-bold text-destructive">{absentCount}</span> absent</span>
                  <span><span className="font-bold text-foreground/70">{unmarkedCount}</span> unmarked</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Link2 className="size-3.5 text-accent" /> Submitting updates the live Student Portal.
                  </span>
                  <Button disabled={unmarkedCount === roster.length} className="gap-2">
                    <Save className="size-4" /> Submit Attendance
                  </Button>
                </div>
              </div>
            </SectionCard>
          </TabsContent>

          {/* ---------- Subject-wise summary ---------- */}
          <TabsContent value="summary">
            <SectionCard title="Subject-wise Summary" description="Class average per subject you teach.">
              <DataTable
                columns={summaryCols}
                rows={facultySubjects.map((s) => ({
                  ...s,
                  classAvg: Math.round(roster.reduce((a, b) => a + b.attendancePct, 0) / roster.length),
                  shortage: roster.filter((r) => r.attendancePct < 75).length,
                }))}
                rowKey={(r) => r.code}
              />
            </SectionCard>
          </TabsContent>

          {/* ---------- Shortage students ---------- */}
          <TabsContent value="shortage">
            <SectionCard
              title="Shortage Students"
              description="Below 75% — please initiate corrective action."
              action={{ label: "Export CSV", onClick: () => alert("Export not enabled in demo.") }}
            >
              {(() => {
                const short = roster.filter((r) => r.attendancePct < 75);
                if (!short.length) return <EmptyState icon={Check} title="All clear" description="No students below 75% in your section." />;
                return (
                  <DataTable
                    columns={shortageCols}
                    rows={short}
                    rowKey={(r) => r.rollNo}
                  />
                );
              })()}
            </SectionCard>
          </TabsContent>

          {/* ---------- My leaves ---------- */}
          <TabsContent value="myleaves">
            <SectionCard
              title="My Leave Requests"
              description="Submitted leaves are reviewed by your HOD."
              action={{ label: "Apply leave", onClick: () => document.getElementById("leave-btn")?.click() }}
            >
              <div className="mb-3 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
                <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
                <span>
                  Approvals are handled by your
                  <span className="font-semibold"> HOD → Faculty Management → Leave Requests</span>.
                </span>
              </div>
              <LeaveDialog />
              <DataTable
                columns={myLeaveCols}
                rows={myLeaves}
                rowKey={(l) => l.id}
                emptyTitle="No leave history"
                emptyDescription="Apply for leave using the button above."
              />
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

const MarkBtn = ({ active, onClick, mode }: { active: boolean; onClick: () => void; mode: "P" | "A" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "grid size-7 place-items-center rounded-md border text-xs font-bold transition-colors",
      mode === "P"
        ? active
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-border text-emerald-600 hover:border-emerald-500"
        : active
          ? "border-destructive bg-destructive text-white"
          : "border-border text-destructive hover:border-destructive",
    )}
  >
    {mode}
  </button>
);

interface SummaryRow {
  code: string;
  name: string;
  classAvg: number;
  shortage: number;
}

const summaryCols: DataTableColumn<SummaryRow>[] = [
  { key: "code", header: "Code", render: (s) => <span className="font-mono text-xs">{s.code}</span> },
  { key: "name", header: "Subject", render: (s) => <span className="font-medium">{s.name}</span> },
  {
    key: "avg",
    header: "Class Avg",
    render: (s) => (
      <span className={s.classAvg < 75 ? "text-destructive font-bold" : "text-emerald-600 dark:text-emerald-400 font-bold"}>
        {s.classAvg}%
      </span>
    ),
    align: "center",
  },
  {
    key: "short",
    header: "Shortage",
    render: (s) => (
      <Badge variant="outline" className={s.shortage ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}>
        {s.shortage} students
      </Badge>
    ),
    align: "center",
  },
  {
    key: "actions",
    header: "",
    render: () => <Button size="sm" variant="ghost" className="h-8 gap-1.5"><FileDown className="size-3.5" /> Report</Button>,
    align: "center",
  },
];

const myLeaves = facultyLeaveRequests.filter((l) => l.facultyName === assignedFaculty.name);

const myLeaveCols: DataTableColumn<FacultyLeaveRequest>[] = [
  { key: "id", header: "ID", render: (l) => <span className="font-mono text-xs">{l.id}</span> },
  { key: "type", header: "Type", render: (l) => <Badge variant="outline">{l.type}</Badge>, align: "center" },
  { key: "dates", header: "Dates", render: (l) => <span className="tabular-nums">{l.from} → {l.to}</span> },
  { key: "days", header: "Days", render: (l) => l.days, align: "center", hideOnMobile: true },
  {
    key: "status", header: "Status", align: "center",
    render: (l) => (
      <Badge variant="outline" className={
        l.status === "Approved"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : l.status === "Pending"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : "border-destructive/30 bg-destructive/10 text-destructive"
      }>{l.status}</Badge>
    ),
  },
];

const LeaveDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="leave-btn" size="sm" className="mb-4 gap-2"><Plus className="size-4" /> Apply Leave</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>Your HOD will review the request.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Type</Label>
            <Select defaultValue="casual">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="earned">Earned</SelectItem>
                <SelectItem value="duty">Duty (OD)</SelectItem>
                <SelectItem value="maternity">Maternity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="lf">From</Label><Input id="lf" type="date" className="mt-1.5" /></div>
            <div><Label htmlFor="lt">To</Label><Input id="lt" type="date" className="mt-1.5" /></div>
          </div>
          <div><Label htmlFor="lr">Reason</Label><Textarea id="lr" rows={3} className="mt-1.5" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit to HOD</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const shortageCols: DataTableColumn<RosterStudent>[] = [
  { key: "roll", header: "Roll No", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
  {
    key: "pct",
    header: "Attendance",
    render: (r) => <span className="font-bold text-destructive tabular-nums">{r.attendancePct}%</span>,
    align: "center",
  },
  { key: "cgpa", header: "CGPA", render: (r) => r.cgpa.toFixed(2), align: "center", hideOnMobile: true },
  { key: "back", header: "Backlogs", render: (r) => r.backlogs, align: "center", hideOnMobile: true },
  {
    key: "actions",
    header: "",
    render: () => <Button size="sm" variant="outline" className="h-8">Notify Parent</Button>,
    align: "center",
  },
];

export default FacultyAttendance;
