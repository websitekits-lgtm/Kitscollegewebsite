import { Wallet, Award, Info } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { FEE_STRUCTURE } from "@/lib/academicsContent";

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

interface FeeRow { item: string; amount: string; }

const FeeTable = ({ title, rows }: { title: string; rows: FeeRow[] }) => (
  <div className="mb-8">
    <h3 className="font-display text-lg font-semibold mb-3">{title}</h3>
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-b-0 hover:bg-secondary/10"
            >
              <td className="px-4 py-3 text-foreground/85">{r.item}</td>
              <td className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">
                {r.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FeeStructure = () => (
  <InfoPage
    eyebrow="Admissions"
    title="Fee Structure"
    subtitle={`Tuition, examination, and other charges for academic year ${FEE_STRUCTURE.academicYear}.`}
    breadcrumb={[
      { label: "Admissions", to: "/admissions" },
      { label: "Fee Structure" },
    ]}
    sidebar={sidebar}
  >
    {/* Notes / disclaimer */}
    <div className="not-prose mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
      <div className="flex items-start gap-3">
        <Info className="size-5 text-amber-700 shrink-0 mt-0.5" />
        <ul className="space-y-1.5 text-sm text-foreground/85">
          {FEE_STRUCTURE.notes.map((n, i) => (
            <li key={i}>• {n}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* B.Tech */}
    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-5">
        <Wallet className="size-5 text-accent" />
        <h2 className="font-display text-2xl font-semibold m-0">B.Tech (Undergraduate)</h2>
      </div>
      <FeeTable title="Convener Quota" rows={FEE_STRUCTURE.ugConvener} />
      <FeeTable title="Management Quota" rows={FEE_STRUCTURE.ugManagement} />
    </div>

    {/* M.Tech */}
    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-5">
        <Wallet className="size-5 text-accent" />
        <h2 className="font-display text-2xl font-semibold m-0">M.Tech (Postgraduate)</h2>
      </div>
      <FeeTable title="Convener Quota" rows={FEE_STRUCTURE.pgConvener} />
    </div>

    {/* Optional charges */}
    <div className="not-prose mb-10">
      <h2 className="font-display text-2xl font-semibold mb-5">Optional Charges</h2>
      <FeeTable title="Hostel, transport & misc" rows={FEE_STRUCTURE.optional} />
    </div>

    {/* Scholarships */}
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-5">
        <Award className="size-5 text-accent" />
        <h2 className="font-display text-2xl font-semibold m-0">Scholarships Available</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {FEE_STRUCTURE.scholarships.map((s, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  </InfoPage>
);

export default FeeStructure;
