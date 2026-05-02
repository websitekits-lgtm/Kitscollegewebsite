import { Sparkles } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { CAPACITY_DEVELOPMENT } from "@/lib/placementContent";
import { placementSidebar } from "./PlacementSidebar";

const CapacityDevelopment = () => (
  <InfoPage
    eyebrow="Training & Placement"
    title="Capacity Development & Skill Enhancement"
    subtitle="Year-round skill-building integrated into our academic calendar."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Capacity Development" }]}
    sidebar={placementSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {CAPACITY_DEVELOPMENT.intro}
    </p>
    <div className="not-prose grid sm:grid-cols-2 gap-5">
      {CAPACITY_DEVELOPMENT.buckets.map((b, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="size-5 text-accent" />
            <h3 className="font-display text-lg font-semibold m-0">{b.title}</h3>
          </div>
          <ul className="space-y-2">
            {b.items.map((it, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-foreground/85">
                <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </InfoPage>
);

export default CapacityDevelopment;
