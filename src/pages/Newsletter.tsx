import { Layout } from "@/components/layout/Layout";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Helmet } from "react-helmet-async";

const Newsletter = () => {
  return (
    <Layout>
      <Helmet>
        <title>Newsletter | Trapeze Media</title>
        <meta
          name="description"
          content="Sign up for the Trapeze Media newsletter — ad industry trends, social media headlines, and digital marketing guides delivered to your inbox."
        />
        <link rel="canonical" href="https://trapezemedia.co.uk/newsletter" />
      </Helmet>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 max-w-2xl mx-auto">
            <h1 className="heading-display text-5xl md:text-6xl text-primary mb-4">
              The Trapeze Media Newsletter
            </h1>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </Layout>
  );
};

export default Newsletter;