import { Award, FileText, Download } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { AICTE_APPROVALS } from "@/lib/qualityContent";

const sidebar = {
  heading: "Compliance",
  links: [
    { label: "AICTE Approvals", to: "/aicte" },
    { label: "NAAC Accreditation", to: "/naac" },
    { label: "IQAC", to: "/iqac" },
    { label: "Mandatory Disclosure", to: "/mandatory-disclosure" },
    { label: "Committees", to: "/committees" },
  ],
};

const Aicte = () => (
  <InfoPage
    eyebrow="Compliance"
    title="AICTE Approvals"
    subtitle="All India Council for Technical Education (AICTE) approval letters — year-wise."
    breadcrumb={[{ label: "AICTE Approvals" }]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      KITS Markapur is approved by the All India Council for Technical Education (AICTE). Each
      academic year, the institution receives a formal Extension of Approval (EoA) document
      detailing approved programmes, intake, and infrastructure requirements.
    </p>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Award className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Approval Letters</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {AICTE_APPROVALS.map((a) => (
          <div
            key={a.year}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex items-start gap-4"
          >
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <FileText className="size-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-display text-base font-semibold m-0">{a.year} Approval</h3>
                {a.highlight && (
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full border border-accent/30 bg-accent/10 text-accent">
                    {a.highlight}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3 break-all">{a.fileName}</p>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-70"
              >
                <Download className="size-3.5" /> Coming soon
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </InfoPage>
);

export default Aicte;
