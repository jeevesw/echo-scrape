import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client_name: string;
  card_image_url: string | null;
  page_route: string;
}

const CaseStudies = () => {
  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("id, slug, title, description, category, client_name, card_image_url, page_route")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return data as CaseStudy[];
    },
  });

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="heading-display text-5xl md:text-6xl text-center text-primary mb-16">
            Case Studies
          </h1>

          {isLoading ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-muted aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {caseStudies.map((study) => (
                <Link key={study.id} to={study.page_route} className="group">
                  <Card className="overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden">
                      {study.card_image_url ? (
                        <img
                          src={study.card_image_url}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-2xl font-bold text-muted-foreground">{study.client_name}</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-7 flex flex-col flex-1">
                      <span className="heading-display text-sm text-primary uppercase tracking-wide">
                        {study.category}
                      </span>
                      <h3 className="heading-display text-2xl text-foreground mt-2 mb-3 leading-tight group-hover:text-primary transition-colors duration-300 uppercase">
                        {study.client_name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {study.description}
                      </p>
                      <span className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wide text-sm py-3 group-hover:bg-primary/90 transition-colors duration-300">
                        Read the Case Study <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl text-foreground mb-6">
            Ready to become our next success story?
          </h2>
          <Button variant="hero" asChild>
            <a
              href="https://calendly.com/trapezemedia/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Call
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
