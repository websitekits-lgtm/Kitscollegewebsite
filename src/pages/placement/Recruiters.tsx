import { Building2 } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { placementSidebar } from "./PlacementSidebar";

const partners = Array.from({ length: 16 }, (_, i) => `/c${i + 1}.png`);

const Recruiters = () => (
  <InfoPage
    eyebrow="Training & Placement"
    title="Our Recruiters"
    subtitle="120+ companies recruit from KITS year after year — from IT giants to core engineering majors."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Our Recruiters" }]}
    sidebar={placementSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      The list below highlights our active and frequent recruiters. Many of these have built long-term
      hiring partnerships with KITS, returning every academic year.
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Recruiter Logos</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map((src, i) => (
          <div key={i} className="grid place-items-center h-24 rounded-xl border border-border bg-card p-4 hover:shadow-[var(--shadow-card)] transition-shadow">
            <img src={src} alt={`Recruiter ${i + 1}`} loading="lazy" className="max-h-12 w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>

    <div className="not-prose rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold mb-3">Industries Hiring from KITS</h3>
      <div className="flex flex-wrap gap-2">
        {["IT Services", "Product Engineering", "Manufacturing", "Banking & Finance", "Consulting", "Telecommunications", "Automobile", "Power & Energy", "Construction", "Analytics & AI", "Healthcare Tech", "EdTech"].map((s) => (
          <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/30 text-foreground/85">
            {s}
          </span>
        ))}
      </div>
    </div>
  </InfoPage>
);

export default Recruiters;
