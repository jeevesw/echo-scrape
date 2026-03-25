import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ParallaxVideo } from "@/components/case-study/ParallaxVideo";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote } from "lucide-react";

const YoSushiCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Paid Social & Hyperlocal Ads for YO! Sushi | Trapeze Media</title>
        <meta 
          name="description" 
          content="A TikTok-led campaign that drove 1M+ views in week one, a 60% increase in restaurant bookings, and a 28% uplift in click-and-collect orders." 
        />
        <link rel="canonical" href="https://trapezemedia.com/case-studies/yo-sushi" />
      </Helmet>

      {/* Hero Section - Full bleed with dramatic headline */}
      <section className="relative min-h-[50vh] max-h-[75vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background video with overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/videos/yo-sushi-furi-furi.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/70 to-primary" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10 text-center">
          <ScrollReveal animation="up">
            <span className="heading-display text-primary-foreground/80 text-lg md:text-xl uppercase tracking-wider mb-4 block">
              Search & Social Campaign
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-7xl text-primary-foreground leading-tight max-w-4xl mx-auto">
              Turning a Limited-Time Product Into a Permanent Fixture
            </h1>
          </ScrollReveal>
        </div>

      </section>

      {/* Intro Statement */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "YO! Sushi", href: "/case-studies/yo-sushi" },
            ]}
          />
          
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-primary max-w-4xl mt-8 leading-relaxed">
              We launched YO!'s Furi Furi Chicken with a TikTok-led campaign that drove sales, footfall, and Click & Collect.
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

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <ScrollReveal delay={0}>
              <AnimatedStat 
                value={1000} 
                suffix="+" 
                label="views in week one" 
                delay={0}
                formatValue={(v) => {
                  if (v >= 1000) return '1M';
                  return `${v}K`;
                }}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <AnimatedStat 
                value={60} 
                suffix="%" 
                label="Increase in restaurant bookings" 
                delay={150}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <AnimatedStat 
                value={28} 
                suffix="%" 
                label="Uplift in click & collect orders" 
                delay={300}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story Section with Parallax Videos */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Video - Parallax up */}
            <ScrollReveal animation="left">
              <ParallaxVideo 
                src="/videos/yo-sushi-furi-furi.mp4" 
                direction="left"
              />
            </ScrollReveal>

            {/* Right Content */}
            <ScrollReveal animation="right">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  YO! asked us to introduce a playful new product: the Furi Furi Chicken,{" "}
                  <span className="text-primary font-semibold">
                    with a campaign as bold as its flavour
                  </span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The challenge: make audiences think of YO! for something other than sushi by highlighting the great street food offering on the menu.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With smart hyperlocal targeting and slick videos shot with rigging tricks and edited with neon aesthetics to match YO!'s Tokyo nightlife vibe, we turned Furi Furi Chicken (and other campaigns) into captivating brand moments.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Second Row - Reversed */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
            {/* Left Content */}
            <ScrollReveal animation="left" className="order-2 lg:order-1">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We supported the social-first campaign with strategic Google Ads across search and YouTube, increasing awareness and driving conversions.
                </p>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  Thanks to the success of this campaign, Furi Furi Chicken will be launching in YO! kiosks in Tesco,{" "}
                  <span className="text-primary font-semibold italic">and</span> a new variation 'The Spice Bag' was developed, available exclusively on delivery.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Video - Parallax down */}
            <ScrollReveal animation="right" className="order-1 lg:order-2">
              <ParallaxVideo 
                src="/videos/yo-sushi-3-plates.mp4" 
                direction="right"
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
              "I love working with Trapeze Media. They're strategic, highly-responsive, and bring creative direction to our campaigns. They're not just an agency we work with — they have become an extended part of the team as well as a business growth partner that has helped us achieve an incremental ROI through managing our paid ads campaigns."
            </blockquote>
            
            <cite className="block text-center mt-8 text-lg not-italic text-primary-foreground/80">
              — <span className="font-semibold text-primary-foreground">Hayan Hwang</span>, Senior Growth & Digital Marketing Manager at YO! Sushi
            </cite>
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

export default YoSushiCaseStudy;
