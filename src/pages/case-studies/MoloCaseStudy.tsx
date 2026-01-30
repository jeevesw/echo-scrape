import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ParallaxVideo } from "@/components/case-study/ParallaxVideo";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote } from "lucide-react";

const MoloCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Organic Brand-Building for Fine-Dining Lobster Legends: Molo | Trapeze Media</title>
        <meta 
          name="description" 
          content="We helped seafood spot Molo become one of the top vendors at Mercato Mayfair and BOXPARK Wembley with a 40% sales uplift — with basically zero budget." 
        />
        <link rel="canonical" href="https://trapezemedia.com/case-studies/molo" />
      </Helmet>

      {/* Hero Section - Full bleed with dramatic headline */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/molo-hero.png"
            alt="Molo seafood dishes"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/70 to-primary" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10 text-center">
          <ScrollReveal animation="up">
            <span className="heading-display text-primary-foreground/80 text-lg md:text-xl uppercase tracking-wider mb-4 block">
              Organic Social Campaign
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-7xl text-primary-foreground leading-tight max-w-4xl mx-auto">
              Organic Brand-Building for Fine-Dining Lobster Legends
            </h1>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Molo", href: "/case-studies/molo" },
            ]}
          />
          
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-primary max-w-4xl mt-8 leading-relaxed">
              We helped seafood spot Molo become one of the top vendors at Mercato Mayfair and BOXPARK Wembley — with basically zero budget.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section - Bold, no boxes, animated counters */}
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

          <div className="grid md:grid-cols-2 gap-12 md:gap-8 max-w-3xl mx-auto">
            <ScrollReveal delay={0}>
              <AnimatedStat 
                value={40} 
                suffix="%" 
                label="Sales uplift from 2024 to 2025" 
                delay={0}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <div className="text-center group">
                <div className="relative">
                  <span className="heading-display text-6xl md:text-7xl lg:text-8xl text-primary block relative transition-transform duration-500 group-hover:scale-105">
                    #1
                  </span>
                </div>
                <span className="text-foreground text-lg md:text-xl mt-4 block font-medium">
                  Vendor at Mercato Mayfair
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story Section with Parallax Videos */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <ScrollReveal animation="left">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  Seafood spot Molo brought Trapeze Media on board to increase engagement, drive more visits, and{" "}
                  <span className="text-primary font-semibold">
                    get more creators and influencers sharing content
                  </span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through our work with Molo, they became one of the top vendors at Mercato Mayfair, and sales increased by 40%.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Video - Parallax */}
            <ScrollReveal animation="right">
              <ParallaxVideo 
                src="/videos/molo-michelin.mp4" 
                direction="right"
                showMuteControl
              />
            </ScrollReveal>
          </div>

          {/* Second Row - Reversed */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
            {/* Left Video - Parallax */}
            <ScrollReveal animation="left" className="order-2 lg:order-1">
              <ParallaxVideo 
                src="/videos/molo-palentines.mp4" 
                direction="left"
                showMuteControl
              />
            </ScrollReveal>

            {/* Right Content */}
            <ScrollReveal animation="right" className="order-1 lg:order-2">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  With a two-person team,{" "}
                  <span className="text-primary font-semibold">
                    we planned, shot, edited, and published video-led campaigns
                  </span>{" "}
                  anchored by highly-engaging themed events.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A stand-out event was our FRIENDS-themed quiz at BOXPARK in celebration of Palentine's Day.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Third Row */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
            {/* Left Content */}
            <ScrollReveal animation="left">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through a variety of eye-catching foodie cinematography, captivating story-driven videos, and engaging UGC re-shares, we boosted Molo's sales and{" "}
                  <span className="text-primary font-semibold">
                    helped them become the #1 vendor at Mercato's flagship Mayfair location
                  </span>.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Video - Parallax */}
            <ScrollReveal animation="right">
              <ParallaxVideo 
                src="/videos/molo-phone-call.mp4" 
                direction="right"
                showMuteControl
              />
            </ScrollReveal>
          </div>
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
              The Results
            </h2>
            
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto leading-relaxed">
              From organic social content alone, Molo went from a new vendor to the #1 seller at Mercato Mayfair — proving that strategic, story-driven content can outperform paid campaigns when executed with creativity and consistency.
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
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

export default MoloCaseStudy;
