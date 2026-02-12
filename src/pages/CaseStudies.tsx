import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    category: "Search & Social Campaign",
    title: "That turned a trial product into a permanent fixture",
    description: "We launched YO!'s Furi Furi Chicken with a TikTok-led campaign that drove sales, footfall, and click-and-collect, scoring 1M+ views in week one.",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/548b0dbb-33d2-49b0-a0fc-5c8bf23c0423/Untitled+design+%282%29.png",
    href: "/case-studies/yo-sushi",
  },
  {
    category: "Organic Brand-Building",
    title: "For fine-dining lobster legends: Molo",
    description: "Seafood spot Molo brought Trapeze Media on board to increase engagement, drive more visits, and get more creators and influencers sharing content.",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/982e5abf-509a-4b09-8865-870bd57d0986/Trapeze-Media-Molo-Lobster.jpg",
    href: "/case-studies/molo",
  },
  {
    category: "Video Production",
    title: "Planning, shooting, and editing 100+ social media videos for BrightonSEO",
    description: "We spent two months planning our shoot, shot on-site for two days, and edited for two weeks, creating 100+ videos for TikTok, Reels, and Shorts.",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/9c75c044-68b5-47a2-99fd-31b07ad45154/Trapeze-Media-Brighton-SEO-Digital-Marketing-TikTok-Video-Production.jpg",
    href: "/case-studies/brightonseo",
  },
  {
    category: "Google Ads",
    title: "Increasing bookings for Various Eateries",
    description: "Driving restaurant reservations and footfall through strategic paid search campaigns across multiple venues.",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/99bb98a7-88f7-4295-87df-ead4bb1b64da/Various+Eateries.jpg",
    href: "/case-studies/various-eateries",
  },
  {
    category: "Lead Generation",
    title: "Engaging Gen-Z audience for Maximiles",
    description: "Creating compelling campaigns to attract younger audiences to the rewards platform.",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/26c441b3-74f9-403a-b929-8af51bba0619/Maximiles-Paid-Ads-by-Trapeze-Media.jpg",
    href: "/case-studies/maximiles",
  },
  {
    category: "Crowdfunder Lead Generation",
    title: "Raising half-a-million for board game Mycelia",
    description: "We worked with the board game Mycelia on their Kickstarter campaign, smashing their funding target by 6,000%.",
    image: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1711555599572-XAE74WRQ55SCVSPWVT7I/Mycelia-Case-Study-Trapeze-Media.jpg",
    href: "/case-studies/mycelia",
  },
];

const CaseStudies = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="heading-display text-5xl md:text-6xl text-center text-primary mb-16">
            Case Studies
          </h1>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {caseStudies.map((study) => (
              <Link key={study.title} to={study.href} className="group">
                <Card className="overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-7 flex flex-col flex-1">
                    <span className="heading-display text-sm text-primary uppercase tracking-wide">
                      {study.category}
                    </span>
                    <h3 className="heading-display text-2xl text-foreground mt-2 mb-3 leading-tight group-hover:text-primary transition-colors duration-300 uppercase">
                      {study.title}
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
