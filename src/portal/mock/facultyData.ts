/**
 * Mock data for the Faculty Portal.
 *
 * Cross-portal wiring:
 * - Reads `subjects`, `timetable`, `studyMaterials`, `assignments` and
 *   `notifications` directly from studentData.ts — so when faculty
 *   uploads a material or posts a notice (conceptually), it shows up in
 *   the Student Portal automatically because they share the same array.
 * - Reads `roster` from college.ts — every student listed in the
 *   Faculty's "Students" page is the same person their Student-Portal
 *   profile reflects.
 *
 * The constant `assignedFaculty` declares which faculty member is
 * "logged in" for the demo. All faculty pages slice the global timetable
 * / subjects / materials by this faculty's name so the views feel real.
 */

import { facultyDirectory } from "./college";
import { subjects, timetable, type Subject, type TimetableSlot } from "./studentData";

/** Which faculty we mock-as in the demo (the CSE HoD, who teaches CS601 + CS606). */
export const assignedFaculty = facultyDirectory[0]; // Dr. R. Kumar

/** Subjects this faculty is teaching this semester. */
export const facultySubjects: Subject[] = subjects.filter((s) =>
  assignedFaculty.subjectsTaught.includes(s.code),
);

/** Filtered timetable — only the slots taken by this faculty. */
export const facultyTimetable: TimetableSlot[] = timetable.filter(
  (t) => t.faculty === assignedFaculty.name,
);

/** Sessions still awaiting attendance entry (today). */
export interface PendingSession {
  code: string;
  subject: string;
  period: number;
  startTime: string;
  endTime: string;
  room: string;
  date: string;
}

export const pendingAttendanceSessions: PendingSession[] = [
  { code: "CS601", subject: "Compiler Design",     period: 1, startTime: "09:00", endTime: "09:50", room: "CSE-201", date: "2026-05-20" },
  { code: "CS606", subject: "Compiler Design Lab", period: 5, startTime: "13:30", endTime: "16:00", room: "Lab-3",   date: "2026-05-20" },
];

export interface LessonPlan {
  id: string;
  code: string;
  subject: string;
  unit: number;
  topic: string;
  plannedDate: string;
  status: "Completed" | "In Progress" | "Pending";
}

export const lessonPlans: LessonPlan[] = [
  { id: "LP01", code: "CS601", subject: "Compiler Design",     unit: 1, topic: "Introduction & Phases of a compiler", plannedDate: "2026-01-08", status: "Completed" },
  { id: "LP02", code: "CS601", subject: "Compiler Design",     unit: 2, topic: "Lexical analysis & LEX",              plannedDate: "2026-02-12", status: "Completed" },
  { id: "LP03", code: "CS601", subject: "Compiler Design",     unit: 3, topic: "Syntax analysis — LL & LR parsing",   plannedDate: "2026-03-15", status: "In Progress" },
  { id: "LP04", code: "CS601", subject: "Compiler Design",     unit: 4, topic: "Semantic analysis, SDT, type checks", plannedDate: "2026-04-20", status: "Pending" },
  { id: "LP05", code: "CS601", subject: "Compiler Design",     unit: 5, topic: "Code generation & optimisation",       plannedDate: "2026-05-15", status: "Pending" },
  { id: "LP06", code: "CS606", subject: "Compiler Design Lab", unit: 1, topic: "LEX experiments — Token recognisers", plannedDate: "2026-01-15", status: "Completed" },
  { id: "LP07", code: "CS606", subject: "Compiler Design Lab", unit: 2, topic: "YACC + LEX integration",              plannedDate: "2026-02-20", status: "In Progress" },
];

export interface MentoringNote {
  id: string;
  rollNo: string;
  studentName: string;
  date: string;
  note: string;
  flag: "ok" | "watch" | "critical";
}

export const mentoringNotes: MentoringNote[] = [
  { id: "MN01", rollNo: "22B81A0506", studentName: "F. Ajay Kumar", date: "2026-05-12", note: "Attendance below 70% and 3 active backlogs. Parents informed.",   flag: "critical" },
  { id: "MN02", rollNo: "22B81A0516", studentName: "P. Vamsi",      date: "2026-05-10", note: "Repeated lab absence. Counselling session scheduled for 22-May.", flag: "critical" },
  { id: "MN03", rollNo: "22B81A0510", studentName: "J. Rohith",     date: "2026-05-08", note: "Performance dipping in last two internals. Suggested peer-study group.", flag: "watch" },
  { id: "MN04", rollNo: "22B81A0524", studentName: "X. Aravind",    date: "2026-05-05", note: "Improving steadily after extra coaching. Continue monitoring.",   flag: "ok" },
];

export interface InvigilationDuty {
  id: string;
  date: string;
  session: "FN" | "AN";
  paperCode: string;
  paper: string;
  hall: string;
}

export const invigilationDuties: InvigilationDuty[] = [
  { id: "INV01", date: "2026-05-28", session: "FN", paperCode: "EC601", paper: "VLSI Design",        hall: "Block A • Hall 1" },
  { id: "INV02", date: "2026-05-30", session: "FN", paperCode: "ME604", paper: "Heat Transfer",      hall: "Block B • Hall 3" },
  { id: "INV03", date: "2026-06-02", session: "AN", paperCode: "CE603", paper: "Structural Analysis", hall: "Block A • Hall 2" },
];

// Aggregates used by the dashboard
export const todaySessionCount = facultyTimetable.filter(
  (t) => t.day === (["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const)[new Date().getDay()],
).length;
export const totalFacultySubjects = facultySubjects.length;
