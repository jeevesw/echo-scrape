import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { VenueVisitsCPAChart } from "@/components/charts/VenueVisitsCPAChart";
import { ArrowLeft, Quote } from "lucide-react";

const VariousEateriesCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Google Pay-Per-Click Ads for Various Eateries: driving restaurant visits and bookings | Trapeze Media</title>
        <meta 
          name="description" 
          content="We drove an 88% increase in table bookings, 12x ROAS, and 92% lower cost-per-visit for restaurant group Various Eateries through strategic Google Ads campaigns." 
        />
        <link rel="canonical" href="https://trapezemedia.com/case-studies/various-eateries" />
      </Helmet>

      {/* Hero Section - Phone mockup cropped at bottom edge */}
      <section className="relative h-[65vh] max-h-[75vh] min-h-[520px] overflow-hidden bg-primary">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

        {/* Breadcrumb at top */}
        <div className="container-content mx-auto px-4 relative z-20 pt-6">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Various Eateries", href: "/case-studies/various-eateries" },
            ]}
            variant="light"
          />
        </div>

        {/* Desktop: two-column layout - full width, no container padding on right */}
        <div className="h-full relative z-10">
          <div className="container-content mx-auto px-4 h-full">
            <div className="grid md:grid-cols-[55%_45%] h-full">
              {/* Left column — text, vertically centred */}
              <div className="flex items-center">
                <ScrollReveal animation="left">
                  <span className="heading-display text-primary-foreground/80 text-lg md:text-xl uppercase tracking-wider mb-4 block">
                    Case Study: Google Pay-Per-Click Ads
                  </span>
                  <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
                    Google Pay-Per-Click Ads for Various Eateries: driving restaurant visits and bookings
                  </h1>
                </ScrollReveal>
              </div>

              {/* Right column — placeholder for grid alignment */}
              <div className="hidden md:block" />
            </div>
          </div>

          {/* Phone absolutely positioned flush to right edge of viewport */}
          <div 
            className="absolute bottom-0 right-0 w-[320px] hidden md:block"
          >
            <img
              src="/images/various-eateries-hero.png"
              alt="Coppa Club Google Ads campaign on mobile"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Mobile: phone centred below text, same crop effect */}
        <div className="md:hidden flex justify-center mt-6 relative z-10">
          <div className="w-[260px]">
            <img
              src="/images/various-eateries-hero.png"
              alt="Coppa Club Google Ads campaign on mobile"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
            <ScrollReveal animation="left">
              <img
                src="/images/various-eateries-intro.webp"
                alt="Coppa Club restaurant interior"
                className="w-[320px] lg:w-[400px] rounded-2xl"
              />
            </ScrollReveal>
            
            <ScrollReveal>
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-primary max-w-4xl leading-relaxed">
                Restaurant group Various Eateries, who count Coppa Club, Noci, and Tavolino among their 13 venues, approached us to increase footfall and bookings using Google Ads.
              </h2>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section - Bold, animated counters */}
      <section className="py-24 bg-muted relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-16">
              Successes
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              <ScrollReveal delay={0}>
                <AnimatedStat 
                  value={85} 
                  suffix="%" 
                  label="increase in table bookings through Google Ads" 
                  delay={0}
                />
              </ScrollReveal>
              
              <ScrollReveal delay={150}>
                <AnimatedStat 
                  value={13} 
                  suffix=":1" 
                  label="ROAS (average £13 made for every £1 spent)" 
                  delay={150}
                  formatValue={(v) => `${v}`}
                />
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <AnimatedStat 
                  value={68} 
                  suffix="%" 
                  label="average lower CPA (cost per clicks to book)" 
                  delay={300}
                />
              </ScrollReveal>
            </div>

            <ScrollReveal animation="right" className="hidden md:block">
              <img
                src="/images/various-eateries-successes.webp"
                alt="Coppa Club paid ads results"
                className="w-[300px] lg:w-[360px] h-auto rounded-l-2xl"
                style={{ marginRight: 'calc(-1 * (100vw - 100%) / 2 - 1rem)' }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Venue Visits Stats */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-center text-foreground mb-16">
              Increasing Venue Visits for Coppa Club
            </h2>
          </ScrollReveal>

          <div className="grid xl:grid-cols-4 gap-8 items-start">
            <ScrollReveal animation="left" className="xl:col-span-3">
              <VenueVisitsCPAChart className="w-full min-h-[450px]" />
            </ScrollReveal>

            <ScrollReveal animation="right" className="xl:col-span-1">
              <div className="grid grid-cols-1 gap-8">
                <div className="text-center p-6 bg-muted rounded-2xl">
                  <AnimatedStat 
                    value={91} 
                    prefix="+" 
                    suffix="%" 
                    label="venue visits" 
                    delay={0}
                  />
                </div>
                
                <div className="text-center p-6 bg-muted rounded-2xl">
                  <AnimatedStat 
                    value={92} 
                    prefix="-" 
                    suffix="%" 
                    label="cost-per-visit" 
                    delay={150}
                  />
                </div>
                
                <div className="text-center p-6 bg-muted rounded-2xl">
                  <AnimatedStat 
                    value={145} 
                    prefix="+" 
                    suffix="%" 
                    label="revenue from venue visits" 
                    delay={300}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story + Tracking Section */}
      <section className="py-24 bg-muted">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="left">
              <div className="space-y-6">
                <h2 className="heading-display text-3xl md:text-4xl text-foreground">
                  Tracking Bookings Back to Acquisition
                </h2>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  We built and ran cross-platform campaigns using{" "}
                  <span className="text-primary font-semibold">
                    specific goal and table-targeted retargeting
                  </span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We deployed a tracking solution which empowered Various Eateries to connect customer contact information from the point of booking back to Google's ad services.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This enables us to create reports which provide reliable stats on ad spend ROI.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Feeding this data back to Google makes our retargeting campaigns far more effective.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="right">
              <img
                src="/images/various-eateries-tracking.png"
                alt="Customer journey tracking from Google Ads to booking"
                className="w-full rounded-2xl shadow-xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative quote marks */}
        <div className="absolute top-12 left-12 opacity-10 rotate-180">
          <Quote className="w-32 h-32" />
        </div>
        <div className="absolute bottom-12 right-12 opacity-10">
          <Quote className="w-32 h-32" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal animation="scale">
            <h2 className="heading-display text-4xl md:text-5xl text-center mb-12">
              Testimonial
            </h2>
            
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
              "After previously dealing with agencies who just 'set it and forget it' on our PPC, the main thing I noticed about Trapeze Media was how responsive and attentive they are. Working with Matt at Coppa for this project was a testament to it. I'd recommend Trapeze Media to anyone that's making their marketing an unforgettable experience."
            </blockquote>
            
            <cite className="block text-center mt-8 text-lg not-italic text-primary-foreground/80">
              — <span className="font-semibold text-primary-foreground">Emma Sherlock</span>, Digital Marketing Manager at Various Eateries
            </cite>
          </ScrollReveal>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-muted">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-center text-foreground mb-12">
              We Work Across All Social Platforms
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              <div className="text-center">
                <div className="h-16 mx-auto mb-3 flex items-center justify-center">
                  <img src="/images/meta-logo.svg" alt="Meta" className="h-10 w-auto" />
                </div>
                <span className="text-sm text-muted-foreground">Meta Ads Manager<br/>Facebook & Instagram</span>
              </div>
              
              <div className="text-center">
                <div className="h-16 mx-auto mb-3 flex items-center justify-center">
                  <img src="/images/google-ads-logo.svg" alt="Google Ads" className="h-14 w-auto" />
                </div>
                <span className="text-sm text-muted-foreground">Google Ads, Search,<br/>YouTube, Display</span>
              </div>
              
              <div className="text-center">
                <div className="h-16 mx-auto mb-3 flex items-center justify-center">
                  <img src="/images/tiktok-logo.svg" alt="TikTok" className="h-10 w-auto" />
                </div>
                <span className="text-sm text-muted-foreground">TikTok Ads, Creators,<br/>Spark/Whitelisting</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-4">
                  Ready to become our next success story?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Let's discuss how we can drive similar results for your brand.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" asChild>
                  <a 
                    href="https://calendly.com/trapezemedia/discovery-call" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Book a Discovery Call
                  </a>
                </Button>
                <Button variant="hero-outline" asChild>
                  <Link to="/case-studies">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Case Studies
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default VariousEateriesCaseStudy;
