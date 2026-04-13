import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import YoSushiCaseStudy from "./pages/case-studies/YoSushiCaseStudy";
import MoloCaseStudy from "./pages/case-studies/MoloCaseStudy";
import BrightonSeoCaseStudy from "./pages/case-studies/BrightonSeoCaseStudy";
import VariousEateriesCaseStudy from "./pages/case-studies/VariousEateriesCaseStudy";
import MaximilesCaseStudy from "./pages/case-studies/MaximilesCaseStudy";
import MyceliaCaseStudy from "./pages/case-studies/MyceliaCaseStudy";
import PattyAndBunCaseStudy from "./pages/case-studies/PattyAndBunCaseStudy";
import ParisBaguetteCaseStudy from "./pages/case-studies/ParisBaguetteCaseStudy";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import PaidAdvertisingPage from "./pages/services/PaidAdvertisingPage";
import PaidSearchPage from "./pages/services/PaidSearchPage";
import TikTokProductionPage from "./pages/services/TikTokProductionPage";
import SocialMediaManagementPage from "./pages/services/SocialMediaManagementPage";
import CreativeServicesPage from "./pages/services/CreativeServicesPage";
import WebsiteDesignPage from "./pages/services/WebsiteDesignPage";
import PaidAdsQuiz from "./pages/PaidAdsQuiz";
import HFSSAssessment from "./pages/HFSSAssessment";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import BlogDashboard from "./pages/admin/BlogDashboard";
import BlogEditor from "./pages/admin/BlogEditor";
import BlogMigrate from "./pages/admin/BlogMigrate";
import BlogCleanup from "./pages/admin/BlogCleanup";
import Authors from "./pages/admin/Authors";
import CaseStudiesAdmin from "./pages/admin/CaseStudies";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/yo-sushi" element={<YoSushiCaseStudy />} />
              <Route path="/case-studies/molo" element={<MoloCaseStudy />} />
              <Route path="/case-studies/various-eateries" element={<VariousEateriesCaseStudy />} />
              <Route path="/case-studies/brightonseo" element={<BrightonSeoCaseStudy />} />
              <Route path="/case-studies/maximiles" element={<MaximilesCaseStudy />} />
              <Route path="/case-studies/mycelia" element={<MyceliaCaseStudy />} />
              <Route path="/case-studies/patty-and-bun" element={<PattyAndBunCaseStudy />} />
              <Route path="/case-studies/paris-baguette" element={<ParisBaguetteCaseStudy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/paid-advertising" element={<PaidAdvertisingPage />} />
              <Route path="/services/paid-search" element={<PaidSearchPage />} />
              <Route path="/services/tiktok-production" element={<TikTokProductionPage />} />
              <Route path="/services/social-media-management" element={<SocialMediaManagementPage />} />
              <Route path="/services/creative-services" element={<CreativeServicesPage />} />
              <Route path="/services/website-design" element={<WebsiteDesignPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/paid-ads-quiz" element={<PaidAdsQuiz />} />
              <Route path="/training" element={<Services />} />
              <Route path="/lhf-ad-ban" element={<Blog />} />
              <Route path="/hfss-assessment" element={<HFSSAssessment />} />
              
              {/* Auth */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Admin routes - protected */}
              <Route path="/admin/blog" element={
                <ProtectedRoute requireAdmin><BlogDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/blog/new" element={
                <ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>
              } />
              <Route path="/admin/blog/edit/:id" element={
                <ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>
              } />
              <Route path="/admin/blog/migrate" element={
                <ProtectedRoute requireAdmin><BlogMigrate /></ProtectedRoute>
              } />
              <Route path="/admin/blog/cleanup" element={
                <ProtectedRoute requireAdmin><BlogCleanup /></ProtectedRoute>
              } />
              <Route path="/admin/case-studies" element={
                <ProtectedRoute requireAdmin><CaseStudiesAdmin /></ProtectedRoute>
              } />
              <Route path="/admin/authors" element={
                <ProtectedRoute requireAdmin><Authors /></ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
