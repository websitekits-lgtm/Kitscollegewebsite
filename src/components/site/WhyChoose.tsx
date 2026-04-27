export const WhyChoose = () => {
  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Brand gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/5 to-secondary/10" />
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container-tight relative">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Experience KITS</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Campus <span className="italic font-light text-muted-foreground">Tour.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground text-balance">
            Take a walk through our Markapur campus — labs, classrooms, hostels, and life beyond curriculum.
          </p>
        </div>

        {/* Video */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)] bg-primary">
          <video
            src="/KITS-MARKAPUR.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-auto block pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};
