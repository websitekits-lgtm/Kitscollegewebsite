import { useEffect, useState } from "react";
import { GraduationCap, Heart, Briefcase, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/site/SectionReveal";
import { supabase } from "@/lib/supabaseClient";

/* ------------------------------------------------------------------ */
/*  Fallback data — used until/unless the admin adds testimonials       */
/*  in Supabase (Admin Dashboard → Testimonials)                       */
/* ------------------------------------------------------------------ */

const alumniFallback = [
  {
    quote: "KITS gave me the technical foundation and the confidence to crack a top MNC. The faculty genuinely care about your growth — not just grades.",
    name: "Sai Krishna Reddy",
    role: "B.Tech CSE '24 · Software Engineer, Infosys",
    initials: "SK",
  },
  {
    quote: "The robotics lab and project culture here gave me hands-on experience long before I entered the industry. I joined Bosch within a month of graduation.",
    name: "Anjali Rao",
    role: "B.Tech ECE '23 · Embedded Engineer, Bosch",
    initials: "AR",
  },
  {
    quote: "I cleared GATE on my first attempt thanks to the rigorous academic environment at KITS. The faculty pushed us to think deeper, not just pass exams.",
    name: "Venkata Suresh",
    role: "B.Tech EEE '22 · M.Tech, IIT Hyderabad",
    initials: "VS",
  },
  {
    quote: "KITS campus life — NSS, sports, tech fests — shaped my personality as much as my degree did. I come back every year to mentor juniors.",
    name: "Priya Nanduri",
    role: "B.Tech AIML '24 · Data Analyst, TCS",
    initials: "PN",
  },
  {
    quote: "The placement cell worked tirelessly for us. Mock interviews, aptitude sessions, resume reviews — nothing was left to chance.",
    name: "Ravi Teja Boyina",
    role: "B.Tech Mechanical '22 · Design Engineer, L&T",
    initials: "RT",
  },
  {
    quote: "From a small town to a multinational company — KITS was the bridge. The exposure to industry projects in my final year made all the difference.",
    name: "Mounika Yellu",
    role: "B.Tech Civil '23 · Site Engineer, NCC Ltd.",
    initials: "MY",
  },
];

const parentsFallback = [
  {
    quote: "As a parent, I wanted a campus that was safe, disciplined, and ambitious. KITS delivered on every count. My daughter blossomed here.",
    name: "Smt. Lakshmi Devi",
    role: "Parent of B.Tech ECE '23 graduate",
    initials: "LD",
  },
  {
    quote: "The faculty regularly updated us on our son's progress. I never felt out of the loop. He is now placed at Wipro — a dream come true.",
    name: "Sri Narasimha Rao",
    role: "Parent of B.Tech CSE '24 graduate",
    initials: "NR",
  },
  {
    quote: "The hostel facilities are clean and secure. The warden was responsive whenever I called. I could focus on work knowing my child was in safe hands.",
    name: "Smt. Padma Kumari",
    role: "Parent of B.Tech AIML '24 student",
    initials: "PK",
  },
  {
    quote: "We are from a rural background and had concerns about quality education. KITS exceeded every expectation. My son cleared campus interviews in his 7th semester.",
    name: "Sri Venkateswara Prasad",
    role: "Parent of B.Tech Mechanical '23 graduate",
    initials: "VP",
  },
  {
    quote: "The scholarship guidance from the accounts office saved us lakhs in fees. The staff were patient and thorough throughout the process.",
    name: "Smt. Savithri Devi",
    role: "Parent of B.Tech Civil '22 graduate",
    initials: "SD",
  },
];

const recruitersFallback = [
  {
    quote: "KITS students consistently stand out in our campus drives — technically sound, good communicators, and eager to learn. We recruit here every year.",
    name: "Rajesh Gupta",
    role: "HR Manager, Infosys Technologies",
    initials: "RG",
  },
  {
    quote: "The quality of final-year projects from KITS ECE students impressed our technical panel. We onboarded 12 students last year and they've all performed well.",
    name: "Meghana Srinivas",
    role: "Talent Acquisition Lead, Bosch India",
    initials: "MS",
  },
  {
    quote: "We look for problem solvers. KITS graduates come with a project mindset, not just a degree. That matters enormously in the real world.",
    name: "Anil Varma",
    role: "Campus Recruitment Head, TCS",
    initials: "AV",
  },
  {
    quote: "The placement cell is extremely professional — pre-screening is thorough, scheduling is smooth, and the students arrive well-prepared. A pleasure to partner with.",
    name: "Deepika Mohan",
    role: "HR Business Partner, Wipro",
    initials: "DM",
  },
  {
    quote: "KITS has one of the best civil and mechanical programmes in the region. The students we hired have grown into team leads within two years.",
    name: "Suresh Babu",
    role: "GM — HR, L&T Construction",
    initials: "SB",
  },
];

/* ------------------------------------------------------------------ */
/*  Tab config                                                           */
/* ------------------------------------------------------------------ */

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const FALLBACK_BY_CATEGORY: Record<TabId, TestimonialItem[]> = {
  alumni: alumniFallback,
  parents: parentsFallback,
  recruiters: recruitersFallback,
};

const TAB_META = [
  { id: "alumni",     label: "Alumni",     Icon: GraduationCap },
  { id: "parents",    label: "Parents",    Icon: Heart },
  { id: "recruiters", label: "Recruiters", Icon: Briefcase },
] as const;

type TabId = typeof TAB_META[number]["id"];

/* ------------------------------------------------------------------ */
/*  Component                                                            */
/* ------------------------------------------------------------------ */

export const Testimonials = () => {
  const [active, setActive] = useState<TabId>("alumni");
  const [dbData, setDbData] = useState<Record<string, TestimonialItem[]>>({});

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("testimonials")
      .select("category, quote, name, role, initials")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const grouped: Record<string, TestimonialItem[]> = {};
        for (const row of data) {
          (grouped[row.category] ??= []).push(row);
        }
        setDbData(grouped);
      });
  }, []);

  const currentData = dbData[active] ?? FALLBACK_BY_CATEGORY[active];

  return (
    <section className="bg-background border-t border-border py-10 sm:py-12 md:py-14">
      <SectionReveal className="container-tight">
        {/* Header + tabs in one compact row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-7" data-reveal>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-foreground/40 mb-1">Voices</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              What people say about KITS.
            </h2>
          </div>

          <div className="flex gap-2 flex-wrap shrink-0">
            {TAB_META.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                  active === id
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-secondary border border-border text-foreground/60 hover:text-foreground hover:border-accent/30",
                )}
              >
                <Icon className="size-3.5 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div
          key={active}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in"
        >
          {currentData.map((t) => (
            <figure
              key={t.name}
              className="rounded-lg border border-border bg-secondary/40 p-4 sm:p-5 flex flex-col hover:bg-secondary/70 transition-colors duration-200"
            >
              <Quote className="size-5 text-accent/50 mb-2.5 shrink-0" />

              <blockquote className="text-[13px] sm:text-sm text-foreground/80 leading-relaxed flex-1">
                {t.quote}
              </blockquote>

              <figcaption className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2.5">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-[11px] font-bold">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-[13px] text-foreground truncate">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
};
