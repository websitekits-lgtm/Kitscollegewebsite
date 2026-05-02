import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { FDP_ATTENDANCE } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const FdpAttendance = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return FDP_ATTENDANCE;
    return FDP_ATTENDANCE.filter((f) =>
      [f.faculty, f.department, f.programme, f.organiser, f.year].join(" ").toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <InfoPage
      eyebrow="Research & Development"
      title="Faculty FDPs / Workshops / Conferences"
      subtitle="Records of faculty participation in development programmes — to ensure continuous learning and pedagogical refresh."
      breadcrumb={[{ label: "Research", to: "/research" }, { label: "FDPs / Workshops" }]}
      sidebar={researchSidebar}
    >
      <div className="not-prose mb-5 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by faculty, programme, organiser..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <div className="not-prose rounded-2xl border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/10">
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Faculty</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Dept.</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Programme</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden md:table-cell">Organiser</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Duration</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Year</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{f.faculty}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">{f.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{f.programme}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{f.organiser}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{f.duration}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{f.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InfoPage>
  );
};

export default FdpAttendance;
