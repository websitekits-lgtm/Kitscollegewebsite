import { Wallet, GraduationCap, Building2, Bus, Info } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { useFeeItems, type FeeItem } from "@/lib/useFeeItems";

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

// Fallback — mirrors the client-provided Fee Structure 2026-27 chart
const FALLBACK: FeeItem[] = [
  { category: "other", label: "I Year", annual_fee: "₹ 5,500", admission_fee: null },
  { category: "other", label: "II / III / IV Years", annual_fee: "₹ 2,500", admission_fee: null },

  { category: "btech", label: "ECE", annual_fee: "₹ 43,000", admission_fee: null },
  { category: "btech", label: "CSE", annual_fee: "₹ 60,000", admission_fee: null },
  { category: "btech", label: "CSE-AI", annual_fee: "₹ 65,000", admission_fee: null },
  { category: "btech", label: "CSE (AIML)", annual_fee: "₹ 65,000", admission_fee: null },

  { category: "diploma", label: "CSE", annual_fee: "₹ 25,000", admission_fee: "₹ 2,000" },
  { category: "diploma", label: "AIML", annual_fee: "₹ 25,000", admission_fee: "₹ 2,000" },
  { category: "diploma", label: "ECE", annual_fee: "₹ 25,000", admission_fee: "₹ 2,000" },
  { category: "diploma", label: "EEE", annual_fee: "₹ 25,000", admission_fee: "₹ 2,000" },

  { category: "mtech", label: "CSE", annual_fee: "₹ 35,000", admission_fee: null },
  { category: "mtech", label: "ECE (VLSI)", annual_fee: "₹ 35,000", admission_fee: null },

  { category: "hostel", label: "Boys Hostel", annual_fee: "₹ 50,000", admission_fee: null },
  { category: "hostel", label: "Girls Hostel", annual_fee: "₹ 55,000", admission_fee: null },

  { category: "transport_a", label: "Markapur", annual_fee: "₹ 10,000", admission_fee: null },
  { category: "transport_a", label: "Tarlupadu", annual_fee: "₹ 11,000", admission_fee: null },
  { category: "transport_a", label: "Hanuman Kunta", annual_fee: "₹ 10,000", admission_fee: null },
  { category: "transport_a", label: "Thippayapalem", annual_fee: "₹ 11,000", admission_fee: null },
  { category: "transport_a", label: "Cumbum", annual_fee: "₹ 12,000", admission_fee: null },
  { category: "transport_a", label: "B.Peta", annual_fee: "₹ 13,000", admission_fee: null },

  { category: "transport_b", label: "Motu", annual_fee: "₹ 15,000", admission_fee: null },
  { category: "transport_b", label: "Turimella", annual_fee: "₹ 12,000", admission_fee: null },
  { category: "transport_b", label: "Racherla", annual_fee: "₹ 14,000", admission_fee: null },
  { category: "transport_b", label: "Giddalur", annual_fee: "₹ 17,000", admission_fee: null },
  { category: "transport_b", label: "Pedaraveedu", annual_fee: "₹ 8,000", admission_fee: null },
  { category: "transport_b", label: "Dornala", annual_fee: "₹ 11,000", admission_fee: null },

  { category: "transport_c", label: "Gobburu", annual_fee: "₹ 7,000", admission_fee: null },
  { category: "transport_c", label: "Tripuranthakam", annual_fee: "₹ 13,000", admission_fee: null },
  { category: "transport_c", label: "Y. Palem", annual_fee: "₹ 13,000", admission_fee: null },
];

const FeeTable = ({
  title,
  icon: Icon,
  rows,
  showAdmissionFee = false,
  amountLabel = "Annual Fee",
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  rows: FeeItem[];
  showAdmissionFee?: boolean;
  amountLabel?: string;
}) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="size-5 text-accent" />
      <h2 className="font-display text-xl font-semibold m-0">{title}</h2>
    </div>
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/10">
            <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.12em] text-xs">Branch / Item</th>
            <th className="text-right px-4 py-3 font-semibold uppercase tracking-[0.12em] text-xs">{amountLabel}</th>
            {showAdmissionFee && (
              <th className="text-right px-4 py-3 font-semibold uppercase tracking-[0.12em] text-xs">Admission Fee (One Time)</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
              <td className="px-4 py-3 font-medium text-foreground">{r.label}</td>
              <td className="px-4 py-3 text-right font-semibold text-accent whitespace-nowrap">{r.annual_fee}</td>
              {showAdmissionFee && (
                <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">{r.admission_fee ?? "—"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FeeStructure = () => {
  const grouped = useFeeItems(FALLBACK);

  return (
    <InfoPage
      eyebrow="Admissions 2026 – 27"
      title="Fee Structure"
      subtitle="Affordable quality education at KITS — transparent branch-wise, hostel, and transport fees for the 2026-27 academic year."
      breadcrumb={[{ label: "Admissions", to: "/admissions" }, { label: "Fee Structure" }]}
      sidebar={sidebar}
    >
      <div className="not-prose mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-amber-700 shrink-0 mt-0.5" />
          <ul className="space-y-1.5 text-sm text-foreground/85">
            <li>• Fees shown are for the 2026-27 academic year and are subject to Govt./AFRC revisions.</li>
            <li>• Hostel and transport fees are optional and charged separately per year.</li>
            <li>• Admission fee (where applicable) is a one-time, non-recurring charge.</li>
          </ul>
        </div>
      </div>

      {grouped.other?.length > 0 && (
        <FeeTable title="Other Fee" icon={Wallet} rows={grouped.other} amountLabel="Amount" />
      )}

      {grouped.btech?.length > 0 && (
        <FeeTable title="Fee Structure — B.Tech" icon={GraduationCap} rows={grouped.btech} />
      )}

      {grouped.diploma?.length > 0 && (
        <FeeTable title="Fee Structure — Diploma (Polytechnic)" icon={GraduationCap} rows={grouped.diploma} showAdmissionFee />
      )}

      {grouped.mtech?.length > 0 && (
        <FeeTable title="Fee Structure — M.Tech" icon={GraduationCap} rows={grouped.mtech} />
      )}

      {grouped.hostel?.length > 0 && (
        <FeeTable title="Hostel Fee (Per Academic Year)" icon={Building2} rows={grouped.hostel} />
      )}

      {(grouped.transport_a?.length > 0 || grouped.transport_b?.length > 0 || grouped.transport_c?.length > 0) && (
        <div className="not-prose">
          <div className="flex items-center gap-3 mb-4">
            <Bus className="size-5 text-accent" />
            <h2 className="font-display text-xl font-semibold m-0">Transport Fee (Annual)</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grouped.transport_a?.length > 0 && (
              <div className="rounded-2xl border border-border overflow-hidden bg-card">
                <div className="px-4 py-2.5 bg-secondary/10 border-b border-border font-semibold text-xs uppercase tracking-[0.12em]">Route A</div>
                <table className="w-full text-sm">
                  <tbody>
                    {grouped.transport_a.map((r, i) => (
                      <tr key={i} className="border-b border-border last:border-b-0">
                        <td className="px-4 py-2.5 text-foreground/85">{r.label}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent whitespace-nowrap">{r.annual_fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {grouped.transport_b?.length > 0 && (
              <div className="rounded-2xl border border-border overflow-hidden bg-card">
                <div className="px-4 py-2.5 bg-secondary/10 border-b border-border font-semibold text-xs uppercase tracking-[0.12em]">Route B</div>
                <table className="w-full text-sm">
                  <tbody>
                    {grouped.transport_b.map((r, i) => (
                      <tr key={i} className="border-b border-border last:border-b-0">
                        <td className="px-4 py-2.5 text-foreground/85">{r.label}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent whitespace-nowrap">{r.annual_fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {grouped.transport_c?.length > 0 && (
              <div className="rounded-2xl border border-border overflow-hidden bg-card">
                <div className="px-4 py-2.5 bg-secondary/10 border-b border-border font-semibold text-xs uppercase tracking-[0.12em]">Route C</div>
                <table className="w-full text-sm">
                  <tbody>
                    {grouped.transport_c.map((r, i) => (
                      <tr key={i} className="border-b border-border last:border-b-0">
                        <td className="px-4 py-2.5 text-foreground/85">{r.label}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent whitespace-nowrap">{r.annual_fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </InfoPage>
  );
};

export default FeeStructure;
