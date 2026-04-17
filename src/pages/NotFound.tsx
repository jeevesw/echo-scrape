import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(`404: ${location.pathname}`);
  }, [location.pathname]);

  const { data: caseStudies = [] } = useQuery({
    queryKey: ["404-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug, client_name, category, card_image_url, hero_image_url, page_route")
        .eq("is_published", true)
        .order("sort_order")
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const { data: blogPosts = [] } = useQuery({
    queryKey: ["404-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug, title, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="heading-display text-7xl md:text-9xl text-primary mb-6 leading-none">404</p>
          <h1 className="heading-display text-3xl md:text-5xl text-foreground mb-6">
            You've fallen off the wire.
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            That page doesn't exist — but plenty of good stuff does. Have a look below.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all"
          >
            Back to homepage <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="bg-muted py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="heading-display text-2xl md:text-3xl text-foreground mb-10 text-center">
              Featured Campaigns
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((cs: any) => (
                <Link
                  key={cs.slug}
                  to={cs.page_route}
                  className="group bg-background rounded-2xl overflow-hidden border border-border/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    {(cs.card_image_url || cs.hero_image_url) && (
                      <img
                        src={cs.card_image_url || cs.hero_image_url}
                        alt={cs.client_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                      {cs.category}
                    </p>
                    <h3 className="heading-display text-xl text-foreground group-hover:text-primary transition-colors">
                      {cs.client_name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="heading-display text-2xl md:text-3xl text-foreground mb-10 text-center">
              Latest from the Blog
            </h2>
            <ul className="divide-y divide-border/60">
              {blogPosts.map((post: any) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <span className="text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </Layout>
  );
}
