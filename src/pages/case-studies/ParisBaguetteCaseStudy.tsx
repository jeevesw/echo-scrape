import { Link } from "react-router-dom";
import parisBaguetteBg from "@/assets/case-studies/paris-baguette-bg.jpg";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ParallaxVideo } from "@/components/case-study/ParallaxVideo";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote, Check, MapPin, Video } from "lucide-react";
import ParisBaguetteBrandSearchChart from "@/components/charts/ParisBaguetteBrandSearchChart";

const ParisBaguetteCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Growing Brand Demand and Footfall for Paris Baguette | Trapeze Media</title>
        <meta
          name="description"
          content="We drove an 83% increase in branded searches and 60% uplift in footfall conversions for Paris Baguette's Canary Wharf and Westfield London locations through hyperlocal YouTube, Google, and Meta campaigns."
        />
        <link rel="canonical" href="https://trapezemedia.co.uk/case-studies/paris-baguette" />
        <meta property="og:image" content="/images/case-studies/paris-baguette-hero.jpg" />
        <meta property="og:title" content="Growing Brand Demand and Footfall for Paris Baguette | Trapeze Media" />
        <meta property="og:description" content="We drove an 83% increase in branded searches and 60% uplift in footfall conversions for Paris Baguette's Canary Wharf and Westfield London locations through hyperlocal YouTube, Google, and Meta campaigns." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] max-h-[75vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src="/images/case-studies/paris-baguette-hero.jpg"
            alt="Paris Baguette cakes and coffee"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/70 to-primary" />
        </div>

        <div className="absolute top-0 left-0 right-0 container-content mx-auto px-4 z-20 pt-6">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Paris Baguette", href: "/case-studies/paris-baguette" },
            ]}
            variant="light"
          />
        </div>

        <div className="container-content mx-auto px-4 relative z-10 text-center">
          <ScrollReveal animation="up">
            <span className="heading-display text-primary-foreground/80 text-lg md:text-xl uppercase tracking-wider mb-4 block">
              Paid Google, Meta, &amp; YouTube Ads
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-7xl text-primary-foreground leading-tight max-w-4xl mx-auto">
              Growing brand demand and footfall for Paris Baguette
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto mt-6 leading-relaxed">
              Hyperlocal YouTube, Google, and Meta campaigns that built brand awareness, navigated new 'Less Healthy Food' regulations, and drove measurable in-store visits across two London locations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mt-8 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Paris Baguette is a global bakery-café chain with over 3,700 locations in South Korea and more than 200 in the US — and they were just beginning their franchise journey in the UK. We joined them when they went from four to six sites, at exactly the moment they needed to build real brand recognition in London.
              </p>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                We worked with Paris Baguette to grow brand awareness and drive in-store visits for their Canary Wharf franchise location, while also supporting the launch of their new Westfield London branch.{" "}
                <span className="text-primary font-semibold">The brief: build a brand that London recognises, and turn that recognition into footfall.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section — hero-style with parallax background */}
      <section className="relative overflow-hidden min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${parisBaguetteBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

        <div className="container-content mx-auto px-4 relative z-10 py-20">
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

      {/* Awareness + Chart */}
      <section className="py-16 bg-background">
        <div className="container-content mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
              Increasing Awareness Through YouTube &amp; Paid Social
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              We implemented a two-phase paid ads strategy to build and scale brand demand across London, focusing hyperlocally on Canary Wharf.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ParisBaguetteBrandSearchChart />
          </ScrollReveal>
        </div>
      </section>

      {/* Alternating Video Sections */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4">
          {/* Row 1: Video left, text right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="left">
              <ParallaxVideo
                src="https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//Video%203%20-%20Autumn%20Menu%20-%20Paris%20Baguette%20-%20Canary%20Wharf.mp4"
                direction="left"
                showMuteControl
              />
            </ScrollReveal>

            <ScrollReveal animation="right">
              <div className="space-y-6">
                <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                  Phase 1: Establishing Local Visibility
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

          {/* Row 2: Centered text only (video removed) */}
          <div className="mt-24 flex justify-center">
            <ScrollReveal animation="up">
              <div className="space-y-6 text-center max-w-xl mx-auto">
                <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                  Phase 2: Scaling with Bespoke Video Creative
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Once bespoke video creative was introduced, we expanded distribution across YouTube and the full Google ecosystem. Within just one month — June to July 2025 — this drove a further +23% uplift in branded search demand.
                </p>
                <div className="bg-primary/10 rounded-lg px-4 py-3">
                  <p className="text-foreground font-semibold text-sm">High-quality video + intent-driven platforms = compounding brand growth.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Row 3: Video left, text right — Westfield London */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
            <ScrollReveal animation="left" className="order-2 lg:order-1">
              <div className="space-y-6">
                <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                  Supporting a New Store Launch: Westfield London
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Alongside Canary Wharf, we supported the Westfield London opening in November 2025 with a dedicated launch strategy — video-led campaigns to generate immediate awareness, and hyperlocal targeting to capture nearby demand from day one.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2">
                    <Video className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground text-sm font-medium">Video-led campaigns</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground text-sm font-medium">Hyperlocal targeting</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="right" className="order-1 lg:order-2">
              <ParallaxVideo
                src="https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//Video%201%20-%20Version%20A%20-%20Paris%20Baguette.mp4"
                direction="right"
                showMuteControl
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* LHF Regulations */}
      <section className="py-16 bg-muted">
        <div className="container-content mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <ScrollReveal animation="left">
              <ParallaxVideo
                src="https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//Paris-Baguette-Trapeze-Media-Video-Production-3.mp4"
                direction="left"
                showMuteControl
              />
            </ScrollReveal>

            <ScrollReveal animation="right">
              <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
                Creative Strategy: Navigating LHF Regulations
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                When Less Healthy Food regulations came into force, traditional product-led advertising — especially content featuring indulgent cakes and pastries — became restricted for broad audience targeting. Rather than pulling back, we adapted.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Advised Paris Baguette on the LHF ban and its specific implications for their paid ad campaigns",
                  "Developed bespoke video creative concepts that implied indulgence without directly showing restricted products",
                  "Focused on occasion-led storytelling — celebrations, gifting, morning rituals",
                  "Maintained strong visual appeal and performance while staying fully compliant",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-primary/10 border-l-4 border-primary px-6 py-4 rounded-r-lg">
                <p className="text-foreground leading-relaxed font-medium">
                  This is one of the clearest examples of what it means to be a specialist in food and hospitality advertising. We knew the regulations before our clients did — and already had a plan.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footfall */}
      <section className="py-16 bg-background">
        <div className="container-content mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
              Driving Footfall Through High-Intent Google Campaigns
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Building awareness was only half the brief. We also needed to convert that demand into footfall — particularly during the morning and lunchtime windows that matter most for a bakery café.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={0}>
              <div className="bg-muted rounded-xl p-8 h-full">
                <h3 className="heading-display text-xl text-foreground mb-3">Google Performance Max</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We ran PMax campaigns optimised specifically for store visits and "Get Directions" actions — tracking the moments where online interest becomes a physical visit.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="bg-muted rounded-xl p-8 h-full">
                <h3 className="heading-display text-xl text-foreground mb-3">Scaling What Works</h3>
                <p className="text-muted-foreground leading-relaxed">
                  After identifying strong early performance, we increased Google Ads investment by 45% between July and September 2025 — resulting in a 60% uplift in footfall-driven conversions and improved cost efficiency.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-16 bg-foreground text-white">
        <div className="container-content mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl mb-6">The Outcome</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              By combining awareness-building video campaigns with high-intent search targeting, we successfully grew brand demand at scale, converted online interest into measurable in-store visits, and supported both an existing franchise location and a new store launch — all within a single campaign year.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-12 left-12 opacity-10 rotate-180">
          <Quote className="w-32 h-32" />
        </div>
        <div className="absolute bottom-12 right-12 opacity-10">
          <Quote className="w-32 h-32" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal animation="scale">
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
              "Trapeze Media's efforts came at a critical time and directly contributed to boosting our sales. The impact has been invaluable."
            </blockquote>

            <cite className="block text-center mt-8 text-lg not-italic text-primary-foreground/80">
              — <span className="font-semibold text-primary-foreground">Wayne Stevenson</span>, Franchise Owner, Paris Baguette Canary Wharf &amp; Westfield London
            </cite>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
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
                    Schedule a Call
                  </a>
                </Button>
                <Button variant="hero-outline" asChild>
                  <Link to="/case-studies">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    View All Case Studies
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

export default ParisBaguetteCaseStudy;
