import { Briefcase, Target, BookOpen, BarChart3, Building2, Phone, Sparkles, GraduationCap, Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { PLACEMENT_OVERVIEW, YEARLY_STATS } from "@/lib/placementContent";
import { placementSidebar } from "./placement/PlacementSidebar";

const cards: LinkCard[] = [
  { label: "Placement Details",                description: "Year-wise placement statistics and recruiter highlights.", to: "/placements/details",            icon: BarChart3 },
  { label: "Career Guidance / Competitive Exams", description: "GATE, MBA, civil services and abroad-study guidance.",  to: "/placements/career-guidance",     icon: Target },
  { label: "Capacity Development",              description: "Aptitude, communication and technical skill enhancement.", to: "/placements/capacity-development", icon: Sparkles },
  { label: "Internship Details",                description: "Industry internships across departments.",                  to: "/placements/internships",         icon: GraduationCap },
  { label: "Our Recruiters",                    description: "120+ recruiters who hire from our campus.",                 to: "/placements/recruiters",          icon: Building2 },
  { label: "Soft Skills Training",              description: "Communication, leadership, and personality development.",   to: "/placements/soft-skills",         icon: BookOpen },
  { label: "Contact Details",                   description: "Reach the Training & Placement Cell.",                       to: "/placements/contact",             icon: Phone },
];

const Placements = () => {
  const latest = YEARLY_STATS[0];
  return (
    <InfoPage
      eyebrow="Career Outcomes"
      title="Training & Placement Cell"
      subtitle="Driving careers through year-round preparation, industry connect, and recruiter relationships."
      breadcrumb={[{ label: "Placements" }]}
      sidebar={placementSidebar}
    >
      <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
        {PLACEMENT_OVERVIEW.intro}
      </p>

      {/* Quick stats */}
      <div className="not-prose mb-10 grid sm:grid-cols-4 gap-4">
        {[
          { label: "Total Offers",  value: latest.totalOffers, icon: Briefcase },
          { label: "Placements",     value: latest.uniquePlacements, icon: Users },
          { label: "Highest Pkg",    value: `${latest.highestPackageLpa} LPA`, icon: Sparkles },
          { label: "Avg Package",    value: `${latest.avgPackageLpa} LPA`, icon: BarChart3 },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
            <s.icon className="size-5 text-accent mx-auto mb-2" />
            <p className="font-display text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Objectives */}
      <div className="not-prose mb-10 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="size-5 text-accent" />
          <h2 className="font-display text-xl font-semibold m-0">Objectives</h2>
        </div>
        <ul className="space-y-2">
          {PLACEMENT_OVERVIEW.objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/85">
              <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
              <span className="text-sm leading-relaxed">{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub-page cards */}
      <div className="not-prose">
        <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Explore Placement Cell</h2>
        <LinkCardGrid cards={cards} />
      </div>
    </InfoPage>
  );
};

export default Placements;
