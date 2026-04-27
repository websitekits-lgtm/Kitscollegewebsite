import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTABand } from "@/components/site/CTABand";
import { DEPARTMENTS } from "@/lib/college";
import { Link } from "react-router-dom";
import { ChevronRight, Quote, FlaskConical, Users, Trophy, BookOpen } from "lucide-react";
import cse from "@/assets/dept-cse.jpg";
import aiml from "@/assets/dept-aiml.jpg";
import ece from "@/assets/dept-ece.jpg";
import eee from "@/assets/dept-eee.jpg";
import mech from "@/assets/dept-mech.jpg";
import civil from "@/assets/dept-civil.jpg";
import library from "@/assets/campus-library.jpg";

const imageMap: Record<string, string> = { cse, aiml, ece, eee, mech, civil, library };

const DepartmentDetail = () => {
  const { slug } = useParams();
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) return <Navigate to="/departments" replace />;

  const labs = ["Programming Lab", "Project Lab", "Research Lab", "Innovation Studio"];
  const faculty = [
    { name: "Dr. A. Subramanyam", role: `Head of Department, ${dept.code}` },
    { name: "Dr. P. Lakshmi", role: "Professor" },
    { name: "Mr. K. Naveen Kumar", role: "Associate Professor" },
    { name: "Ms. R. Sree Devi", role: "Assistant Professor" },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative ink-bg text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={imageMap[dept.image]} alt="" className="size-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary" />
        </div>
        <div className="container-tight relative pt-24 pb-20 md:pt-32 md:pb-28">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/departments" className="hover:text-accent">Departments</Link>
            <ChevronRight className="size-3" />
            <span className="text-primary-foreground/90">{dept.code}</span>
          </nav>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Department of {dept.code}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl text-balance">{dept.name}</h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/70 text-balance">{dept.desc}</p>
        </div>
      </section>

      {/* HOD message + vision/mission */}
      <section className="py-20 md:py-28 bg-background">
        <SectionReveal className="container-tight grid lg:grid-cols-12 gap-10" staggerChildren>
          <article data-reveal className="lg:col-span-7 rounded-md border border-border bg-card p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-accent mb-2">HOD Message</p>
            <Quote className="size-6 text-accent mb-3" />
            <p className="text-foreground/90 leading-relaxed">
              The Department of {dept.code} at KITS is committed to grooming engineers who think critically, build responsibly and lead with ethics. Our curriculum, labs and faculty are designed to bridge classroom learning and real-world impact.
            </p>
            <p className="mt-5 font-display font-semibold">Dr. A. Subramanyam, Head of Department</p>
          </article>
          <div data-reveal className="lg:col-span-5 space-y-5">
            <div className="rounded-md border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-2">Vision</h3>
              <p className="text-sm text-muted-foreground">To be a centre of excellence in {dept.name.toLowerCase()}, recognised for academic quality, research, and societal contribution.</p>
            </div>
            <div className="rounded-md border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-2">Mission</h3>
              <p className="text-sm text-muted-foreground">To deliver outcome-based education, foster industry collaboration, and nurture engineers with strong fundamentals and ethical values.</p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Programs / Labs / Faculty / Achievements */}
      <section className="py-20 md:py-28 bg-secondary">
        <SectionReveal className="container-tight grid md:grid-cols-2 lg:grid-cols-4 gap-5" staggerChildren>
          {[
            { icon: BookOpen, title: "Programs", items: [`B.Tech in ${dept.code}`, "Choice-based electives", "Honours / Minor tracks"] },
            { icon: FlaskConical, title: "Labs", items: labs },
            { icon: Users, title: "Faculty", items: faculty.map((f) => `${f.name} — ${f.role}`) },
            { icon: Trophy, title: "Achievements", items: ["Smart India Hackathon finalists", "100+ student publications", "Industry-funded projects"] },
          ].map((b) => (
            <div data-reveal key={b.title} className="rounded-md border border-border bg-background p-6">
              <b.icon className="size-5 text-accent mb-4" />
              <h3 className="font-display text-lg font-semibold mb-3">{b.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {b.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-accent">·</span>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </SectionReveal>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default DepartmentDetail;
