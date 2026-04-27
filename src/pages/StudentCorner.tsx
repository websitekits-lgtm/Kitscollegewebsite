import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { FileDown, ShieldAlert, MessageSquareWarning, Megaphone, Calendar, BookCheck } from "lucide-react";

const notices = [
  { tag: "Exam", date: "Apr 22, 2026", title: "B.Tech II Year mid-semester examination schedule released." },
  { tag: "Event", date: "Apr 18, 2026", title: "Innovate 2026 — annual technical festival registrations open." },
  { tag: "Notice", date: "Apr 14, 2026", title: "Holiday list for academic year 2026–27 published." },
  { tag: "Achievement", date: "Apr 02, 2026", title: "KITS team places 2nd in regional Smart India Hackathon." },
  { tag: "Placement", date: "Mar 28, 2026", title: "Infosys NQT campus drive on April 30 — register now." },
];

const downloads = [
  "Academic Calendar 2025–26 (PDF)",
  "B.Tech R20 Syllabus — All Branches",
  "Anti-Ragging Affidavit Form",
  "Bonafide Certificate Request Form",
  "Hostel Application Form",
  "Scholarship Application Guidelines",
];

const StudentCorner = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Student Corner"
        title="Everything our students need, in one place."
        subtitle="Notices, downloads, exam information, and dedicated support cells — accessible 24/7."
        breadcrumb={[{ label: "Student Corner" }]}
      />

      {/* Notices */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-10">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Notices</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Latest notices & announcements</h2>
          </div>
          <div data-reveal className="rounded-md border border-border bg-card divide-y divide-border">
            {notices.map((n) => (
              <a key={n.title} href="#" className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 hover:bg-secondary transition-colors">
                <div className="flex items-center gap-2 sm:w-44 shrink-0">
                  <Megaphone className="size-4 text-accent" />
                  <span className="text-xs uppercase tracking-wider font-medium text-accent">{n.tag}</span>
                </div>
                <div className="flex items-center gap-2 sm:w-36 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" /> {n.date}
                </div>
                <div className="flex-1 text-sm md:text-base">{n.title}</div>
              </a>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Downloads */}
      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight" staggerChildren>
          <div className="max-w-2xl mb-10">
            <p data-reveal className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Downloads</p>
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-semibold">Forms, syllabus & documents</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {downloads.map((d) => (
              <a data-reveal key={d} href="#" className="flex items-center justify-between p-5 rounded-md border border-border bg-background hover:bg-card transition-colors group">
                <div className="flex items-center gap-3">
                  <FileDown className="size-5 text-accent" />
                  <span className="font-medium">{d}</span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-accent">Download</span>
              </a>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Cells */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight grid md:grid-cols-3 gap-6" staggerChildren>
          {[
            { icon: ShieldAlert, t: "Anti-Ragging Cell", d: "Zero-tolerance policy. 24/7 helpline and a dedicated committee." },
            { icon: MessageSquareWarning, t: "Grievance Redressal", d: "Confidential portal and committee for student concerns." },
            { icon: BookCheck, t: "Code of Conduct", d: "Clear guidelines for academic integrity and campus behaviour." },
          ].map((c) => (
            <div key={c.t} data-reveal className="rounded-md border border-border bg-card p-7">
              <c.icon className="size-6 text-accent mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default StudentCorner;
