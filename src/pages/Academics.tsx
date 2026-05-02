import { Link } from "react-router-dom";
import { GraduationCap, Calendar, FileText, BookOpen, ArrowUpRight, FileSignature, Layers, Handshake } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTABand } from "@/components/site/CTABand";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { PROGRAMS } from "@/lib/academicsContent";

const academicCards: LinkCard[] = [
  { label: "Departments",                description: "All seven engineering departments at KITS.",     to: "/departments",                  icon: GraduationCap },
  { label: "Courses & Intake",           description: "B.Tech and M.Tech intake details.",              to: "/admissions/courses-intake",    icon: Layers },
  { label: "Syllabus & Regulations",      description: "JNTUK R23, R20 regulations and curriculum.",     to: "/academics/syllabus-regulations", icon: FileText },
  { label: "Academic Calendars",          description: "Year-wise calendars for B.Tech and M.Tech.",     to: "/examination/academic-calendars", icon: Calendar },
  { label: "Academic Collaborations",     description: "Industry MoUs and university partnerships.",     to: "/academics/collaborations",    icon: Handshake, isPdf: true },
  { label: "Examination Cell",            description: "Timetables, results, papers, forms.",            to: "/examination",                  icon: FileSignature },
];

const Academics = () => {
  // Show only B.Tech UG programs in this listing
  const ug = PROGRAMS.filter((p) => p.level === "UG");

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Academics"
        title="An academic experience built around outcomes."
        subtitle="Outcome-based education, choice-based credit system, mentorship and rich industry interface — calibrated to the JNTUK curriculum."
        breadcrumb={[{ label: "Academics" }]}
      />

      {/* Programs offered */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Programs Offered</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold">Undergraduate B.Tech Programs</h2>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border bg-card shadow-[var(--shadow-card)]">
            {ug.map((p) => (
              <div key={p.code} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-5 md:p-6 hover:bg-secondary/10 transition-colors">
                <div className="md:col-span-7 flex items-start gap-4">
                  <div className="size-10 rounded-sm border border-accent/30 bg-accent/5 grid place-items-center text-accent shrink-0">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">B.Tech in {p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.affiliation}</p>
                  </div>
                </div>
                <div className="md:col-span-2 text-sm text-muted-foreground md:text-center md:self-center">{p.duration}</div>
                <div className="md:col-span-2 text-sm text-muted-foreground md:text-center md:self-center">Intake: {p.intake}</div>
                <Link
                  to={`/departments/${p.code.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="md:col-span-1 text-sm font-medium text-accent hover:underline md:text-right md:self-center inline-flex items-center gap-1"
                >
                  View <ArrowUpRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Looking for M.Tech?{" "}
            <Link to="/admissions/courses-intake" className="text-accent hover:underline">
              See all programmes including PG →
            </Link>
          </p>
        </div>
      </section>

      {/* Quick links to academic sub-pages */}
      <section className="py-16 md:py-20 bg-secondary/5 border-t border-border">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Resources</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Academic Resources & Pages</h2>
          </div>
          <LinkCardGrid cards={academicCards} />
        </div>
      </section>

      {/* Curriculum approach */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-tight grid md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Outcome-Based Education", body: "Curriculum designed around clear course and programme outcomes (CO/PO mapping) aligned with industry needs." },
            { icon: Layers,   title: "Choice-Based Credit System", body: "Wide range of electives, honours/minors options, and flexible credit pathways under R23 regulations." },
            { icon: Calendar, title: "Internships & Projects",     body: "Mandatory industry internships and capstone projects every academic year." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-7">
              <c.icon className="size-6 text-accent mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default Academics;
