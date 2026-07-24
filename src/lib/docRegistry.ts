// Registry of every admin-manageable document slot on the website.
// Single slots power PdfPage download pages (doc_key = slug of the page title).
// List categories power multi-file tables (question papers, calendars, …).

export interface DocSlot {
  key: string;
  label: string;
  page: string; // public route where it appears
}

export const SINGLE_DOC_SLOTS: DocSlot[] = [
  { key: "college-brochure",               label: "College Brochure",                 page: "/admissions/brochure" },
  { key: "fee-refund-policy",              label: "Fee Refund Policy (official PDF)", page: "/admissions/fee-refund-policy" },
  { key: "reservation-roster",             label: "Reservation Roster",               page: "/admissions/reservation-roster" },
  { key: "code-of-ethics",                 label: "Code of Ethics",                   page: "/about/code-of-ethics" },
  { key: "hr-policy",                      label: "HR Policy",                        page: "/about/hr-policy" },
  { key: "annual-report",                  label: "Annual Report",                    page: "/about/annual-report" },
  { key: "audit-report",                   label: "Audit Report",                     page: "/about/audit-report" },
  { key: "institutional-development-plan", label: "Institutional Development Plan",   page: "/about/institutional-development-plan" },
  { key: "mandatory-disclosure",           label: "Mandatory Disclosure",             page: "/mandatory-disclosure" },
  { key: "academic-collaborations-mous",   label: "Academic Collaborations & MoUs",   page: "/academics/collaborations" },
  { key: "dvv-clarifications",             label: "NAAC DVV Clarifications",          page: "/naac" },
  { key: "self-study-report-ssr",          label: "NAAC Self Study Report (SSR)",     page: "/naac" },
  { key: "internship-details",             label: "Internship Details",               page: "/placements/internships" },
  { key: "barrier-free-environment",       label: "Barrier-Free Environment",         page: "/student-life/barrier-free" },
  { key: "equal-opportunity-cell",         label: "Equal Opportunity Cell",           page: "/student-life/equal-opportunity" },
  { key: "telephone-directory",            label: "Telephone Directory",              page: "/info/directory" },
  { key: "student-placement-gallery",      label: "Student Placement Gallery (PDF)",  page: "/placements/details" },
];

export interface DocCategory {
  key: string;
  label: string;
  page: string;
}

export const DOC_CATEGORIES: DocCategory[] = [
  { key: "question-papers",     label: "Previous Question Papers",   page: "/examination/question-papers" },
  { key: "academic-calendars",  label: "Academic Calendars",         page: "/examination/academic-calendars" },
  { key: "external-timetables", label: "External Exams Timetables",  page: "/examination/external-timetables" },
  { key: "internal-timetables", label: "Internal Exams Timetables",  page: "/examination/internal-timetables" },
  { key: "exam-forms",          label: "Examination Forms",          page: "/examination/forms-download" },
  { key: "aqar-reports",        label: "IQAC AQAR Reports",          page: "/iqac" },
  { key: "aicte-approvals",     label: "AICTE Approval Letters",     page: "/aicte" },
  { key: "placement-records",   label: "Year-wise Placement Details", page: "/placements/details" },
];
