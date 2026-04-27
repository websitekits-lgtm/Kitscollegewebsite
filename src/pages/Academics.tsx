import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { GraduationCap, Calendar, FileText, BookOpen } from "lucide-react";

const programs = [
  { name: "B.Tech in Computer Science & Engineering", duration: "4 Years", intake: 180, slug: "cse" },
  { name: "B.Tech in Artificial Intelligence & Data Science", duration: "4 Years", intake: 60, slug: "aiml" },
  { name: "B.Tech in Electronics & Communication Engineering", duration: "4 Years", intake: 120, slug: "ece" },
  { name: "B.Tech in Electrical & Electronics Engineering", duration: "4 Years", intake: 60, slug: "eee" },
  { name: "B.Tech in Mechanical Engineering", duration: "4 Years", intake: 60, slug: "mech" },
  { name: "B.Tech in Civil Engineering", duration: "4 Years", intake: 60, slug: "civil" },
];

const Academics = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Academics"
        title="An academic experience built around outcomes."
        subtitle="Outcome-based education, choice-based credit system, mentorship and rich industry interface — calibrated to the JNTUK curriculum."
        breadcrumb={[{ label: "Academics" }]}
      />

      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-12">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Programs Offered</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Undergraduate B.Tech Programs</h2>
          </div>

          <div data-reveal className="rounded-md border border-border overflow-hidden divide-y divide-border bg-card">
            {programs.map((p) => (
              <div key={p.slug} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-5 md:p-6 hover:bg-secondary transition-colors">
                <div className="md:col-span-7 flex items-start gap-4">
                  <div className="size-10 rounded-sm border border-accent/30 bg-accent/5 grid place-items-center text-accent shrink-0">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">JNTUK affiliated · AICTE approved</p>
                  </div>
                </div>
                <div className="md:col-span-2 text-sm text-muted-foreground md:text-center md:self-center">{p.duration}</div>
                <div className="md:col-span-2 text-sm text-muted-foreground md:text-center md:self-center">Intake: {p.intake}</div>
                <a href={`/departments/${p.slug}`} className="md:col-span-1 text-sm font-medium text-accent hover:underline md:text-right md:self-center">View</a>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid md:grid-cols-3 gap-6" staggerChildren>
          {[
            { icon: Calendar, title: "Academic Calendar", body: "Structured semester schedule, exam cycles, holiday calendar and academic events for the year." },
            { icon: FileText, title: "Regulations", body: "Detailed JNTUK R20/R23 regulations, credit structure, and grading scheme." },
            { icon: BookOpen, title: "Curriculum Approach", body: "Outcome-based learning, electives, internships, and capstone projects every semester." },
          ].map((c) => (
            <div key={c.title} data-reveal className="rounded-md border border-border bg-background p-7">
              <c.icon className="size-6 text-accent mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default Academics;
