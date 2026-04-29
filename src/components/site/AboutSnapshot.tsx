import { Link } from "react-router-dom";
import { SectionReveal } from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const chairmanImg = "/c-image.png";
const secretaryImg = "/secretary-img-for-hm.png";

export const AboutSnapshot = () => {
  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Floating orbs background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[-100px] right-[-100px] sm:top-[-150px] sm:right-[-150px] w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] rounded-full blur-3xl animate-orb-1"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.85) 0%, hsl(var(--secondary) / 0.45) 30%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-100px] left-[-100px] sm:bottom-[-150px] sm:left-[-150px] w-[280px] sm:w-[450px] md:w-[550px] h-[280px] sm:h-[450px] md:h-[550px] rounded-full blur-3xl animate-orb-2"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.6) 30%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full blur-3xl animate-orb-3"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.45) 0%, transparent 70%)" }}
        />
      </div>

      <SectionReveal className="container-tight relative z-10" staggerChildren>
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Images on the left */}
          <div className="lg:col-span-7 lg:order-1 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 items-start">
            <div data-reveal className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-muted/30 shadow-[var(--shadow-card)]">
              <img src={chairmanImg} alt="Chairman of KITS Markapur" loading="lazy" className="w-full h-auto block" />
            </div>
            <div data-reveal className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-muted/30 shadow-[var(--shadow-card)]">
              <img src={secretaryImg} alt="Secretary of KITS Markapur" loading="lazy" className="w-full h-auto block" />
            </div>
          </div>

          {/* Content on the right */}
          <div className="lg:col-span-5 lg:order-2 lg:sticky lg:top-28">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">About KITS</p>
            <h2 data-reveal className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Driven by vision. <span className="italic font-light text-muted-foreground">Built on excellence.</span>
            </h2>
            <p data-reveal className="mt-5 md:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              A visionary, eminent personality and experienced mentor in the field of education, <span className="text-foreground font-medium">Sri Anna Venkata Rambabu</span> is the main driving force behind KITS College of Engineering &amp; Technology. The constant aim of KITS is to incorporate features of excellence in its campus.
            </p>
            <p data-reveal className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every effort is made to implement the best practices in the field of technical education. The management and staff at KITS take all the care to ensure that the institute serves the best to the expectations of the students and their parents.
            </p>
            <div data-reveal className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-sm">
                <Link to="/about">Our Story <ArrowUpRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm">
                <Link to="/academics">Academic Approach</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
