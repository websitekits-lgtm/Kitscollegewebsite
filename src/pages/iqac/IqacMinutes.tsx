import { FileSignature } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { iqacSidebar } from "./IqacSidebar";

const IqacMinutes = () => (
  <InfoPage
    eyebrow="IQAC"
    title="Minutes of Meeting"
    subtitle="Records of IQAC quarterly and annual meetings."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "Minutes" }]}
    sidebar={iqacSidebar}
  >
    <div className="not-prose rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <FileSignature className="size-10 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">
        Meeting minutes will be uploaded here as the IQAC publishes them. Please check back soon.
      </p>
    </div>
  </InfoPage>
);

export default IqacMinutes;
