import { Users, Network, Calendar, Briefcase, GraduationCap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { ALUMNI_PAGE } from "@/lib/aboutContent";

const FEATURE_ICONS = {
  "Lifelong Network": Network,
  "Mentorship Opportunities": Users,
  "Alumni Events": Calendar,
  "Career Support": Briefcase,
};

const sidebar = {
  heading: "Quick Links",
  links: [
    { label: "Vision & Mission", to: "/about/vision-mission" },
    { label: "Code of Ethics", to: "/about/code-of-ethics" },
    { label: "Organization Chart", to: "/about/organization-chart" },
    { label: "College Location", to: "/about/college-location" },
    { label: "Governing Body", to: "/about/governing-body" },
    { label: "Contact", to: "/contact" },
  ],
};

const documentCards: LinkCard[] = [
  {
    label: "Alumni Committee Members",
    description: "List of committee members coordinating alumni activities and outreach.",
    isPdf: true,
    icon: FileText,
  },
  {
    label: "Alumni Registration Form",
    description: "Download, fill, and submit the form to join the KITS Alumni Association.",
    isPdf: true,
    icon: FileText,
  },
];

const Alumni = () => (
  <InfoPage
    eyebrow="Stay Connected"
    title="Alumni Association"
    subtitle="A growing network of KITS graduates building careers, mentoring juniors, and giving back to their alma mater."
    breadcrumb={[{ label: "Alumni" }]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
      {ALUMNI_PAGE.intro}
    </p>

    {/* Features */}
    <div className="not-prose mb-10">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">What we offer</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {ALUMNI_PAGE.features.map((f) => {
          const Icon = FEATURE_ICONS[f.title as keyof typeof FEATURE_ICONS] ?? GraduationCap;
          return (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
            >
              <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent mb-3">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-base font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          );
        })}
      </div>
    </div>

    {/* Documents */}
    <div className="not-prose mb-10">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Documents</h2>
      <LinkCardGrid cards={documentCards} columns={2} />
    </div>

    {/* CTA */}
    <div className="not-prose rounded-2xl border border-border bg-gradient-to-br from-accent/10 via-secondary/5 to-transparent p-6 sm:p-8 text-center">
      <GraduationCap className="size-10 text-accent mx-auto mb-3" />
      <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2">
        Are you a KITS Alumnus?
      </h3>
      <p className="text-muted-foreground max-w-xl mx-auto mb-5">
        Reach out to update your details, join upcoming events, or volunteer for student mentorship programs.
      </p>
      <Button asChild className="rounded-sm">
        <a href="mailto:principal@kits-anna.com?subject=Alumni%20Registration">
          Contact Alumni Cell
        </a>
      </Button>
    </div>
  </InfoPage>
);

export default Alumni;
