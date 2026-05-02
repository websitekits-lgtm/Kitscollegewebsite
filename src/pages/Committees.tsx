import { useMemo, useState } from "react";
import { Search, Users, Download } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { ALL_COMMITTEES } from "@/lib/committeesContent";

const sidebar = {
  heading: "Compliance",
  links: [
    { label: "Committees", to: "/committees" },
    { label: "AICTE Approvals", to: "/aicte" },
    { label: "NAAC Accreditation", to: "/naac" },
    { label: "IQAC", to: "/iqac" },
    { label: "Mandatory Disclosure", to: "/mandatory-disclosure" },
  ],
};

const Committees = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ALL_COMMITTEES;
    return ALL_COMMITTEES.filter((c) =>
      [c.name, c.description ?? "", c.fileName].join(" ").toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <InfoPage
      eyebrow="Governance"
      title="Committees"
      subtitle="Statutory and operational committees that govern academic, administrative, and student-welfare functions at KITS."
      breadcrumb={[{ label: "Committees" }]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        KITS operates through over 35 dedicated committees that ensure smooth functioning across all
        verticals — from examinations and admissions to anti-ragging, hostel, transport, library,
        and discipline. Each committee's member list is published as a downloadable PDF.
      </p>

      <div className="not-prose mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search committees..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <p className="not-prose text-xs text-muted-foreground mb-5">
        Showing {filtered.length} of {ALL_COMMITTEES.length} committees
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                <Users className="size-5" />
              </div>
              <h3 className="font-display text-base font-semibold leading-snug m-0">{c.name}</h3>
            </div>
            {c.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{c.description}</p>
            )}
            <button
              type="button"
              disabled
              title={c.fileName}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-70 self-start"
            >
              <Download className="size-3.5" /> Coming soon
            </button>
          </div>
        ))}
      </div>
    </InfoPage>
  );
};

export default Committees;
