import { Microscope, Lightbulb, Award, BookOpen, FileText, Rocket, Users2, GraduationCap, Briefcase, Target, ScrollText } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { RND_OVERVIEW } from "@/lib/researchContent";

const sidebar = {
  heading: "R & D",
  links: [
    { label: "Research Committee", to: "/research/committee" },
    { label: "Recent Activities", to: "/research/activities" },
    { label: "Research Incentives", to: "/research/incentives" },
    { label: "Patents", to: "/research/patents" },
    { label: "R&D Policy", to: "/research/policy" },
    { label: "Faculty Publications", to: "/research/publications" },
    { label: "Innovation Council (IIC)", to: "/research/iic" },
    { label: "Ph.D Supervisors", to: "/research/phd-supervisors" },
    { label: "Faculty FDP / Workshops", to: "/research/fdp-attendance" },
    { label: "Entrepreneurship Cell (EDC)", to: "/research/edc" },
    { label: "Consultancy Policy", to: "/research/consultancy-policy" },
  ],
};

const cards: LinkCard[] = [
  { label: "Research Committee",         description: "Apex committee that drives research direction and reviews proposals.",                  to: "/research/committee",         icon: Users2 },
  { label: "Recent Activities",           description: "Latest workshops, MoUs, sponsored projects, and conference participation.",              to: "/research/activities",        icon: Lightbulb },
  { label: "Research Incentives",         description: "Faculty rewards for publications, patents, and externally-funded research.",             to: "/research/incentives",        icon: Award },
  { label: "Patents",                     description: "Filed, published, and granted patents from KITS faculty and students.",                  to: "/research/patents",           icon: FileText },
  { label: "R&D Policy",                  description: "Guiding principles for research integrity, IP, and faculty support.",                    to: "/research/policy",            icon: ScrollText },
  { label: "Faculty Publications",        description: "Journals, conferences, books, and book chapters by KITS faculty.",                       to: "/research/publications",      icon: BookOpen },
  { label: "Innovation Council (IIC)",    description: "Driven by the Ministry of Education's MIC for innovation, IPR, and entrepreneurship.",   to: "/research/iic",               icon: Lightbulb },
  { label: "Ph.D Supervisors",            description: "Recognised research supervisors guiding doctoral scholars.",                              to: "/research/phd-supervisors",   icon: GraduationCap },
  { label: "Faculty FDPs / Workshops",    description: "Records of faculty participation in FDPs, workshops, and refresher courses.",             to: "/research/fdp-attendance",    icon: Target },
  { label: "Entrepreneurship Cell (EDC)", description: "Pre-incubation, mentorship, and startup support for student innovators.",                 to: "/research/edc",               icon: Rocket },
  { label: "Consultancy Policy",          description: "Framework for industry consultancy projects routed through the institution.",            to: "/research/consultancy-policy",icon: Briefcase },
];

const Research = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="R & D"
    subtitle="A campus-wide ecosystem for research, innovation, IPR, sponsored projects, consultancy, and entrepreneurship."
    breadcrumb={[{ label: "Research" }]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
      {RND_OVERVIEW.intro}
    </p>

    <div className="not-prose mb-10 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <Microscope className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Focus Areas</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {RND_OVERVIEW.focusAreas.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/85">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Explore R&D</h2>
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default Research;
