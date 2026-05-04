// Static search index — pages, departments, events.
// Future: build dynamically from CMS/admin data.

import { DEPARTMENTS } from "@/lib/college";
import { EVENTS } from "@/lib/events";

export type SearchResultType = "page" | "department" | "event" | "info";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  keywords?: string[];
}

const pages: SearchResult[] = [
  { type: "page", title: "Home", description: "KITS Markapur main landing page", url: "/", keywords: ["main", "landing", "kits"] },
  { type: "page", title: "About KITS", description: "Our story, vision and management", url: "/about", keywords: ["chairman", "secretary", "anna venkata rambabu", "vision", "mission", "history"] },
  { type: "page", title: "Academics", description: "Academic programs, calendar and curriculum", url: "/academics", keywords: ["b.tech", "courses", "programs", "syllabus", "calendar", "curriculum"] },
  { type: "page", title: "Departments", description: "All seven departments at KITS", url: "/departments", keywords: ["branches", "engineering", "courses"] },
  { type: "page", title: "Admissions", description: "Apply now — admissions process and fee structure", url: "/admissions", keywords: ["apply", "eapcet", "kcit", "fees", "eligibility", "scholarships", "join"] },
  { type: "page", title: "Placements", description: "Placement statistics, recruiters and success stories", url: "/placements", keywords: ["jobs", "career", "recruiters", "tcs", "infosys", "wipro", "package"] },
  { type: "page", title: "Campus Life", description: "Hostel, sports, clubs and student life", url: "/campus-life", keywords: ["hostel", "sports", "clubs", "facilities", "transport"] },
  { type: "page", title: "Gallery", description: "Photos from campus, events and labs", url: "/gallery", keywords: ["photos", "images", "events", "campus"] },
  { type: "page", title: "Student Corner", description: "Notices, exam results, downloads and grievance redressal", url: "/student-corner", keywords: ["notices", "results", "exams", "downloads", "anti-ragging", "grievance"] },
  { type: "page", title: "Research & NAAC", description: "Research, IQAC and accreditation disclosures", url: "/research", keywords: ["research", "iqac", "naac", "nba", "publications", "mou"] },
  { type: "page", title: "Contact", description: "Phone, email and campus address", url: "/contact", keywords: ["phone", "email", "address", "location", "reach", "map"] },
  // About / Administration sub-pages
  { type: "page", title: "Vision & Mission", description: "Our institutional vision, mission and core values", url: "/about/vision-mission", keywords: ["vision", "mission", "values", "philosophy"] },
  { type: "page", title: "Organization Chart", description: "Institutional hierarchy from governing body to students", url: "/about/organization-chart", keywords: ["hierarchy", "structure", "organization"] },
  { type: "page", title: "College Location", description: "Campus address, map and how to reach", url: "/about/college-location", keywords: ["address", "map", "directions", "markapur", "location"] },
  { type: "page", title: "Chairman", description: "Sri Anna Venkata Rambabu — Chairman's message", url: "/about/chairman", keywords: ["chairman", "anna venkata rambabu", "founder", "leadership"] },
  { type: "page", title: "Secretary & Correspondent", description: "Secretary's welcome message", url: "/about/secretary", keywords: ["secretary", "correspondent", "leadership"] },
  { type: "page", title: "Principal", description: "Dr. K. Sridhar — Principal's message", url: "/about/principal", keywords: ["principal", "sridhar", "academic head"] },
  { type: "page", title: "Governing Body", description: "Members of the apex governing body", url: "/about/governing-body", keywords: ["governing body", "council", "board", "members"] },
  { type: "page", title: "Code of Ethics", description: "Institutional code of ethics and integrity", url: "/about/code-of-ethics", keywords: ["ethics", "integrity", "values", "policy"] },
  { type: "page", title: "Code of Conduct", description: "Behavioural and disciplinary guidelines", url: "/about/code-of-conduct", keywords: ["conduct", "discipline", "rules", "policy"] },
  { type: "page", title: "Annual Report", description: "Yearly performance and achievements report", url: "/about/annual-report", keywords: ["annual report", "yearly", "performance"] },
  { type: "page", title: "Audit Report", description: "Audited financial statements", url: "/about/audit-report", keywords: ["audit", "financial", "report", "statements"] },
  // Alumni & Grievance
  { type: "page", title: "Alumni Association", description: "KITS alumni network, registration and committee", url: "/alumni", keywords: ["alumni", "graduates", "ex students", "network"] },
  { type: "page", title: "Grievance Redressal Cell", description: "Submit grievances — academic, hostel, transport and more", url: "/grievance-cell", keywords: ["grievance", "complaint", "redressal", "anti-ragging"] },
  // Examination
  { type: "page", title: "Examination", description: "Timetables, results, question papers, forms and contacts", url: "/examination", keywords: ["exam", "examination", "timetable", "results", "papers", "forms"] },
  { type: "page", title: "External Exams Timetables", description: "JNTUK semester exam schedules", url: "/examination/external-timetables", keywords: ["external", "jntuk", "timetable", "regular", "supplementary", "schedule"] },
  { type: "page", title: "Internal Exams Timetables", description: "Mid-term and lab internal schedules", url: "/examination/internal-timetables", keywords: ["internal", "mid", "mid-term", "midterm", "lab", "schedule"] },
  { type: "page", title: "Academic Calendars", description: "Year-wise academic calendars for B.Tech and M.Tech", url: "/examination/academic-calendars", keywords: ["calendar", "academic year", "schedule"] },
  { type: "page", title: "Previous Question Papers", description: "Branch and subject-wise question papers archive", url: "/examination/question-papers", keywords: ["question paper", "papers", "previous", "archive", "subject"] },
  { type: "page", title: "Examination Forms", description: "Application, revaluation, certificate and migration forms", url: "/examination/forms-download", keywords: ["forms", "application", "revaluation", "transcripts", "migration", "certificate", "download"] },
  { type: "page", title: "Examination Contact", description: "Contact the Examination Cell", url: "/examination/contact", keywords: ["exam contact", "controller of examinations", "exam help"] },
  // Academics sub-pages
  { type: "page", title: "Syllabus & Regulations", description: "JNTUK regulations and AICTE-aligned curriculum", url: "/academics/syllabus-regulations", keywords: ["syllabus", "regulation", "r23", "r20", "curriculum", "obe"] },
  { type: "page", title: "Academic Collaborations", description: "Industry MoUs and university partnerships", url: "/academics/collaborations", keywords: ["mou", "memorandum", "collaboration", "partnership", "industry"] },
  // Admissions sub-pages
  { type: "page", title: "Courses & Intake", description: "All B.Tech and M.Tech programmes with annual intake", url: "/admissions/courses-intake", keywords: ["courses", "intake", "seats", "branches", "programs", "btech", "mtech"] },
  { type: "page", title: "Fee Structure", description: "Tuition, examination and other charges", url: "/admissions/fee-structure", keywords: ["fee", "fees", "tuition", "scholarship", "convener", "management quota"] },
  { type: "page", title: "Fee Refund Policy", description: "UGC and AICTE refund norms", url: "/admissions/fee-refund-policy", keywords: ["refund", "fee refund", "cancellation"] },
  { type: "page", title: "Reservation Roster", description: "Category-wise seat reservation as per government norms", url: "/admissions/reservation-roster", keywords: ["reservation", "roster", "sc", "st", "bc", "ews", "category"] },
  { type: "page", title: "College Brochure", description: "Downloadable brochure with everything about KITS", url: "/admissions/brochure", keywords: ["brochure", "prospectus", "download", "info"] },
  // R&D
  { type: "page", title: "Research Committee", description: "The committee that drives KITS research priorities", url: "/research/committee", keywords: ["research", "committee", "rnd"] },
  { type: "page", title: "Recent R&D Activities", description: "Workshops, MoUs, grants, conference participations", url: "/research/activities", keywords: ["activities", "rnd", "workshop", "grant", "mou"] },
  { type: "page", title: "Research Incentives", description: "Faculty rewards for publications and patents", url: "/research/incentives", keywords: ["incentive", "reward", "publication", "patent"] },
  { type: "page", title: "Patents", description: "Patents filed, published, and granted by KITS", url: "/research/patents", keywords: ["patents", "ipr", "innovation"] },
  { type: "page", title: "R&D Policy", description: "Institutional research policy and IP framework", url: "/research/policy", keywords: ["policy", "rnd", "research integrity", "ipr"] },
  { type: "page", title: "Faculty Publications", description: "Journals, conferences, books, book chapters", url: "/research/publications", keywords: ["publications", "papers", "journal", "conference", "books"] },
  { type: "page", title: "Innovation Council (IIC)", description: "Ministry of Education innovation council at KITS", url: "/research/iic", keywords: ["iic", "innovation", "mic", "moe", "aicte"] },
  { type: "page", title: "Ph.D Supervisors", description: "JNTUK-recognised research supervisors", url: "/research/phd-supervisors", keywords: ["phd", "supervisor", "research", "doctoral"] },
  { type: "page", title: "Faculty FDPs / Workshops", description: "Faculty participation in development programmes", url: "/research/fdp-attendance", keywords: ["fdp", "workshop", "conference", "refresher"] },
  { type: "page", title: "Entrepreneurship Cell (EDC)", description: "Pre-incubation and startup support for students", url: "/research/edc", keywords: ["edc", "entrepreneurship", "startup", "incubator"] },
  { type: "page", title: "Consultancy Policy", description: "Industry consultancy framework", url: "/research/consultancy-policy", keywords: ["consultancy", "industry", "policy"] },
  // Placement
  { type: "page", title: "Placement Details", description: "Year-on-year placement statistics and recruiters", url: "/placements/details", keywords: ["placement", "stats", "package", "lpa"] },
  { type: "page", title: "Career Guidance & Competitive Exams", description: "GATE, MBA, civil services and abroad-study guidance", url: "/placements/career-guidance", keywords: ["gate", "mba", "cat", "civil services", "gre", "career"] },
  { type: "page", title: "Capacity Development", description: "Skill enhancement activities", url: "/placements/capacity-development", keywords: ["aptitude", "skill", "training", "capacity"] },
  { type: "page", title: "Internship Details", description: "Industry internships across departments", url: "/placements/internships", keywords: ["internship", "industry", "training"] },
  { type: "page", title: "Our Recruiters", description: "120+ recruiters who hire from KITS", url: "/placements/recruiters", keywords: ["recruiters", "companies", "tcs", "infosys", "wipro", "hiring"] },
  { type: "page", title: "Soft Skills Training", description: "Communication, leadership and personality development", url: "/placements/soft-skills", keywords: ["soft skills", "communication", "leadership", "personality"] },
  { type: "page", title: "Placement Cell Contact", description: "Reach the Training & Placement Cell", url: "/placements/contact", keywords: ["placement contact", "tpo"] },
  // Student Life
  { type: "page", title: "Student Life", description: "Sports, NSS, hostel, clubs and welfare", url: "/student-life", keywords: ["student life", "campus life"] },
  { type: "page", title: "Sports & Games", description: "Sports facilities, gym, yoga, tournaments", url: "/student-life/sports", keywords: ["sports", "games", "gym", "yoga", "athletics"] },
  { type: "page", title: "NSS", description: "National Service Scheme — community service", url: "/student-life/nss", keywords: ["nss", "national service scheme", "community"] },
  { type: "page", title: "Hostel", description: "On-campus hostels for boys and girls", url: "/student-life/hostel", keywords: ["hostel", "accommodation", "boarding", "lodging", "mess"] },
  { type: "page", title: "Anti-Ragging", description: "Zero-tolerance anti-ragging policy", url: "/student-life/anti-ragging", keywords: ["anti-ragging", "ragging", "helpline", "ugc"] },
  { type: "page", title: "Canteen", description: "Hygienic, affordable on-campus meals", url: "/student-life/canteen", keywords: ["canteen", "mess", "food", "meals"] },
  { type: "page", title: "Health Facilities", description: "Dispensary, medical officer and emergency support", url: "/student-life/health", keywords: ["health", "dispensary", "medical", "doctor", "emergency"] },
  { type: "page", title: "SEDG Cell / Social Welfare", description: "Support for SC/ST/OBC/EWS and disadvantaged students", url: "/student-life/sedg", keywords: ["sedg", "social welfare", "scholarship", "sc", "st", "obc", "ews"] },
  { type: "page", title: "Equal Opportunity Cell", description: "Equity and equal opportunity for all", url: "/student-life/equal-opportunity", keywords: ["equal opportunity", "equity", "diversity"] },
  { type: "page", title: "Barrier-Free Environment", description: "Accessibility for differently-abled students", url: "/student-life/barrier-free", keywords: ["barrier free", "accessibility", "disabled", "differently abled", "ramps"] },
  // Library
  { type: "page", title: "Central Library", description: "Library overview, hours, and stats", url: "/library", keywords: ["library", "books", "reading"] },
  { type: "page", title: "About Central Library", description: "History, infrastructure and rules", url: "/library/about", keywords: ["library", "rules", "infrastructure"] },
  { type: "page", title: "Digital Library", description: "E-journals, databases, NPTEL, IEEE, Springer", url: "/library/digital", keywords: ["digital library", "ieee", "springer", "nptel", "delnet", "ebook", "ejournal"] },
  { type: "page", title: "Library Resources & Services", description: "Collections and services offered", url: "/library/resources", keywords: ["resources", "services", "lending", "reference"] },
  { type: "page", title: "Library Staff", description: "Librarian and team", url: "/library/staff", keywords: ["library staff", "librarian"] },
  { type: "page", title: "Library Gallery", description: "Photos of the library", url: "/library/gallery", keywords: ["library gallery", "photos"] },
  // NAAC
  { type: "page", title: "NAAC Accreditation", description: "NAAC overview, criteria, SSR and DVV", url: "/naac", keywords: ["naac", "accreditation", "ssr", "dvv", "quality"] },
  { type: "page", title: "NAAC Criteria 1 — Curricular Aspects", description: "Curriculum design and implementation", url: "/naac/criteria-1", keywords: ["naac", "criteria 1", "curriculum"] },
  { type: "page", title: "NAAC Criteria 2 — Teaching, Learning & Evaluation", description: "Student admission and teaching quality", url: "/naac/criteria-2", keywords: ["naac", "criteria 2", "teaching"] },
  { type: "page", title: "NAAC Criteria 3 — Research, Innovations & Extension", description: "Research and extension activities", url: "/naac/criteria-3", keywords: ["naac", "criteria 3", "research"] },
  { type: "page", title: "NAAC Criteria 4 — Infrastructure", description: "Infrastructure and learning resources", url: "/naac/criteria-4", keywords: ["naac", "criteria 4", "infrastructure"] },
  { type: "page", title: "NAAC Criteria 5 — Student Support", description: "Student support and progression", url: "/naac/criteria-5", keywords: ["naac", "criteria 5", "support"] },
  { type: "page", title: "NAAC Criteria 6 — Governance", description: "Governance and leadership", url: "/naac/criteria-6", keywords: ["naac", "criteria 6", "governance"] },
  { type: "page", title: "NAAC Criteria 7 — Institutional Values", description: "Best practices and institutional values", url: "/naac/criteria-7", keywords: ["naac", "criteria 7", "values", "best practices"] },
  { type: "page", title: "NAAC SSR", description: "Self Study Report submitted to NAAC", url: "/naac/ssr", keywords: ["ssr", "self study report"] },
  { type: "page", title: "DVV Clarifications", description: "NAAC Data Validation responses", url: "/naac/dvv", keywords: ["dvv", "data validation"] },
  // IQAC
  { type: "page", title: "IQAC", description: "Internal Quality Assurance Cell overview", url: "/iqac", keywords: ["iqac", "quality assurance"] },
  { type: "page", title: "About IQAC", description: "Role, objectives and structure", url: "/iqac/about", keywords: ["iqac", "about"] },
  { type: "page", title: "IQAC Committee", description: "IQAC members and roles", url: "/iqac/committee", keywords: ["iqac committee", "members"] },
  { type: "page", title: "IQAC Minutes", description: "Records of IQAC meetings", url: "/iqac/minutes", keywords: ["iqac", "minutes", "meeting"] },
  { type: "page", title: "Quality Initiatives", description: "Major quality enhancement initiatives", url: "/iqac/quality-initiatives", keywords: ["quality", "initiatives", "obe"] },
  { type: "page", title: "Best Practices", description: "Documented institutional best practices", url: "/iqac/best-practices", keywords: ["best practices", "mentor mentee"] },
  { type: "page", title: "IQAC Policies", description: "Procedures and policies", url: "/iqac/policies", keywords: ["iqac", "policies", "procedures"] },
  { type: "page", title: "Institutional Distinctiveness", description: "What sets KITS apart", url: "/iqac/distinctiveness", keywords: ["distinctiveness", "unique", "first generation"] },
  { type: "page", title: "Student Satisfaction Survey", description: "Annual student feedback survey", url: "/iqac/sss", keywords: ["sss", "student satisfaction", "survey"] },
  { type: "page", title: "AQAR Reports", description: "Annual Quality Assurance Reports", url: "/iqac/aqar", keywords: ["aqar", "annual quality assurance"] },
  // AICTE / Committees / Misc
  { type: "page", title: "AICTE Approvals", description: "Year-wise AICTE approval letters", url: "/aicte", keywords: ["aicte", "approval", "extension of approval", "eoa"] },
  { type: "page", title: "Committees", description: "All 38+ statutory and operational committees", url: "/committees", keywords: ["committees", "members"] },
  { type: "page", title: "Mandatory Disclosure", description: "AICTE/UGC mandatory disclosure", url: "/mandatory-disclosure", keywords: ["mandatory disclosure", "compliance"] },
  { type: "page", title: "Feedback", description: "Submit feedback to KITS", url: "/feedback", keywords: ["feedback", "review", "rating"] },
  { type: "page", title: "Careers @ KITS", description: "Join KITS as faculty or staff", url: "/careers", keywords: ["careers", "jobs", "join", "hiring"] },
  // Information Corner
  { type: "page", title: "Information Corner", description: "RTI, jobs, telephone directory", url: "/info", keywords: ["information corner", "transparency"] },
  { type: "page", title: "Right to Information (RTI)", description: "File RTI applications under RTI Act 2005", url: "/info/rti", keywords: ["rti", "right to information", "pio", "appellate"] },
  { type: "page", title: "Job Openings", description: "Current vacancies at KITS", url: "/info/jobs", keywords: ["jobs", "openings", "vacancies", "hiring", "faculty"] },
  { type: "page", title: "Telephone Directory", description: "Department, office and hostel contacts", url: "/info/directory", keywords: ["telephone", "directory", "phone", "contacts"] },
  // Misc + Legal
  { type: "page", title: "Office Staff", description: "Administrative team across departments", url: "/about/office-staff", keywords: ["office staff", "admin staff", "administrative officer", "support staff"] },
  { type: "page", title: "Internal Complaint Committee (ICC)", description: "Confidential mechanism for sexual harassment complaints", url: "/about/icc", keywords: ["icc", "internal complaint", "sexual harassment", "posh"] },
  { type: "page", title: "Privacy Policy", description: "How we handle your personal information", url: "/privacy", keywords: ["privacy", "policy", "data", "cookies"] },
  { type: "page", title: "Terms of Use", description: "Terms and conditions for using this website", url: "/terms", keywords: ["terms", "conditions", "usage"] },
  { type: "page", title: "Sitemap", description: "Browse every page on this website", url: "/sitemap", keywords: ["sitemap", "all pages", "navigation"] },
  // Round-2 additions
  { type: "page", title: "Institutional Development Plan", description: "5-year institutional development roadmap", url: "/about/institutional-development-plan", keywords: ["idp", "institutional development", "plan", "roadmap"] },
  { type: "page", title: "HR Policy", description: "Human resources policy for KITS staff", url: "/about/hr-policy", keywords: ["hr", "human resources", "policy", "staff"] },
  { type: "page", title: "Accreditation & Ranking", description: "NAAC, AICTE, JNTUK, ISO, ISTE, IEI certificates", url: "/about/accreditation", keywords: ["accreditation", "ranking", "naac", "aicte", "iso", "iste", "iei", "certificates", "membership"] },
  { type: "page", title: "Code of Conduct — Students",        description: "Conduct, academic and disciplinary standards for students.",       url: "/about/code-of-conduct/students",       keywords: ["code of conduct", "students", "academic misconduct", "disciplinary"] },
  { type: "page", title: "Code of Conduct — Teachers",         description: "Professional and ethical standards for faculty.",                  url: "/about/code-of-conduct/teachers",        keywords: ["code of conduct", "teachers", "faculty", "ethics"] },
  { type: "page", title: "Code of Conduct — Administrators",   description: "Responsibilities for administrative leadership.",                  url: "/about/code-of-conduct/administrators",  keywords: ["code of conduct", "administrators", "admin", "leadership"] },
  { type: "page", title: "Code of Conduct — Employees",         description: "Conduct expectations for non-teaching employees.",                url: "/about/code-of-conduct/employees",       keywords: ["code of conduct", "employees", "staff", "non-teaching"] },
];

const departmentResults: SearchResult[] = DEPARTMENTS.map((d) => ({
  type: "department" as const,
  title: d.name,
  description: d.desc,
  url: `/departments/${d.slug}`,
  keywords: [d.code, d.slug, "department", "branch"],
}));

const eventResults: SearchResult[] = EVENTS.map((e) => ({
  type: "event" as const,
  title: e.title,
  description: e.excerpt,
  url: `/events/${e.slug}`,
  keywords: [e.category, e.slug],
}));

const infoResults: SearchResult[] = [
  {
    type: "info",
    title: "EAPCET Code: KCIT",
    description: "Use code KCIT during EAPCET counselling to choose KITS Markapur",
    url: "/admissions",
    keywords: ["eapcet", "code", "kcit", "counselling"],
  },
  {
    type: "info",
    title: "Apply Now — Admissions 2025-26",
    description: "Admissions open for B.Tech 2025-26 academic year",
    url: "/admissions",
    keywords: ["apply", "admission", "2025", "join"],
  },
  {
    type: "info",
    title: "AICTE Approved · JNTUK Affiliated · NAAC Accredited",
    description: "KITS Markapur is approved, affiliated and accredited by leading bodies",
    url: "/research",
    keywords: ["aicte", "jntuk", "naac", "accreditation"],
  },
];

export const SEARCH_INDEX: SearchResult[] = [
  ...pages,
  ...departmentResults,
  ...eventResults,
  ...infoResults,
];

export const searchAll = (query: string, limit = 10): SearchResult[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = SEARCH_INDEX.map((item) => {
    const haystack = [
      item.title,
      item.description,
      ...(item.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (item.title.toLowerCase().includes(token)) score += 5;
      if ((item.keywords ?? []).some((k) => k.toLowerCase().includes(token))) score += 3;
      if (haystack.includes(token)) score += 1;
    }
    return { item, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ item }) => item);
};
