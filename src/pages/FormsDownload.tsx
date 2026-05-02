import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { EXAM_FORMS } from "@/lib/academicsContent";

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

const FormsDownload = () => {
  const cards: LinkCard[] = EXAM_FORMS.map((f) => ({
    label: f.title,
    description: f.description,
    isPdf: true,
  }));

  return (
    <InfoPage
      eyebrow="Examination"
      title="Forms Download"
      subtitle="Examination-related forms — applications, revaluation, certificates, transcripts and more."
      breadcrumb={[
        { label: "Examination", to: "/examination" },
        { label: "Forms" },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        Download the appropriate form, fill it in, and submit it to the Examination Cell on or before
        the deadline. Late submissions may attract additional charges or rejection.
      </p>
      <div className="not-prose">
        <LinkCardGrid cards={cards} columns={2} />
      </div>
    </InfoPage>
  );
};

export default FormsDownload;
