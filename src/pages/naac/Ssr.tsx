import { PdfPage } from "@/components/site/PdfPage";

const Ssr = () => (
  <PdfPage
    eyebrow="NAAC"
    title="Self Study Report (SSR)"
    subtitle="Our comprehensive self-evaluation submitted to NAAC for accreditation."
    breadcrumb={[{ label: "NAAC", to: "/naac" }, { label: "SSR" }]}
    description="The Self Study Report is a detailed self-evaluation across all NAAC criteria, accompanied by data, evidence, and best-practice documentation."
    fileName="KITS-NAAC-SSR.pdf"
    lastUpdated="Latest cycle submission"
  />
);

export default Ssr;
