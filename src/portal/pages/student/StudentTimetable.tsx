import { Calendar, FlaskConical, Coffee, Link2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { timetable, type TimetableSlot } from "@/portal/mock/studentData";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const DAY_FULL: Record<(typeof DAYS)[number], string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday",
};
const PERIODS = [1, 2, 3, 4, 5] as const;
const PERIOD_TIMES: Record<number, string> = {
  1: "09:00 – 09:50",
  2: "09:50 – 10:40",
  3: "11:00 – 11:50",
  4: "11:50 – 12:40",
  5: "13:30 – 16:00",
};

const todayCode = (() => {
  const idx = new Date().getDay(); // 0 Sun .. 6 Sat
  const map: Record<number, (typeof DAYS)[number] | null> = { 0: null, 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: null };
  return map[idx] ?? "Mon";
})();

const StudentTimetable = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Timetable"
      subtitle="Your daily, weekly and lab schedule."
      icon={Calendar}
      breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Timetable" }]}
    />

    <div className="mb-5 flex items-start gap-2 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground/85">
      <Link2 className="size-4 text-accent mt-0.5 shrink-0" />
      <span>
        Timetable is set by your
        <span className="font-semibold"> HOD / Department office</span>. Lab venues and faculty assignments come from the same source.
      </span>
    </div>

    <Tabs defaultValue="daily">
      <TabsList className="bg-secondary/10 mb-5">
        <TabsTrigger value="daily">Today</TabsTrigger>
        <TabsTrigger value="weekly">Weekly Grid</TabsTrigger>
        <TabsTrigger value="labs">Lab Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="daily">
        <DailyView day={todayCode} />
      </TabsContent>

      <TabsContent value="weekly">
        <SectionCard title="Weekly Schedule" description="Highlighted column is today.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr>
                  <th className="border-b border-border p-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Period
                  </th>
                  {DAYS.map((d) => (
                    <th
                      key={d}
                      className={cn(
                        "border-b border-border p-3 text-center text-xs font-bold uppercase tracking-wider",
                        d === todayCode ? "text-accent bg-accent/5" : "text-muted-foreground",
                      )}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((p) => (
                  <tr key={p} className="border-b border-border">
                    <td className="p-3 align-top text-xs font-medium text-foreground/70">
                      <p>P{p}</p>
                      <p className="font-mono text-[10px] text-muted-foreground tabular-nums">{PERIOD_TIMES[p]}</p>
                    </td>
                    {DAYS.map((d) => {
                      const slot = timetable.find((t) => t.day === d && t.period === p);
                      const isToday = d === todayCode;
                      return (
                        <td key={d} className={cn("p-2 align-top", isToday && "bg-accent/5")}>
                          {slot ? (
                            <div
                              className={cn(
                                "rounded-md border p-2",
                                slot.type === "Lab"
                                  ? "border-emerald-500/30 bg-emerald-500/10"
                                  : "border-border bg-card",
                              )}
                            >
                              <p className="text-xs font-semibold text-foreground leading-tight">{slot.subject}</p>
                              <p className="mt-0.5 text-[10px] text-muted-foreground">{slot.room}</p>
                            </div>
                          ) : (
                            <span className="block py-2 text-center text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </TabsContent>

      <TabsContent value="labs">
        <SectionCard title="Lab Schedule" description="All practical sessions for the semester.">
          <ul className="divide-y divide-border">
            {timetable
              .filter((t) => t.type === "Lab")
              .map((t) => (
                <li key={`${t.day}-${t.period}`} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="grid size-10 place-items-center rounded-md bg-emerald-500/10 text-emerald-600 shrink-0">
                    <FlaskConical className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-foreground">{t.subject}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.faculty} • {t.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground">{DAY_FULL[t.day as (typeof DAYS)[number]]}</p>
                    <p className="text-xs tabular-nums text-muted-foreground">{t.startTime} – {t.endTime}</p>
                  </div>
                </li>
              ))}
          </ul>
        </SectionCard>
      </TabsContent>
    </Tabs>
  </PortalLayout>
);

const DailyView = ({ day }: { day: (typeof DAYS)[number] }) => {
  const slots = timetable.filter((t) => t.day === day).sort((a, b) => a.period - b.period);

  return (
    <SectionCard
      title={`Today — ${DAY_FULL[day]}`}
      description={`${slots.length} sessions scheduled`}
    >
      {slots.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-secondary/5 px-4 py-6 text-center text-sm text-muted-foreground">
          No classes today — enjoy the break!
        </p>
      ) : (
        <ol className="relative space-y-3 border-l-2 border-border pl-5">
          {slots.map((s) => (
            <li key={s.period} className="relative">
              <span className="absolute -left-[1.6rem] top-2 grid size-4 place-items-center rounded-full border-2 border-accent bg-card">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <div
                className={cn(
                  "rounded-md border p-3",
                  s.type === "Lab" ? "border-emerald-500/30 bg-emerald-500/10" : "border-border bg-card",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{s.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.faculty} • {s.room}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold tabular-nums text-accent">{s.startTime}</p>
                    <p className="text-[10px] tabular-nums text-muted-foreground">till {s.endTime}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "mt-2 text-[10px]",
                    s.type === "Lab" ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "border-border",
                  )}
                >
                  {s.type === "Lab" ? <><FlaskConical className="size-3 mr-1" /> Lab</> : "Theory"}
                </Badge>
              </div>
            </li>
          ))}
          <li className="relative">
            <span className="absolute -left-[1.6rem] top-2 grid size-4 place-items-center rounded-full border-2 border-border bg-card">
              <Coffee className="size-2 text-muted-foreground" />
            </span>
            <p className="text-xs text-muted-foreground">End of day</p>
          </li>
        </ol>
      )}
    </SectionCard>
  );
};

export default StudentTimetable;
