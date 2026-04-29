import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  Clock,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { COLLEGE, DEPARTMENTS } from "@/lib/college";

const exploreLinks: Array<[string, string]> = [
  ["About KITS", "/about"],
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Placements", "/placements"],
  ["Campus Life", "/campus-life"],
  ["Gallery", "/gallery"],
  ["Research & NAAC", "/research"],
  ["Student Corner", "/student-corner"],
];

const legalLinks: Array<[string, string]> = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Use", "/terms"],
  ["Sitemap", "/sitemap"],
];

const faqs: Array<{ q: string; a: string }> = [
  {
    q: "What is the EAPCET code for KITS Markapur?",
    a: "The EAPCET code for Krishna Chaitanya Institute of Technology & Sciences is KCIT. Use this code during web counselling to apply.",
  },
  {
    q: "Which B.Tech branches are offered at KITS?",
    a: "KITS offers B.Tech in Computer Science & Engineering (CSE), Artificial Intelligence & Data Science (AI/ML), Electronics & Communication Engineering (ECE), Electrical & Electronics Engineering (EEE), Mechanical Engineering, Civil Engineering, and Humanities & Sciences.",
  },
  {
    q: "Is KITS approved by AICTE and affiliated to JNTUK?",
    a: "Yes — KITS Markapur is AICTE Approved, JNTU Kakinada Affiliated, and NAAC Accredited.",
  },
  {
    q: "Where is KITS located?",
    a: "KITS is located at Devarajugattu Village, Peddaaraveedu Mandal, Markapur — 523316, Prakasam District, Andhra Pradesh, India.",
  },
  {
    q: "Does KITS have hostel facilities?",
    a: "Yes — separate hostel facilities are available for boys and girls within the campus, with mess, internet and 24/7 security.",
  },
  {
    q: "How can I contact the admissions office?",
    a: `Call us at ${COLLEGE.phones.join(" / ")} or email ${COLLEGE.email}. Office hours are Monday to Saturday, 9:00 AM to 5:00 PM.`,
  },
];

const mapsHref = "https://maps.google.com/?q=Krishna+Chaitanya+Institute+of+Technology+Sciences+Markapur";

export const SiteFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      {/* FAQ section — separate, lighter card-style band before the dark footer */}
      <section className="bg-secondary/5 border-y border-border py-14 md:py-20">
        <div className="container-tight grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">FAQs</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
              Frequently asked <span className="italic font-light text-muted-foreground">questions.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Quick answers to the most common questions about admissions, programs, fees and life at KITS Markapur.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <li key={f.q} className="border-b border-border last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-secondary/5 transition-colors"
                    >
                      <span className="font-medium text-sm sm:text-base text-foreground">
                        {f.q}
                      </span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ink-bg text-primary-foreground">
        {/* Newsletter band */}
        <div className="border-b border-primary-foreground/10">
          <div className="container-tight py-10 sm:py-12 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Stay Connected</p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-balance">
                Get campus updates,{" "}
                <span className="italic font-light text-primary-foreground/70">
                  straight to your inbox.
                </span>
              </h3>
            </div>
            <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row items-stretch gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-sm border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent focus:bg-primary-foreground/10 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                {subscribed ? "Subscribed!" : "Subscribe"} <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="container-tight py-12 sm:py-14 md:py-16 grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Branding + about */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/kits-logo.png"
                alt="KITS Markapur Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain shrink-0"
              />
              <div className="leading-snug">
                <div className="font-display font-semibold text-base sm:text-lg">
                  {COLLEGE.shortName} Markapur
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">
                  Since {COLLEGE.established}
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6 max-w-md">
              A premier engineering institution shaping skilled, ethical and innovative engineers for
              tomorrow's industry. AICTE Approved · JNTUK Affiliated · NAAC Accredited.
            </p>
            {/* Social icons — solid backgrounds + hover animations */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: "#", hover: "hover:bg-[#1877F2]" },
                { Icon: Instagram, label: "Instagram", href: "#", hover: "hover:bg-gradient-to-tr hover:from-[#FF6B6B] hover:via-[#C13584] hover:to-[#833AB4]" },
                { Icon: Youtube, label: "YouTube", href: "#", hover: "hover:bg-[#FF0000]" },
                { Icon: Linkedin, label: "LinkedIn", href: "#", hover: "hover:bg-[#0A66C2]" },
              ].map(({ Icon, label, href, hover }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group grid size-10 place-items-center rounded-full bg-primary-foreground/10 border border-primary-foreground/15 text-primary-foreground hover:text-white hover:border-transparent hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${hover}`}
                >
                  <Icon className="size-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">Explore</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-primary-foreground/75">
              {exploreLinks.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">Departments</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-primary-foreground/75">
              {DEPARTMENTS.map((d) => (
                <li key={d.slug}>
                  <Link to={`/departments/${d.slug}`} className="hover:text-accent transition-colors">
                    {d.code} — {d.name.split(" & ")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">Reach Us</h4>
            <ul className="space-y-3.5 text-sm text-primary-foreground/80">
              <li className="flex gap-3">
                <MapPin className="size-4 mt-0.5 shrink-0 text-accent" />
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors group"
                >
                  {COLLEGE.address.line1}
                  <br />
                  {COLLEGE.address.line2}
                  <span className="inline-flex items-center gap-1 mt-1 text-xs text-accent">
                    View on map <ExternalLink className="size-3" />
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="size-4 mt-0.5 shrink-0 text-accent" />
                <span>
                  {COLLEGE.phones.map((p) => (
                    <a key={p} href={`tel:${p}`} className="block hover:text-accent transition-colors">
                      {p}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 mt-0.5 shrink-0 text-accent" />
                <a
                  href={`mailto:${COLLEGE.email}`}
                  className="hover:text-accent transition-colors break-all"
                >
                  {COLLEGE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="size-4 mt-0.5 shrink-0 text-accent" />
                <span className="text-primary-foreground/75">
                  Mon&ndash;Sat: 9:00 AM &ndash; 5:00 PM
                  <br />
                  <span className="text-xs">Sunday: Closed</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 py-5">
          <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/55">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Krishna Chaitanya Institute of Technology &amp; Sciences. All rights reserved.
            </p>
            <ul className="flex items-center gap-4 sm:gap-5">
              {legalLinks.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
