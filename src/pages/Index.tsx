import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { Services } from "@/components/home/Services";
import { FeaturedCampaigns } from "@/components/home/FeaturedCampaigns";
import { Testimonial } from "@/components/home/Testimonial";
import { BlogPreview } from "@/components/home/BlogPreview";
import NewsletterSignup from "@/components/NewsletterSignup";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ClientLogoCarousel />
      <Services />
      <FeaturedCampaigns />
      <Testimonial />
      <BlogPreview />
      <Newsletter />
    </Layout>
  );
};

export default Index;
