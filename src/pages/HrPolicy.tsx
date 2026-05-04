import { PdfPage } from "@/components/site/PdfPage";

const HrPolicy = () => (
  <PdfPage
    eyebrow="About KITS"
    title="HR Policy"
    subtitle="Human resource policy governing recruitment, conduct, leave, performance, and grievances at KITS."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "HR Policy" }]}
    description="The KITS HR Policy is the institutional framework for all employee-related matters — recruitment, probation, leave, promotions, disciplinary procedures, and grievance handling — applicable to teaching and non-teaching staff."
    fileName="KITS-HR-Policy.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default HrPolicy;
