import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/integrations/supabase/client";

const campaigns = [
  {
    slug: "yo-sushi",
    category: "Google & Meta Ads",
    title: "Driving footfall and orders for YO!",
    image: "/images/case-studies/yo-sushi-hero.jpg",
    href: "/case-studies/yo-sushi",
    fallbackLogo: "/images/clients/yo-sushi.svg",
  },
  {
    slug: "patty-and-bun",
    category: "Lead Gen, Paid Social",
    title: "Driving pre-launch buzz and leads for Patty & Bun",
    image: "/images/case-studies/patty-and-bun-hero.jpg",
    href: "/case-studies/patty-and-bun",
    fallbackLogo: "/images/clients/patty-and-bun.svg",
  },
  {
    slug: "paris-baguette",
    category: "Google, Meta & YouTube Ads",
    title: "Growing Brand Demand and Footfall for Paris Baguette",
    image: "/images/case-studies/paris-baguette-hero.jpg",
    href: "/case-studies/paris-baguette",
    fallbackLogo: null,
  },
  {
    slug: "brighton-fringe",
    category: "Creative Content",
    title: "Live event coverage via social media for Brighton Fringe",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/cd93151a-06b9-49dd-8a64-153a6b51cd9e/Collage.jpg",
    href: "/case-studies/brighton-fringe",
    fallbackLogo: "/images/clients/brighton-fringe.svg",
  },
];

export function FeaturedCampaigns() {
  const { data: logoMap = {} } = useQuery({
    queryKey: ["featured-campaign-logos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug, client_logo_url, client_name")
        .in("slug", campaigns.map((c) => c.slug));
      if (error) throw error;
      return Object.fromEntries(
        (data ?? []).map((cs) => [cs.slug, { logo: cs.client_logo_url, name: cs.client_name }])
      ) as Record<string, { logo: string | null; name: string }>;
    },
    staleTime: 5 * 60 * 1000,
  });

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
          {campaigns.map((campaign, index) => {
            const dbInfo = logoMap[campaign.slug];
            const logoSrc = dbInfo?.logo || campaign.fallbackLogo;
            const altName = dbInfo?.name || campaign.title;
            return (
              <ScrollReveal
                key={campaign.title}
                animation={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="h-full"
              >
                <Link to={campaign.href} className="group block h-full">
                  <Card variant="interactive" className="overflow-hidden bg-background h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex">
                      <div className="flex gap-5 items-center w-full">
                        {/* Logo column ~30% */}
                        <div className="w-[30%] flex items-center justify-center shrink-0">
                          {logoSrc ? (
                            <img
                              src={logoSrc}
                              alt={`${altName} logo`}
                              className="max-h-20 w-auto max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-3xl font-bold text-muted-foreground">
                              {altName.charAt(0)}
                            </span>
                          )}
                        </div>
                        {/* Text column ~70% */}
                        <div className="w-[70%] min-w-0">
                          <span className="heading-display text-base md:text-lg text-primary block">
                            {campaign.category}
                          </span>
                          <h3 className="heading-display text-2xl md:text-3xl text-foreground mt-2 leading-tight">
                            {campaign.title}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
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
