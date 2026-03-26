import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ClientLogoStrip } from "@/components/services/ClientLogoStrip";
import { InlineCaseStudy } from "@/components/services/InlineCaseStudy";
import { TestimonialBlock } from "@/components/services/TestimonialBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkflowGrid } from "@/components/services/WorkflowGrid";
import { Check, X, ArrowRight, Lightbulb, Video, Film, Settings, MessageCircle, Megaphone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const service = servicesData["tiktok-production"];
const baseUrl = "https://trapezemedia.com";

const tiktokServices = [
  { icon: Lightbulb, title: "Pre-Production", description: "Strategy, scripting, storyboarding, and creative direction for every piece of TikTok content." },
  { icon: Video, title: "Production", description: "On-location filming with professional equipment, capturing authentic, platform-native content." },
  { icon: Film, title: "Post-Production", description: "Editing, captioning, sound design, and thumbnail creation optimised for TikTok's algorithm." },
  { icon: Settings, title: "Account Management", description: "Daily posting, community engagement, comment responses, and trend monitoring." },
  { icon: MessageCircle, title: "Engagement", description: "Building loyal communities through authentic interaction and creator collaborations." },
  { icon: Megaphone, title: "Ads & Influencers", description: "Paid amplification via Spark Ads, In-Feed, and managed influencer partnerships." },
];

const workflowSteps = [
  { number: 1, title: "Pre-Production", description: "Strategy development, scripting, storyboarding, location scouting, and creative direction. We plan every detail before cameras roll." },
  { number: 2, title: "Production", description: "On-location filming with professional equipment. We capture authentic, platform-native content that resonates with TikTok audiences." },
  { number: 3, title: "Post-Production", description: "Editing, captioning, sound design, colour grading, and thumbnail creation. Every video is optimised for TikTok's algorithm." },
  { number: 4, title: "Publication", description: "Strategic scheduling, hashtag research, community engagement, and performance monitoring. We publish at optimal times and nurture every post." },
];

const TikTokProductionPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`${baseUrl}/services/tiktok-production`} />
      </Helmet>
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="TikTok Marketing"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/tiktok-production`}
      />
      <FAQSchema faqs={service.faqs} />

      {/* Hero */}
      <ServiceHero
        variant="brand-pink"
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      {/* 6-service icon grid */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Our TikTok Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tiktokServices.map((svc) => (
              <Card key={svc.title} className="border-0 bg-background">
                <CardContent className="p-6">
                  <svc.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="heading-display text-xl text-foreground mb-3">{svc.title}</h3>
                  <p className="text-muted-foreground text-base">{svc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study — Michael Emmett */}
      <InlineCaseStudy
        variant="dark"
        label="TikTok · Case Study"
        clientName="Michael Emmett"
        headline="1.5 Million Views in Three Months"
        body={
          <div>
            <p className="mb-4">Over three months we helped recovering addict and reformed naughty boy Michael Emmett share his story and promote his book, Sins of Fathers — starting from a brand new TikTok account.</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Shot and edited new content with subtitles and thumbnails</li>
              <li>Edited existing footage into TikTok formats</li>
              <li>Atomised content across other social platforms</li>
              <li>Created landing pages and a LinkTree</li>
              <li>Managed comments to nurture a loyal community</li>
              <li>Achieved all of this in just five months</li>
              <li>Mentored Michael in continued TikTok use as exit strategy</li>
            </ul>
          </div>
        }
        stats={[
          { value: "1.5M", label: "Views · In three months from zero" },
          { value: "14,000", label: "Followers · And 43,000+ video likes" },
          { value: "1,700", label: "Link clicks · Including 1,100+ to Amazon" },
        ]}
      />

      {/* Case Study — Caravanserai Brighton */}
      <InlineCaseStudy
        variant="light"
        label="TikTok & Social · Case Study"
        clientName="Brighton Fringe / Caravanserai"
        headline="Our TikTok Work: Caravanserai Brighton"
        body="Caravanserai — an immersive pop-up festival inside a weird little world of rusty trailers and eclectic entertainers — became part of the Brighton Fringe line-up in 2023. During the lead-up and first week, we were making the build crew do TikTok dances, flying drones, posting about hundreds of events, interviewing Caravanserai's creator, and curating hundreds of bits of UGC. We posted hundreds of pieces of content over the month — videos, graphics, schedule posts, carousels, fun copy, and loads of TikToks and Reels scoring tens of thousands of plays."
        stats={[]}
        visualSlot={
          <div className="bg-background rounded-2xl flex items-center justify-center min-h-[300px] border border-border">
            <span className="text-xs text-muted-foreground text-center p-4">[Brighton Fringe / Caravanserai imagery]</span>
          </div>
        }
      />

      {/* Workflow Grid */}
      <WorkflowGrid heading="Our TikTok Workflow" steps={workflowSteps} columns={4} />

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

      {/* Features */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.features.map((f, i) => (
              <Card key={i} className="border-0 bg-background">
                <CardContent className="p-6">
                  <h3 className="heading-display text-xl text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-base">{f.description}</p>
                </CardContent>
              </Card>
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

export default TikTokProductionPage;
