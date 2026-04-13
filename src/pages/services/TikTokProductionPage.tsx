import { Helmet } from "react-helmet-async";
import { TeamSection } from "@/components/services/TeamSection";
import { ParallaxVideo } from "@/components/case-study/ParallaxVideo";
import { getTeamForService } from "@/data/teamData";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import parisBaguetteBg from "@/assets/case-studies/paris-baguette-bg.jpg";
import { ClientLogoStrip } from "@/components/services/ClientLogoStrip";
import { InlineCaseStudy } from "@/components/services/InlineCaseStudy";
import michaelEmmettBg from "@/assets/services/michael-emmett-tiktok.webp";
import videoProductionHero from "@/assets/services/video-production.jpg";
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
import { useCountUp } from "@/hooks/use-count-up";

const service = servicesData["tiktok-production"];
const baseUrl = "https://trapezemedia.co.uk";

const tiktokServices = [
  { icon: Lightbulb, title: "Pre-Production", description: "Strategy, scripting, storyboarding, and creative direction for every piece of short-form and long-form piece of content." },
  { icon: Video, title: "Production", description: "On-location filming with professional equipment, capturing authentic, platform-native content." },
  { icon: Film, title: "Post-Production", description: "Editing, captioning, sound design, and thumbnail creation optimised for social algorithms." },
  { icon: Settings, title: "Account Management", description: "Daily posting, community engagement, comment responses, and trend monitoring." },
  { icon: MessageCircle, title: "Engagement", description: "Building loyal communities through authentic interaction and creator collaborations." },
  { icon: Megaphone, title: "Ads & Influencers", description: "Paid amplification via cross-platform video ads and managed influencer partnerships." },
];
// ... keep existing code
      {/* 6-service icon grid */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">OUR VIDEO PRODUCTION SERVICES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
// ... keep existing code
            <ScrollReveal animation="right">
              <div className="space-y-6">
                <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                  PARIS BAGUETTE
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From February to June 2025, we launched hyperlocal ad campaigns across Google and Meta using image-based creative to build initial awareness.
                </p>
                <div className="bg-primary/10 rounded-lg px-4 py-3">
                  <p className="text-foreground font-semibold text-sm">+83% increase in branded searches for "Paris Baguette Canary Wharf" by people in London</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Paris Baguette — What We Delivered */}
      <section className="relative overflow-hidden min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${parisBaguetteBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-white mb-8">
              What We Delivered
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-4">
              {[
                { number: "+83%", label: "Branded search uplift" },
                { number: "+23%", label: "Search demand in month one" },
                { number: "+45%", label: "Google Ads scaled" },
                { number: "+60%", label: "Footfall conversions" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[160px]"
                >
                  <p className="heading-display text-3xl md:text-4xl text-primary font-bold leading-none">{stat.number}</p>
                  <p className="text-xs text-foreground uppercase tracking-wide mt-1 text-center font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Study — Michael Emmett */}
      <section className="relative overflow-hidden min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${michaelEmmettBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

        <div className="relative z-10 flex flex-col justify-end px-8 md:px-16 py-32 max-w-5xl mx-auto">
          <p className="text-white text-xs tracking-widest font-semibold uppercase mb-3">
            TikTok · Case Study
          </p>

          <h2 className="heading-display text-3xl lg:text-5xl text-white leading-tight mb-4">
            1.5 Million Views in Three Months
          </h2>

          <p className="text-white/80 text-lg mb-6 max-w-2xl">
            Over three months we helped recovering addict and reformed naughty boy Michael Emmett share his story and promote his book, <em>Sins of Fathers</em> — starting from a brand new TikTok account.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-background border-2 border-primary rounded-xl px-6 py-4 text-center" ref={viewsRef}>
              <span className="heading-display text-4xl text-primary block">{viewsDisplay}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide mt-1 block">Views · In three months from zero</span>
            </div>
            <div className="bg-background border-2 border-primary rounded-xl px-6 py-4 text-center" ref={followersRef}>
              <span className="heading-display text-4xl text-primary block">{followersDisplay}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide mt-1 block">Followers · And 43,000+ video likes</span>
            </div>
            <div className="bg-background border-2 border-primary rounded-xl px-6 py-4 text-center" ref={clicksRef}>
              <span className="heading-display text-4xl text-primary block">{clicksDisplay}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide mt-1 block">Link clicks · Including 1,100+ to Amazon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Grid */}
      <WorkflowGrid heading="Our TikTok Workflow" steps={workflowSteps} columns={4} />

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
      <TeamSection serviceName="Video Production" memberNames={getTeamForService("tiktok-production")} />

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
