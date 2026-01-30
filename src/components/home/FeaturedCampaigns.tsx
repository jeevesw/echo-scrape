import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const campaigns = [
  {
    category: "Google Ads",
    title: "Increasing bookings for Various Eateries",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/99bb98a7-88f7-4295-87df-ead4bb1b64da/Various+Eateries.jpg",
    href: "/case-studies/various-eateries",
  },
  {
    category: "Lead Generation",
    title: "Engaging Gen-Z audience for Maximiles",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/26c441b3-74f9-403a-b929-8af51bba0619/Maximiles-Paid-Ads-by-Trapeze-Media.jpg",
    href: "/case-studies/maximiles",
  },
  {
    category: "Crowdfunder Lead Generation",
    title: "Raising half-a-million for board game Mycelia",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1711555599572-XAE74WRQ55SCVSPWVT7I/Mycelia-Case-Study-Trapeze-Media.jpg",
    href: "/case-studies/mycelia",
  },
  {
    category: "Creative Content",
    title: "Live event coverage via social media for Brighton Fringe",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/cd93151a-06b9-49dd-8a64-153a6b51cd9e/Collage.jpg",
    href: "/case-studies/brighton-fringe",
  },
];

export function FeaturedCampaigns() {
  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-12">
            Featured Campaigns
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {campaigns.map((campaign, index) => (
            <ScrollReveal 
              key={campaign.title} 
              animation={index % 2 === 0 ? "left" : "right"}
              delay={index * 100}
            >
              <Link to={campaign.href}>
                <Card variant="interactive" className="overflow-hidden bg-background">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="heading-display text-sm text-primary">
                      {campaign.category}
                    </span>
                    <h3 className="heading-display text-xl text-foreground mt-2">
                      {campaign.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Button variant="hero-outline" asChild>
            <Link to="/case-studies">
              View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
