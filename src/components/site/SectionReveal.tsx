import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** stagger child elements with [data-reveal] attribute */
  staggerChildren?: boolean;
  delay?: number;
  y?: number;
}

export const SectionReveal = ({ children, className, staggerChildren = false, delay = 0, y = 40 }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const targets = staggerChildren
      ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"))
      : [el];

    if (targets.length === 0) return;

    // Failsafe: if anything goes wrong, ensure elements are visible after 1.5s
    const failsafe = setTimeout(() => {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
    }, 1500);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: staggerChildren ? 0.08 : 0,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
            onEnter: () => clearTimeout(failsafe),
          },
        },
      );
    }, el);

    // Force a refresh to handle elements already in view on mount
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, [staggerChildren, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
