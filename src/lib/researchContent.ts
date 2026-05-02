// R&D content. Mostly STATIC. Sections marked DYNAMIC will move to admin.

export interface CommitteeMember {
  name: string;
  designation: string;
  role: string;
}

export interface PatentEntry {
  id: string;
  title: string;
  inventor: string;
  filingNo: string;
  year: string;
  status: "Filed" | "Granted" | "Published";
}

export interface PublicationEntry {
  id: string;
  faculty: string;
  department: string;
  title: string;
  venue: string;        // Journal / Conference name
  year: string;
  type: "Journal" | "Conference" | "Book" | "Book Chapter";
}

export interface PhDSupervisor {
  name: string;
  designation: string;
  department: string;
  university: string;
  area: string;
}

export interface FdpAttendance {
  id: string;
  faculty: string;
  department: string;
  programme: string;     // FDP / Workshop / Conference / Refresher
  organiser: string;
  duration: string;
  year: string;
}

// =========================================================================
// R&D OVERVIEW — STATIC
// =========================================================================
export const RND_OVERVIEW = {
  intro:
    "The Research & Development cell at KITS Markapur drives an ecosystem where faculty and students innovate, publish, file patents, and build solutions that matter. From sponsored research and industry consultancy to startup incubation and IPR awareness, R&D is woven into every department.",
  focusAreas: [
    "Artificial Intelligence, Machine Learning & Data Science",
    "VLSI, Embedded Systems & IoT",
    "Renewable Energy & Smart Grids",
    "Structural & Smart-City Engineering",
    "Sustainable Manufacturing & Industry 4.0",
    "Computational Mathematics & Applied Sciences",
  ],
};

// =========================================================================
// RESEARCH COMMITTEE — STATIC (admin will manage member list)
// =========================================================================
export const RESEARCH_COMMITTEE: CommitteeMember[] = [
  { name: "Dr. K. Sridhar",        designation: "Principal",            role: "Chairperson" },
  { name: "Dean — R&D",            designation: "Dean of Research",     role: "Convener" },
  { name: "HoD — CSE",             designation: "Head of Department",   role: "Member" },
  { name: "HoD — ECE",             designation: "Head of Department",   role: "Member" },
  { name: "HoD — EEE",             designation: "Head of Department",   role: "Member" },
  { name: "HoD — MECH",            designation: "Head of Department",   role: "Member" },
  { name: "HoD — CIVIL",           designation: "Head of Department",   role: "Member" },
  { name: "HoD — H&S",             designation: "Head of Department",   role: "Member" },
  { name: "Industry Expert",       designation: "External Member",      role: "Industry Liaison" },
];

// =========================================================================
// RECENT R&D ACTIVITIES — DYNAMIC (admin)
// =========================================================================
export const RND_ACTIVITIES = [
  { date: "2025-04",  title: "FDP on Generative AI & LLMs",                   detail: "5-day faculty development programme attended by 42 faculty across CSE/AI&ML/ECE." },
  { date: "2025-03",  title: "Patent application filed — Pothole detection",   detail: "Real-time computer-vision system filed under Indian Patent Office." },
  { date: "2025-02",  title: "MoU signed with Bosch India",                    detail: "Joint Centre of Excellence in Embedded Systems & Industrial IoT." },
  { date: "2025-01",  title: "Sponsored research grant — DST",                 detail: "Smart agriculture sensor network project (₹18.5 lakh, 2 years)." },
  { date: "2024-11",  title: "International conference — IEEE INDICON",        detail: "6 papers presented by KITS faculty across CSE, ECE, EEE." },
];

// =========================================================================
// RESEARCH INCENTIVES — STATIC
// =========================================================================
export const RESEARCH_INCENTIVES = {
  intro:
    "KITS rewards faculty research output through a transparent incentive scheme. The aim is to encourage high-impact publications, patents, and externally-funded projects.",
  policy: [
    { item: "Q1 Journal publication (SCI/SCIE)",  reward: "₹ 25,000 per paper" },
    { item: "Q2/Q3 Journal (SCI/SCIE/ESCI)",       reward: "₹ 15,000 per paper" },
    { item: "Scopus indexed conference paper",     reward: "₹ 5,000 per paper" },
    { item: "Indian patent — filed",                reward: "₹ 5,000 per patent" },
    { item: "Indian patent — granted",              reward: "₹ 25,000 per patent" },
    { item: "Sponsored research project (≥ ₹5 L)", reward: "10% of grant + research seed support" },
    { item: "Book authored / edited (international publisher)", reward: "₹ 15,000 per book" },
  ],
  notes: [
    "Incentives are paid annually after verification of indexing and authorship.",
    "Eligible only for full-time KITS faculty; first or corresponding author preferred.",
  ],
};

// =========================================================================
// PATENTS — DYNAMIC (admin)
// =========================================================================
export const PATENTS: PatentEntry[] = [
  { id: "p1", title: "Pothole detection using edge AI",            inventor: "Dr. K. Sridhar et al.",     filingNo: "202541xxxxxx", year: "2025", status: "Filed" },
  { id: "p2", title: "Smart energy meter with IoT analytics",      inventor: "Faculty — EEE",             filingNo: "202441xxxxxx", year: "2024", status: "Published" },
  { id: "p3", title: "Wearable health monitor for elderly",        inventor: "Faculty — ECE",             filingNo: "202341xxxxxx", year: "2023", status: "Granted" },
];

// =========================================================================
// R&D POLICY — STATIC
// =========================================================================
export const RND_POLICY = {
  intro:
    "The KITS R&D Policy outlines the guiding principles for research integrity, IP ownership, faculty incentives, sponsored projects, and research dissemination.",
  pillars: [
    {
      title: "Research Integrity",
      detail: "Plagiarism checks (≤10%), proper attribution, and ethical review for human/animal studies.",
    },
    {
      title: "IP & Patents",
      detail: "70:30 split between inventor(s) and the institution for licensable IP.",
    },
    {
      title: "Sponsored Projects",
      detail: "Institutional facilitation including overhead support and procurement.",
    },
    {
      title: "Industry Collaboration",
      detail: "MoUs, consultancy projects, and joint Centres of Excellence with industry partners.",
    },
    {
      title: "Open Access",
      detail: "Encouragement to publish in open-access journals; institutional repository for theses.",
    },
    {
      title: "Mentorship",
      detail: "Senior researchers mentor early-career faculty through co-authorship and grant writing support.",
    },
  ],
};

// =========================================================================
// PUBLICATIONS — DYNAMIC (admin)
// =========================================================================
export const PUBLICATIONS: PublicationEntry[] = [
  { id: "pub1", faculty: "Faculty A", department: "CSE",   title: "Federated Learning for Edge Devices",    venue: "IEEE Trans. on Pattern Analysis", year: "2024", type: "Journal" },
  { id: "pub2", faculty: "Faculty B", department: "ECE",   title: "Low-Power VLSI Design for IoT Sensors",   venue: "IEEE INDICON",                      year: "2024", type: "Conference" },
  { id: "pub3", faculty: "Faculty C", department: "EEE",   title: "Smart Grid with Renewable Integration",  venue: "Springer Energy Reports",           year: "2023", type: "Journal" },
  { id: "pub4", faculty: "Faculty D", department: "MECH",  title: "Sustainable Manufacturing Practices",    venue: "Elsevier Procedia Manufacturing",   year: "2024", type: "Book Chapter" },
  { id: "pub5", faculty: "Faculty E", department: "CIVIL", title: "Structural Health Monitoring in Bridges", venue: "ASCE Bridge Engineering",          year: "2024", type: "Journal" },
  { id: "pub6", faculty: "Faculty F", department: "H&S",   title: "Applied Mathematics for Engineers",      venue: "PHI Learning",                       year: "2023", type: "Book" },
];

// =========================================================================
// INSTITUTION'S INNOVATION COUNCIL — STATIC
// =========================================================================
export const IIC = {
  intro:
    "The Institution's Innovation Council (IIC), set up under the Ministry of Education's Innovation Cell (MIC) and AICTE, fosters innovation, design thinking, IPR awareness, and entrepreneurship culture across our campus.",
  objectives: [
    "Conduct workshops, hackathons and innovation challenges for students.",
    "Encourage participation in national-level competitions like Smart India Hackathon.",
    "Provide IPR awareness sessions and patent filing support.",
    "Mentor student startups and pre-incubation activities.",
    "Recognise top-performing innovators and innovation mentors.",
  ],
  council: [
    { name: "Dr. K. Sridhar",   designation: "Principal",                role: "President" },
    { name: "Dean — R&D",       designation: "Faculty",                  role: "IIC Coordinator" },
    { name: "Faculty — CSE",    designation: "Innovation Activity Lead", role: "Convener" },
    { name: "Faculty — ECE",    designation: "IPR Awareness Lead",       role: "Member" },
    { name: "Faculty — H&S",    designation: "Entrepreneurship Lead",    role: "Member" },
    { name: "Industry Mentor",  designation: "External Expert",          role: "Mentor" },
  ],
};

// =========================================================================
// PHD SUPERVISORS — DYNAMIC (admin)
// =========================================================================
export const PHD_SUPERVISORS: PhDSupervisor[] = [
  { name: "Dr. (Faculty A)", designation: "Professor",  department: "CSE",   university: "JNTUK", area: "Machine Learning, Computer Vision" },
  { name: "Dr. (Faculty B)", designation: "Professor",  department: "ECE",   university: "JNTUK", area: "VLSI Design, Embedded Systems" },
  { name: "Dr. (Faculty C)", designation: "Professor",  department: "EEE",   university: "JNTUK", area: "Power Systems, Renewable Energy" },
  { name: "Dr. (Faculty D)", designation: "Professor",  department: "MECH",  university: "JNTUK", area: "Thermal & Manufacturing Engineering" },
  { name: "Dr. (Faculty E)", designation: "Professor",  department: "CIVIL", university: "JNTUK", area: "Structural Engineering" },
];

// =========================================================================
// FDPs / WORKSHOPS — DYNAMIC (admin)
// =========================================================================
export const FDP_ATTENDANCE: FdpAttendance[] = [
  { id: "fdp1", faculty: "Faculty A", department: "CSE",  programme: "FDP",      organiser: "AICTE-ATAL",        duration: "1 week",  year: "2024" },
  { id: "fdp2", faculty: "Faculty B", department: "ECE",  programme: "Workshop", organiser: "IIT Hyderabad",     duration: "3 days",  year: "2024" },
  { id: "fdp3", faculty: "Faculty C", department: "EEE",  programme: "Conference", organiser: "IEEE INDICON",    duration: "3 days",  year: "2024" },
  { id: "fdp4", faculty: "Faculty D", department: "MECH", programme: "Refresher", organiser: "UGC HRDC",         duration: "2 weeks", year: "2023" },
  { id: "fdp5", faculty: "Faculty E", department: "CIVIL", programme: "FDP",      organiser: "ATAL Academy",      duration: "1 week",  year: "2024" },
];

// =========================================================================
// EDC — STATIC
// =========================================================================
export const EDC = {
  intro:
    "The Entrepreneurship Development Cell (EDC) at KITS nurtures the entrepreneurial mindset of students through workshops, mentor connects, startup support, and exposure to industry-leading founders.",
  offerings: [
    "Idea-to-prototype workshops every semester",
    "Pitch deck and investor-readiness training",
    "Pre-incubation desk space and mentorship",
    "Connect with KITS alumni founders",
    "Participation in regional / national startup contests",
    "Guidance on Startup India recognition and patent filings",
  ],
  achievements: [
    "12+ student startups registered under Startup India",
    "5 alumni-led startups raised seed funding",
    "Won 'Best EDC' regional award (2023)",
  ],
};

// =========================================================================
// CONSULTANCY POLICY — STATIC
// =========================================================================
export const CONSULTANCY_POLICY = {
  intro:
    "KITS encourages faculty to undertake sponsored consultancy projects from industry, government and not-for-profit organisations. This builds applied-research capacity and provides practical context for students.",
  rules: [
    "All consultancy must be routed through the institution and recorded officially.",
    "Revenue split — 70% to the lead consultant / team, 20% to overheads, 10% to institutional development.",
    "Consultancy must not impede teaching duties; max 8 hours/week recommended.",
    "Use of institutional resources (labs, equipment) requires prior approval.",
    "Final reports submitted to the client must be reviewed by the R&D cell before despatch.",
  ],
};
