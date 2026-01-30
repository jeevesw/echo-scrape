import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "SEO to GEO: how local businesses can win in the age of AI search",
    excerpt: "Search is shifting from link clicks to overviews and answers. Here's how local businesses are winning big with solid GEO and AEO strategies.",
    href: "/blog/seo-geo",
  },
  {
    title: "The new 'Less Healthy Food' ad rules: what you need to know for 2026",
    excerpt: "On 5th January 2026, a major shift hits the UK advertising ecosystem: the 'Less Healthy Food & Drink (LHF)' restrictions finally come into full force.",
    href: "/blog/lhf-rules-2026",
  },
  {
    title: "How brands can prepare for the UK 'Less Healthy Food' ad ban",
    excerpt: "Everything hospitality and retail businesses should know to prepare for new rules on marketing HFSS products.",
    href: "/blog/lhf-preparation",
  },
];

export function BlogPreview() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-12">
          New on the Trapeze Media Blog
        </h2>

        <div className="grid gap-8 md:grid-cols-3 stagger-children">
          {blogPosts.map((post) => (
            <Card key={post.title} className="border-0 bg-background hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                  <Link to={post.href}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link 
                  to={post.href} 
                  className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  Read More <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero-outline" asChild>
            <Link to="/blog">
              See All Blog Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
