import { PdfPage } from "@/components/site/PdfPage";

const InstitutionalDevelopmentPlan = () => (
  <PdfPage
    eyebrow="About KITS"
    title="Institutional Development Plan"
    subtitle="Our long-term roadmap for academic, infrastructural, and research growth at KITS Markapur."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Institutional Development Plan" }]}
    description="The Institutional Development Plan (IDP) outlines our 5-year vision — covering programme expansion, faculty growth, infrastructure additions, research targets, and student-support initiatives."
    fileName="Institutional-Development-Plan.pdf"
    lastUpdated="Updated May 2025"
  />
);

export default InstitutionalDevelopmentPlan;
