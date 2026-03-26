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
import { Check, X, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const service = servicesData["paid-search"];
const baseUrl = "https://trapezemedia.com";

const hyperlocalRows = [
  { label: "Precisely-Picked Keywords", description: "Your search ads targeted towards high-intent, traffic-driving keywords to maximise ROAS." },
  { label: "Smart, Strategic Ad Bidding", description: "We optimise PPC bids for the best ROI, balancing cost-per-click with acquisition value." },
  { label: "Landing Page Optimisation", description: "Our designers can help build high-converting landing pages for PPC campaigns." },
  { label: "Reporting & Refining Ad Performance", description: "We monitor, report on, and fine-tune ads, strengthening campaigns and sharing insights on performance." },
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

      {/* Hero */}
      <ServiceHero
        variant="split"
        eyebrow="Google Ads"
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "View Case Studies", href: "/case-studies" }}
        breadcrumbItems={[
          { label: "Services", href: "/services" },
          { label: "Paid Search", href: "/services/paid-search" },
        ]}
        visualSlot={
          <div className="space-y-4">
            {/* Google Ad mockups placeholder */}
            <div className="bg-muted rounded-xl p-6 border border-border">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Sponsored</div>
              <div className="text-primary font-semibold text-lg mb-1">Your Restaurant Name | Book a Table Today</div>
              <div className="text-sm text-muted-foreground mb-1">www.your-restaurant.co.uk</div>
              <div className="text-sm text-foreground">Award-winning dining in the heart of London. Reserve your table online with instant confirmation. Open 7 days.</div>
            </div>
            <div className="bg-muted rounded-xl p-6 border border-border">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Sponsored</div>
              <div className="text-primary font-semibold text-lg mb-1">Best Brunch Near Me | Weekend Bookings Open</div>
              <div className="text-sm text-muted-foreground mb-1">www.your-venue.co.uk</div>
              <div className="text-sm text-foreground">Bottomless brunch from £35pp. Live DJ, sharing plates, unlimited prosecco. Book now — limited availability.</div>
            </div>
          </div>
        }
      />

      {/* Summary + Logos */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 max-w-6xl mx-auto items-center">
            <div>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">{service.summary}</p>
              <Button variant="hero" asChild>
                <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </a>
              </Button>
            </div>
            <ClientLogoStrip
              heading="Brands we've worked with"
              logos={[
                { name: "Warner Bros. Discovery", imageSrc: "/images/clients/warner-bros-discovery.svg" },
                { name: "Various Eateries", imageSrc: "/images/clients/various-eateries.svg" },
                { name: "YO! Sushi", imageSrc: "/images/clients/yo-sushi.svg" },
                { name: "Patty & Bun", imageSrc: "/images/clients/patty-and-bun.svg" },
                { name: "Radisson Hotels", imageSrc: "/images/clients/radisson-hotels.svg" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Hyperlocal PPC */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
                Hyperlocal PPC Strategies
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                As well as campaigns targeting wide areas, we run tightly-focused hyperlocal Google Ads which reach the right people in specific locations — for local businesses and online shops.
              </p>
              <div className="space-y-6">
                {hyperlocalRows.map((row) => (
                  <div key={row.label} className="grid md:grid-cols-[180px_1fr] gap-4 items-start">
                    <span className="heading-display text-base text-primary">{row.label}</span>
                    <p className="text-muted-foreground text-base">{row.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background rounded-2xl flex items-center justify-center min-h-[400px]">
              <span className="text-xs text-muted-foreground text-center p-4">[Google search results / phone mockup]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study — Various Eateries */}
      <InlineCaseStudy
        variant="dark"
        label="Google Ads · Case Study"
        clientName="Various Eateries"
        headline="Driving Restaurant Visits and Bookings"
        body="Restaurant group Various Eateries — who count Coppa Club, Noci, and Tavolino among their 13 venues — approached us to increase footfall and bookings using Google Ads. These results are across 13 Coppa Club sites in England and Wales."
        stats={[
          { value: "85%", label: "Increase · Table bookings through Google Ads" },
          { value: "13:1", label: "ROAS · Average £13 made for every £1 spent" },
          { value: "68%", label: "Lower CPA · Cost per click to book" },
        ]}
        ctaLabel="Read the full case study"
        ctaHref="/case-studies/various-eateries"
      />

      {/* Testimonial */}
      <TestimonialBlock
        quote="We provided a challenging brief: reduce overall ad spend, lower our CPA, and increase tracked visits and confirmed bookings. The team at Trapeze not only managed this but were able to find new and innovative ways for us to track our results end-to-end, and present findings in a way that the wider VEL team could understand and buy into. Working with Ash and Dani on this project has been great and I'd recommend Trapeze Media to anyone that's looking to improve their paid ads performance."
        attribution="Steve Roberts"
        role="Digital Marketing Director, Various Eateries"
        ctaLabel="Book a Meeting"
        ctaHref="https://calendly.com/trapezemedia/discovery-call"
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

export default PaidSearchPage;
