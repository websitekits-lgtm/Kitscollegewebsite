import { PdfPage } from "@/components/site/PdfPage";

const AuditReport = () => (
  <PdfPage
    eyebrow="About KITS"
    title="Audit Report"
    subtitle="Audited financial statements as per regulatory and statutory requirements."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Audit Report" }]}
    description="The annual Audit Report provides a transparent view of the institution's financial health, certified by an independent chartered accountant."
    fileName="Audit-Report-FY-2023-24.pdf"
    lastUpdated="FY 2023-24"
  />
);

export default AuditReport;
