import { ClipboardCheck, Plus, ScrollText, Calendar, Building2, Send, Check } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { examSchedule, type ExamSchedule } from "@/portal/mock/studentData";
import { hallTicketReleases, seatingAllocations, supplementaryCandidates, type HallTicketRelease, type SeatingAllocation } from "@/portal/mock/examData";

const examCols: DataTableColumn<ExamSchedule>[] = [
  { key: "date", header: "Date", render: (e) => <span className="font-mono text-xs tabular-nums">{e.date}</span> },
  { key: "code", header: "Code", render: (e) => <span className="font-mono text-xs">{e.code}</span> },
  { key: "name", header: "Subject", render: (e) => <span className="font-medium">{e.subject}</span> },
  { key: "time", header: "Time", render: (e) => e.time, hideOnMobile: true },
  { key: "venue", header: "Venue", render: (e) => e.venue, hideOnMobile: true },
  {
    key: "type", header: "Type", align: "center",
    render: (e) => <Badge variant="outline" className={e.type === "External" ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300" : "border-border"}>{e.type}</Badge>,
  },
  {
    key: "actions", header: "", align: "center",
    render: () => <Button size="sm" variant="ghost" className="h-8">Edit</Button>,
  },
];

const hallTicketCols: DataTableColumn<HallTicketRelease>[] = [
  { key: "id", header: "Batch", render: (h) => <span className="font-mono text-xs">{h.id}</span> },
  { key: "sem", header: "Semester", render: (h) => `Sem ${h.semester}`, align: "center" },
  { key: "type", header: "Type", render: (h) => h.examType, align: "center" },
  { key: "count", header: "Students", render: (h) => h.studentsCount, align: "center" },
  {
    key: "status", header: "Status", align: "center",
    render: (h) => (
      <Badge variant="outline" className={
        h.released
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }>{h.released ? <><Check className="size-3 mr-1" /> Released {h.releaseDate}</> : "Pending"}</Badge>
    ),
  },
  {
    key: "actions", header: "", align: "center",
    render: (h) => (
      <Button size="sm" disabled={h.released} className="h-8 gap-1.5">
        <Send className="size-3.5" /> {h.released ? "Released" : "Release"}
      </Button>
    ),
  },
];

const seatingCols: DataTableColumn<SeatingAllocation>[] = [
  { key: "date", header: "Date", render: (s) => <span className="font-mono text-xs tabular-nums">{s.examDate}</span> },
  { key: "paper", header: "Paper", render: (s) => <span className="font-medium">{s.paper}</span> },
  { key: "hall", header: "Hall", render: (s) => s.hall, hideOnMobile: true },
  { key: "cap", header: "Capacity", render: (s) => s.capacity, align: "center" },
  {
    key: "alloc", header: "Allocated", align: "center",
    render: (s) => <span className={s.allocated === s.capacity ? "font-bold text-amber-600" : "font-bold"}>{s.allocated}</span>,
  },
  { key: "inv", header: "Invigilators", render: (s) => s.invigilators, align: "center", hideOnMobile: true },
];

const ExamManagement = () => {
  const upcomingCount = examSchedule.length;
  const totalSeats = seatingAllocations.reduce((s, a) => s + a.capacity, 0);
  const allocated = seatingAllocations.reduce((s, a) => s + a.allocated, 0);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Examination Management"
        subtitle="Schedule exams, allocate seats, generate hall tickets."
        icon={ClipboardCheck}
        breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Management" }]}
        actions={<ScheduleExamDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sem-end exams" value={upcomingCount} helper="Sem 6 — scheduled" icon={Calendar} />
        <StatCard label="Halls in use" value={new Set(seatingAllocations.map(s => s.hall)).size} icon={Building2} />
        <StatCard label="Seats allocated" value={`${allocated} / ${totalSeats}`} helper={`${Math.round(allocated / totalSeats * 100)}% utilised`} tint="from-amber-400/20 to-amber-400/5" />
        <StatCard label="Supp candidates" value={supplementaryCandidates.length} helper={`${supplementaryCandidates.filter(s => s.registered).length} registered`} icon={ScrollText} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="sem">
          <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
            <TabsTrigger value="sem">Sem-End</TabsTrigger>
            <TabsTrigger value="internal">Internal</TabsTrigger>
            <TabsTrigger value="supp">Supplementary</TabsTrigger>
            <TabsTrigger value="halltickets">Hall Tickets</TabsTrigger>
            <TabsTrigger value="seating">Seating Allocation</TabsTrigger>
          </TabsList>

          <TabsContent value="sem">
            <SectionCard title="Sem-End Exams — Sem 6" description="Edit to change date / time / venue.">
              <DataTable columns={examCols} rows={examSchedule} rowKey={(e) => e.code} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="internal">
            <SectionCard title="Internal Tests" description="Schedule and monitor mid-term internals.">
              <p className="rounded-md border border-dashed border-border bg-secondary/5 p-6 text-center text-sm text-muted-foreground">
                Internal-2 completed on 2026-05-10. Next cycle starts after sem-end exams.
              </p>
            </SectionCard>
          </TabsContent>

          <TabsContent value="supp">
            <SectionCard title="Supplementary Candidates" description="Backlog clearance registration.">
              <DataTable
                columns={[
                  { key: "roll", header: "Roll No", render: (s) => <span className="font-mono text-xs">{s.rollNo}</span> },
                  { key: "name", header: "Name", render: (s) => <span className="font-medium">{s.name}</span> },
                  { key: "p", header: "Papers", render: (s) => s.papers, align: "center" },
                  {
                    key: "reg", header: "Status", align: "center",
                    render: (s) => (
                      <Badge variant="outline" className={s.registered ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"}>
                        {s.registered ? "Registered" : "Pending"}
                      </Badge>
                    ),
                  },
                ]}
                rows={supplementaryCandidates}
                rowKey={(s) => s.rollNo}
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="halltickets">
            <SectionCard
              title="Hall Ticket Generation"
              description="Release per semester — students download from their portal."
            >
              <DataTable columns={hallTicketCols} rows={hallTicketReleases} rowKey={(h) => h.id} />
            </SectionCard>
          </TabsContent>

          <TabsContent value="seating">
            <SectionCard title="Seating / Room Allocation" description="Hall-wise allocations per paper.">
              <DataTable columns={seatingCols} rows={seatingAllocations} rowKey={(s) => `${s.examDate}-${s.hall}-${s.paper}`} />
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

const ScheduleExamDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Schedule Exam</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Exam</DialogTitle>
          <DialogDescription>Adds to the timetable visible across portals.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Paper</Label>
            <Input className="mt-1.5" placeholder="e.g. CS605 — Cyber Security" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="d">Date</Label>
              <Input id="d" type="date" className="mt-1.5" />
            </div>
            <div>
              <Label>Session</Label>
              <Select defaultValue="fn">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fn">Forenoon (10 AM – 1 PM)</SelectItem>
                  <SelectItem value="an">Afternoon (2 PM – 5 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Type</Label>
            <Select defaultValue="external">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="external">Sem-end (External)</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="supp">Supplementary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamManagement;
