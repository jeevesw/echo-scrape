import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/case-study/AnimatedStat";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { SpotlightCarousel } from "@/components/case-study/SpotlightCarousel";
import { ArrowLeft, Quote, Target, TrendingUp, Shield, Star, Video, Smartphone } from "lucide-react";
import { useRef } from "react";

const videoFiles = [
  { src: "https://www.trapezemedia.co.uk/s/Maximiles-Stop-Scrolling.mp4", label: "Stop Scrolling" },
  { src: "https://www.trapezemedia.co.uk/s/Maximiles-Music.mp4", label: "Music" },
  { src: "https://www.trapezemedia.co.uk/s/Maximiles-PS4.mp4", label: "PS4" },
];

const galleryPrizes = [
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280061137-PTIC38BRX8KJO228E3JM/Maximiles+%E2%80%94+Focus+on+Prizes+2.jpg", alt: "Maximiles prizes creative 1" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280060820-0XICIJJDDDVMR8EUBYEX/Maximiles+%E2%80%94+Focus+on+Prizes+3.jpg", alt: "Maximiles prizes creative 2" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280081456-EKLAJDKYUUEBI21IGDU7/Maximiles+%E2%80%94+Focus+on+Prizes+1.jpg", alt: "Maximiles prizes creative 3" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280062028-UR4J7ATTWDD9MHCBN0EE/Maximiles+%E2%80%94+Focus+on+Prizes+4.png", alt: "Maximiles prizes creative 4" },
];

const galleryTrust = [
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280155357-LT1C80S87RNB7FZ8RATM/Focus+on+Trust+1.jpg", alt: "Maximiles trust creative 1" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280155468-B7S0JUGOEF6Z16P2OUCC/Focus+on+Trust+2.jpg", alt: "Maximiles trust creative 2" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280158268-LUVHRY2Q1EHDTE92ENEE/Focus+on+Trust+3.jpg", alt: "Maximiles trust creative 3" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280158552-D4WWUAU52APRGSVQMDJU/Focus+on+Trust+4.jpg", alt: "Maximiles trust creative 4" },
];

const gallerySimplicity = [
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280467789-K2E8LFRBISEPE5EQQABZ/Focus+on+Simplicity+1.png", alt: "Maximiles simplicity creative 1" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280467717-RU2W868OMV29YUDS6MHR/Focus+on+Simplicity+2.png", alt: "Maximiles simplicity creative 2" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280468237-VYYROKWQ01O1QLGS8MKC/Focus+on+Simplicity+3.png", alt: "Maximiles simplicity creative 3" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280468288-UI902Y7LG1OMRE006V5X/Focus+on+Simplicity+4.png", alt: "Maximiles simplicity creative 4" },
];

const successItems = [
  { icon: Target, text: "Optimised CPL (cost per lead) and CPR (cost per registration) for challenging target demographics" },
  { icon: TrendingUp, text: "Boosted DOI (double opt-in) sign-ups across all target audiences" },
  { icon: Shield, text: "Built loyalty in a space that's often perceived as untrustworthy" },
  { icon: Star, text: "Leveraged TrustPilot reviews to further emphasise Maximiles' legitimacy" },
  { icon: Video, text: "Created 'interactive' videos for Stories, TikToks, etc. to boost engagement, regularly adjusted based on ad performance" },
  { icon: Smartphone, text: "Increased mobile app downloads as an added bonus" },
];

function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover aspect-[9/16]"
      />
    </div>
  );
}

const MaximilesCaseStudy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Paid Ads Campaigns for Maximiles: driving sign-ups from challenging demographics | Trapeze Media</title>
        <meta
          name="description"
          content="We drove a 66% increase in double opt-in leads and reduced cost per registration by 46% for survey-and-reward brand Maximiles through creative paid social campaigns."
        />
        <link rel="canonical" href="https://trapezemedia.com/case-studies/maximiles" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[65vh] max-h-[75vh] min-h-[520px] overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/26c441b3-74f9-403a-b929-8af51bba0619/Maximiles+Paid+Ads+by+Trapeze+Media.jpg"
            alt="Maximiles Paid Ads by Trapeze Media"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container-content mx-auto px-4 relative z-20 pt-6">
          <BreadcrumbNav
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Maximiles", href: "/case-studies/maximiles" },
            ]}
            variant="light"
          />
        </div>

        <div className="container-content mx-auto px-4 relative z-10 h-full flex items-center">
          <ScrollReveal animation="left">
            <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight max-w-3xl">
              Paid Ads Campaigns for Survey-and-Reward Brand Maximiles
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mt-6 max-w-2xl leading-relaxed">
              How we used creative direction and meticulously-refined targeting to drive sign-ups from Maximiles' most challenging audience demographic
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro / Brief */}
      <section className="py-20 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-primary max-w-4xl mx-auto leading-relaxed text-center">
              Maximiles, a market research company who curate data through surveys which gift those who complete them a wide range of products, approached Trapeze Media in 2020 with three main goals:
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <ul className="mt-12 max-w-2xl mx-auto space-y-4">
              <li className="flex items-start gap-3 text-lg text-muted-foreground">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Generate <span className="text-primary font-semibold">double opt-in sign-ups</span> on the Maximiles UK website</span>
              </li>
              <li className="flex items-start gap-3 text-lg text-muted-foreground">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Increase popularity <span className="text-primary font-semibold">among audiences aged 18–25</span></span>
              </li>
              <li className="flex items-start gap-3 text-lg text-muted-foreground">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Measure successes as <span className="text-primary font-semibold">a 'cost per registration' KPI</span></span>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container-content mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-16">
              First 12 Months of Successes
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-8 max-w-3xl mx-auto mb-16">
            <ScrollReveal delay={0}>
              <AnimatedStat
                value={66}
                suffix="%"
                label="increase in DOI (double opt-in) leads in 12 months"
                delay={0}
              />
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <AnimatedStat
                value={46}
                suffix="%"
                label="optimised CPR (cost per result) reduction in 12 months"
                delay={150}
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {successItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="text-center space-y-3">
                    <div className="flex justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Creative Campaigns - Gamified Videos */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-6">
              Creative Ad Campaigns
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h3 className="heading-display text-2xl md:text-3xl text-primary mb-4">Gamified Videos</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To make our ads more memorable, we designed several 'interactive' Stories and TikToks which gamified 'tapping to stop' or 'holding to pause'. These prompted viewers to halt the video and nurtured conversations in comment sections, further legitimising the ads for cold audiences and sparking a snowball effect for engagement.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {videoFiles.map((video, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <VideoCard src={video.src} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus on: Prizes */}
      <section className="py-24 bg-muted">
        <div className="container-content mx-auto px-4 mb-12">
          <ScrollReveal>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h3 className="heading-display text-2xl md:text-3xl text-primary">Focus on: prizes</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We put the spotlight on the gifts Maximiles members can exchange their points for, continuously tweaking placements in Stories, TikToks, feed images, and carousels based on which items drove most clicks from each audience.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal>
          <SpotlightCarousel images={galleryPrizes} bgClass="bg-muted" />
        </ScrollReveal>
      </section>

      {/* Focus on: Legitimacy */}
      <section className="py-24 bg-background">
        <div className="container-content mx-auto px-4 mb-12">
          <ScrollReveal>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h3 className="heading-display text-2xl md:text-3xl text-primary">Focus on: legitimacy</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Maximiles has a long history and hundreds of good reviews. We brought both to the forefront, building trust and highlighting how existing members have enjoyed the site — one of many ways we drove more sign-ups.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal>
          <SpotlightCarousel images={galleryTrust} bgClass="bg-background" />
        </ScrollReveal>
      </section>

      {/* Focus on: Ease of Use */}
      <section className="py-24 bg-muted">
        <div className="container-content mx-auto px-4 mb-12">
          <ScrollReveal>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h3 className="heading-display text-2xl md:text-3xl text-primary">Focus on: ease of use</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By noting how frictionlessly Maximiles can fit into all the little pockets of time throughout a member's day, we boosted double opt-in sign-ups from a younger demographic who we found engage more with simpler customer acquisition journeys.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal>
          <SpotlightCarousel images={gallerySimplicity} bgClass="bg-muted" />
        </ScrollReveal>
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
            <h2 className="heading-display text-4xl md:text-5xl text-center mb-12">
              Testimonial
            </h2>

            <blockquote className="text-xl md:text-2xl lg:text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
              "We've used Trapeze as our paid social agency for around two years now. They've been great to work with. Super responsive, knowledgable, and creative. They are really engaged with our business and definitely part of our team. Most of all, they are a lovely bunch to work with."
            </blockquote>

            <cite className="block text-center mt-8 text-lg not-italic text-primary-foreground/80">
              — <span className="font-semibold text-primary-foreground">Enzo Rodia</span>, Head of Marketing & Media Sales, Maximiles UK/Bilendi
            </cite>
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

export default MaximilesCaseStudy;
