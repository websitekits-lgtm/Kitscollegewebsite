import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Download, IndianRupee, GraduationCap, Calendar } from "lucide-react";

const Admissions = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Admissions 2025–26"
        title="Take the next step. Build the career you've imagined."
        subtitle="Applications are open across all B.Tech programs. Scholarships available for meritorious and economically eligible students."
        breadcrumb={[{ label: "Admissions" }]}
      />

      {/* Eligibility & Process */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight grid lg:grid-cols-2 gap-10" staggerChildren>
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Eligibility</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">Who can apply?</h2>
            <ul className="space-y-3 text-foreground/90">
              {[
                "Pass in 10+2 with PCM (Physics, Chemistry, Mathematics) from a recognised board.",
                "Minimum aggregate of 45% (40% for reserved categories) in PCM.",
                "Valid AP EAPCET / JEE Main rank for B.Tech admissions.",
                "Lateral Entry: Diploma holders via AP ECET in respective branch.",
              ].map((i) => (
                <li key={i} className="flex gap-3"><CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />{i}</li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">How to apply</h2>
            <ol className="space-y-5">
              {[
                ["Register Online", "Fill the inquiry form below or call our admissions office."],
                ["Counselling", "Attend AP EAPCET / ECET counselling and choose KITS Markapur."],
                ["Document Verification", "Submit your originals and pay admission fee at our campus."],
                ["Welcome to KITS", "Complete your enrollment and begin your engineering journey."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <div className="size-9 rounded-sm bg-accent text-accent-foreground grid place-items-center font-display font-semibold shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-medium">{t}</h3>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SectionReveal>
      </section>

      {/* Fees & Scholarships */}
      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid md:grid-cols-3 gap-6" staggerChildren>
          {[
            { icon: IndianRupee, t: "Fee Structure", d: "Transparent and affordable. Government convenor + management quota fees published per JNTUK norms." },
            { icon: GraduationCap, t: "Scholarships", d: "Merit, ePass, Jagananna Vidya Deevena and minority scholarships supported." },
            { icon: Calendar, t: "Important Dates", d: "Inquiry open year-round. Counselling typically June–August." },
          ].map((c) => (
            <div key={c.t} data-reveal className="rounded-md border border-border bg-background p-7">
              <c.icon className="size-6 text-accent mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
          <div data-reveal className="md:col-span-3 flex flex-wrap gap-3 justify-center pt-4">
            <Button className="rounded-sm" size="lg"><Download className="size-4" /> Download Brochure</Button>
            <Button variant="outline" className="rounded-sm" size="lg">Fee Details (PDF)</Button>
          </div>
        </SectionReveal>
      </section>

      {/* Inquiry form */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight max-w-3xl mx-auto" staggerChildren>
          <div data-reveal className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Inquiry</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">Talk to our admissions team</h2>
            <p className="mt-3 text-muted-foreground">We'll get back to you within 24 hours.</p>
          </div>

          <form data-reveal onSubmit={(e) => e.preventDefault()} className="rounded-md border border-border bg-card p-7 md:p-9 grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Student Name</Label>
              <Input id="name" placeholder="Full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+91 ..." required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Interested Program</Label>
              <Input id="program" placeholder="e.g. B.Tech CSE" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Your city" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" rows={4} placeholder="Tell us a bit about your goals (optional)" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">Submit Inquiry</Button>
            </div>
          </form>
        </SectionReveal>
      </section>

      <CTABand title="Seats are limited. Don't miss your chance." description="Apply now and join the next cohort of KITS engineers." />
    </SiteLayout>
  );
};

export default Admissions;
