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
