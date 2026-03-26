import { Helmet } from "react-helmet-async";
import { TeamSection } from "@/components/services/TeamSection";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const service = servicesData["website-design"];
const baseUrl = "https://trapezemedia.com";

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
        variant="dark"
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

      {/* Case Study — The Outside Organisation */}
      <InlineCaseStudy
        variant="dark"
        clientName="The Outside Organisation"
        headline="Big, Bold, and Bright: For The Outside Organisation"
        body="We built a bespoke WordPress website for music marketing agency The Outside Organisation, with a full-bleed front-page space for eye-catching videos, vibrant animations, and a simple user experience. The site build — and the logo we designed for it — tied up a broader rebrand for The Outside Organisation."
        stats={[]}
        visualSlot={
          <div className="bg-white/10 rounded-2xl aspect-[4/3] flex items-center justify-center border border-white/10">
            <span className="text-xs text-white/40 text-center p-4">[The Outside Organisation website mockup]</span>
          </div>
        }
      />

      {/* Case Study — Hepburns */}
      <InlineCaseStudy
        variant="light"
        clientName="Hepburns"
        headline="E-Commerce for Christmas: Hepburns"
        body="We started working on a new website for food and butcher business Hepburns fairly late in the year, and had it wrapped up — and integrated with their existing product management system — ahead of the Christmas rush. The site we delivered is easy for the Hepburns team to keep up to date, which is essential for on-the-fly inventory management."
        stats={[]}
        visualSlot={
          <div className="bg-muted rounded-2xl aspect-[4/3] flex items-center justify-center border border-border">
            <span className="text-xs text-muted-foreground text-center p-4">[Hepburns e-commerce website mockup]</span>
          </div>
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

      {/* Best For / Not For */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 bg-muted">
              <CardContent className="p-8">
                <h2 className="heading-display text-2xl md:text-3xl text-foreground mb-6 flex items-center gap-3">
                  <Check className="h-7 w-7 text-primary" /> Best For
                </h2>
                <ul className="space-y-4">
                  {service.bestFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-foreground text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 bg-muted">
              <CardContent className="p-8">
                <h2 className="heading-display text-2xl md:text-3xl text-foreground mb-6 flex items-center gap-3">
                  <X className="h-7 w-7 text-muted-foreground" /> Not For
                </h2>
                <ul className="space-y-4">
                  {service.notFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                      <span className="text-muted-foreground text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Our Process</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {service.process.map((step) => (
              <div key={step.step} className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center heading-display text-xl shrink-0">
                  {step.step}
                </div>
                <div className="pt-2">
                  <h3 className="heading-display text-xl md:text-2xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <TeamSection serviceName="Website Design" />

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
