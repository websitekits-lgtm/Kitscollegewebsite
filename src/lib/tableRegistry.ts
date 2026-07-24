// Registry of every admin-editable data table on the website.
// Each entry defines the columns; rows live in the `data_table_rows` table
// keyed by `table_key`. Managed from Admin → Data Tables.

export interface TableColumn {
  key: string;
  label: string;
  /** Render a textarea in admin (long text) */
  long?: boolean;
}

export interface TableDef {
  key: string;
  label: string;
  page: string; // public route where it renders
  columns: TableColumn[];
}

export const TABLE_REGISTRY: TableDef[] = [
  {
    key: "fdp-attendance",
    label: "Faculty FDPs / Workshops / Conferences",
    page: "/research/fdp-attendance",
    columns: [
      { key: "faculty", label: "Faculty" },
      { key: "department", label: "Department" },
      { key: "programme", label: "Programme" },
      { key: "organiser", label: "Organiser" },
      { key: "duration", label: "Duration" },
      { key: "year", label: "Year" },
    ],
  },
  {
    key: "faculty-publications",
    label: "Faculty Publications",
    page: "/research/publications",
    columns: [
      { key: "faculty", label: "Faculty" },
      { key: "department", label: "Department" },
      { key: "title", label: "Title", long: true },
      { key: "venue", label: "Journal / Venue" },
      { key: "year", label: "Year" },
      { key: "type", label: "Type" },
    ],
  },
  {
    key: "rnd-activities",
    label: "Recent R&D Activities",
    page: "/research/activities",
    columns: [
      { key: "date", label: "Month (YYYY-MM)" },
      { key: "title", label: "Title" },
      { key: "detail", label: "Details", long: true },
    ],
  },
  {
    key: "phd-supervisors",
    label: "Ph.D Supervisors",
    page: "/research/phd-supervisors",
    columns: [
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "department", label: "Department" },
      { key: "university", label: "University" },
      { key: "area", label: "Research Area", long: true },
    ],
  },
  {
    key: "placement-stats",
    label: "Year-wise Placement Statistics",
    page: "/placements/details",
    columns: [
      { key: "year", label: "Year" },
      { key: "totalOffers", label: "Total Offers" },
      { key: "uniquePlacements", label: "Students Placed" },
      { key: "highestPackageLpa", label: "Highest (LPA)" },
      { key: "avgPackageLpa", label: "Average (LPA)" },
      { key: "topRecruiters", label: "Top Recruiters (comma-separated)", long: true },
    ],
  },
  {
    key: "courses-intake",
    label: "Courses & Intake",
    page: "/admissions/courses-intake",
    columns: [
      { key: "level", label: "Level (UG/PG)" },
      { key: "code", label: "Code" },
      { key: "name", label: "Programme Name", long: true },
      { key: "duration", label: "Duration" },
      { key: "intake", label: "Intake" },
      { key: "affiliation", label: "Affiliation" },
    ],
  },
  {
    key: "office-staff",
    label: "Office Staff",
    page: "/about/office-staff",
    columns: [
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "department", label: "Department" },
      { key: "qualifications", label: "Qualifications" },
    ],
  },
  {
    key: "syllabus-regulations",
    label: "Syllabus Regulation Versions",
    page: "/academics/syllabus-regulations",
    columns: [
      { key: "code", label: "Regulation" },
      { key: "applicableTo", label: "Applicable To", long: true },
      { key: "summary", label: "Summary", long: true },
    ],
  },
];
