import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, TrendingUp, Building2, Trophy } from "lucide-react";
import { SectionReveal } from "@/components/site/SectionReveal";
import gradImg from "@/assets/campus-graduation.jpg";

const recruiters = [
  "TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Tech Mahindra",
  "HCL", "Capgemini", "L&T", "Hexaware", "Mindtree", "ZS Associates",
  "Deloitte", "Amazon", "IBM", "Hyundai", "Bosch", "Cyient",
];

export const PlacementsHighlight = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) setIsScrolling(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isScrolling]);

  return (
    <section className="bg-background bg-tint-secondary py-20 md:py-28">
      <SectionReveal className="container-tight" staggerChildren>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Placements</p>
            <h2 data-reveal className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-6">
              Careers that take off <span className="italic font-light text-muted-foreground">from day one.</span>
            </h2>
            <p data-reveal className="text-muted-foreground leading-relaxed mb-8">
              Our Training & Placement Cell drives industry readiness with year-round skilling, mock interviews, certifications, and a recruiter network spanning IT giants and core engineering majors.
            </p>

            <div data-reveal className="grid grid-cols-3 gap-px bg-border rounded-md overflow-hidden mb-8">
              {[
                { icon: TrendingUp, n: "12 LPA", l: "Highest Package" },
                { icon: Building2, n: "120+", l: "Recruiters" },
                { icon: Trophy, n: "92%", l: "Placement Rate" },
              ].map((s) => (
                <div key={s.l} className="bg-card p-5 text-center">
                  <s.icon className="size-5 text-accent mx-auto mb-2" />
                  <div className="font-display text-2xl font-semibold">{s.n}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            <Link
              data-reveal
              to="/placements"
              className="inline-flex items-center gap-2 text-sm font-medium underline-grow"
            >
              See placement report <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div data-reveal className="lg:col-span-7 relative">
            <div className="rounded-md overflow-hidden border border-border shadow-[var(--shadow-elegant)]">
              <img src={gradImg} alt="KITS graduates celebrating at convocation" loading="lazy" className="w-full h-auto block" />
            </div>
          </div>
        </div>

        {/* Recruiter marquee */}
        <div data-reveal className="mt-16 border-y border-border py-6 overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex gap-12 marquee whitespace-nowrap"
            style={{ animationPlayState: isScrolling ? "paused" : "running" }}
          >
            {[...recruiters, ...recruiters].map((r, i) => (
              <span key={i} className="font-display text-xl md:text-2xl font-medium text-muted-foreground/70 hover:text-foreground transition-colors">
                {r}
              </span>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
