import { Info, FileText, Briefcase, BookOpenCheck, Eye, Compass, MapPin, Users, ScrollText, ShieldCheck } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { infoCornerSidebar } from "./InfoCornerSidebar";

const primaryCards: LinkCard[] = [
  { label: "Right to Information",   description: "File RTI requests under the Right to Information Act, 2005.",  to: "/info/rti",      icon: FileText },
  { label: "Job Openings",            description: "Current teaching and non-teaching vacancies at KITS.",         to: "/info/jobs",     icon: Briefcase },
  { label: "Telephone Directory",     description: "Department, office and hostel contact numbers.",                to: "/info/directory", icon: BookOpenCheck },
];

const quickLinks: LinkCard[] = [
  { label: "Vision & Mission",     description: "Our institutional vision and mission.",                       to: "/about/vision-mission",      icon: Eye },
  { label: "Code of Ethics",        description: "Institutional commitment to integrity.",                      to: "/about/code-of-ethics",      icon: ShieldCheck, isPdf: true },
  { label: "Organization Chart",    description: "Institutional hierarchy and reporting structure.",            to: "/about/organization-chart",  icon: Compass },
  { label: "College Location",      description: "Address, map, and how to reach KITS Markapur.",                to: "/about/college-location",    icon: MapPin },
  { label: "Governing Body",         description: "Members of the apex governing body.",                         to: "/about/governing-body",      icon: Users },
  { label: "HR Policy",              description: "Human resources policy for KITS staff.",                      to: "/about/hr-policy",           icon: ScrollText, isPdf: true },
];

const InfoCorner = () => (
  <InfoPage
    eyebrow="Information"
    title="Information Corner"
    subtitle="Quick access to RTI, job openings, the telephone directory, and frequently-needed institutional documents."
    breadcrumb={[{ label: "Information Corner" }]}
    sidebar={infoCornerSidebar}
  >
    <div className="not-prose mb-10 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <Info className="size-6 text-accent shrink-0 mt-1" />
        <p className="text-foreground/85 leading-relaxed">
          The Information Corner is your one-stop destination for transparency-related links —
          file RTI requests, browse current job openings, look up campus phone numbers, and access
          frequently-needed institutional documents.
        </p>
      </div>
    </div>

    <div className="not-prose mb-10">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Main Resources</h2>
      <LinkCardGrid cards={primaryCards} />
    </div>

    <div className="not-prose">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Quick Links</h2>
      <LinkCardGrid cards={quickLinks} />
    </div>
  </InfoPage>
);

export default InfoCorner;
