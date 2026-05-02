import { Trophy, Heart, Home, ShieldAlert, Coffee, Stethoscope, Users, Accessibility, Building2, MessageCircle } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { STUDENT_LIFE_OVERVIEW } from "@/lib/studentLifeContent";
import { studentLifeSidebar } from "./studentlife/StudentLifeSidebar";

const cards: LinkCard[] = [
  { label: "Sports & Games",          description: "Sports facilities, gym, yoga, and inter-college tournaments.", to: "/student-life/sports",          icon: Trophy },
  { label: "NSS",                      description: "National Service Scheme — community service and outreach.",     to: "/student-life/nss",             icon: Heart },
  { label: "Hostel",                   description: "On-campus hostels for boys and girls with mess and security.",  to: "/student-life/hostel",          icon: Home },
  { label: "Anti-Ragging",             description: "Zero-tolerance policy and anti-ragging support.",                to: "/student-life/anti-ragging",    icon: ShieldAlert },
  { label: "Canteen",                  description: "Hygienic, affordable meals throughout the day.",                  to: "/student-life/canteen",         icon: Coffee },
  { label: "Health Facilities",        description: "On-campus dispensary and tie-ups with hospitals.",                to: "/student-life/health",          icon: Stethoscope },
  { label: "SEDG Cell",                 description: "Support for socially & economically disadvantaged students.",     to: "/student-life/sedg",            icon: Users },
  { label: "Equal Opportunity Cell",    description: "Promoting equity, fairness, and equal opportunity for all.",      to: "/student-life/equal-opportunity", icon: Accessibility, isPdf: true },
  { label: "Barrier-Free Environment",  description: "Universal accessibility for differently-abled students.",         to: "/student-life/barrier-free",    icon: Building2, isPdf: true },
  { label: "Grievance Redressal",       description: "Submit a grievance to the dedicated cell.",                       to: "/grievance-cell",                icon: MessageCircle },
];

const StudentLife = () => (
  <InfoPage
    eyebrow="Beyond Classroom"
    title="Student Life at KITS"
    subtitle="Sports, NSS, hostel, clubs, and student welfare initiatives — a vibrant campus that nurtures the whole person."
    breadcrumb={[{ label: "Student Life" }]}
    sidebar={studentLifeSidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
      {STUDENT_LIFE_OVERVIEW.intro}
    </p>
    <div className="not-prose">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Explore</h2>
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default StudentLife;
