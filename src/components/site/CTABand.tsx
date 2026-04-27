import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "./SectionReveal";

export const CTABand = ({
  eyebrow = "Ready to Begin?",
  title = "Your future in engineering starts here.",
  description = "Join the next generation of innovators at KITS Markapur. Applications are open.",
  primary = { label: "Apply Now", to: "/admissions" },
  secondary = { label: "Talk to Us", to: "/contact" },
  children,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  children?: ReactNode;
}) => {
  return (
    <section className="ink-bg text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-accent/10 blur-3xl" />
      </div>
      <SectionReveal className="container-tight relative py-12 sm:py-16 md:py-20 lg:py-28 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3 sm:mb-4" data-reveal>{eyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl mx-auto text-balance" data-reveal>
          {title}
        </h2>
        <p className="mt-4 sm:mt-5 max-w-xl mx-auto text-sm sm:text-base text-primary-foreground/70 text-balance" data-reveal>{description}</p>
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3" data-reveal>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm h-11 sm:h-12 px-6 sm:px-7">
            <Link to={primary.to}>
              {primary.label} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm h-11 sm:h-12 px-6 sm:px-7">
            <Link to={secondary.to}>{secondary.label}</Link>
          </Button>
        </div>
        {children}
      </SectionReveal>
    </section>
  );
};
