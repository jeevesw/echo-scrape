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
        <title>Google Pay-Per-Click Ads for Various Eateries | Trapeze Media</title>
        <meta 
          name="description" 
          content="We drove an 88% increase in table bookings, 12x ROAS, and 92% lower cost-per-visit for restaurant group Various Eateries through strategic Google Ads campaigns." 
        />
        <link rel="canonical" href="https://trapezemedia.com/case-studies/various-eateries" />
      </Helmet>

      {/* Hero Section - Full bleed with dramatic headline */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

        <div className="container-content mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="left">
              <span className="heading-display text-primary-foreground/80 text-lg md:text-xl uppercase tracking-wider mb-4 block">
                Case Study: Google Pay-Per-Click Ads
              </span>
              <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
                Driving Restaurant Visits and Bookings
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="right">
              <img
                src="/images/various-eateries-hero.png"
                alt="Coppa Club Google Ads campaign on mobile"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Various Eateries", href: "/case-studies/various-eateries" },
            ]}
          />
          
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-primary max-w-4xl mt-8 leading-relaxed">
              Restaurant group Various Eateries, who count Coppa Club, Noci, and Tavolino among their 13 venues, approached us to increase footfall and bookings using Google Ads.
            </h2>
          </ScrollReveal>
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

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <ScrollReveal delay={0}>
              <AnimatedStat 
                value={88} 
                suffix="%" 
                label="Increase in table bookings through Google Ads" 
                delay={0}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <div className="text-center group">
                <div className="relative">
                  <span className="heading-display text-6xl md:text-7xl lg:text-8xl text-primary block relative transition-transform duration-500 group-hover:scale-105">
                    12x
                  </span>
                </div>
                <span className="text-foreground text-lg md:text-xl mt-4 block font-medium">
                  ROAS (average revenue for every £1 spent)
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <AnimatedStat 
                value={88} 
                suffix="%" 
                label="Lower CPA (cost per click to book)" 
                delay={300}
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

          <div className="grid xl:grid-cols-2 gap-16 items-start">
          <ScrollReveal animation="left" className="lg:col-span-2 xl:col-span-1">
              <VenueVisitsCPAChart className="w-full min-h-[450px]" />
            </ScrollReveal>

            <ScrollReveal animation="right">
              <div className="grid grid-cols-1 gap-8">
                <div className="text-center group p-6 bg-muted rounded-2xl">
                  <span className="heading-display text-5xl md:text-6xl text-primary block transition-transform duration-500 group-hover:scale-105">
                    +91%
                  </span>
                  <span className="text-foreground text-lg mt-2 block font-medium">
                    Venue Visits
                  </span>
                </div>
                
                <div className="text-center group p-6 bg-muted rounded-2xl">
                  <span className="heading-display text-5xl md:text-6xl text-primary block transition-transform duration-500 group-hover:scale-105">
                    -92%
                  </span>
                  <span className="text-foreground text-lg mt-2 block font-medium">
                    Cost-Per-Visit
                  </span>
                </div>
                
                <div className="text-center group p-6 bg-muted rounded-2xl">
                  <span className="heading-display text-5xl md:text-6xl text-primary block transition-transform duration-500 group-hover:scale-105">
                    +145%
                  </span>
                  <span className="text-foreground text-lg mt-2 block font-medium">
                    Revenue from Venue Visits
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="left">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  We built and ran cross-platform campaigns using{" "}
                  <span className="text-primary font-semibold">
                    specific goal and table-targeted retargeting
                  </span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The result: 2.2 million monthly impressions and unprecedented year-on-year growth.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We were able to achieve higher efficiency alongside higher revenue and bookings with each passing month.
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

      {/* Tracking Section */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-center text-foreground mb-8">
              Tracking Bookings Back to Acquisition
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              We deployed a tracking solution called WhatConverts that enables us to clearly see which marketing touchpoint the table booking came from.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-muted rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                By connecting this data back to Google Analytics, we can adjust our campaigns for even better results.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This comprehensive tracking approach ensures every marketing pound is accountable and optimised for maximum return.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative quote marks */}
        <div className="absolute top-12 left-12 opacity-10">
          <Quote className="w-32 h-32" />
        </div>
        <div className="absolute bottom-12 right-12 opacity-10 rotate-180">
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
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#4285F4]" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">Meta Ads Manager<br/>Facebook</span>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4285F4] via-[#FBBC05] to-[#34A853] rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">A</span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">Google Ads, Search,<br/>YouTube, Display</span>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">TikTok<br/>Ads</span>
                  </div>
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
