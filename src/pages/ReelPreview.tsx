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
      <ClientLogoCarousel />
      <Services />
      <FeaturedCampaigns />
      <Testimonial />
      <BlogPreview />
      <NewsletterSignup />
    </Layout>
  );
};

export default ReelPreview;