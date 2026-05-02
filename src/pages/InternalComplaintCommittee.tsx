import { ShieldAlert, Users, ListChecks, Phone, Mail } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";

const sidebar = {
  heading: "Quick Links",
  links: [
    { label: "Anti-Ragging", to: "/student-life/anti-ragging" },
    { label: "Grievance Redressal", to: "/grievance-cell" },
    { label: "Women Welfare", to: "/committees" },
    { label: "Equal Opportunity", to: "/student-life/equal-opportunity" },
    { label: "Contact Office", to: "/contact" },
  ],
};

const COMMITTEE = [
  { name: "Senior Female Faculty",   designation: "Faculty Member",      role: "Presiding Officer" },
  { name: "Female Faculty Member",   designation: "Faculty Member",      role: "Member" },
  { name: "Female Faculty Member",   designation: "Faculty Member",      role: "Member" },
  { name: "Non-Teaching Female Staff", designation: "Office Staff",      role: "Member" },
  { name: "External Member (NGO)",   designation: "External Expert",     role: "External Member" },
  { name: "Female Student Rep",      designation: "Student",             role: "Student Member" },
];

const InternalComplaintCommittee = () => (
  <InfoPage
    eyebrow="Compliance"
    title="Internal Complaint Committee (ICC)"
    subtitle="A confidential channel to address complaints of sexual harassment in the workplace, as mandated by UGC and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Internal Complaint Committee" }]}
    sidebar={sidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-accent/30 bg-accent/5 p-6">
      <div className="flex items-start gap-4">
        <ShieldAlert className="size-6 text-accent shrink-0 mt-1" />
        <div>
          <h2 className="font-display text-lg font-semibold mb-2">Zero-Tolerance Policy</h2>
          <p className="text-foreground/85 leading-relaxed">
            KITS Markapur is committed to providing a safe, respectful, and harassment-free environment
            for every student, employee, and visitor. The ICC investigates complaints fairly,
            confidentially, and in accordance with statutory norms.
          </p>
        </div>
      </div>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">How to File a Complaint</h2>
      </div>
      <ol className="space-y-3">
        {[
          "Submit a written complaint to the Presiding Officer of the ICC, in person or via email.",
          "The complaint can be filed by the aggrieved person directly or by an authorised representative.",
          "ICC acknowledges receipt within 7 days and initiates a confidential inquiry.",
          "All parties are heard fairly; statements are recorded in writing.",
          "The committee submits an inquiry report within 90 days with recommended action.",
          "Identity of the complainant and respondents is kept strictly confidential.",
        ].map((s, i) => (
          <li key={i} className="flex gap-4 rounded-lg border border-border bg-card p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold text-xs">
              {i + 1}
            </span>
            <span className="text-sm text-foreground/85 leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="not-prose mb-10">
      <div className="flex items-center gap-3 mb-4">
        <Users className="size-5 text-accent" />
        <h2 className="font-display text-xl font-semibold m-0">ICC Members</h2>
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
            {COMMITTEE.map((m, i) => (
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

    <div className="not-prose rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold mb-4">Confidential Helpline</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2"><Mail className="size-4 text-accent" /><a href="mailto:icc@kits-anna.com" className="text-foreground hover:text-accent">icc@kits-anna.com</a></li>
        <li className="flex items-center gap-2"><Phone className="size-4 text-accent" /><a href="tel:+919153019999" className="text-foreground hover:text-accent">+91-9153019999</a></li>
      </ul>
    </div>
  </InfoPage>
);

export default InternalComplaintCommittee;
