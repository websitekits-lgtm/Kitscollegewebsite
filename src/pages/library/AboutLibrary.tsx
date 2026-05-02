import { LibraryBig, ListChecks } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LIBRARY_ABOUT } from "@/lib/libraryContent";
import { librarySidebar } from "./LibrarySidebar";

const AboutLibrary = () => (
  <InfoPage
    eyebrow="Central Library"
    title="About the Central Library"
    subtitle="Our learning hub — history, infrastructure, and operational guidelines."
    breadcrumb={[{ label: "Library", to: "/library" }, { label: "About Library" }]}
    sidebar={librarySidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {LIBRARY_ABOUT.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <LibraryBig className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Features</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {LIBRARY_ABOUT.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Library Rules</h2>
      </div>
      <ol className="space-y-3">
        {LIBRARY_ABOUT.rules.map((r, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{r}</span>
          </li>
        ))}
      </ol>
    </div>
  </InfoPage>
);

export default AboutLibrary;
