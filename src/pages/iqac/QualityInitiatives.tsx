import { Sparkles } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { IQAC_QUALITY_INITIATIVES } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const QualityInitiatives = () => (
  <InfoPage
    eyebrow="IQAC"
    title="Quality Initiatives"
    subtitle="Major quality-enhancement initiatives running across the institution."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "Quality Initiatives" }]}
    sidebar={iqacSidebar}
  >
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Initiatives</h2>
      </div>
      <ul className="space-y-2">
        {IQAC_QUALITY_INITIATIVES.map((q, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{q}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default QualityInitiatives;
