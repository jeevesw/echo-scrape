import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import paidAdsHero from "@/assets/services/paid-ads-hero.webp";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Share2,
  Search,
  Video,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const faqs = [
  {
    question: "How much do I need to spend on paid ads?",
    answer:
      "There's no universal minimum, but we typically recommend a testing budget of at least £1,500–£3,000/month per platform to generate meaningful data. We'll be upfront about what's realistic for your goals before any work begins.",
  },
  {
    question: "Do you manage the ad creative as well as the media buying?",
    answer:
      "Yes. Creative is one of the biggest variables in paid performance, and we don't treat it as an afterthought. We brief, direct and produce ad creative — or work with your existing assets — as part of the campaign management process.",
  },
  {
    question: "Can you run ads across multiple locations?",
    answer:
      "Absolutely — this is one of our core specialisms. We use hyperlocal targeting to run geo-specific campaigns that deliver different messages to audiences near different venues, which is particularly powerful for multi-site hospitality groups.",
  },
  {
    question:
      "Do you handle the Less Healthy Food (LHF) ad restrictions for food brands?",
    answer:
      "Yes. We conduct an LHF compliance review as standard for all food and drink clients. Our team is up to date with ASA guidance and can advise on what's permissible, what needs adjustment, and how to stay creative within the rules.",
  },
  {
    question: "What platforms do you advertise on?",
    answer:
      "We currently run paid campaigns on Meta (Facebook & Instagram), Google (Search, Display, Performance Max, YouTube) and TikTok. We can advise on which mix is right for your goals and budget.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Paid ads can drive results from day one — but the first 4–6 weeks are typically a testing and optimisation phase. We set expectations clearly upfront and report transparently on what's working and why.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Paid Advertising",
  provider: {
    "@type": "Organization",
    name: "Trapeze Media",
    url: "https://trapezemedia.co.uk",
  },
  description:
    "Paid social, paid search and TikTok ad campaigns for hospitality, restaurant and lifestyle brands.",
  areaServed: "GB",
  serviceType: "Paid Advertising",
};

const platforms = [
  {
    icon: Share2,
    name: "Meta Ads (Facebook & Instagram)",
    learnMore: "Meta advertising",
    imageLabel:
      "Image: Meta/Instagram ad example — e.g. a phone showing an Instagram Story ad or Reel ad for a hospitality brand.",
    description:
      "The world's most powerful platform for reaching consumers based on interests, behaviours, and location. We run campaigns across the full funnel — from awareness-driving Reels to conversion-focused dynamic ads — with hyperlocal targeting to reach the right audiences within the right radius of your venues.",
  },
  {
    icon: Search,
    name: "Google Ads (Search, Display & Performance Max)",
    learnMore: "Google advertising",
    imageLabel:
      "Image: Google Search or Performance Max — e.g. a laptop or phone showing a Google search results page with an ad, or a Google Ads dashboard screenshot.",
    description:
      "Capture demand from people already searching for what you offer. From branded search protection to local intent queries like \\\"restaurants near me\\\", we make sure your brand shows up at the exact moment someone is ready to act.",
  },
  {
    icon: Video,
    name: "TikTok Ads",
    learnMore: "TikTok advertising",
    imageLabel:
      "Image: TikTok ad creative — e.g. a phone showing a TikTok video ad or For You Page, ideally from a hospitality or food brand. Vertical format.",
    description:
      "For brands targeting 18–35 audiences, TikTok is now a primary discovery channel — and one most of your competitors haven't fully cracked. We produce and run TikTok ad campaigns end-to-end, combining native-style creative with precise targeting to drive both online conversions and in-venue visits.",
  },
];

const includedItems = [
  "Campaign strategy and audience mapping",
  "Ad creative direction and copywriting",
  "Platform setup, pixel installation and tracking",
  "A/B testing and ongoing optimisation",
  "Hyperlocal geo-targeting (by postcode, radius or venue cluster)",
  "Weekly performance snapshots and monthly reporting",
  "LHF ad compliance review for food and drink brands",
];

const sectors = [
  "Restaurants & QSR",
  "Hospitality & Hotels",
  "Entertainment & Events",
  "Bars, Clubs & Nightlife",
  "Lifestyle & Consumer Brands",
  "Private Medical & Aesthetics",
];

const results = [
  {
    tag: "TikTok Campaign",
    client: "YO! Sushi",
    stat: "+6%",
    description: "Increase in restaurant bookings in campaign period",
  },
  {
    tag: "Meta Lead Generation",
    client: "Mycelia",
    stat: "£500k+",
    description: "Raised via Kickstarter, powered by paid social",
  },
  {
    tag: "Google Ads",
    client: "Various Eateries",
    stat: "↑ Covers",
    description:
      "Multi-venue bookings uplift across the restaurant group",
  },
  {
    tag: "Paid Social",
    client: "Maximiles",
    stat: "Gen-Z",
    description:
      "Highly targeted Gen-Z audience reached and engaged at scale",
  },
];

const clientLogos = [
  { src: "/images/clients/yo-sushi.svg", alt: "YO! Sushi" },
  { src: "/images/clients/radisson-hotels.svg", alt: "Radisson Hotels" },
  { src: "/images/clients/various-eateries.svg", alt: "Various Eateries" },
];

const PaidAdvertisingPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>
          Paid Advertising Agency for Hospitality &amp; Lifestyle Brands |
          Trapeze Media
        </title>
        <meta
          name="description"
          content="Trapeze Media runs paid social, paid search and TikTok ads for hospitality, restaurant and lifestyle brands. Meta, Google & TikTok campaigns that drive bookings, footfall and sales."
        />
        <link
          rel="canonical"
          href="https://trapezemedia.co.uk/services/paid-advertising"
        />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* SECTION 1 — HERO (bold asymmetric) */}
      <section className="bg-background overflow-hidden">
        <div className="grid lg:grid-cols-[55%_45%] min-h-[70vh]">
          {/* Left column */}
          <div className="relative flex items-center py-16 lg:py-24 px-6 md:px-12 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
            <div className="relative z-10 max-w-xl">
              <BreadcrumbNav
                items={[
                  { label: "Services", href: "/services" },
                  {
                    label: "Paid Advertising",
                    href: "/services/paid-advertising",
                  },
                ]}
              />

              <h1 className="heading-display text-4xl md:text-4xl lg:text-5xl text-primary mb-6">
                Paid Advertising for Hospitality & Lifestyle Brands
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Meta, Google, and TikTok ads that drive real-world results:
                bookings, footfall, sales, and sign-ups.
              </p>

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
                  <Link to="/case-studies">View Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right column — full-bleed image placeholder */}
          <div className="hidden lg:block bg-muted overflow-hidden">
            <img
              src={paidAdsHero}
              alt="Maximiles paid ads campaign managed by Trapeze Media — laptop showing rewards platform"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO with pull quote */}
      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Paid advertising is how hospitality and lifestyle brands reach people
            who don't already know they exist. Whether you need to fill tables on
            a quiet Tuesday, drive footfall to a new venue, sell out an event, or
            grow an email list — paid ads, when done well, are your most
            controllable and scalable lever.
          </p>

          {/* Pull quote */}
          <div className="border-l-4 border-primary pl-6 my-10">
            <p className="text-2xl text-primary font-semibold leading-snug">
              Your most controllable and scalable lever.
            </p>
          </div>

          <p className="text-lg text-foreground leading-relaxed">
            At Trapeze Media, we specialise in paid advertising for food, drink,
            events, entertainment, and lifestyle brands. We've run campaigns
            across Meta, Google, and TikTok for brands including YO! Sushi,
            Various Eateries, Radisson Hotels, and Maximiles. We understand how
            your customers discover new experiences — and what makes them convert.
          </p>
        </div>
      </section>

      {/* SECTION 3 — PLATFORMS (large alternating panels) */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-16">
            The Platforms We Work With
          </h2>

          <div className="space-y-8 max-w-6xl mx-auto">
            {platforms.map((platform, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <div
                  key={platform.name}
                  className="bg-background rounded-2xl border border-border/40 overflow-hidden grid md:grid-cols-[40%_60%] min-h-[320px]"
                  style={{
                    direction: imageLeft ? "ltr" : "rtl",
                  }}
                >
                  {/* Image side */}
                  <div className="bg-muted/60 flex items-center justify-center p-8 min-h-[200px] md:min-h-0">
                    <p
                      className="text-xs text-muted-foreground text-center leading-relaxed max-w-[200px]"
                      style={{ direction: "ltr" }}
                    >
                      {platform.imageLabel}
                    </p>
                  </div>

                  {/* Text side */}
                  <div
                    className="p-8 md:p-10 flex flex-col justify-center"
                    style={{ direction: "ltr" }}
                  >
                    <platform.icon className="h-10 w-10 text-primary mb-5" />
                    <h3 className="heading-display text-2xl text-foreground mb-4">
                      {platform.name}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-5">
                      {platform.description}
                    </p>
                    <span className="text-primary text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200 cursor-pointer">
                      Learn more about {platform.learnMore}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED (split layout with typographic accent) */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[45%_55%] gap-10 max-w-6xl mx-auto items-start">
            {/* Left — image placeholder */}
            <div className="bg-muted rounded-2xl flex items-center justify-center p-8 min-h-[400px] lg:min-h-[520px]">
              <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-sm">
                Image: Trapeze Media team at work, or a campaign reporting
                dashboard. A behind-the-scenes or 'craft' image works well here —
                something that communicates process and expertise.
              </p>
            </div>

            {/* Right — typographic accent + heading + checklist */}
            <div>
              <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-8">
                What's Included
              </h2>

              <div className="space-y-0">
                {includedItems.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-start gap-3 py-3 ${
                      i < includedItems.length - 1
                        ? "border-b border-border/40"
                        : ""
                    }`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — SECTORS (dark background) */}
      <section className="bg-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-background mb-4">
            Sectors We Specialise In
          </h2>
          <p className="text-background/60 mb-10 max-w-xl mx-auto">
            If your brand relies on people showing up — in person or online — we
            can help you reach them.
          </p>

          {/* Sector pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border-2 border-background/30 text-background px-5 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-primary hover:border-primary hover:text-primary-foreground cursor-default"
              >
                {sector}
              </span>
            ))}
          </div>

          {/* Client logos */}
          <p className="text-xs text-background/40 uppercase tracking-wider mb-4">
            Brands we've worked with
          </p>
          <div className="flex items-center justify-center gap-10">
            {clientLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-8 brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — RESULTS (dramatic stats) */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-14">
            Campaigns That Delivered
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {results.map((r) => (
              <div
                key={r.client}
                className="bg-muted rounded-2xl p-8 border-t-4 border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1">
                  {r.tag}
                </span>
                <h3 className="heading-display text-xl text-foreground mt-4 mb-1">
                  {r.client}
                </h3>
                <p className="heading-display text-6xl text-primary leading-none my-4">
                  {r.stat}
                </p>
                <p className="text-sm text-muted-foreground">{r.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero-outline" asChild>
              <Link to="/case-studies">
                See All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TESTIMONIAL (bigger, more space) */}
      <section className="bg-primary py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-4 text-center text-primary-foreground">
          <span
            className="text-[120px] leading-none text-primary-foreground/20 block mb-0 select-none"
            aria-hidden="true"
          >
            "
          </span>
          <blockquote className="text-2xl font-light italic leading-relaxed mb-10 -mt-8">
            I love working with Trapeze Media. They're strategic,
            highly-responsive, and bring creative direction to our campaigns.
            They're not just an agency we work with — they have become an
            extended part of the team as well as a business growth partner that
            has helped us achieve an incremental ROI through managing our paid ads
            campaigns.
          </blockquote>

          <div className="border-t border-primary-foreground/20 pt-6 inline-flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary-foreground">
                HH
              </span>
            </div>
            <cite className="not-italic text-base opacity-80 text-left">
              — Hayan Hwang, Senior Growth &amp; Digital Marketing Manager, YO!
              Sushi
            </cite>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ (cleaner, bg-background) */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Everything you need to know about working with Trapeze Media on paid
            advertising.
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-muted rounded-xl px-6 border-0"
                >
                  <AccordionTrigger className="hover:no-underline text-left py-5 group">
                    <span className="font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* SECTION 9 — CLOSING CTA */}
      <section className="bg-muted relative overflow-hidden py-20 lg:py-28">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-6">
            Ready to Make Your Ad Budget Work Harder?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're new to paid advertising or looking to get more from an
            existing agency relationship, we'd love to talk. Let's start with a
            no-obligation discovery call.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaidAdvertisingPage;
