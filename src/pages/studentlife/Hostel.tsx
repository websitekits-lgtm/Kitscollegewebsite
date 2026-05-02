import { Home, ListChecks, Wallet } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { HOSTEL } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const Hostel = () => (
  <InfoPage
    eyebrow="Student Life"
    title="Hostel"
    subtitle="Comfortable, safe, and disciplined hostel living for boys and girls within the KITS campus."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Hostel" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {HOSTEL.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Home className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Features</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {HOSTEL.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Hostel Rules</h2>
      </div>
      <ol className="space-y-3">
        {HOSTEL.rules.map((r, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{r}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Hostel Fees</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <tbody>
            {HOSTEL.fees.map((f, i) => (
              <tr key={i} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 text-foreground/85">{f.item}</td>
                <td className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">{f.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default Hostel;
