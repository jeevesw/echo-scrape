import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const campaigns = [
  {
    category: "Google & Meta Ads",
    title: "Driving footfall and orders for YO! Sushi",
    image: "/images/case-studies/yo-sushi-hero.jpg",
    href: "/case-studies/yo-sushi",
  },
  {
    category: "Lead Gen, Paid Social",
    title: "Driving pre-launch buzz and leads for Patty & Bun",
    image: "/images/case-studies/patty-and-bun-hero.jpg",
    href: "/case-studies/patty-and-bun",
  },
  {
    category: "Google, Meta & YouTube Ads",
    title: "Growing Brand Demand and Footfall for Paris Baguette",
    image: "/images/case-studies/paris-baguette-hero.jpg",
    href: "/case-studies/paris-baguette",
  },
  // TODO: Replace Brighton Fringe with Paris Baguette when assets are available
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
      
      <div className="container-content mx-auto px-4 relative">
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
