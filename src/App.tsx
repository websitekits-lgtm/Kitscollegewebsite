import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Academics from "./pages/Academics.tsx";
import Departments from "./pages/Departments.tsx";
import DepartmentDetail from "./pages/DepartmentDetail.tsx";
import Admissions from "./pages/Admissions.tsx";
import Placements from "./pages/Placements.tsx";
import CampusLife from "./pages/CampusLife.tsx";
import Gallery from "./pages/Gallery.tsx";
import StudentCorner from "./pages/StudentCorner.tsx";
import Research from "./pages/Research.tsx";
import Contact from "./pages/Contact.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import VisionMission from "./pages/VisionMission.tsx";
import OrganizationChart from "./pages/OrganizationChart.tsx";
import CollegeLocation from "./pages/CollegeLocation.tsx";
import Chairman from "./pages/Chairman.tsx";
import Secretary from "./pages/Secretary.tsx";
import Principal from "./pages/Principal.tsx";
import GoverningBody from "./pages/GoverningBody.tsx";
import CodeOfEthics from "./pages/CodeOfEthics.tsx";
import CodeOfConduct from "./pages/CodeOfConduct.tsx";
import AnnualReport from "./pages/AnnualReport.tsx";
import AuditReport from "./pages/AuditReport.tsx";
import Alumni from "./pages/Alumni.tsx";
import GrievanceCell from "./pages/GrievanceCell.tsx";
import Examination from "./pages/Examination.tsx";
import ExternalExamsTimetables from "./pages/ExternalExamsTimetables.tsx";
import InternalExamsTimetables from "./pages/InternalExamsTimetables.tsx";
import AcademicCalendars from "./pages/AcademicCalendars.tsx";
import QuestionPapers from "./pages/QuestionPapers.tsx";
import FormsDownload from "./pages/FormsDownload.tsx";
import ExamContact from "./pages/ExamContact.tsx";
import SyllabusRegulations from "./pages/SyllabusRegulations.tsx";
import AcademicCollaborations from "./pages/AcademicCollaborations.tsx";
import CoursesIntake from "./pages/CoursesIntake.tsx";
import FeeStructure from "./pages/FeeStructure.tsx";
import FeeRefundPolicy from "./pages/FeeRefundPolicy.tsx";
import ReservationRoster from "./pages/ReservationRoster.tsx";
import Brochure from "./pages/Brochure.tsx";

// R&D pages
import ResearchCommittee from "./pages/research/ResearchCommittee.tsx";
import ResearchActivities from "./pages/research/ResearchActivities.tsx";
import ResearchIncentives from "./pages/research/ResearchIncentives.tsx";
import Patents from "./pages/research/Patents.tsx";
import RndPolicy from "./pages/research/RndPolicy.tsx";
import Publications from "./pages/research/Publications.tsx";
import IIC from "./pages/research/IIC.tsx";
import PhdSupervisors from "./pages/research/PhdSupervisors.tsx";
import FdpAttendance from "./pages/research/FdpAttendance.tsx";
import EDC from "./pages/research/EDC.tsx";
import ConsultancyPolicy from "./pages/research/ConsultancyPolicy.tsx";

// Placement pages
import PlacementDetails from "./pages/placement/PlacementDetails.tsx";
import CareerGuidance from "./pages/placement/CareerGuidance.tsx";
import CapacityDevelopment from "./pages/placement/CapacityDevelopment.tsx";
import InternshipDetails from "./pages/placement/InternshipDetails.tsx";
import Recruiters from "./pages/placement/Recruiters.tsx";
import SoftSkills from "./pages/placement/SoftSkills.tsx";
import PlacementContact from "./pages/placement/PlacementContact.tsx";

// Student Life pages
import StudentLife from "./pages/StudentLife.tsx";
import Sports from "./pages/studentlife/Sports.tsx";
import NSS from "./pages/studentlife/NSS.tsx";
import Hostel from "./pages/studentlife/Hostel.tsx";
import AntiRagging from "./pages/studentlife/AntiRagging.tsx";
import Canteen from "./pages/studentlife/Canteen.tsx";
import Health from "./pages/studentlife/Health.tsx";
import SEDG from "./pages/studentlife/SEDG.tsx";
import EqualOpportunity from "./pages/studentlife/EqualOpportunity.tsx";
import BarrierFree from "./pages/studentlife/BarrierFree.tsx";

// Phase 4 — Library
import Library from "./pages/library/Library.tsx";
import AboutLibrary from "./pages/library/AboutLibrary.tsx";
import DigitalLibrary from "./pages/library/DigitalLibrary.tsx";
import LibraryResources from "./pages/library/LibraryResources.tsx";
import LibraryStaff from "./pages/library/LibraryStaff.tsx";
import LibraryGallery from "./pages/library/LibraryGallery.tsx";

// Phase 4 — NAAC
import Naac from "./pages/naac/Naac.tsx";
import NaacCriteriaPage from "./pages/naac/NaacCriteriaPage.tsx";
import Ssr from "./pages/naac/Ssr.tsx";
import Dvv from "./pages/naac/Dvv.tsx";

// Phase 4 — IQAC
import Iqac from "./pages/iqac/Iqac.tsx";
import AboutIqac from "./pages/iqac/AboutIqac.tsx";
import IqacCommittee from "./pages/iqac/IqacCommittee.tsx";
import IqacMinutes from "./pages/iqac/IqacMinutes.tsx";
import QualityInitiatives from "./pages/iqac/QualityInitiatives.tsx";
import BestPractices from "./pages/iqac/BestPractices.tsx";
import IqacPolicies from "./pages/iqac/IqacPolicies.tsx";
import Distinctiveness from "./pages/iqac/Distinctiveness.tsx";
import StudentSatisfactionSurvey from "./pages/iqac/StudentSatisfactionSurvey.tsx";
import AqarReports from "./pages/iqac/AqarReports.tsx";

// Phase 4 — AICTE / Committees / Misc
import Aicte from "./pages/Aicte.tsx";
import Committees from "./pages/Committees.tsx";
import MandatoryDisclosure from "./pages/MandatoryDisclosure.tsx";
import Feedback from "./pages/Feedback.tsx";
import Careers from "./pages/Careers.tsx";
import InfoCorner from "./pages/info/InfoCorner.tsx";
import Rti from "./pages/info/Rti.tsx";
import JobOpenings from "./pages/info/JobOpenings.tsx";
import TelephoneDirectory from "./pages/info/TelephoneDirectory.tsx";

// Misc / Legal — fills broken internal links
import OfficeStaff from "./pages/OfficeStaff.tsx";
import InternalComplaintCommittee from "./pages/InternalComplaintCommittee.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Sitemap from "./pages/Sitemap.tsx";

import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:slug" element={<DepartmentDetail />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/student-corner" element={<StudentCorner />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/:slug" element={<EventDetail />} />

          {/* About / Administration sub-pages */}
          <Route path="/about/vision-mission" element={<VisionMission />} />
          <Route path="/about/organization-chart" element={<OrganizationChart />} />
          <Route path="/about/college-location" element={<CollegeLocation />} />
          <Route path="/about/chairman" element={<Chairman />} />
          <Route path="/about/secretary" element={<Secretary />} />
          <Route path="/about/principal" element={<Principal />} />
          <Route path="/about/governing-body" element={<GoverningBody />} />
          <Route path="/about/code-of-ethics" element={<CodeOfEthics />} />
          <Route path="/about/code-of-conduct" element={<CodeOfConduct />} />
          <Route path="/about/annual-report" element={<AnnualReport />} />
          <Route path="/about/audit-report" element={<AuditReport />} />

          {/* Alumni & Grievance */}
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/grievance-cell" element={<GrievanceCell />} />

          {/* Examination */}
          <Route path="/examination" element={<Examination />} />
          <Route path="/examination/external-timetables" element={<ExternalExamsTimetables />} />
          <Route path="/examination/internal-timetables" element={<InternalExamsTimetables />} />
          <Route path="/examination/academic-calendars" element={<AcademicCalendars />} />
          <Route path="/examination/question-papers" element={<QuestionPapers />} />
          <Route path="/examination/forms-download" element={<FormsDownload />} />
          <Route path="/examination/contact" element={<ExamContact />} />

          {/* Academics sub-pages */}
          <Route path="/academics/syllabus-regulations" element={<SyllabusRegulations />} />
          <Route path="/academics/collaborations" element={<AcademicCollaborations />} />

          {/* Admissions sub-pages */}
          <Route path="/admissions/courses-intake" element={<CoursesIntake />} />
          <Route path="/admissions/fee-structure" element={<FeeStructure />} />
          <Route path="/admissions/fee-refund-policy" element={<FeeRefundPolicy />} />
          <Route path="/admissions/reservation-roster" element={<ReservationRoster />} />
          <Route path="/admissions/brochure" element={<Brochure />} />

          {/* R&D sub-pages */}
          <Route path="/research/committee" element={<ResearchCommittee />} />
          <Route path="/research/activities" element={<ResearchActivities />} />
          <Route path="/research/incentives" element={<ResearchIncentives />} />
          <Route path="/research/patents" element={<Patents />} />
          <Route path="/research/policy" element={<RndPolicy />} />
          <Route path="/research/publications" element={<Publications />} />
          <Route path="/research/iic" element={<IIC />} />
          <Route path="/research/phd-supervisors" element={<PhdSupervisors />} />
          <Route path="/research/fdp-attendance" element={<FdpAttendance />} />
          <Route path="/research/edc" element={<EDC />} />
          <Route path="/research/consultancy-policy" element={<ConsultancyPolicy />} />

          {/* Placement sub-pages */}
          <Route path="/placements/details" element={<PlacementDetails />} />
          <Route path="/placements/career-guidance" element={<CareerGuidance />} />
          <Route path="/placements/capacity-development" element={<CapacityDevelopment />} />
          <Route path="/placements/internships" element={<InternshipDetails />} />
          <Route path="/placements/recruiters" element={<Recruiters />} />
          <Route path="/placements/soft-skills" element={<SoftSkills />} />
          <Route path="/placements/contact" element={<PlacementContact />} />

          {/* Student Life */}
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/student-life/sports" element={<Sports />} />
          <Route path="/student-life/nss" element={<NSS />} />
          <Route path="/student-life/hostel" element={<Hostel />} />
          <Route path="/student-life/anti-ragging" element={<AntiRagging />} />
          <Route path="/student-life/canteen" element={<Canteen />} />
          <Route path="/student-life/health" element={<Health />} />
          <Route path="/student-life/sedg" element={<SEDG />} />
          <Route path="/student-life/equal-opportunity" element={<EqualOpportunity />} />
          <Route path="/student-life/barrier-free" element={<BarrierFree />} />

          {/* Central Library */}
          <Route path="/library" element={<Library />} />
          <Route path="/library/about" element={<AboutLibrary />} />
          <Route path="/library/digital" element={<DigitalLibrary />} />
          <Route path="/library/resources" element={<LibraryResources />} />
          <Route path="/library/staff" element={<LibraryStaff />} />
          <Route path="/library/gallery" element={<LibraryGallery />} />

          {/* NAAC */}
          <Route path="/naac" element={<Naac />} />
          <Route path="/naac/criteria-:number" element={<NaacCriteriaPage />} />
          <Route path="/naac/ssr" element={<Ssr />} />
          <Route path="/naac/dvv" element={<Dvv />} />

          {/* IQAC */}
          <Route path="/iqac" element={<Iqac />} />
          <Route path="/iqac/about" element={<AboutIqac />} />
          <Route path="/iqac/committee" element={<IqacCommittee />} />
          <Route path="/iqac/minutes" element={<IqacMinutes />} />
          <Route path="/iqac/quality-initiatives" element={<QualityInitiatives />} />
          <Route path="/iqac/best-practices" element={<BestPractices />} />
          <Route path="/iqac/policies" element={<IqacPolicies />} />
          <Route path="/iqac/distinctiveness" element={<Distinctiveness />} />
          <Route path="/iqac/sss" element={<StudentSatisfactionSurvey />} />
          <Route path="/iqac/aqar" element={<AqarReports />} />

          {/* AICTE / Committees / Misc */}
          <Route path="/aicte" element={<Aicte />} />
          <Route path="/committees" element={<Committees />} />
          <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/careers" element={<Careers />} />

          {/* Information Corner */}
          <Route path="/info" element={<InfoCorner />} />
          <Route path="/info/rti" element={<Rti />} />
          <Route path="/info/jobs" element={<JobOpenings />} />
          <Route path="/info/directory" element={<TelephoneDirectory />} />

          {/* Misc / About sub-pages added later */}
          <Route path="/about/office-staff" element={<OfficeStaff />} />
          <Route path="/about/icc" element={<InternalComplaintCommittee />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
