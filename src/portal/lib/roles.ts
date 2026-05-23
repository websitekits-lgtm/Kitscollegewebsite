// Central registry of all portal roles.
// Login pages and the auth context use this to drive their behaviour.

import {
  GraduationCap,
  UserCog,
  Users,
  Crown,
  ClipboardList,
  Wallet,
  Heart,
  type LucideIcon,
} from "lucide-react";

export type Role =
  | "student"
  | "faculty"
  | "hod"
  | "principal"
  | "exam"
  | "accounts"
  | "parent";

export interface RoleConfig {
  /** Role identifier (matches URL slug, e.g. /login/student) */
  key: Role;
  /** Display title, e.g. "Student Portal" */
  title: string;
  /** Short tagline shown on login */
  tagline: string;
  /** ID-field label (e.g. "Roll Number") */
  idLabel: string;
  idPlaceholder: string;
  /** Icon shown on login + portal sidebar */
  Icon: LucideIcon;
  /** Tailwind class for the accent color of this portal */
  accentClass: string;
  /** Portal landing route — where user lands after login */
  portalRoot: string;
}

export const ROLE_CONFIG: Record<Role, RoleConfig> = {
  student: {
    key: "student",
    title: "Student Portal",
    tagline: "Your classes, attendance, exams and fees — all in one place.",
    idLabel: "Roll Number / Student ID",
    idPlaceholder: "e.g., 22B81A0501",
    Icon: GraduationCap,
    accentClass: "from-accent to-accent/70",
    portalRoot: "/portal/student",
  },
  faculty: {
    key: "faculty",
    title: "Faculty Portal",
    tagline: "Manage classes, mark attendance, upload materials.",
    idLabel: "Faculty ID / Email",
    idPlaceholder: "e.g., faculty@kits-anna.com",
    Icon: UserCog,
    accentClass: "from-blue-500 to-blue-400",
    portalRoot: "/portal/faculty",
  },
  hod: {
    key: "hod",
    title: "HOD Portal",
    tagline: "Oversee your department's faculty, students, and performance.",
    idLabel: "HOD ID / Email",
    idPlaceholder: "e.g., hod.cse@kits-anna.com",
    Icon: Users,
    accentClass: "from-purple-500 to-purple-400",
    portalRoot: "/portal/hod",
  },
  principal: {
    key: "principal",
    title: "Principal Dashboard",
    tagline: "Institution-wide oversight, approvals, and analytics.",
    idLabel: "Principal ID / Email",
    idPlaceholder: "e.g., principal@kits-anna.com",
    Icon: Crown,
    accentClass: "from-amber-500 to-amber-400",
    portalRoot: "/portal/principal",
  },
  exam: {
    key: "exam",
    title: "Exam Cell Portal",
    tagline: "Schedules, hall tickets, results, and revaluation.",
    idLabel: "Exam Cell ID / Email",
    idPlaceholder: "e.g., exams@kits-anna.com",
    Icon: ClipboardList,
    accentClass: "from-rose-500 to-rose-400",
    portalRoot: "/portal/exam",
  },
  accounts: {
    key: "accounts",
    title: "Accounts & Finance Portal",
    tagline: "Fees, scholarships, payments, and expense management.",
    idLabel: "Accounts ID / Email",
    idPlaceholder: "e.g., accounts@kits-anna.com",
    Icon: Wallet,
    accentClass: "from-emerald-500 to-emerald-400",
    portalRoot: "/portal/accounts",
  },
  parent: {
    key: "parent",
    title: "Parent Portal",
    tagline: "Track your child's attendance, results, and fee status.",
    idLabel: "Parent ID / Mobile",
    idPlaceholder: "e.g., +91 ...",
    Icon: Heart,
    accentClass: "from-pink-500 to-pink-400",
    portalRoot: "/portal/parent",
  },
};

export const ROLE_LIST: Role[] = [
  "student",
  "faculty",
  "hod",
  "principal",
  "exam",
  "accounts",
  "parent",
];

export const isValidRole = (r: string | undefined): r is Role =>
  !!r && ROLE_LIST.includes(r as Role);
