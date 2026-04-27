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
              className="group shrink-0 snap-start flex flex-col w-[260px] sm:w-[280px] md:w-[300px] rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
            >
              <Link to={`/events/${e.slug}`} className="block aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2.5">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3 text-accent" />
                    {formatEventDate(e.date)}
                  </span>
                  <span className="inline-block size-1 rounded-full bg-border" />
                  <span className="uppercase tracking-[0.18em] text-accent font-medium">
                    {e.category}
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
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all w-fit"
                >
                  Read more <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
