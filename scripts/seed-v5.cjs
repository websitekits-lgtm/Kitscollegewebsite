const { Client } = require("pg");
require("dotenv").config();

// ── data_table_rows seeds (mirror the current static site content) ──────────
const TABLES = {
  "fdp-attendance": [
    { faculty: "Faculty A", department: "CSE", programme: "FDP", organiser: "AICTE-ATAL", duration: "1 week", year: "2024" },
    { faculty: "Faculty B", department: "ECE", programme: "Workshop", organiser: "IIT Hyderabad", duration: "3 days", year: "2024" },
    { faculty: "Faculty C", department: "EEE", programme: "Conference", organiser: "IEEE INDICON", duration: "3 days", year: "2024" },
    { faculty: "Faculty D", department: "MECH", programme: "Refresher", organiser: "UGC HRDC", duration: "2 weeks", year: "2023" },
    { faculty: "Faculty E", department: "CIVIL", programme: "FDP", organiser: "ATAL Academy", duration: "1 week", year: "2024" },
  ],
  "faculty-publications": [
    { faculty: "Faculty A", department: "CSE", title: "Federated Learning for Edge Devices", venue: "IEEE Trans. on Pattern Analysis", year: "2024", type: "Journal" },
    { faculty: "Faculty B", department: "ECE", title: "Low-Power VLSI Design for IoT Sensors", venue: "IEEE INDICON", year: "2024", type: "Conference" },
    { faculty: "Faculty C", department: "EEE", title: "Smart Grid with Renewable Integration", venue: "Springer Energy Reports", year: "2023", type: "Journal" },
    { faculty: "Faculty D", department: "MECH", title: "Sustainable Manufacturing Practices", venue: "Elsevier Procedia Manufacturing", year: "2024", type: "Book Chapter" },
    { faculty: "Faculty E", department: "CIVIL", title: "Structural Health Monitoring in Bridges", venue: "ASCE Bridge Engineering", year: "2024", type: "Journal" },
    { faculty: "Faculty F", department: "H&S", title: "Applied Mathematics for Engineers", venue: "PHI Learning", year: "2023", type: "Book" },
  ],
  "rnd-activities": [
    { date: "2025-04", title: "FDP on Generative AI & LLMs", detail: "5-day faculty development programme attended by 42 faculty across CSE/AI&ML/ECE." },
    { date: "2025-03", title: "Patent application filed — Pothole detection", detail: "Real-time computer-vision system filed under Indian Patent Office." },
    { date: "2025-02", title: "MoU signed with Bosch India", detail: "Joint Centre of Excellence in Embedded Systems & Industrial IoT." },
    { date: "2025-01", title: "Sponsored research grant — DST", detail: "Smart agriculture sensor network project (₹18.5 lakh, 2 years)." },
    { date: "2024-11", title: "International conference — IEEE INDICON", detail: "6 papers presented by KITS faculty across CSE, ECE, EEE." },
  ],
  "phd-supervisors": [
    { name: "Dr. (Faculty A)", designation: "Professor", department: "CSE", university: "JNTUK", area: "Machine Learning, Computer Vision" },
    { name: "Dr. (Faculty B)", designation: "Professor", department: "ECE", university: "JNTUK", area: "VLSI Design, Embedded Systems" },
    { name: "Dr. (Faculty C)", designation: "Professor", department: "EEE", university: "JNTUK", area: "Power Systems, Renewable Energy" },
    { name: "Dr. (Faculty D)", designation: "Professor", department: "MECH", university: "JNTUK", area: "Thermal & Manufacturing Engineering" },
    { name: "Dr. (Faculty E)", designation: "Professor", department: "CIVIL", university: "JNTUK", area: "Structural Engineering" },
  ],
  "placement-stats": [
    { year: "2024-25", totalOffers: "580", uniquePlacements: "432", highestPackageLpa: "12.0", avgPackageLpa: "4.6", topRecruiters: "TCS, Infosys, Wipro, Accenture, Cognizant, HCL" },
    { year: "2023-24", totalOffers: "520", uniquePlacements: "410", highestPackageLpa: "10.5", avgPackageLpa: "4.2", topRecruiters: "TCS, Infosys, Capgemini, Tech Mahindra, L&T" },
    { year: "2022-23", totalOffers: "460", uniquePlacements: "372", highestPackageLpa: "9.0", avgPackageLpa: "3.9", topRecruiters: "TCS, Infosys, Wipro, HCL" },
    { year: "2021-22", totalOffers: "410", uniquePlacements: "340", highestPackageLpa: "7.5", avgPackageLpa: "3.6", topRecruiters: "TCS, Infosys, Cognizant" },
  ],
  "courses-intake": [
    { level: "UG", code: "CSE", name: "Computer Science & Engineering", duration: "4 Years", intake: "180", affiliation: "JNTUK / AICTE" },
    { level: "UG", code: "AI&ML", name: "Artificial Intelligence & Machine Learning", duration: "4 Years", intake: "120", affiliation: "JNTUK / AICTE" },
    { level: "UG", code: "ECE", name: "Electronics & Communication Engineering", duration: "4 Years", intake: "120", affiliation: "JNTUK / AICTE" },
    { level: "UG", code: "EEE", name: "Electrical & Electronics Engineering", duration: "4 Years", intake: "60", affiliation: "JNTUK / AICTE" },
    { level: "UG", code: "MECH", name: "Mechanical Engineering", duration: "4 Years", intake: "60", affiliation: "JNTUK / AICTE" },
    { level: "UG", code: "CIVIL", name: "Civil Engineering", duration: "4 Years", intake: "60", affiliation: "JNTUK / AICTE" },
    { level: "PG", code: "M.Tech-VLSI", name: "VLSI & Embedded Systems", duration: "2 Years", intake: "18", affiliation: "JNTUK / AICTE" },
    { level: "PG", code: "M.Tech-CSE", name: "Computer Science & Engineering", duration: "2 Years", intake: "18", affiliation: "JNTUK / AICTE" },
  ],
  "office-staff": [
    { name: "Administrative Officer", designation: "AO", department: "Administration", qualifications: "M.B.A, B.Com" },
    { name: "Office Superintendent", designation: "Superintendent", department: "Administration", qualifications: "M.Com" },
    { name: "Senior Office Assistant", designation: "Sr. Assistant", department: "Administration", qualifications: "B.Com" },
    { name: "Account Officer", designation: "Accounts", department: "Finance", qualifications: "M.Com, CA Inter" },
    { name: "Cashier", designation: "Cashier", department: "Finance", qualifications: "B.Com" },
    { name: "HR Executive", designation: "HR", department: "Human Resources", qualifications: "M.B.A (HR)" },
    { name: "System Administrator", designation: "System Admin", department: "IT", qualifications: "M.C.A" },
    { name: "Network Engineer", designation: "Network", department: "IT", qualifications: "B.Tech" },
    { name: "Examination Branch Assistant", designation: "Exam Cell Asst.", department: "Examination", qualifications: "M.Com" },
    { name: "Records & Documentation Officer", designation: "Records Officer", department: "Records", qualifications: "B.A" },
    { name: "Public Relations Officer", designation: "PRO", department: "Public Relations", qualifications: "M.B.A" },
    { name: "Office Attendant", designation: "Attendant", department: "Administration", qualifications: "Inter" },
  ],
  "syllabus-regulations": [
    { code: "R23", applicableTo: "B.Tech batch admitted from 2023-24 onwards", summary: "Outcome-based education with reduced credits, increased honours/minors, mandatory internships." },
    { code: "R20", applicableTo: "B.Tech batch admitted 2020-21 to 2022-23", summary: "OBE-aligned, focus on employability skills and project-based learning." },
    { code: "R19", applicableTo: "Earlier batches", summary: "Traditional credit-based system, archived for reference." },
    { code: "R20-PG", applicableTo: "M.Tech batch admitted 2020-21 onwards", summary: "Research-oriented PG curriculum with thesis component." },
  ],
};

// ── committee_members seeds ─────────────────────────────────────────────────
const COMMITTEES = {
  "research/committee": [
    ["Dr. K. Sridhar", "Principal", "Chairperson"],
    ["Dean — R&D", "Dean of Research", "Convener"],
    ["HoD — CSE", "Head of Department", "Member"],
    ["HoD — ECE", "Head of Department", "Member"],
    ["HoD — EEE", "Head of Department", "Member"],
    ["HoD — MECH", "Head of Department", "Member"],
    ["HoD — CIVIL", "Head of Department", "Member"],
    ["HoD — H&S", "Head of Department", "Member"],
  ],
  "iqac/committee": [
    ["Dr. K. Sridhar", "Principal", "Chairperson"],
    ["Dean — IQAC", "IQAC Coordinator", "Convener"],
    ["HoD — CSE", "Faculty Member", "Member"],
    ["HoD — ECE", "Faculty Member", "Member"],
    ["HoD — EEE", "Faculty Member", "Member"],
    ["HoD — MECH", "Faculty Member", "Member"],
    ["HoD — CIVIL", "Faculty Member", "Member"],
    ["Industry Expert", "External Member", "Industry Liaison"],
    ["Alumni Representative", "External Member", "Alumni Liaison"],
    ["Student Representative", "Student Council", "Student Voice"],
  ],
  "about/icc": [
    ["Senior Female Faculty", "Faculty Member", "Presiding Officer"],
    ["Female Faculty Member", "Faculty Member", "Member"],
    ["Female Faculty Member", "Faculty Member", "Member"],
    ["Non-Teaching Female Staff", "Office Staff", "Member"],
    ["External Member (NGO)", "External Expert", "External Member"],
    ["Female Student Rep", "Student", "Student Member"],
  ],
  "grievance-cell": [
    ["Dr. K. Sridhar", "Principal", "Chairperson"],
    ["Sr. Faculty Member", "Senior Faculty", "Convener"],
    ["Faculty Member (Female)", "Faculty", "Member"],
    ["Student Representative", "Student Council", "Member"],
    ["Parent Representative", "Parent Body", "Member"],
  ],
};

// ── page_texts seeds (contact pages) ────────────────────────────────────────
const TEXTS = [
  ["examination/contact", "controllerName", "Controller Name", "Dr. (Controller of Examinations)"],
  ["examination/contact", "designation", "Designation", "Controller of Examinations"],
  ["examination/contact", "email", "Email", "exams@kits-anna.com"],
  ["examination/contact", "phone", "Phone", "+91-9153019999"],
  ["examination/contact", "address", "Address", "Examination Cell, Krishna Chaitanya Institute of Technology & Sciences, Markapur — 523316"],
  ["examination/contact", "officeHours", "Office Hours", "Mon–Sat, 10:00 AM – 4:00 PM (closed on Sundays and university holidays)"],
  ["placements/contact", "tpoName", "TPO Name", "Training & Placement Officer (TPO)"],
  ["placements/contact", "email", "Email", "tpo@kits-anna.com"],
  ["placements/contact", "phone", "Phone", "+91-9153019999"],
  ["placements/contact", "address", "Address", "Training & Placement Cell, KITS Markapur — 523316"],
  ["placements/contact", "officeHours", "Office Hours", "Mon–Sat, 10:00 AM – 5:00 PM"],
];

(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();

  for (const [key, rows] of Object.entries(TABLES)) {
    await client.query("delete from public.data_table_rows where table_key = $1", [key]);
    for (let i = 0; i < rows.length; i++) {
      await client.query(
        "insert into public.data_table_rows (table_key, cells, sort_order) values ($1, $2, $3)",
        [key, JSON.stringify(rows[i]), i],
      );
    }
    console.log(`table ${key}: ${rows.length} rows`);
  }

  for (const [slug, members] of Object.entries(COMMITTEES)) {
    await client.query("delete from public.committee_members where page_slug = $1", [slug]);
    for (let i = 0; i < members.length; i++) {
      const [name, designation, role] = members[i];
      await client.query(
        "insert into public.committee_members (page_slug, name, designation, role_label, sort_order) values ($1,$2,$3,$4,$5)",
        [slug, name, designation, role, i],
      );
    }
    console.log(`committee ${slug}: ${members.length} members`);
  }

  for (let i = 0; i < TEXTS.length; i++) {
    const [slug, key, label, value] = TEXTS[i];
    await client.query(
      `insert into public.page_texts (page_slug, field_key, field_label, field_value, field_type, sort_order)
       values ($1,$2,$3,$4,'text',$5)
       on conflict (page_slug, field_key) do update set field_label = excluded.field_label, sort_order = excluded.sort_order`,
      [slug, key, label, value, i],
    );
  }
  console.log(`page_texts: ${TEXTS.length} contact fields`);

  await client.end();
  console.log("v5 seed complete.");
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
