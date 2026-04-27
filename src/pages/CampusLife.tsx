import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { BedDouble, Bus, BookOpen, Trophy, Music, Utensils } from "lucide-react";
import library from "@/assets/campus-library.jpg";
import lab from "@/assets/campus-lab.jpg";
import grad from "@/assets/campus-graduation.jpg";
import campus from "@/assets/hero-campus.jpg";

const facilities = [
  { icon: BedDouble, t: "Hostel", d: "Separate boys' & girls' hostels with safe, hygienic and supervised living." },
  { icon: BookOpen, t: "Library", d: "30,000+ titles, e-journals, digital library, and quiet study zones." },
  { icon: Trophy, t: "Sports", d: "Cricket, volleyball, basketball, athletics and indoor games." },
  { icon: Bus, t: "Transport", d: "Fleet of buses connecting Markapur and surrounding towns." },
  { icon: Music, t: "Clubs & Culture", d: "Tech clubs, cultural fests, NSS and student-led communities." },
  { icon: Utensils, t: "Dining", d: "Hygienic mess with diverse, nutritious and home-style menus." },
];

const CampusLife = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Campus Life"
        title="A campus that feels like a second home."
        subtitle="Modern facilities, vibrant student communities, and a culture that prizes both academic ambition and personal growth."
        breadcrumb={[{ label: "Campus Life" }]}
      />

      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden" staggerChildren>
          {facilities.map((f) => (
            <div key={f.t} data-reveal className="bg-background p-7">
              <div className="size-11 rounded-sm border border-accent/30 bg-accent/5 grid place-items-center text-accent mb-4">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </SectionReveal>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid grid-cols-2 md:grid-cols-4 gap-4" staggerChildren>
          {[campus, library, lab, grad, library, lab, campus, grad].map((src, i) => (
            <div data-reveal key={i} className={`overflow-hidden rounded-md border border-border ${i % 3 === 0 ? "row-span-2 aspect-[3/4] md:aspect-[3/4]" : "aspect-square"}`}>
              <img src={src} alt={`KITS campus moment ${i + 1}`} loading="lazy" className="size-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default CampusLife;
