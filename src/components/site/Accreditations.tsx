import { SectionReveal } from "@/components/site/SectionReveal";

const accreditations = [
  { name: "AICTE", desc: "Approved", logo: "/All_India_Council_for_Technical_Education_logo.png" },
  { name: "JNTUK", desc: "Affiliated", logo: "/jntu-header.png" },
  { name: "NAAC", desc: "Accredited", logo: "/NAAC_LOGO.png" },
];

export const Accreditations = () => {
  return (
    <section className="bg-background bg-tint-soft border-t border-border py-10 sm:py-12 md:py-14">
      <SectionReveal className="container-tight" staggerChildren>
        <p data-reveal className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6 sm:mb-8">
          Recognised & Accredited By
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {accreditations.map((a) => (
            <div key={a.name} data-reveal className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-md border border-border bg-card hover:shadow-[var(--shadow-card)] transition-shadow">
              <img
                src={a.logo}
                alt={`${a.name} - ${a.desc}`}
                className="h-20 sm:h-24 md:h-28 lg:h-32 object-contain mb-3 sm:mb-4"
              />
              <div className="font-display text-lg sm:text-xl font-semibold text-foreground text-center">{a.name}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{a.desc}</div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
};
