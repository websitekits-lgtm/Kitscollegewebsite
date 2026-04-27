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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
