import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import { TestimonialBlock } from "@/components/services/TestimonialBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenLine, Share2, Mic, MessageCircle, Target, Trophy, Users, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/services/social-media-management.jpg";
import fitzImage from "@/assets/case-studies/fitz-sparkling-wine.webp";

const service = servicesData["social-media-management"];
const baseUrl = "https://trapezemedia.com";

const objections = [
  {
    question: "My follower growth and engagement are low — is social media worth it?",
    answer: "There are hundreds of factors influencing performance: time of day, posting frequency, hashtags, legibility. We find the intersection that brings your online presence to life and turns your brand appeal into a science.",
  },
  {
    question: "My following is growing but not converting to sales — why?",
    answer: "A 'user journey' is the path between seeing your content and buying. We audit and evolve your current approach to re-engage repeat customers and strengthen the path from scroll to sale.",
  },
  {
    question: "I don't have time for social media and need my staff focused on their jobs.",
    answer: "With clearly-defined goals and an agency behind you, social can integrate into daily operations with minimal effort. We create a messaging group where creative ideas are exchanged instantly — you stay in the loop without being in the weeds.",
  },
];

const servicesGrid = [
  { icon: PenLine, title: "Content Creation", description: "Our copywriters, photographers, filmmakers, and designers will produce the content that will become the figureheading visuals for your social feeds and campaigns" },
  { icon: Share2, title: "Content Curation", description: "User-generated content is not to be overlooked — we can re-share posts from your followers and other brands in your industry, showcasing your product as an established consumer favourite" },
  { icon: Mic, title: "Brand Voice", description: "We'll identify, distill, and adapt your brand voice, creating a consistent tone through copy and visual motifs, and evolving that tone to work effectively across a variety of social campaigns" },
  { icon: MessageCircle, title: "Follower Engagement", description: "We'll keep existing followers engaged with regular conversations, and track relevant hashtags and topics to find new people to spark discussions with, all with your brand at the forefront" },
  { icon: Target, title: "Creative Campaigns", description: "We can plan strategic social media campaigns around your specific business goals, e.g. raising awareness of new products, targeting certain demographics, and selling out events" },
  { icon: Trophy, title: "Creative Competitions", description: "Giveaways can be a core part of any successful social media campaign. We'll manage competitions, engage with entrants, and find ways to collect customer data for later retargeting" },
  { icon: Users, title: "User Journey", description: "Where you lead your followers after they see your content dictates how you'll convert them to customers. We'll ensure your user journey is simple, discoverable, and focused on key goals" },
  { icon: FileText, title: "Monthly Reports", description: "We prepare reports at the end of every month detailing the successes of our work, and highlighting how we'll continue to support your key goals and campaigns in the following month" },
];

const SocialMediaManagementPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta property="og:image" content={heroImage} />
        <link rel="canonical" href={`${baseUrl}/services/social-media-management`} />
      </Helmet>
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="Social Media Management"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/social-media-management`}
      />
      <FAQSchema faqs={service.faqs} />

      {/* Breadcrumb + Hero */}
      <ServiceHero
        variant="brand-pink"
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        backgroundImage={heroImage}
        primaryCta={{ label: "Schedule a Call", href: "https://calendly.com/trapezemedia/discovery-call", external: true }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        breadcrumbItems={[
          { label: "Services", href: "/services" },
          { label: "Social Media Management", href: "/services/social-media-management" },
        ]}
      />

      {/* Summary */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-4xl">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">{service.summary}</p>
          </div>
        </div>
      </section>


      {/* Our Social Media Management Services */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Our Social Media Management Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {servicesGrid.map((f, i) => (
              <Card key={i} className="border-0 bg-background text-center">
                <CardContent className="p-6">
                  <f.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="heading-display text-lg text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-base">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study — Fitz — Banner */}
      <section
        className="relative bg-cover bg-center bg-fixed py-24 lg:py-32"
        style={{ backgroundImage: `url(${fitzImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <span className="text-white text-sm font-semibold uppercase tracking-widest mb-4 block">
            Social Media Management · Case Study
          </span>
          <h2 className="heading-display text-5xl lg:text-6xl text-white mb-3">
            2,419 New Followers in Two Months
          </h2>
          <p className="text-white/70 text-lg">for sparkling wine brand Fitz</p>
        </div>
      </section>

      {/* Case Study — Fitz — Body */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                English sparkling wine brand Fitz needed a social presence that matched their bold, rebellious personality. Our #PerfectDayOutIn campaign put the spotlight on things people could enjoy from home — movies, theatre livestreams, virtual museum tours — all with a glass of Fitz in hand. We kept Fitz culturally relevant throughout lockdown, built a loyal community, and created a content bank that lasted months.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { value: "2,419", label: "New followers · Gained 100% organically" },
                { value: "6,273", label: "People engaged · Over two months" },
                { value: "100+", label: "Pieces of content · From one shoot day" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl px-6 py-4 text-center border border-border bg-background"
                >
                  <span className="heading-display text-4xl text-primary block">{s.value}</span>
                  <span className="text-sm uppercase tracking-wide mt-1 block text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <TestimonialBlock
        quote="Since our first meeting with Trapeze Media, we have been very impressed with the approach they bring to our social media management. They combine a talent for creative flair with an excellent understanding of the analytical side to deliver powerful results. I would have no hesitation in recommending."
        attribution="Dan Cahill"
        role="Managing Director, Divergent Drinks / Fitz Wine"
      />

      {/* Industries */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-3xl text-foreground mb-8">Industries We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {service.industries.map((ind, i) => (
              <span key={i} className="px-5 py-3 bg-muted rounded-full text-foreground text-base">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <TeamSection />

      {/* FAQs */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-xl px-6 border-0">
                  <AccordionTrigger className="hover:no-underline text-left py-5">
                    <span className="heading-display text-foreground text-lg">{faq.question}</span>
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

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-4xl md:text-5xl mb-6">{service.ctaHeadline}</h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8">{service.ctaText}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Call <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="hero-outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SocialMediaManagementPage;
