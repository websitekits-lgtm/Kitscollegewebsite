// Student Life content. Mostly STATIC.

export const STUDENT_LIFE_OVERVIEW = {
  intro:
    "Life at KITS goes well beyond classrooms — sports, NSS, hostel, clubs, and student welfare initiatives create a vibrant, balanced campus experience that develops the whole person.",
};

// =========================================================================
// SPORTS & GAMES — STATIC
// =========================================================================
export const SPORTS = {
  intro:
    "KITS encourages a healthy balance between academics and physical fitness through a well-equipped sports infrastructure and qualified physical education staff.",
  facilities: [
    "Cricket field with practice nets",
    "Volleyball, Basketball, and Throwball courts",
    "Outdoor athletic track",
    "Indoor courts: Badminton, Table Tennis, Carrom, Chess",
    "Yoga and meditation hall",
    "Gymnasium with cardio + strength equipment",
  ],
  activities: [
    "Annual Sports Meet — KITS Spandana",
    "Inter-departmental tournaments every semester",
    "Inter-collegiate participation through JNTUK Zone",
    "Yoga & wellness sessions for staff and students",
    "Coaching for selected athletes",
  ],
  director: {
    name: "Physical Director",
    designation: "Director of Physical Education",
    contact: "sports@kits-anna.com",
  },
};

// =========================================================================
// NSS — STATIC
// =========================================================================
export const NSS = {
  intro:
    "The National Service Scheme (NSS) at KITS gives students structured opportunities to serve the community while building leadership, empathy, and civic awareness.",
  motto: "NOT ME BUT YOU",
  activities: [
    "Blood donation camps and health awareness drives",
    "Tree-plantation and environmental clean-up campaigns",
    "Village adoption — literacy, hygiene, and digital awareness camps",
    "Disaster relief and Swachh Bharat campaigns",
    "Annual NSS special camp at adopted villages",
    "Awareness drives on AIDS, TB, women safety, road safety",
  ],
  programmeOfficer: {
    name: "NSS Programme Officer",
    designation: "Faculty Coordinator",
    contact: "nss@kits-anna.com",
  },
  units: [
    { name: "NSS Unit-I",  strength: 100, faculty: "Programme Officer 1" },
    { name: "NSS Unit-II", strength: 100, faculty: "Programme Officer 2" },
  ],
};

// =========================================================================
// HOSTEL — STATIC
// =========================================================================
export const HOSTEL = {
  intro:
    "Separate hostel facilities are available for boys and girls within the KITS campus — with proper food, security, and study environments.",
  features: [
    "24/7 security and CCTV monitoring",
    "Spacious double / triple occupancy rooms with attached bathrooms",
    "Hot & cold water supply, RO drinking water",
    "Hygienic mess with Andhra/North Indian/South Indian options",
    "High-speed Wi-Fi for academic use",
    "Reading and study halls open till 11 PM",
    "Indoor games and TV / news rooms",
    "Resident wardens (separate for boys and girls)",
    "Visitor protocol with parent-only entry policy",
  ],
  rules: [
    "Roll-call attendance every night.",
    "No leaving the hostel after 9 PM without warden approval.",
    "Strict prohibition on alcohol, smoking, and prohibited substances.",
    "Visitors allowed only in designated visitor area with prior intimation.",
    "Anti-ragging tolerance is zero — violations face disciplinary action.",
    "Mobile phones and electronic gadgets must be used responsibly.",
    "Clean room maintenance is each resident's responsibility.",
  ],
  fees: [
    { item: "Boarding & Lodging (per year)", amount: "₹ 60,000 – ₹ 70,000" },
    { item: "Caution Deposit (refundable)", amount: "₹ 5,000" },
  ],
};

// =========================================================================
// ANTI-RAGGING — STATIC
// =========================================================================
export const ANTI_RAGGING = {
  intro:
    "Krishna Chaitanya Institute of Technology & Sciences strictly enforces a ZERO TOLERANCE policy on ragging in any form. Any violation invites severe disciplinary action including suspension/expulsion and police FIR.",
  forms: [
    "Physical or verbal abuse, intimidation, or harassment.",
    "Forcing seniors' tasks, errands, or favors on juniors.",
    "Public humiliation, indecent gestures, or derogatory remarks.",
    "Any conduct that causes psychological or emotional harm.",
    "Online ragging or cyber-bullying through social platforms.",
  ],
  prevention: [
    "Mandatory anti-ragging affidavit signed at admission by every student and parent.",
    "Anti-ragging squads patrolling campus and hostels around the clock during the first 6 months.",
    "Senior-junior interaction monitored through faculty mentors.",
    "24/7 anti-ragging helpline.",
    "Awareness programmes and posters across campus.",
  ],
  helpline: {
    institutional: "+91-9153019999",
    nationalAntiRagging: "1800-180-5522",
    email: "antiragging@kits-anna.com",
    ugcPortal: "https://www.antiragging.in/",
  },
  committee: [
    { name: "Dr. K. Sridhar",  designation: "Principal",        role: "Chairperson" },
    { name: "Senior Faculty",  designation: "Faculty",          role: "Convener" },
    { name: "Faculty (Female)", designation: "Faculty",         role: "Member" },
    { name: "Hostel Warden",   designation: "Resident Warden",  role: "Member" },
    { name: "Student Rep",     designation: "Student Council",  role: "Member" },
    { name: "Parent Rep",      designation: "Parent Body",      role: "Member" },
  ],
};

// =========================================================================
// CANTEEN — STATIC
// =========================================================================
export const CANTEEN = {
  intro:
    "Our campus canteen provides hygienic, affordable meals and snacks throughout the day. The kitchen is monitored regularly for cleanliness and food safety.",
  highlights: [
    "Spacious dining hall accommodating 200+ students",
    "Daily breakfast, lunch, snacks and dinner menus",
    "Special menu options on weekends and festivals",
    "Vegetarian and non-vegetarian options",
    "Prepaid meal cards for fast service",
    "Tea/coffee corner and snacks counter",
  ],
  hours: [
    { meal: "Breakfast", time: "7:30 AM – 9:30 AM" },
    { meal: "Lunch",     time: "12:30 PM – 2:30 PM" },
    { meal: "Snacks",    time: "4:30 PM – 6:00 PM" },
    { meal: "Dinner",    time: "7:30 PM – 9:30 PM" },
  ],
};

// =========================================================================
// HEALTH FACILITIES — STATIC
// =========================================================================
export const HEALTH = {
  intro:
    "Student health and well-being is a core priority at KITS. Our on-campus dispensary and tie-ups with nearby hospitals ensure prompt care when needed.",
  facilities: [
    "On-campus dispensary with qualified medical officer",
    "First-aid kits in every hostel block and lab",
    "Tie-ups with Markapur and Ongole hospitals for emergencies",
    "Annual health check-ups for hostel residents",
    "Mental health counselling — confidential one-on-one sessions",
    "Health awareness sessions on hygiene, nutrition, and substance abuse",
  ],
  emergency: {
    medicalOfficer: "Resident Medical Officer",
    phone: "+91-9153019999",
    nearestHospital: "Markapur Government Hospital — 3 km from campus",
  },
};

// =========================================================================
// SEDG CELL (Socially & Economically Disadvantaged Group) — STATIC
// =========================================================================
export const SEDG = {
  intro:
    "The SEDG (Social & Economic Disadvantaged Group) Cell, also known as the Social Welfare Committee, ensures that students from SC, ST, OBC, EWS, and other disadvantaged backgrounds receive the academic, financial, and emotional support they need.",
  initiatives: [
    "Scholarship awareness camps and application support",
    "Bridge courses for first-generation engineering aspirants",
    "Peer-mentoring with senior students",
    "Special doubt-clearing sessions and remedial classes",
    "Confidential grievance redressal for caste/economic discrimination",
    "Counselling and emotional support",
  ],
  schemes: [
    "AP State Post-Matric Scholarship",
    "Central Government Scholarships (PM-YASASVI etc.)",
    "Minority scholarships",
    "Private foundation scholarships (Jindal, Aditya, NTPC etc.)",
    "KITS internal hardship fund (case-by-case)",
  ],
};
