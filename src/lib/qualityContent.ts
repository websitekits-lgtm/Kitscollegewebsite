// NAAC, IQAC, AICTE — quality and compliance content.
// Mostly DYNAMIC (PDFs uploaded by admin yearly).

export interface NaacCriteria {
  number: number;
  title: string;
  description: string;
  keyMetrics?: string[];
}

export interface AicteApproval {
  year: string;
  fileName: string;
  highlight?: string;
}

export interface AqarReport {
  year: string;
  fileName: string;
}

// =========================================================================
// NAAC — STATIC overview, DYNAMIC PDFs (criteria submissions, SSR, DVV)
// =========================================================================
export const NAAC_OVERVIEW = {
  intro:
    "The National Assessment and Accreditation Council (NAAC) accreditation is a comprehensive evaluation of an institution's quality. KITS Markapur is committed to continuous quality enhancement and uses NAAC criteria as a guiding framework.",
  ourStatus: "NAAC Accredited",
  cycle: "First Cycle of Accreditation",
};

export const NAAC_CRITERIA: NaacCriteria[] = [
  {
    number: 1,
    title: "Curricular Aspects",
    description: "Curriculum design, development, planning, implementation, and value-added courses.",
    keyMetrics: ["Curriculum design and revision", "Academic flexibility", "Curriculum enrichment", "Feedback system"],
  },
  {
    number: 2,
    title: "Teaching, Learning & Evaluation",
    description: "Student admission, teacher quality, teaching-learning process, and student assessment.",
    keyMetrics: ["Student profile", "Catering to differently-abled learners", "Teacher quality", "Evaluation process"],
  },
  {
    number: 3,
    title: "Research, Innovations & Extension",
    description: "Promotion of research, publications, IP, consultancy, extension activities and collaborations.",
    keyMetrics: ["Research promotion", "Innovation ecosystem", "Resource mobilisation", "Extension activities"],
  },
  {
    number: 4,
    title: "Infrastructure & Learning Resources",
    description: "Physical facilities, library, ICT, maintenance of campus and IT infrastructure.",
    keyMetrics: ["Physical facilities", "Library as a learning resource", "IT infrastructure", "Maintenance"],
  },
  {
    number: 5,
    title: "Student Support & Progression",
    description: "Student support, scholarships, placements, alumni engagement, and career counselling.",
    keyMetrics: ["Student support", "Progression to higher studies", "Placements", "Alumni engagement"],
  },
  {
    number: 6,
    title: "Governance, Leadership & Management",
    description: "Institutional vision, leadership, strategy, faculty development, and resource mobilisation.",
    keyMetrics: ["Vision and leadership", "Strategy and decentralisation", "Faculty empowerment", "IQAC effectiveness"],
  },
  {
    number: 7,
    title: "Institutional Values & Best Practices",
    description: "Gender equity, environmental sustainability, inclusive values, and institutional best practices.",
    keyMetrics: ["Gender equity", "Environmental consciousness", "Inclusion and diversity", "Best practices"],
  },
];

// =========================================================================
// IQAC — STATIC overview, DYNAMIC PDFs (minutes, AQAR)
// =========================================================================
export const IQAC_OVERVIEW = {
  intro:
    "The Internal Quality Assurance Cell (IQAC) is the post-accreditation quality sustenance body at KITS. It plans, guides, reviews, and reports on all quality-related initiatives across the institution.",
  objectives: [
    "Develop a system for conscious, consistent, and catalytic action to improve academic and administrative performance.",
    "Promote measures for institutional functioning towards quality enhancement.",
    "Internalise quality culture and institutionalise best practices.",
    "Coordinate the dissemination of information on quality parameters.",
    "Document the various programmes / activities leading to quality improvement.",
    "Prepare and submit the Annual Quality Assurance Report (AQAR) to NAAC.",
  ],
};

export const IQAC_COMMITTEE = [
  { name: "Dr. K. Sridhar",     designation: "Principal",                 role: "Chairperson" },
  { name: "Dean — IQAC",         designation: "IQAC Coordinator",          role: "Convener" },
  { name: "HoD — CSE",           designation: "Faculty Member",            role: "Member" },
  { name: "HoD — ECE",           designation: "Faculty Member",            role: "Member" },
  { name: "HoD — EEE",           designation: "Faculty Member",            role: "Member" },
  { name: "HoD — MECH",          designation: "Faculty Member",            role: "Member" },
  { name: "HoD — CIVIL",         designation: "Faculty Member",            role: "Member" },
  { name: "Industry Expert",     designation: "External Member",            role: "Industry Liaison" },
  { name: "Alumni Representative", designation: "External Member",          role: "Alumni Liaison" },
  { name: "Student Representative", designation: "Student Council",        role: "Student Voice" },
];

export const IQAC_QUALITY_INITIATIVES = [
  "Outcome-based education (OBE) implementation across all programmes",
  "Periodic curriculum review with industry inputs",
  "Faculty development programmes (FDP) every semester",
  "Mentorship programmes for first-generation engineers",
  "Continuous evaluation through internal assessments",
  "Student feedback mechanism (subject, teacher, course)",
  "Plagiarism check for faculty publications and student dissertations",
  "Green campus and energy audit",
  "Annual academic and administrative audit",
];

export const IQAC_BEST_PRACTICES = [
  {
    title: "Practice 1 — Mentor-Mentee System",
    objective: "Personalised support for academic and personal challenges.",
    impact: "Improved attendance, reduced dropouts, and stronger faculty-student bonds.",
  },
  {
    title: "Practice 2 — Industry-Aligned Capstone Projects",
    objective: "Bridge classroom learning with real industry problems.",
    impact: "Placement readiness improved; multiple project ideas converted to startups.",
  },
];

export const IQAC_DISTINCTIVENESS = {
  title: "Engineering education for first-generation rural learners",
  body: [
    "KITS Markapur sits in a region where many of our students are first-generation engineering aspirants from rural backgrounds. Our distinctiveness lies in how we design every academic and support process around this reality.",
    "From bridge courses in core mathematics and English to mentor-driven personal counselling, from generous scholarships to dedicated soft-skills training — every part of the institution works together to ensure that any student who walks in with potential walks out with a degree, a job, and a vision for the future.",
    "Our annual placement track record and the rapid growth of our alumni community in IT and core engineering organisations reflect the success of this approach.",
  ],
};

// =========================================================================
// AICTE APPROVAL PDFs — DYNAMIC (admin uploads each year)
// =========================================================================
export const AICTE_APPROVALS: AicteApproval[] = [
  { year: "2025-26", fileName: "AICTE-Approval-2025-26.pdf", highlight: "Latest approval" },
  { year: "2024-25", fileName: "AICTE-Approval-2024-25.pdf" },
  { year: "2023-24", fileName: "AICTE-Approval-2023-24.pdf" },
  { year: "2022-23", fileName: "AICTE-Approval-2022-23.pdf" },
  { year: "2021-22", fileName: "AICTE-Approval-2021-22.pdf" },
  { year: "2020-21", fileName: "AICTE-Approval-2020-21.pdf" },
  { year: "Initial",  fileName: "AICTE-Initial-Approval-2008.pdf", highlight: "Year of inception" },
];

// =========================================================================
// AQAR REPORTS — DYNAMIC (admin uploads each year)
// =========================================================================
export const AQAR_REPORTS: AqarReport[] = [
  { year: "2023-24", fileName: "AQAR-2023-24.pdf" },
  { year: "2022-23", fileName: "AQAR-2022-23.pdf" },
  { year: "2021-22", fileName: "AQAR-2021-22.pdf" },
  { year: "2020-21", fileName: "AQAR-2020-21.pdf" },
];
