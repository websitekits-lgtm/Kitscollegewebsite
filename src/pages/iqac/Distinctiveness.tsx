import { Compass } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { IQAC_DISTINCTIVENESS } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const Distinctiveness = () => (
  <InfoPage
    eyebrow="IQAC"
    title="Institutional Distinctiveness"
    subtitle="What sets KITS apart in our region."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "Distinctiveness" }]}
    sidebar={iqacSidebar}
  >
    <div className="not-prose mb-6 flex items-center gap-3">
      <Compass className="size-5 text-accent" />
      <h2 className="font-display text-xl font-semibold m-0">{IQAC_DISTINCTIVENESS.title}</h2>
    </div>
    <div className="not-prose space-y-4">
      {IQAC_DISTINCTIVENESS.body.map((p, i) => (
        <p key={i} className="text-base text-foreground/85 leading-relaxed">{p}</p>
      ))}
    </div>
  </InfoPage>
);

export default Distinctiveness;
