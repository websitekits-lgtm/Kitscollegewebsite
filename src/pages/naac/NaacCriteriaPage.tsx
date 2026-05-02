import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { NAAC_CRITERIA } from "@/lib/qualityContent";
import { naacSidebar } from "./NaacSidebar";
import NotFound from "@/pages/NotFound";

const NaacCriteriaPage = () => {
  const { number } = useParams<{ number: string }>();
  const num = parseInt(number ?? "0", 10);
  const criteria = NAAC_CRITERIA.find((c) => c.number === num);

  if (!criteria) return <NotFound />;

  return (
    <InfoPage
      eyebrow={`NAAC · Criteria ${criteria.number}`}
      title={criteria.title}
      subtitle={criteria.description}
      breadcrumb={[
        { label: "NAAC", to: "/naac" },
        { label: `Criteria ${criteria.number}` },
      ]}
      sidebar={naacSidebar}
    >
      {criteria.keyMetrics && criteria.keyMetrics.length > 0 && (
        <div className="not-prose mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">Key Metrics</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {criteria.keyMetrics.map((k, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-accent" />
                <span className="text-sm text-foreground/85">{k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="not-prose rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold mb-2">Supporting Documents</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Detailed submissions for Criteria {criteria.number} — including key indicators, evidence,
          and supporting documents.
        </p>
        <Button disabled size="lg" className="rounded-sm cursor-not-allowed opacity-70">
          <Download className="size-4" /> Coming soon
        </Button>
        <p className="mt-3 text-xs text-muted-foreground italic">
          Document will be uploaded by the IQAC team. Please check back later.
        </p>
      </div>
    </InfoPage>
  );
};

export default NaacCriteriaPage;
