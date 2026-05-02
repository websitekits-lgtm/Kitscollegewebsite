import { PdfPage } from "@/components/site/PdfPage";

const ReservationRoster = () => (
  <PdfPage
    eyebrow="Admissions"
    title="Reservation Roster"
    subtitle="Category-wise seat reservation as per Government of Andhra Pradesh norms."
    breadcrumb={[
      { label: "Admissions", to: "/admissions" },
      { label: "Reservation Roster" },
    ]}
    description="Branch-wise reservation roster covering SC, ST, BC, EWS, and other reserved categories — published in line with state and central government guidelines."
    fileName="Reservation-Roster.pdf"
    lastUpdated="Updated March 2025"
  />
);

export default ReservationRoster;
