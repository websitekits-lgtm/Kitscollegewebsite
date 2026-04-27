import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { TrendingUp, Building2, Trophy, Briefcase } from "lucide-react";
import grad from "@/assets/campus-graduation.jpg";

const recruiters = [
  "TCS","Infosys","Wipro","Accenture","Cognizant","Tech Mahindra","HCL","Capgemini","L&T","Hexaware","Mindtree","ZS Associates","Deloitte","Amazon","IBM","Hyundai","Bosch","Cyient","DXC","Mphasis","Genpact","Tata Elxsi"
];

const stats = [
  { n: "92%", l: "Placement Rate" },
  { n: "12 LPA", l: "Highest Package" },
  { n: "5.2 LPA", l: "Average Package" },
  { n: "120+", l: "Recruiters" },
];

const yearWise = [
  { y: "2024", offers: 612, top: "12 LPA", avg: "5.2 LPA" },
  { y: "2023", offers: 548, top: "11 LPA", avg: "4.9 LPA" },
  { y: "2022", offers: 502, top: "9.5 LPA", avg: "4.4 LPA" },
  { y: "2021", offers: 471, top: "8.5 LPA", avg: "4.1 LPA" },
];

const Placements = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Placements"
        title="Where ambition turns into a career."
        subtitle="A 12-month training & placement engine that pairs every student with industry-grade certifications, mock interviews, and real recruiter access."
        breadcrumb={[{ label: "Placements" }]}
      />

      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
            {stats.map((s) => (
              <div key={s.l} className="bg-card p-7 text-center">
                <div className="font-display text-3xl md:text-4xl font-semibold gold-text">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Year-wise table */}
      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-10">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Track Record</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Year-wise placement performance</h2>
          </div>
          <div data-reveal className="rounded-md border border-border overflow-hidden bg-background">
            <div className="grid grid-cols-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.18em] p-4 font-medium">
              <div>Year</div><div>Total Offers</div><div>Highest Package</div><div>Average Package</div>
            </div>
            {yearWise.map((r) => (
              <div key={r.y} className="grid grid-cols-4 p-4 border-t border-border text-sm">
                <div className="font-display font-semibold">{r.y}</div>
                <div>{r.offers}</div>
                <div>{r.top}</div>
                <div>{r.avg}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Recruiters */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-10">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Recruiters</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Trusted by 120+ companies</h2>
          </div>
          <div data-reveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border rounded-md overflow-hidden">
            {recruiters.map((r) => (
              <div key={r} className="bg-card p-5 text-center font-display text-base font-medium">{r}</div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* T&P Cell */}
      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid lg:grid-cols-12 gap-10 items-center" staggerChildren>
          <div data-reveal className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Training & Placement Cell</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5">Industry exposure, every semester.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From the first year, students engage in aptitude training, communication skills, technical certifications and live projects. Final-year students enter campus placements job-ready.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Briefcase, t: "Pre-placement Training" },
                { icon: TrendingUp, t: "Skill Certifications" },
                { icon: Building2, t: "Industry Visits" },
                { icon: Trophy, t: "Internship Drives" },
              ].map((i) => (
                <div key={i.t} className="flex items-center gap-3 p-4 rounded-md border border-border bg-background">
                  <i.icon className="size-5 text-accent" /><span className="font-medium">{i.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="lg:col-span-6">
            <div className="rounded-md overflow-hidden border border-border">
              <img src={grad} alt="KITS placement success" loading="lazy" className="w-full h-auto" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default Placements;
