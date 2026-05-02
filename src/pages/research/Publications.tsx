import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { PUBLICATIONS } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const TYPE_STYLE: Record<string, string> = {
  Journal:        "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  Conference:     "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Book:           "bg-purple-500/15 text-purple-700 border-purple-500/30",
  "Book Chapter": "bg-amber-500/15 text-amber-700 border-amber-500/30",
};

const Publications = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PUBLICATIONS;
    return PUBLICATIONS.filter((p) =>
      [p.faculty, p.department, p.title, p.venue, p.type, p.year].join(" ").toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <InfoPage
      eyebrow="Research & Development"
      title="Faculty Publications"
      subtitle="Journal papers, conference proceedings, books, and book chapters authored by KITS faculty."
      breadcrumb={[{ label: "Research", to: "/research" }, { label: "Publications" }]}
      sidebar={researchSidebar}
    >
      <div className="not-prose mb-5 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by faculty, title, venue..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="not-prose rounded-2xl border border-dashed border-border p-10 text-center">
          <BookOpen className="size-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No publications match your search.</p>
        </div>
      ) : (
        <div className="not-prose rounded-2xl border border-border overflow-hidden bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/10">
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Faculty</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Dept.</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Title & Venue</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Year</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Type</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-secondary/10 align-top">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{p.faculty}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">{p.department}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground italic">{p.venue}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.year}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full border ${TYPE_STYLE[p.type]}`}>
                        {p.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </InfoPage>
  );
};

export default Publications;
