import { ClipboardCheck } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { iqacSidebar } from "./IqacSidebar";

const StudentSatisfactionSurvey = () => (
  <InfoPage
    eyebrow="IQAC"
    title="Student Satisfaction Survey"
    subtitle="An anonymous, structured survey to gather student feedback on academic and campus experiences."
    breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "SSS" }]}
    sidebar={iqacSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      The Student Satisfaction Survey (SSS) is conducted annually to capture honest feedback on
      teaching quality, infrastructure, support services, and campus culture. The IQAC analyses
      responses, identifies improvement areas, and reports to NAAC as part of the AQAR.
    </p>
    <div className="not-prose rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <ClipboardCheck className="size-10 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        The current academic-year survey form will open here when available. Past survey reports will
        be archived alongside.
      </p>
    </div>
  </InfoPage>
);

export default StudentSatisfactionSurvey;
