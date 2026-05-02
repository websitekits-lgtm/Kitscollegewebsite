import { Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { IQAC_COMMITTEE } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const IqacCommittee = () => (
  <InfoPage
    eyebrow="IQAC"
    title="IQAC Committee"
    subtitle="Members who guide and oversee the quality enhancement initiatives at KITS."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "Committee" }]}
    sidebar={iqacSidebar}
  >
    <div className="not-prose">
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
            {IQAC_COMMITTEE.map((m, i) => (
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

export default IqacCommittee;
