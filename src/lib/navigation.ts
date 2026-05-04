// Centralised top-navigation. Supports nested dropdowns.
// ADMIN: pages will continue to be added; just edit this file (later DB-driven).

export interface NavLeaf {
  label: string;
  to: string;
}

export interface NavGroup {
  label: string;
  links: NavLeaf[];
}

export interface NavItem {
  label: string;
  to?: string;                 // direct link (no dropdown)
  groups?: NavGroup[];         // grouped dropdown (each group has its own heading)
  links?: NavLeaf[];           // simple flat dropdown
}

export const TOP_NAV: NavItem[] = [
  { label: "Home", to: "/" },

  {
    label: "About",
    groups: [
      {
        label: "About KITS",
        links: [
          { label: "Vision & Mission",                  to: "/about/vision-mission" },
          { label: "Organization Chart",                 to: "/about/organization-chart" },
          { label: "College Location",                   to: "/about/college-location" },
          { label: "Accreditation & Ranking",            to: "/about/accreditation" },
          { label: "Institutional Development Plan",     to: "/about/institutional-development-plan" },
          { label: "Code of Ethics",                     to: "/about/code-of-ethics" },
          { label: "Code of Conduct",                    to: "/about/code-of-conduct" },
          { label: "HR Policy",                          to: "/about/hr-policy" },
          { label: "Annual Report",                      to: "/about/annual-report" },
          { label: "Audit Report",                       to: "/about/audit-report" },
        ],
      },
      {
        label: "Administration",
        links: [
          { label: "Chairman",                  to: "/about/chairman" },
          { label: "Secretary & Correspondent", to: "/about/secretary" },
          { label: "Principal",                 to: "/about/principal" },
          { label: "Governing Body",            to: "/about/governing-body" },
          { label: "Office Staff",              to: "/about/office-staff" },
          { label: "Internal Complaint Committee", to: "/about/icc" },
        ],
      },
    ],
  },

  {
    label: "Academics",
    links: [
      { label: "Programs Overview",      to: "/academics" },
      { label: "Departments",             to: "/departments" },
      { label: "Syllabus & Regulations",  to: "/academics/syllabus-regulations" },
      { label: "Academic Calendars",      to: "/examination/academic-calendars" },
      { label: "Academic Collaborations", to: "/academics/collaborations" },
    ],
  },

  {
    label: "Admissions",
    links: [
      { label: "Admission Procedure",  to: "/admissions" },
      { label: "Courses & Intake",     to: "/admissions/courses-intake" },
      { label: "Fee Structure",        to: "/admissions/fee-structure" },
      { label: "Fee Refund Policy",    to: "/admissions/fee-refund-policy" },
      { label: "Reservation Roster",   to: "/admissions/reservation-roster" },
      { label: "Brochure",             to: "/admissions/brochure" },
    ],
  },

  {
    label: "Examination",
    links: [
      { label: "Examination Cell",            to: "/examination" },
      { label: "External Exams Timetables",    to: "/examination/external-timetables" },
      { label: "Internal Exams Timetables",    to: "/examination/internal-timetables" },
      { label: "Academic Calendars",            to: "/examination/academic-calendars" },
      { label: "Previous Question Papers",     to: "/examination/question-papers" },
      { label: "Forms Download",                to: "/examination/forms-download" },
      { label: "Contact Details",                to: "/examination/contact" },
    ],
  },

  {
    label: "Placements",
    links: [
      { label: "About Placement Cell",      to: "/placements" },
      { label: "Placement Details",          to: "/placements/details" },
      { label: "Career Guidance",            to: "/placements/career-guidance" },
      { label: "Capacity Development",       to: "/placements/capacity-development" },
      { label: "Internship Details",         to: "/placements/internships" },
      { label: "Our Recruiters",             to: "/placements/recruiters" },
      { label: "Soft Skills Training",       to: "/placements/soft-skills" },
      { label: "Contact",                     to: "/placements/contact" },
    ],
  },

  {
    label: "Research",
    links: [
      { label: "R&D Overview",            to: "/research" },
      { label: "Research Committee",       to: "/research/committee" },
      { label: "Recent Activities",         to: "/research/activities" },
      { label: "Research Incentives",       to: "/research/incentives" },
      { label: "Patents",                    to: "/research/patents" },
      { label: "R&D Policy",                to: "/research/policy" },
      { label: "Faculty Publications",      to: "/research/publications" },
      { label: "Innovation Council (IIC)",  to: "/research/iic" },
      { label: "Ph.D Supervisors",          to: "/research/phd-supervisors" },
      { label: "FDP / Workshops",           to: "/research/fdp-attendance" },
      { label: "Entrepreneurship Cell",      to: "/research/edc" },
      { label: "Consultancy Policy",         to: "/research/consultancy-policy" },
    ],
  },

  {
    label: "Student Life",
    links: [
      { label: "Overview",                  to: "/student-life" },
      { label: "Sports & Games",            to: "/student-life/sports" },
      { label: "NSS",                       to: "/student-life/nss" },
      { label: "Hostel",                    to: "/student-life/hostel" },
      { label: "Anti-Ragging",              to: "/student-life/anti-ragging" },
      { label: "Canteen",                   to: "/student-life/canteen" },
      { label: "Health Facilities",         to: "/student-life/health" },
      { label: "SEDG Cell",                 to: "/student-life/sedg" },
      { label: "Equal Opportunity Cell",    to: "/student-life/equal-opportunity" },
      { label: "Barrier-Free Environment",  to: "/student-life/barrier-free" },
      { label: "Grievance Redressal",       to: "/grievance-cell" },
    ],
  },

  {
    label: "Quality",
    groups: [
      {
        label: "Accreditation",
        links: [
          { label: "NAAC",                  to: "/naac" },
          { label: "IQAC",                  to: "/iqac" },
          { label: "AICTE Approvals",       to: "/aicte" },
          { label: "Mandatory Disclosure",  to: "/mandatory-disclosure" },
        ],
      },
      {
        label: "Governance",
        links: [
          { label: "Committees",            to: "/committees" },
          { label: "Information Corner",    to: "/info" },
          { label: "Right to Information",  to: "/info/rti" },
          { label: "Telephone Directory",   to: "/info/directory" },
        ],
      },
    ],
  },

  {
    label: "More",
    links: [
      { label: "Alumni",            to: "/alumni" },
      { label: "Central Library",   to: "/library" },
      { label: "Gallery",            to: "/gallery" },
      { label: "Student Corner",     to: "/student-corner" },
      { label: "Campus Life",        to: "/campus-life" },
      { label: "Careers",             to: "/careers" },
      { label: "Job Openings",       to: "/info/jobs" },
      { label: "Feedback",            to: "/feedback" },
      { label: "Contact",             to: "/contact" },
    ],
  },
];
