import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote, Check, MapPin, Video } from "lucide-react";
import ParisBaguetteBrandSearchChart from "@/components/charts/ParisBaguetteBrandSearchChart";

// TODO: replace with Paris Baguette hero image
// TODO: replace chart placeholder with actual chart component or screenshot once provided
// TODO: upload ad creative screenshot
// TODO: replace video placeholders with actual video elements using Supabase storage URLs once uploaded

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
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] max-h-[75vh] flex items-center justify-center overflow-hidden bg-foreground">
        <div className="container-content mx-auto px-4 relative z-10 text-center">
          <ScrollReveal animation="up">
            <span className="heading-display text-white/60 text-lg md:text-xl uppercase tracking-wider mb-4 block">
              Paid Google, Meta, &amp; YouTube Ads
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-7xl text-white leading-tight max-w-4xl mx-auto">
              Growing brand demand and footfall for Paris Baguette
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mt-6 leading-relaxed">
              Hyperlocal YouTube, Google, and Meta campaigns that built brand awareness, navigated new 'Less Healthy Food' regulations, and drove measurable in-store visits across two London locations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero image placeholder */}
      <div className="container-content mx-auto px-4 -mt-12 relative z-20 mb-8">
        <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          [Hero image placeholder — Paris Baguette campaign creative]
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container-content mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Paris Baguette", href: "/case-studies/paris-baguette" },
            ]}
          />
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mt-8">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                We worked with Paris Baguette to grow brand awareness and drive in-store visits for their Canary Wharf franchise location, while also supporting the launch of their new Westfield London branch.{" "}
                <span className="text-primary font-semibold">The brief: build a brand that London recognises, and turn that recognition into footfall.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-foreground text-white relative overflow-hidden">
        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 block text-center mb-3">The Results</span>
            <h2 className="heading-display text-4xl md:text-5xl text-center mb-14">
              What We Delivered
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <ScrollReveal delay={0}>
              <AnimatedStat value={83} prefix="+" suffix="%" label='increase in branded searches for "Paris Baguette Canary Wharf"' delay={0} />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <AnimatedStat value={23} prefix="+" suffix="%" label="additional uplift in branded search demand within one month of launching video creative" delay={100} />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <AnimatedStat value={45} prefix="+" suffix="%" label="increase in Google Ads investment after identifying strong early performance" delay={200} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <AnimatedStat value={60} prefix="+" suffix="%" label="increase in footfall-driven conversions" delay={300} />
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="text-center col-span-2 lg:col-span-1">
                <div className="heading-display text-4xl md:text-5xl lg:text-6xl mb-2">2 locations</div>
                <p className="text-white/70 text-sm md:text-base">supported — Canary Wharf and Westfield London</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 1 — Awareness */}
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

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <ScrollReveal delay={0}>
              <div className="border-l-4 border-primary pl-6 py-4">
                <h3 className="heading-display text-xl text-foreground mb-3">Phase 1: Establishing Local Visibility</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  From February to June 2025, we launched hyperlocal ad campaigns across Google and Meta using image-based creative to build initial awareness.
                </p>
                <div className="bg-primary/10 rounded-lg px-4 py-3">
                  <p className="text-foreground font-semibold text-sm">+83% increase in branded searches for "Paris Baguette Canary Wharf" by people in London</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="border-l-4 border-primary pl-6 py-4">
                <h3 className="heading-display text-xl text-foreground mb-3">Phase 2: Scaling with Bespoke Video Creative</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Once bespoke video creative was introduced, we expanded distribution across YouTube and the full Google ecosystem. Within just one month — June to July 2025 — this drove a further +23% uplift in branded search demand.
                </p>
                <div className="bg-primary/10 rounded-lg px-4 py-3">
                  <p className="text-foreground font-semibold text-sm">High-quality video + intent-driven platforms = compounding brand growth.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Chart placeholder */}
          <ScrollReveal delay={150}>
            <ParisBaguetteBrandSearchChart />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — New Store Launch */}
      <section className="py-16 bg-muted">
        <div className="container-content mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
              Supporting a New Store Launch: Westfield London
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Alongside Canary Wharf, we supported the Westfield London opening in November 2025 with a dedicated launch strategy — video-led campaigns to generate immediate awareness, and hyperlocal targeting to capture nearby demand from day one.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <ScrollReveal delay={0}>
              <div className="flex items-start gap-4 bg-background rounded-xl p-6">
                <Video className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="heading-display text-base text-foreground mb-1">Video-led campaigns</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Generating immediate awareness at launch</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="flex items-start gap-4 bg-background rounded-xl p-6">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="heading-display text-base text-foreground mb-1">Hyperlocal targeting</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Capturing demand from people near Westfield London before and after opening</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm border border-border">
              [Image placeholder — Paris Baguette Google &amp; Meta ad creative examples]
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3 — LHF Regulations */}
      <section className="py-16 bg-background">
        <div className="container-content mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
              Creative Strategy: Navigating LHF Regulations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              When Less Healthy Food regulations came into force, traditional product-led advertising — especially content featuring indulgent cakes and pastries — became restricted for broad audience targeting. Rather than pulling back, we adapted.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={50}>
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
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-primary/10 border-l-4 border-primary px-6 py-4 rounded-r-lg mb-10">
              <p className="text-foreground leading-relaxed font-medium">
                This is one of the clearest examples of what it means to be a specialist in food and hospitality advertising. We knew the regulations before our clients did — and already had a plan.
              </p>
            </div>
          </ScrollReveal>

          {/* Vertical video placeholders */}
          <ScrollReveal delay={150}>
            <div className="flex justify-center gap-4 flex-wrap">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-[9/16] bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm border border-border w-full max-w-[220px]"
                >
                  [Video placeholder — Paris Baguette LHF-compliant creative]
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4 — Footfall */}
      <section className="py-16 bg-muted">
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
              <div className="bg-background rounded-xl p-8 h-full">
                <h3 className="heading-display text-xl text-foreground mb-3">Google Performance Max</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We ran PMax campaigns optimised specifically for store visits and "Get Directions" actions — tracking the moments where online interest becomes a physical visit.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="bg-background rounded-xl p-8 h-full">
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
              "I want to sincerely thank you and your team for the excellent work you've done. Your efforts came at a critical time and directly contributed to boosting our sales. That impact has been invaluable, and I truly appreciate the dedication you've shown."
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
