import { BookOpen } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { SOFT_SKILLS } from "@/lib/placementContent";
import { placementSidebar } from "./PlacementSidebar";

const SoftSkills = () => (
  <InfoPage
    eyebrow="Training & Placement"
    title="Soft Skills Training"
    subtitle="A four-year structured programme blending classroom learning, role-play, and real-world practice."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Soft Skills" }]}
    sidebar={placementSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {SOFT_SKILLS.intro}
    </p>
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Modules</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {SOFT_SKILLS.modules.map((m, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{m}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default SoftSkills;
