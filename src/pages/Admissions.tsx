import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Download, IndianRupee, GraduationCap, Calendar, Layers, FileText, Wallet, Award, BookOpen } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";

const STORAGE_KEY = "kits_admission_inquiries";

interface InquirySubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  city: string;
  message: string;
  submittedAt: string;
}

const admissionCards: LinkCard[] = [
  { label: "Courses & Intake",     description: "All B.Tech and M.Tech programmes with intake details.", to: "/admissions/courses-intake",   icon: Layers },
  { label: "Fee Structure",        description: "Tuition fees, optional charges, and scholarships.",      to: "/admissions/fee-structure",    icon: Wallet },
  { label: "Fee Refund Policy",    description: "UGC and AICTE refund norms.",                            to: "/admissions/fee-refund-policy", icon: FileText, isPdf: true },
  { label: "Reservation Roster",   description: "Category-wise seat reservations.",                       to: "/admissions/reservation-roster", icon: FileText, isPdf: true },
  { label: "Brochure",              description: "Downloadable college brochure.",                         to: "/admissions/brochure",          icon: Download, isPdf: true },
  { label: "Examination Cell",     description: "Timetables, question papers, and forms.",                to: "/examination",                  icon: BookOpen },
];

const Admissions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", program: "", city: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: InquirySubmission = {
      id: `inq-${Date.now()}`,
      ...form,
      submittedAt: new Date().toISOString(),
    };
    const existing: InquirySubmission[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing]));
    setSubmitted(true);
    setForm({ name: "", phone: "", email: "", program: "", city: "", message: "" });
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Admissions 2025–26"
        title="Take the next step. Build the career you've imagined."
        subtitle="Use code KCIT during EAPCET counselling. Applications open across all B.Tech and M.Tech programmes."
        breadcrumb={[{ label: "Admissions" }]}
      />

      {/* Eligibility & Process */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-tight grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Eligibility</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">Who can apply?</h2>
            <ul className="space-y-3 text-foreground/90">
              {[
                "Pass in 10+2 with PCM (Physics, Chemistry, Mathematics) from a recognised board.",
                "Minimum aggregate of 45% (40% for reserved categories) in PCM.",
                "Valid AP EAPCET / JEE Main rank for B.Tech admissions.",
                "Lateral Entry: Diploma holders via AP ECET in respective branch.",
                "M.Tech: GATE / AP PGECET qualified.",
              ].map((i) => (
                <li key={i} className="flex gap-3"><CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" /><span>{i}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">How to apply</h2>
            <ol className="space-y-5">
              {[
                ["Register / Inquire",     "Fill the inquiry form below or call our admissions office."],
                ["Counselling",             "Attend AP EAPCET / ECET / PGECET counselling and choose KITS Markapur (Code: KCIT)."],
                ["Document Verification",    "Submit your originals and pay admission fee at our campus."],
                ["Welcome to KITS",          "Complete enrolment and join the orientation programme."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <div className="size-9 rounded-md bg-accent text-accent-foreground grid place-items-center font-display font-semibold shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-medium">{t}</h3>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Fees & Scholarships intro cards */}
      <section className="py-16 md:py-20 bg-secondary/5 border-y border-border">
        <div className="container-tight">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { Icon: IndianRupee,   t: "Fee Structure",   d: "Transparent fees as per Govt. + AFRC norms." },
              { Icon: GraduationCap, t: "Scholarships",     d: "AP State Post-Matric, Central, and KITS merit scholarships." },
              { Icon: Calendar,      t: "Important Dates",   d: "Inquiry open year-round. Counselling typically June–August." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-background p-7">
                <c.Icon className="size-6 text-accent mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild className="rounded-sm" size="lg">
              <Link to="/admissions/brochure"><Download className="size-4" /> Download Brochure</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-sm" size="lg">
              <Link to="/admissions/fee-structure"><Wallet className="size-4" /> Fee Structure</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-sm" size="lg">
              <Link to="/admissions/courses-intake"><Award className="size-4" /> Courses & Intake</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick links to all admission sub-pages */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-tight">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">More information</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Admission Pages</h2>
          </div>
          <LinkCardGrid cards={admissionCards} />
        </div>
      </section>

      {/* Inquiry form */}
      <section className="py-16 md:py-20 bg-secondary/5 border-t border-border">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Inquiry</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">Talk to our admissions team</h2>
            <p className="mt-3 text-muted-foreground">We'll get back to you within 24 hours.</p>
          </div>

          {submitted && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Inquiry submitted successfully!</p>
                <p className="text-sm mt-0.5">Our admissions team will get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-7 md:p-9 grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Student Name *</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Interested Program</Label>
              <Input id="program" value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} placeholder="e.g. B.Tech CSE" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Your city" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us a bit about your goals (optional)" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
                Submit Inquiry
              </Button>
              <p className="mt-3 text-xs text-muted-foreground italic text-center">
                * Submissions are saved locally for now. Admin dashboard will collect them centrally once enabled.
              </p>
            </div>
          </form>
        </div>
      </section>

      <CTABand title="Seats are limited. Don't miss your chance." description="Apply now and join the next cohort of KITS engineers." />
    </SiteLayout>
  );
};

export default Admissions;
