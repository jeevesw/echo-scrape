import { Button } from "@/components/ui/button";

const logos = [
  { src: "/images/clients/warner-bros-discovery.svg", alt: "Warner Bros. Discovery" },
  { src: "/images/clients/yo-sushi.svg", alt: "YO! Sushi" },
  { src: "/images/clients/patty-and-bun.svg", alt: "Patty & Bun" },
  { src: "/images/clients/brighton-fringe.svg", alt: "Brighton Fringe" },
  { src: "/images/clients/radisson-hotels.svg", alt: "Radisson Hotels" },
];

const IntroLogos = () => (
  <section className="bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-[55%_45%] gap-12 max-w-6xl mx-auto items-center">
        {/* Left column */}
        <div>
          <p className="text-xl text-primary font-semibold leading-snug mb-4">
            Billions of active monthly social media users means billions of opportunities to get your brand seen — and booked.
          </p>
          <p className="text-base text-muted-foreground mb-8">
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

        {/* Right column — logos */}
        <div>
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4 text-center">
            Brands We've Worked With
          </p>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default IntroLogos;
