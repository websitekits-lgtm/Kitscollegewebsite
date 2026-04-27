import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DEPARTMENTS } from "@/lib/college";
import cse from "@/assets/dept-cse.jpg";
import aiml from "@/assets/dept-aiml.jpg";
import ece from "@/assets/dept-ece.jpg";
import eee from "@/assets/dept-eee.jpg";
import mech from "@/assets/dept-mech.jpg";
import civil from "@/assets/dept-civil.jpg";
import library from "@/assets/campus-library.jpg";

const imageMap: Record<string, string> = { cse, aiml, ece, eee, mech, civil, library };

const AUTO_PLAY_MS = 5000;

export const DepartmentsGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEPARTMENTS.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + DEPARTMENTS.length) % DEPARTMENTS.length);
  };
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % DEPARTMENTS.length);
  };

  return (
    <section className="bg-background py-12 sm:py-14 md:py-16">
      <div className="container-tight">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Programs</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Seven departments. <span className="italic font-light text-muted-foreground">One ambition.</span>
            </h2>
          </div>
          <Link to="/departments" className="inline-flex items-center gap-2 text-sm font-medium underline-grow text-foreground">
            View all departments <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Carousel */}
        <div
          className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)] aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          {DEPARTMENTS.map((d, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={d.slug}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={imageMap[d.image]}
                  alt={d.name}
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                {/* Dark gradient — bottom-up on mobile, left-to-right on larger screens */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/10 sm:bg-gradient-to-r sm:via-primary/70 sm:to-primary/10 md:sm:via-primary/50 md:sm:to-transparent" />

                {/* Text overlay — bottom on mobile, LEFT on larger screens */}
                <div className="absolute inset-x-0 bottom-0 sm:inset-y-0 sm:left-0 sm:bottom-auto sm:w-3/5 flex flex-col justify-end sm:justify-center p-5 sm:p-8 md:p-14 lg:p-16">
                  <div
                    className={`transition-all duration-1000 delay-200 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-2 sm:mb-4 font-medium">
                      {d.code}
                    </p>
                    <h3 className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.05] tracking-tight mb-2 sm:mb-5">
                      {d.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-primary-foreground/85 leading-relaxed mb-4 sm:mb-8 max-w-xl line-clamp-2 sm:line-clamp-none">
                      {d.desc}
                    </p>
                    <Link
                      to={`/departments/${d.slug}`}
                      className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-xs sm:text-sm font-semibold"
                    >
                      Explore <span className="hidden sm:inline">Department</span> <ArrowUpRight className="size-3.5 sm:size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation arrows — bottom-right on desktop, smaller on mobile */}
          <button
            onClick={goPrev}
            aria-label="Previous department"
            className="absolute right-14 sm:right-20 bottom-3 sm:bottom-6 md:right-24 md:bottom-8 z-20 grid size-9 sm:size-11 place-items-center rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground hover:bg-accent hover:border-accent transition-colors"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next department"
            className="absolute right-3 sm:right-6 bottom-3 sm:bottom-6 md:right-8 md:bottom-8 z-20 grid size-9 sm:size-11 place-items-center rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground hover:bg-accent hover:border-accent transition-colors"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>

          {/* Progress indicator dots — hidden on small mobile, shown on sm+ */}
          <div className="hidden sm:flex absolute left-8 bottom-6 md:left-14 md:bottom-8 lg:left-16 z-20 items-center gap-2">
            {DEPARTMENTS.map((d, idx) => (
              <button
                key={d.slug}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${d.name}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === activeIndex
                    ? "w-10 bg-accent"
                    : "w-5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
