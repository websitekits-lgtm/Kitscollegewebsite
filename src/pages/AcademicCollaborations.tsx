import { PdfPage } from "@/components/site/PdfPage";

const AcademicCollaborations = () => (
  <PdfPage
    eyebrow="Academics"
    title="Academic Collaborations & MoUs"
    subtitle="Industry tie-ups, university partnerships, and academic memoranda of understanding."
    breadcrumb={[
      { label: "Academics", to: "/academics" },
      { label: "Academic Collaborations" },
    ]}
    description="A consolidated list of active MoUs and partnerships with industries, universities, and research bodies — outlining the scope, beneficiaries, and outcomes of each collaboration."
    fileName="Academic-Collaborations-MoUs.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default AcademicCollaborations;
