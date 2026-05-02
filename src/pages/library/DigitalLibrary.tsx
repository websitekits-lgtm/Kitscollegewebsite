import { Monitor, Database } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { DIGITAL_LIBRARY } from "@/lib/libraryContent";
import { librarySidebar } from "./LibrarySidebar";

const ACCESS_STYLE: Record<string, string> = {
  "Subscribed":   "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  "Open":          "bg-blue-500/15 text-blue-700 border-blue-500/30",
  "Free":          "bg-purple-500/15 text-purple-700 border-purple-500/30",
  "Campus-wide":   "bg-amber-500/15 text-amber-700 border-amber-500/30",
};
const accessClass = (a: string) => {
  if (a.startsWith("Open")) return ACCESS_STYLE["Open"];
  return ACCESS_STYLE[a] ?? "bg-secondary/30 text-foreground/70 border-border";
};

const DigitalLibrary = () => (
  <InfoPage
    eyebrow="Central Library"
    title="Digital Library"
    subtitle="24/7 access to e-books, e-journals, video lectures, and online databases."
    breadcrumb={[{ label: "Library", to: "/library" }, { label: "Digital Library" }]}
    sidebar={librarySidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {DIGITAL_LIBRARY.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Database className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Online Databases & Resources</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/10">
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Resource</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden md:table-cell">Description</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Access</th>
            </tr>
          </thead>
          <tbody>
            {DIGITAL_LIBRARY.resources.map((r) => (
              <tr key={r.name} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.description}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full border ${accessClass(r.access)}`}>
                    {r.access}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Monitor className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Facilities</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {DIGITAL_LIBRARY.facilities.map((f, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default DigitalLibrary;
