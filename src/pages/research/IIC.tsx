import { Lightbulb, Users, ListChecks } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { IIC as IIC_DATA } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const IIC = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Institution's Innovation Council"
    subtitle="An MoE-MIC and AICTE recognised body driving innovation, IPR awareness, and entrepreneurship at KITS."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "IIC" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {IIC_DATA.intro}
    </p>

    <div className="not-prose mb-8">
      <div className="flex items-center gap-3 mb-5">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Objectives</h2>
      </div>
      <ul className="space-y-3">
        {IIC_DATA.objectives.map((o, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <Lightbulb className="size-4 mt-0.5 shrink-0 text-accent" />
            <span className="text-sm text-foreground/85 leading-relaxed">{o}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-5">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Council Members</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/10">
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Name</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Designation</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Role</th>
            </tr>
          </thead>
          <tbody>
            {IIC_DATA.council.map((m, i) => (
              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{m.designation}</td>
                <td className="px-4 py-3 text-accent font-medium">{m.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default IIC;
