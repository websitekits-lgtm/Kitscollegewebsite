import { Link } from "react-router-dom";
import { ArrowUpRight, ClipboardList, Bell } from "lucide-react";
import { SectionReveal } from "@/components/site/SectionReveal";

type BoardTag = "New" | "Schedule" | "Results" | "Syllabus" | "Notice" | "Update" | "Event";

interface BoardItem {
  id: number;
  title: string;
  date: string;
  tag: BoardTag;
  href?: string;
}

const examinations: BoardItem[] = [
  { id: 1, title: "B.Tech IV-Year I-Sem regular/supplementary exam timetable released", date: "2025-04-22", tag: "Schedule" },
  { id: 2, title: "II B.Tech II-Sem mid-2 exam schedule", date: "2025-04-18", tag: "Schedule" },
  { id: 3, title: "Lab external exam allotment notice — All branches", date: "2025-04-12", tag: "Notice" },
  { id: 4, title: "Revaluation results for III-Year I-Sem", date: "2025-04-05", tag: "Results" },
  { id: 5, title: "Hall-tickets download link active for all students", date: "2025-03-28", tag: "New" },
  { id: 6, title: "Supplementary exam fee notification (last date extended)", date: "2025-03-20", tag: "Update" },
];

const notifications: BoardItem[] = [
  { id: 1, title: "Admissions open for B.Tech 2025–26 academic year — Apply now", date: "2025-04-25", tag: "New" },
  { id: 2, title: "TCS, Infosys, Wipro on-campus drive scheduled for May", date: "2025-04-20", tag: "Event" },
  { id: 3, title: "Annual sports & cultural fest — KITS Spandana 2025", date: "2025-04-15", tag: "Event" },
  { id: 4, title: "Faculty Development Programme on AI & ML — May 5–10", date: "2025-04-08", tag: "Event" },
  { id: 5, title: "Anti-ragging committee meeting — All departments", date: "2025-03-30", tag: "Notice" },
  { id: 6, title: "Holiday notice for Ugadi & Sri Rama Navami celebrations", date: "2025-03-25", tag: "Notice" },
];

const TAG_STYLES: Record<BoardTag, string> = {
  New:      "bg-accent/15 text-accent border-accent/30",
  Schedule: "bg-secondary/15 text-secondary border-secondary/30",
  Results:  "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  Syllabus: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  Notice:   "bg-amber-500/15 text-amber-700 border-amber-500/30",
  Update:   "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Event:    "bg-pink-500/15 text-pink-700 border-pink-500/30",
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const Board = ({
  title,
  icon: Icon,
  items,
  viewAllHref,
}: {
  title: string;
  icon: typeof Bell;
  items: BoardItem[];
  viewAllHref: string;
}) => (
  <div data-reveal className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-primary text-primary-foreground">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="grid size-8 sm:size-9 place-items-center rounded-md bg-accent/20 shrink-0">
          <Icon className="size-4 text-accent" />
        </div>
        <h3 className="font-display text-base sm:text-lg font-semibold truncate">{title}</h3>
      </div>
      <Link
        to={viewAllHref}
        className="text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 shrink-0"
      >
        <span className="hidden sm:inline">View all</span>
        <span className="sm:hidden">All</span>
        <ArrowUpRight className="size-3.5" />
      </Link>
    </div>

    {/* Scrollable list of items */}
    <div className="relative h-72 sm:h-80 overflow-hidden group">
      <div className="absolute inset-x-0 top-0 flex flex-col animate-board-scroll group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, idx) => (
          <a
            key={`${item.id}-${idx}`}
            href={item.href ?? "#"}
            className="block px-4 sm:px-5 py-3 sm:py-4 border-b border-border hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start gap-2 mb-1.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full border shrink-0 ${TAG_STYLES[item.tag]}`}
              >
                {item.tag}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-0.5">
                {formatDate(item.date)}
              </span>
            </div>
            <p className="text-sm text-foreground leading-snug line-clamp-2">{item.title}</p>
          </a>
        ))}
      </div>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-card to-transparent pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  </div>
);

export const BoardsSection = () => {
  return (
    <section className="bg-background bg-tint-soft py-12 sm:py-16 md:py-20 lg:py-28 border-t border-border">
      <SectionReveal className="container-tight" staggerChildren>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Stay Updated</p>
          <h2 data-reveal className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Examinations &amp; <span className="italic font-light text-muted-foreground">Notifications.</span>
          </h2>
          <p data-reveal className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Latest exam schedules, results, and important announcements — all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          <Board
            title="Examinations Board"
            icon={ClipboardList}
            items={examinations}
            viewAllHref="/student-corner"
          />
          <Board
            title="Notifications Board"
            icon={Bell}
            items={notifications}
            viewAllHref="/student-corner"
          />
        </div>
      </SectionReveal>
    </section>
  );
};
