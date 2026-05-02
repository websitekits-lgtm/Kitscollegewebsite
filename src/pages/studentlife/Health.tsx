import { Stethoscope, Phone, MapPin, AlertTriangle } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { HEALTH } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const Health = () => (
  <InfoPage
    eyebrow="Student Life"
    title="Health Facilities"
    subtitle="On-campus dispensary, qualified medical officer, and tie-ups with nearby hospitals."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Health Facilities" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {HEALTH.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Stethoscope className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Facilities</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {HEALTH.facilities.map((f, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle className="size-5 text-destructive" />
        <h2 className="font-display text-xl font-semibold m-0">Emergency Contact</h2>
      </div>
      <ul className="space-y-2 text-sm">
        <li><span className="font-medium">Resident Medical Officer:</span> {HEALTH.emergency.medicalOfficer}</li>
        <li className="flex items-center gap-2"><Phone className="size-4 text-accent" /><a href={`tel:${HEALTH.emergency.phone}`} className="text-accent">{HEALTH.emergency.phone}</a></li>
        <li className="flex items-start gap-2"><MapPin className="size-4 text-accent shrink-0 mt-0.5" /><span>{HEALTH.emergency.nearestHospital}</span></li>
      </ul>
    </div>
  </InfoPage>
);

export default Health;
