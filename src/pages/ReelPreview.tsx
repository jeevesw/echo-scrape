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
    <Layout floatingHeader>
      <ReelHero />
      <div className="bg-muted">
        <div className="pt-12 md:pt-16 px-4">
          <div className="container-content mx-auto max-w-5xl">
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary leading-none">
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
    </Layout>
  );
};

export default ReelPreview;