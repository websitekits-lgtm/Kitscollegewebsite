import { InfoPage } from "@/components/site/InfoPage";
import { FileListTable, type FileRow } from "@/components/site/FileListTable";
import { ACADEMIC_CALENDARS } from "@/lib/academicsContent";

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

const AcademicCalendars = () => {
  const rows: FileRow[] = ACADEMIC_CALENDARS.map((c) => ({
    id: c.id,
    fileName: c.fileName,
    cells: {
      "Academic Year": c.year,
      Programme: c.level,
    },
  }));

  return (
    <InfoPage
      eyebrow="Examination"
      title="Academic Calendars"
      subtitle="Semester-wise calendars showing classwork, examinations, holidays, and key academic events."
      breadcrumb={[
        { label: "Examination", to: "/examination" },
        { label: "Academic Calendars" },
      ]}
      sidebar={sidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        The academic calendar is the master plan for the year — it lists semester start/end dates,
        mid-exam windows, end-semester windows, vacations, and important institutional events.
      </p>
      <div className="not-prose">
        <FileListTable
          rows={rows}
          columns={["Academic Year", "Programme"]}
          emptyMessage="No calendars uploaded yet. They will be available shortly."
        />
      </div>
    </InfoPage>
  );
};

export default AcademicCalendars;
