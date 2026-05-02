import { Rocket, Trophy } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { EDC as EDC_DATA } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const EDC = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Entrepreneurship Development Cell (EDC)"
    subtitle="The launchpad for student innovators — from idea to startup."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "EDC" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {EDC_DATA.intro}
    </p>

    <div className="not-prose mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Rocket className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">What we offer</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {EDC_DATA.offerings.map((o, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{o}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Achievements</h2>
      </div>
      <ul className="space-y-2">
        {EDC_DATA.achievements.map((a, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/85">
            <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default EDC;
