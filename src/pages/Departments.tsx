import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CTABand } from "@/components/site/CTABand";
import { ArrowUpRight } from "lucide-react";
import { DEPARTMENTS } from "@/lib/college";
import cse from "@/assets/dept-cse.jpg";
import aiml from "@/assets/dept-aiml.jpg";
import ece from "@/assets/dept-ece.jpg";
import eee from "@/assets/dept-eee.jpg";
import mech from "@/assets/dept-mech.jpg";
import civil from "@/assets/dept-civil.jpg";
import library from "@/assets/campus-library.jpg";

const imageMap: Record<string, string> = { cse, aiml, ece, eee, mech, civil, library };

const Departments = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Departments"
        title="Seven departments. Every engineer's path."
        subtitle="From software and AI to mechanical, civil, electronics and humanities — built around modern curricula and rich lab infrastructure."
        breadcrumb={[{ label: "Departments" }]}
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-tight grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEPARTMENTS.map((d) => (
            <Link
              key={d.slug}
              to={`/departments/${d.slug}`}
              className="group relative overflow-hidden rounded-md border border-border bg-card hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <img src={imageMap[d.image]} alt={d.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-1">{d.code}</div>
                <h3 className="font-display text-xl font-semibold">{d.name}</h3>
                <p className="mt-1.5 text-sm text-primary-foreground/75 line-clamp-2">{d.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent">
                  Department details <ArrowUpRight className="size-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </SiteLayout>
  );
};

export default Departments;
