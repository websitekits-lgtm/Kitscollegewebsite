import { ScrollText } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { RND_POLICY } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const RndPolicy = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="R&D Policy"
    subtitle="The institutional framework governing research, IP, and faculty support at KITS."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Policy" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {RND_POLICY.intro}
    </p>
    <div className="not-prose grid sm:grid-cols-2 gap-4">
      {RND_POLICY.pillars.map((p, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <ScrollText className="size-4 text-accent" />
            <h3 className="font-display text-base font-semibold m-0">{p.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
        </div>
      ))}
    </div>
  </InfoPage>
);

export default RndPolicy;
