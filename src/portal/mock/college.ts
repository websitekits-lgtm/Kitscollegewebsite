/**
 * College-wide mock data shared across portals (faculty, hod, principal, exam, accounts).
 *
 * Cross-portal wiring contract:
 * - `roster` is the single source of truth for students. The logged-in
 *   "self" student (22B81A0501) in studentData.ts appears here too — so
 *   any view of "students in CSE 3rd year section A" includes them.
 * - `facultyDirectory` is the same idea for faculty members.
 * - `departments` is referenced by HOD/Principal/Accounts/Exam dashboards.
 *
 * When Supabase is wired in, these become SELECT queries against the
 * `profiles` / `students` / `faculty` / `departments` tables.
 */

import { studentProfile } from "./studentData";

export interface Department {
  code: string;
  name: string;
  shortName: string;
  hod: string;
  intake: number;
  totalStudents: number;
}

export const departments: Department[] = [
  { code: "CSE",  name: "Computer Science & Engineering",                shortName: "CSE",  hod: "Dr. R. Kumar",      intake: 180, totalStudents: 642 },
  { code: "AIML", name: "Artificial Intelligence & Data Science",        shortName: "AIML", hod: "Dr. P. Sridevi",    intake: 120, totalStudents: 412 },
  { code: "ECE",  name: "Electronics & Communication",                   shortName: "ECE",  hod: "Mrs. S. Padma",     intake: 120, totalStudents: 398 },
  { code: "EEE",  name: "Electrical & Electronics Engineering",          shortName: "EEE",  hod: "Mr. K. Suresh",     intake:  60, totalStudents: 220 },
  { code: "MECH", name: "Mechanical Engineering",                        shortName: "MECH", hod: "Mr. V. Anil",       intake:  60, totalStudents: 198 },
  { code: "CIV",  name: "Civil Engineering",                             shortName: "CIV",  hod: "Mr. T. Ravi",       intake:  60, totalStudents: 175 },
  { code: "MBA",  name: "Master of Business Administration",             shortName: "MBA",  hod: "Dr. L. Bhavani",    intake:  60, totalStudents: 110 },
];

export interface RosterStudent {
  rollNo: string;
  name: string;
  department: "CSE" | "AIML" | "ECE" | "EEE" | "MECH" | "CIV" | "MBA";
  section: "A" | "B";
  year: 1 | 2 | 3 | 4;
  semester: number;
  attendancePct: number; // current overall %
  cgpa: number;
  backlogs: number;
  feeStatus: "Paid" | "Pending" | "Overdue";
  email: string;
  phone: string;
}

/**
 * 24-student roster for CSE 3rd year Section A — used by the Faculty,
 * HOD and Principal portals. The logged-in student is embedded so any
 * cross-portal lookup of them returns consistent values.
 */
export const roster: RosterStudent[] = [
  // The logged-in student — values pulled from studentData so both portals match.
  { rollNo: studentProfile.rollNo, name: studentProfile.name, department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 84, cgpa: 8.36, backlogs: 1, feeStatus: "Pending", email: studentProfile.email, phone: studentProfile.phone },
  { rollNo: "22B81A0502", name: "B. Harshitha",            department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 91, cgpa: 8.8,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0502@kits-anna.com", phone: "+91 90000 12346" },
  { rollNo: "22B81A0503", name: "C. Naga Sai",             department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 76, cgpa: 7.4,  backlogs: 2, feeStatus: "Paid",    email: "22b81a0503@kits-anna.com", phone: "+91 90000 12347" },
  { rollNo: "22B81A0504", name: "D. Lokesh",               department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 88, cgpa: 8.1,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0504@kits-anna.com", phone: "+91 90000 12348" },
  { rollNo: "22B81A0505", name: "E. Priyanka",             department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 93, cgpa: 9.1,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0505@kits-anna.com", phone: "+91 90000 12349" },
  { rollNo: "22B81A0506", name: "F. Ajay Kumar",           department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 68, cgpa: 6.9,  backlogs: 3, feeStatus: "Overdue", email: "22b81a0506@kits-anna.com", phone: "+91 90000 12350" },
  { rollNo: "22B81A0507", name: "G. Manogna",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 82, cgpa: 8.2,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0507@kits-anna.com", phone: "+91 90000 12351" },
  { rollNo: "22B81A0508", name: "H. Karthik",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 79, cgpa: 7.8,  backlogs: 1, feeStatus: "Paid",    email: "22b81a0508@kits-anna.com", phone: "+91 90000 12352" },
  { rollNo: "22B81A0509", name: "I. Sahithi",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 95, cgpa: 9.4,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0509@kits-anna.com", phone: "+91 90000 12353" },
  { rollNo: "22B81A0510", name: "J. Rohith",               department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 71, cgpa: 7.2,  backlogs: 1, feeStatus: "Pending", email: "22b81a0510@kits-anna.com", phone: "+91 90000 12354" },
  { rollNo: "22B81A0511", name: "K. Anjali",               department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 87, cgpa: 8.5,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0511@kits-anna.com", phone: "+91 90000 12355" },
  { rollNo: "22B81A0512", name: "L. Sandeep",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 80, cgpa: 7.9,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0512@kits-anna.com", phone: "+91 90000 12356" },
  { rollNo: "22B81A0513", name: "M. Divya",                department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 90, cgpa: 8.9,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0513@kits-anna.com", phone: "+91 90000 12357" },
  { rollNo: "22B81A0514", name: "N. Praveen",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 74, cgpa: 7.0,  backlogs: 2, feeStatus: "Paid",    email: "22b81a0514@kits-anna.com", phone: "+91 90000 12358" },
  { rollNo: "22B81A0515", name: "O. Bhavya",               department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 89, cgpa: 8.6,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0515@kits-anna.com", phone: "+91 90000 12359" },
  { rollNo: "22B81A0516", name: "P. Vamsi",                department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 65, cgpa: 6.5,  backlogs: 4, feeStatus: "Overdue", email: "22b81a0516@kits-anna.com", phone: "+91 90000 12360" },
  { rollNo: "22B81A0517", name: "Q. Sushma",               department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 86, cgpa: 8.3,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0517@kits-anna.com", phone: "+91 90000 12361" },
  { rollNo: "22B81A0518", name: "R. Manoj",                department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 83, cgpa: 7.7,  backlogs: 1, feeStatus: "Paid",    email: "22b81a0518@kits-anna.com", phone: "+91 90000 12362" },
  { rollNo: "22B81A0519", name: "S. Tejaswini",            department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 92, cgpa: 9.0,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0519@kits-anna.com", phone: "+91 90000 12363" },
  { rollNo: "22B81A0520", name: "T. Bharath",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 77, cgpa: 7.5,  backlogs: 1, feeStatus: "Pending", email: "22b81a0520@kits-anna.com", phone: "+91 90000 12364" },
  { rollNo: "22B81A0521", name: "U. Ramya",                department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 81, cgpa: 8.0,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0521@kits-anna.com", phone: "+91 90000 12365" },
  { rollNo: "22B81A0522", name: "V. Hemanth",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 78, cgpa: 7.6,  backlogs: 1, feeStatus: "Paid",    email: "22b81a0522@kits-anna.com", phone: "+91 90000 12366" },
  { rollNo: "22B81A0523", name: "W. Sneha",                department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 94, cgpa: 9.2,  backlogs: 0, feeStatus: "Paid",    email: "22b81a0523@kits-anna.com", phone: "+91 90000 12367" },
  { rollNo: "22B81A0524", name: "X. Aravind",              department: "CSE", section: "A", year: 3, semester: 6, attendancePct: 73, cgpa: 7.1,  backlogs: 2, feeStatus: "Pending", email: "22b81a0524@kits-anna.com", phone: "+91 90000 12368" },
];

export interface FacultyDirectoryEntry {
  id: string;
  name: string;
  designation: "Professor" | "Associate Professor" | "Assistant Professor" | "Head of Department";
  department: Department["shortName"];
  email: string;
  phone: string;
  experience: number; // years
  qualification: string;
  subjectsTaught: string[]; // subject codes
}

export const facultyDirectory: FacultyDirectoryEntry[] = [
  { id: "F101", name: "Dr. R. Kumar",     designation: "Head of Department",  department: "CSE",  email: "r.kumar@kits-anna.com",     phone: "+91 90001 00001", experience: 18, qualification: "Ph.D. (CSE)",  subjectsTaught: ["CS601", "CS606"] },
  { id: "F102", name: "Mrs. S. Padma",    designation: "Associate Professor", department: "CSE",  email: "s.padma@kits-anna.com",     phone: "+91 90001 00002", experience: 12, qualification: "M.Tech (CSE)", subjectsTaught: ["CS602", "CS608"] },
  { id: "F103", name: "Dr. P. Sridevi",   designation: "Professor",           department: "CSE",  email: "p.sridevi@kits-anna.com",   phone: "+91 90001 00003", experience: 15, qualification: "Ph.D. (ML)",   subjectsTaught: ["CS603", "CS607"] },
  { id: "F104", name: "Mr. K. Suresh",    designation: "Assistant Professor", department: "CSE",  email: "k.suresh@kits-anna.com",    phone: "+91 90001 00004", experience:  8, qualification: "M.Tech (CSE)", subjectsTaught: ["CS604"] },
  { id: "F105", name: "Mr. V. Anil",      designation: "Assistant Professor", department: "CSE",  email: "v.anil@kits-anna.com",      phone: "+91 90001 00005", experience:  6, qualification: "M.Tech (CS)",  subjectsTaught: ["CS605"] },
  { id: "F106", name: "Mr. T. Ravi",      designation: "Associate Professor", department: "CIV",  email: "t.ravi@kits-anna.com",      phone: "+91 90001 00006", experience: 14, qualification: "M.Tech (Str)", subjectsTaught: [] },
  { id: "F107", name: "Dr. L. Bhavani",   designation: "Professor",           department: "MBA",  email: "l.bhavani@kits-anna.com",   phone: "+91 90001 00007", experience: 16, qualification: "Ph.D. (Mgmt)", subjectsTaught: [] },
];

// Convenience aggregates
export const totalStudents = departments.reduce((sum, d) => sum + d.totalStudents, 0);
export const totalFaculty = facultyDirectory.length;
