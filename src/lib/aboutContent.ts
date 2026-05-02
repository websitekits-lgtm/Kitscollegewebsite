// About / Administration / Alumni / Grievance content.
// All STATIC right now — admin will move dynamic items to API later.
// ADMIN: people profiles + governing-body table will become CRUD-managed.

export interface PersonProfile {
  name: string;
  designation: string;
  qualifications?: string;
  photo?: string;
  message?: string[];
  highlights?: string[];
}

export interface GoverningBodyMember {
  name: string;
  designation: string;
  category: string;
}

export const VISION_MISSION = {
  vision:
    "To emerge as a center of excellence in technical education, fostering innovation, ethical leadership, and lifelong learning, producing globally competent engineers who serve society.",
  mission: [
    "To impart quality technical education with strong ethical values and industry relevance.",
    "To create a stimulating learning environment with modern infrastructure, hands-on labs, and research opportunities.",
    "To cultivate professional skills, creativity, and entrepreneurial mindset through curricular and co-curricular engagement.",
    "To establish robust industry-academia partnerships for placements, internships, and applied research.",
    "To develop socially responsible engineers who contribute to community welfare and sustainable development.",
  ],
  coreValues: [
    "Excellence in education",
    "Integrity and ethical conduct",
    "Innovation and creativity",
    "Inclusivity and diversity",
    "Discipline and accountability",
    "Service to society",
  ],
};

export const ORG_CHART = {
  description:
    "KITS Markapur follows a transparent, well-defined organizational structure that ensures effective governance, academic excellence, and student well-being. The hierarchy connects the Governing Body at the apex to faculty, staff, and students through clearly defined responsibilities.",
  hierarchy: [
    { level: 1, role: "Governing Body" },
    { level: 2, role: "Chairman" },
    { level: 2, role: "Secretary & Correspondent" },
    { level: 3, role: "Principal" },
    { level: 4, role: "Vice Principal / Deans" },
    { level: 4, role: "Administrative Officer" },
    { level: 4, role: "Controller of Examinations" },
    { level: 5, role: "Heads of Departments (CSE, AI/ML, ECE, EEE, MECH, CIVIL, H&S)" },
    { level: 5, role: "Training & Placement Officer" },
    { level: 5, role: "Librarian" },
    { level: 5, role: "Physical Director" },
    { level: 6, role: "Faculty Members" },
    { level: 6, role: "Office & Support Staff" },
    { level: 7, role: "Students" },
  ],
};

export const COLLEGE_LOCATION = {
  address: {
    line1: "Krishna Chaitanya Institute of Technology & Sciences",
    line2: "Devarajugattu Village, Peddaaraveedu Mandal",
    line3: "Markapur — 523316",
    line4: "Prakasam District, Andhra Pradesh, INDIA",
  },
  mapsUrl: "https://maps.google.com/?q=Krishna+Chaitanya+Institute+of+Technology+Sciences+Markapur",
  // Embed URL for iframe
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15378.847058!2d79.27!3d15.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x963b54a8b22aae43!2sKrishna%20Chaitanya%20Institute%20of%20Technology%20%26%20Sciences!5e0!3m2!1sen!2sin!4v1700000000000",
  howToReach: [
    {
      mode: "By Road",
      detail:
        "Markapur is well-connected by APSRTC buses from Hyderabad, Vijayawada, Tirupati, Ongole, and Kurnool. The campus is ~3 km from Markapur bus stand.",
    },
    {
      mode: "By Train",
      detail:
        "Markapur Road railway station is the nearest stop on the Guntur–Hubli line. Auto-rickshaws and college transport are available.",
    },
    {
      mode: "By Air",
      detail:
        "Nearest airports: Vijayawada (~225 km) and Tirupati (~280 km). Onward travel by road or train.",
    },
  ],
};

export const CHAIRMAN: PersonProfile = {
  name: "Sri Anna Venkata Rambabu",
  designation: "Chairman",
  qualifications: "Visionary educationist & Entrepreneur",
  message: [
    "It gives me immense pleasure to welcome you to Krishna Chaitanya Institute of Technology & Sciences, Markapur. Founded in 2008, our institution has grown into a respected name in technical education in the Prakasam District.",
    "At KITS, we believe education is more than a degree — it is a foundation of values, skills, and confidence that shapes responsible engineers and global citizens. We are deeply committed to providing world-class infrastructure, an industry-aligned curriculum, and an environment that nurtures curiosity and innovation.",
    "Our success is measured not just by academic results or placements, but by the character and contribution of every student who walks out of our gates. I invite parents and aspirants to be part of this enriching journey.",
  ],
  highlights: [
    "Established KITS in 2008 with a vision to bring quality engineering education to rural Andhra Pradesh",
    "Drives strategic partnerships with industry leaders for placements and research",
    "Champions ethical leadership and value-based education",
    "Active mentor for first-generation engineering aspirants",
  ],
};

export const SECRETARY: PersonProfile = {
  name: "Smt. Anna Venkata Lakshmi Devi",
  designation: "Secretary & Correspondent",
  qualifications: "Educationist",
  message: [
    "As Secretary & Correspondent, I take pride in being part of an institution that has consistently held student welfare and academic excellence at its core.",
    "We believe a college is built not only by its buildings but by the relationships, opportunities, and moments of growth it offers each student. KITS is committed to providing safe, inclusive, and ambitious spaces for our students to thrive — academically, personally, and professionally.",
    "Our doors are always open to parents, alumni, and well-wishers who wish to engage with our journey of nurturing engineers of tomorrow.",
  ],
  highlights: [
    "Oversees student welfare, hostel facilities, and campus safety",
    "Drives initiatives for women empowerment and inclusivity on campus",
    "Coordinates parent-institution engagement programs",
    "Champions skill development and entrepreneurship initiatives",
  ],
};

export const PRINCIPAL: PersonProfile = {
  name: "Dr. K. Sridhar",
  designation: "Principal",
  qualifications: "Ph.D., M.Tech., B.Tech.",
  message: [
    "Welcome to KITS Markapur — an institution dedicated to academic excellence, holistic development, and producing industry-ready engineers.",
    "Under the able guidance of our management and the dedication of our faculty, we have built a vibrant academic ecosystem combining rigorous teaching, modern laboratories, research opportunities, and strong placement support. Our outcome-based curriculum is aligned with JNTUK and AICTE frameworks while remaining responsive to evolving industry needs.",
    "I encourage every student to make the most of these resources, to question, to explore, and to grow into a confident professional and a responsible citizen.",
  ],
  highlights: [
    "30+ years of experience in technical education and academic administration",
    "Active researcher with publications in international journals",
    "Drives outcome-based education (OBE) and accreditation efforts",
    "Mentors faculty in research, FDPs, and industry collaboration",
  ],
};

// ADMIN: this list will become DB-driven (add/remove members from dashboard)
export const GOVERNING_BODY: GoverningBodyMember[] = [
  { name: "Sri Anna Venkata Rambabu", designation: "Chairman", category: "Management" },
  { name: "Smt. Anna Venkata Lakshmi Devi", designation: "Secretary & Correspondent", category: "Management" },
  { name: "Dr. K. Sridhar", designation: "Principal", category: "Ex-officio Member" },
  { name: "Prof. (To be nominated)", designation: "JNTUK Nominee", category: "University Nominee" },
  { name: "Sri (To be nominated)", designation: "AICTE Nominee", category: "AICTE Nominee" },
  { name: "Sri (To be nominated)", designation: "State Govt. Nominee", category: "Government" },
  { name: "Sri (To be nominated)", designation: "Industrialist", category: "Industry Expert" },
  { name: "Dr. (To be nominated)", designation: "Educationist", category: "Educationist" },
  { name: "HoD — CSE", designation: "Faculty Member", category: "Faculty" },
  { name: "HoD — ECE", designation: "Faculty Member", category: "Faculty" },
  { name: "Administrative Officer", designation: "Member Secretary", category: "Administration" },
];

// Alumni page content
export const ALUMNI_PAGE = {
  intro:
    "The KITS Alumni Association connects our graduates with their alma mater and with each other — building a lifelong network of mentorship, opportunities, and shared memories. We invite all KITS alumni to register, reconnect, and contribute to the journey of future engineers.",
  features: [
    {
      title: "Lifelong Network",
      description: "Stay connected with classmates, faculty, and the institution that shaped your career.",
    },
    {
      title: "Mentorship Opportunities",
      description: "Guide current students through career talks, internship referrals, and project mentorship.",
    },
    {
      title: "Alumni Events",
      description: "Annual reunions, regional meets, and industry interaction sessions.",
    },
    {
      title: "Career Support",
      description: "Job openings, hiring referrals, and entrepreneurship support from fellow alumni.",
    },
  ],
};

// Grievance Cell content
export const GRIEVANCE_CELL = {
  objective:
    "To create a safe, respectful, and grievance-friendly college environment by encouraging open communication, resolving student issues fairly, and maintaining discipline and harmony among students and staff.",
  scope:
    "Handles written student grievances related to academic issues, financial matters, and general facilities/services like sanitation, food, and transport.",
  procedure: [
    "Submit a written grievance through the appropriate form below (parent / student / teaching staff / non-teaching staff / others).",
    "The Grievance Committee reviews each submission within 7 working days.",
    "If required, the committee meets the complainant and concerned parties in person.",
    "A documented resolution is communicated to the complainant in writing.",
    "All submissions are kept strictly confidential.",
  ],
  exclusions: [
    "Matters related to university policy decisions",
    "Decisions of academic and administrative bodies",
    "Admissions, examinations, and scholarships",
    "Disciplinary actions against students or staff",
  ],
  committee: [
    { name: "Dr. K. Sridhar", designation: "Principal", role: "Chairperson" },
    { name: "Sr. Faculty Member", designation: "Senior Faculty", role: "Convener" },
    { name: "Faculty Member (Female)", designation: "Faculty", role: "Member" },
    { name: "Student Representative", designation: "Student Council", role: "Member" },
    { name: "Parent Representative", designation: "Parent Body", role: "Member" },
  ],
};
