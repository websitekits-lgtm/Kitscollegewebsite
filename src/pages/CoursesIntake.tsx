import { GraduationCap } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { PROGRAMS } from "@/lib/academicsContent";
import { useTableRows } from "@/lib/useTableRows";

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

interface ProgramRow {
  level: string; code: string; name: string; duration: string; intake: string; affiliation: string;
  [key: string]: string;
}

const CoursesIntake = () => {
  const rows = useTableRows<ProgramRow>(
    "courses-intake",
    PROGRAMS.map((p) => ({
      level: p.level, code: p.code, name: p.name,
      duration: p.duration, intake: String(p.intake), affiliation: p.affiliation,
    })),
  );
  const ug = rows.filter((p) => p.level.toUpperCase() === "UG");
  const pg = rows.filter((p) => p.level.toUpperCase() === "PG");

  const TotalIntake = ({ programs }: { programs: ProgramRow[] }) => (
    <p className="text-xs text-muted-foreground mt-3 italic">
      Total intake: {programs.reduce((sum, p) => sum + (parseInt(p.intake, 10) || 0), 0)} seats
    </p>
  );

  const Table = ({ programs, label }: { programs: ProgramRow[]; label: string }) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <GraduationCap className="size-5 text-accent" />
        <h2 className="font-display text-2xl font-semibold m-0">{label}</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/10">
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Branch</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Programme</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Duration</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Intake</th>
                <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden md:table-cell">Affiliation</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.code} className="border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{p.code}</td>
                  <td className="px-4 py-3 text-foreground/85">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{p.duration}</td>
                  <td className="px-4 py-3 font-semibold text-accent">{p.intake}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap hidden md:table-cell">{p.affiliation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TotalIntake programs={programs} />
    </div>
  );

  return (
    <InfoPage
      eyebrow="Admissions"
      title="Courses & Intake"
      subtitle="All B.Tech and M.Tech programmes offered at KITS Markapur, with annual intake and accreditation details."
      breadcrumb={[
        { label: "Admissions", to: "/admissions" },
        { label: "Courses & Intake" },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-10">
        KITS offers a balanced mix of core engineering and emerging-tech programmes at the
        undergraduate and postgraduate levels — all approved by AICTE and affiliated to JNTU Kakinada.
      </p>

      <div className="not-prose">
        <Table programs={ug} label="Undergraduate Programmes (B.Tech)" />
        <Table programs={pg} label="Postgraduate Programmes (M.Tech)" />
      </div>
    </InfoPage>
  );
};

export default CoursesIntake;
