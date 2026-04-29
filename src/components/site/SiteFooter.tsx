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

const mapsHref = "https://maps.google.com/?q=Krishna+Chaitanya+Institute+of+Technology+Sciences+Markapur";

export const SiteFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    // Future: POST to admin/newsletter API
  };

  return (
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
          <p className="text-sm text-primary-foreground/70 leading-relaxed mb-5 max-w-md">
            A premier engineering institution shaping skilled, ethical and innovative engineers for
            tomorrow's industry. AICTE Approved · JNTUK Affiliated · NAAC Accredited.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, label: "Facebook", href: "#" },
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Youtube, label: "YouTube", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-9 place-items-center rounded-sm border border-primary-foreground/15 hover:border-accent hover:text-accent hover:bg-primary-foreground/5 transition-colors"
              >
                <Icon className="size-4" />
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
  );
};
