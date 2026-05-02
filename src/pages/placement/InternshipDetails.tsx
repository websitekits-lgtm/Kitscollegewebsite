import { PdfPage } from "@/components/site/PdfPage";

const InternshipDetails = () => (
  <PdfPage
    eyebrow="Training & Placement"
    title="Internship Details"
    subtitle="A consolidated record of student internships across all departments."
    breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Internship Details" }]}
    description="Year-wise list of internships, host companies, durations, and student names — covering on-site, virtual, and stipend-based opportunities."
    fileName="Internship-Details-2024-25.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default InternshipDetails;
