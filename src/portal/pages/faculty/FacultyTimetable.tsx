import { Calendar, FlaskConical, ClipboardCheck } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { facultyTimetable, invigilationDuties } from "@/portal/mock/facultyData";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const PERIODS = [1, 2, 3, 4, 5] as const;
const PERIOD_TIMES: Record<number, string> = {
  1: "09:00 – 09:50",
  2: "09:50 – 10:40",
  3: "11:00 – 11:50",
  4: "11:50 – 12:40",
  5: "13:30 – 16:00",
};

const todayCode = (() => {
  const idx = new Date().getDay();
  const map: Record<number, (typeof DAYS)[number] | null> = { 0: null, 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: null };
  return map[idx] ?? "Mon";
})();

const FacultyTimetable = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Timetable"
      subtitle="Your weekly schedule, lab sessions and invigilation duties."
      icon={Calendar}
      breadcrumb={[{ label: "Faculty Portal", to: "/portal/faculty" }, { label: "Timetable" }]}
    />

    <Tabs defaultValue="weekly">
      <TabsList className="bg-secondary/10 mb-5">
        <TabsTrigger value="daily">Today</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="labs">Labs</TabsTrigger>
        <TabsTrigger value="invigilation">Invigilation</TabsTrigger>
      </TabsList>

      <TabsContent value="daily">
        <SectionCard title={`Today — ${todayCode}`} description={`${facultyTimetable.filter(t => t.day === todayCode).length} sessions`}>
          {facultyTimetable.filter((t) => t.day === todayCode).length === 0 ? (
            <p className="rounded-md border border-dashed border-border bg-secondary/5 px-4 py-6 text-center text-sm text-muted-foreground">
              Free day.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {facultyTimetable
                .filter((t) => t.day === todayCode)
                .sort((a, b) => a.period - b.period)
                .map((s) => (
                  <li key={s.period} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="w-24 shrink-0">
                      <p className="text-xs font-bold tabular-nums text-accent">{s.startTime}</p>
                      <p className="text-[10px] tabular-nums text-muted-foreground">to {s.endTime}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-foreground">{s.subject}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.code} • {s.room}</p>
                    </div>
                    <Badge variant="outline" className={s.type === "Lab" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border"}>
                      {s.type}
                    </Badge>
                  </li>
                ))}
            </ul>
          )}
        </SectionCard>
      </TabsContent>

      <TabsContent value="weekly">
        <SectionCard title="Weekly Schedule" description="Today's column is highlighted.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr>
                  <th className="border-b border-border p-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Period</th>
                  {DAYS.map((d) => (
                    <th key={d} className={cn("border-b border-border p-3 text-center text-xs font-bold uppercase tracking-wider", d === todayCode ? "text-accent bg-accent/5" : "text-muted-foreground")}>
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
                      const slot = facultyTimetable.find((t) => t.day === d && t.period === p);
                      const isToday = d === todayCode;
                      return (
                        <td key={d} className={cn("p-2 align-top", isToday && "bg-accent/5")}>
                          {slot ? (
                            <div className={cn("rounded-md border p-2", slot.type === "Lab" ? "border-emerald-500/30 bg-emerald-500/10" : "border-border bg-card")}>
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
        <SectionCard title="Lab Sessions" description="Practical sessions you supervise.">
          <ul className="divide-y divide-border">
            {facultyTimetable.filter((t) => t.type === "Lab").map((t) => (
              <li key={`${t.day}-${t.period}`} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="grid size-10 place-items-center rounded-md bg-emerald-500/10 text-emerald-600 shrink-0">
                  <FlaskConical className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-foreground">{t.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.code} • {t.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-foreground">{t.day}</p>
                  <p className="text-xs tabular-nums text-muted-foreground">{t.startTime} – {t.endTime}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>

      <TabsContent value="invigilation">
        <SectionCard title="Invigilation Schedule" description="Upcoming external exam duties.">
          <ul className="space-y-2">
            {invigilationDuties.map((d) => (
              <li key={d.id} className="flex items-start gap-3 rounded-md border border-border p-4">
                <div className="grid size-10 place-items-center rounded-md bg-rose-500/10 text-rose-600 shrink-0">
                  <ClipboardCheck className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{d.paper} <span className="font-mono text-xs font-normal text-muted-foreground">({d.paperCode})</span></p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {d.date} • {d.session === "FN" ? "Forenoon (10 AM – 1 PM)" : "Afternoon (2 PM – 5 PM)"} • {d.hall}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>
    </Tabs>
  </PortalLayout>
);

export default FacultyTimetable;
