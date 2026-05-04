import { Users, GraduationCap, ClipboardList, Briefcase } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";

const sidebar = {
  heading: "Code of Conduct",
  links: [
    { label: "Overview", to: "/about/code-of-conduct" },
    { label: "For Students", to: "/about/code-of-conduct/students" },
    { label: "For Teachers", to: "/about/code-of-conduct/teachers" },
    { label: "For Administrators", to: "/about/code-of-conduct/administrators" },
    { label: "For Employees", to: "/about/code-of-conduct/employees" },
    { label: "Code of Ethics", to: "/about/code-of-ethics" },
  ],
};

const cards: LinkCard[] = [
  { label: "For Students",        description: "Academic, disciplinary and conduct expectations from students.", to: "/about/code-of-conduct/students",         icon: GraduationCap },
  { label: "For Teachers",         description: "Professional and ethical standards for faculty members.",        to: "/about/code-of-conduct/teachers",          icon: Users },
  { label: "For Administrators",   description: "Responsibilities for administrative leadership.",                to: "/about/code-of-conduct/administrators",   icon: ClipboardList },
  { label: "For Employees",         description: "Conduct expectations for non-teaching staff.",                  to: "/about/code-of-conduct/employees",         icon: Briefcase },
];

const CodeOfConduct = () => (
  <InfoPage
    eyebrow="About KITS"
    title="Code of Conduct"
    subtitle="Behavioural and disciplinary guidelines for every member of the KITS community."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Code of Conduct" }]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-10">
      The KITS Code of Conduct sets out the standards of behaviour and ethics expected of all
      students, teachers, administrators, and employees. It exists to maintain a respectful, safe,
      and high-performing institutional culture.
    </p>
    <div className="not-prose">
      <LinkCardGrid cards={cards} columns={2} />
    </div>
  </InfoPage>
);

export default CodeOfConduct;
