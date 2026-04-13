import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { Services } from "@/components/home/Services";
import { FeaturedCampaigns } from "@/components/home/FeaturedCampaigns";
import { Testimonial } from "@/components/home/Testimonial";
import { BlogPreview } from "@/components/home/BlogPreview";
import NewsletterSignup from "@/components/NewsletterSignup";
import { FAQSchema } from "@/components/seo/SchemaMarkup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const faqs = [
  {
    question: "What is hyperlocal marketing?",
    answer:
      "Hyperlocal marketing targets audiences within a specific geographic area — a neighbourhood, a postcode, or a set radius around a venue. Rather than broad national campaigns, hyperlocal ads reach the people most likely to walk through your door. Trapeze Media specialises in this approach for hospitality, events, and lifestyle brands.",
  },
  {
    question: "What services does Trapeze Media offer?",
    answer:
      "We offer paid social advertising (Meta and TikTok), Google Ads and PPC, social media management, video production, creative services, and website design. All services are underpinned by our hyperlocal methodology.",
  },
  {
    question: "Do you work with brands outside of hospitality?",
    answer:
      "Yes. While hospitality and lifestyle are our heritage, we work with private medical businesses, crowdfunding campaigns, D2C brands, and any brand that needs audiences reached in specific locations.",
  },
];

const Index = () => {
  return (
    <Layout>
      <FAQSchema faqs={faqs} />
      <Hero />
      <ClientLogoCarousel />
      <Services />
      <FeaturedCampaigns />
      <Testimonial />
      <BlogPreview />

      {/* FAQ Accordion */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-10">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
