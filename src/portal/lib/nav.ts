/**
 * Sidebar navigation configurations for each portal role.
 * Edit this file when adding / removing portal modules.
 */

import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  ClipboardCheck,
  Calendar,
  Wallet,
  Briefcase,
  Bell,
  Settings,
  HelpCircle,
  Users,
  BookOpen,
  Upload,
  Building2,
  Award,
  FileText,
  TrendingUp,
  CheckCircle,
  ScrollText,
  BarChart3,
  Heart,
  Receipt,
  HandCoins,
  PieChart,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "./roles";

export interface PortalNavItem {
  label: string;
  to: string;
  Icon: LucideIcon;
}

export interface PortalNavSection {
  /** Optional heading shown above a group of items */
  heading?: string;
  items: PortalNavItem[];
}

export const PORTAL_NAV: Record<Role, PortalNavSection[]> = {
  // ---------- STUDENT ----------
  student: [
    {
      items: [
        { label: "Dashboard",       to: "/portal/student",                Icon: LayoutDashboard },
        { label: "Academics",       to: "/portal/student/academics",       Icon: BookOpen },
        { label: "Attendance",       to: "/portal/student/attendance",      Icon: CalendarCheck },
        { label: "Examinations",     to: "/portal/student/examinations",    Icon: ClipboardCheck },
        { label: "Timetable",         to: "/portal/student/timetable",        Icon: Calendar },
        { label: "Fees",              to: "/portal/student/fees",             Icon: Wallet },
        { label: "Placements",        to: "/portal/student/placements",       Icon: Briefcase },
        { label: "Notifications",     to: "/portal/student/notifications",    Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/student/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/student/settings", Icon: Settings },
      ],
    },
  ],

  // ---------- FACULTY ----------
  faculty: [
    {
      items: [
        { label: "Dashboard",     to: "/portal/faculty",                Icon: LayoutDashboard },
        { label: "Attendance",     to: "/portal/faculty/attendance",      Icon: CalendarCheck },
        { label: "Academics",      to: "/portal/faculty/academics",       Icon: BookOpen },
        { label: "Students",       to: "/portal/faculty/students",         Icon: Users },
        { label: "Timetable",       to: "/portal/faculty/timetable",        Icon: Calendar },
        { label: "Notifications",   to: "/portal/faculty/notifications",    Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/faculty/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/faculty/settings", Icon: Settings },
      ],
    },
  ],

  // ---------- HOD ----------
  hod: [
    {
      items: [
        { label: "Dashboard",            to: "/portal/hod",                 Icon: LayoutDashboard },
        { label: "Student Monitoring",   to: "/portal/hod/students",          Icon: Users },
        { label: "Faculty Management",    to: "/portal/hod/faculty",           Icon: GraduationCap },
        { label: "Academics",             to: "/portal/hod/academics",         Icon: BookOpen },
        { label: "Examination Overview",  to: "/portal/hod/examinations",      Icon: ClipboardCheck },
        { label: "Placement Overview",    to: "/portal/hod/placements",        Icon: Briefcase },
        { label: "Reports",                to: "/portal/hod/reports",            Icon: BarChart3 },
        { label: "Notifications",          to: "/portal/hod/notifications",      Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/hod/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/hod/settings", Icon: Settings },
      ],
    },
  ],

  // ---------- PRINCIPAL ----------
  principal: [
    {
      items: [
        { label: "Dashboard",             to: "/portal/principal",                Icon: LayoutDashboard },
        { label: "Departments",            to: "/portal/principal/departments",    Icon: Building2 },
        { label: "Students",                to: "/portal/principal/students",        Icon: Users },
        { label: "Faculty",                 to: "/portal/principal/faculty",         Icon: GraduationCap },
        { label: "Examinations",            to: "/portal/principal/examinations",    Icon: ClipboardCheck },
        { label: "Placements",              to: "/portal/principal/placements",      Icon: Briefcase },
        { label: "Approvals",                to: "/portal/principal/approvals",       Icon: CheckCircle },
        { label: "Reports & Analytics",     to: "/portal/principal/reports",         Icon: BarChart3 },
        { label: "Notifications",            to: "/portal/principal/notifications",   Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/principal/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/principal/settings", Icon: Settings },
      ],
    },
  ],

  // ---------- EXAM CELL ----------
  exam: [
    {
      items: [
        { label: "Dashboard",            to: "/portal/exam",                  Icon: LayoutDashboard },
        { label: "Student Records",      to: "/portal/exam/records",           Icon: Users },
        { label: "Examination Mgmt.",    to: "/portal/exam/examinations",       Icon: ClipboardCheck },
        { label: "Results",                to: "/portal/exam/results",            Icon: Award },
        { label: "Revaluation",            to: "/portal/exam/revaluation",        Icon: ScrollText },
        { label: "Regulations",            to: "/portal/exam/regulations",        Icon: FileText },
        { label: "Reports",                to: "/portal/exam/reports",            Icon: BarChart3 },
        { label: "Notifications",          to: "/portal/exam/notifications",      Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/exam/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/exam/settings", Icon: Settings },
      ],
    },
  ],

  // ---------- ACCOUNTS ----------
  accounts: [
    {
      items: [
        { label: "Dashboard",          to: "/portal/accounts",               Icon: LayoutDashboard },
        { label: "Student Fees",        to: "/portal/accounts/fees",           Icon: Wallet },
        { label: "Payments",            to: "/portal/accounts/payments",        Icon: Receipt },
        { label: "Scholarships",        to: "/portal/accounts/scholarships",    Icon: HandCoins },
        { label: "Expenses",             to: "/portal/accounts/expenses",        Icon: TrendingUp },
        { label: "Reports",              to: "/portal/accounts/reports",          Icon: PieChart },
        { label: "Notifications",        to: "/portal/accounts/notifications",    Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/accounts/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/accounts/settings", Icon: Settings },
      ],
    },
  ],

  // ---------- PARENT ----------
  parent: [
    {
      items: [
        { label: "Dashboard",       to: "/portal/parent",                Icon: LayoutDashboard },
        { label: "Attendance",       to: "/portal/parent/attendance",      Icon: CalendarCheck },
        { label: "Examinations",     to: "/portal/parent/examinations",    Icon: ClipboardCheck },
        { label: "Fees",              to: "/portal/parent/fees",             Icon: Wallet },
        { label: "Notifications",     to: "/portal/parent/notifications",    Icon: Bell },
      ],
    },
    {
      heading: "Help",
      items: [
        { label: "Support",   to: "/portal/parent/support",  Icon: HelpCircle },
        { label: "Settings",   to: "/portal/parent/settings", Icon: Settings },
      ],
    },
  ],
};

// Mark a couple of icons as unused for now so the import list works cleanly:
export const _ = { Upload, Heart };
