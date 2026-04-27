const partners = Array.from({ length: 16 }, (_, i) => `/c${i + 1}.png`);

// Duplicated for seamless looping
const loopPartners = [...partners, ...partners];

export const PlacementPartners = () => {
  return (
    <section className="relative bg-primary py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Heading (constrained) */}
      <div className="container-tight relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Recruiters</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-primary-foreground">
            Our Placement <span className="italic font-light text-primary-foreground/70">Partners.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-primary-foreground/70 text-balance">
            Industry leaders who recruit talent from our campus year after year.
          </p>
        </div>
      </div>

      {/* Scrolling logos row — full viewport width, edge-to-edge */}
      <div className="relative z-10">
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 z-10 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 z-10 bg-gradient-to-l from-primary to-transparent" />

        <div className="overflow-hidden">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 animate-partner-scroll w-max">
            {loopPartners.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="shrink-0 grid place-items-center h-20 sm:h-24 md:h-28 w-32 sm:w-40 md:w-48 rounded-xl bg-white border border-border/30 px-3 sm:px-5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <img
                  src={src}
                  alt={`Recruiter logo ${(idx % 16) + 1}`}
                  loading="lazy"
                  className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
