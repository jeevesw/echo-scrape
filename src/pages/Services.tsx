import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

// Service images
import socialMediaImg from "@/assets/services/social-media-management.webp";
import paidAdsImg from "@/assets/services/paid-advertising.webp";
import emailMarketingImg from "@/assets/services/email-marketing.webp";
import creativeImg from "@/assets/services/creative-services.webp";
import tiktokImg from "@/assets/services/tiktok-production.png";
import websiteImg from "@/assets/services/website-design.jpg";

const services = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description: "Creating and managing engaging content, building customer loyalty, converting sales, and sharing detailed reports on campaign performance.",
    image: socialMediaImg,
  },
  {
    slug: "paid-advertising",
    title: "Paid Search, PPC & Social Ads",
    description: "PPC that drives high-intent traffic, converts sales, and generates leads, on Google, YouTube, Meta, TikTok, and beyond.",
    image: paidAdsImg,
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    description: "Strategic email campaigns and automation that drive repeat visits, bookings, and customer loyalty for hospitality brands.",
    image: emailMarketingImg,
  },
  {
    slug: "creative-services",
    title: "Graphic Design & Branding",
    description: "Full-service creative branding solutions: photography, graphic design, video production, and web design.",
    image: creativeImg,
  },
  {
    slug: "tiktok-production",
    title: "TikTok Production & Marketing",
    description: "Your brand on the fastest-growing platform. Content creation, ads management, and influencer outreach driving discovery and engagement.",
    image: tiktokImg,
  },
  {
    slug: "website-design",
    title: "Website Design & Management",
    description: "Engaging responsive websites built on WordPress, Shopify, or Squarespace, designed by social-conscious developers and SEO experts.",
    image: websiteImg,
  },
];

const Services = () => {
  return (
    <Layout>
      <Helmet>
        <title>Digital Marketing Services for Hospitality & Events | Trapeze Media</title>
        <meta 
          name="description" 
          content="Social media management, paid advertising, email marketing, and creative services for UK hospitality, tourism, and events brands. Hyperlocal marketing expertise." 
        />
        <link rel="canonical" href="https://trapezemedia.com/services" />
      </Helmet>

      <section className="py-16 lg:py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Services", href: "/services" },
            ]}
          />

          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground">
                From strategy to execution, we help UK restaurants, hotels, events, and tourism brands 
                reach local audiences through social media, paid advertising, email, and creative content.
              </p>
            </div>
          </ScrollReveal>

          {/* Services Grid - 3 columns with thumbnails */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 100}>
                <Link to={`/services/${service.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-muted">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="heading-display text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 text-base">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-primary font-medium text-base group-hover:underline">
                        Find out more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-content mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
              Let's discuss your goals and find the right approach for your brand. 
              Book a discovery call or take our Paid Ads Readiness Quiz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="hero" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" 
                asChild
              >
                <a 
                  href="https://calendly.com/trapezemedia/discovery-call" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </Button>
              <Button 
                variant="hero-outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" 
                asChild
              >
                <Link to="/paid-ads-quiz">
                  Take the Paid Ads Quiz
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
