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
import AdmissionForm from "./pages/AdmissionForm.tsx";
import Director from "./pages/Director.tsx";
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
import Clubs from "./pages/studentlife/Clubs.tsx";
import CustomPage from "./pages/CustomPage.tsx";
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

// New About-section additions (workflow.md round 2)
import InstitutionalDevelopmentPlan from "./pages/InstitutionalDevelopmentPlan.tsx";
import HrPolicy from "./pages/HrPolicy.tsx";
import Accreditation from "./pages/Accreditation.tsx";
import CodeOfConductAudience from "./pages/CodeOfConductAudience.tsx";

// Statutory pages
import NBA from "./pages/statutory/NBA.tsx";
import UGC from "./pages/statutory/UGC.tsx";
import ScStCell from "./pages/statutory/ScStCell.tsx";
import WomenEmpowermentCell from "./pages/statutory/WomenEmpowermentCell.tsx";
import ObcCell from "./pages/statutory/ObcCell.tsx";
import MinorityCell from "./pages/statutory/MinorityCell.tsx";

import NotFound from "./pages/NotFound.tsx";

// Portal phase — auth, theme, layout, login + role-guarded routes
import { AuthProvider } from "./portal/lib/auth";
import { PortalThemeProvider } from "./portal/lib/theme";
// import { RoleGuard } from "./portal/components/RoleGuard";
import Login from "./portal/pages/Login.tsx";

// Student portal — full module set
// import StudentDashboard from "./portal/pages/student/StudentDashboard.tsx";
// import StudentAcademics from "./portal/pages/student/StudentAcademics.tsx";
// import StudentAttendance from "./portal/pages/student/StudentAttendance.tsx";
// import StudentExaminations from "./portal/pages/student/StudentExaminations.tsx";
// import StudentTimetable from "./portal/pages/student/StudentTimetable.tsx";
// import StudentFees from "./portal/pages/student/StudentFees.tsx";
// import StudentPlacements from "./portal/pages/student/StudentPlacements.tsx";
// import StudentNotifications from "./portal/pages/student/StudentNotifications.tsx";
// import StudentSupport from "./portal/pages/student/StudentSupport.tsx";
// import StudentSettings from "./portal/pages/student/StudentSettings.tsx";

// Faculty portal — full module set
// import FacultyDashboard from "./portal/pages/faculty/FacultyDashboard.tsx";
// import FacultyAttendance from "./portal/pages/faculty/FacultyAttendance.tsx";
// import FacultyAcademics from "./portal/pages/faculty/FacultyAcademics.tsx";
// import FacultyStudents from "./portal/pages/faculty/FacultyStudents.tsx";
// import FacultyTimetable from "./portal/pages/faculty/FacultyTimetable.tsx";
// import FacultyNotifications from "./portal/pages/faculty/FacultyNotifications.tsx";
// import FacultySupport from "./portal/pages/faculty/FacultySupport.tsx";
// import FacultySettings from "./portal/pages/faculty/FacultySettings.tsx";

// HOD portal — full module set
// import HodDashboard from "./portal/pages/hod/HodDashboard.tsx";
// import HodStudents from "./portal/pages/hod/HodStudents.tsx";
// import HodFaculty from "./portal/pages/hod/HodFaculty.tsx";
// import HodAcademics from "./portal/pages/hod/HodAcademics.tsx";
// import HodExaminations from "./portal/pages/hod/HodExaminations.tsx";
// import HodPlacements from "./portal/pages/hod/HodPlacements.tsx";
// import HodReports from "./portal/pages/hod/HodReports.tsx";
// import HodNotifications from "./portal/pages/hod/HodNotifications.tsx";
// import HodSupport from "./portal/pages/hod/HodSupport.tsx";
// import HodSettings from "./portal/pages/hod/HodSettings.tsx";

// Principal portal — full module set
// import PrincipalDashboard from "./portal/pages/principal/PrincipalDashboard.tsx";
// import PrincipalDepartments from "./portal/pages/principal/PrincipalDepartments.tsx";
// import PrincipalStudents from "./portal/pages/principal/PrincipalStudents.tsx";
// import PrincipalFaculty from "./portal/pages/principal/PrincipalFaculty.tsx";
// import PrincipalExaminations from "./portal/pages/principal/PrincipalExaminations.tsx";
// import PrincipalPlacements from "./portal/pages/principal/PrincipalPlacements.tsx";
// import PrincipalApprovals from "./portal/pages/principal/PrincipalApprovals.tsx";
// import PrincipalReports from "./portal/pages/principal/PrincipalReports.tsx";
// import PrincipalNotifications from "./portal/pages/principal/PrincipalNotifications.tsx";
// import PrincipalSupport from "./portal/pages/principal/PrincipalSupport.tsx";
// import PrincipalSettings from "./portal/pages/principal/PrincipalSettings.tsx";

// Exam Cell portal — full module set
// import ExamDashboard from "./portal/pages/exam/ExamDashboard.tsx";
// import ExamRecords from "./portal/pages/exam/ExamRecords.tsx";
// import ExamManagement from "./portal/pages/exam/ExamManagement.tsx";
// import ExamResults from "./portal/pages/exam/ExamResults.tsx";
// import ExamRevaluation from "./portal/pages/exam/ExamRevaluation.tsx";
// import ExamRegulations from "./portal/pages/exam/ExamRegulations.tsx";
// import ExamReports from "./portal/pages/exam/ExamReports.tsx";
// import ExamNotifications from "./portal/pages/exam/ExamNotifications.tsx";
// import ExamSupport from "./portal/pages/exam/ExamSupport.tsx";
// import ExamSettings from "./portal/pages/exam/ExamSettings.tsx";

// Accounts & Finance portal — full module set
// import AccountsDashboard from "./portal/pages/accounts/AccountsDashboard.tsx";
// import AccountsFees from "./portal/pages/accounts/AccountsFees.tsx";
// import AccountsPayments from "./portal/pages/accounts/AccountsPayments.tsx";
// import AccountsScholarships from "./portal/pages/accounts/AccountsScholarships.tsx";
// import AccountsExpenses from "./portal/pages/accounts/AccountsExpenses.tsx";
// import AccountsReports from "./portal/pages/accounts/AccountsReports.tsx";
// import AccountsNotifications from "./portal/pages/accounts/AccountsNotifications.tsx";
// import AccountsSupport from "./portal/pages/accounts/AccountsSupport.tsx";
// import AccountsSettings from "./portal/pages/accounts/AccountsSettings.tsx";

// Parent portal — full module set
// import ParentDashboard from "./portal/pages/parent/ParentDashboard.tsx";
// import ParentAttendance from "./portal/pages/parent/ParentAttendance.tsx";
// import ParentExaminations from "./portal/pages/parent/ParentExaminations.tsx";
// import ParentFees from "./portal/pages/parent/ParentFees.tsx";
// import ParentNotifications from "./portal/pages/parent/ParentNotifications.tsx";
// import ParentSupport from "./portal/pages/parent/ParentSupport.tsx";
// import ParentSettings from "./portal/pages/parent/ParentSettings.tsx";

// Admin Dashboard — content management, backed by Supabase
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import { AdminGuard } from "./admin/AdminGuard";
import { AdminLayout } from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminMenuManager from "./admin/pages/MenuManager";
import AdminPageContentManager from "./admin/pages/PageContentManager";
import AdminFeeStructureManager from "./admin/pages/FeeStructureManager";
import AdminPagesManager from "./admin/pages/PagesManager";
import AdminDocumentsManager from "./admin/pages/DocumentsManager";
import AdminNotificationsManager from "./admin/pages/NotificationsManager";
import AdminClubsManager from "./admin/pages/ClubsManager";
import AdminPatentsManager from "./admin/pages/PatentsManager";
import AdminTablesManager from "./admin/pages/TablesManager";
import AdminGrievancesManager from "./admin/pages/GrievancesManager";
import AdminMessagesManager from "./admin/pages/MessagesManager";
import AdminTestimonialsManager from "./admin/pages/TestimonialsManager";
import AdminAdmissionSubmissions from "./admin/pages/AdmissionSubmissions";
import AdminInquiriesManager from "./admin/pages/InquiriesManager";
import AdminPopupManager from "./admin/pages/PopupManager";
import AdminSocialLinksManager from "./admin/pages/SocialLinksManager";
import AdminSiteSettingsManager from "./admin/pages/SiteSettingsManager";

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
    <PortalThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
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
          <Route path="/admissions/apply" element={<AdmissionForm />} />
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
          <Route path="/about/director" element={<Director />} />
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
          <Route path="/student-life/clubs" element={<Clubs />} />
          <Route path="/p/:slug" element={<CustomPage />} />
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
          <Route path="/about/institutional-development-plan" element={<InstitutionalDevelopmentPlan />} />
          <Route path="/about/hr-policy" element={<HrPolicy />} />
          <Route path="/about/accreditation" element={<Accreditation />} />
          <Route path="/about/code-of-conduct/:audience" element={<CodeOfConductAudience />} />

          {/* Statutory pages */}
          <Route path="/statutory/nba" element={<NBA />} />
          <Route path="/statutory/ugc" element={<UGC />} />
          <Route path="/statutory/sc-st-cell" element={<ScStCell />} />
          <Route path="/statutory/women-empowerment-cell" element={<WomenEmpowermentCell />} />
          <Route path="/statutory/obc-cell" element={<ObcCell />} />
          <Route path="/statutory/minority-cell" element={<MinorityCell />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* ===== PORTAL PHASE ===== */}
          {/* Login — /login chooser + /login/:role */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/:role" element={<Login />} />

          {/* Student portal */}
          {/* <Route path="/portal/student" element={<RoleGuard allow={["student"]}><StudentDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/academics" element={<RoleGuard allow={["student"]}><StudentAcademics /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/attendance" element={<RoleGuard allow={["student"]}><StudentAttendance /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/examinations" element={<RoleGuard allow={["student"]}><StudentExaminations /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/timetable" element={<RoleGuard allow={["student"]}><StudentTimetable /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/fees" element={<RoleGuard allow={["student"]}><StudentFees /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/placements" element={<RoleGuard allow={["student"]}><StudentPlacements /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/notifications" element={<RoleGuard allow={["student"]}><StudentNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/support" element={<RoleGuard allow={["student"]}><StudentSupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/student/settings" element={<RoleGuard allow={["student"]}><StudentSettings /></RoleGuard>} /> */}

          {/* Faculty portal */}
          {/* <Route path="/portal/faculty" element={<RoleGuard allow={["faculty"]}><FacultyDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/attendance" element={<RoleGuard allow={["faculty"]}><FacultyAttendance /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/academics" element={<RoleGuard allow={["faculty"]}><FacultyAcademics /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/students" element={<RoleGuard allow={["faculty"]}><FacultyStudents /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/timetable" element={<RoleGuard allow={["faculty"]}><FacultyTimetable /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/notifications" element={<RoleGuard allow={["faculty"]}><FacultyNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/support" element={<RoleGuard allow={["faculty"]}><FacultySupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/faculty/settings" element={<RoleGuard allow={["faculty"]}><FacultySettings /></RoleGuard>} /> */}

          {/* HOD portal */}
          {/* <Route path="/portal/hod" element={<RoleGuard allow={["hod"]}><HodDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/students" element={<RoleGuard allow={["hod"]}><HodStudents /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/faculty" element={<RoleGuard allow={["hod"]}><HodFaculty /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/academics" element={<RoleGuard allow={["hod"]}><HodAcademics /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/examinations" element={<RoleGuard allow={["hod"]}><HodExaminations /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/placements" element={<RoleGuard allow={["hod"]}><HodPlacements /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/reports" element={<RoleGuard allow={["hod"]}><HodReports /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/notifications" element={<RoleGuard allow={["hod"]}><HodNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/support" element={<RoleGuard allow={["hod"]}><HodSupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/hod/settings" element={<RoleGuard allow={["hod"]}><HodSettings /></RoleGuard>} /> */}

          {/* Principal dashboard */}
          {/* <Route path="/portal/principal" element={<RoleGuard allow={["principal"]}><PrincipalDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/departments" element={<RoleGuard allow={["principal"]}><PrincipalDepartments /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/students" element={<RoleGuard allow={["principal"]}><PrincipalStudents /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/faculty" element={<RoleGuard allow={["principal"]}><PrincipalFaculty /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/examinations" element={<RoleGuard allow={["principal"]}><PrincipalExaminations /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/placements" element={<RoleGuard allow={["principal"]}><PrincipalPlacements /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/approvals" element={<RoleGuard allow={["principal"]}><PrincipalApprovals /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/reports" element={<RoleGuard allow={["principal"]}><PrincipalReports /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/notifications" element={<RoleGuard allow={["principal"]}><PrincipalNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/support" element={<RoleGuard allow={["principal"]}><PrincipalSupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/principal/settings" element={<RoleGuard allow={["principal"]}><PrincipalSettings /></RoleGuard>} /> */}

          {/* Exam cell portal */}
          {/* <Route path="/portal/exam" element={<RoleGuard allow={["exam"]}><ExamDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/records" element={<RoleGuard allow={["exam"]}><ExamRecords /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/examinations" element={<RoleGuard allow={["exam"]}><ExamManagement /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/results" element={<RoleGuard allow={["exam"]}><ExamResults /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/revaluation" element={<RoleGuard allow={["exam"]}><ExamRevaluation /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/regulations" element={<RoleGuard allow={["exam"]}><ExamRegulations /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/reports" element={<RoleGuard allow={["exam"]}><ExamReports /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/notifications" element={<RoleGuard allow={["exam"]}><ExamNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/support" element={<RoleGuard allow={["exam"]}><ExamSupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/exam/settings" element={<RoleGuard allow={["exam"]}><ExamSettings /></RoleGuard>} /> */}

          {/* Accounts & finance portal */}
          {/* <Route path="/portal/accounts" element={<RoleGuard allow={["accounts"]}><AccountsDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/fees" element={<RoleGuard allow={["accounts"]}><AccountsFees /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/payments" element={<RoleGuard allow={["accounts"]}><AccountsPayments /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/scholarships" element={<RoleGuard allow={["accounts"]}><AccountsScholarships /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/expenses" element={<RoleGuard allow={["accounts"]}><AccountsExpenses /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/reports" element={<RoleGuard allow={["accounts"]}><AccountsReports /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/notifications" element={<RoleGuard allow={["accounts"]}><AccountsNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/support" element={<RoleGuard allow={["accounts"]}><AccountsSupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/accounts/settings" element={<RoleGuard allow={["accounts"]}><AccountsSettings /></RoleGuard>} /> */}

          {/* Parent portal */}
          {/* <Route path="/portal/parent" element={<RoleGuard allow={["parent"]}><ParentDashboard /></RoleGuard>} /> */}
          {/* <Route path="/portal/parent/attendance" element={<RoleGuard allow={["parent"]}><ParentAttendance /></RoleGuard>} /> */}
          {/* <Route path="/portal/parent/examinations" element={<RoleGuard allow={["parent"]}><ParentExaminations /></RoleGuard>} /> */}
          {/* <Route path="/portal/parent/fees" element={<RoleGuard allow={["parent"]}><ParentFees /></RoleGuard>} /> */}
          {/* <Route path="/portal/parent/notifications" element={<RoleGuard allow={["parent"]}><ParentNotifications /></RoleGuard>} /> */}
          {/* <Route path="/portal/parent/support" element={<RoleGuard allow={["parent"]}><ParentSupport /></RoleGuard>} /> */}
          {/* <Route path="/portal/parent/settings" element={<RoleGuard allow={["parent"]}><ParentSettings /></RoleGuard>} /> */}

          {/* Admin Dashboard */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard><AdminLayout><AdminDashboard /></AdminLayout></AdminGuard>} />
          <Route path="/admin/menus" element={<AdminGuard><AdminLayout><AdminMenuManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/page-content" element={<AdminGuard><AdminLayout><AdminPageContentManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/fees" element={<AdminGuard><AdminLayout><AdminFeeStructureManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/pages" element={<AdminGuard><AdminLayout><AdminPagesManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/documents" element={<AdminGuard><AdminLayout><AdminDocumentsManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/notifications" element={<AdminGuard><AdminLayout><AdminNotificationsManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/clubs" element={<AdminGuard><AdminLayout><AdminClubsManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/patents" element={<AdminGuard><AdminLayout><AdminPatentsManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/tables" element={<AdminGuard><AdminLayout><AdminTablesManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/grievances" element={<AdminGuard><AdminLayout><AdminGrievancesManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/messages" element={<AdminGuard><AdminLayout><AdminMessagesManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/testimonials" element={<AdminGuard><AdminLayout><AdminTestimonialsManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/admissions" element={<AdminGuard><AdminLayout><AdminAdmissionSubmissions /></AdminLayout></AdminGuard>} />
          <Route path="/admin/inquiries" element={<AdminGuard><AdminLayout><AdminInquiriesManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/popup" element={<AdminGuard><AdminLayout><AdminPopupManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/social" element={<AdminGuard><AdminLayout><AdminSocialLinksManager /></AdminLayout></AdminGuard>} />
          <Route path="/admin/settings" element={<AdminGuard><AdminLayout><AdminSiteSettingsManager /></AdminLayout></AdminGuard>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </PortalThemeProvider>
  </QueryClientProvider>
);

export default App;
