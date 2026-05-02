import { Eye, Target, Sparkles } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { VISION_MISSION } from "@/lib/aboutContent";

const sidebar = {
  heading: "About KITS",
  links: [
    { label: "Vision & Mission", to: "/about/vision-mission" },
    { label: "Organization Chart", to: "/about/organization-chart" },
    { label: "Governing Body", to: "/about/governing-body" },
    { label: "College Location", to: "/about/college-location" },
    { label: "Chairman", to: "/about/chairman" },
    { label: "Secretary & Correspondent", to: "/about/secretary" },
    { label: "Principal", to: "/about/principal" },
    { label: "Code of Ethics", to: "/about/code-of-ethics" },
    { label: "Code of Conduct", to: "/about/code-of-conduct" },
    { label: "Annual Report", to: "/about/annual-report" },
    { label: "Audit Report", to: "/about/audit-report" },
  ],
};

const VisionMission = () => {
  return (
    <InfoPage
      eyebrow="About KITS"
      title="Vision & Mission"
      subtitle="The guiding principles that shape every decision we make at Krishna Chaitanya Institute."
      breadcrumb={[{ label: "About", to: "/about" }, { label: "Vision & Mission" }]}
      sidebar={sidebar}
    >
      {/* Vision */}
      <div className="not-prose mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
            <Eye className="size-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight m-0">Our Vision</h2>
        </div>
        <p className="text-base sm:text-lg text-foreground/85 leading-relaxed pl-1">
          {VISION_MISSION.vision}
        </p>
      </div>

      {/* Mission */}
      <div className="not-prose mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
            <Target className="size-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight m-0">Our Mission</h2>
        </div>
        <ul className="space-y-3 pl-1">
          {VISION_MISSION.mission.map((m, i) => (
            <li key={i} className="flex gap-3 text-foreground/85">
              <span className="font-display text-accent font-semibold text-lg leading-tight shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core values */}
      <div className="not-prose">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
            <Sparkles className="size-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight m-0">Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
          {VISION_MISSION.coreValues.map((v) => (
            <div
              key={v}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <span className="size-2 rounded-full bg-accent shrink-0" />
              <span className="text-sm font-medium text-foreground/85">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </InfoPage>
  );
};

export default VisionMission;
