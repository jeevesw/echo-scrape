import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Target, Search, Palette } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import socialMediaImg from "@/assets/services/social-media-management.jpg";

const services = [
  {
    title: "Social Media Management",
    icon: Megaphone,
    href: "/services/social-media-management",
    image: socialMediaImg,
  },
  {
    title: "Paid Advertising",
    icon: Target,
    href: "/services/paid-advertising",
    image: "https://126bd4da-ec3d-4eca-b8bb-32cc9782210f.lovableproject.com/src/assets/services/paid-advertising.webp",
  },
  {
    title: "Paid Search",
    icon: Mail,
    href: "/services/paid-search",
    image: "https://126bd4da-ec3d-4eca-b8bb-32cc9782210f.lovableproject.com/src/assets/services/paid-search.jpg",
  },
  {
    title: "Creative Services",
    icon: Palette,
    href: "/services/creative-services",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/60f3a568-f395-4b26-8b50-1533caba4bee/Trapeze+Media+%E2%80%94+Creative+Services.jpg",
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
            <Link to="/services/paid-advertising" className="text-primary hover:underline font-medium">paid search ads</Link>, and{" "}
            <Link to="/services/social-media-management" className="text-primary hover:underline font-medium">organic social</Link>, plus{" "}
            <Link to="/services/creative-services" className="text-primary hover:underline font-medium">web design and optimisation</Link>.
          </p>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Our successes include campaigns in the <span className="text-foreground font-medium">hospitality</span>, <span className="text-foreground font-medium">tourism</span>, and <span className="text-foreground font-medium">events</span> sectors, with renowned food, drink, and experience brands including Various Eateries, Hakkasan, and Brighton Fringe.
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
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="heading-display text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
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
