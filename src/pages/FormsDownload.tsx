import { InfoPage } from "@/components/site/InfoPage";
import { FileListTable, type FileRow } from "@/components/site/FileListTable";
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
  const rows: FileRow[] = EXAM_FORMS.map((f, i) => ({
    id: `form-${i}`,
    fileName: `${f.title}.pdf`,
    cells: { Form: f.title, Description: f.description },
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
        <FileListTable docCategory="exam-forms" rows={rows} columns={["Form", "Description"]} />
      </div>
    </InfoPage>
  );
};

export default FormsDownload;
