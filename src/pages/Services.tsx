import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Target, Mail, Palette, Globe, Video } from "lucide-react";

const services = [
  {
    id: "social",
    title: "Social Media Management",
    description: "We create, curate, and manage content across all your social platforms to build engagement and grow your audience organically.",
    icon: Megaphone,
    features: [
      "Content strategy and planning",
      "Daily posting and community management",
      "Engagement and growth tactics",
      "Analytics and reporting",
    ],
  },
  {
    id: "paid-ads",
    title: "Paid Advertising",
    description: "Strategic paid campaigns across Facebook, Instagram, TikTok, Google, YouTube, and LinkedIn to reach your ideal customers.",
    icon: Target,
    features: [
      "Campaign strategy and setup",
      "Audience research and targeting",
      "A/B testing and optimization",
      "Performance tracking and ROI analysis",
    ],
  },
  {
    id: "email",
    title: "Email Marketing",
    description: "Build lasting relationships with your customers through strategic email campaigns that drive engagement and conversions.",
    icon: Mail,
    features: [
      "Email strategy and automation",
      "Newsletter design and copywriting",
      "Segmentation and personalization",
      "Deliverability optimization",
    ],
  },
  {
    id: "creative",
    title: "Creative Services",
    description: "From photography and videography to graphic design, we create compelling visual content that tells your brand story.",
    icon: Palette,
    features: [
      "Social media creative",
      "Video production",
      "Photography",
      "Brand guidelines and assets",
    ],
  },
  {
    id: "web",
    title: "Website Design & Management",
    description: "Beautiful, conversion-optimized websites that represent your brand and drive business results.",
    icon: Globe,
    features: [
      "Website design and development",
      "SEO optimization",
      "Conversion rate optimization",
      "Ongoing maintenance and updates",
    ],
  },
  {
    id: "video",
    title: "Video Production",
    description: "Professional video content for social media, advertising, and brand storytelling.",
    icon: Video,
    features: [
      "Short-form social content",
      "Promotional videos",
      "Event coverage",
      "Editing and post-production",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="heading-display text-5xl md:text-6xl text-center text-primary mb-6">
            Our Services
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            From strategy to execution, we provide comprehensive digital marketing services that help your brand reach new audiences and achieve measurable results.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {services.map((service) => (
              <Card 
                key={service.id} 
                id={service.id}
                className="border-0 bg-muted hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="heading-display text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-4xl mb-6">
            Ready to Grow Your Brand?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Let's discuss how we can help you reach new audiences and achieve your marketing goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <a 
                href="https://calendly.com/trapezemedia/discovery-call" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Schedule a Call
              </a>
            </Button>
            <Button variant="hero-outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
