import { Trophy, Mail, Activity } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { SPORTS } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const Sports = () => (
  <InfoPage
    eyebrow="Student Life"
    title="Sports & Games"
    subtitle="Building healthy bodies and competitive spirits through sports."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Sports & Games" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {SPORTS.intro}
    </p>

    <div className="not-prose grid gap-5 md:grid-cols-2 mb-10">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="size-5 text-accent" />
          <h2 className="font-display text-xl font-semibold m-0">Facilities</h2>
        </div>
        <ul className="space-y-2">
          {SPORTS.facilities.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
              <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="size-5 text-accent" />
          <h2 className="font-display text-xl font-semibold m-0">Activities</h2>
        </div>
        <ul className="space-y-2">
          {SPORTS.activities.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
              <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="not-prose rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold mb-3">Physical Director</h3>
      <p className="text-foreground font-medium">{SPORTS.director.name}</p>
      <p className="text-sm text-muted-foreground mb-3">{SPORTS.director.designation}</p>
      <p className="flex items-center gap-2 text-sm">
        <Mail className="size-4 text-accent" />
        <a href={`mailto:${SPORTS.director.contact}`} className="text-foreground hover:text-accent">{SPORTS.director.contact}</a>
      </p>
    </div>
  </InfoPage>
);

export default Sports;
