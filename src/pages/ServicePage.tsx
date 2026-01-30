import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData, type ServiceData } from "@/data/servicesData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, ArrowRight, ChevronRight } from "lucide-react";

const ServicePage = () => {
  const { slug } = useParams();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const baseUrl = "https://trapezemedia.com";

  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`${baseUrl}/services/${service.slug}`} />
      </Helmet>
      
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="Digital Marketing"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/${service.slug}`}
      />
      
      <FAQSchema faqs={service.faqs} />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
            ]}
          />

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
              {service.heroHeadline}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {service.heroSubheadline}
            </p>

            <div className="flex flex-wrap gap-4">
              {service.slug === "paid-advertising" ? (
                <Button variant="hero" asChild>
                  <Link to="/paid-ads-quiz">
                    Take the Readiness Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="hero" asChild>
                  <a
                    href="https://calendly.com/trapezemedia/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule a Call
                  </a>
                </Button>
              )}
              <Button variant="hero-outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-lg text-foreground leading-relaxed">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Best For / Not For */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 bg-muted">
              <CardContent className="p-8">
                <h2 className="heading-display text-2xl text-foreground mb-6 flex items-center gap-3">
                  <Check className="h-6 w-6 text-primary" />
                  Best For
                </h2>
                <ul className="space-y-4">
                  {service.bestFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted">
              <CardContent className="p-8">
                <h2 className="heading-display text-2xl text-foreground mb-6 flex items-center gap-3">
                  <X className="h-6 w-6 text-muted-foreground" />
                  Not For
                </h2>
                <ul className="space-y-4">
                  {service.notFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
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
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">
            Our Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {service.process.map((step) => (
                <div key={step.step} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center heading-display text-lg shrink-0">
                    {step.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="heading-display text-xl text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">
            What's Included
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.features.map((feature, index) => (
              <Card key={index} className="border-0 bg-muted">
                <CardContent className="p-6">
                  <h3 className="heading-display text-lg text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl text-foreground mb-8">
            Industries We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {service.industries.map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-background rounded-full text-foreground text-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-muted rounded-lg px-6 border-0"
                >
                  <AccordionTrigger className="hover:no-underline text-left">
                    <span className="heading-display text-foreground">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {service.relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-display text-3xl text-foreground mb-8">
              See Our Work
            </h2>
            <Button variant="hero-outline" asChild>
              <Link to="/case-studies">
                View Case Studies <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-4xl mb-6">
            {service.ctaHeadline}
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            {service.ctaText}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {service.slug === "paid-advertising" ? (
              <Button
                variant="hero"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/paid-ads-quiz">
                  Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
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
            )}
            <Button
              variant="hero-outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePage;
