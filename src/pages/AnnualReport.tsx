import { PdfPage } from "@/components/site/PdfPage";

const AnnualReport = () => (
  <PdfPage
    eyebrow="About KITS"
    title="Annual Report"
    subtitle="A complete overview of academic, research, placement, and infrastructure milestones for the year."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Annual Report" }]}
    description="The KITS Annual Report compiles year-on-year performance: academic achievements, research output, placements, faculty development, student awards, and financial summary."
    fileName="Annual-Report-2024-25.pdf"
    lastUpdated="For Academic Year 2024-25"
  />
);

export default AnnualReport;
