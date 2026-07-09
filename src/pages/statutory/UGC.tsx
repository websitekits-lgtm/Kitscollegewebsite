import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { BookOpen } from "lucide-react";

const UGC = () => (
  <SiteLayout>
    <PageHeader
      title="UGC"
      breadcrumbs={[{ label: "Statutory", to: "/statutory" }, { label: "UGC" }]}
    />
    <section className="container-tight py-12 md:py-16 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
          <BookOpen className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">University Grants Commission</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        The University Grants Commission (UGC) is a statutory body of the Government of India
        that coordinates, determines, and maintains the standards of university education. UGC
        provides recognition to universities and disburses funds to them.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        KITS is affiliated to Jawaharlal Nehru Technological University Kakinada (JNTUK), which
        is recognised by the UGC. All programmes offered at KITS conform to UGC regulations and
        JNTUK guidelines.
      </p>
      <div className="rounded-xl border border-border bg-secondary/20 p-5 text-sm text-muted-foreground">
        Detailed UGC documents and compliance information will be published here. Please contact
        the administration office for queries.
      </div>
    </section>
  </SiteLayout>
);

export default UGC;
