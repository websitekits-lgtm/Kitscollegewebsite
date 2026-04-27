import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { Quote, Target, Eye, Award } from "lucide-react";
import library from "@/assets/campus-library.jpg";
import campus from "@/assets/hero-campus.jpg";

const milestones = [
  { y: "2008", t: "Founded", d: "KITS established with a vision to bring quality engineering education to the Prakasam region." },
  { y: "2012", t: "First Batch Graduated", d: "Pioneer cohort of B.Tech engineers placed across leading IT firms." },
  { y: "2016", t: "NAAC Accreditation", d: "Recognised for academic and institutional quality." },
  { y: "2019", t: "AI & ML Programme", d: "Launched cutting-edge specialization in Artificial Intelligence and Data Science." },
  { y: "2023", t: "92% Placement Rate", d: "Highest in regional engineering institutions for the academic year." },
  { y: "2025", t: "New Innovation Hub", d: "Inauguration of the Centre for Industry Collaboration & Research." },
];

const About = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About KITS"
        title="A legacy of engineering excellence in Prakasam."
        subtitle="Founded in 2008 with a clear mission — to nurture skilled, ethical, and innovative engineers who shape industry and society."
        breadcrumb={[{ label: "About" }]}
      />

      {/* Vision / Mission */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight grid md:grid-cols-2 gap-6" staggerChildren>
          {[
            { icon: Eye, title: "Our Vision", body: "To emerge as a globally recognised institution for engineering education, research and innovation, producing leaders who shape a sustainable and ethical future." },
            { icon: Target, title: "Our Mission", body: "To deliver outcome-based engineering education enriched with industry exposure, research opportunity and value-based learning that prepares students for life and leadership." },
          ].map((b) => (
            <div key={b.title} data-reveal className="rounded-md border border-border bg-card p-8 md:p-10">
              <div className="size-11 grid place-items-center rounded-sm border border-accent/30 bg-accent/5 text-accent mb-5">
                <b.icon className="size-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3">{b.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{b.body}</p>
            </div>
          ))}
        </SectionReveal>
      </section>

      {/* Chairman & Principal */}
      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid lg:grid-cols-2 gap-10" staggerChildren>
          {[
            { role: "Chairman's Message", name: "Sri K. V. Reddy", img: campus, body: "At KITS, we believe that engineering is not just a profession — it is a way of solving real problems for real people. Every classroom, lab and student initiative on this campus reflects that belief." },
            { role: "Principal's Message", name: "Dr. P. Ramesh", img: library, body: "We are committed to a learning environment that blends academic rigour with industry exposure, character and confidence. Welcome to a campus where ambition meets opportunity." },
          ].map((m) => (
            <article key={m.name} data-reveal className="rounded-md border border-border bg-background overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={m.img} alt={m.role} loading="lazy" className="size-full object-cover" />
              </div>
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-accent mb-2">{m.role}</p>
                <Quote className="size-6 text-accent mb-3" />
                <p className="text-foreground/90 leading-relaxed">{m.body}</p>
                <p className="mt-5 font-display font-semibold">{m.name}</p>
              </div>
            </article>
          ))}
        </SectionReveal>
      </section>

      {/* Milestones timeline */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-14">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Journey</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold tracking-tight">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div data-reveal key={m.y} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="md:[direction:ltr] pl-12 md:pl-0 md:px-10">
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 size-9 rounded-full bg-accent text-accent-foreground grid place-items-center font-display text-xs font-semibold border-4 border-background">
                      <Award className="size-4" />
                    </div>
                    <div className="font-display text-3xl font-semibold gold-text">{m.y}</div>
                    <h3 className="font-display text-xl font-semibold mt-1">{m.t}</h3>
                    <p className="text-muted-foreground mt-2">{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default About;
