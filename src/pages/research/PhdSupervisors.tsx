import { GraduationCap } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { PHD_SUPERVISORS } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const PhdSupervisors = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Ph.D Supervisors"
    subtitle="Faculty recognised by JNTU Kakinada (and other universities) to guide Ph.D scholars."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Ph.D Supervisors" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
      Our recognised research supervisors mentor doctoral scholars across CSE, ECE, EEE, MECH, CIVIL,
      and applied sciences — with active collaborations and publications in leading venues.
    </p>

    <div className="not-prose grid sm:grid-cols-2 gap-4">
      {PHD_SUPERVISORS.map((s, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold m-0">{s.name}</h3>
              <p className="text-[11px] uppercase tracking-[0.14em] text-accent font-medium mt-0.5">
                {s.designation} · {s.department}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            <span className="text-foreground font-medium">University:</span> {s.university}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Research Area:</span> {s.area}
          </p>
        </div>
      ))}
    </div>
  </InfoPage>
);

export default PhdSupervisors;
