import { TrendingUp, Building2, Trophy, BarChart3 } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { YEARLY_STATS } from "@/lib/placementContent";
import { placementSidebar } from "./PlacementSidebar";

const PlacementDetails = () => (
  <InfoPage
    eyebrow="Training & Placement"
    title="Placement Details"
    subtitle="Year-on-year placement statistics, top recruiters, and package highlights."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Details" }]}
    sidebar={placementSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      KITS has consistently delivered strong placement outcomes year-on-year, with a steadily growing
      list of recruiters and an upward trend in highest and average package offers.
    </p>

    <div className="not-prose space-y-6">
      {YEARLY_STATS.map((s) => (
        <div key={s.year} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h3 className="font-display text-xl font-semibold m-0">Academic Year {s.year}</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10">
              {s.year === YEARLY_STATS[0].year ? "Latest" : "Past"}
            </span>
          </div>
          <div className="grid sm:grid-cols-4 gap-3 mb-5">
            {[
              { Icon: Trophy,    label: "Total Offers",   value: s.totalOffers },
              { Icon: BarChart3, label: "Placements",     value: s.uniquePlacements },
              { Icon: TrendingUp, label: "Highest Pkg",   value: `${s.highestPackageLpa} LPA` },
              { Icon: Building2, label: "Avg Pkg",        value: `${s.avgPackageLpa} LPA` },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border border-border bg-background p-3 text-center">
                <m.Icon className="size-4 text-accent mx-auto mb-1.5" />
                <p className="font-display text-lg font-semibold">{m.value}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {s.topRecruiters.map((r) => (
                <span key={r} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/30 text-foreground/85">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </InfoPage>
);

export default PlacementDetails;
