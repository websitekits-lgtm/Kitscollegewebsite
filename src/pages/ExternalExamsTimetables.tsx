import { InfoPage } from "@/components/site/InfoPage";
import { FileListTable, type FileRow } from "@/components/site/FileListTable";
import { EXTERNAL_EXAMS } from "@/lib/academicsContent";

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

const ExternalExamsTimetables = () => {
  const rows: FileRow[] = EXTERNAL_EXAMS.map((e) => ({
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
      title="External Exams Timetables"
      subtitle="JNTUK end-semester regular and supplementary examination schedules."
      breadcrumb={[
        { label: "Examination", to: "/examination" },
        { label: "External Timetables" },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        Timetables are released and updated by JNTU Kakinada. This page mirrors the latest schedules
        for KITS Markapur students. Always cross-check with JNTUK's official portal for last-minute
        changes.
      </p>
      <div className="not-prose">
        <FileListTable
          rows={rows}
          columns={["Branch", "Semester", "Exam Type", "Date Range"]}
          emptyMessage="No external exam timetables published right now."
        />
      </div>
    </InfoPage>
  );
};

export default ExternalExamsTimetables;
