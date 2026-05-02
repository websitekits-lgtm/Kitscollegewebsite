import { PdfPage } from "@/components/site/PdfPage";

const CodeOfConduct = () => (
  <PdfPage
    eyebrow="About KITS"
    title="Code of Conduct"
    subtitle="Behavioural and disciplinary guidelines for students, faculty, and staff at KITS."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Code of Conduct" }]}
    description="This document defines the expected standards of behaviour on campus, including dress code, classroom etiquette, online conduct, anti-ragging policies, and disciplinary procedures for violations."
    fileName="Code-of-Conduct.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default CodeOfConduct;
