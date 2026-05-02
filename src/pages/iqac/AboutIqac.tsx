import { Target } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { IQAC_OVERVIEW } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const AboutIqac = () => (
  <InfoPage
    eyebrow="IQAC"
    title="About IQAC"
    subtitle="Role and objectives of the Internal Quality Assurance Cell at KITS."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "About" }]}
    sidebar={iqacSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {IQAC_OVERVIEW.intro}
    </p>
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Target className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Objectives</h2>
      </div>
      <ol className="space-y-3">
        {IQAC_OVERVIEW.objectives.map((o, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{o}</span>
          </li>
        ))}
      </ol>
    </div>
  </InfoPage>
);

export default AboutIqac;
