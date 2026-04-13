import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote } from "lucide-react";


const PattyAndBunCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Organic Social Media &amp; Video Production for Patty&amp;Bun | Trapeze Media</title>
        <meta
          name="description"
          content="We doubled Patty&Bun's cross-platform engagements and TikTok following by creating stronger, trend-driven content for the London burger restaurant brand."
        />
        <meta property="og:image" content="https://trapezemedia.co.uk/images/case-studies/patty-and-bun-hero.jpg" />
        <link rel="canonical" href="https://trapezemedia.co.uk/case-studies/patty-and-bun" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] max-h-[75vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/case-studies/patty-and-bun-hero.jpg"
            alt="Patty & Bun burger held up beneath neon sign"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#C2185B]/60" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10 text-center">
          <ScrollReveal animation="up">
            <span className="heading-display text-white/80 text-lg md:text-xl uppercase tracking-wider mb-4 block">
              Social Media Management · Video Production
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-7xl text-white leading-tight max-w-4xl mx-auto">
              Organic Social Media and Video Production for Patty&amp;Bun
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mt-6 leading-relaxed">
              We doubled Patty&amp;Bun's cross-platform engagements and TikTok following by creating stronger, trend-driven content.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Patty & Bun", href: "/case-studies/patty-and-bun" },
            ]}
          />

          <ScrollReveal>
            <div className="max-w-3xl mx-auto mt-8 space-y-6">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                London burger restaurant brand Patty&amp;Bun weren't sure a marketing agency could properly "capture their vibe" or integrate with their in-venue teams.{" "}
                <span className="text-primary font-semibold">Then they met us.</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Patty&amp;Bun wanted to maintain the word-of-mouth, in-the-know tone which originally built their empire-in-a-bun. Cool in a casual way, trend-savvy without being try-hard, and mouthwatering (while being more than just a feed of thumbnail-filling burgers).
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-14 text-white relative overflow-hidden"
        style={{ backgroundColor: "#C2185B" }}
      >
        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-center mb-14">
              Success in Six Months
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            <ScrollReveal delay={0}>
              <AnimatedStat value={93} suffix="%" label="increase in engagement rate per impression" delay={0} />
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <AnimatedStat value={91} suffix="%" label="increase in net audience growth" delay={150} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-center">
                <div className="heading-display text-4xl md:text-5xl lg:text-6xl mb-2">24K plays &amp; 2.5K+ likes</div>
                <p className="text-white/80 text-sm md:text-base">on top TikTok video</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={450}>
              <div className="text-center">
                <div className="heading-display text-4xl md:text-5xl lg:text-6xl mb-2">35K plays &amp; 550+ likes</div>
                <p className="text-white/80 text-sm md:text-base">on top Instagram Reel</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <ul className="max-w-3xl mx-auto space-y-3 text-white/90 text-lg">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" />
                Planning, capturing, editing, and publishing videos for TikTok and Instagram Reels
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" />
                Consistent content creation: leading shoots twice per month
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" />
                Supporting Patty&amp;Bun's partnerships with cool brands, including Major League Baseball and the hipster vintage shop Duke's Cupboard in Soho
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Creative Section */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-12">
              Creative
            </h2>
          </ScrollReveal>

          {/* Video Grid — vertical / staggered */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 items-start">
            {[
              { badge: "24K+ Instagram plays", src: "https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//TikTok-Reel-Video-Patty-and-Bun-Trapeze-Media-1.mp4", offset: "md:mt-0" },
              { badge: "35K+ Instagram plays", src: "https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//TikTok-Reel-Video-Patty-and-Bun-Trapeze-Media-2.mp4", offset: "md:mt-16" },
              { badge: "35K+ Instagram plays", src: "https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//TikTok-Reel-Video-Patty-and-Bun-Trapeze-Media-3.mp4", offset: "md:mt-8" },
            ].map((video, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={video.offset}>
                  <div className="relative">
                    <div className="aspect-[9/16] rounded-xl overflow-hidden bg-muted">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    </div>
                    <div className="absolute -bottom-4 -left-3 md:-left-4 bg-primary text-white text-base md:text-lg font-semibold px-5 py-2.5 rounded-lg shadow-lg">
                      {video.badge}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Two-column copy */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={0}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We shot, edited, and published content with rapid turnaround, so we'd never miss the boat on short-lived trends and TikTok sounds. And, whenever a trend rose up in the weeks between shoots, we cleverly recut old footage into new videos.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We also folded more polished-looking footage from Patty&amp;Bun's partners into our edits, always cutting and framing it in a way that honoured the rough-around-the-edges feel of social-first video.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className="py-24 text-white relative overflow-hidden"
        style={{ backgroundColor: "#C2185B" }}
      >
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
              "Trapeze Media were an absolute vibe. They completely changed how we viewed working with an agency. The team really got in there and were responsive, imaginative, and communicative at every step, bringing energy to all our platforms."
            </blockquote>

            <cite className="block text-center mt-8 text-lg not-italic text-white/80">
              — <span className="font-semibold text-white">Joe Grossman</span>, Founder, Patty&amp;Bun
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

export default PattyAndBunCaseStudy;
