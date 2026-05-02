import { InfoPage } from "@/components/site/InfoPage";
import { FileListTable, type FileRow } from "@/components/site/FileListTable";
import { AQAR_REPORTS } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const AqarReports = () => {
  const rows: FileRow[] = AQAR_REPORTS.map((r) => ({
    id: r.year,
    fileName: r.fileName,
    cells: { "Academic Year": r.year },
  }));

  return (
    <InfoPage
      eyebrow="IQAC"
      title="AQAR Reports"
      subtitle="Annual Quality Assurance Reports submitted to NAAC."
      breadcrumb={[{ label: "IQAC", to: "/iqac" }, { label: "AQAR" }]}
      sidebar={iqacSidebar}
    >
      <p className="not-prose text-base text-muted-foreground leading-relaxed mb-6">
        AQAR is the year-on-year quality report submitted to NAAC. Each report consolidates the
        institution's progress against NAAC criteria and presents quality enhancement actions.
      </p>
      <div className="not-prose">
        <FileListTable
          rows={rows}
          columns={["Academic Year"]}
          emptyMessage="AQAR reports will be uploaded here as they are published."
          searchable={false}
        />
      </div>
    </InfoPage>
  );
};

export default AqarReports;
