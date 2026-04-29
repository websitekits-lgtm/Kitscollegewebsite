import { ReactNode } from "react";

// Previously used GSAP ScrollTrigger to fade-in sections on scroll.
// Removed because it caused a brief "blink" (opacity 0 → 1) on each section
// as the user scrolled, hurting perceived smoothness.
// This component now just passes children through with the same className —
// kept as a wrapper so the dozens of existing usages don't need to change.

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** kept for API compatibility — no longer used */
  staggerChildren?: boolean;
  /** kept for API compatibility — no longer used */
  delay?: number;
  /** kept for API compatibility — no longer used */
  y?: number;
}

export const SectionReveal = ({ children, className }: SectionRevealProps) => {
  return <div className={className}>{children}</div>;
};
