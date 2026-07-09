import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Award } from "lucide-react";

const NBA = () => (
  <SiteLayout>
    <PageHeader
      title="NBA Accreditation"
      breadcrumbs={[{ label: "Statutory", to: "/statutory" }, { label: "NBA" }]}
    />
    <section className="container-tight py-12 md:py-16 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
          <Award className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">National Board of Accreditation</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        The National Board of Accreditation (NBA) is an autonomous body set up under the aegis of
        AICTE to evaluate the quality of technical education in India. NBA accreditation is a mark
        of recognition that a programme has achieved a defined set of quality standards.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Krishna Chaitanya Institute of Technology &amp; Sciences is in the process of applying for
        NBA accreditation for eligible programmes. Detailed information and documentation will be
        published here once available.
      </p>
      <div className="rounded-xl border border-border bg-secondary/20 p-5 text-sm text-muted-foreground">
        Content coming soon. Please contact the principal's office for current accreditation status.
      </div>
    </section>
  </SiteLayout>
);

export default NBA;
