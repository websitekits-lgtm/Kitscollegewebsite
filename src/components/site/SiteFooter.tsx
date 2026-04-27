import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { COLLEGE, DEPARTMENTS } from "@/lib/college";

export const SiteFooter = () => {
  return (
    <footer className="ink-bg text-primary-foreground">
      <div className="container-tight py-12 sm:py-14 md:py-16 grid gap-8 sm:gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <img
              src="/Kits logo.png"
              alt="KITS Markapur Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain shrink-0"
            />
            <div className="leading-snug">
              <div className="font-display font-semibold text-base sm:text-lg">{COLLEGE.shortName} Markapur</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">Since {COLLEGE.established}</div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4 sm:mb-5">
            A premier engineering institution shaping skilled, ethical and innovative engineers for tomorrow's industry.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="grid size-9 place-items-center rounded-sm border border-primary-foreground/15 hover:border-accent hover:text-accent transition-colors" aria-label="Social link">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">Explore</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-sm text-primary-foreground/75">
            {[
              ["About", "/about"],
              ["Academics", "/academics"],
              ["Admissions", "/admissions"],
              ["Placements", "/placements"],
              ["Campus Life", "/campus-life"],
              ["Gallery", "/gallery"],
              ["Research & NAAC", "/research"],
              ["Student Corner", "/student-corner"],
            ].map(([label, to]) => (
              <li key={to}><Link to={to} className="hover:text-accent transition-colors underline-grow">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">Departments</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-sm text-primary-foreground/75">
            {DEPARTMENTS.map((d) => (
              <li key={d.slug}>
                <Link to={`/departments/${d.slug}`} className="hover:text-accent transition-colors underline-grow">
                  {d.code} — {d.name.split(" & ")[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">Reach Us</h4>
          <ul className="space-y-3 sm:space-y-4 text-sm text-primary-foreground/80">
            <li className="flex gap-3">
              <MapPin className="size-4 mt-0.5 shrink-0 text-accent" />
              <span>{COLLEGE.address.line1}<br />{COLLEGE.address.line2}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 mt-0.5 shrink-0 text-accent" />
              <span>
                {COLLEGE.phones.map((p) => (
                  <a key={p} href={`tel:${p}`} className="block hover:text-accent">{p}</a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 mt-0.5 shrink-0 text-accent" />
              <a href={`mailto:${COLLEGE.email}`} className="hover:text-accent break-all">{COLLEGE.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5">
        <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/55">
          <p>© {new Date().getFullYear()} Krishna Chaitanya Institute of Technology & Sciences. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
