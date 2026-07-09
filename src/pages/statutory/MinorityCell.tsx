import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Users } from "lucide-react";

const MinorityCell = () => (
  <SiteLayout>
    <PageHeader
      title="Minority Cell"
      breadcrumbs={[{ label: "Statutory", to: "/statutory" }, { label: "Minority Cell" }]}
    />
    <section className="container-tight py-12 md:py-16 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-md">
          <Users className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">Minority Cell</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        The Minority Cell at KITS is constituted to promote the educational interests of students
        and staff belonging to minority communities, as defined under the National Commission for
        Minorities Act. The cell ensures equitable access to education and welfare schemes for
        minority community members.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: "Objectives", items: ["Promote inclusive education", "Facilitate minority scholarship applications", "Address concerns of minority students", "Organise awareness programmes"] },
          { title: "Services", items: ["Scholarship guidance (Pre-Matric / Post-Matric)", "Grievance redressal", "Academic and career counselling", "Liaison with government welfare departments"] },
        ].map((block) => (
          <div key={block.title} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-3">{block.title}</h3>
            <ul className="space-y-1.5">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-secondary/20 p-5 text-sm text-muted-foreground">
        Contact the Minority Cell coordinator through the college administration office for any assistance or grievances.
      </div>
    </section>
  </SiteLayout>
);

export default MinorityCell;
