import { SectionReveal } from "@/components/site/SectionReveal";

const testimonials = [
  {
    quote: "KITS transformed not only my technical skills but my outlook. The faculty mentors are accessible, and the placement support is outstanding.",
    name: "Sai Krishna",
    role: "B.Tech CSE '24 · Software Engineer at Infosys",
  },
  {
    quote: "As a parent, I wanted a campus that was safe, disciplined and ambitious. KITS delivered on every count. My daughter blossomed here.",
    name: "Mrs. Lakshmi Devi",
    role: "Parent of ECE '23 graduate",
  },
  {
    quote: "The robotics lab and project culture at KITS gave me hands-on confidence long before I entered the industry.",
    name: "Anjali R.",
    role: "B.Tech ECE '24 · Embedded Engineer at Bosch",
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-secondary py-12 sm:py-16 md:py-20 lg:py-28">
      <SectionReveal className="container-tight" staggerChildren>
        <div className="max-w-2xl mb-8 sm:mb-10 md:mb-14">
          <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Voices</p>
          <h2 data-reveal className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            What students and parents say.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-reveal
              className="rounded-md border border-border bg-background p-5 sm:p-6 md:p-7 flex flex-col"
            >
              <div className="font-display text-2xl sm:text-3xl text-accent leading-none mb-3 sm:mb-4">"</div>
              <blockquote className="text-sm sm:text-base text-foreground/90 leading-relaxed flex-1">{t.quote}</blockquote>
              <figcaption className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-border">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
};
