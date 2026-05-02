import { PdfPage } from "@/components/site/PdfPage";

const BarrierFree = () => (
  <PdfPage
    eyebrow="Student Life"
    title="Barrier-Free Environment"
    subtitle="Accessible infrastructure and policies for differently-abled students."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Barrier-Free Environment" }]}
    description="Details of physical accessibility (ramps, lifts, accessible washrooms), assistive technology, and special academic provisions for students with disabilities."
    fileName="Barrier-Free-Environment.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default BarrierFree;
