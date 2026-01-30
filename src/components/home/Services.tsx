import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Target, Mail, Palette } from "lucide-react";

const services = [
  {
    title: "Social Media Management",
    icon: Megaphone,
    href: "/services#social",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1592971752931-3VUFFCSZSYP9942UG8NC/Trapeze-Media-Social-Media-Marketing-Agency.jpg",
  },
  {
    title: "Paid Advertising",
    icon: Target,
    href: "/services#paid-ads",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1593146998755-K4PSVSK49MUPN6JA2EJE/Trapeze+Media+Social+Media+Agency+Paid+Ads.jpg",
  },
  {
    title: "Email Marketing",
    icon: Mail,
    href: "/services#email",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1593147380477-3533O887DB75NQ9XRURB/Trapeze+Media+Social+Media+Agency+Email+Marketing.jpg",
  },
  {
    title: "Creative Services",
    icon: Palette,
    href: "/services#creative",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/60f3a568-f395-4b26-8b50-1533caba4bee/Trapeze+Media+%E2%80%94+Creative+Services.jpg",
  },
];

export function Services() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-12">
          Our Digital Marketing Services
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {services.map((service) => (
            <Link key={service.title} to={service.href}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 bg-muted">
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 text-primary" />
                    <h3 className="heading-display text-lg text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
