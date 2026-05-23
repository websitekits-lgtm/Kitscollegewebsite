import { useState } from "react";
import { Users, Search, Mail, Phone, AlertTriangle, TrendingUp, BookOpenCheck, Link2, Plus } from "lucide-react";
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
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roster, type RosterStudent } from "@/portal/mock/college";
import { mentoringNotes } from "@/portal/mock/facultyData";

const studentCols: DataTableColumn<RosterStudent>[] = [
  { key: "roll", header: "Roll No", render: (r) => <span className="font-mono text-xs">{r.rollNo}</span> },
  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
  {
    key: "att",
    header: "Attendance",
    render: (r) => (
      <span className={r.attendancePct < 75 ? "text-destructive font-bold" : "text-foreground/85 font-semibold"}>
        {r.attendancePct}%
      </span>
    ),
    align: "center",
  },
  { key: "cgpa", header: "CGPA", render: (r) => <span className="tabular-nums font-medium">{r.cgpa.toFixed(2)}</span>, align: "center", hideOnMobile: true },
  {
    key: "back",
    header: "Backlogs",
    render: (r) =>
      r.backlogs > 0 ? (
        <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">{r.backlogs}</Badge>
      ) : (
        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">0</Badge>
      ),
    align: "center",
    hideOnMobile: true,
  },
  {
    key: "fee",
    header: "Fees",
    render: (r) => (
      <Badge variant="outline" className={
        r.feeStatus === "Paid"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : r.feeStatus === "Pending"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : "border-destructive/30 bg-destructive/10 text-destructive"
      }>
        {r.feeStatus}
      </Badge>
    ),
    align: "center",
    hideOnMobile: true,
  },
];

const performance = roster
  .slice()
  .sort((a, b) => b.cgpa - a.cgpa);

const FacultyStudents = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RosterStudent | null>(null);

  const filtered = roster.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase()),
  );

  const backlogStudents = roster.filter((r) => r.backlogs > 0).sort((a, b) => b.backlogs - a.backlogs);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Students"
        subtitle="CSE • 3rd Year • Section A roster (shared with Student & HOD portals)."
        icon={Users}
        breadcrumb={[{ label: "Faculty Portal", to: "/portal/faculty" }, { label: "Students" }]}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>
          This roster is the same one rendered in the
          <span className="font-semibold"> HOD → Student Monitoring</span> page. Updates here propagate everywhere.
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={roster.length} icon={Users} />
        <StatCard label="At risk (att.)" value={roster.filter((r) => r.attendancePct < 75).length} helper="Below 75%" icon={AlertTriangle} tint="from-destructive/20 to-destructive/5" />
        <StatCard label="With backlogs" value={backlogStudents.length} helper="Active" icon={BookOpenCheck} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Top performer" value={performance[0]?.cgpa.toFixed(2)} helper={performance[0]?.name} icon={TrendingUp} tint="from-emerald-400/20 to-emerald-400/5" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="list">
          <TabsList className="bg-secondary/10 mb-5">
            <TabsTrigger value="list">Roster</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="backlogs">Backlogs</TabsTrigger>
            <TabsTrigger value="notes">Mentoring Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <SectionCard
              title="Student List"
              description={`${filtered.length} students — click a row to view contact details.`}
              action={{ label: "Add note", onClick: () => alert("Use Mentoring Notes tab.") }}
            >
              <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-secondary/5 px-3">
                <Search className="size-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or roll number…"
                  className="border-0 h-10 px-0 focus-visible:ring-0"
                />
              </div>
              <DataTable
                columns={studentCols}
                rows={filtered}
                rowKey={(r) => r.rollNo}
                onRowClick={(r) => setSelected(r)}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="performance">
            <SectionCard title="Performance Overview" description="Sorted by CGPA — high to low.">
              <DataTable
                columns={studentCols}
                rows={performance}
                rowKey={(r) => r.rollNo}
                onRowClick={(r) => setSelected(r)}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="backlogs">
            <SectionCard title="Backlog Students" description="Currently carrying one or more unclear papers.">
              <DataTable
                columns={studentCols}
                rows={backlogStudents}
                rowKey={(r) => r.rollNo}
                emptyTitle="No backlogs"
                emptyDescription="Every student in this section is cleared."
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="notes">
            <SectionCard
              title="Mentoring Notes"
              description="Private observations about your mentees."
              action={{ label: "New note", onClick: () => document.getElementById("note-btn")?.click() }}
            >
              <AddNoteDialog />
              <ul className="space-y-3">
                {mentoringNotes.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                    <span className={`mt-1 size-2.5 rounded-full shrink-0 ${
                      n.flag === "critical" ? "bg-destructive" : n.flag === "watch" ? "bg-amber-500" : "bg-emerald-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">
                        {n.studentName} <span className="font-mono text-xs font-normal text-muted-foreground">• {n.rollNo}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">{n.note}</p>
                    </div>
                    <span className="text-xs tabular-nums text-foreground/70 shrink-0">{n.date}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>

      {/* Student detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription className="font-mono">{selected.rollNo} • {selected.department} • Sem {selected.semester}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Attendance" value={`${selected.attendancePct}%`} bad={selected.attendancePct < 75} />
                <Stat label="CGPA" value={selected.cgpa.toFixed(2)} />
                <Stat label="Backlogs" value={selected.backlogs} bad={selected.backlogs > 0} />
                <Stat label="Fee Status" value={selected.feeStatus} bad={selected.feeStatus !== "Paid"} />
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-accent" /> <a className="text-foreground/85 hover:text-accent" href={`mailto:${selected.email}`}>{selected.email}</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-accent" /> <span className="text-foreground/85 tabular-nums">{selected.phone}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                <Button>Add Note</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
};

const Stat = ({ label, value, bad }: { label: string; value: string | number; bad?: boolean }) => (
  <div className="rounded-md border border-border p-3 bg-secondary/5">
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`font-display text-xl font-bold mt-1 ${bad ? "text-destructive" : "text-foreground"}`}>{value}</p>
  </div>
);

const AddNoteDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="note-btn" size="sm" className="mb-4 gap-2">
          <Plus className="size-4" /> New Mentoring Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Mentoring Note</DialogTitle>
          <DialogDescription>Visible to you and the HOD.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Student</Label>
            <Select defaultValue={roster[0]?.rollNo}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {roster.map((r) => (
                  <SelectItem key={r.rollNo} value={r.rollNo}>{r.rollNo} — {r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Flag</Label>
            <Select defaultValue="watch">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ok">OK</SelectItem>
                <SelectItem value="watch">Watch</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" rows={3} className="mt-1.5" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyStudents;
