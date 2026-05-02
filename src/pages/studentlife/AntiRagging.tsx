import { ShieldAlert, AlertTriangle, ListChecks, PhoneCall, Users, ExternalLink } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { ANTI_RAGGING } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./StudentLifeSidebar";

const AntiRagging = () => (
  <InfoPage
    eyebrow="Student Life"
    title="Anti-Ragging"
    subtitle="Zero tolerance. Zero exceptions. KITS is a ragging-free campus."
    breadcrumb={[{ label: "Student Life", to: "/student-life" }, { label: "Anti-Ragging" }]}
    sidebar={studentLifeSidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
      <div className="flex items-start gap-4">
        <ShieldAlert className="size-7 text-destructive shrink-0" />
        <p className="text-foreground/90 leading-relaxed">{ANTI_RAGGING.intro}</p>
      </div>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="size-5 text-destructive" />
        <h2 className="font-display text-xl font-semibold m-0">What constitutes ragging?</h2>
      </div>
      <ul className="space-y-2">
        {ANTI_RAGGING.forms.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/85">
            <span className="mt-2 size-1.5 rounded-full bg-destructive shrink-0" />
            <span className="text-sm leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Prevention measures</h2>
      </div>
      <ul className="space-y-2">
        {ANTI_RAGGING.prevention.map((p, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/85">
            <span className="mt-2 size-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-sm leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Helpline */}
    <div className="not-prose mb-10 rounded-2xl border border-accent/30 bg-accent/5 p-6">
      <div className="flex items-center gap-3 mb-4">
        <PhoneCall className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Helpline</h2>
      </div>
      <ul className="space-y-2 text-sm">
        <li><span className="font-medium">KITS Anti-Ragging Helpline:</span> <a href={`tel:${ANTI_RAGGING.helpline.institutional}`} className="text-accent">{ANTI_RAGGING.helpline.institutional}</a></li>
        <li><span className="font-medium">National Anti-Ragging Helpline:</span> <a href={`tel:${ANTI_RAGGING.helpline.nationalAntiRagging}`} className="text-accent">{ANTI_RAGGING.helpline.nationalAntiRagging}</a></li>
        <li><span className="font-medium">Email:</span> <a href={`mailto:${ANTI_RAGGING.helpline.email}`} className="text-accent break-all">{ANTI_RAGGING.helpline.email}</a></li>
        <li><span className="font-medium">UGC Anti-Ragging Portal:</span>{" "}
          <a href={ANTI_RAGGING.helpline.ugcPortal} target="_blank" rel="noopener noreferrer" className="text-accent inline-flex items-center gap-1">
            {ANTI_RAGGING.helpline.ugcPortal} <ExternalLink className="size-3" />
          </a>
        </li>
      </ul>
    </div>

    {/* Committee */}
    <div className="not-prose">
      <div className="flex items-center gap-3 mb-4">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">Anti-Ragging Committee</h2>
      </div>
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/10">
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Name</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Designation</th>
              <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Role</th>
            </tr>
          </thead>
          <tbody>
            {ANTI_RAGGING.committee.map((m, i) => (
              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{m.designation}</td>
                <td className="px-4 py-3 text-accent font-medium">{m.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </InfoPage>
);

export default AntiRagging;
