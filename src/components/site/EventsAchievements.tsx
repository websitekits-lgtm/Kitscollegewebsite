import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { EVENTS, formatEventDate } from "@/lib/events";

export const EventsAchievements = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.clientWidth ?? 380;
    const gap = 24;
    const amount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-background bg-tint-secondary py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container-tight mb-6 sm:mb-8 md:mb-10">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">News</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Recent Events &amp; <span className="italic font-light text-muted-foreground">Achievements.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Wins, milestones and moments from across the campus.
          </p>
        </div>
      </div>

      {/* Arrows + Cards row — constrained to container width */}
      <div className="container-tight relative">
        {/* Left arrow — hidden on mobile, swipe instead */}
        <button
          type="button"
          onClick={() => scrollBy("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className="hidden sm:grid absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 size-11 md:size-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scrollBy("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className="hidden sm:grid absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 size-11 md:size-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Horizontal scroll row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-0 sm:px-12 md:px-16"
        >
          {EVENTS.map((e) => (
            <article
              key={e.slug}
              className="group relative shrink-0 snap-start flex flex-col w-[260px] sm:w-[280px] md:w-[300px] rounded-2xl overflow-hidden border-2 border-border bg-card shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.12)] hover:shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.25)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-500"
            >
              <Link to={`/events/${e.slug}`} className="block aspect-[16/10] overflow-hidden bg-muted relative">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category badge floating on image */}
                <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] rounded-full bg-accent text-accent-foreground shadow-md">
                  {e.category}
                </span>
                {/* Soft gradient at bottom of image for depth */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
              </Link>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-accent" />
                    <span className="font-medium">{formatEventDate(e.date)}</span>
                  </span>
                </div>

                <h3 className="font-display text-base md:text-lg font-semibold leading-snug mb-2.5 line-clamp-2">
                  <Link to={`/events/${e.slug}`} className="hover:text-accent transition-colors">
                    {e.title}
                  </Link>
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-grow">
                  {e.excerpt}
                </p>

                <Link
                  to={`/events/${e.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all w-fit border-t border-border/50 pt-3 -mx-5 px-5 mt-auto"
                >
                  Read more <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
