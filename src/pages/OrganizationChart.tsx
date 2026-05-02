import { InfoPage } from "@/components/site/InfoPage";
import { ORG_CHART } from "@/lib/aboutContent";

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
  ],
};

// Color/size cues per hierarchy level
const levelStyles: Record<number, string> = {
  1: "bg-accent text-accent-foreground border-accent shadow-md scale-100",
  2: "bg-secondary text-secondary-foreground border-secondary",
  3: "bg-primary text-primary-foreground border-primary",
  4: "bg-card text-foreground border-border",
  5: "bg-card text-foreground border-border",
  6: "bg-card text-foreground border-border opacity-90",
  7: "bg-secondary/30 text-foreground/85 border-border",
};

const OrganizationChart = () => {
  // Group hierarchy by level
  const grouped = ORG_CHART.hierarchy.reduce<Record<number, typeof ORG_CHART.hierarchy>>(
    (acc, item) => {
      (acc[item.level] = acc[item.level] || []).push(item);
      return acc;
    },
    {},
  );

  const levels = Object.keys(grouped).map(Number).sort((a, b) => a - b);

  return (
    <InfoPage
      eyebrow="About KITS"
      title="Organization Chart"
      subtitle="A clear hierarchy that drives effective governance, academic excellence, and student welfare."
      breadcrumb={[{ label: "About", to: "/about" }, { label: "Organization Chart" }]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
        {ORG_CHART.description}
      </p>

      {/* Hierarchy chart */}
      <div className="not-prose space-y-3 sm:space-y-4">
        {levels.map((level) => (
          <div key={level} className="flex flex-col items-center">
            {/* Connector line above (except first level) */}
            {level > 1 && <span className="w-px h-4 sm:h-5 bg-border" aria-hidden />}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
              {grouped[level].map((item) => (
                <div
                  key={item.role}
                  className={`flex-1 min-w-[140px] sm:min-w-[180px] max-w-xs rounded-lg border-2 px-4 py-3 text-center font-medium text-sm sm:text-base ${levelStyles[level] ?? levelStyles[5]}`}
                >
                  {item.role}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
};

export default OrganizationChart;
