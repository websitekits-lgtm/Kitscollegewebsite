import { PdfPage } from "@/components/site/PdfPage";

const MandatoryDisclosure = () => (
  <PdfPage
    eyebrow="Compliance"
    title="Mandatory Disclosure"
    subtitle="Information made publicly available as per AICTE / UGC norms."
    breadcrumb={[{ label: "Mandatory Disclosure" }]}
    description="The Mandatory Disclosure document includes information about the institution, governance, faculty, infrastructure, programmes, fee structure, and academic & administrative policies — as required by AICTE and UGC."
    fileName="KITS-Mandatory-Disclosure.pdf"
    lastUpdated="Latest version"
  />
);

export default MandatoryDisclosure;
