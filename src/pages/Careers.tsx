import { Briefcase, Heart, ListChecks, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { CAREERS_PAGE, JOB_OPENINGS } from "@/lib/miscContent";

const sidebar = {
  heading: "Information",
  links: [
    { label: "Careers @ KITS", to: "/careers" },
    { label: "Job Openings", to: "/info/jobs" },
    { label: "Information Corner", to: "/info" },
    { label: "Contact", to: "/contact" },
  ],
};

const Careers = () => (
  <InfoPage
    eyebrow="Join Us"
    title="Careers @ KITS"
    subtitle="Build your career with one of Markapur's leading engineering institutions."
    breadcrumb={[{ label: "Careers" }]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
      {CAREERS_PAGE.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Heart className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Why join KITS?</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {CAREERS_PAGE.whyJoin.map((w, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{w}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">How to apply</h2>
      </div>
      <ol className="space-y-3">
        {CAREERS_PAGE.applicationProcess.map((s, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="not-prose rounded-2xl border border-border bg-gradient-to-br from-accent/10 via-secondary/5 to-transparent p-6 sm:p-8 text-center">
      <Briefcase className="size-10 text-accent mx-auto mb-3" />
      <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2">
        {JOB_OPENINGS.length} active openings
      </h3>
      <p className="text-muted-foreground max-w-xl mx-auto mb-5">
        Browse current vacancies and apply directly via email.
      </p>
      <Button asChild className="rounded-sm">
        <Link to="/info/jobs">
          See all openings <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  </InfoPage>
);

export default Careers;
