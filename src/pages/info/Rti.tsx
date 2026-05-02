import { FileText, Mail, Phone, ListChecks, Wallet, Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { RTI_INFO } from "@/lib/miscContent";
import { infoCornerSidebar } from "./InfoCornerSidebar";

const Rti = () => (
  <InfoPage
    eyebrow="Information Corner"
    title="Right to Information (RTI)"
    subtitle="File RTI requests under the Right to Information Act, 2005."
    breadcrumb={[{ label: "Information", to: "/info" }, { label: "RTI" }]}
    sidebar={infoCornerSidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      {RTI_INFO.intro}
    </p>

    <div className="not-prose grid sm:grid-cols-2 gap-5 mb-10">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
            <FileText className="size-5" />
          </div>
          <h3 className="font-display text-base font-semibold m-0">Public Information Officer</h3>
        </div>
        <p className="text-foreground font-medium">{RTI_INFO.pio.name}</p>
        <p className="text-sm text-muted-foreground mb-3">{RTI_INFO.pio.designation}</p>
        <p className="flex items-center gap-2 text-sm mb-1"><Mail className="size-4 text-accent" /><a href={`mailto:${RTI_INFO.pio.email}`} className="text-foreground hover:text-accent break-all">{RTI_INFO.pio.email}</a></p>
        <p className="flex items-center gap-2 text-sm"><Phone className="size-4 text-accent" /><a href={`tel:${RTI_INFO.pio.phone}`} className="text-foreground hover:text-accent">{RTI_INFO.pio.phone}</a></p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
            <Users className="size-5" />
          </div>
          <h3 className="font-display text-base font-semibold m-0">Appellate Authority</h3>
        </div>
        <p className="text-foreground font-medium">{RTI_INFO.appellate.name}</p>
        <p className="text-sm text-muted-foreground mb-3">{RTI_INFO.appellate.designation}</p>
        <p className="flex items-center gap-2 text-sm"><Mail className="size-4 text-accent" /><a href={`mailto:${RTI_INFO.appellate.email}`} className="text-foreground hover:text-accent break-all">{RTI_INFO.appellate.email}</a></p>
      </div>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Procedure</h2>
      </div>
      <ol className="space-y-3">
        {RTI_INFO.procedure.map((p, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{p}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Fees</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <tbody>
            {RTI_INFO.fees.map((f, i) => (
              <tr key={i} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 text-foreground/85">{f.item}</td>
                <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">{f.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default Rti;
