import { InfoPage } from "@/components/site/InfoPage";
import { PATENTS } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const STATUS_STYLE: Record<string, string> = {
  Filed:     "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Granted:   "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  Published: "bg-purple-500/15 text-purple-700 border-purple-500/30",
};

const Patents = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Patents"
    subtitle="Patents filed, published, and granted by KITS faculty and students."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Patents" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
      Patent filings are an important measure of applied innovation. The R&D cell guides faculty and
      students through patent ideation, prior-art search, drafting, and filing — and tracks the
      lifecycle from publication to grant.
    </p>
    <div className="not-prose rounded-2xl border border-border overflow-hidden bg-card shadow-[var(--shadow-card)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/10">
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Title</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Inventor(s)</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden md:table-cell">Filing No.</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Year</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {PATENTS.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.inventor}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">{p.filingNo}</td>
                <td className="px-4 py-3">{p.year}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full border ${STATUS_STYLE[p.status]}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default Patents;
