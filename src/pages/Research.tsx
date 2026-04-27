import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { FileDown, Microscope, BookMarked, Building2, Award } from "lucide-react";

const focus = [
  { t: "Artificial Intelligence", d: "Applied ML, NLP, computer vision, agentic systems." },
  { t: "Renewable Energy", d: "Solar, smart grids, sustainable power systems." },
  { t: "Smart Infrastructure", d: "Civil tech, IoT-enabled buildings, sustainable materials." },
  { t: "Embedded & IoT", d: "Edge devices, sensor networks, low-power systems." },
  { t: "Manufacturing 4.0", d: "Robotics, automation, additive manufacturing." },
  { t: "Cybersecurity", d: "Network defence, secure software, applied cryptography." },
];

const disclosures = [
  "AICTE Mandatory Disclosure 2025–26",
  "NAAC Self-Study Report (SSR)",
  "NBA Accreditation Status — All UG Programs",
  "IQAC Annual Quality Assurance Report (AQAR)",
  "Audited Financial Statements",
  "Anti-Ragging Compliance Certificate",
];

const Research = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Research, NAAC & Compliance"
        title="A culture of inquiry. A commitment to quality."
        subtitle="Active research focus areas, an empowered IQAC, and full transparency through mandatory disclosures."
        breadcrumb={[{ label: "Research" }]}
      />

      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-12">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Focus Areas</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Research that matters.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
            {focus.map((f) => (
              <div data-reveal key={f.t} className="bg-card p-6">
                <Microscope className="size-5 text-accent mb-3" />
                <h3 className="font-display text-lg font-semibold mb-1.5">{f.t}</h3>
                <p className="text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid md:grid-cols-3 gap-6" staggerChildren>
          {[
            { icon: BookMarked, n: "180+", l: "Publications" },
            { icon: Building2, n: "25+", l: "Industry MoUs" },
            { icon: Award, n: "12", l: "Patents Filed" },
          ].map((s) => (
            <div data-reveal key={s.l} className="rounded-md border border-border bg-background p-8 text-center">
              <s.icon className="size-6 text-accent mx-auto mb-3" />
              <div className="font-display text-4xl font-semibold gold-text">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </SectionReveal>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-10">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Mandatory Disclosures</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Transparency by default.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {disclosures.map((d) => (
              <a data-reveal key={d} href="#" className="flex items-center justify-between p-5 rounded-md border border-border bg-card hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <FileDown className="size-5 text-accent" />
                  <span className="font-medium">{d}</span>
                </div>
                <span className="text-xs text-muted-foreground">Download</span>
              </a>
            ))}
          </div>
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default Research;
