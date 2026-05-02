import { PdfPage } from "@/components/site/PdfPage";

const CodeOfEthics = () => (
  <PdfPage
    eyebrow="About KITS"
    title="Code of Ethics"
    subtitle="Our institutional commitment to integrity, transparency, and professional conduct."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Code of Ethics" }]}
    description="The KITS Code of Ethics outlines the values, professional standards, and behavioural guidelines expected of every member of our academic community — students, faculty, staff, and management."
    fileName="Code-of-Ethics.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default CodeOfEthics;
