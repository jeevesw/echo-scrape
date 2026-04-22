import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import socialMediaImg from "@/assets/services/social-media-management.webp";
import paidAdsImg from "@/assets/services/paid-advertising.webp";
import paidSearchImg from "@/assets/services/paid-search.jpg";
import tiktokImg from "@/assets/services/video-production.jpg";

const services = [
  {
    title: "Social Media Management",
    subtitle: "Content, engagement, paid media",
    href: "/services/social-media-management",
    image: socialMediaImg,
  },
  {
    title: "Paid Social Ads",
    subtitle: "Meta, TikTok, programmatic ads",
    href: "/services/paid-advertising",
    image: paidAdsImg,
  },
  {
    title: "PPC / Google Ads",
    subtitle: "Search, Display, YouTube, & Shopping ads",
    href: "/services/paid-search",
    image: paidSearchImg,
  },
  {
    title: "Video Production",
    subtitle: "For social and big screens",
    href: "/services/video-production",
    image: tiktokImg,
  },
];

export function Services() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container-content mx-auto px-4 relative">
        <ScrollReveal>
          <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-4">
            Our <span className="text-primary">Digital Marketing</span> Services
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-4">
            For more than a decade, we've been helping clients reach new audiences by managing and optimising{" "}
            <Link to="/services/paid-advertising" className="text-primary hover:underline font-medium">paid social ads</Link>,{" "}
            <Link to="/services/paid-search" className="text-primary hover:underline font-medium">paid search ads</Link>, and{" "}
            <Link to="/services/social-media-management" className="text-primary hover:underline font-medium">organic social</Link>, plus{" "}
            <Link to="/services/creative-services" className="text-primary hover:underline font-medium">web design and optimisation</Link>.
          </p>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Our successes include campaigns in the <span className="text-foreground font-medium">hospitality</span>, <span className="text-foreground font-medium">tourism</span>, and <span className="text-foreground font-medium">events</span> sectors, with renowned food, drink, and experience brands as well as <span className="text-foreground font-medium">healthcare and private medical services</span>, and <span className="text-foreground font-medium">crowdfunding</span>.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <Link to={service.href} className="group block h-full">
                <Card className="overflow-hidden h-full rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="heading-display text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
