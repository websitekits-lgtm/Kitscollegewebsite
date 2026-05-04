import { Award } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";

const sidebar = {
  heading: "About KITS",
  links: [
    { label: "Vision & Mission", to: "/about/vision-mission" },
    { label: "Organization Chart", to: "/about/organization-chart" },
    { label: "Governing Body", to: "/about/governing-body" },
    { label: "Accreditation / Ranking", to: "/about/accreditation" },
    { label: "Institutional Development Plan", to: "/about/institutional-development-plan" },
    { label: "Code of Conduct", to: "/about/code-of-conduct" },
    { label: "Code of Ethics", to: "/about/code-of-ethics" },
    { label: "Annual Report", to: "/about/annual-report" },
    { label: "Audit Report", to: "/about/audit-report" },
  ],
};

// Each accreditation/membership has its own certificate PDF
const cards: LinkCard[] = [
  { label: "NAAC Accreditation",       description: "National Assessment & Accreditation Council certificate.",        to: "/naac",      isPdf: false },
  { label: "AICTE Approval",            description: "All India Council for Technical Education year-wise approvals.",  to: "/aicte",     isPdf: false },
  { label: "JNTU Kakinada Affiliation", description: "JNTUK temporary affiliation certificate.",                          to: "#",          isPdf: true },
  { label: "ISO 9001 Certificate",       description: "ISO 9001 quality management certification (2025–28).",            to: "#",          isPdf: true },
  { label: "ISTE Membership",            description: "Indian Society for Technical Education institutional membership.", to: "#",          isPdf: true },
  { label: "The Institution of Engineers (IEI)", description: "IEI institutional membership certificate.",              to: "#",          isPdf: true },
];

const Accreditation = () => (
  <InfoPage
    eyebrow="About KITS"
    title="Accreditation & Ranking"
    subtitle="Our institutional approvals, accreditations, memberships and rankings."
    breadcrumb={[{ label: "About", to: "/about" }, { label: "Accreditation" }]}
    sidebar={sidebar}
  >
    <p className="not-prose text-base text-muted-foreground leading-relaxed mb-8">
      KITS Markapur is approved by AICTE, affiliated to JNTU Kakinada, accredited by NAAC, and holds
      institutional memberships with ISO, ISTE, and the Institution of Engineers (India). Each
      certificate is available below for verification.
    </p>

    <div className="not-prose mb-6 flex items-center gap-3">
      <Award className="size-5 text-accent" />
      <h2 className="font-display text-xl font-semibold m-0">Approvals & Memberships</h2>
    </div>
    <div className="not-prose">
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default Accreditation;
