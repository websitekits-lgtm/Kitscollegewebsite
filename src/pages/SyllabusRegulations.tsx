import { BookOpen, Layers, ScrollText } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { SYLLABUS_REGULATIONS } from "@/lib/academicsContent";

const sidebar = {
  heading: "Academics",
  links: [
    { label: "Academic Programs", to: "/academics" },
    { label: "Syllabus & Regulations", to: "/academics/syllabus-regulations" },
    { label: "Academic Calendars", to: "/examination/academic-calendars" },
    { label: "Academic Collaborations", to: "/academics/collaborations" },
    { label: "Courses & Intake", to: "/admissions/courses-intake" },
    { label: "Fee Structure", to: "/admissions/fee-structure" },
  ],
};

const SyllabusRegulations = () => (
  <InfoPage
    eyebrow="Academics"
    title="Syllabus & Regulations"
    subtitle="JNTUK-aligned, AICTE-approved curriculum frameworks across all our B.Tech and M.Tech programmes."
    breadcrumb={[
      { label: "Academics", to: "/academics" },
      { label: "Syllabus & Regulations" },
    ]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
      {SYLLABUS_REGULATIONS.intro}
    </p>

    {/* Regulation versions */}
    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-5">
        <Layers className="size-5 text-accent" />
        <h2 className="font-display text-2xl font-semibold m-0">Active Regulations</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {SYLLABUS_REGULATIONS.regulationVersions.map((r) => (
          <div
            key={r.code}
            className="rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] bg-accent/15 text-accent border border-accent/30">
                {r.code}
              </span>
            </div>
            <p className="font-medium text-foreground mb-1.5">{r.applicableTo}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.summary}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Curriculum components */}
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-5">
        <BookOpen className="size-5 text-accent" />
        <h2 className="font-display text-2xl font-semibold m-0">What the curriculum includes</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {SYLLABUS_REGULATIONS.components.map((c, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <ScrollText className="size-4 mt-0.5 shrink-0 text-accent" />
            <span className="text-sm text-foreground/85">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default SyllabusRegulations;
