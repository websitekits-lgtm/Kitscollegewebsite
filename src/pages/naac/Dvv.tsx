import { PdfPage } from "@/components/site/PdfPage";

const Dvv = () => (
  <PdfPage
    eyebrow="NAAC"
    title="DVV Clarifications"
    subtitle="Data Validation and Verification responses to NAAC's queries."
    breadcrumb={[{ label: "NAAC", to: "/naac" }, { label: "DVV" }]}
    description="Detailed responses, clarifications, and supporting documents submitted in response to NAAC's Data Validation & Verification (DVV) clarifications."
    fileName="KITS-NAAC-DVV.pdf"
    lastUpdated="Latest cycle"
  />
);

export default Dvv;
