import { PdfPage } from "@/components/site/PdfPage";

const Brochure = () => (
  <PdfPage
    eyebrow="Admissions"
    title="College Brochure"
    subtitle="Everything about KITS Markapur in one downloadable document."
    breadcrumb={[
      { label: "Admissions", to: "/admissions" },
      { label: "Brochure" },
    ]}
    description="The KITS Brochure includes campus highlights, programmes offered, infrastructure, placements, faculty, hostel, transport, and admission contact details — perfect to share with parents and prospective students."
    fileName="KITS-Markapur-Brochure-2025.pdf"
    lastUpdated="Latest edition"
  />
);

export default Brochure;
