import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export const HomepagePopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Show popup once per browser session
  useEffect(() => {
    if (sessionStorage.getItem("kits_popup_shown")) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem("kits_popup_shown", "1");
    setClosing(true);
    setTimeout(() => setVisible(false), 280);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300",
        closing ? "opacity-0" : "opacity-100",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Admissions announcement"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transition-all duration-300",
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {/* Gradient header band */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent px-7 pt-8 pb-6 text-white">
          <button
            type="button"
            onClick={close}
            aria-label="Close announcement"
            className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <X className="size-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15">
              <GraduationCap className="size-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              Admissions Open
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold leading-snug">
            Join KITS for the Academic Year
          </h2>
          <p className="mt-1 text-3xl font-extrabold tracking-tight">2026 – 27</p>
        </div>

        {/* Body */}
        <div className="bg-card px-7 py-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Secure your seat at Krishna Chaitanya Institute of Technology &amp; Sciences.
            Limited seats available across B.Tech programmes. Apply online now — it only
            takes a few minutes.
          </p>

          <ul className="space-y-1.5">
            {[
              "B.Tech in CSE, AI&ML, ECE, EEE, Mechanical, Civil",
              "AICTE approved · NAAC accredited",
              "Scholarships available for eligible students",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 pt-1">
            <Link
              to="/admissions/apply"
              onClick={close}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Apply Now <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
