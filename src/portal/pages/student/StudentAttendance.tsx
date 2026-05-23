import { useState } from "react";
import { CalendarCheck, AlertTriangle, ShieldCheck, Plus, Link2 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { StatCard } from "@/portal/components/StatCard";
import { ChartCard } from "@/portal/components/ChartCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { attendanceBySubject, totalAttendancePercent } from "@/portal/mock/studentData";

const chartData = attendanceBySubject.map((s) => ({
  code: s.code,
  percent: Math.round((s.attended / s.total) * 100),
}));

const leaveHistory = [
  { id: "L01", type: "Medical", from: "2026-04-12", to: "2026-04-14", status: "Approved" },
  { id: "L02", type: "OD — Hackathon", from: "2026-03-28", to: "2026-03-29", status: "Approved" },
  { id: "L03", type: "Personal", from: "2026-05-18", to: "2026-05-18", status: "Pending" },
];

const StudentAttendance = () => {
  const shortageRows = attendanceBySubject.filter((s) => Math.round((s.attended / s.total) * 100) < 75);

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Attendance"
        subtitle="Track your monthly and subject-wise attendance — minimum 75% required."
        icon={CalendarCheck}
        breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Attendance" }]}
        actions={<LeaveRequestDialog />}
      />

      <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
        <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
        <span>
          Attendance is marked by your
          <span className="font-semibold"> Faculty</span> in each session. Leave / OD requests go to your mentor + HOD.
        </span>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Overall %"
          value={`${totalAttendancePercent}%`}
          helper="This semester"
          icon={CalendarCheck}
          trend={totalAttendancePercent >= 75 ? 2 : -4}
        />
        <StatCard
          label="Above threshold"
          value={attendanceBySubject.length - shortageRows.length}
          helper="≥ 75% subjects"
          icon={ShieldCheck}
          tint="from-emerald-400/20 to-emerald-400/5"
        />
        <StatCard
          label="Shortage subjects"
          value={shortageRows.length}
          helper="< 75% — take action"
          icon={AlertTriangle}
          tint="from-destructive/20 to-destructive/5"
        />
        <StatCard
          label="Leaves taken"
          value={leaveHistory.filter((l) => l.status === "Approved").length}
          helper={`${leaveHistory.filter((l) => l.status === "Pending").length} pending`}
          tint="from-amber-400/20 to-amber-400/5"
        />
      </div>

      {/* Chart */}
      <div className="mt-6">
        <ChartCard title="Subject-wise Attendance" description="Red line marks the 75% minimum.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="code" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                cursor={{ fill: "hsl(var(--secondary) / 0.15)" }}
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
              />
              <ReferenceLine y={75} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label={{ value: "75% min", position: "right", fill: "hsl(var(--destructive))", fontSize: 11 }} />
              <Bar dataKey="percent" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Breakdown + Leave history */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-start">
        <SectionCard title="Subject Breakdown" description="Detailed attendance per subject." className="lg:col-span-2">
          <ul className="space-y-3">
            {attendanceBySubject.map((s) => {
              const pct = Math.round((s.attended / s.total) * 100);
              const short = pct < 75;
              return (
                <li key={s.code} className="rounded-md border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium text-foreground">{s.name}</p>
                        <span className="text-xs font-mono text-muted-foreground">{s.code}</span>
                        {short && (
                          <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive text-[10px]">
                            Shortage
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Attended {s.attended} / {s.total}
                      </p>
                    </div>
                    <p className={`tabular-nums font-bold text-lg ${short ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                      {pct}%
                    </p>
                  </div>
                  <Progress value={pct} className={`mt-2 h-1.5 ${short ? "[&>div]:bg-destructive" : ""}`} />
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard title="Leave & OD" description="Your recent requests.">
          <ul className="space-y-2">
            {leaveHistory.map((l) => (
              <li key={l.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{l.type}</p>
                  <Badge
                    variant="outline"
                    className={
                      l.status === "Approved"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : l.status === "Pending"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                          : "border-destructive/30 bg-destructive/10 text-destructive"
                    }
                  >
                    {l.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground tabular-nums">{l.from} → {l.to}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </PortalLayout>
  );
};

const LeaveRequestDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Request Leave / OD</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Leave or OD Request</DialogTitle>
          <DialogDescription>Your mentor and HoD will review the request.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label>Type</Label>
            <Select defaultValue="medical">
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="od">OD — College event</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="from">From</Label>
              <Input id="from" type="date" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input id="to" type="date" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="reason">Reason</Label>
            <Textarea id="reason" rows={3} className="mt-1.5" placeholder="Brief reason…" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentAttendance;
