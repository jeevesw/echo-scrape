import { Layout } from "@/components/layout/Layout";
import { ReelHero } from "@/components/home/ReelHero";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { Services } from "@/components/home/Services";
import { FeaturedCampaigns } from "@/components/home/FeaturedCampaigns";
import { Testimonial } from "@/components/home/Testimonial";
import { BlogPreview } from "@/components/home/BlogPreview";
import NewsletterSignup from "@/components/NewsletterSignup";

const ReelPreview = () => {
  return (
    <Layout>
      <ReelHero />
      <div className="relative z-10 bg-background shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.35)]">
        <div className="bg-muted">
          <div className="pt-8 md:pt-10 px-4">
            <div className="container-content mx-auto max-w-7xl">
              <h1 className="heading-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary leading-tight md:leading-none md:whitespace-nowrap text-center">
                HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
              </h1>
            </div>
          </div>
          <ClientLogoCarousel />
        </div>
        <Services />
        <FeaturedCampaigns />
        <Testimonial />
        <BlogPreview />
        <NewsletterSignup />
      </div>
    </Layout>
  );
};

export default ReelPreview;