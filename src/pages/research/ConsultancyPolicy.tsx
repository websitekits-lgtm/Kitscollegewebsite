import { Briefcase } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { CONSULTANCY_POLICY } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const ConsultancyPolicy = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Consultancy Policy"
    subtitle="The framework for industry consultancy projects routed through KITS."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Consultancy Policy" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {CONSULTANCY_POLICY.intro}
    </p>
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Briefcase className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Policy Highlights</h2>
      </div>
      <ol className="space-y-3">
        {CONSULTANCY_POLICY.rules.map((r, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{r}</span>
          </li>
        ))}
      </ol>
    </div>
  </InfoPage>
);

export default ConsultancyPolicy;
