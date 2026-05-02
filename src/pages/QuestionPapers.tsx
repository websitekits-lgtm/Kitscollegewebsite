import { InfoPage } from "@/components/site/InfoPage";
import { FileListTable, type FileRow } from "@/components/site/FileListTable";
import { QUESTION_PAPERS } from "@/lib/academicsContent";

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

const QuestionPapers = () => {
  const rows: FileRow[] = QUESTION_PAPERS.map((q) => ({
    id: q.id,
    fileName: q.fileName,
    cells: {
      Branch: q.branch,
      Semester: q.semester,
      Subject: q.subject,
      Year: q.year,
    },
  }));

  return (
    <InfoPage
      eyebrow="Examination"
      title="Previous Question Papers"
      subtitle="Branch- and subject-wise archive of previous year question papers — handy for exam preparation."
      breadcrumb={[
        { label: "Examination", to: "/examination" },
        { label: "Question Papers" },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        Use the search box to quickly find papers by branch, subject, or semester. The archive grows
        every semester as new exam papers are released.
      </p>
      <div className="not-prose">
        <FileListTable
          rows={rows}
          columns={["Branch", "Semester", "Subject", "Year"]}
          emptyMessage="No question papers available yet. They will be uploaded shortly."
        />
      </div>
    </InfoPage>
  );
};

export default QuestionPapers;
