import { Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LIBRARY_STAFF } from "@/lib/libraryContent";
import { librarySidebar } from "./LibrarySidebar";

const LibraryStaff = () => (
  <InfoPage
    eyebrow="Central Library"
    title="Library Staff"
    subtitle="The team behind the smooth functioning of our central library."
    breadcrumb={[{ label: "Library", to: "/library" }, { label: "Staff" }]}
    sidebar={librarySidebar}
  >
    <div className="not-prose mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Team Members</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/10">
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Name</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Designation</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Qualifications</th>
            </tr>
          </thead>
          <tbody>
            {LIBRARY_STAFF.map((s, i) => (
              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.designation}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{s.qualifications}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default LibraryStaff;
