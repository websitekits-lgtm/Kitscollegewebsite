// Information Corner, Feedback, Careers — misc pages.

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: "Teaching" | "Non-Teaching" | "Contractual";
  experience: string;
  postedAt: string;       // ISO date
  applyBy: string;        // ISO date
}

// =========================================================================
// RIGHT TO INFORMATION — STATIC
// =========================================================================
export const RTI_INFO = {
  intro:
    "KITS Markapur is committed to transparency in its operations. Citizens can file requests under the Right to Information Act, 2005 to seek information from the institution.",
  pio: {
    name: "Public Information Officer (PIO)",
    designation: "Administrative Officer",
    email: "rti@kits-anna.com",
    phone: "+91-9153019999",
  },
  appellate: {
    name: "Appellate Authority",
    designation: "Principal",
    email: "principal@kits-anna.com",
  },
  procedure: [
    "Submit a written application with the prescribed RTI fee (₹10) by post or in person.",
    "Mention your name, address, contact number, and a clear description of the information sought.",
    "Include any supporting documents necessary to identify the records.",
    "The PIO will respond within 30 days as per the RTI Act timelines.",
    "If unsatisfied with the response, you may file an appeal within 30 days to the Appellate Authority.",
  ],
  fees: [
    { item: "RTI application fee", amount: "₹ 10" },
    { item: "Photocopy per page (A4)", amount: "₹ 2" },
    { item: "CD/DVD media", amount: "₹ 50 per disc" },
  ],
};

// =========================================================================
// JOB OPENINGS / CAREERS — DYNAMIC (admin)
// =========================================================================
export const JOB_OPENINGS: JobOpening[] = [
  { id: "j1", title: "Assistant Professor — CSE",       department: "CSE",   type: "Teaching",     experience: "0-3 years (Ph.D / M.Tech with NET/SET preferred)", postedAt: "2025-04-12", applyBy: "2025-05-15" },
  { id: "j2", title: "Assistant Professor — AI & ML",   department: "AI/ML", type: "Teaching",     experience: "Ph.D / M.Tech with industry exposure",            postedAt: "2025-04-12", applyBy: "2025-05-15" },
  { id: "j3", title: "Assistant Professor — ECE",        department: "ECE",   type: "Teaching",     experience: "Ph.D / M.Tech in Electronics or VLSI",            postedAt: "2025-04-08", applyBy: "2025-05-10" },
  { id: "j4", title: "Lab Technician — Civil",            department: "CIVIL", type: "Non-Teaching", experience: "Diploma / B.Tech with 1+ years",                  postedAt: "2025-04-05", applyBy: "2025-05-05" },
  { id: "j5", title: "Office Assistant — Admin",          department: "Admin", type: "Non-Teaching", experience: "Graduate with computer literacy",                  postedAt: "2025-03-28", applyBy: "2025-04-30" },
];

export const CAREERS_PAGE = {
  intro:
    "KITS Markapur is always interested in welcoming talented faculty and staff who are passionate about education, innovation, and student success. We offer a collaborative environment with opportunities to grow.",
  whyJoin: [
    "Strong research and FDP support for faculty career growth.",
    "Modern infrastructure, well-equipped labs, and a supportive academic culture.",
    "Competitive salary structure as per AICTE / UGC norms.",
    "Performance-linked incentives, research publication rewards, and patent support.",
    "Faculty residence options and family-friendly benefits.",
  ],
  applicationProcess: [
    "Email your CV to careers@kits-anna.com with subject line 'Application — [Position]'.",
    "Include your detailed qualifications, teaching/industry experience, and publication list.",
    "Shortlisted candidates will be invited for a written test / demo lecture / interview.",
    "Final selection is based on academic credentials, demo performance, and interview.",
  ],
};

// =========================================================================
// TELEPHONE DIRECTORY — DYNAMIC (admin)
// =========================================================================
export interface DirectoryEntry {
  id: string;
  category: "Administration" | "Department" | "Office" | "Hostel" | "Other";
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export const TELEPHONE_DIRECTORY: DirectoryEntry[] = [
  { id: "d1",  category: "Administration", name: "Chairman",                designation: "Chairman",                phone: "+91-9153019999", email: "chairman@kits-anna.com" },
  { id: "d2",  category: "Administration", name: "Secretary & Correspondent", designation: "Secretary",              phone: "+91-9666301309", email: "secretary@kits-anna.com" },
  { id: "d3",  category: "Administration", name: "Principal",                designation: "Principal",               phone: "+91-9153019999", email: "principal@kits-anna.com" },
  { id: "d4",  category: "Administration", name: "Administrative Officer",   designation: "AO",                       phone: "+91-9153019999", email: "ao@kits-anna.com" },
  { id: "d5",  category: "Administration", name: "Controller of Examinations", designation: "CoE",                    phone: "+91-9153019999", email: "exams@kits-anna.com" },
  { id: "d6",  category: "Department",      name: "HoD — CSE",                 designation: "HoD",                     phone: "+91-9153019999", email: "hod.cse@kits-anna.com" },
  { id: "d7",  category: "Department",      name: "HoD — AI & ML",              designation: "HoD",                     phone: "+91-9153019999", email: "hod.aiml@kits-anna.com" },
  { id: "d8",  category: "Department",      name: "HoD — ECE",                  designation: "HoD",                     phone: "+91-9153019999", email: "hod.ece@kits-anna.com" },
  { id: "d9",  category: "Department",      name: "HoD — EEE",                  designation: "HoD",                     phone: "+91-9153019999", email: "hod.eee@kits-anna.com" },
  { id: "d10", category: "Department",      name: "HoD — MECH",                 designation: "HoD",                     phone: "+91-9153019999", email: "hod.mech@kits-anna.com" },
  { id: "d11", category: "Department",      name: "HoD — CIVIL",                designation: "HoD",                     phone: "+91-9153019999", email: "hod.civil@kits-anna.com" },
  { id: "d12", category: "Department",      name: "HoD — H&S",                  designation: "HoD",                     phone: "+91-9153019999", email: "hod.hs@kits-anna.com" },
  { id: "d13", category: "Office",          name: "Training & Placement Cell", designation: "TPO",                    phone: "+91-9153019999", email: "tpo@kits-anna.com" },
  { id: "d14", category: "Office",          name: "Library",                   designation: "Librarian",               phone: "+91-9153019999", email: "library@kits-anna.com" },
  { id: "d15", category: "Office",          name: "IQAC",                       designation: "IQAC Coordinator",         phone: "+91-9153019999", email: "iqac@kits-anna.com" },
  { id: "d16", category: "Hostel",           name: "Boys Hostel",                designation: "Warden",                   phone: "+91-9153019999", email: "boyshostel@kits-anna.com" },
  { id: "d17", category: "Hostel",           name: "Girls Hostel",               designation: "Warden",                   phone: "+91-9153019999", email: "girlshostel@kits-anna.com" },
];
