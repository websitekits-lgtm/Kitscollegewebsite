import { Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { RESEARCH_COMMITTEE } from "@/lib/researchContent";
import { researchSidebar } from "./ResearchSidebar";

const ResearchCommittee = () => (
  <InfoPage
    eyebrow="Research & Development"
    title="Research Committee"
    subtitle="The committee that defines research priorities, reviews proposals, and supports faculty in pursuing high-impact research."
    breadcrumb={[{ label: "Research", to: "/research" }, { label: "Committee" }]}
    sidebar={researchSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
      The Research Committee at KITS is chaired by the Principal and brings together Heads of
      Departments along with industry experts. It meets every quarter to evaluate sponsored project
      proposals, allocate seed grants, and align research priorities with national missions.
    </p>
    <div className="not-prose mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Members</h2>
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
            {RESEARCH_COMMITTEE.map((m, i) => (
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

export default ResearchCommittee;
