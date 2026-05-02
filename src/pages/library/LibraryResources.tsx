import { BookOpen, Wrench } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LIBRARY_RESOURCES } from "@/lib/libraryContent";
import { librarySidebar } from "./LibrarySidebar";

const LibraryResources = () => (
  <InfoPage
    eyebrow="Central Library"
    title="Resources & Services"
    subtitle="A growing collection and a full suite of services for students, faculty, and researchers."
    breadcrumb={[{ label: "Library", to: "/library" }, { label: "Resources" }]}
    sidebar={librarySidebar}
  >
    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Collections</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {LIBRARY_RESOURCES.collections.map((c) => (
          <div key={c.category} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <span className="text-sm font-medium">{c.category}</span>
            <span className="font-display text-base font-semibold text-accent">{c.count}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Wrench className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Services</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {LIBRARY_RESOURCES.services.map((s, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default LibraryResources;
