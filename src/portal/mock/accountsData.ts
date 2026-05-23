/**
 * Mock data for the Accounts & Finance Portal.
 *
 * Cross-portal wiring:
 * - Accounts OWNS fee invoices, payments, scholarships and expenses.
 * - Reads `feeInvoices` from studentData.ts so the student's view of their
 *   pending fees is the same row Accounts processes here.
 * - Reads `roster` (college.ts) for the student fee profiles tab.
 * - Reads `departments` for department-revenue breakdown.
 *
 * Marking an invoice paid here would, in the real backend, mutate the
 * student's feeInvoices entry — for now both sides simply reference the
 * same array.
 */

import { roster, departments } from "./college";
import { feeInvoices } from "./studentData";

export const accountsProfile = {
  id: "AC-01",
  name: "Mrs. K. Lakshmi",
  designation: "Accounts Officer",
  email: "accounts@kits-anna.com",
  phone: "+91 91530 33344",
  qualification: "M.Com, CA Inter",
  experience: 12,
  joinedYear: 2018,
};

// ---------- Transactions ----------
export interface Transaction {
  id: string;
  date: string;
  studentRoll?: string;
  studentName?: string;
  description: string;
  type: "Tuition" | "Hostel" | "Bus" | "Exam" | "Fine" | "Refund" | "Other";
  mode: "Online" | "Cash" | "DD" | "Cheque" | "UPI";
  amount: number;
  status: "Successful" | "Pending Verification" | "Failed" | "Refunded";
  receiptNo?: string;
}

const seed: Transaction[] = [];
roster.forEach((r, i) => {
  if (r.feeStatus === "Paid") {
    seed.push({
      id: `TXN-${1000 + i}`,
      date: "2026-01-12",
      studentRoll: r.rollNo,
      studentName: r.name,
      description: "Sem 6 — Tuition + Hostel",
      type: "Tuition",
      mode: i % 3 === 0 ? "Online" : i % 3 === 1 ? "UPI" : "DD",
      amount: 100000,
      status: "Successful",
      receiptNo: `RCP-${6100 + i}`,
    });
  }
});

export const transactions: Transaction[] = [
  ...seed.slice(0, 12),
  { id: "TXN-2001", date: "2026-05-20", studentRoll: "22B81A0508", studentName: "H. Karthik",  description: "Exam fee — Sem 6",     type: "Exam",   mode: "UPI",     amount:  4500, status: "Successful",        receiptNo: "RCP-7101" },
  { id: "TXN-2002", date: "2026-05-20", studentRoll: "22B81A0511", studentName: "K. Anjali",   description: "Bus fee — Sem 6",       type: "Bus",    mode: "Online",  amount: 12000, status: "Successful",        receiptNo: "RCP-7102" },
  { id: "TXN-2003", date: "2026-05-19", studentRoll: "22B81A0506", studentName: "F. Ajay Kumar", description: "Library fine",        type: "Fine",   mode: "Cash",    amount:   250, status: "Successful",        receiptNo: "RCP-7103" },
  { id: "TXN-2004", date: "2026-05-19", studentRoll: "22B81A0510", studentName: "J. Rohith",   description: "Sem 6 hostel fee",      type: "Hostel", mode: "DD",      amount: 38000, status: "Pending Verification" },
  { id: "TXN-2005", date: "2026-05-18", studentRoll: "22B81A0516", studentName: "P. Vamsi",    description: "Supplementary fee",     type: "Exam",   mode: "Online",  amount:  2400, status: "Successful",        receiptNo: "RCP-7104" },
  { id: "TXN-2006", date: "2026-05-18", studentRoll: "22B81A0524", studentName: "X. Aravind",  description: "Caution refund",        type: "Refund", mode: "Online",  amount:  5000, status: "Successful",        receiptNo: "RCP-7105" },
  { id: "TXN-2007", date: "2026-05-17", studentRoll: "22B81A0504", studentName: "D. Lokesh",   description: "Sem 6 tuition (partial)", type: "Tuition", mode: "Cheque", amount: 30000, status: "Failed" },
];

// ---------- Scholarships ----------
export interface Scholarship {
  id: string;
  studentRoll: string;
  studentName: string;
  scheme: string;
  source: "Government" | "Private" | "Institute";
  amount: number;
  status: "Approved" | "Pending" | "Disbursed" | "Rejected";
  appliedOn: string;
  disbursedOn?: string;
}

export const scholarships: Scholarship[] = [
  // Logged-in student's own scholarship — shows up in Student → Fees → Scholarships
  { id: "SCH-108", studentRoll: "22B81A0501", studentName: "A. Sasidhar Reddy", scheme: "Post Matric SC/ST Scholarship", source: "Government", amount: 35000, status: "Approved", appliedOn: "2025-09-12" },
  { id: "SCH-101", studentRoll: "22B81A0503", studentName: "C. Naga Sai",   scheme: "AP EAMCET Fee Reimbursement",     source: "Government", amount: 35000, status: "Disbursed", appliedOn: "2025-09-01", disbursedOn: "2026-02-15" },
  { id: "SCH-102", studentRoll: "22B81A0505", studentName: "E. Priyanka",   scheme: "Jindal Scholarship for Women",     source: "Private",    amount: 40000, status: "Disbursed", appliedOn: "2025-09-05", disbursedOn: "2026-02-20" },
  { id: "SCH-103", studentRoll: "22B81A0509", studentName: "I. Sahithi",    scheme: "AP EAMCET Fee Reimbursement",     source: "Government", amount: 35000, status: "Approved",  appliedOn: "2025-09-08" },
  { id: "SCH-104", studentRoll: "22B81A0513", studentName: "M. Divya",      scheme: "Merit Scholarship",                source: "Institute",  amount: 15000, status: "Approved",  appliedOn: "2025-10-01" },
  { id: "SCH-105", studentRoll: "22B81A0519", studentName: "S. Tejaswini",  scheme: "AP EAMCET Fee Reimbursement",     source: "Government", amount: 35000, status: "Pending",   appliedOn: "2026-05-10" },
  { id: "SCH-106", studentRoll: "22B81A0523", studentName: "W. Sneha",      scheme: "Tata Foundation",                  source: "Private",    amount: 50000, status: "Pending",   appliedOn: "2026-05-12" },
  { id: "SCH-107", studentRoll: "22B81A0517", studentName: "Q. Sushma",     scheme: "Post Matric BC Scholarship",       source: "Government", amount: 22000, status: "Rejected",  appliedOn: "2025-09-15" },
];

// ---------- Expenses ----------
export interface Expense {
  id: string;
  category: "Salaries" | "Department" | "Infrastructure" | "Maintenance" | "Vendor" | "Other";
  description: string;
  amount: number;
  date: string;
  approvedBy?: string;
  status: "Approved" | "Pending" | "Paid";
}

export const expenses: Expense[] = [
  { id: "EXP-501", category: "Salaries",       description: "April 2026 — Teaching staff salaries",        amount: 8500000, date: "2026-05-02", approvedBy: "Principal", status: "Paid"     },
  { id: "EXP-502", category: "Salaries",       description: "April 2026 — Non-teaching staff salaries",     amount: 1800000, date: "2026-05-02", approvedBy: "Principal", status: "Paid"     },
  { id: "EXP-503", category: "Department",     description: "CSE — ML Lab equipment purchase",              amount:  850000, date: "2026-05-15", approvedBy: "Principal", status: "Approved" },
  { id: "EXP-504", category: "Infrastructure", description: "Block-A washroom renovation",                  amount:  450000, date: "2026-05-18",                          status: "Pending"  },
  { id: "EXP-505", category: "Maintenance",    description: "AC servicing — campus-wide",                   amount:   85000, date: "2026-05-16", approvedBy: "Admin Officer", status: "Paid" },
  { id: "EXP-506", category: "Vendor",         description: "Library subscriptions — IEEE/Springer",         amount:  320000, date: "2026-05-10",                          status: "Pending"  },
  { id: "EXP-507", category: "Vendor",         description: "Office stationery — Q1 2026",                  amount:   42000, date: "2026-05-08", approvedBy: "Admin Officer", status: "Paid" },
  { id: "EXP-508", category: "Department",     description: "AIML — GPU server (NVIDIA A100)",              amount: 1450000, date: "2026-05-12", approvedBy: "Principal", status: "Approved" },
  { id: "EXP-509", category: "Maintenance",    description: "Diesel for generators — May 2026",             amount:  120000, date: "2026-05-19",                          status: "Pending"  },
];

// ---------- Departmental revenue derived from departments ----------
export interface DepartmentRevenue {
  code: string;
  shortName: string;
  expected: number;
  collected: number;
  pending: number;
  collectedPct: number;
}

export const departmentRevenue: DepartmentRevenue[] = departments.map((d) => {
  const expected = d.totalStudents * 100000; // ₹1L tuition+hostel approx
  const collectedPct = 80 + (d.code.charCodeAt(0) % 14);
  const collected = Math.round(expected * (collectedPct / 100));
  return {
    code: d.code,
    shortName: d.shortName,
    expected,
    collected,
    pending: expected - collected,
    collectedPct,
  };
});

// ---------- Vendor master ----------
export interface Vendor {
  id: string;
  name: string;
  category: string;
  contact: string;
  totalBilled: number;
  totalPaid: number;
}

export const vendors: Vendor[] = [
  { id: "V-101", name: "TechSphere Solutions",   category: "IT Hardware",          contact: "ravi@techsphere.in",        totalBilled: 2400000, totalPaid: 2400000 },
  { id: "V-102", name: "BookHive Distributors",  category: "Library Subscriptions",contact: "ops@bookhive.in",            totalBilled:  680000, totalPaid:  360000 },
  { id: "V-103", name: "AC Care Services",       category: "Maintenance",          contact: "support@accare.in",          totalBilled:  340000, totalPaid:  255000 },
  { id: "V-104", name: "Sahitya Stationery",     category: "Office Supplies",      contact: "billing@sahityastores.com",  totalBilled:  168000, totalPaid:  168000 },
  { id: "V-105", name: "Krishna Diesel",         category: "Fuel",                 contact: "krishnadiesel@gmail.com",    totalBilled:  480000, totalPaid:  360000 },
];

// ---------- Aggregates for the dashboard ----------
export const totalCollected = transactions
  .filter((t) => t.status === "Successful" && t.type !== "Refund")
  .reduce((s, t) => s + t.amount, 0);

export const totalPending = feeInvoices
  .filter((i) => i.status !== "Paid")
  .reduce((s, i) => s + i.amount, 0);

export const totalScholarship = scholarships
  .filter((s) => s.status === "Disbursed" || s.status === "Approved")
  .reduce((s, x) => s + x.amount, 0);

export const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

export const dailyTxnCount = transactions.filter((t) => t.date === "2026-05-20").length;
export const refundRequestsCount = transactions.filter((t) => t.type === "Refund" && t.status !== "Refunded").length;
