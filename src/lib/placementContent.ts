// Placement Cell content. Mostly STATIC.
// Sections marked DYNAMIC will move to admin (recruiters, yearly stats).

export interface YearlyStat {
  year: string;
  totalOffers: number;
  uniquePlacements: number;
  highestPackageLpa: number;
  avgPackageLpa: number;
  topRecruiters: string[];
}

export interface CompetitiveExam {
  name: string;
  for: string;
  description: string;
}

// =========================================================================
// PLACEMENT CELL OVERVIEW — STATIC
// =========================================================================
export const PLACEMENT_OVERVIEW = {
  intro:
    "The KITS Training & Placement Cell drives student career outcomes through year-round preparation, industry connect, mentorship, and recruiter relationships. From aptitude training in Year-2 to final placements in Year-4, every stage is structured.",
  objectives: [
    "Maximise placement opportunities for every eligible student.",
    "Build employability through aptitude, communication, and technical training.",
    "Connect students with industry mentors, alumni, and recruiters.",
    "Support students preparing for higher studies and competitive examinations.",
    "Track placement outcomes transparently year-on-year.",
  ],
  team: [
    { name: "Training & Placement Officer (TPO)", designation: "Head of Placement Cell", role: "Coordinator" },
    { name: "Faculty Coordinator — CSE",          designation: "Department Liaison",      role: "Member" },
    { name: "Faculty Coordinator — ECE",          designation: "Department Liaison",      role: "Member" },
    { name: "Faculty Coordinator — EEE",          designation: "Department Liaison",      role: "Member" },
    { name: "Faculty Coordinator — MECH",         designation: "Department Liaison",      role: "Member" },
    { name: "Faculty Coordinator — CIVIL",        designation: "Department Liaison",      role: "Member" },
    { name: "Industry Mentor",                    designation: "Alumni / External",       role: "Advisor" },
  ],
};

// =========================================================================
// YEARLY PLACEMENT STATS — DYNAMIC (admin updates each year)
// =========================================================================
export const YEARLY_STATS: YearlyStat[] = [
  { year: "2024-25", totalOffers: 580, uniquePlacements: 432, highestPackageLpa: 12.0, avgPackageLpa: 4.6, topRecruiters: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "HCL"] },
  { year: "2023-24", totalOffers: 520, uniquePlacements: 410, highestPackageLpa: 10.5, avgPackageLpa: 4.2, topRecruiters: ["TCS", "Infosys", "Capgemini", "Tech Mahindra", "L&T"] },
  { year: "2022-23", totalOffers: 460, uniquePlacements: 372, highestPackageLpa: 9.0,  avgPackageLpa: 3.9, topRecruiters: ["TCS", "Infosys", "Wipro", "HCL"] },
  { year: "2021-22", totalOffers: 410, uniquePlacements: 340, highestPackageLpa: 7.5,  avgPackageLpa: 3.6, topRecruiters: ["TCS", "Infosys", "Cognizant"] },
];

// =========================================================================
// YEAR-WISE PLACEMENT DETAIL PDFs — DYNAMIC (admin uploads each year)
// =========================================================================
export interface PlacementPdfEntry {
  year: string;
  fileName: string;
}

export const PLACEMENT_PDFS: PlacementPdfEntry[] = [
  { year: "2024-2025", fileName: "CONSOLIDATED-LIST-of-placements-2024-25.pdf" },
  { year: "2022-2023", fileName: "2022-2023-placement-details.pdf" },
  { year: "2021-2022", fileName: "2021-2022-placement-details.pdf" },
  { year: "2020-2021", fileName: "2020-2021-placement-details.pdf" },
  { year: "2019-2020", fileName: "2019-2020-placement-details.pdf" },
  { year: "2018-2019", fileName: "2018-2019-placement-details.pdf" },
  { year: "2017-2018", fileName: "2017-2018-PLACEMENT-TOTAL.pdf" },
  { year: "2016-2017", fileName: "2016-2017-PLACEMENT-TOTAL.pdf" },
  { year: "2015-2016", fileName: "2015-2016-PLACEMENT-TOTAL.pdf" },
];

export const PLACEMENT_GALLERY_PDF = "student-placement-photos.pdf";

// =========================================================================
// CAREER GUIDANCE — STATIC
// =========================================================================
export const CAREER_GUIDANCE = {
  intro:
    "Beyond placements, KITS prepares students for higher studies and government / public-sector careers through structured competitive-exam coaching, aptitude training, and personalised mentorship.",
  offerings: [
    "Aptitude & reasoning bootcamps (Year 2 onwards)",
    "GATE preparation series with mock tests",
    "Civil Services foundation course",
    "GRE / TOEFL / IELTS guidance for higher studies",
    "Bank PO, RRB, SSC and PSU recruitment training",
    "One-on-one career counselling with TPO",
  ],
};

export const COMPETITIVE_EXAMS: CompetitiveExam[] = [
  { name: "GATE",                  for: "M.Tech / PSUs",          description: "Graduate Aptitude Test in Engineering — gateway to M.Tech and PSU recruitment." },
  { name: "CAT / MAT / XAT",       for: "MBA",                    description: "Common entrance exams for MBA admissions in IIMs and other top business schools." },
  { name: "GRE / TOEFL / IELTS",   for: "Higher studies abroad",  description: "Standardised tests for graduate study admissions in the USA, UK, Canada, etc." },
  { name: "UPSC Civil Services",   for: "IAS / IPS / IFS",        description: "Civil services exam for top central government positions." },
  { name: "Bank PO / Clerk",       for: "Banking",                description: "IBPS, SBI PO, and clerk-level recruitment exams." },
  { name: "RRB / SSC",             for: "Govt. jobs",             description: "Railway Recruitment Board and Staff Selection Commission exams." },
  { name: "GRE & GATE Combo",      for: "Research / PhD",         description: "Pathway to Indian and international PhD programmes with funding." },
];

// =========================================================================
// CAPACITY DEVELOPMENT — STATIC
// =========================================================================
export const CAPACITY_DEVELOPMENT = {
  intro:
    "Capacity Development & Skill Enhancement Activities are integrated into our academic calendar to ensure students graduate with industry-ready skills.",
  buckets: [
    {
      title: "Aptitude & Reasoning",
      items: ["Quantitative aptitude bootcamps", "Verbal reasoning workshops", "Mock placement tests every semester"],
    },
    {
      title: "Communication & Soft Skills",
      items: ["Spoken English programmes", "Group discussion / personal interview training", "Resume writing workshops"],
    },
    {
      title: "Technical Skills",
      items: ["Industry-led certification courses", "Coding boot-camps (CSE / AI&ML)", "Lab project mentorship and capstone reviews"],
    },
    {
      title: "Personality & Leadership",
      items: ["Public speaking events", "Project management & teamwork sessions", "Mentor connect with alumni"],
    },
  ],
};

// =========================================================================
// SOFT SKILLS TRAINING — STATIC
// =========================================================================
export const SOFT_SKILLS = {
  intro:
    "Soft Skills Training at KITS is delivered as a structured programme spanning all four years, blending classroom sessions, role-plays, and live presentations.",
  modules: [
    "Spoken English & accent neutralisation",
    "Body language and non-verbal communication",
    "Writing skills — emails, reports, technical writing",
    "Group discussion strategies and panel etiquette",
    "Personal interview skills (HR + Technical)",
    "Time management and goal setting",
    "Leadership, negotiation and team dynamics",
    "Emotional intelligence and workplace ethics",
  ],
};

// =========================================================================
// CONTACT — STATIC
// =========================================================================
export const PLACEMENT_CONTACT = {
  tpoName: "Training & Placement Officer (TPO)",
  email: "tpo@kits-anna.com",
  phone: "+91-9153019999",
  address: "Training & Placement Cell, KITS Markapur — 523316",
  officeHours: "Mon–Sat, 10:00 AM – 5:00 PM",
};
