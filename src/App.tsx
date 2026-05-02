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

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
