import { Briefcase, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/site/InfoPage";
import { JOB_OPENINGS } from "@/lib/miscContent";
import { infoCornerSidebar } from "./InfoCornerSidebar";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const TYPE_STYLE: Record<string, string> = {
  Teaching:      "bg-accent/15 text-accent border-accent/30",
  "Non-Teaching": "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Contractual:    "bg-amber-500/15 text-amber-700 border-amber-500/30",
};

const JobOpenings = () => (
  <InfoPage
    eyebrow="Information Corner"
    title="Job Openings"
    subtitle="Current teaching and non-teaching vacancies at KITS Markapur."
    breadcrumb={[{ label: "Information", to: "/info" }, { label: "Jobs" }]}
    sidebar={infoCornerSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      Email your CV with the subject line "Application — [Position]" to{" "}
      <a href="mailto:careers@kits-anna.com" className="text-accent hover:underline">careers@kits-anna.com</a>
      {" "}before the application deadline.
    </p>

    {JOB_OPENINGS.length === 0 ? (
      <div className="not-prose rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
        <Briefcase className="size-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No openings at the moment. Please check back later.</p>
      </div>
    ) : (
      <div className="not-prose space-y-4">
        {JOB_OPENINGS.map((j) => (
          <div key={j.id} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="font-display text-lg font-semibold m-0">{j.title}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full border ${TYPE_STYLE[j.type]}`}>
                    {j.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-accent" /> {j.department} Department
                </p>
                <p className="text-sm text-foreground/85 mb-3"><span className="font-medium">Experience:</span> {j.experience}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5 text-accent" /> Posted: {fmt(j.postedAt)}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5 text-destructive" /> Apply by: {fmt(j.applyBy)}</span>
                </div>
              </div>
              <Button asChild className="rounded-sm shrink-0">
                <a href={`mailto:careers@kits-anna.com?subject=Application — ${encodeURIComponent(j.title)}`}>
                  Apply Now
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    )}
  </InfoPage>
);

export default JobOpenings;
