import { Users, Award } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { SEDG as SEDG_DATA } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const SEDG = () => (
  <InfoPage
    eyebrow="Student Life"
    title="SEDG Cell — Social Welfare Committee"
    subtitle="Support for students from socially and economically disadvantaged backgrounds."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "SEDG Cell" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {SEDG_DATA.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Initiatives</h2>
      </div>
      <ul className="space-y-2">
        {SEDG_DATA.initiatives.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/85">
            <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-sm leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Award className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Scholarship Schemes Supported</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {SEDG_DATA.schemes.map((s, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default SEDG;
