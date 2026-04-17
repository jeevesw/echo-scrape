import { Helmet } from "react-helmet-async";
import { TeamSection } from "@/components/services/TeamSection";
import { getTeamForService } from "@/data/teamData";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import { InlineCaseStudy } from "@/components/services/InlineCaseStudy";
import { TrustBadgeRow } from "@/components/services/TrustBadgeRow";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Smartphone, ShoppingCart, Palette, Search, Share2, Settings, Server, BarChart } from "lucide-react";
import websiteHeroImg from "@/assets/services/website-design-hero.webp";
import outsideOrgMockup from "@/assets/services/outside-org-mockup.webp";
import hepburnsMockup from "@/assets/services/hepburns-mockup.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const service = servicesData["website-design"];
const baseUrl = "https://trapezemedia.co.uk";

const websiteFeatures = [
  { icon: Smartphone, title: "Fully Responsive", description: "Every site offers an optimised experience on phones, tablets, and desktops—responsive to all screen sizes." },
  { icon: ShoppingCart, title: "Online Shops", description: "Sell products, services, subscriptions, and appointments via integrated e-commerce and booking systems." },
  { icon: Palette, title: "On-Brand Design", description: "Our designers ensure your site reflects your visual identity—fonts, colours, textures, and tone of voice." },
  { icon: Search, title: "SEO Optimised", description: "Technical SEO, meta tags, structured data, and content optimisation built in from the start." },
  { icon: Share2, title: "Social Integration", description: "Feed embeds, share buttons, and landing pages optimised for traffic from social campaigns." },
  { icon: Settings, title: "Ongoing Management", description: "Content updates, security patches, performance monitoring, and technical support as needed." },
  { icon: Server, title: "Hosting & Email Addresses", description: "Domain registration, DNS configuration, SSL certificates, and professional email setup included." },
  { icon: BarChart, title: "Analytics & Tracking", description: "Google Analytics, conversion tracking, and performance monitoring set up from day one." },
];

const WebsiteDesignPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`${baseUrl}/services/website-design`} />
      </Helmet>
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="Website Design"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/website-design`}
      />
      <FAQSchema faqs={service.faqs} />

      {/* Hero */}
      <ServiceHero
        variant="brand-pink"
        backgroundImage={websiteHeroImg}
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        breadcrumbItems={[
          { label: "Services", href: "/services" },
          { label: "Website Design", href: "/services/website-design" },
        ]}
      />

      {/* 8-feature icon grid */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {websiteFeatures.map((f) => (
              <Card key={f.title} className="border-0 bg-background">
                <CardContent className="p-6">
                  <f.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="heading-display text-lg text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study — Read & Co. */}
      <InlineCaseStudy
        variant="light"
        clientName="Read & Co."
        headline="Web Redesign, Development, and SEO for Online Bookshop Read & Co."
        body="Read & Co., a half-century-old UK-based bookseller and publisher, needed a modern way to sell literary classics. We built a fast, accessible website around their impressive catalogue — rendered entirely in live text for SEO and mobile performance, with clickable titles and author names under every book cover and bespoke drag-and-drop sections that let the team update pages without touching code. On the back end, we streamlined their industry-standard book database and freed their product library to connect with third-party publishing data streams."
        stats={[
          { value: "+300%", label: "Keyword presence" },
          { value: "90%", label: "Faster load times" },
          { value: "+200%", label: "Internal links" },
        ]}
        visualSlot={
          <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center border border-border">
            <span className="text-xs text-muted-foreground text-center p-4">[Read & Co. website mockup]</span>
          </div>
        }
      />

      {/* Case Study — The Outside Organisation */}
      <InlineCaseStudy
        variant="dark"
        bgColor="#030306"
        compact
        clientName="The Outside Organisation"
        headline="Big, Bold, and Bright: For The Outside Organisation"
        body="We built a bespoke WordPress website for music marketing agency The Outside Organisation, with a full-bleed front-page space for eye-catching videos, vibrant animations, and a simple user experience. The site build — and the logo we designed for it — tied up a broader rebrand for The Outside Organisation."
        stats={[]}
        visualSlot={
          <img
            src={outsideOrgMockup}
            alt="The Outside Organisation website shown across MacBook, iPad, and iPhone"
            className="w-full h-auto rounded-2xl"
            loading="lazy"
          />
        }
      />

      {/* Case Study — Hepburns */}
      <InlineCaseStudy
        variant="light"
        bgColor="#ffffff"
        visualPosition="left"
        clientName="Hepburns"
        headline="E-Commerce for Christmas: Hepburns"
        body="We started working on a new website for food and butcher business Hepburns fairly late in the year, and had it wrapped up — and integrated with their existing product management system — ahead of the Christmas rush. The site we delivered is easy for the Hepburns team to keep up to date, which is essential for on-the-fly inventory management."
        stats={[]}
        visualSlot={
          <img
            src={hepburnsMockup}
            alt="Hepburns e-commerce website shown across MacBook, iPad, and iPhone"
            className="w-full h-auto rounded-2xl"
            loading="lazy"
          />
        }
      />

      {/* Trust Badge Row */}
      <TrustBadgeRow
        variant="brand-pink"
        badges={[
          { label: "WordPress Experts" },
          { label: "Shopify Experts" },
          { label: "Squarespace Circle Member" },
        ]}
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
      <TeamSection serviceName="Website Design" memberNames={getTeamForService("website-design")} />

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

export default WebsiteDesignPage;
