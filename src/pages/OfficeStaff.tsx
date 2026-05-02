import { Users } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";

const sidebar = {
  heading: "About KITS",
  links: [
    { label: "Vision & Mission", to: "/about/vision-mission" },
    { label: "Organization Chart", to: "/about/organization-chart" },
    { label: "Governing Body", to: "/about/governing-body" },
    { label: "Chairman", to: "/about/chairman" },
    { label: "Secretary", to: "/about/secretary" },
    { label: "Principal", to: "/about/principal" },
    { label: "Office Staff", to: "/about/office-staff" },
    { label: "Internal Complaint Committee", to: "/about/icc" },
  ],
};

interface StaffMember {
  name: string;
  designation: string;
  department: string;
  qualifications: string;
}

// ADMIN: managed via dashboard later
const STAFF: StaffMember[] = [
  { name: "Administrative Officer",        designation: "AO",                       department: "Administration",      qualifications: "M.B.A, B.Com" },
  { name: "Office Superintendent",          designation: "Superintendent",            department: "Administration",      qualifications: "M.Com" },
  { name: "Senior Office Assistant",         designation: "Sr. Assistant",            department: "Administration",      qualifications: "B.Com" },
  { name: "Account Officer",                  designation: "Accounts",                 department: "Finance",             qualifications: "M.Com, CA Inter" },
  { name: "Cashier",                           designation: "Cashier",                  department: "Finance",             qualifications: "B.Com" },
  { name: "HR Executive",                      designation: "HR",                       department: "Human Resources",     qualifications: "M.B.A (HR)" },
  { name: "System Administrator",              designation: "System Admin",             department: "IT",                  qualifications: "M.C.A" },
  { name: "Network Engineer",                   designation: "Network",                  department: "IT",                  qualifications: "B.Tech" },
  { name: "Examination Branch Assistant",        designation: "Exam Cell Asst.",          department: "Examination",         qualifications: "M.Com" },
  { name: "Records & Documentation Officer",     designation: "Records Officer",          department: "Records",             qualifications: "B.A" },
  { name: "Public Relations Officer",            designation: "PRO",                      department: "Public Relations",    qualifications: "M.B.A" },
  { name: "Office Attendant",                    designation: "Attendant",                 department: "Administration",      qualifications: "Inter" },
];

const OfficeStaff = () => {
  // Group by department
  const grouped = STAFF.reduce<Record<string, StaffMember[]>>((acc, s) => {
    (acc[s.department] = acc[s.department] || []).push(s);
    return acc;
  }, {});

  return (
    <InfoPage
      eyebrow="Administration"
      title="Office Staff"
      subtitle="The administrative team that keeps the institution running smoothly behind the scenes."
      breadcrumb={[{ label: "About", to: "/about" }, { label: "Office Staff" }]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
        Our office staff supports academic and administrative operations across departments —
        examinations, records, finance, IT, public relations, and more.
      </p>

      <div className="not-prose space-y-8">
        {Object.entries(grouped).map(([dept, members]) => (
          <div key={dept}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="size-5 text-accent" />
              <h2 className="font-display text-lg sm:text-xl font-semibold m-0">{dept}</h2>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-[var(--shadow-card)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/10">
                    <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Name</th>
                    <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs">Designation</th>
                    <th className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs hidden sm:table-cell">Qualifications</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/10">
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.designation}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{m.qualifications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
};

export default OfficeStaff;
