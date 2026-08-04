import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Newsletter from "./pages/Newsletter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import PaidAdvertisingPage from "./pages/services/PaidAdvertisingPage";
import PaidSearchPage from "./pages/services/PaidSearchPage";
import YouTubeAdsPage from "./pages/services/YouTubeAdsPage";
import TikTokProductionPage from "./pages/services/TikTokProductionPage";
import SocialMediaManagementPage from "./pages/services/SocialMediaManagementPage";
import CreativeServicesPage from "./pages/services/CreativeServicesPage";
import WebsiteDesignPage from "./pages/services/WebsiteDesignPage";
import PaidAdsQuiz from "./pages/PaidAdsQuiz";
import HFSSAssessment from "./pages/HFSSAssessment";
import ProsceniumTest from "./pages/ProsceniumTest";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import BlogDashboard from "./pages/admin/BlogDashboard";
import BlogEditor from "./pages/admin/BlogEditor";
import BlogMigrate from "./pages/admin/BlogMigrate";
import BlogCleanup from "./pages/admin/BlogCleanup";
import Authors from "./pages/admin/Authors";
import CaseStudiesAdmin from "./pages/admin/CaseStudies";
import SeoManager from "./pages/admin/SeoManager";

const queryClient = new QueryClient();

const REDIRECTS: Array<[string, string]> = [
  ["/brightonseo", "/case-studies/brightonseo"],
  ["/caravanserai-brighton", "/case-studies/brightonseo"],
  ["/maximiles", "/case-studies/maximiles"],
  ["/molo", "/case-studies/molo"],
  ["/mycelia", "/case-studies/mycelia"],
  ["/patty-and-bun", "/case-studies/patty-and-bun"],
  ["/various-eateries", "/case-studies/various-eateries"],
  ["/yo-sushi", "/case-studies/yo"],
  ["/portfolio", "/case-studies"],
  ["/creative-services", "/services/creative-services"],
  ["/paid-ads", "/services/paid-advertising"],
  ["/paid-search", "/services/paid-search"],
  ["/paid-social", "/services/paid-advertising"],
  ["/social-media-marketing", "/services/social-media-management"],
  ["/tiktok", "/services/video-production"],
  ["/website-design-management", "/services/website-design"],
  ["/email-marketing", "/services"],
  ["/seo", "/services/paid-search"],
  ["/lhf", "/hfss-assessment"],
  ["/lhf-1", "/hfss-assessment"],
  ["/about", "/"],
  ["/home", "/"],
  ["/team", "/"],
  ["/blog/category/guides", "/blog"],
  ["/blog/category/tiktok+marketing", "/blog"],
  ["/blog/category/trapeze+media", "/blog"],
  ["/blog/tag/lhf", "/blog"],
  ["/blog/tag/paid+search", "/blog"],
  ["/blog/tag/paid+search+marketing+agency", "/blog"],
  ["/blog/hfss-pure-brand-advertisin", "/blog/lhf-brand-ads-update"],
  ["/blog/a-beginners-guide-to-marketing-terms", "/blog"],
  ["/blog/google-ppc-advertising-2026-trends-strategies", "/blog"],
  ["/blog/the-great-hospitality-disruption-of-2020", "/blog"],
  ["/blog/your-audiences-are-making-emotional-decisions", "/blog"],
];

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
              <Route path="/case-studies/yo" element={<YoSushiCaseStudy />} />
              <Route path="/case-studies/yo-sushi" element={<Navigate to="/case-studies/yo" replace />} />
              <Route path="/case-studies/molo" element={<MoloCaseStudy />} />
              <Route path="/case-studies/various-eateries" element={<VariousEateriesCaseStudy />} />
              <Route path="/case-studies/brightonseo" element={<BrightonSeoCaseStudy />} />
              <Route path="/case-studies/maximiles" element={<MaximilesCaseStudy />} />
              <Route path="/case-studies/mycelia" element={<MyceliaCaseStudy />} />
              <Route path="/case-studies/patty-and-bun" element={<PattyAndBunCaseStudy />} />
              <Route path="/case-studies/paris-baguette" element={<ParisBaguetteCaseStudy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/paid-advertising" element={<PaidAdvertisingPage />} />
              <Route path="/services/paid-search" element={<PaidSearchPage />} />
              <Route path="/services/youtube-ads" element={<YouTubeAdsPage />} />
              <Route path="/services/video-production" element={<TikTokProductionPage />} />
              <Route path="/services/tiktok-production" element={<Navigate to="/services/video-production" replace />} />
              <Route path="/services/social-media-management" element={<SocialMediaManagementPage />} />
              <Route path="/services/creative-services" element={<CreativeServicesPage />} />
              <Route path="/services/website-design" element={<WebsiteDesignPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/paid-ads-quiz" element={<PaidAdsQuiz />} />
              <Route path="/training" element={<Services />} />
              <Route path="/lhf-ad-ban" element={<Blog />} />
              <Route path="/hfss-assessment" element={<HFSSAssessment />} />
              <Route path="/proscenium-test" element={<ProsceniumTest />} />

              {/* Legacy URL redirects */}
              {REDIRECTS.map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
              
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
              <Route path="/admin/seo" element={
                <ProtectedRoute requireAdmin><SeoManager /></ProtectedRoute>
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
