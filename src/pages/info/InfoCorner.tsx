import { Info, FileText, Briefcase, BookOpenCheck } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { infoCornerSidebar } from "./InfoCornerSidebar";

const cards: LinkCard[] = [
  { label: "Right to Information",   description: "File RTI requests under the Right to Information Act, 2005.",  to: "/info/rti",      icon: FileText },
  { label: "Job Openings",            description: "Current teaching and non-teaching vacancies at KITS.",         to: "/info/jobs",     icon: Briefcase },
  { label: "Telephone Directory",     description: "Department, office and hostel contact numbers.",                to: "/info/directory", icon: BookOpenCheck },
];

const InfoCorner = () => (
  <InfoPage
    eyebrow="Information"
    title="Information Corner"
    subtitle="Quick access to RTI, job openings, and the institutional telephone directory."
    breadcrumb={[{ label: "Information Corner" }]}
    sidebar={infoCornerSidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <Info className="size-6 text-accent shrink-0 mt-1" />
        <p className="text-foreground/85 leading-relaxed">
          The Information Corner is your one-stop destination for transparency-related links —
          file RTI requests, browse current job openings, and look up campus phone numbers.
        </p>
      </div>
    </div>
    <div className="not-prose">
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default InfoCorner;
