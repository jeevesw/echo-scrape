import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { servicesList } from "@/data/servicesData";
import { ArrowRight } from "lucide-react";

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
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Services", href: "/services" },
            ]}
          />

          <div className="max-w-4xl mb-12">
            <h1 className="heading-display text-5xl md:text-6xl text-primary mb-6">
              Digital Marketing Services for Hospitality & Lifestyle Brands
            </h1>
            <p className="text-xl text-muted-foreground">
              From strategy to execution, we help UK restaurants, hotels, events, and tourism brands 
              reach local audiences through social media, paid advertising, email, and creative content.
            </p>
          </div>

          {/* Positioning statement */}
          <div className="bg-muted rounded-lg p-8 mb-16 max-w-4xl">
            <p className="text-lg text-foreground leading-relaxed">
              <strong className="text-primary">We specialise in hyperlocal marketing</strong>—connecting 
              hospitality and lifestyle brands with the audiences most likely to visit, book, and engage. 
              With over a decade of experience in the UK market, we understand what drives footfall, 
              reservations, and brand loyalty.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 stagger-children">
            {servicesList.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`}>
                <Card className="border-0 bg-muted hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h2 className="heading-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {service.summary.slice(0, 150)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.industries.slice(0, 3).map((industry) => (
                        <span
                          key={industry}
                          className="text-xs px-3 py-1 bg-background rounded-full text-muted-foreground"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-4xl mb-6">
            Not Sure Where to Start?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
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
        </div>
      </section>
    </Layout>
  );
};

export default Services;
