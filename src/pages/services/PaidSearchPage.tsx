import { Helmet } from "react-helmet-async";
import { TeamSection } from "@/components/services/TeamSection";
import { getTeamForService } from "@/data/teamData";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import paidSearchHero from "@/assets/services/paid-search.jpg";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { InlineCaseStudy } from "@/components/services/InlineCaseStudy";
import { TestimonialBlock } from "@/components/services/TestimonialBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, BarChart3, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrackingCallout } from "@/components/services/TrackingCallout";

const service = servicesData["paid-search"];
const baseUrl = "https://trapezemedia.co.uk";

const serviceCards = [
  {
    icon: Search,
    title: "Precisely-Picked Keywords",
    description: "Your search ads targeted towards high-intent, traffic-driving keywords to maximise ROAS.",
  },
  {
    icon: BarChart3,
    title: "Smart, Strategic Ad Bidding",
    description: "We optimise PPC bids for the best ROI, balancing cost-per-click with acquisition value.",
  },
  {
    icon: FileText,
    title: "Landing Page Optimisation",
    description: "Our designers can help build high-converting landing pages for PPC campaigns.",
  },
  {
    icon: MapPin,
    title: "Reporting & Refining Ad Performance",
    description: "We monitor, report on, and fine-tune ads, strengthening campaigns and sharing insights on performance.",
  },
];

const PaidSearchPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`${baseUrl}/services/paid-search`} />
      </Helmet>
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="Paid Search Advertising"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/paid-search`}
      />
      <FAQSchema faqs={service.faqs} />

      {/* 1 — HERO */}
      <ServiceHero
        variant="brand-pink"
        backgroundImage={paidSearchHero}
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "View Case Studies", href: "/case-studies" }}
        breadcrumbItems={[
          { label: "Services", href: "/services" },
          { label: "Paid Search", href: "/services/paid-search" },
        ]}
      />

      {/* Client logo carousel — directly below hero */}
      <ClientLogoCarousel />

      {/* 2 — INTRO */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-4xl">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      {/* TRACKING CALLOUT */}
      <TrackingCallout />

      {/* 3 — OUR PPC SERVICES (card grid matching paid ads page) */}
      <section className="bg-muted pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">
            Our Paid Search Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {serviceCards.map((item) => (
              <Card key={item.title} className="border-0 shadow-none bg-background">
                <CardContent className="p-6 md:p-8">
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="heading-display text-lg text-primary mb-3">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — CASE STUDY — Coppa Club (parallax hero style) */}
      <section className="relative overflow-hidden min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/99bb98a7-88f7-4295-87df-ead4bb1b64da/Various+Eateries.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

        <div className="container-content mx-auto px-4 relative z-10 py-20">
          <ScrollReveal>
            <p className="text-xs tracking-widest uppercase text-white/60 mb-2">Google Ads · Case Study</p>
            <h2 className="heading-display text-4xl md:text-5xl text-white mb-4">
              Driving Restaurant Visits and Bookings
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8">
              Restaurant group Various Eateries — who count Coppa Club, Noci, and Tavolino among their 13 venues — approached us to increase footfall and bookings using Google Ads. These results are across 13 Coppa Club sites in England and Wales.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { number: "85%", label: "Increase · Table bookings" },
                { number: "13:1", label: "ROAS · £13 per £1 spent" },
                { number: "68%", label: "Lower CPA · Cost per click" },
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

          <ScrollReveal delay={200}>
            <Button variant="hero" asChild>
              <Link to="/case-studies/various-eateries">
                Read the Full Case Study →
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* 5 — TESTIMONIAL */}
      <TestimonialBlock
        quote="We provided a challenging brief: reduce overall ad spend, lower our CPA, and increase tracked visits and confirmed bookings. The team at Trapeze not only managed this but were able to find new and innovative ways for us to track our results end-to-end, and present findings in a way that the wider VEL team could understand and buy into. Working with Ash and Dani on this project has been great and I'd recommend Trapeze Media to anyone that's looking to improve their paid ads performance."
        attribution="Steve Roberts"
        role="Digital Marketing Director, Various Eateries"
        ctaLabel="Book a Meeting"
        ctaHref="https://calendly.com/trapezemedia/discovery-call"
      />

      {/* 6 — WHAT'S INCLUDED */}
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

      {/* 7 — INDUSTRIES */}
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
      <TeamSection serviceName="Paid Search" memberNames={getTeamForService("paid-search")} />

      {/* 8 — FAQs */}
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

      {/* 9 — CLOSING CTA */}
      <section className="bg-muted relative overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">{service.ctaHeadline}</h2>
          <p className="text-lg text-muted-foreground mb-8">{service.ctaText}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" asChild>
              <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaidSearchPage;
