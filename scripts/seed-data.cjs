const { Client } = require("pg");
require("dotenv").config();

const NAV_TREE = [
  { label: "Home", url: "/" },
  {
    label: "About", dropdown_align: "left",
    groups: [
      { label: "About KITS", links: [
        ["Vision & Mission", "/about/vision-mission"],
        ["Organization Chart", "/about/organization-chart"],
        ["College Location", "/about/college-location"],
        ["Accreditation & Ranking", "/about/accreditation"],
        ["Institutional Development Plan", "/about/institutional-development-plan"],
        ["Code of Ethics", "/about/code-of-ethics"],
        ["Code of Conduct", "/about/code-of-conduct"],
        ["HR Policy", "/about/hr-policy"],
        ["Annual Report", "/about/annual-report"],
        ["Audit Report", "/about/audit-report"],
      ]},
      { label: "Administration", links: [
        ["Director", "/about/director"],
        ["Chairman", "/about/chairman"],
        ["Secretary & Correspondent", "/about/secretary"],
        ["Principal", "/about/principal"],
        ["Governing Body", "/about/governing-body"],
        ["Office Staff", "/about/office-staff"],
        ["Internal Complaint Committee", "/about/icc"],
      ]},
    ],
  },
  { label: "Academics", links: [
    ["Programs Overview", "/academics"],
    ["Departments", "/departments"],
    ["Syllabus & Regulations", "/academics/syllabus-regulations"],
    ["Academic Calendars", "/examination/academic-calendars"],
    ["Academic Collaborations", "/academics/collaborations"],
  ]},
  { label: "Admissions", links: [
    ["Courses & Intake", "/admissions/courses-intake"],
    ["Admission Procedure", "/admissions"],
    ["Fee Structure", "/admissions/fee-structure"],
    ["Fee Refund Policy", "/admissions/fee-refund-policy"],
    ["Reservation Roster", "/admissions/reservation-roster"],
    ["Brochure", "/admissions/brochure"],
  ]},
  { label: "Examination", links: [
    ["Examination Cell", "/examination"],
    ["External Exams Timetables", "/examination/external-timetables"],
    ["Internal Exams Timetables", "/examination/internal-timetables"],
    ["Academic Calendars", "/examination/academic-calendars"],
    ["Previous Question Papers", "/examination/question-papers"],
    ["Forms Download", "/examination/forms-download"],
    ["Contact Details", "/examination/contact"],
  ]},
  { label: "Placements", links: [
    ["About Placement Cell", "/placements"],
    ["Placement Details", "/placements/details"],
    ["Career Guidance", "/placements/career-guidance"],
    ["Capacity Development", "/placements/capacity-development"],
    ["Internship Details", "/placements/internships"],
    ["Our Recruiters", "/placements/recruiters"],
    ["Soft Skills Training", "/placements/soft-skills"],
    ["Contact", "/placements/contact"],
  ]},
  { label: "Research", dropdown_align: "right", links: [
    ["R&D Overview", "/research"],
    ["Research Committee", "/research/committee"],
    ["Recent Activities", "/research/activities"],
    ["Research Incentives", "/research/incentives"],
    ["Patents", "/research/patents"],
    ["R&D Policy", "/research/policy"],
    ["Faculty Publications", "/research/publications"],
    ["Innovation Council (IIC)", "/research/iic"],
    ["Ph.D Supervisors", "/research/phd-supervisors"],
    ["FDP / Workshops", "/research/fdp-attendance"],
    ["Entrepreneurship Cell", "/research/edc"],
    ["Consultancy Policy", "/research/consultancy-policy"],
  ]},
  { label: "Student Life", dropdown_align: "right", links: [
    ["Overview", "/student-life"],
    ["Sports & Games", "/student-life/sports"],
    ["NSS", "/student-life/nss"],
    ["Hostel", "/student-life/hostel"],
    ["Anti-Ragging", "/student-life/anti-ragging"],
    ["Canteen", "/student-life/canteen"],
    ["Health Facilities", "/student-life/health"],
    ["SEDG Cell", "/student-life/sedg"],
    ["Equal Opportunity Cell", "/student-life/equal-opportunity"],
    ["Barrier-Free Environment", "/student-life/barrier-free"],
    ["Grievance Redressal", "/grievance-cell"],
  ]},
  {
    label: "Statutory", dropdown_align: "right",
    groups: [
      { label: "Accreditation Bodies", links: [
        ["NAAC", "/naac"], ["NBA", "/statutory/nba"], ["IQAC", "/iqac"],
        ["AICTE Approvals", "/aicte"], ["UGC", "/statutory/ugc"],
        ["Mandatory Disclosure", "/mandatory-disclosure"],
      ]},
      { label: "Statutory Cells & Committees", links: [
        ["Grievance Cell", "/grievance-cell"],
        ["Anti-Ragging Cell", "/student-life/anti-ragging"],
        ["Internal Complaints Committee", "/about/icc"],
        ["SC/ST Cell", "/statutory/sc-st-cell"],
        ["Women Empowerment Cell", "/statutory/women-empowerment-cell"],
        ["OBC Cell", "/statutory/obc-cell"],
        ["Minority Cell", "/statutory/minority-cell"],
        ["Right to Information", "/info/rti"],
      ]},
    ],
  },
];

const TESTIMONIALS = [
  ["alumni", "KITS gave me the technical foundation and the confidence to crack a top MNC. The faculty genuinely care about your growth — not just grades.", "Sai Krishna Reddy", "B.Tech CSE '24 · Software Engineer, Infosys", "SK"],
  ["alumni", "The robotics lab and project culture here gave me hands-on experience long before I entered the industry. I joined Bosch within a month of graduation.", "Anjali Rao", "B.Tech ECE '23 · Embedded Engineer, Bosch", "AR"],
  ["alumni", "I cleared GATE on my first attempt thanks to the rigorous academic environment at KITS. The faculty pushed us to think deeper, not just pass exams.", "Venkata Suresh", "B.Tech EEE '22 · M.Tech, IIT Hyderabad", "VS"],
  ["alumni", "KITS campus life — NSS, sports, tech fests — shaped my personality as much as my degree did. I come back every year to mentor juniors.", "Priya Nanduri", "B.Tech AIML '24 · Data Analyst, TCS", "PN"],
  ["alumni", "The placement cell worked tirelessly for us. Mock interviews, aptitude sessions, resume reviews — nothing was left to chance.", "Ravi Teja Boyina", "B.Tech Mechanical '22 · Design Engineer, L&T", "RT"],
  ["alumni", "From a small town to a multinational company — KITS was the bridge. The exposure to industry projects in my final year made all the difference.", "Mounika Yellu", "B.Tech Civil '23 · Site Engineer, NCC Ltd.", "MY"],
  ["parents", "As a parent, I wanted a campus that was safe, disciplined, and ambitious. KITS delivered on every count. My daughter blossomed here.", "Smt. Lakshmi Devi", "Parent of B.Tech ECE '23 graduate", "LD"],
  ["parents", "The faculty regularly updated us on our son's progress. I never felt out of the loop. He is now placed at Wipro — a dream come true.", "Sri Narasimha Rao", "Parent of B.Tech CSE '24 graduate", "NR"],
  ["parents", "The hostel facilities are clean and secure. The warden was responsive whenever I called. I could focus on work knowing my child was in safe hands.", "Smt. Padma Kumari", "Parent of B.Tech AIML '24 student", "PK"],
  ["parents", "We are from a rural background and had concerns about quality education. KITS exceeded every expectation. My son cleared campus interviews in his 7th semester.", "Sri Venkateswara Prasad", "Parent of B.Tech Mechanical '23 graduate", "VP"],
  ["parents", "The scholarship guidance from the accounts office saved us lakhs in fees. The staff were patient and thorough throughout the process.", "Smt. Savithri Devi", "Parent of B.Tech Civil '22 graduate", "SD"],
  ["recruiters", "KITS students consistently stand out in our campus drives — technically sound, good communicators, and eager to learn. We recruit here every year.", "Rajesh Gupta", "HR Manager, Infosys Technologies", "RG"],
  ["recruiters", "The quality of final-year projects from KITS ECE students impressed our technical panel. We onboarded 12 students last year and they've all performed well.", "Meghana Srinivas", "Talent Acquisition Lead, Bosch India", "MS"],
  ["recruiters", "We look for problem solvers. KITS graduates come with a project mindset, not just a degree. That matters enormously in the real world.", "Anil Varma", "Campus Recruitment Head, TCS", "AV"],
  ["recruiters", "The placement cell is extremely professional — pre-screening is thorough, scheduling is smooth, and the students arrive well-prepared. A pleasure to partner with.", "Deepika Mohan", "HR Business Partner, Wipro", "DM"],
  ["recruiters", "KITS has one of the best civil and mechanical programmes in the region. The students we hired have grown into team leads within two years.", "Suresh Babu", "GM — HR, L&T Construction", "SB"],
];

const ANTI_RAGGING_COMMITTEE = [
  ["Dr. K. Sridhar", "Principal", "Chairperson"],
  ["Senior Faculty", "Faculty", "Convener"],
  ["Faculty (Female)", "Faculty", "Member"],
  ["Hostel Warden", "Resident Warden", "Member"],
  ["Student Rep", "Student Council", "Member"],
  ["Parent Rep", "Parent Body", "Member"],
];

const GOVERNING_BODY = [
  ["Sri Anna Venkata Rambabu", "Chairman", "Management"],
  ["Smt. Anna Venkata Lakshmi Devi", "Secretary & Correspondent", "Management"],
  ["Dr. K. Sridhar", "Principal", "Ex-officio Member"],
  ["Prof. (To be nominated)", "JNTUK Nominee", "University Nominee"],
  ["Sri (To be nominated)", "AICTE Nominee", "AICTE Nominee"],
  ["Sri (To be nominated)", "State Govt. Nominee", "Government"],
  ["Sri (To be nominated)", "Industrialist", "Industry Expert"],
  ["Dr. (To be nominated)", "Educationist", "Educationist"],
  ["HoD — CSE", "Faculty Member", "Faculty"],
  ["HoD — ECE", "Faculty Member", "Faculty"],
  ["Administrative Officer", "Member Secretary", "Administration"],
];

const PAGE_TEXTS = [
  ["student-life/anti-ragging", "intro", "Intro Paragraph", "Krishna Chaitanya Institute of Technology & Sciences strictly enforces a ZERO TOLERANCE policy on ragging in any form. Any violation invites severe disciplinary action including suspension/expulsion and police FIR.", "richtext"],
  ["student-life/anti-ragging", "helpline_institutional", "Institutional Helpline Number", "+91-9153019999", "text"],
  ["student-life/anti-ragging", "helpline_national", "National Anti-Ragging Helpline", "1800-180-5522", "text"],
  ["student-life/anti-ragging", "helpline_email", "Helpline Email", "antiragging@kits-anna.com", "text"],
  ["student-life/anti-ragging", "helpline_ugc_portal", "UGC Anti-Ragging Portal URL", "https://www.antiragging.in/", "url"],
];

(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();

  // Wipe existing (idempotent reseed)
  await client.query("delete from public.nav_items");
  await client.query("delete from public.testimonials");
  await client.query("delete from public.committee_members");
  await client.query("delete from public.page_texts");

  // ── Nav tree ──
  let topOrder = 0;
  for (const top of NAV_TREE) {
    const topRes = await client.query(
      `insert into public.nav_items (label, url, kind, dropdown_align, sort_order) values ($1,$2,'top',$3,$4) returning id`,
      [top.label, top.url ?? null, top.dropdown_align ?? null, topOrder++],
    );
    const topId = topRes.rows[0].id;

    if (top.groups) {
      let groupOrder = 0;
      for (const group of top.groups) {
        const groupRes = await client.query(
          `insert into public.nav_items (parent_id, label, url, kind, sort_order) values ($1,$2,null,'group',$3) returning id`,
          [topId, group.label, groupOrder++],
        );
        const groupId = groupRes.rows[0].id;
        let linkOrder = 0;
        for (const [label, url] of group.links) {
          await client.query(
            `insert into public.nav_items (parent_id, label, url, kind, sort_order) values ($1,$2,$3,'link',$4)`,
            [groupId, label, url, linkOrder++],
          );
        }
      }
    } else if (top.links) {
      let linkOrder = 0;
      for (const [label, url] of top.links) {
        await client.query(
          `insert into public.nav_items (parent_id, label, url, kind, sort_order) values ($1,$2,$3,'link',$4)`,
          [topId, label, url, linkOrder++],
        );
      }
    }
  }
  console.log(`Seeded nav tree: ${NAV_TREE.length} top-level items.`);

  // ── Testimonials ──
  let tOrder = 0;
  for (const [category, quote, name, role, initials] of TESTIMONIALS) {
    await client.query(
      `insert into public.testimonials (category, quote, name, role, initials, sort_order) values ($1,$2,$3,$4,$5,$6)`,
      [category, quote, name, role, initials, tOrder++],
    );
  }
  console.log(`Seeded ${TESTIMONIALS.length} testimonials.`);

  // ── Committee members ──
  let arOrder = 0;
  for (const [name, designation, role] of ANTI_RAGGING_COMMITTEE) {
    await client.query(
      `insert into public.committee_members (page_slug, name, designation, role_label, sort_order) values ('student-life/anti-ragging',$1,$2,$3,$4)`,
      [name, designation, role, arOrder++],
    );
  }
  let gbOrder = 0;
  for (const [name, designation, category] of GOVERNING_BODY) {
    await client.query(
      `insert into public.committee_members (page_slug, name, designation, role_label, sort_order) values ('about/governing-body',$1,$2,$3,$4)`,
      [name, designation, category, gbOrder++],
    );
  }
  console.log(`Seeded ${ANTI_RAGGING_COMMITTEE.length} anti-ragging + ${GOVERNING_BODY.length} governing body committee members.`);

  // ── Page texts ──
  let ptOrder = 0;
  for (const [slug, key, label, value, type] of PAGE_TEXTS) {
    await client.query(
      `insert into public.page_texts (page_slug, field_key, field_label, field_value, field_type, sort_order) values ($1,$2,$3,$4,$5,$6)`,
      [slug, key, label, value, type, ptOrder++],
    );
  }
  console.log(`Seeded ${PAGE_TEXTS.length} page text fields.`);

  await client.end();
  console.log("Seed complete.");
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
