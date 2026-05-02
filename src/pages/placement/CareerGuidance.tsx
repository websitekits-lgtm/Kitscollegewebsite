import { Target, BookOpen } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { CAREER_GUIDANCE, COMPETITIVE_EXAMS } from "@/lib/placementContent";
import { placementSidebar } from "./PlacementSidebar";

const CareerGuidance = () => (
  <InfoPage
    eyebrow="Training & Placement"
    title="Career Guidance & Competitive Examinations"
    subtitle="Beyond placements — preparing students for higher studies and government careers."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Career Guidance" }]}
    sidebar={placementSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {CAREER_GUIDANCE.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Target className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">What we offer</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {CAREER_GUIDANCE.offerings.map((o, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{o}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Competitive Exams Covered</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {COMPETITIVE_EXAMS.map((e) => (
          <div key={e.name} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-base font-semibold mb-1">{e.name}</h3>
            <p className="text-[11px] uppercase tracking-[0.14em] text-accent font-medium mb-2">For: {e.for}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  </InfoPage>
);

export default CareerGuidance;
