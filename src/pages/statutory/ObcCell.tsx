import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Users } from "lucide-react";

const ObcCell = () => (
  <SiteLayout>
    <PageHeader
      title="OBC Cell"
      breadcrumbs={[{ label: "Statutory", to: "/statutory" }, { label: "OBC Cell" }]}
    />
    <section className="container-tight py-12 md:py-16 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-md">
          <Users className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">OBC Cell</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        The OBC Cell at Krishna Chaitanya Institute of Technology &amp; Sciences is established to
        safeguard the educational interests and welfare of students and staff belonging to Other
        Backward Classes (OBC), in line with Government of India and UGC directives.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: "Objectives", items: ["Prevent discrimination against OBC community", "Facilitate scholarship applications", "Provide academic support and counselling", "Conduct awareness and sensitisation programmes"] },
          { title: "Services", items: ["OBC certificate guidance", "Scholarship information", "Grievance redressal", "Career counselling"] },
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
        Contact the OBC Cell coordinator via the administration office for assistance, grievances, or scholarship guidance.
      </div>
    </section>
  </SiteLayout>
);

export default ObcCell;
