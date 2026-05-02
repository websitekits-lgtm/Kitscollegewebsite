import { PdfPage } from "@/components/site/PdfPage";

const FeeRefundPolicy = () => (
  <PdfPage
    eyebrow="Admissions"
    title="Fee Refund Policy"
    subtitle="UGC and AICTE guidelines on tuition fee refund in case of admission cancellation."
    breadcrumb={[
      { label: "Admissions", to: "/admissions" },
      { label: "Fee Refund Policy" },
    ]}
    description="The fee refund policy follows UGC and AICTE norms. Refund amount depends on the date of cancellation relative to the start of the academic session."
    fileName="UGC-Fee-Refund-Policy.pdf"
    lastUpdated="Updated April 2025"
  />
);

export default FeeRefundPolicy;
