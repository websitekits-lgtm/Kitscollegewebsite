import { Info, Download, BadgePercent, Landmark, Clock } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { usePageTexts } from "@/lib/usePageTexts";
import { useDocument } from "@/lib/useDocuments";

const PAGE_SLUG = "admissions/fee-refund-policy";

const sidebar = {
  heading: "Admissions",
  links: [
    { label: "Courses & Intake", to: "/admissions/courses-intake" },
    { label: "Admission Procedure", to: "/admissions" },
    { label: "Fee Structure", to: "/admissions/fee-structure" },
    { label: "Fee Refund Policy", to: "/admissions/fee-refund-policy" },
    { label: "Reservation Roster", to: "/admissions/reservation-roster" },
    { label: "Brochure", to: "/admissions/brochure" },
  ],
};

// Static slab windows; refund values are admin-editable (Admin → Page Content)
const SLABS: { key: "slab_1" | "slab_2" | "slab_3" | "slab_4" | "slab_5"; window: string }[] = [
  { key: "slab_1", window: "15 days or more before the notified start of the session" },
  { key: "slab_2", window: "Less than 15 days before the start of the session" },
  { key: "slab_3", window: "Up to 15 days after the start of the session" },
  { key: "slab_4", window: "16 to 30 days after the start of the session" },
  { key: "slab_5", window: "More than 30 days after the start of the session" },
];

const FeeRefundPolicy = () => {
  const texts = usePageTexts(PAGE_SLUG, {
    intro:
      "Krishna Chaitanya Institute of Technology & Sciences follows the UGC and AICTE guidelines on refund of fees in the event of admission cancellation or withdrawal. The refund amount depends on when the cancellation request is submitted relative to the formally notified start date of the academic session.",
    slab_1: "100% refund (after deducting ₹1,000 processing fee)",
    slab_2: "90% of the aggregate fee",
    slab_3: "80% of the aggregate fee",
    slab_4: "50% of the aggregate fee",
    slab_5: "No refund (0%)",
    note_deposit: "The caution deposit is fully refundable at any stage, provided there are no outstanding dues against the student.",
    note_optional: "Hostel and transport fees are refunded on a pro-rata basis for the unused period, subject to a one-month notice.",
    note_mode: "Approved refunds are processed within 15 working days via NEFT to the bank account provided in the cancellation request form.",
  });
  const officialPdf = useDocument("fee-refund-policy");

  return (
    <InfoPage
      eyebrow="Admissions"
      title="Fee Refund Policy"
      subtitle="UGC and AICTE guidelines on tuition fee refund in case of admission cancellation."
      breadcrumb={[{ label: "Admissions", to: "/admissions" }, { label: "Fee Refund Policy" }]}
      sidebar={sidebar}
    >
      <div className="not-prose mb-8 rounded-2xl border border-accent/25 bg-accent/5 p-6">
        <div className="flex items-start gap-4">
          <Info className="size-6 text-accent shrink-0 mt-0.5" />
          <p className="text-foreground/90 leading-relaxed">{texts.intro}</p>
        </div>
      </div>

      {/* Refund slabs */}
      <div className="not-prose mb-10">
        <div className="flex items-center gap-3 mb-4">
          <BadgePercent className="size-5 text-accent" />
          <h2 className="font-display text-xl font-semibold m-0">Refund Slabs</h2>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/10">
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Time of Cancellation Request</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Refund Entitlement</th>
              </tr>
            </thead>
            <tbody>
              {SLABS.map(({ key, window: w }) => (
                <tr key={key} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                  <td className="px-4 py-3 text-foreground/85">{w}</td>
                  <td className="px-4 py-3 font-semibold text-accent">{texts[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional provisions */}
      <div className="not-prose mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">Additional Provisions</h2>
        <ul className="space-y-3">
          {[
            { Icon: Landmark, text: texts.note_deposit },
            { Icon: Clock, text: texts.note_optional },
            { Icon: Info, text: texts.note_mode },
          ].map(({ Icon, text }, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <Icon className="size-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/85 leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Official PDF (uploads from Admin → Documents) */}
      {officialPdf && (
        <div className="not-prose rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-foreground">Official Fee Refund Policy Document</p>
            <p className="text-xs text-muted-foreground mt-0.5">{officialPdf.file_name}</p>
          </div>
          <a
            href={officialPdf.file_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            <Download className="size-4" /> Download PDF
          </a>
        </div>
      )}
    </InfoPage>
  );
};

export default FeeRefundPolicy;
