import { Hero } from "@/components/site/Hero";
import { AboutSnapshot } from "@/components/site/AboutSnapshot";
import { BoardsSection } from "@/components/site/BoardsSection";
import { DepartmentsGrid } from "@/components/site/DepartmentsGrid";
import { WhyChoose } from "@/components/site/WhyChoose";
import { EventsAchievements } from "@/components/site/EventsAchievements";
import { PlacementPartners } from "@/components/site/PlacementPartners";
import { Testimonials } from "@/components/site/Testimonials";
import { Accreditations } from "@/components/site/Accreditations";
import { CTABand } from "@/components/site/CTABand";
import { SiteLayout } from "@/components/site/SiteLayout";

const Index = () => {
  return (
    <SiteLayout>
      <Hero />
      <AboutSnapshot />
      <BoardsSection />
      <DepartmentsGrid />
      <WhyChoose />
      <EventsAchievements />
      <PlacementPartners />
      <Testimonials />
      <Accreditations />
      <CTABand />
    </SiteLayout>
  );
};

export default Index;
