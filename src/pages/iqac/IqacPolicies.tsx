import { ScrollText } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { iqacSidebar } from "./IqacSidebar";

const IqacPolicies = () => (
  <InfoPage
    eyebrow="IQAC"
    title="Procedures & Policies"
    subtitle="The institutional procedures, SOPs, and policies that drive academic and administrative quality."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "Policies" }]}
    sidebar={iqacSidebar}
  >
    <div className="not-prose rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <ScrollText className="size-10 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Policy documents are being compiled and will be published here shortly. Please check back later.
      </p>
    </div>
  </InfoPage>
);

export default IqacPolicies;
