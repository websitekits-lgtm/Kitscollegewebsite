import { BookOpen, Monitor, Library as LibraryIcon, Users, Image as ImageIcon, Clock } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { LIBRARY_OVERVIEW } from "@/lib/libraryContent";
import { librarySidebar } from "./LibrarySidebar";

const cards: LinkCard[] = [
  { label: "About Library",        description: "History, infrastructure, rules, and reading hours.",                     to: "/library/about",     icon: LibraryIcon },
  { label: "Digital Library",       description: "E-journals, e-books, video lectures and online databases.",              to: "/library/digital",   icon: Monitor },
  { label: "Resources & Services", description: "Collections, lending, reference, and reprographic services.",             to: "/library/resources", icon: BookOpen },
  { label: "Library Staff",         description: "Meet the librarian and supporting team.",                                 to: "/library/staff",     icon: Users },
  { label: "Gallery",                description: "Photo gallery of reading halls, digital wing, and library events.",     to: "/library/gallery",   icon: ImageIcon },
];

const Library = () => (
  <InfoPage
    eyebrow="Knowledge Hub"
    title="Central Library"
    subtitle="A modern, well-stocked, and student-friendly library that fuels learning and research at KITS."
    breadcrumb={[{ label: "Central Library" }]}
    sidebar={librarySidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
      {LIBRARY_OVERVIEW.intro}
    </p>

    <div className="not-prose mb-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {LIBRARY_OVERVIEW.stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
          <p className="font-display text-xl sm:text-2xl font-semibold text-accent">{s.value}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="not-prose mb-10 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-2">
        <Clock className="size-5 text-accent" />
        <h2 className="font-display text-lg font-semibold m-0">Library Hours</h2>
      </div>
      <p className="text-foreground/85">{LIBRARY_OVERVIEW.hours}</p>
    </div>

    <div className="not-prose">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Explore Library</h2>
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default Library;
