import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Heart } from "lucide-react";

const WomenEmpowermentCell = () => (
  <SiteLayout>
    <PageHeader
      title="Women Empowerment Cell"
      breadcrumbs={[{ label: "Statutory", to: "/statutory" }, { label: "Women Empowerment Cell" }]}
    />
    <section className="container-tight py-12 md:py-16 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md">
          <Heart className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">Women Empowerment Cell</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        The Women Empowerment Cell at KITS is dedicated to creating a safe, inclusive, and
        empowering environment for all women — students, faculty, and staff. The cell works to
        promote gender equality and provide support for women's rights and welfare.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: "Core Activities", items: ["Awareness workshops on women's rights", "Self-defence training programmes", "Mentorship and counselling", "Celebration of Women's Day and other events"] },
          { title: "Support Services", items: ["Confidential grievance handling", "Legal awareness sessions", "Career development guidance", "Mental health support"] },
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
        To reach the Women Empowerment Cell, contact the college administration or drop a note at the principal's office. All matters are handled with strict confidentiality.
      </div>
    </section>
  </SiteLayout>
);

export default WomenEmpowermentCell;
