import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
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

const service = servicesData["social-media-management"];
const baseUrl = "https://trapezemedia.com";

const objections = [
  {
    question: "My follower growth and engagement are low — is social media worth it?",
    answer: "There are hundreds of factors influencing performance: time of day, posting frequency, hashtags, legibility. We find the intersection that brings your online presence to life and turns your brand appeal into a science.",
  },
  {
    question: "My following is growing but not converting to sales — why?",
    answer: "A 'user journey' is the path between seeing your content and buying. We audit and evolve your current approach to re-engage repeat customers and strengthen the path from scroll to sale.",
  },
  {
    question: "I don't have time for social media and need my staff focused on their jobs.",
    answer: "With clearly-defined goals and an agency behind you, social can integrate into daily operations with minimal effort. We create a messaging group where creative ideas are exchanged instantly — you stay in the loop without being in the weeds.",
  },
];

const SocialMediaManagementPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
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

      {/* Breadcrumb + Hero */}
      <section className="bg-primary pt-8 pb-0">
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            variant="light"
            items={[
              { label: "Services", href: "/services" },
              { label: "Social Media Management", href: "/services/social-media-management" },
            ]}
          />
        </div>
      </section>
      <ServiceHero
        variant="brand-pink"
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      {/* Summary */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">{service.summary}</p>
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Common Questions</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {objections.map((obj, i) => (
              <Card key={i} className="border-0 bg-muted">
                <CardContent className="p-6">
                  <h3 className="heading-display text-lg text-foreground mb-4">{obj.question}</h3>
                  <p className="text-muted-foreground text-base">{obj.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best For / Not For */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 bg-background">
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
            <Card className="border-0 bg-background">
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
      <section className="py-16 bg-background">
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

      {/* Case Study — Fitz */}
      <InlineCaseStudy
        variant="light"
        label="Social Media Management · Case Study"
        clientName="Fitz Sparkling Wine"
        headline="2,419 New Followers in Two Months"
        body="English sparkling wine brand Fitz needed a social presence that matched their bold, rebellious personality. Our #PerfectDayOutIn campaign put the spotlight on things people could enjoy from home — movies, theatre livestreams, virtual museum tours — all with a glass of Fitz in hand. We kept Fitz culturally relevant throughout lockdown, built a loyal community, and created a content bank that lasted months."
        stats={[
          { value: "2,419", label: "New followers · Gained 100% organically" },
          { value: "6,273", label: "People engaged · Over two months" },
          { value: "100+", label: "Pieces of content · From one shoot day" },
        ]}
      />

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
