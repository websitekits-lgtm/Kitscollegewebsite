// Academics, Examination, Admissions & Fees content.
// Mostly STATIC right now. Sections marked "ADMIN" will become DB-driven.

export interface Program {
  level: "UG" | "PG";
  code: string;
  name: string;
  duration: string;
  intake: number;
  affiliation: string;
}

export interface ExamScheduleItem {
  id: string;
  branch: string;        // CSE, ECE, etc.
  semester: string;
  type: "Regular" | "Supplementary" | "Mid-1" | "Mid-2" | "Internal";
  startDate: string;     // ISO date
  endDate: string;       // ISO date
  fileName: string;      // e.g., "B.Tech-IV-I-Regular-Apr-2025.pdf"
}

export interface QuestionPaper {
  id: string;
  branch: string;
  semester: string;
  subject: string;
  year: string;
  fileName: string;
}

export interface ExamForm {
  id: string;
  title: string;
  description?: string;
  fileName: string;
}

export interface AcademicCalendar {
  id: string;
  year: string;          // e.g., "2024-25"
  level: "B.Tech" | "M.Tech";
  fileName: string;
}

// =========================================================================
// COURSES & INTAKE — STATIC (rarely changes)
// =========================================================================
export const PROGRAMS: Program[] = [
  { level: "UG", code: "CSE",     name: "Computer Science & Engineering",         duration: "4 Years", intake: 180, affiliation: "JNTUK / AICTE" },
  { level: "UG", code: "AI&ML",   name: "Artificial Intelligence & Machine Learning", duration: "4 Years", intake: 120, affiliation: "JNTUK / AICTE" },
  { level: "UG", code: "ECE",     name: "Electronics & Communication Engineering", duration: "4 Years", intake: 120, affiliation: "JNTUK / AICTE" },
  { level: "UG", code: "EEE",     name: "Electrical & Electronics Engineering",   duration: "4 Years", intake: 60,  affiliation: "JNTUK / AICTE" },
  { level: "UG", code: "MECH",    name: "Mechanical Engineering",                  duration: "4 Years", intake: 60,  affiliation: "JNTUK / AICTE" },
  { level: "UG", code: "CIVIL",   name: "Civil Engineering",                       duration: "4 Years", intake: 60,  affiliation: "JNTUK / AICTE" },
  { level: "PG", code: "M.Tech-VLSI", name: "VLSI & Embedded Systems",            duration: "2 Years", intake: 18,  affiliation: "JNTUK / AICTE" },
  { level: "PG", code: "M.Tech-CSE",  name: "Computer Science & Engineering",     duration: "2 Years", intake: 18,  affiliation: "JNTUK / AICTE" },
];

// =========================================================================
// FEE STRUCTURE — DYNAMIC (changes yearly per Govt. order)
// ADMIN: replace with DB fetch when admin dashboard is live
// =========================================================================
export const FEE_STRUCTURE = {
  academicYear: "2024-25",
  notes: [
    "Fees are as per AP State Government / AFRC notifications and may change yearly.",
    "Convener-quota seats (~70%) follow the Govt. fee. Management seats follow AFRC-approved fee.",
    "Hostel and transport are optional and charged separately.",
  ],
  ugConvener: [
    { item: "Tuition Fee (per year)",     amount: "₹ 35,000 — ₹ 80,000" },
    { item: "Special Fee (per year)",     amount: "₹ 5,000" },
    { item: "Examination Fee (per sem)",  amount: "As per JNTUK norms" },
    { item: "Caution Deposit (refundable)", amount: "₹ 3,000" },
  ],
  ugManagement: [
    { item: "Tuition Fee (per year)",     amount: "As per AFRC ratification" },
    { item: "Other charges",              amount: "Same as Convener quota" },
  ],
  pgConvener: [
    { item: "Tuition Fee (per year)",     amount: "₹ 60,000 — ₹ 80,000" },
    { item: "Special Fee (per year)",     amount: "₹ 5,000" },
    { item: "Examination Fee (per sem)",  amount: "As per JNTUK norms" },
  ],
  optional: [
    { item: "Hostel (boarding + lodging) per year", amount: "₹ 60,000 — ₹ 70,000" },
    { item: "Transport (per academic year)",         amount: "₹ 12,000 — ₹ 18,000 (route-based)" },
    { item: "Books & uniform",                       amount: "₹ 4,000 — ₹ 6,000 (one-time)" },
  ],
  scholarships: [
    "AP State Government Post-Matric scholarship (BC / SC / ST / Minority / EWS)",
    "Central Government Means-cum-Merit scholarship",
    "Jindal / Aditya / NTPC / private scholarships (eligibility-based)",
    "KITS Merit-Based scholarship for top JEE / EAPCET ranks",
  ],
};

// =========================================================================
// SYLLABUS & REGULATIONS — STATIC
// =========================================================================
export const SYLLABUS_REGULATIONS = {
  intro:
    "All B.Tech and M.Tech programs at KITS follow the latest JNTUK regulations and AICTE-approved curriculum frameworks. Curriculum is reviewed periodically by the Board of Studies in consultation with industry experts to keep pace with emerging technologies.",
  regulationVersions: [
    { code: "R23",  applicableTo: "B.Tech batch admitted from 2023-24 onwards", summary: "Outcome-based education with reduced credits, increased honours/minors, mandatory internships." },
    { code: "R20",  applicableTo: "B.Tech batch admitted 2020-21 to 2022-23",   summary: "OBE-aligned, focus on employability skills and project-based learning." },
    { code: "R19",  applicableTo: "Earlier batches",                            summary: "Traditional credit-based system, archived for reference." },
    { code: "R20-PG", applicableTo: "M.Tech batch admitted 2020-21 onwards",    summary: "Research-oriented PG curriculum with thesis component." },
  ],
  components: [
    "Course objectives and outcomes (CO/PO mapping)",
    "Detailed unit-wise syllabus per subject",
    "Suggested textbooks and reference materials",
    "Internal & external assessment scheme",
    "Lab cycles and rubric-based evaluation",
    "Industry-oriented mini-projects and capstone projects",
  ],
};

// =========================================================================
// ACADEMIC CALENDARS — DYNAMIC (admin uploads each year)
// =========================================================================
export const ACADEMIC_CALENDARS: AcademicCalendar[] = [
  // ADMIN: populated from dashboard
  { id: "ac-2024-25-ug", year: "2024-25", level: "B.Tech", fileName: "ACADEMIC-CALENDAR-2024-25-UG.pdf" },
  { id: "ac-2024-25-pg", year: "2024-25", level: "M.Tech", fileName: "ACADEMIC-CALENDAR-2024-25-PG.pdf" },
  { id: "ac-2023-24-ug", year: "2023-24", level: "B.Tech", fileName: "academic-calendar-23-24.pdf" },
  { id: "ac-2022-23-ug", year: "2022-23", level: "B.Tech", fileName: "AC-2022-23.pdf" },
  { id: "ac-2021-22-ug", year: "2021-22", level: "B.Tech", fileName: "AC-2021-22.pdf" },
  { id: "ac-2020-21-ug", year: "2020-21", level: "B.Tech", fileName: "AC-2020-21.pdf" },
  { id: "ac-2019-20-ug", year: "2019-20", level: "B.Tech", fileName: "AC-2019-20.pdf" },
  { id: "ac-2018-19-ug", year: "2018-19", level: "B.Tech", fileName: "AC-2018-19.pdf" },
  { id: "ac-2017-18-ug", year: "2017-18", level: "B.Tech", fileName: "AC-2017-18.pdf" },
  { id: "ac-2016-17-ug", year: "2016-17", level: "B.Tech", fileName: "AC-2016-17.pdf" },
];

// =========================================================================
// EXAMINATION — All DYNAMIC (admin uploads schedules / results / papers)
// =========================================================================
export const EXTERNAL_EXAMS: ExamScheduleItem[] = [
  // ADMIN: managed via dashboard
  { id: "ext-1", branch: "All Branches",  semester: "B.Tech IV-I",  type: "Regular",        startDate: "2025-05-12", endDate: "2025-05-30", fileName: "B.Tech-IV-I-Regular-May-2025.pdf" },
  { id: "ext-2", branch: "All Branches",  semester: "B.Tech III-II", type: "Supplementary",  startDate: "2025-05-05", endDate: "2025-05-20", fileName: "B.Tech-III-II-Suppl-May-2025.pdf" },
  { id: "ext-3", branch: "All Branches",  semester: "M.Tech II-I",   type: "Regular",        startDate: "2025-04-25", endDate: "2025-05-10", fileName: "M.Tech-II-I-Regular-2025.pdf" },
];

export const INTERNAL_EXAMS: ExamScheduleItem[] = [
  { id: "int-1", branch: "All Branches",  semester: "B.Tech II-II",  type: "Mid-2",  startDate: "2025-04-22", endDate: "2025-04-26", fileName: "B.Tech-II-II-Mid2-Apr-2025.pdf" },
  { id: "int-2", branch: "All Branches",  semester: "B.Tech III-II", type: "Mid-2",  startDate: "2025-04-22", endDate: "2025-04-26", fileName: "B.Tech-III-II-Mid2-Apr-2025.pdf" },
  { id: "int-3", branch: "All Branches",  semester: "B.Tech I-II",   type: "Mid-1",  startDate: "2025-03-12", endDate: "2025-03-16", fileName: "B.Tech-I-II-Mid1-Mar-2025.pdf" },
];

export const QUESTION_PAPERS: QuestionPaper[] = [
  // ADMIN: large list; only sample data for now
  { id: "qp-1", branch: "CSE",   semester: "II-I",  subject: "Data Structures",          year: "2024", fileName: "DS-CSE-II-I-2024.pdf" },
  { id: "qp-2", branch: "CSE",   semester: "II-II", subject: "Database Management",      year: "2024", fileName: "DBMS-CSE-II-II-2024.pdf" },
  { id: "qp-3", branch: "ECE",   semester: "II-I",  subject: "Network Analysis",         year: "2024", fileName: "NA-ECE-II-I-2024.pdf" },
  { id: "qp-4", branch: "EEE",   semester: "III-I", subject: "Power Systems",            year: "2024", fileName: "PS-EEE-III-I-2024.pdf" },
  { id: "qp-5", branch: "MECH",  semester: "III-I", subject: "Thermodynamics",           year: "2024", fileName: "TD-MECH-III-I-2024.pdf" },
  { id: "qp-6", branch: "CIVIL", semester: "III-I", subject: "Structural Analysis",      year: "2024", fileName: "SA-CIVIL-III-I-2024.pdf" },
];

export const EXAM_FORMS: ExamForm[] = [
  // ADMIN: managed via dashboard
  { id: "f-1", title: "Examination Application Form",   description: "For appearing in regular / supplementary exams",       fileName: "exam-application.pdf" },
  { id: "f-2", title: "Revaluation Application Form",   description: "Submit within deadline after results publication",      fileName: "revaluation.pdf" },
  { id: "f-3", title: "Recounting Application Form",    description: "Request recounting of marks",                            fileName: "recounting.pdf" },
  { id: "f-4", title: "Original Degree Application",    description: "For passed-out students",                                fileName: "original-degree.pdf" },
  { id: "f-5", title: "Provisional Certificate Form",   description: "For final-year students awaiting degree",                fileName: "provisional-cert.pdf" },
  { id: "f-6", title: "Migration Certificate Form",     description: "Request migration certificate",                          fileName: "migration.pdf" },
  { id: "f-7", title: "Transcripts / Verification Form", description: "Marks card transcripts for higher studies / employers", fileName: "transcripts.pdf" },
];

export const EXAM_CONTACT = {
  controllerName: "Dr. (Controller of Examinations)",
  designation: "Controller of Examinations",
  email: "exams@kits-anna.com",
  phone: "+91-9153019999",
  address: "Examination Cell, Krishna Chaitanya Institute of Technology & Sciences, Markapur — 523316",
  officeHours: "Mon–Sat, 10:00 AM – 4:00 PM (closed on Sundays and university holidays)",
  helpdesk: [
    "Hall ticket / time-table queries",
    "Revaluation, recounting, supplementary registrations",
    "Provisional certificates, migration, original degrees",
    "JNTUK external coordination",
  ],
};

// =========================================================================
// ADMISSION PROCEDURE — STATIC
// =========================================================================
export const ADMISSION_PROCEDURE = {
  intro:
    "KITS Markapur welcomes admissions to all B.Tech and M.Tech programs through the AP State counselling process and direct management quota. Our admission process is transparent, merit-based, and student-friendly.",
  ugSteps: [
    "Appear for AP EAPCET (formerly EAMCET) and qualify with valid rank.",
    "Use code KCIT during web counselling to choose KITS Markapur.",
    "After seat allotment, report to the campus with original documents on the counselling deadline.",
    "Pay the prescribed tuition + special fees and complete admission formalities.",
    "Attend the orientation programme on the academic-year start date.",
  ],
  pgSteps: [
    "Qualify GATE / AP PGECET with valid rank/score.",
    "Apply through AP PGECET counselling, choosing KITS Markapur.",
    "Report on the allotted date with originals + DD for fees.",
    "Complete admission and join the M.Tech orientation.",
  ],
  documentsChecklist: [
    "10th class & Intermediate / Diploma marks memos",
    "Transfer Certificate (TC) and Conduct Certificate from previous institution",
    "EAPCET / PGECET rank card and counselling allotment letter",
    "Income, Caste, and Residence certificates (if applicable)",
    "Aadhaar card photocopy",
    "8 recent passport-size photographs",
    "Migration certificate (if applicable from other state boards)",
  ],
};
