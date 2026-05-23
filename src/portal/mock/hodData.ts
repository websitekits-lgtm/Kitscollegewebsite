/**
 * Mock data for the HOD Portal.
 *
 * Cross-portal wiring:
 * - Reads `roster` and `facultyDirectory` from college.ts (the same arrays
 *   the Faculty Portal uses).
 * - Reads `subjects`, `timetable`, `studyMaterials`, `notifications`,
 *   `examSchedule`, `semesterResults` from studentData.ts.
 * - Approval requests below are the queue that gets fed by Faculty
 *   (leave applications, content uploads requiring sign-off).
 */

import { facultyDirectory } from "./college";

export const hodProfile = {
  ...facultyDirectory[0], // Dr. R. Kumar — CSE HoD
  experience: 18,
};

export interface ApprovalRequest {
  id: string;
  type: "Faculty Leave" | "Material Upload" | "Lab Booking" | "Curriculum Change" | "Event";
  raisedBy: string;
  subject: string;
  raisedOn: string;
  priority: "Low" | "Medium" | "High";
}

export const pendingApprovals: ApprovalRequest[] = [
  { id: "AP-201", type: "Faculty Leave",     raisedBy: "Mrs. S. Padma",   subject: "Medical leave — 25-May to 28-May",        raisedOn: "2026-05-19", priority: "High" },
  { id: "AP-202", type: "Lab Booking",       raisedBy: "Dr. P. Sridevi",  subject: "ML Lab — additional session for project", raisedOn: "2026-05-18", priority: "Medium" },
  { id: "AP-203", type: "Material Upload",   raisedBy: "Mr. K. Suresh",   subject: "Cloud Computing — Unit 4 notes",          raisedOn: "2026-05-18", priority: "Low" },
  { id: "AP-204", type: "Event",             raisedBy: "Mr. V. Anil",     subject: "Cyber-security workshop — 5-Jun",         raisedOn: "2026-05-17", priority: "Medium" },
  { id: "AP-205", type: "Curriculum Change", raisedBy: "Dr. P. Sridevi",  subject: "Move Deep Learning unit 5 to Sem 7",      raisedOn: "2026-05-16", priority: "High" },
];

export interface FacultyLeaveRequest {
  id: string;
  facultyId: string;
  facultyName: string;
  type: "Casual" | "Medical" | "Earned" | "Maternity" | "Duty";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
}

export const facultyLeaveRequests: FacultyLeaveRequest[] = [
  // Logged-in faculty's own leaves — visible in Faculty → Attendance → My Leaves
  { id: "FL-905", facultyId: "F101", facultyName: "Dr. R. Kumar",    type: "Duty",    from: "2026-06-04", to: "2026-06-05", days: 2, status: "Pending"  },
  { id: "FL-880", facultyId: "F101", facultyName: "Dr. R. Kumar",    type: "Earned",  from: "2026-03-10", to: "2026-03-12", days: 3, status: "Approved" },
  { id: "FL-901", facultyId: "F102", facultyName: "Mrs. S. Padma",  type: "Medical", from: "2026-05-25", to: "2026-05-28", days: 4, status: "Pending"  },
  { id: "FL-895", facultyId: "F104", facultyName: "Mr. K. Suresh",  type: "Casual",  from: "2026-05-22", to: "2026-05-22", days: 1, status: "Approved" },
  { id: "FL-890", facultyId: "F105", facultyName: "Mr. V. Anil",    type: "Duty",    from: "2026-05-15", to: "2026-05-16", days: 2, status: "Approved" },
  { id: "FL-885", facultyId: "F103", facultyName: "Dr. P. Sridevi", type: "Earned",  from: "2026-04-28", to: "2026-05-02", days: 5, status: "Approved" },
];

export interface FacultyWorkload {
  facultyId: string;
  facultyName: string;
  designation: string;
  weeklyHours: number;
  theoryHours: number;
  labHours: number;
  mentees: number;
  classAvgRating: number; // out of 5
}

export const facultyWorkload: FacultyWorkload[] = [
  { facultyId: "F101", facultyName: "Dr. R. Kumar",     designation: "HoD",                weeklyHours: 14, theoryHours:  8, labHours: 6, mentees: 12, classAvgRating: 4.7 },
  { facultyId: "F102", facultyName: "Mrs. S. Padma",    designation: "Associate Prof.",    weeklyHours: 18, theoryHours: 16, labHours: 2, mentees:  8, classAvgRating: 4.5 },
  { facultyId: "F103", facultyName: "Dr. P. Sridevi",   designation: "Professor",          weeklyHours: 16, theoryHours: 10, labHours: 6, mentees: 10, classAvgRating: 4.8 },
  { facultyId: "F104", facultyName: "Mr. K. Suresh",    designation: "Assistant Prof.",    weeklyHours: 20, theoryHours: 20, labHours: 0, mentees:  6, classAvgRating: 4.3 },
  { facultyId: "F105", facultyName: "Mr. V. Anil",      designation: "Assistant Prof.",    weeklyHours: 22, theoryHours: 22, labHours: 0, mentees:  6, classAvgRating: 4.4 },
];

export interface DepartmentResult {
  semester: number;
  appeared: number;
  passed: number;
  passPct: number;
  avgSgpa: number;
  distinction: number; // SGPA ≥ 8.5
}

export const departmentResults: DepartmentResult[] = [
  { semester: 1, appeared: 240, passed: 235, passPct: 97.9, avgSgpa: 8.2, distinction: 108 },
  { semester: 2, appeared: 238, passed: 232, passPct: 97.5, avgSgpa: 8.3, distinction: 115 },
  { semester: 3, appeared: 236, passed: 226, passPct: 95.8, avgSgpa: 8.0, distinction:  98 },
  { semester: 4, appeared: 234, passed: 228, passPct: 97.4, avgSgpa: 8.4, distinction: 119 },
  { semester: 5, appeared: 232, passed: 225, passPct: 97.0, avgSgpa: 8.3, distinction: 112 },
];

export interface PlacementStat {
  year: number;
  registered: number;
  placed: number;
  placementPct: number;
  highestLpa: number;
  avgLpa: number;
}

export const placementStats: PlacementStat[] = [
  { year: 2021, registered: 180, placed: 132, placementPct: 73, highestLpa: 12, avgLpa: 4.2 },
  { year: 2022, registered: 192, placed: 154, placementPct: 80, highestLpa: 16, avgLpa: 4.6 },
  { year: 2023, registered: 205, placed: 178, placementPct: 87, highestLpa: 22, avgLpa: 5.1 },
  { year: 2024, registered: 210, placed: 190, placementPct: 90, highestLpa: 28, avgLpa: 5.8 },
  { year: 2025, registered: 215, placed: 198, placementPct: 92, highestLpa: 32, avgLpa: 6.4 },
];

export interface DepartmentEvent {
  id: string;
  title: string;
  date: string;
  type: "Workshop" | "Seminar" | "Hackathon" | "FDP" | "Industry Visit";
  status: "Planned" | "Completed" | "Cancelled";
}

export const departmentEvents: DepartmentEvent[] = [
  { id: "DE01", title: "AI for Industry — National Workshop", date: "2026-06-05", type: "Workshop",       status: "Planned"   },
  { id: "DE02", title: "FDP on Outcome Based Education",       date: "2026-05-22", type: "FDP",            status: "Planned"   },
  { id: "DE03", title: "TechFest 2026 — 24h Hackathon",        date: "2026-07-15", type: "Hackathon",      status: "Planned"   },
  { id: "DE04", title: "IBM India — Industry Visit",           date: "2026-04-10", type: "Industry Visit", status: "Completed" },
  { id: "DE05", title: "Research methodology seminar",         date: "2026-03-12", type: "Seminar",        status: "Completed" },
];

export const studentAlerts = {
  attendanceBelow75: 6,
  feeOverdue: 3,
  multipleBacklogs: 4,
  mentorEscalations: 2,
};
