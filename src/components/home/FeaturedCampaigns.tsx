import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

// Slugs in display order — update here to change which campaigns are featured
const FEATURED_SLUGS = [
  "yo-sushi",
  "patty-and-bun",
  "paris-baguette",
  "brightonseo",
];

interface FeaturedCampaign {
  slug: string;
  client_name: string;
  category: string;
  card_image_url: string | null;
  hero_image_url: string | null;
  client_logo_url: string | null;
  page_route: string;
}

export function FeaturedCampaigns() {
  const { data: campaigns = [] } = useQuery({
    queryKey: ["featured-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug, client_name, category, card_image_url, hero_image_url, client_logo_url, page_route")
        .in("slug", FEATURED_SLUGS)
        .eq("is_published", true);
      if (error) throw error;
      // Preserve the order defined in FEATURED_SLUGS
      return FEATURED_SLUGS
        .map(slug => (data as FeaturedCampaign[]).find(c => c.slug === slug))
        .filter(Boolean) as FeaturedCampaign[];
    },
  });

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
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
              key={campaign.slug}
              animation={index % 2 === 0 ? "left" : "right"}
              delay={index * 100}
            >
              <Link to={campaign.page_route}>
                <Card variant="interactive" className="overflow-hidden bg-background">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={campaign.card_image_url || campaign.hero_image_url || ""}
                      alt={campaign.client_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="heading-display text-sm text-primary">
                      {campaign.category}
                    </span>
                    <div className="flex items-center gap-4 mt-3">
                      {campaign.client_logo_url && (
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={campaign.client_logo_url}
                            alt={campaign.client_name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="heading-display text-xl text-foreground leading-tight">
                        {campaign.client_name}
                      </h3>
                    </div>
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
