import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { ServiceHero } from "@/components/services/ServiceHero";
import { YouTubeMockup } from "@/components/services/YouTubeMockup";
import { WorkflowGrid } from "@/components/services/WorkflowGrid";
import { InlineCaseStudy } from "@/components/services/InlineCaseStudy";
import { TeamSection } from "@/components/services/TeamSection";
import { GalleryRow } from "@/components/services/GalleryRow";
import { ImagePlaceholder } from "@/components/services/ImagePlaceholder";
import { AnimatedStatCard } from "@/components/case-study/AnimatedStatCard";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, useScrollReveal } from "@/hooks/use-scroll-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useCountUp } from "@/hooks/use-count-up";

import youtubeMark from "@/assets/youtube-ad-agency.webp.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const baseUrl = "https://trapezemedia.co.uk";

/* ---------- Rough marker-style highlight for key phrases ---------- */
const Highlight = ({ children }: { children: ReactNode }) => (
  <span
    className="bg-primary px-2 py-0.5 font-bold text-primary-foreground decoration-clone"
    style={{ boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" } as CSSProperties}
  >
    {children}
  </span>
);

const shortsCards = [
  {
    title: "Vertical Video, Older Audience",
    description:
      "Shorts behaves more like TikTok than like traditional YouTube: same aspect ratio, same three-second window. The audience skews significantly older and broader, which matters if your covers don't come from under-25s.",
  },
  {
    title: "One Shoot, Every Platform",
    description:
      "If you're already making vertical creative for TikTok or Reels, most of a Shorts campaign already exists. We film once and cut for all three.",
  },
  {
    title: "Hooks Tested Per Platform",
    description:
      "What holds attention on TikTok doesn't always hold on Shorts. We test creative separately against each rather than assuming a transfer.",
  },
  {
    title: "Cheap Incremental Reach",
    description:
      "Running existing assets in a second place is the lowest-cost reach available to most hospitality brands, and it hedges against any one platform having a bad quarter.",
  },
];

const formatCards = [
  {
    title: "Skippable In-Stream",
    description:
      "Plays before or during another video, skippable after five seconds. The workhorse format, where the first five seconds do all the work.",
  },
  {
    title: "Non-Skippable In-Stream",
    description:
      "Fifteen to twenty seconds with no escape. Best for a single clear message to a well-defined audience, so targeting has to be right.",
  },
  {
    title: "Bumper Ads",
    description:
      "Six seconds, non-skippable. Useful for reminding people you exist ahead of a weekend or a launch, and cheap to both produce and run.",
  },
  {
    title: "In-Feed Video",
    description:
      "Appears in YouTube search results and alongside related videos. Closer to a search ad than a TV spot, and useful when people are actively looking.",
  },
  {
    title: "Shorts",
    description:
      "Vertical and in-feed. The format most brands are underinvesting in relative to where attention has actually gone.",
  },
  {
    title: "Demand Gen Campaigns",
    description:
      "Google's blended format running across in-stream, Shorts, Discover and Gmail from one campaign. Strong for building audiences you can retarget later.",
  },
];

const attributionCards = [
  {
    title: "We Measure The Lift",
    description:
      "Brand search volume, direct traffic and bookings tracked against campaign flight dates, so we can show correlation and be straight about what it does and doesn't prove.",
  },
  {
    title: "Tracking That Survives The Gap",
    description:
      "Booking links per site and per campaign, codes that exist nowhere else, and source captured at the point of booking.",
  },
  {
    title: "Feeding The Rest Of The Funnel",
    description:
      "Video view campaigns build audiences that get retargeted through search and paid social, where attribution is cleaner. YouTube's job is to make the later click cheaper.",
  },
];

const workflowSteps = [
  {
    number: 1,
    title: "Plan",
    description:
      "We establish what the campaign is for in commercial terms: bookings, covers, enquiries, a new site launch. Then we work backwards to formats, audiences and budget.",
  },
  {
    number: 2,
    title: "Produce",
    description:
      "Concepts, scripts, shoot, edit. Several distinct ideas rather than one polished film, because testing needs something to compare.",
  },
  {
    number: 3,
    title: "Launch",
    description:
      "Campaign build in Google Ads, audience layering, and tracking implemented before a penny is spent.",
  },
  {
    number: 4,
    title: "Refine",
    description:
      "Weekly performance review, creative rotated as it fatigues, budget moved toward what holds attention and drives bookings.",
  },
];

const featuredStats = [
  { end: 13, suffix: ":1", label: "ROAS for Coppa Club" },
  { end: 60, suffix: "%", label: "increase in restaurant bookings, YO!" },
];

const secondaryStats = [
  { end: 85, suffix: "%", label: "increase in table bookings, Coppa Club" },
  { end: 118, suffix: "%", label: "increase in clicks to book, Various Eateries" },
  { end: 67, suffix: "%", label: "lower cost per acquisition, Various Eateries" },
  { end: 28, suffix: "%", label: "uplift in Click & Collect, YO!" },
];

const testimonialQuote =
  "We provided a challenging brief: reduce overall ad spend, lower our CPA, and increase tracked visits and confirmed bookings. The team at Trapeze not only managed this but were able to find new and innovative ways for us to track our results end to end and present findings in a way that the wider VEL team could understand and buy into.";

const faqs = [
  {
    question: "How much do YouTube ads cost in the UK?",
    answer:
      "Media spend depends on format, audience and competition, so a meaningful minimum is a few thousand pounds a month rather than a few hundred. Bumper and Shorts placements are typically cheaper to serve than tightly-targeted in-stream.",
  },
  {
    question: "Can I target YouTube ads to a specific area?",
    answer:
      "Yes, and considerably more precisely than on TikTok. Google Ads supports radius targeting around a location, which matters when you're driving footfall to individual sites rather than building national awareness.",
  },
  {
    question: "Do YouTube Shorts ads work for restaurants?",
    answer:
      "They work when the creative earns the first three seconds. Shorts rewards the same instincts as TikTok, with an audience that skews older, so it suits operators whose customers aren't primarily under 25.",
  },
  {
    question: "Can you use our existing TikTok videos on YouTube?",
    answer:
      "Usually yes, and it's often the fastest route to testing the channel. We'd normally re-cut rather than repost, since hooks that work on one platform don't always transfer.",
  },
  {
    question: "How do you prove YouTube ads are working if people don't click?",
    answer:
      "We track brand search and direct traffic lift against campaign dates, build booking-level tracking that captures source at the point of conversion, and use YouTube audiences to feed retargeting where attribution is cleaner.",
  },
  {
    question: "Do you produce the video as well as run the ads?",
    answer:
      "Yes. Our production and media teams work together, which means creative is built for how it will be bought rather than handed over as a finished file.",
  },
  {
    question: "What's the minimum commitment?",
    answer:
      "Retainers run on a twelve-month minimum. Production can be commissioned as a standalone project.",
  },
];

const workGallery = [
  {
    client: "YO!",
    title: "Perri Kiely x Furi Furi Chicken",
    description:
      "Diversity member and street dancer Perri Kiely partnered with YO! to mark the Furi Furi launch at Bluewater, supported by search and YouTube activity.",
    video:
      "https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//Earnies x Yo! Sushi - Perri Kiely - Client Edit - V3.mp4",
    stats: [
      { value: "1M+", label: "views in week one" },
      { value: "+60%", label: "increase in restaurant bookings" },
    ],
    href: "/case-studies/yo",
  },
  {
    client: "The Cube",
    title: "Tron-inspired concept films",
    description:
      "We project managed and produced three concept videos for The Cube, welcoming influencers onto the shoot to amplify the reach of the finished films.",
    video:
      "https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//The-Cube-Trapeze-Media-Video-Production-1.mp4",
    stats: [
      { value: "3", label: "concept videos produced" },
      { value: "1", label: "shoot, cut for every platform" },
    ],
    href: "/services/tiktok-production",
  },
  {
    client: "Paris Baguette",
    title: "LHF-compliant creative",
    description:
      "With Less Healthy Food rules restricting product-led advertising, we built occasion-led creative that implied indulgence while staying fully compliant.",
    video:
      "https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//Paris-Baguette-LHF-Video.mp4",
    stats: [
      { value: "+83%", label: "branded search uplift" },
      { value: "+60%", label: "footfall conversions" },
    ],
    href: "/case-studies/paris-baguette",
  },
];

/* ---------- Hero mockup with subtle parallax drift ---------- */
const ParallaxMockup = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      setOffset(Math.max(-30, Math.min(30, progress * 40)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="w-full flex justify-center will-change-transform"
      style={{ transform: `translate3d(0, ${offset}px, 0)`, transition: "transform 0.15s ease-out" }}
    >
      <YouTubeMockup
        src="https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//YO-Sushi-Trapeze-Media-PPC-Video.mp4"
        maxWidth={1240}
      />
    </div>
  );
};

/* ---------- Formats: tabs on desktop, accordion on mobile ---------- */
const FormatShowcase = () => {
  const [active, setActive] = useState(0);
  const item = formatCards[active];

  return (
    <>
      {/* Desktop tabs */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="relative flex flex-wrap gap-x-8 gap-y-3 justify-center border-b border-border pb-0 mb-10">
          {formatCards.map((f, i) => (
            <button
              key={f.title}
              type="button"
              onClick={() => setActive(i)}
              className={`relative pb-4 text-base lg:text-lg heading-display transition-colors duration-300 ease-out ${
                i === active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={i === active}
            >
              {f.title}
              <span
                className={`absolute left-0 right-0 -bottom-px h-[3px] bg-primary rounded-full origin-center transition-transform duration-300 ease-out ${
                  i === active ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <div key={active} className="max-w-3xl mx-auto text-center animate-fade-in">
          <h3 className="heading-display text-2xl lg:text-3xl text-foreground mb-4">{item.title}</h3>
          <p className="text-xl text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden max-w-xl mx-auto">
        <Accordion type="single" collapsible defaultValue="format-0" className="space-y-3">
          {formatCards.map((f, i) => (
            <AccordionItem
              key={f.title}
              value={`format-${i}`}
              className="bg-muted rounded-xl px-5 border-0 border-l-4 border-l-transparent data-[state=open]:border-l-primary transition-colors duration-300"
            >
              <AccordionTrigger className="hover:no-underline text-left py-4">
                <span className="heading-display text-lg text-foreground">{f.title}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg leading-relaxed">
                <p>{f.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

/* ---------- Testimonial with line-by-line reveal ---------- */
const AnimatedTestimonial = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  const reduced = usePrefersReducedMotion();
  const sentences = testimonialQuote.match(/[^.]+\.?/g) ?? [testimonialQuote];

  return (
    <section className="bg-primary py-24 lg:py-32">
      <div ref={ref} className="max-w-2xl mx-auto px-4 text-center text-primary-foreground">
        <span
          className="text-[120px] leading-none text-primary-foreground/20 block mb-0 select-none"
          aria-hidden="true"
        >
          "
        </span>
        <blockquote className="text-2xl md:text-3xl font-light italic leading-relaxed mb-10 -mt-8">
          {sentences.map((s, i) => (
            <span
              key={i}
              className="inline transition-all duration-500 ease-out"
              style={{
                opacity: isRevealed || reduced ? 1 : 0,
                transitionDelay: reduced ? "0ms" : `${i * 120}ms`,
              }}
            >
              {s}
            </span>
          ))}
        </blockquote>
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col items-center gap-3">
          <cite className="not-italic text-base opacity-80">
            — Steve Roberts, Digital Marketing Director, Various Eateries
          </cite>
          <Button
            variant="hero-outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary mt-4"
            asChild
          >
            <Link to="/case-studies/various-eateries">See the case study</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

/* ---------- Count-up stat for the dark stats band ---------- */
const AnimatedStatCardLarge = ({
  end,
  suffix,
  prefix,
  label,
  small,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  small?: boolean;
}) => {
  const { ref, displayValue } = useCountUp({ end, suffix, prefix, duration: 2000 });
  return (
    <div ref={ref}>
      <span
        className={`heading-display text-primary block ${small ? "text-4xl" : "text-6xl"}`}
      >
        {displayValue}
      </span>
      <span className="text-base text-white/70 mt-2 block leading-snug">{label}</span>
    </div>
  );
};

const YouTubeAdsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>YouTube Ads Agency UK | YouTube Advertising &amp; Shorts | Trapeze Media</title>
        <meta
          name="description"
          content="YouTube ads agency for UK restaurant groups and multi-site brands. Shorts, in-stream and Demand Gen campaigns, produced and managed in-house."
        />
        <link rel="canonical" href={`${baseUrl}/services/youtube-ads`} />
      </Helmet>
      <ServiceSchema
        name="YouTube Ads"
        description="YouTube advertising for UK restaurant groups, multi-site operators and hospitality brands. Shorts, in-stream and Demand Gen campaigns, produced and managed in-house."
        provider="Trapeze Media"
        serviceType="YouTube Advertising"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/youtube-ads`}
      />
      <FAQSchema faqs={faqs} />

      {/* 1 — HERO */}
      <ServiceHero
        variant="dark"
        eyebrow="Paid Media"
        headline="Your YouTube Ads Agency"
        subheadline="Most agencies treat YouTube as somewhere to park a cut-down of a TV ad. We treat it as the second home for creative you're already making, and increasingly as the first place a customer meets your brand."
        primaryCta={{ label: "Free discovery call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "See our video work", href: "/services/video-production" }}
        hideCtas
        breadcrumbItems={[
          { label: "Services", href: "/services" },
          { label: "YouTube Ads", href: "/services/youtube-ads" },
        ]}
      />

      <section className="bg-[hsl(60,1%,8%)] pb-16 lg:pb-24 -mt-12 lg:-mt-24">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <ParallaxMockup />
          <div className="flex flex-wrap gap-4 justify-center mt-10 lg:mt-12">
            <Button variant="hero" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                Free discovery call <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="hero-outline" className="border-white text-white hover:bg-white hover:text-foreground" asChild>
              <Link to="/services/video-production">See our video work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3 — INTRO */}
      <section className="relative z-20 bg-primary py-10 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] items-center lg:items-stretch gap-6 lg:gap-0">
            {/* YouTube mark, off to the left, overlapping neighbouring sections */}
            <div className="relative pointer-events-none lg:-my-[105px]" aria-hidden="true">
              <img
                src={youtubeMark.url}
                alt=""
                className="mx-auto w-auto max-w-full h-[200px] object-contain drop-shadow-2xl lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:max-w-none"
              />
            </div>
            <ScrollReveal>
              <div className="relative z-10 rounded-2xl bg-background shadow-2xl px-8 py-10 lg:px-12 lg:py-14 lg:-ml-12">
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                  We plan,{" "}
                  <Link to="/services/video-production" className="text-primary underline underline-offset-4">
                    produce
                  </Link>{" "}
                  and run YouTube advertising for restaurant groups, multi-site operators and private medical brands
                  across the UK, alongside our{" "}
                  <Link to="/services/paid-search" className="text-primary underline underline-offset-4">
                    Google Ads
                  </Link>{" "}
                  and{" "}
                  <Link to="/services/paid-advertising" className="text-primary underline underline-offset-4">
                    paid social
                  </Link>{" "}
                  work. Beyond just plays, we focus on{" "}
                  <Highlight>whether someone within a few miles of your business walked in after seeing a video ad.</Highlight>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8 — ATTRIBUTION */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground text-center mb-6">
              The attribution gap, and how we close it
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-3xl mx-auto text-center mb-12">
              Someone sees a video ad on a Tuesday, doesn't click, and books a table a fortnight later after searching
              your brand name. Analytics records that as brand or direct traffic, and YouTube gets no credit.{" "}
              <Highlight>Here's how we bridge that gap:</Highlight>
            </p>
          </ScrollReveal>
          <div className="grid gap-6 max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {attributionCards.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="relative h-full overflow-hidden rounded-2xl bg-muted border border-transparent p-8 pt-12 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-primary">
                  <span
                    className="heading-display absolute top-1 right-4 text-8xl leading-none text-primary/10 select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="relative heading-display text-xl md:text-2xl text-primary mb-3">{item.title}</h3>
                  <p className="relative text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — CASE STUDY: MYCELIA */}
      <section className="bg-[hsl(60,1%,8%)] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-3 block">
                  Case Study
                </span>
                <p className="text-sm text-white/50 mb-1">Mycelia</p>
                <h2 className="heading-display text-4xl md:text-5xl text-white mb-6">
                  Video view ads into retargeting
                </h2>
                <div className="space-y-5 text-xl text-white/70 leading-relaxed">
                  <p>
                    Jack's gameplay overview videos lent themselves perfectly to our video view awareness campaigns. We
                    tested different voiceovers — US accents vs. UK accents — to connect with different audiences
                    around the world.
                  </p>
                  <p>
                    Ultimately, <Highlight>67% of the Kickstarter crowdfunder's backers were based in the US.</Highlight>{" "}
                    The videos were created by{" "}
                    <a
                      href="https://www.chipcreative.co.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                      Chip Creative
                    </a>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <AnimatedStatCard end={545804} prefix="£" label="raised against a £9,000 target" />
                  <AnimatedStatCard end={50} suffix=" mins" label="to hit target" delay={120} />
                  <AnimatedStatCard end={10492} label="backers" delay={240} />
                </div>
                <Button variant="hero" className="mt-8" asChild>
                  <Link to="/case-studies/mycelia">
                    Read the case study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="overflow-hidden rounded-2xl aspect-video shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/6tKw5jaYF9w"
                  title="How To Play: Mycelia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2 — CLIENT LOGOS */}
      <ClientLogoCarousel background="background" />

      {/* 4 — SHORTS: numbered list + sticky vertical still */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground text-center mb-12">
              The untapped power of Shorts
            </h2>
          </ScrollReveal>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16 items-start">
            <ol className="space-y-10">
              {shortsCards.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 100}>
                  <li className="flex gap-6">
                    <span className="heading-display text-6xl text-primary/30 leading-none shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="heading-display text-2xl md:text-3xl text-foreground mb-3">{item.title}</h3>
                      <p className="text-xl text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[9/16] bg-foreground/5">
                <video
                  src="https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/videos//Paris-Baguette-Trapeze-Media-Video-Production.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — FORMATS */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground text-center mb-12">
              The formats, and when each earns its place
            </h2>
          </ScrollReveal>
          <FormatShowcase />
        </div>
      </section>

      {/* 10 — STATS */}
      <section className="bg-[hsl(60,1%,8%)] py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-white text-center mb-12">
              YouTube advertising successes
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 flex flex-col gap-6">
              {featuredStats.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 100}>
                  <div className="rounded-2xl border-2 border-primary bg-white/5 p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                    <AnimatedStatCardLarge {...s} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 content-center">
              {secondaryStats.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                    <AnimatedStatCardLarge {...s} small />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Button variant="hero-outline" asChild>
              <Link to="/case-studies/various-eateries">Various Eateries case study</Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link to="/case-studies/yo">YO! case study</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 11 — WORK GALLERY */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground text-center mb-12">
              Recent work
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {workGallery.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 100}>
                <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-muted transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative w-full aspect-video bg-foreground/5">
                    <video
                      src={w.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{w.client}</p>
                    <h3 className="heading-display text-2xl text-foreground mb-3">{w.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{w.description}</p>
                    <div className="mt-auto space-y-2">
                      {w.stats.map((s) => (
                        <div key={s.label} className="flex items-baseline gap-3">
                          <span className="heading-display text-3xl text-primary">{s.value}</span>
                          <span className="text-sm text-muted-foreground">{s.label}</span>
                        </div>
                      ))}
                      {w.href && (
                        <Button variant="outline" className="mt-4" asChild>
                          <Link to={w.href}>
                            See the case study <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — TESTIMONIAL */}
      <AnimatedTestimonial />

      {/* 13 — WORKFLOW */}
      <WorkflowGrid heading="How we work" columns={4} steps={workflowSteps} animated />

      {/* 14 — TEAM */}
      <TeamSection serviceName="YouTube Ads" memberNames={["Kitty", "Ashley", "Dani"]} />

      {/* 15 — FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-4xl md:text-5xl text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-muted rounded-xl px-6 border-0 border-l-4 border-l-transparent data-[state=open]:border-l-primary transition-colors duration-300"
                >
                  <AccordionTrigger className="hover:no-underline text-left py-5">
                    <span className="heading-display text-foreground text-xl">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 16 — CLOSING CTA */}
      <section className="bg-muted relative overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
            Ready to put your video where the attention is?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell us what the campaign needs to achieve commercially and we'll tell you whether YouTube is the right
            place to spend.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" asChild>
              <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YouTubeAdsPage;
