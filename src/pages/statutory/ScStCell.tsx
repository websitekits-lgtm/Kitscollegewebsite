import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Users } from "lucide-react";

const ScStCell = () => (
  <SiteLayout>
    <PageHeader
      title="SC/ST Cell"
      breadcrumbs={[{ label: "Statutory", to: "/statutory" }, { label: "SC/ST Cell" }]}
    />
    <section className="container-tight py-12 md:py-16 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-md">
          <Users className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">SC/ST Cell</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        The SC/ST Cell at Krishna Chaitanya Institute of Technology &amp; Sciences is constituted
        to protect the rights and welfare of students and staff belonging to Scheduled Castes (SC)
        and Scheduled Tribes (ST) communities, in accordance with Government of India policies and
        UGC guidelines.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: "Objectives", items: ["Prevent caste-based discrimination", "Provide academic and welfare support", "Address grievances promptly", "Conduct awareness programmes"] },
          { title: "Services Offered", items: ["Scholarship guidance", "Grievance redressal", "Academic counselling", "Career guidance"] },
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
        For assistance or to report an issue, please contact the SC/ST Cell coordinator through the college administration office.
      </div>
    </section>
  </SiteLayout>
);

export default ScStCell;
