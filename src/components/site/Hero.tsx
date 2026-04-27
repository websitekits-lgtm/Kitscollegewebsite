import { useEffect, useRef } from "react";
import gsap from "gsap";

const heroImgWebp = "/KITS-building-2023.webp";
const heroImgPng = "/KITS-building-2023-optimized.png";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-tag]", { y: 16, opacity: 0, duration: 0.8 })
        .from("[data-hero-line]", { y: 40, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.4")
        .from("[data-hero-sub]", { y: 16, opacity: 0, duration: 0.8 }, "-=0.5")
        .from("[data-hero-img]", { scale: 1.02, opacity: 0, duration: 1.4, ease: "power2.out" }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-background overflow-hidden h-auto md:h-[calc(100vh-84px)] md:min-h-[680px] flex flex-col justify-between pb-8 md:pb-0"
    >
      {/* Top color gradient — brand-colored ambient glow behind the heading */}
      <div className="absolute top-0 left-0 right-0 h-[55%] pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-secondary/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.18),_hsl(var(--secondary)/0.10)_40%,_transparent_70%)]" />
      </div>

      {/* Top-right partner/affiliation logo */}
      <img
        src="/logo-1700496934.webp"
        alt="Affiliation logo"
        className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-10 h-14 sm:h-20 md:h-32 lg:h-36 w-auto object-contain z-20"
        loading="eager"
      />

      {/* Top: College Name */}
      <div className="container-tight pt-20 sm:pt-12 md:pt-16 text-center relative z-10">
        <div data-hero-tag className="inline-flex items-center gap-2 sm:gap-3 mb-5 md:mb-6 max-w-full">
          <span className="h-px w-6 sm:w-8 bg-accent shrink-0" />
          <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground font-medium whitespace-nowrap">
            Established 2008 · Markapur
          </span>
          <span className="h-px w-6 sm:w-8 bg-accent shrink-0" />
        </div>

        <h1 className="font-display font-semibold tracking-tight text-foreground leading-[0.95]">
          <span data-hero-line className="block text-[28px] sm:text-4xl md:text-6xl lg:text-[5rem] uppercase">
            Krishna Chaitanya
          </span>
          <span data-hero-line className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-2 md:mt-3 italic font-light text-accent px-2">
            Institute of Technology &amp; Sciences
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-5 md:mt-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] text-muted-foreground"
        >
          Engineering Tomorrow&apos;s Leaders
        </p>
      </div>

      {/* Bottom: Image */}
      <div data-hero-img className="w-full relative z-10 mt-8 md:mt-0">
        <picture>
          <source srcSet={heroImgWebp} type="image/webp" />
          <img
            src={heroImgPng}
            alt="Krishna Chaitanya Institute of Technology & Sciences campus building"
            className="w-full h-auto block"
            loading="eager"
            decoding="async"
            // @ts-expect-error - fetchpriority is a valid HTML attribute but not yet typed in React
            fetchpriority="high"
          />
        </picture>
      </div>

      {/* EAPCET College Code — bottom center */}
      <div className="absolute bottom-3 sm:bottom-12 md:bottom-24 left-1/2 -translate-x-1/2 z-20">
        <div className="inline-flex items-center gap-2 sm:gap-3 rounded-lg bg-background/40 backdrop-blur-md border border-foreground/15 px-3 sm:px-5 py-1.5 sm:py-2.5 shadow-sm">
          <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-foreground/70 font-medium">
            EAPCET Code
          </span>
          <span className="h-3 sm:h-3.5 w-px bg-foreground/20" />
          <span className="text-xs sm:text-sm md:text-base font-display font-semibold text-foreground tracking-wider">
            KCIT
          </span>
        </div>
      </div>
    </section>
  );
};
