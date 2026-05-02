import {
  CalendarClock,
  ClipboardList,
  FileText,
  CalendarDays,
  ScrollText,
  Download,
  Phone,
  ExternalLink,
} from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";

const sidebar = {
  heading: "Examination",
  links: [
    { label: "External Exams Timetables", to: "/examination/external-timetables" },
    { label: "Internal Exams Timetables", to: "/examination/internal-timetables" },
    { label: "Academic Calendars", to: "/examination/academic-calendars" },
    { label: "Previous Question Papers", to: "/examination/question-papers" },
    { label: "Forms Download", to: "/examination/forms-download" },
    { label: "Contact Details", to: "/examination/contact" },
  ],
};

const cards: LinkCard[] = [
  {
    label: "External Exams Timetables",
    description: "Schedules for JNTUK regular and supplementary semester examinations.",
    to: "/examination/external-timetables",
    icon: CalendarClock,
  },
  {
    label: "Internal Exams Timetables",
    description: "Mid-term, lab internal, and continuous-evaluation schedules.",
    to: "/examination/internal-timetables",
    icon: ClipboardList,
  },
  {
    label: "Academic Calendars",
    description: "Semester-wise calendars for B.Tech and M.Tech programs.",
    to: "/examination/academic-calendars",
    icon: CalendarDays,
  },
  {
    label: "Academic Results",
    description: "Check JNTUK results portal directly.",
    href: "http://jntukresults.edu.in/",
    icon: ExternalLink,
  },
  {
    label: "Previous Question Papers",
    description: "Branch- and subject-wise archive of question papers.",
    to: "/examination/question-papers",
    icon: ScrollText,
  },
  {
    label: "Forms Download",
    description: "Examination-related application and certificate forms.",
    to: "/examination/forms-download",
    icon: Download,
  },
  {
    label: "Contact Details",
    description: "Reach the Examination Cell for queries and assistance.",
    to: "/examination/contact",
    icon: Phone,
  },
];

const Examination = () => (
  <InfoPage
    eyebrow="Academics"
    title="Examination"
    subtitle="Timetables, results, question papers, forms and contacts — everything related to the KITS examination cell."
    breadcrumb={[{ label: "Examination" }]}
    sidebar={sidebar}
  >
    <div className="not-prose mb-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-4">
        <FileText className="size-6 text-accent shrink-0 mt-1" />
        <div>
          <h2 className="font-display text-xl font-semibold mb-2">About the Examination Cell</h2>
          <p className="text-foreground/85 leading-relaxed">
            The Examination Cell at KITS coordinates with JNTU Kakinada for the smooth conduct of all
            external semester examinations and manages internal assessments, mid-term tests, lab evaluations,
            certificate issuance, and grievance handling related to results and revaluation.
          </p>
        </div>
      </div>
    </div>

    <div className="not-prose">
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default Examination;
