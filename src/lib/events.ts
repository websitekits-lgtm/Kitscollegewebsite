// Centralized events & achievements data.
// Future: replace this with API/admin-fetched data.

import campusGraduation from "@/assets/campus-graduation.jpg";
import campusLab from "@/assets/campus-lab.jpg";
import campusLibrary from "@/assets/campus-library.jpg";
import deptAiml from "@/assets/dept-aiml.jpg";
import deptCse from "@/assets/dept-cse.jpg";
import deptEce from "@/assets/dept-ece.jpg";

export interface EventItem {
  slug: string;
  title: string;
  date: string;          // ISO date YYYY-MM-DD
  category: string;      // e.g. "Achievement", "Event", "Workshop"
  excerpt: string;       // Short info shown on the card
  image: string;
  body: string[];        // Full content paragraphs (used on the detail page)
}

export const EVENTS: EventItem[] = [
  {
    slug: "smart-india-hackathon-2025",
    title: "KITS team wins state round of Smart India Hackathon 2025",
    date: "2025-04-12",
    category: "Achievement",
    excerpt:
      "Our final-year CSE & AI/ML students bagged the top prize at the regional Smart India Hackathon, qualifying for the national grand finale.",
    image: deptAiml,
    body: [
      "A six-member team from KITS Markapur — comprising students from CSE and AI/ML departments — secured the first position at the state-level round of the Smart India Hackathon 2025, held at JNTU Kakinada.",
      "The team built a real-time pothole detection system using computer vision and edge AI, designed to assist municipal corporations with road maintenance. Their solution stood out for its low-cost hardware and offline-first design.",
      "With this win, the team now advances to the national grand finale to be held in New Delhi later this year, where they will compete against teams from across India for the central government innovation award.",
    ],
  },
  {
    slug: "robotics-championship-2025",
    title: "Mechatronics Club secures runner-up at National Robotics Championship",
    date: "2025-03-28",
    category: "Achievement",
    excerpt:
      "The KITS Mechatronics Club's autonomous robot finished second in the line-following + obstacle navigation category at NRC 2025.",
    image: deptEce,
    body: [
      "Our Mechatronics Club's robot 'KAIROS' clinched the runner-up trophy at the National Robotics Championship 2025 hosted by IIT Madras.",
      "The eight-member team designed an autonomous robot capable of dynamic obstacle navigation, line-following on uneven terrain, and real-time decision making powered by a custom-trained convolutional neural network.",
      "The competition saw participation from over 220 teams nationwide, making this one of the most competitive editions of NRC. The team will now represent India at the Asia-Pacific Robotics Open in Singapore.",
    ],
  },
  {
    slug: "tcs-campus-drive-success",
    title: "Record placements: 132 offers in TCS NQT campus drive",
    date: "2025-03-15",
    category: "Placements",
    excerpt:
      "TCS conducted on-campus interviews and selected 132 students across CSE, ECE, and AI/ML — a record for the institution.",
    image: campusGraduation,
    body: [
      "Tata Consultancy Services conducted on-campus recruitment for the 2025 graduating batch, resulting in 132 students receiving offer letters across CSE, ECE, and AI/ML branches.",
      "Roles offered include Digital Specialist Engineer, Systems Engineer, and Ninja Trainee positions with packages ranging from ₹3.6 LPA to ₹9 LPA.",
      "This is the highest-ever number of offers from a single recruiter at KITS Markapur and reflects the strength of our placement training, mentorship and industry-aligned curriculum.",
    ],
  },
  {
    slug: "ai-workshop-2025",
    title: "5-day Faculty Development Programme on Generative AI concluded",
    date: "2025-03-05",
    category: "Workshop",
    excerpt:
      "Faculty from across departments completed an intensive workshop on Generative AI, LLMs, and prompt engineering led by industry experts.",
    image: deptCse,
    body: [
      "KITS Markapur hosted a five-day Faculty Development Programme (FDP) on Generative AI and Large Language Models, conducted in association with industry trainers from leading AI research labs.",
      "Forty-two faculty members from CSE, AI/ML, ECE, and Humanities & Sciences departments participated. Topics covered included transformer architectures, prompt engineering, LLM evaluation, fine-tuning, and responsible AI deployment.",
      "Hands-on sessions with open-source models and live coding labs ensured that faculty can now integrate practical generative-AI content into their classroom teaching from the next academic semester.",
    ],
  },
  {
    slug: "annual-cultural-fest-2025",
    title: "KITS Spandana 2025 — annual cultural fest concludes with record turnout",
    date: "2025-02-22",
    category: "Event",
    excerpt:
      "Three days of music, dance, drama and tech expos drew over 4,000 visitors from neighbouring colleges and the local community.",
    image: campusLibrary,
    body: [
      "KITS Spandana 2025, the annual cultural fest, was held over three vibrant days on the Markapur campus and drew a record turnout of over 4,000 students and guests.",
      "The event featured 28 cultural competitions, a tech expo with 14 student-built projects, an inter-college dance championship, and a closing-night concert by an emerging Telugu indie band.",
      "Department-wise stalls, food courts, gaming arenas and a literary corner ensured something for everyone. The chief guest, an alumnus and industry leader, lauded the spirit of the institution and its students.",
    ],
  },
  {
    slug: "industry-mou-bosch-2025",
    title: "MoU signed with Bosch India for industry-academia partnership",
    date: "2025-02-08",
    category: "Partnership",
    excerpt:
      "KITS signs Memorandum of Understanding with Bosch India to set up a joint Centre of Excellence for embedded systems and IoT research.",
    image: campusLab,
    body: [
      "Krishna Chaitanya Institute of Technology & Sciences signed a Memorandum of Understanding with Bosch India for a joint Centre of Excellence in Embedded Systems and Industrial IoT.",
      "The partnership includes industry-led elective courses for ECE and EEE students, internship pipelines, faculty exchange programmes, and access to Bosch's advanced testing labs for student capstone projects.",
      "The Centre of Excellence will be housed in our newly-renovated ECE block and is expected to be operational from the start of the next academic year, benefitting roughly 220 students annually.",
    ],
  },
];

export const formatEventDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
