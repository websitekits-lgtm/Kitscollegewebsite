/**
 * Mock data for the Student Portal.
 * All pages read from this file so numbers stay consistent across modules
 * (e.g. the dashboard "Attendance %" matches the Attendance page total).
 *
 * When the Supabase backend is wired in, replace these exports with
 * data-loader hooks that hit the API.
 */

export const studentProfile = {
  rollNo: "22B81A0501",
  name: "A. Sasidhar Reddy",
  department: "Computer Science & Engineering",
  branch: "CSE",
  year: 3,
  section: "A",
  semester: 6,
  admissionYear: 2022,
  email: "22b81a0501@kits-anna.com",
  phone: "+91 90000 12345",
  bloodGroup: "B+",
  address: "Markapur, Prakasam District, AP",
  fatherName: "A. Venkatesh Reddy",
  motherName: "A. Lakshmi",
  photo: "",
};

export interface Subject {
  code: string;
  name: string;
  faculty: string;
  credits: number;
  category: "Theory" | "Lab" | "Project";
}

export const subjects: Subject[] = [
  { code: "CS601", name: "Compiler Design", faculty: "Dr. R. Kumar", credits: 4, category: "Theory" },
  { code: "CS602", name: "Computer Networks", faculty: "Mrs. S. Padma", credits: 4, category: "Theory" },
  { code: "CS603", name: "Machine Learning", faculty: "Dr. P. Sridevi", credits: 4, category: "Theory" },
  { code: "CS604", name: "Cloud Computing", faculty: "Mr. K. Suresh", credits: 3, category: "Theory" },
  { code: "CS605", name: "Cyber Security", faculty: "Mr. V. Anil", credits: 3, category: "Theory" },
  { code: "CS606", name: "Compiler Design Lab", faculty: "Dr. R. Kumar", credits: 2, category: "Lab" },
  { code: "CS607", name: "ML Lab", faculty: "Dr. P. Sridevi", credits: 2, category: "Lab" },
  { code: "CS608", name: "Mini Project", faculty: "Mrs. S. Padma", credits: 2, category: "Project" },
];

export interface AttendanceRow {
  code: string;
  name: string;
  attended: number;
  total: number;
}

export const attendanceBySubject: AttendanceRow[] = [
  { code: "CS601", name: "Compiler Design", attended: 48, total: 56 },
  { code: "CS602", name: "Computer Networks", attended: 52, total: 58 },
  { code: "CS603", name: "Machine Learning", attended: 39, total: 55 }, // shortage
  { code: "CS604", name: "Cloud Computing", attended: 45, total: 50 },
  { code: "CS605", name: "Cyber Security", attended: 41, total: 48 },
  { code: "CS606", name: "Compiler Design Lab", attended: 18, total: 20 },
  { code: "CS607", name: "ML Lab", attended: 16, total: 18 },
];

export const attendanceTrend = [
  { month: "Jan", percent: 82 },
  { month: "Feb", percent: 86 },
  { month: "Mar", percent: 78 },
  { month: "Apr", percent: 85 },
  { month: "May", percent: 88 },
];

export interface InternalMark {
  code: string;
  name: string;
  mid1: number;
  mid2: number;
  assignment: number;
  outOf: number;
}

export const internalMarks: InternalMark[] = [
  { code: "CS601", name: "Compiler Design", mid1: 22, mid2: 24, assignment: 9, outOf: 30 },
  { code: "CS602", name: "Computer Networks", mid1: 25, mid2: 26, assignment: 10, outOf: 30 },
  { code: "CS603", name: "Machine Learning", mid1: 18, mid2: 20, assignment: 8, outOf: 30 },
  { code: "CS604", name: "Cloud Computing", mid1: 24, mid2: 23, assignment: 9, outOf: 30 },
  { code: "CS605", name: "Cyber Security", mid1: 21, mid2: 25, assignment: 9, outOf: 30 },
];

export interface ExamSchedule {
  date: string; // ISO date
  code: string;
  subject: string;
  time: string;
  venue: string;
  type: "Internal" | "External";
}

export const examSchedule: ExamSchedule[] = [
  { date: "2026-05-28", code: "CS601", subject: "Compiler Design", time: "10:00 AM – 1:00 PM", venue: "Block A • Room 201", type: "External" },
  { date: "2026-05-30", code: "CS602", subject: "Computer Networks", time: "10:00 AM – 1:00 PM", venue: "Block A • Room 201", type: "External" },
  { date: "2026-06-02", code: "CS603", subject: "Machine Learning", time: "10:00 AM – 1:00 PM", venue: "Block A • Room 201", type: "External" },
  { date: "2026-06-04", code: "CS604", subject: "Cloud Computing", time: "10:00 AM – 1:00 PM", venue: "Block A • Room 201", type: "External" },
  { date: "2026-06-06", code: "CS605", subject: "Cyber Security", time: "10:00 AM – 1:00 PM", venue: "Block A • Room 201", type: "External" },
];

export interface SemesterResult {
  semester: number;
  sgpa: number;
  credits: number;
  backlogs: number;
}

export const semesterResults: SemesterResult[] = [
  { semester: 1, sgpa: 8.1, credits: 22, backlogs: 0 },
  { semester: 2, sgpa: 8.4, credits: 24, backlogs: 0 },
  { semester: 3, sgpa: 8.2, credits: 24, backlogs: 1 },
  { semester: 4, sgpa: 8.6, credits: 22, backlogs: 0 },
  { semester: 5, sgpa: 8.5, credits: 22, backlogs: 0 },
];

export const currentCGPA = 8.36;

export interface TimetableSlot {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  period: number;
  startTime: string;
  endTime: string;
  code: string;
  subject: string;
  faculty: string;
  room: string;
  type: "Theory" | "Lab" | "Break";
}

export const timetable: TimetableSlot[] = [
  // Monday
  { day: "Mon", period: 1, startTime: "09:00", endTime: "09:50", code: "CS601", subject: "Compiler Design", faculty: "Dr. R. Kumar", room: "CSE-201", type: "Theory" },
  { day: "Mon", period: 2, startTime: "09:50", endTime: "10:40", code: "CS602", subject: "Computer Networks", faculty: "Mrs. S. Padma", room: "CSE-201", type: "Theory" },
  { day: "Mon", period: 3, startTime: "11:00", endTime: "11:50", code: "CS603", subject: "Machine Learning", faculty: "Dr. P. Sridevi", room: "CSE-201", type: "Theory" },
  { day: "Mon", period: 4, startTime: "11:50", endTime: "12:40", code: "CS604", subject: "Cloud Computing", faculty: "Mr. K. Suresh", room: "CSE-201", type: "Theory" },
  { day: "Mon", period: 5, startTime: "13:30", endTime: "16:00", code: "CS606", subject: "Compiler Design Lab", faculty: "Dr. R. Kumar", room: "Lab-3", type: "Lab" },
  // Tuesday
  { day: "Tue", period: 1, startTime: "09:00", endTime: "09:50", code: "CS605", subject: "Cyber Security", faculty: "Mr. V. Anil", room: "CSE-201", type: "Theory" },
  { day: "Tue", period: 2, startTime: "09:50", endTime: "10:40", code: "CS601", subject: "Compiler Design", faculty: "Dr. R. Kumar", room: "CSE-201", type: "Theory" },
  { day: "Tue", period: 3, startTime: "11:00", endTime: "11:50", code: "CS603", subject: "Machine Learning", faculty: "Dr. P. Sridevi", room: "CSE-201", type: "Theory" },
  { day: "Tue", period: 4, startTime: "11:50", endTime: "12:40", code: "CS602", subject: "Computer Networks", faculty: "Mrs. S. Padma", room: "CSE-201", type: "Theory" },
  { day: "Tue", period: 5, startTime: "13:30", endTime: "16:00", code: "CS607", subject: "ML Lab", faculty: "Dr. P. Sridevi", room: "Lab-5", type: "Lab" },
  // Wednesday
  { day: "Wed", period: 1, startTime: "09:00", endTime: "09:50", code: "CS604", subject: "Cloud Computing", faculty: "Mr. K. Suresh", room: "CSE-201", type: "Theory" },
  { day: "Wed", period: 2, startTime: "09:50", endTime: "10:40", code: "CS605", subject: "Cyber Security", faculty: "Mr. V. Anil", room: "CSE-201", type: "Theory" },
  { day: "Wed", period: 3, startTime: "11:00", endTime: "11:50", code: "CS601", subject: "Compiler Design", faculty: "Dr. R. Kumar", room: "CSE-201", type: "Theory" },
  { day: "Wed", period: 4, startTime: "11:50", endTime: "12:40", code: "CS603", subject: "Machine Learning", faculty: "Dr. P. Sridevi", room: "CSE-201", type: "Theory" },
  { day: "Wed", period: 5, startTime: "13:30", endTime: "14:20", code: "CS608", subject: "Mini Project", faculty: "Mrs. S. Padma", room: "Lab-2", type: "Lab" },
  // Thursday
  { day: "Thu", period: 1, startTime: "09:00", endTime: "09:50", code: "CS602", subject: "Computer Networks", faculty: "Mrs. S. Padma", room: "CSE-201", type: "Theory" },
  { day: "Thu", period: 2, startTime: "09:50", endTime: "10:40", code: "CS604", subject: "Cloud Computing", faculty: "Mr. K. Suresh", room: "CSE-201", type: "Theory" },
  { day: "Thu", period: 3, startTime: "11:00", endTime: "11:50", code: "CS605", subject: "Cyber Security", faculty: "Mr. V. Anil", room: "CSE-201", type: "Theory" },
  { day: "Thu", period: 4, startTime: "11:50", endTime: "12:40", code: "CS601", subject: "Compiler Design", faculty: "Dr. R. Kumar", room: "CSE-201", type: "Theory" },
  // Friday
  { day: "Fri", period: 1, startTime: "09:00", endTime: "09:50", code: "CS603", subject: "Machine Learning", faculty: "Dr. P. Sridevi", room: "CSE-201", type: "Theory" },
  { day: "Fri", period: 2, startTime: "09:50", endTime: "10:40", code: "CS604", subject: "Cloud Computing", faculty: "Mr. K. Suresh", room: "CSE-201", type: "Theory" },
  { day: "Fri", period: 3, startTime: "11:00", endTime: "11:50", code: "CS602", subject: "Computer Networks", faculty: "Mrs. S. Padma", room: "CSE-201", type: "Theory" },
  { day: "Fri", period: 4, startTime: "11:50", endTime: "12:40", code: "CS605", subject: "Cyber Security", faculty: "Mr. V. Anil", room: "CSE-201", type: "Theory" },
];

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Late";
}

export const assignments: Assignment[] = [
  { id: "A001", subject: "Compiler Design", title: "Lexical analyser using LEX", dueDate: "2026-05-25", status: "Pending" },
  { id: "A002", subject: "Machine Learning", title: "Linear Regression Notebook", dueDate: "2026-05-23", status: "Pending" },
  { id: "A003", subject: "Computer Networks", title: "OSI Model — case study", dueDate: "2026-05-18", status: "Submitted" },
  { id: "A004", subject: "Cyber Security", title: "AES vs DES — report", dueDate: "2026-05-15", status: "Submitted" },
  { id: "A005", subject: "Cloud Computing", title: "AWS lab setup screenshots", dueDate: "2026-05-12", status: "Late" },
];

export interface StudyMaterial {
  id: string;
  subject: string;
  title: string;
  type: "PDF" | "PPT" | "Video" | "Notes";
  uploadedAt: string;
  size: string;
}

export const studyMaterials: StudyMaterial[] = [
  { id: "M001", subject: "Compiler Design", title: "Unit 1 — Introduction to Compilers", type: "PDF", uploadedAt: "2026-05-02", size: "2.3 MB" },
  { id: "M002", subject: "Compiler Design", title: "Unit 2 — Lexical Analysis", type: "PDF", uploadedAt: "2026-05-08", size: "1.8 MB" },
  { id: "M003", subject: "Machine Learning", title: "Linear Models — slides", type: "PPT", uploadedAt: "2026-05-10", size: "4.1 MB" },
  { id: "M004", subject: "Computer Networks", title: "TCP/IP — lecture recording", type: "Video", uploadedAt: "2026-05-12", size: "120 MB" },
  { id: "M005", subject: "Cyber Security", title: "Cryptography handwritten notes", type: "Notes", uploadedAt: "2026-05-14", size: "950 KB" },
  { id: "M006", subject: "Cloud Computing", title: "AWS Quick Start Guide", type: "PDF", uploadedAt: "2026-05-15", size: "3.0 MB" },
];

export interface FeeInvoice {
  id: string;
  semester: number;
  description: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  paidOn?: string;
  receiptNo?: string;
}

export const feeInvoices: FeeInvoice[] = [
  { id: "INV-2024-01", semester: 5, description: "Semester 5 Tuition Fee", amount: 62000, dueDate: "2025-07-15", status: "Paid", paidOn: "2025-07-10", receiptNo: "RCP-5821" },
  { id: "INV-2024-02", semester: 5, description: "Hostel Fee (Sem 5)", amount: 38000, dueDate: "2025-07-15", status: "Paid", paidOn: "2025-07-10", receiptNo: "RCP-5822" },
  { id: "INV-2025-01", semester: 6, description: "Semester 6 Tuition Fee", amount: 62000, dueDate: "2026-01-15", status: "Paid", paidOn: "2026-01-12", receiptNo: "RCP-6109" },
  { id: "INV-2025-02", semester: 6, description: "Hostel Fee (Sem 6)", amount: 38000, dueDate: "2026-06-15", status: "Pending" },
  { id: "INV-2025-03", semester: 6, description: "Exam Fee — Sem 6", amount: 4500, dueDate: "2026-05-25", status: "Pending" },
];

export interface PlacementCompany {
  id: string;
  name: string;
  role: string;
  ctc: string;
  driveDate: string;
  eligibility: string;
  status: "Open" | "Closed" | "Eligible" | "Applied";
}

export const placementCompanies: PlacementCompany[] = [
  { id: "P001", name: "TCS", role: "System Engineer", ctc: "₹ 3.8 LPA", driveDate: "2026-06-10", eligibility: "CGPA ≥ 6.0, no backlogs", status: "Eligible" },
  { id: "P002", name: "Infosys", role: "Specialist Programmer", ctc: "₹ 9 LPA", driveDate: "2026-06-15", eligibility: "CGPA ≥ 7.5, no backlogs", status: "Eligible" },
  { id: "P003", name: "Cognizant", role: "Programmer Analyst", ctc: "₹ 4 LPA", driveDate: "2026-06-18", eligibility: "CGPA ≥ 6.5", status: "Applied" },
  { id: "P004", name: "Wipro", role: "Project Engineer", ctc: "₹ 3.5 LPA", driveDate: "2026-06-22", eligibility: "CGPA ≥ 6.0", status: "Open" },
  { id: "P005", name: "Accenture", role: "Associate Software Engineer", ctc: "₹ 4.5 LPA", driveDate: "2026-07-05", eligibility: "CGPA ≥ 6.5, no backlogs", status: "Open" },
];

export interface PortalNotification {
  id: string;
  category: "Academic" | "Exam" | "Placement" | "Circular";
  title: string;
  body: string;
  date: string;
  unread: boolean;
}

export const notifications: PortalNotification[] = [
  { id: "N001", category: "Exam", title: "End-Sem Hall tickets ready", body: "Download your Semester 6 hall ticket from Examinations → Hall Tickets.", date: "2026-05-20", unread: true },
  { id: "N002", category: "Placement", title: "TCS pre-placement talk", body: "Tomorrow 11:00 AM in the seminar hall. Attendance compulsory for eligible students.", date: "2026-05-19", unread: true },
  { id: "N003", category: "Academic", title: "ML assignment 2 deadline extended", body: "New deadline is 25-May-2026. Please submit before midnight.", date: "2026-05-18", unread: false },
  { id: "N004", category: "Circular", title: "College closed on 2026-05-22", body: "On account of state-government declared holiday.", date: "2026-05-16", unread: false },
  { id: "N005", category: "Exam", title: "Internal 2 results uploaded", body: "Check Examinations → Internal Marks.", date: "2026-05-14", unread: false },
];

export interface SupportTicket {
  id: string;
  category: "Technical" | "Academic" | "Fees" | "Other";
  subject: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  raisedOn: string;
  lastUpdate: string;
}

export const supportTickets: SupportTicket[] = [
  { id: "TKT-1041", category: "Technical", subject: "Cannot download study material PDF", status: "Resolved", raisedOn: "2026-05-10", lastUpdate: "2026-05-12" },
  { id: "TKT-1052", category: "Academic", subject: "ML assignment submission link broken", status: "In Progress", raisedOn: "2026-05-17", lastUpdate: "2026-05-19" },
  { id: "TKT-1058", category: "Fees", subject: "Exam fee receipt not generated", status: "Open", raisedOn: "2026-05-20", lastUpdate: "2026-05-20" },
];

// ---------- Helpers / aggregates used by the dashboard ----------

export const totalAttendancePercent = (() => {
  const totals = attendanceBySubject.reduce(
    (acc, s) => ({ attended: acc.attended + s.attended, total: acc.total + s.total }),
    { attended: 0, total: 0 },
  );
  return Math.round((totals.attended / totals.total) * 100);
})();

export const pendingAssignmentsCount = assignments.filter((a) => a.status === "Pending").length;

export const totalPendingFees = feeInvoices
  .filter((i) => i.status !== "Paid")
  .reduce((sum, i) => sum + i.amount, 0);

export const upcomingExamCount = examSchedule.length;

export const unreadNotificationCount = notifications.filter((n) => n.unread).length;
