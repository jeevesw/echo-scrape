import { Button } from "@/components/ui/button";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";

const IntroLogos = () => (
  <>
    {/* Pull quote + CTA */}
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-xl md:text-2xl text-primary font-semibold leading-snug mb-4">
          Billions of active monthly social media users means billions of opportunities to get your brand seen — and booked.
        </p>
        <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
          We design and deliver ambitious, creative paid ad strategies using real data to reach key goals: clicks, leads, bookings, and sales conversions. Our hyperlocal approach means your ads don't just reach people — they reach the right people, near the right locations, at the right time.
        </p>
        <Button variant="hero" asChild>
          <a
            href="https://calendly.com/trapezemedia/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a Call
          </a>
        </Button>
      </div>
    </section>

    {/* Logo carousel */}
    <ClientLogoCarousel />
  </>
);

export default IntroLogos;
