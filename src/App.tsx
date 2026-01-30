import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import YoSushiCaseStudy from "./pages/case-studies/YoSushiCaseStudy";
import MoloCaseStudy from "./pages/case-studies/MoloCaseStudy";
import VariousEateriesCaseStudy from "./pages/case-studies/VariousEateriesCaseStudy";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import PaidAdsQuiz from "./pages/PaidAdsQuiz";
import HFSSAssessment from "./pages/HFSSAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/yo-sushi" element={<YoSushiCaseStudy />} />
            <Route path="/case-studies/molo" element={<MoloCaseStudy />} />
            <Route path="/case-studies/various-eateries" element={<VariousEateriesCaseStudy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/paid-ads-quiz" element={<PaidAdsQuiz />} />
            <Route path="/training" element={<Services />} />
            <Route path="/lhf-ad-ban" element={<Blog />} />
            <Route path="/hfss-assessment" element={<HFSSAssessment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
