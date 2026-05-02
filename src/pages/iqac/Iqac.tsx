import { ShieldCheck, Users, FileText, Sparkles, Star, ScrollText, Compass, ClipboardCheck, FileSignature } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { LinkCardGrid, type LinkCard } from "@/components/site/LinkCardGrid";
import { IQAC_OVERVIEW } from "@/lib/qualityContent";
import { iqacSidebar } from "./IqacSidebar";

const cards: LinkCard[] = [
  { label: "About IQAC",                  description: "The role and objectives of the Internal Quality Assurance Cell.",  to: "/iqac/about",              icon: ShieldCheck },
  { label: "Committee",                    description: "IQAC chairperson, convener, and members.",                          to: "/iqac/committee",          icon: Users },
  { label: "Minutes of Meeting",           description: "Records of IQAC quarterly and annual meetings.",                    to: "/iqac/minutes",            icon: FileSignature },
  { label: "Quality Initiatives",          description: "Major quality-enhancement initiatives across the institution.",      to: "/iqac/quality-initiatives", icon: Sparkles },
  { label: "Best Practices",                description: "Two formally documented best practices at KITS.",                   to: "/iqac/best-practices",     icon: Star },
  { label: "Procedures & Policies",         description: "Quality processes, policies, and SOPs.",                            to: "/iqac/policies",           icon: ScrollText },
  { label: "Institutional Distinctiveness", description: "What sets KITS apart in our region.",                                to: "/iqac/distinctiveness",    icon: Compass },
  { label: "Student Satisfaction Survey",   description: "Student feedback survey and analysis.",                              to: "/iqac/sss",                icon: ClipboardCheck },
  { label: "AQAR Reports",                   description: "Year-wise Annual Quality Assurance Reports.",                       to: "/iqac/aqar",                icon: FileText },
];

const Iqac = () => (
  <InfoPage
    eyebrow="Quality"
    title="Internal Quality Assurance Cell"
    subtitle="Driving quality enhancement and sustenance through continuous monitoring, feedback, and benchmarking."
    breadcrumb={[{ label: "IQAC" }]}
    sidebar={iqacSidebar}
  >
    <p className="not-prose text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
      {IQAC_OVERVIEW.intro}
    </p>
    <div className="not-prose">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-5">Explore IQAC</h2>
      <LinkCardGrid cards={cards} />
    </div>
  </InfoPage>
);

export default Iqac;
