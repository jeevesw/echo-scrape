import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
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
    excerpt: "On 5th January 2026, a major shift hits the UK advertising ecosystem: the 'Less Healthy Food & Drink (LHF)' restrictions finally come into full force. Are you ready?",
    href: "/blog/lhf-rules-2026",
  },
  {
    title: "How brands can prepare for the UK 'Less Healthy Food' ad ban",
    excerpt: "Everything hospitality and retail businesses should know to prepare for new rules on marketing HFSS (high fat, sugar, salt) products.",
    href: "/blog/lhf-preparation",
  },
  {
    title: "Influencer marketing: do 'less healthy food' laws change the game?",
    excerpt: "The UK's new 'less healthy food' ad ban is shaking up influencer marketing. Here's what businesses need to know about how the rules affect freebies and creator relationships.",
    href: "/blog/lhf-influencer",
  },
  {
    title: "3 marketing campaigns that deserved a standing ovation in July 2025",
    excerpt: "See our favourite standout ad campaigns in July 2025 — from Canva's clever billboards to ASOS' scroll-stopping Reels — that prove bold marketing still cuts through the noise.",
    href: "/blog/best-campaigns-july-2025",
  },
  {
    title: "How businesses can boost sales with the 2025 Google Ads updates",
    excerpt: "Discover how the 2025 Google Ads updates (ads in AI search overviews, immersive shopping formats, and more) are reshaping digital marketing, and how your brand can benefit.",
    href: "/blog/google-ads-2025",
  },
  {
    title: "Google vs. TikTok: The Changing Face of SEO",
    excerpt: "Traditional SEO has changed, and TikTok has become a serious search tool. Here, we explain what this means for your brand.",
    href: "/blog/google-vs-tiktok",
  },
  {
    title: "TikTok Ads size guide: sizes and specs for 2025",
    excerpt: "Here, we break down the different kinds of TikTok ads, their lengths, their aspect ratios, and other important details you need to know.",
    href: "/blog/tiktok-ads-guide",
  },
  {
    title: "Hiring a digital marketing agency vs. an in-house team",
    excerpt: "Should a well-established agency take the reins of your digital marketing, or is building an in-house team better?",
    href: "/blog/agency-vs-inhouse",
  },
];

const Blog = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="heading-display text-5xl md:text-6xl text-center text-primary mb-16">
            Blog
          </h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {blogPosts.map((post) => (
              <Card key={post.title} className="border-0 bg-muted hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                    <Link to={post.href}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
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
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
