import { Link } from "react-router-dom";
import { Quote, Eye, Target, Award, ArrowUpRight, Compass, FileText, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTABand } from "@/components/site/CTABand";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { CHAIRMAN, SECRETARY, PRINCIPAL, VISION_MISSION } from "@/lib/aboutContent";

const milestones = [
  { y: "2008", t: "Founded",                    d: "KITS established with a vision to bring quality engineering education to the Prakasam region." },
  { y: "2012", t: "First Batch Graduated",      d: "Pioneer cohort of B.Tech engineers placed across leading IT firms." },
  { y: "2016", t: "NAAC Accreditation",         d: "Recognised for academic and institutional quality." },
  { y: "2019", t: "AI & ML Programme",           d: "Launched cutting-edge specialization in Artificial Intelligence and Data Science." },
  { y: "2023", t: "92% Placement Rate",          d: "Highest in regional engineering institutions for the academic year." },
  { y: "2025", t: "New Innovation Hub",          d: "Inauguration of the Centre for Industry Collaboration & Research." },
];

const aboutCards: LinkCard[] = [
  { label: "Vision & Mission",                description: "Our guiding principles and core values.",                          to: "/about/vision-mission",                  icon: Eye },
  { label: "Organization Chart",               description: "Institutional hierarchy and structure.",                          to: "/about/organization-chart",              icon: Compass },
  { label: "Governing Body",                    description: "Members of the apex governing body.",                            to: "/about/governing-body",                  icon: Users },
  { label: "College Location",                  description: "Address, map, and how to reach KITS.",                            to: "/about/college-location",                icon: Compass },
  { label: "Office Staff",                       description: "Administrative team across departments.",                        to: "/about/office-staff",                    icon: Users },
  { label: "Internal Complaint Committee",       description: "Confidential mechanism for harassment-related complaints.",      to: "/about/icc",                              icon: FileText },
  { label: "Accreditation & Ranking",            description: "NAAC, AICTE, JNTUK, ISO, ISTE, IEI certificates.",                to: "/about/accreditation",                   icon: FileText },
  { label: "Institutional Development Plan",     description: "Our 5-year roadmap for institutional growth.",                    to: "/about/institutional-development-plan",  icon: FileText, isPdf: true },
  { label: "Code of Ethics",                     description: "Institutional commitment to integrity.",                          to: "/about/code-of-ethics",                  icon: FileText, isPdf: true },
  { label: "Code of Conduct",                    description: "Behavioural and disciplinary guidelines for all groups.",          to: "/about/code-of-conduct",                 icon: FileText },
  { label: "HR Policy",                          description: "Human resources policy for KITS staff.",                          to: "/about/hr-policy",                       icon: FileText, isPdf: true },
  { label: "Annual Report",                      description: "Yearly performance and milestones.",                              to: "/about/annual-report",                   icon: FileText, isPdf: true },
  { label: "Audit Report",                        description: "Audited financial statements.",                                  to: "/about/audit-report",                    icon: FileText, isPdf: true },
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

      {/* Vision / Mission preview */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="size-11 grid place-items-center rounded-md bg-accent/10 text-accent mb-5">
              <Eye className="size-5" />
            </div>
            <h2 className="font-display text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">{VISION_MISSION.vision}</p>
            <Link to="/about/vision-mission" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
              Read full Vision & Mission <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="size-11 grid place-items-center rounded-md bg-accent/10 text-accent mb-5">
              <Target className="size-5" />
            </div>
            <h2 className="font-display text-2xl font-semibold mb-3">Our Mission</h2>
            <ul className="space-y-2 mb-5">
              {VISION_MISSION.mission.slice(0, 3).map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
            <Link to="/about/vision-mission" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
              See all 5 mission goals <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership messages — Chairman / Secretary / Principal */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Leadership</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Messages from our leaders.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { person: CHAIRMAN, link: "/about/chairman" },
              { person: SECRETARY, link: "/about/secretary" },
              { person: PRINCIPAL, link: "/about/principal" },
            ].map(({ person, link }) => (
              <article key={person.name} className="rounded-2xl border border-border bg-background overflow-hidden p-6 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.22em] text-accent mb-2">{person.designation}</p>
                <Quote className="size-6 text-accent mb-3" />
                <p className="text-foreground/85 leading-relaxed text-sm flex-1 line-clamp-5">
                  {person.message?.[0]}
                </p>
                <p className="mt-4 font-display font-semibold text-foreground">{person.name}</p>
                <Link to={link} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all">
                  Read full message <ArrowUpRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links to all About sub-pages */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Explore</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Everything about KITS.
            </h2>
          </div>
          <LinkCardGrid cards={aboutCards} />
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Journey</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={m.y} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="md:[direction:ltr] pl-12 md:pl-0 md:px-10">
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 size-9 rounded-full bg-accent text-accent-foreground grid place-items-center font-display text-xs font-semibold border-4 border-background">
                      <Award className="size-4" />
                    </div>
                    <div className="font-display text-3xl font-semibold text-accent">{m.y}</div>
                    <h3 className="font-display text-xl font-semibold mt-1">{m.t}</h3>
                    <p className="text-muted-foreground mt-2">{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default About;
