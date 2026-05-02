import { InfoPage } from "@/components/site/InfoPage";
import { FileListTable, type FileRow } from "@/components/site/FileListTable";
import { INTERNAL_EXAMS } from "@/lib/academicsContent";

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

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const InternalExamsTimetables = () => {
  const rows: FileRow[] = INTERNAL_EXAMS.map((e) => ({
    id: e.id,
    fileName: e.fileName,
    cells: {
      Branch: e.branch,
      Semester: e.semester,
      "Exam Type": e.type,
      "Date Range": `${fmt(e.startDate)} – ${fmt(e.endDate)}`,
    },
  }));

  return (
    <InfoPage
      eyebrow="Examination"
      title="Internal Exams Timetables"
      subtitle="Mid-term, lab internal, and continuous-evaluation schedules conducted within the institution."
      breadcrumb={[
        { label: "Examination", to: "/examination" },
        { label: "Internal Timetables" },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        Internal assessments are administered as per the academic calendar and contribute to your
        overall semester grade as per JNTUK regulations.
      </p>
      <div className="not-prose">
        <FileListTable
          rows={rows}
          columns={["Branch", "Semester", "Exam Type", "Date Range"]}
          emptyMessage="No internal exam timetables published right now."
        />
      </div>
    </InfoPage>
  );
};

export default InternalExamsTimetables;
