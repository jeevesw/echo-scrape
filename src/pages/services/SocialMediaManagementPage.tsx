import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import { TestimonialBlock } from "@/components/services/TestimonialBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenLine, Share2, Mic, MessageCircle, Target, Trophy, Users, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TeamSection } from "@/components/services/TeamSection";
import { getTeamForService } from "@/data/teamData";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import heroImage from "@/assets/services/social-media-management.jpg";


const service = servicesData["social-media-management"];
const baseUrl = "https://trapezemedia.co.uk";

const servicesGrid = [
  { icon: PenLine, title: "Content Creation", description: "Our copywriters, photographers, filmmakers, and designers will produce the content that will become the figureheading visuals for your social feeds and campaigns" },
  { icon: Share2, title: "Content Curation", description: "User-generated content is not to be overlooked — we can re-share posts from your followers and other brands in your industry, showcasing your product as an established consumer favourite" },
  { icon: Mic, title: "Brand Voice", description: "We'll identify, distill, and adapt your brand voice, creating a consistent tone through copy and visual motifs, and evolving that tone to work effectively across a variety of social campaigns" },
  { icon: MessageCircle, title: "Follower Engagement", description: "We'll keep existing followers engaged with regular conversations, and track relevant hashtags and topics to find new people to spark discussions with, all with your brand at the forefront" },
  { icon: Target, title: "Creative Campaigns", description: "We can plan strategic social media campaigns around your specific business goals, e.g. raising awareness of new products, targeting certain demographics, and selling out events" },
  { icon: Trophy, title: "Creative Competitions", description: "Giveaways can be a core part of any successful social media campaign. We'll manage competitions, engage with entrants, and find ways to collect customer data for later retargeting" },
  { icon: Users, title: "User Journey", description: "Where you lead your followers after they see your content dictates how you'll convert them to customers. We'll ensure your user journey is simple, discoverable, and focused on key goals" },
  { icon: FileText, title: "Monthly Reports", description: "We prepare reports at the end of every month detailing the successes of our work, and highlighting how we'll continue to support your key goals and campaigns in the following month" },
];


const SocialMediaManagementPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta property="og:image" content={heroImage} />
        <link rel="canonical" href={`${baseUrl}/services/social-media-management`} />
      </Helmet>
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="Social Media Management"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/social-media-management`}
      />
      <FAQSchema faqs={service.faqs} />

      {/* Hero */}
      <ServiceHero
        variant="brand-pink"
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        backgroundImage={heroImage}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        breadcrumbItems={[
          { label: "Services", href: "/services" },
          { label: "Social Media Management", href: "/services/social-media-management" },
        ]}
      />

      {/* Logo Carousel */}
      <ClientLogoCarousel />

      {/* Summary */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-4xl">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">{service.summary}</p>
          </div>
        </div>
      </section>

      {/* Our Social Media Management Services */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Our Social Media Management Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {servicesGrid.map((f, i) => (
              <Card key={i} className="border-0 bg-background text-center">
                <CardContent className="p-6">
                  <f.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="heading-display text-lg text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-base">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Results We've Delivered</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                category: "Google, Meta & YouTube Ads",
                title: "Growing Brand Demand and Footfall for Paris Baguette",
                image: "/images/case-studies/paris-baguette-hero.jpg",
                href: "/case-studies/paris-baguette",
              },
              {
                category: "Google & Meta Ads",
                title: "Driving footfall and orders for YO! Sushi",
                image: "/images/case-studies/yo-sushi-hero.jpg",
                href: "/case-studies/yo-sushi",
              },
              {
                category: "Social Media Management · Video Production",
                title: "Organic Social Media and Video Production for Patty&Bun",
                image: "/images/case-studies/patty-and-bun-hero.jpg",
                href: "/case-studies/patty-and-bun",
              },
            ].map((study, i) => (
              <ScrollReveal key={study.title} delay={i * 100}>
                <Link to={study.href}>
                  <Card variant="interactive" className="overflow-hidden bg-background">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <span className="heading-display text-sm text-primary">{study.category}</span>
                      <h3 className="heading-display text-xl text-foreground mt-2">{study.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <TestimonialBlock
        quote="Since our first meeting with Trapeze Media, we have been very impressed with the approach they bring to our social media management. They combine a talent for creative flair with an excellent understanding of the analytical side to deliver powerful results. I would have no hesitation in recommending."
        attribution="Dan Cahill"
        role="Managing Director, Divergent Drinks / Fitz Wine"
      />

      {/* Industries */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl text-foreground mb-8">Industries We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {service.industries.map((ind, i) => (
              <span key={i} className="px-5 py-3 bg-muted rounded-full text-foreground text-base">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <TeamSection serviceName="Social Media Management" memberNames={getTeamForService("social-media-management")} />

      {/* FAQs */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-xl px-6 border-0">
                  <AccordionTrigger className="hover:no-underline text-left py-5">
                    <span className="heading-display text-foreground text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-4xl md:text-5xl mb-6">{service.ctaHeadline}</h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8">{service.ctaText}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Call <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="hero-outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SocialMediaManagementPage;
