import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceSchema } from "@/components/seo/SchemaMarkup";
import { servicesData } from "@/data/servicesData";
import { ServiceHero } from "@/components/services/ServiceHero";
import creativeHero from "@/assets/services/creative-services-hero.webp";
import { SubServiceHero } from "@/components/services/SubServiceHero";
import { GalleryRow } from "@/components/services/GalleryRow";
import { ClientLogoStrip } from "@/components/services/ClientLogoStrip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const service = servicesData["creative-services"];
const baseUrl = "https://trapezemedia.com";

const CreativeServicesPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`${baseUrl}/services/creative-services`} />
      </Helmet>
      <ServiceSchema
        name={service.title}
        description={service.summary}
        provider="Trapeze Media"
        serviceType="Creative Services"
        areaServed={["United Kingdom", "Europe"]}
        url={`${baseUrl}/services/creative-services`}
      />

      {/* Hero — brand-pink with mosaic grid placeholder */}
      <section className="relative bg-primary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-2 p-4 opacity-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="bg-primary-foreground rounded-lg aspect-square" />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
            {service.heroHeadline}
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{service.heroSubheadline}</p>
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

      {/* Photography */}
      <SubServiceHero
        variant="dark-overlay"
        heading="Photography"
        body="Our photographers capture eye-catching pictures and edit them to social-ready perfection. We capture the vibe of your venue, the aesthetic and colours of your brand, and the mood you want to present to your audience."
      />

      {/* Fitz Wine */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
              <h3 className="heading-display text-3xl text-foreground mb-4">Fitz Wine</h3>
              <p className="text-muted-foreground text-lg">
                A bubbly photoshoot at the beach for rebellious sparkling wine brand Fitz! We created a year's worth of assets in one sunny day, shooting with long-term social media campaigns and design projects in mind.
              </p>
            </div>
            <GalleryRow
              images={[
                { src: "", alt: "Fitz Wine beach photoshoot 1" },
                { src: "", alt: "Fitz Wine beach photoshoot 2" },
                { src: "", alt: "Fitz Wine beach photoshoot 3" },
                { src: "", alt: "Fitz Wine beach photoshoot 4" },
                { src: "", alt: "Fitz Wine beach photoshoot 5" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Luckies */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
              <h3 className="heading-display text-3xl text-foreground mb-4">Luckies</h3>
              <p className="text-muted-foreground text-lg">
                We project-managed and styled a shoot with David Wilman — one of our favourite and most trusted photographers — in his London studio, cataloguing new and existing product lines for gifting site Luckies.co.uk.
              </p>
            </div>
            <GalleryRow
              images={[
                { src: "", alt: "Luckies product photography 1" },
                { src: "", alt: "Luckies product photography 2" },
                { src: "", alt: "Luckies product photography 3" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Four Degree */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
              <h3 className="heading-display text-3xl text-foreground mb-4">Four Degree</h3>
              <p className="text-muted-foreground text-lg">
                We conceptualised a slightly surreal theme for our photoshoot with French-Japanese fusion restaurant Four Degree, helping promote the UK's first ever Macallan Whisky lounge and capturing visuals of the artfully-prepared menu.
              </p>
            </div>
            <GalleryRow
              images={[
                { src: "", alt: "Four Degree restaurant photography 1" },
                { src: "", alt: "Four Degree restaurant photography 2" },
                { src: "", alt: "Four Degree restaurant photography 3" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Graphic Design */}
      <SubServiceHero
        variant="dark-overlay"
        heading="Graphic Design"
        body="Our in-house design team create every kind of brand asset for every kind of client — logos, visual identities, print media, illustrations, murals, artworks, and signage. We use functional and engaging imagery to capture and showcase your products, services, and ideas."
      />

      {/* Maximiles design */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="heading-display text-3xl text-foreground mb-6">Maximiles</h3>
          <p className="text-muted-foreground text-lg mb-8">Ad creative design for paid social campaigns driving double opt-ins and engagement at scale.</p>
          <GalleryRow
            images={[
              { src: "", alt: "Maximiles ad creative 1" },
              { src: "", alt: "Maximiles ad creative 2" },
              { src: "", alt: "Maximiles ad creative 3" },
              { src: "", alt: "Maximiles ad creative 4" },
            ]}
          />
        </div>
      </section>

      {/* Fountain Tap */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
              <h3 className="heading-display text-3xl text-foreground mb-4">Fountain Tap</h3>
              <p className="text-muted-foreground text-lg">
                When the Fountain Tap — the 'little brother' taproom of renowned pub the Old Fountain — approached us to design their visual identity for their Shoreditch spot, we drew upon the textures of their interior for the colours and styling of the logo. We had a great time folding an obscure message into the Fountain Tap logo — the sprinkles jetting from the rustically-illustrated beer keg, when read top-to-bottom and left-to-right, spell out 'The Fountain Tap Room' in Morse code!
              </p>
            </div>
            <GalleryRow
              images={[
                { src: "", alt: "Fountain Tap branding 1" },
                { src: "", alt: "Fountain Tap branding 2" },
                { src: "", alt: "Fountain Tap branding 3" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Promotional Filmmaking */}
      <SubServiceHero
        variant="dark-overlay"
        heading="Promotional Filmmaking"
        body="Videos are essential for marketing. Our filmmaking team create polished product promos, engaging Stories, and exciting live stream events."
      />

      {/* Caravanserai filmmaking */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
              <span className="text-xs text-muted-foreground text-center p-4">[Instagram embed / Caravanserai video]</span>
            </div>
            <div>
              <h3 className="heading-display text-3xl text-foreground mb-4">Caravanserai Brighton</h3>
              <p className="text-muted-foreground text-lg">
                Caravanserai — an immersive pop-up festival — became part of the Brighton Fringe line-up. We captured the weird and wonderful world of rusty trailers and eclectic entertainers through video content, drone footage, and social-first filmmaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Indytute */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="bg-background rounded-2xl aspect-video flex items-center justify-center">
              <span className="text-xs text-muted-foreground text-center p-4">[The Indytute video thumbnail]</span>
            </div>
            <div>
              <h3 className="heading-display text-3xl text-foreground mb-4">The Indytute</h3>
              <p className="text-muted-foreground text-lg">
                We've worked with gift experience retailer The Indytute for a number of years, leading paid ads strategies, managing social feeds, and creating animations. While helping them pivot to online experiences at the start of lockdowns and back to in-person days, we directed and edited many different videos — completely remotely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client logo strip */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <ClientLogoStrip
            variant="dark"
            logos={[
              { name: "Searcys", imageSrc: "/images/clients/searcys.svg" },
              { name: "Radisson Hotels", imageSrc: "/images/clients/radisson-hotels.svg" },
              { name: "Caprice Restaurants" },
              { name: "Hix Restaurants" },
              { name: "Dirty Bones" },
              { name: "Fitz Wine" },
            ]}
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-muted rounded-xl px-6 border-0">
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

export default CreativeServicesPage;
