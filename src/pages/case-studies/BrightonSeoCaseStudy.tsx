import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowLeft, Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const videoFiles = [
  "Brighton-SEO-Videos-1.mp4",
  "Brighton-SEO-Videos-2.mp4",
  "Brighton-SEO-Videos-3.mp4",
  "Brighton-SEO-Videos-4.mp4",
  "Brighton-SEO-Videos-5.mp4",
  "Brighton-SEO-Videos-9mov.mp4",
];

function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={hovered}
        className="w-full h-full object-cover aspect-[9/16]"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function ParallaxPill({
  children,
  speed = 1,
  baseOffset = 0,
}: {
  children: React.ReactNode;
  speed?: number;
  baseOffset?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState(baseOffset);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - windowCenter) / window.innerHeight;
      setOffset(baseOffset + distance * 24 * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [baseOffset, speed]);

  return (
    <span
      ref={ref}
      className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm md:text-base font-semibold font-ui transition-transform duration-100 ease-out"
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </span>
  );
}

const BrightonSeoCaseStudy = () => {
  const videoBaseUrl = `${SUPABASE_URL}/storage/v1/object/public/videos`;
  const desktopVideoPairs = [
    [videoFiles[0], videoFiles[3]],
    [videoFiles[1], videoFiles[4]],
    [videoFiles[2], videoFiles[5]],
  ];
  const desktopPairOffsets = [0, 16, -16];

  return (
    <Layout>
      <Helmet>
        <title>Social Media Video Production for brightonSEO | Trapeze Media</title>
        <meta
          name="description"
          content="We planned, shot, and edited 100 short-form videos for brightonSEO — built for TikTok, Instagram Reels & YouTube Shorts."
        />
        <link rel="canonical" href="https://trapezemedia.com/case-studies/brightonseo" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-background pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container-content mx-auto px-4 relative z-10 text-center">
          {/* Breadcrumb at top */}
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "brightonSEO", href: "/case-studies/brightonseo" },
            ]}
          />

          <ScrollReveal animation="up">
            <h1 className="heading-display text-4xl md:text-5xl lg:text-7xl text-primary leading-tight max-w-5xl mx-auto">
              Social Media Video Production for brightonSEO
            </h1>
            <p className="text-lg md:text-xl text-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              100 short-form videos. Shot in 2 days. Edited with TikTok, Instagram Reels, and YouTube Shorts at their core.
            </p>
          </ScrollReveal>

          {/* First two pills */}
          <ScrollReveal animation="up" delay={200}>
            <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
              <ParallaxPill speed={1} baseOffset={-6}>Trend-driven, social-ready videos</ParallaxPill>
              <ParallaxPill speed={1} baseOffset={8}>Informed by client brand pillars</ParallaxPill>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-6 md:hidden">
              {videoFiles.map((file, i) => {
                const offsets = [0, 16, -10, 10, -16, 6];
                return (
                  <div
                    key={file}
                    style={{ marginTop: `${Math.max(offsets[i], 0)}px`, marginBottom: `${Math.max(-offsets[i], 0)}px` }}
                  >
                    <VideoCard src={`${videoBaseUrl}/${file}`} />
                  </div>
                );
              })}
            </div>

            <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:items-start">
              {desktopVideoPairs.map((pair, pairIndex) => (
                <div
                  key={pair.join("-")}
                  className="flex flex-col gap-8"
                  style={{ marginTop: `${Math.max(desktopPairOffsets[pairIndex], 0)}px`, marginBottom: `${Math.max(-desktopPairOffsets[pairIndex], 0)}px` }}
                >
                  {pair.map((file) => (
                    <VideoCard key={file} src={`${videoBaseUrl}/${file}`} />
                  ))}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Last three pills */}
          <ScrollReveal animation="up" delay={200}>
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              <ParallaxPill speed={1} baseOffset={4}>Produced 100 videos</ParallaxPill>
              <ParallaxPill speed={1} baseOffset={-10}>Planned over 2 months</ParallaxPill>
              <ParallaxPill speed={1} baseOffset={10}>Shot in 2 days</ParallaxPill>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Context Section */}
      <section className="py-24 bg-muted">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                When <span className="text-primary font-semibold">brightonSEO</span>, one of the world's leading SEO conferences, needed a short-form video strategy for social media, they came to us with three goals: communicate their brand values, showcase the international reach of the event, and make Brighton look like the place to be.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We split our crew in two on shoot days: a fixed studio setup near the venue entrance with professional lighting and sound, and a roaming team capturing B-roll and 360° visuals.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Over two months of pre-production planning and two days on the ground, we created 100+ short-form social media videos, edited and formatted for TikTok, Instagram Reels, and YouTube Shorts, giving the brightonSEO marketing team a full year's worth of content to deploy in the run-up to the next event.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-12 right-12 opacity-10">
          <Quote className="w-32 h-32" />
        </div>
        <div className="absolute bottom-12 left-12 opacity-10 rotate-180">
          <Quote className="w-32 h-32" />
        </div>

        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal animation="scale">
            <h2 className="heading-display text-sm md:text-base text-center mb-10 tracking-[0.2em] uppercase text-primary-foreground/80">
              Testimonial
            </h2>

            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
              "We briefed Trapeze to create 100 videos from our two day event that we could use across Instagram & TikTok in the lead up to our next event. They had some fantastic ideas and really captured our brand. It was really helpful to have that content ready to go. The team were great to work with."
            </blockquote>

            <cite className="block text-center mt-8 text-lg not-italic text-primary-foreground/80">
              — <span className="font-semibold text-primary-foreground">Grace Allwright</span>, Head of Marketing at brightonSEO
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

export default BrightonSeoCaseStudy;
