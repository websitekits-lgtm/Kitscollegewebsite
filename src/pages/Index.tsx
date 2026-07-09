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
import { HomepagePopup } from "@/components/site/HomepagePopup";

const Index = () => {
  return (
    <SiteLayout>
      <HomepagePopup />
      <Hero />
      <AboutSnapshot />
      <BoardsSection />
      <DepartmentsGrid />
      <WhyChoose />
      <EventsAchievements />
      <PlacementPartners />
      <Accreditations />
      <CTABand />
      <Testimonials />
    </SiteLayout>
  );
};

export default Index;
