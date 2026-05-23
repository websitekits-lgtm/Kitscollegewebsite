/**
 * Mock data for the Exam Cell Portal.
 *
 * Cross-portal wiring:
 * - Exam Cell OWNS the exam schedule, results, hall tickets and
 *   revaluation queue. Student / HOD / Principal portals READ this data.
 * - Reads `examSchedule`, `semesterResults`, `internalMarks` from
 *   studentData.ts so changes here are visible everywhere.
 * - Reads `roster` and `departments` from college.ts for eligibility +
 *   department roll-ups.
 */

export const examProfile = {
  id: "EC-01",
  name: "Mr. P. Ramesh",
  designation: "Controller of Examinations",
  email: "exams@kits-anna.com",
  phone: "+91 91530 11122",
  qualification: "M.Tech (CSE)",
  experience: 14,
  joinedYear: 2016,
};

export interface HallTicketRelease {
  id: string;
  semester: number;
  examType: "Internal" | "Sem-End" | "Supplementary";
  released: boolean;
  releaseDate?: string;
  studentsCount: number;
}

export const hallTicketReleases: HallTicketRelease[] = [
  { id: "HT-2026-S6", semester: 6, examType: "Sem-End",         released: true,  releaseDate: "2026-05-18", studentsCount: 232 },
  { id: "HT-2026-S4", semester: 4, examType: "Sem-End",         released: true,  releaseDate: "2026-05-18", studentsCount: 234 },
  { id: "HT-2026-S2", semester: 2, examType: "Sem-End",         released: false,                              studentsCount: 238 },
  { id: "HT-2026-SP", semester: 6, examType: "Supplementary",   released: false,                              studentsCount:  18 },
];

export interface SeatingAllocation {
  hall: string;
  capacity: number;
  allocated: number;
  invigilators: number;
  examDate: string;
  paper: string;
}

export const seatingAllocations: SeatingAllocation[] = [
  { hall: "Block A • Hall 1", capacity: 60, allocated: 58, invigilators: 2, examDate: "2026-05-28", paper: "CS601 — Compiler Design" },
  { hall: "Block A • Hall 2", capacity: 60, allocated: 60, invigilators: 2, examDate: "2026-05-28", paper: "CS601 — Compiler Design" },
  { hall: "Block B • Hall 3", capacity: 60, allocated: 56, invigilators: 2, examDate: "2026-05-28", paper: "CS601 — Compiler Design" },
  { hall: "Block A • Hall 1", capacity: 60, allocated: 60, invigilators: 2, examDate: "2026-05-30", paper: "CS602 — Computer Networks" },
];

export interface RevaluationRequest {
  id: string;
  rollNo: string;
  studentName: string;
  paperCode: string;
  paperName: string;
  originalMarks: number;
  fee: number;
  raisedOn: string;
  status: "Pending" | "Re-evaluated" | "Awarded" | "No Change";
  revisedMarks?: number;
}

export const revaluationRequests: RevaluationRequest[] = [
  // Logged-in student's own revaluation request — shows up in Student → Examinations → Revaluation
  { id: "RV-903", rollNo: "22B81A0501", studentName: "A. Sasidhar Reddy", paperCode: "CS603", paperName: "Machine Learning",  originalMarks: 36, fee: 350, raisedOn: "2026-04-23", status: "Pending"      },
  { id: "RV-888", rollNo: "22B81A0501", studentName: "A. Sasidhar Reddy", paperCode: "CS604", paperName: "Cloud Computing",   originalMarks: 38, fee: 350, raisedOn: "2026-03-14", status: "Awarded",      revisedMarks: 44 },
  { id: "RV-901", rollNo: "22B81A0506", studentName: "F. Ajay Kumar",    paperCode: "CS602", paperName: "Computer Networks", originalMarks: 33, fee: 350, raisedOn: "2026-04-22", status: "Pending"      },
  { id: "RV-902", rollNo: "22B81A0510", studentName: "J. Rohith",        paperCode: "CS603", paperName: "Machine Learning",  originalMarks: 31, fee: 350, raisedOn: "2026-04-22", status: "Pending"      },
  { id: "RV-895", rollNo: "22B81A0516", studentName: "P. Vamsi",         paperCode: "CS604", paperName: "Cloud Computing",   originalMarks: 28, fee: 350, raisedOn: "2026-04-20", status: "Re-evaluated", revisedMarks: 36 },
  { id: "RV-892", rollNo: "22B81A0520", studentName: "T. Bharath",       paperCode: "CS601", paperName: "Compiler Design",   originalMarks: 35, fee: 350, raisedOn: "2026-04-18", status: "No Change",    revisedMarks: 35 },
  { id: "RV-890", rollNo: "22B81A0524", studentName: "X. Aravind",       paperCode: "CS605", paperName: "Cyber Security",    originalMarks: 30, fee: 350, raisedOn: "2026-04-17", status: "Awarded",      revisedMarks: 42 },
];

export interface RecountingRequest {
  id: string;
  rollNo: string;
  paperCode: string;
  fee: number;
  status: "Pending" | "Completed";
  raisedOn: string;
}

export const recountingRequests: RecountingRequest[] = [
  { id: "RC-501", rollNo: "22B81A0508", paperCode: "CS601", fee: 100, status: "Pending",   raisedOn: "2026-04-25" },
  { id: "RC-498", rollNo: "22B81A0512", paperCode: "CS604", fee: 100, status: "Completed", raisedOn: "2026-04-20" },
];

export interface SupplementaryCandidate {
  rollNo: string;
  name: string;
  papers: number;
  registered: boolean;
}

export const supplementaryCandidates: SupplementaryCandidate[] = [
  { rollNo: "22B81A0506", name: "F. Ajay Kumar", papers: 3, registered: true  },
  { rollNo: "22B81A0516", name: "P. Vamsi",      papers: 4, registered: true  },
  { rollNo: "22B81A0514", name: "N. Praveen",    papers: 2, registered: false },
  { rollNo: "22B81A0524", name: "X. Aravind",    papers: 2, registered: true  },
];

export interface Regulation {
  code: "R18" | "R20" | "R23";
  name: string;
  effectiveFrom: string;
  scheme: string;
  totalCredits: number;
  passMarks: number;
  description: string;
  active: boolean;
}

export const regulations: Regulation[] = [
  { code: "R18", name: "JNTUA R18",      effectiveFrom: "2018-08-01", scheme: "Choice Based Credit System (CBCS)", totalCredits: 160, passMarks: 35, description: "Legacy regulation. Phased out from 2026.", active: false },
  { code: "R20", name: "JNTUA R20",      effectiveFrom: "2020-08-01", scheme: "CBCS + Outcome Based Education",     totalCredits: 160, passMarks: 35, description: "Currently active for 3rd & 4th year batches.", active: true  },
  { code: "R23", name: "Autonomous R23", effectiveFrom: "2023-08-01", scheme: "Outcome + Industry-aligned",         totalCredits: 165, passMarks: 40, description: "Active for 1st and 2nd year. Includes mandatory industry electives.", active: true  },
];

export interface GradePoint {
  range: string;
  grade: string;
  points: number;
  description: "Outstanding" | "Excellent" | "Very Good" | "Good" | "Average" | "Pass" | "Fail";
}

export const gradeScale: GradePoint[] = [
  { range: "90 – 100", grade: "O",  points: 10, description: "Outstanding" },
  { range: "80 – 89",  grade: "A+", points:  9, description: "Excellent"   },
  { range: "70 – 79",  grade: "A",  points:  8, description: "Very Good"   },
  { range: "60 – 69",  grade: "B+", points:  7, description: "Good"        },
  { range: "50 – 59",  grade: "B",  points:  6, description: "Average"     },
  { range: "40 – 49",  grade: "C",  points:  5, description: "Pass"        },
  { range: "0  – 39",  grade: "F",  points:  0, description: "Fail"        },
];

export interface MarksUploadJob {
  id: string;
  semester: number;
  paperCode: string;
  paperName: string;
  examType: "Internal" | "Sem-End";
  status: "Pending" | "Uploaded" | "Locked" | "Published";
  uploadedBy?: string;
  uploadedOn?: string;
}

export const marksUploadJobs: MarksUploadJob[] = [
  { id: "MU01", semester: 6, paperCode: "CS601", paperName: "Compiler Design",     examType: "Internal", status: "Published", uploadedBy: "Dr. R. Kumar",    uploadedOn: "2026-05-12" },
  { id: "MU02", semester: 6, paperCode: "CS602", paperName: "Computer Networks",   examType: "Internal", status: "Published", uploadedBy: "Mrs. S. Padma",   uploadedOn: "2026-05-12" },
  { id: "MU03", semester: 6, paperCode: "CS603", paperName: "Machine Learning",    examType: "Internal", status: "Uploaded",  uploadedBy: "Dr. P. Sridevi",  uploadedOn: "2026-05-18" },
  { id: "MU04", semester: 6, paperCode: "CS604", paperName: "Cloud Computing",     examType: "Internal", status: "Pending"  },
  { id: "MU05", semester: 6, paperCode: "CS605", paperName: "Cyber Security",      examType: "Internal", status: "Pending"  },
];

// ----- aggregates used by the dashboard -----
export const pendingResultsCount = marksUploadJobs.filter((j) => j.status !== "Published").length;
export const pendingHallTickets = hallTicketReleases.filter((h) => !h.released).length;
export const pendingRevaluations = revaluationRequests.filter((r) => r.status === "Pending").length;
