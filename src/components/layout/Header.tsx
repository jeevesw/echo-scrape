import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoTwoTone from "@/assets/logo-two-tone.svg";

// Service images
import socialMediaImg from "@/assets/services/social-media-management.webp";
import paidAdsImg from "@/assets/services/paid-advertising.webp";
import emailMarketingImg from "@/assets/services/email-marketing.webp";
import creativeImg from "@/assets/services/creative-services.webp";
import tiktokImg from "@/assets/services/tiktok-production.png";
import websiteImg from "@/assets/services/website-design.jpg";

const services = [
  {
    slug: "social-media-management",
    title: "Social Media",
    description: "Content, community & engagement",
    image: socialMediaImg,
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    description: "Meta, Google & TikTok ads",
    image: paidAdsImg,
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    description: "Campaigns & automation",
    image: emailMarketingImg,
  },
  {
    slug: "creative-services",
    title: "Creative Services",
    description: "Design, video & branding",
    image: creativeImg,
  },
  {
    slug: "tiktok-production",
    title: "TikTok Production",
    description: "Content, ads & influencers",
    image: tiktokImg,
  },
  {
    slug: "website-design",
    title: "Website Design",
    description: "Build, launch & manage",
    image: websiteImg,
  },
];

const navItems = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "LHF Ad Ban", href: "/lhf-ad-ban" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
        <Link to="/lhf-ad-ban" className="hover:underline">
          Ready for the 'Less-Healthy Foods' ads ban? Learn more at our events →
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border">
        <div className="container-content mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoTwoTone} 
              alt="Trapeze Media" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className={`text-base font-medium uppercase tracking-wide transition-colors hover:text-primary inline-flex items-center gap-1 ${
                  location.pathname.startsWith("/services")
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>
              
              {/* Dropdown Panel */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${
                  servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="bg-background border border-border rounded-xl shadow-xl p-6 w-[780px]">
                  <div className="grid grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="group flex gap-4 p-4 rounded-xl hover:bg-muted transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border">
                    <Link
                      to="/services"
                      className="text-base font-medium text-primary hover:underline"
                      onClick={() => setServicesOpen(false)}
                    >
                      View all services →
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
                  location.pathname === item.href
                    ? "text-primary underline underline-offset-4"
                    : "text-foreground"
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
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                    location.pathname.startsWith("/services")
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  Services
                </Link>
                {/* Mobile service sub-links */}
                <div className="pl-4 flex flex-col gap-3 -mt-3">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-base text-muted-foreground hover:text-primary transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
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
