/**
 * Mock data for the Principal Portal.
 *
 * Cross-portal wiring:
 * - Reads `departments`, `facultyDirectory`, `roster`, `totalStudents`,
 *   `totalFaculty` from college.ts.
 * - Reads `notifications`, `placementCompanies`, `examSchedule` from studentData.ts.
 * - Reads `facultyLeaveRequests`, `pendingApprovals` from hodData.ts —
 *   anything escalated from HODs lands in the Principal's queue too.
 *
 * The "Principal" persona aggregates per-department snapshots into
 * institution-level KPIs.
 */

import { departments } from "./college";

export const principalProfile = {
  id: "P001",
  name: "Dr. K. Sridhar",
  designation: "Principal",
  email: "principal@kits-anna.com",
  phone: "+91 91530 19999",
  qualification: "Ph.D. (CSE)",
  experience: 26,
  joinedYear: 2014,
};

export interface DepartmentSnapshot {
  code: string;
  shortName: string;
  name: string;
  students: number;
  faculty: number;
  attendancePct: number;
  passPct: number;
  placementPct: number;
  feeCollectedPct: number;
  hod: string;
}

/** Per-department aggregates the Principal sees. */
export const departmentSnapshots: DepartmentSnapshot[] = departments.map((d) => {
  const seed = d.code.charCodeAt(0);
  return {
    code: d.code,
    shortName: d.shortName,
    name: d.name,
    students: d.totalStudents,
    // Plausible per-department roll-ups derived from the same departments table
    faculty: Math.max(5, Math.round(d.totalStudents / 22)),
    attendancePct: 78 + (seed % 8),
    passPct: 90 + (seed % 8),
    placementPct: 72 + (seed % 18),
    feeCollectedPct: 80 + (seed % 14),
    hod: d.hod,
  };
});

export interface InstitutionAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  detail: string;
  date: string;
}

export const institutionAlerts: InstitutionAlert[] = [
  { id: "AL01", severity: "critical", title: "AICTE NBA renewal cycle",       detail: "Documentation due 2026-06-15. IQAC and HoDs to compile evidence.", date: "2026-05-20" },
  { id: "AL02", severity: "critical", title: "MECH dept — placement dip",     detail: "Placement % fell from 88 → 74 YoY. Action plan requested.",        date: "2026-05-18" },
  { id: "AL03", severity: "warning",  title: "Hostel renovation budget",      detail: "Approved budget exceeded by 6%. Need governing-body sign-off.",     date: "2026-05-15" },
  { id: "AL04", severity: "warning",  title: "Faculty Vacancies — CIV",       detail: "Three asst-professor positions open since Apr.",                    date: "2026-05-12" },
  { id: "AL05", severity: "info",     title: "TechFest 2026 — sponsor list",  detail: "5 industry sponsors confirmed. Final budget review pending.",       date: "2026-05-10" },
];

export interface ApprovalQueueItem {
  id: string;
  type: "Budget" | "Event" | "Recruitment" | "Curriculum" | "Infrastructure" | "MoU";
  title: string;
  raisedBy: string;
  department: string;
  amount?: number;
  raisedOn: string;
  priority: "Low" | "Medium" | "High";
}

export const approvalQueue: ApprovalQueueItem[] = [
  { id: "AQ-401", type: "Budget",         title: "ML research lab — equipment purchase", raisedBy: "Dr. P. Sridevi", department: "CSE",  amount: 850000,  raisedOn: "2026-05-19", priority: "High"   },
  { id: "AQ-402", type: "Recruitment",    title: "Recruit 3 asst-professors for CIV",    raisedBy: "Mr. T. Ravi",    department: "CIV",                   raisedOn: "2026-05-18", priority: "High"   },
  { id: "AQ-403", type: "Event",          title: "National conference on AI/ML",         raisedBy: "Dr. R. Kumar",   department: "CSE",  amount: 320000,  raisedOn: "2026-05-17", priority: "Medium" },
  { id: "AQ-404", type: "Curriculum",     title: "Add Quantum Computing elective Sem 7", raisedBy: "Dr. P. Sridevi", department: "CSE",                   raisedOn: "2026-05-15", priority: "Medium" },
  { id: "AQ-405", type: "Infrastructure", title: "Renovate 2nd-floor washrooms",          raisedBy: "Mr. V. Anil",    department: "All",  amount: 450000,  raisedOn: "2026-05-14", priority: "Low"    },
  { id: "AQ-406", type: "MoU",            title: "Collaboration with IIT Madras DSAI",    raisedBy: "Dr. R. Kumar",   department: "CSE",                   raisedOn: "2026-05-12", priority: "High"   },
];

export const institutionKPI = {
  totalStudents: departments.reduce((s, d) => s + d.totalStudents, 0),
  totalFaculty: 142, // institution-wide, not just our 7-entry directory
  overallAttendancePct: Math.round(
    departmentSnapshots.reduce((s, d) => s + d.attendancePct * d.students, 0) /
    departmentSnapshots.reduce((s, d) => s + d.students, 0)
  ),
  overallPassPct: Math.round(
    departmentSnapshots.reduce((s, d) => s + d.passPct * d.students, 0) /
    departmentSnapshots.reduce((s, d) => s + d.students, 0)
  ),
  overallPlacementPct: Math.round(
    departmentSnapshots.reduce((s, d) => s + d.placementPct * d.students, 0) /
    departmentSnapshots.reduce((s, d) => s + d.students, 0)
  ),
  feeCollectedPct: Math.round(
    departmentSnapshots.reduce((s, d) => s + d.feeCollectedPct * d.students, 0) /
    departmentSnapshots.reduce((s, d) => s + d.students, 0)
  ),
  annualBudgetCr: 38.5,
  utilisedBudgetCr: 27.2,
  highestPackageLpa: 32,
};
