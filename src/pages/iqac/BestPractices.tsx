import { Star } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { IQAC_BEST_PRACTICES } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const BestPractices = () => (
  <InfoPage
    eyebrow="IQAC"
    title="Best Practices"
    subtitle="Two formally documented best practices that define how KITS approaches teaching and student support."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "Best Practices" }]}
    sidebar={iqacSidebar}
  >
    <div className="not-prose space-y-6">
      {IQAC_BEST_PRACTICES.map((p, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3 mb-3">
            <Star className="size-5 text-accent" />
            <h2 className="font-display text-xl font-semibold m-0">{p.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold text-foreground">Objective:</span> {p.objective}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Impact:</span> {p.impact}
          </p>
        </div>
      ))}
    </div>
  </InfoPage>
);

export default BestPractices;
