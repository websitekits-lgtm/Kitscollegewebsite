import { Award, FileText, ShieldCheck } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { NAAC_OVERVIEW, NAAC_CRITERIA } from "@/lib/qualityContent";
import { naacSidebar } from "./NaacSidebar";

const cards: LinkCard[] = [
  ...NAAC_CRITERIA.map((c) => ({
    label: `Criteria ${c.number} — ${c.title}`,
    description: c.description,
    to: `/naac/criteria-${c.number}`,
  })),
  { label: "Self Study Report (SSR)", description: "Comprehensive self-evaluation submitted to NAAC.", to: "/naac/ssr",  isPdf: true },
  { label: "DVV Clarifications",       description: "Data Validation and Verification responses.",       to: "/naac/dvv",  isPdf: true },
];

const Naac = () => (
  <InfoPage
    eyebrow="Quality"
    title="NAAC Accreditation"
    subtitle="Our institution's commitment to academic and operational quality, evaluated through the National Assessment and Accreditation Council framework."
    breadcrumb={[{ label: "NAAC" }]}
    sidebar={naacSidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
      {NAAC_OVERVIEW.intro}
    </p>

    <div className="not-prose mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3 mb-2">
          <Award className="size-5 text-accent" />
          <h3 className="font-display text-base font-semibold m-0">Status</h3>
        </div>
        <p className="text-foreground/85">{NAAC_OVERVIEW.ourStatus}</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="size-5 text-accent" />
          <h3 className="font-display text-base font-semibold m-0">Cycle</h3>
        </div>
        <p className="text-foreground/85">{NAAC_OVERVIEW.cycle}</p>
      </div>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-5">
        <FileText className="size-5 text-accent" />
        <h2 className="font-display text-xl sm:text-2xl font-semibold m-0">Criteria & Documents</h2>
      </div>
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default Naac;
