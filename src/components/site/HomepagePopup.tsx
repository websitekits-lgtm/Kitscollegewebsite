import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

interface PopupContent {
  enabled: boolean;
  eyebrow: string;
  title: string;
  year_label: string;
  description: string;
  points: string[];
  apply_url: string;
}

const FALLBACK: PopupContent = {
  enabled: true,
  eyebrow: "Admissions Open",
  title: "Join KITS for the Academic Year",
  year_label: "2026 – 27",
  description:
    "Secure your seat at Krishna Chaitanya Institute of Technology & Sciences. Limited seats available across B.Tech programmes. Apply online now — it only takes a few minutes.",
  points: [
    "B.Tech in CSE, AI&ML, ECE, EEE, Mechanical, Civil",
    "AICTE approved · NAAC accredited",
    "Scholarships available for eligible students",
  ],
  apply_url: "/admissions/apply",
};

export const HomepagePopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [content, setContent] = useState<PopupContent>(FALLBACK);

  useEffect(() => {
    if (!supabase) return;
    supabase.from("homepage_popup").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setContent({ ...data, points: data.points ?? FALLBACK.points });
    });
  }, []);

  // Show popup once per browser session
  useEffect(() => {
    if (!content.enabled) return;
    if (sessionStorage.getItem("kits_popup_shown")) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, [content.enabled]);

  const close = () => {
    sessionStorage.setItem("kits_popup_shown", "1");
    setClosing(true);
    setTimeout(() => setVisible(false), 280);
  };

  if (!visible) return null;

  const isExternal = /^https?:\/\//.test(content.apply_url);

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
              {content.eyebrow}
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold leading-snug">
            {content.title}
          </h2>
          <p className="mt-1 text-3xl font-extrabold tracking-tight">{content.year_label}</p>
        </div>

        {/* Body */}
        <div className="bg-card px-7 py-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content.description}
          </p>

          <ul className="space-y-1.5">
            {content.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 pt-1">
            {isExternal ? (
              <a
                href={content.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Apply Now <ArrowRight className="size-4" />
              </a>
            ) : (
              <Link
                to={content.apply_url}
                onClick={close}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Apply Now <ArrowRight className="size-4" />
              </Link>
            )}
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
