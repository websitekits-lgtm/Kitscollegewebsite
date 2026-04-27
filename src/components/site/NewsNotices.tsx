import { Megaphone, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionReveal } from "@/components/site/SectionReveal";

const notices = [
  { tag: "Admissions", date: "Apr 22, 2026", title: "B.Tech Admissions 2026–27 are now open. Register for early counselling." },
  { tag: "Event", date: "Apr 18, 2026", title: "Tech Fest 'Innovate 2026' — register your team by May 5." },
  { tag: "Placement", date: "Apr 12, 2026", title: "TCS NQT campus drive scheduled for final-year students." },
  { tag: "Notice", date: "Apr 09, 2026", title: "Mid-semester examination schedule released. Check Student Corner." },
  { tag: "Achievement", date: "Mar 28, 2026", title: "KITS team wins state-level Smart India Hackathon round." },
];

export const NewsNotices = () => {
  return (
    <section className="bg-background bg-tint-glow py-20 md:py-28">
      <SectionReveal className="container-tight" staggerChildren>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Updates</p>
            <h2 data-reveal className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              News & Notices
            </h2>
          </div>
          <Link data-reveal to="/student-corner" className="inline-flex items-center gap-2 text-sm font-medium underline-grow">
            All notices <ArrowRight className="size-4" />
          </Link>
        </div>

        <div data-reveal className="rounded-md border border-border overflow-hidden divide-y divide-border bg-card">
          {notices.map((n) => (
            <a
              key={n.title}
              href="#"
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center gap-2 sm:w-44 shrink-0">
                <Megaphone className="size-4 text-accent" />
                <span className="text-xs uppercase tracking-wider font-medium text-accent">{n.tag}</span>
              </div>
              <div className="flex items-center gap-2 sm:w-36 text-xs text-muted-foreground">
                <Calendar className="size-3.5" /> {n.date}
              </div>
              <div className="flex-1 text-sm md:text-base text-foreground/90 group-hover:text-foreground">{n.title}</div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
};
