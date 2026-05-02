import { Calendar } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { RND_ACTIVITIES } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const fmt = (yyyymm: string) =>
  new Date(yyyymm + "-01").toLocaleDateString("en-IN", { month: "long", year: "numeric" });

const ResearchActivities = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Recent R&D Activities"
    subtitle="A reverse-chronological log of recent workshops, grants, MoUs, and conference participations."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Activities" }]}
    sidebar={researchSidebar}
  >
    <ul className="not-prose space-y-4">
      {RND_ACTIVITIES.map((a, i) => (
        <li key={i} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-start gap-4">
            <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent shrink-0 mt-0.5">
              <Calendar className="size-5" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-1">
                {fmt(a.date)}
              </p>
              <h3 className="font-display text-lg font-semibold mb-1.5">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.detail}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </InfoPage>
);

export default ResearchActivities;
