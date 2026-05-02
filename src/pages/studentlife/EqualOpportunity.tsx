import { PdfPage } from "@/components/site/PdfPage";

const EqualOpportunity = () => (
  <PdfPage
    eyebrow="Student Life"
    title="Equal Opportunity Cell"
    subtitle="Promoting equity, fairness, and equal opportunity for every student."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Equal Opportunity Cell" }]}
    description="The Equal Opportunity Cell ensures that students from all backgrounds — irrespective of caste, gender, religion, region, or ability — have equal access to KITS resources and opportunities."
    fileName="Equal-Opportunity-Cell.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default EqualOpportunity;
