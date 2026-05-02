import { Award, Info } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { RESEARCH_INCENTIVES } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const ResearchIncentives = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Research Incentives"
    subtitle="Rewards for high-impact publications, patents, and externally-funded research."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Incentives" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {RESEARCH_INCENTIVES.intro}
    </p>

    <div className="not-prose mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Incentive Schedule</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/10">
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Achievement</th>
              <th className="text-right px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Reward</th>
            </tr>
          </thead>
          <tbody>
            {RESEARCH_INCENTIVES.policy.map((p, i) => (
              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                <td className="px-4 py-3 text-foreground/85">{p.item}</td>
                <td className="px-4 py-3 text-right font-semibold text-accent whitespace-nowrap">{p.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="not-prose rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
      <div className="flex items-start gap-3">
        <Info className="size-5 text-amber-700 shrink-0 mt-0.5" />
        <ul className="space-y-1.5 text-sm text-foreground/85">
          {RESEARCH_INCENTIVES.notes.map((n, i) => (<li key={i}>• {n}</li>))}
        </ul>
      </div>
    </div>
  </InfoPage>
);

export default ResearchIncentives;
