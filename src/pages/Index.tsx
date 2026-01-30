import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Clients } from "@/components/home/Clients";
import { Services } from "@/components/home/Services";
import { FeaturedCampaigns } from "@/components/home/FeaturedCampaigns";
import { Testimonial } from "@/components/home/Testimonial";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Clients />
      <Services />
      <FeaturedCampaigns />
      <Testimonial />
      <BlogPreview />
      <Newsletter />
    </Layout>
  );
};

export default Index;
