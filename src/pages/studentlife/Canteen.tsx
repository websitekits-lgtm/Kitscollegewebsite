import { Coffee, Clock } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { CANTEEN } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const Canteen = () => (
  <InfoPage
    eyebrow="Student Life"
    title="Canteen"
    subtitle="Hygienic, affordable, and student-friendly meals on campus."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Canteen" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {CANTEEN.intro}
    </p>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Coffee className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Highlights</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {CANTEEN.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <span className="mt-1.5 size-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-foreground/85">{h}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Meal Timings</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <tbody>
            {CANTEEN.hours.map((h, i) => (
              <tr key={i} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 font-medium">{h.meal}</td>
                <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">{h.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default Canteen;
