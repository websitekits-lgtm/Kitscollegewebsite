/**
 * Mock data for the Parent Portal.
 *
 * Cross-portal wiring:
 * - Parent portal is a read-only mirror of the linked ward's student data.
 * - `ward` is the same `studentProfile` from studentData.ts so any
 *   attendance / marks / fees changes flow through automatically.
 * - Direct messaging (mentor + class teacher) is parent-specific.
 */

import { studentProfile } from "./studentData";
import { facultyDirectory } from "./college";

export const parentProfile = {
  id: "PR-01",
  name: studentProfile.fatherName,
  relation: "Father",
  email: "venkatesh.reddy@example.com",
  phone: "+91 90000 99001",
  occupation: "Govt. Employee",
  address: studentProfile.address,
};

export const ward = studentProfile;

/** Mentor + class teacher of the ward — used for the contact section. */
export const wardMentor = facultyDirectory.find((f) => f.subjectsTaught.includes("CS601"))!; // Dr. R. Kumar
export const wardClassTeacher = facultyDirectory.find((f) => f.subjectsTaught.includes("CS602"))!; // Mrs. S. Padma

export interface ParentMessage {
  id: string;
  from: string;
  fromRole: "Mentor" | "Class Teacher" | "HoD" | "Accounts";
  subject: string;
  body: string;
  date: string;
  unread: boolean;
}

export const parentMessages: ParentMessage[] = [
  { id: "PM01", from: "Dr. R. Kumar",    fromRole: "Mentor",        subject: "Mid-sem progress review", body: "Your ward's CGPA is steady. Recommended weekly study plan attached.", date: "2026-05-18", unread: true },
  { id: "PM02", from: "Mrs. S. Padma",   fromRole: "Class Teacher", subject: "Attendance reminder",      body: "Three classes missed in Computer Networks this week. Kindly speak to your ward.", date: "2026-05-15", unread: true },
  { id: "PM03", from: "Accounts Office", fromRole: "Accounts",      subject: "Hostel fee due",            body: "Sem 6 hostel fee of ₹38,000 due on 2026-06-15. Online payment available.", date: "2026-05-12", unread: false },
];
