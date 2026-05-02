import { Heart, Users, Mail } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { NSS as NSS_DATA } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const NSS = () => (
  <InfoPage
    eyebrow="Student Life"
    title="National Service Scheme (NSS)"
    subtitle="Service-learning that builds civic awareness and leadership through community engagement."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "NSS" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-3">
      {NSS_DATA.intro}
    </p>
    <p className="not-prose text-sm uppercase tracking-[0.25em] text-accent font-bold mb-10">
      Motto — {NSS_DATA.motto}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Heart className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Activities</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {NSS_DATA.activities.map((a, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{a}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">NSS Units</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {NSS_DATA.units.map((u) => (
          <div key={u.name} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-base font-semibold mb-1">{u.name}</h3>
            <p className="text-sm text-muted-foreground">Strength: {u.strength} students</p>
            <p className="text-sm text-muted-foreground">Programme Officer: {u.faculty}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="not-prose rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold mb-3">Programme Officer</h3>
      <p className="text-foreground font-medium">{NSS_DATA.programmeOfficer.name}</p>
      <p className="text-sm text-muted-foreground mb-3">{NSS_DATA.programmeOfficer.designation}</p>
      <p className="flex items-center gap-2 text-sm">
        <Mail className="size-4 text-accent" />
        <a href={`mailto:${NSS_DATA.programmeOfficer.contact}`} className="text-foreground hover:text-accent">{NSS_DATA.programmeOfficer.contact}</a>
      </p>
    </div>
  </InfoPage>
);

export default NSS;
