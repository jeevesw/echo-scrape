import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import logoTwoTone from "@/assets/logo-two-tone.svg";

// Service images
import socialMediaImg from "@/assets/services/social-media-management.webp";
import paidAdsImg from "@/assets/services/paid-advertising.webp";
import paidSearchImg from "@/assets/services/paid-search.jpg";
import creativeImg from "@/assets/services/creative-services.webp";
import tiktokImg from "@/assets/services/video-production.jpg";
import websiteImg from "@/assets/services/website-design.jpg";

const services = [
  { slug: "social-media-management", title: "Social Media Management", description: "Content, engagement, paid media", image: socialMediaImg },
  { slug: "paid-advertising", title: "Paid Social Ads", description: "Conversion-focused Meta, TikTok, & Google ads", image: paidAdsImg },
  { slug: "paid-search", title: "PPC / Google Ads", description: "Search, Display, YouTube, & Shopping ads", image: paidSearchImg },
  { slug: "youtube-ads", title: "YouTube Ads", description: "Shorts, in-stream, & Demand Gen campaigns", image: paidSearchImg },
  { slug: "video-production", title: "Video Production", description: "For social and big screens", image: tiktokImg },
  { slug: "website-design", title: "Website Design", description: "Build, launch, & management", image: websiteImg },
  // { slug: "creative-services", title: "Creative Services", description: "Design, branding, & social assets", image: creativeImg }, // Hidden temporarily
];

const navItems = [
  { label: "Blog", href: "/blog" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];

interface CaseStudyNav {
  slug: string;
  client_name: string;
  category: string;
  client_logo_url: string | null;
  card_image_url: string | null;
  hero_image_url: string | null;
  page_route: string;
}

function useCaseStudiesNav() {
  return useQuery({
    queryKey: ["case-studies-nav"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug, client_name, category, client_logo_url, card_image_url, hero_image_url, page_route")
        .eq("is_published", true)
        .order("sort_order")
        .limit(6);
      if (error) throw error;
      return data as CaseStudyNav[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

interface HeaderProps {
  floating?: boolean;
}

export function Header({ floating = false }: HeaderProps = {}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const location = useLocation();
  const { data: caseStudies = [] } = useCaseStudiesNav();

  return (
    <header
      className={
        floating
          ? "sticky top-0 z-50 w-full bg-background lg:fixed lg:top-4 lg:left-4 lg:right-4 lg:bg-transparent"
          : "sticky top-0 z-50 w-full bg-background"
      }
    >
      {/* Main Navigation */}
      <div
        className={
          floating
            ? "border-b border-border lg:border-0 lg:mx-auto lg:max-w-6xl lg:rounded-full lg:bg-background/80 lg:backdrop-blur-md lg:border lg:border-border/60 lg:shadow-lg"
            : "border-b border-border"
        }
      >
        <div
          className={
            floating
              ? "container-content mx-auto flex h-20 items-center justify-between px-4 lg:container-none lg:max-w-none lg:h-16 lg:px-6"
              : "container-content mx-auto flex h-20 items-center justify-between px-4"
          }
        >
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoTwoTone} alt="Trapeze Media" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative h-20 flex items-center"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className={`text-base font-medium uppercase tracking-wide transition-colors hover:text-primary inline-flex items-center gap-1 ${
                  location.pathname.startsWith("/services") ? "text-primary" : "text-foreground"
                }`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${
                  servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-background border border-border rounded-xl shadow-xl p-6 w-[820px] max-w-[calc(100vw-2rem)]">
                  <div className="grid grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="group flex gap-4 p-4 rounded-xl hover:bg-muted transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border">
                    <Link to="/services" className="text-base font-medium text-primary hover:underline" onClick={() => setServicesOpen(false)}>
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Studies Dropdown */}
            <div
              className="relative h-20 flex items-center"
              onMouseEnter={() => setCaseStudiesOpen(true)}
              onMouseLeave={() => setCaseStudiesOpen(false)}
            >
              <Link
                to="/case-studies"
                className={`text-base font-medium uppercase tracking-wide transition-colors hover:text-primary inline-flex items-center gap-1 ${
                  location.pathname.startsWith("/case-studies") ? "text-primary" : "text-foreground"
                }`}
              >
                Case Studies
                <ChevronDown className={`h-4 w-4 transition-transform ${caseStudiesOpen ? "rotate-180" : ""}`} />
              </Link>
              <div
                onMouseEnter={() => setCaseStudiesOpen(true)}
                onMouseLeave={() => setCaseStudiesOpen(false)}
                className={`fixed left-1/2 -translate-x-1/2 top-20 transition-all duration-200 z-50 ${
                  caseStudiesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-2"
                }`}
              >
                {/* Invisible hover bridge to prevent gap between trigger and panel */}
                <div className="h-4 w-full" aria-hidden="true" />
                <div className="bg-background border border-border rounded-xl shadow-xl p-6 w-[860px] max-w-[calc(100vw-2rem)]">
                  <div className="grid grid-cols-3 gap-4">
                    {caseStudies.map((cs) => (
                      <Link
                        key={cs.slug}
                        to={cs.page_route}
                        className="group flex flex-col rounded-xl hover:bg-muted transition-colors overflow-hidden"
                        onClick={() => setCaseStudiesOpen(false)}
                      >
                        <div className="w-full h-32 overflow-hidden bg-muted">
                          {(cs.card_image_url || cs.hero_image_url) ? (
                            <img src={cs.card_image_url || cs.hero_image_url || ''} alt={cs.client_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-2xl font-bold text-muted-foreground">{cs.client_name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-3 p-3 items-start">
                          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                            {cs.client_logo_url ? (
                              <img src={cs.client_logo_url} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-sm font-bold text-muted-foreground">{cs.client_name.charAt(0)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">{cs.client_name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{cs.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border">
                    <Link to="/case-studies" className="text-base font-medium text-primary hover:underline" onClick={() => setCaseStudiesOpen(false)}>
                      View all case studies →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-base font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                  location.pathname === item.href ? "text-primary underline underline-offset-4" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <div className="flex flex-col gap-6 pt-10">
                <Link to="/services" onClick={() => setOpen(false)} className={`text-lg font-medium uppercase tracking-wide transition-colors hover:text-primary ${location.pathname.startsWith("/services") ? "text-primary" : "text-foreground"}`}>
                  Services
                </Link>
                <div className="pl-4 flex flex-col gap-3 -mt-3">
                  {services.map((service) => (
                    <Link key={service.slug} to={`/services/${service.slug}`} onClick={() => setOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors">
                      {service.title}
                    </Link>
                  ))}
                </div>

                <Link to="/case-studies" onClick={() => setOpen(false)} className={`text-lg font-medium uppercase tracking-wide transition-colors hover:text-primary ${location.pathname.startsWith("/case-studies") ? "text-primary" : "text-foreground"}`}>
                  Case Studies
                </Link>
                <div className="pl-4 flex flex-col gap-3 -mt-3">
                  {caseStudies.map((cs) => (
                    <Link key={cs.slug} to={cs.page_route} onClick={() => setOpen(false)} className="text-base text-muted-foreground hover:text-primary transition-colors">
                      {cs.client_name}
                    </Link>
                  ))}
                </div>

                {navItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className={`text-lg font-medium uppercase tracking-wide transition-colors hover:text-primary ${location.pathname === item.href ? "text-primary" : "text-foreground"}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
