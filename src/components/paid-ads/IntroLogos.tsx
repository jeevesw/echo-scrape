import { Button } from "@/components/ui/button";

const logos = [
  { src: "/images/clients/warner-bros-discovery.svg", alt: "Warner Bros. Discovery" },
  { src: "/images/clients/ukhospitality.svg", alt: "UKHospitality" },
  { src: "/images/clients/pathe.svg", alt: "Pathé" },
  { src: "/images/clients/brighton-fringe.svg", alt: "Brighton Fringe" },
  { src: "/images/clients/patty-and-bun.svg", alt: "Patty & Bun" },
];

const IntroLogos = () => (
  <>
    {/* Pull quote + CTA */}
    <section className="bg-background py-16 lg:py-20">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="max-w-4xl">
          <p className="text-xl md:text-2xl text-primary font-semibold leading-snug mb-4">
            Billions of active monthly social media users means billions of opportunities to get your brand seen — and booked.
          </p>
          <p className="text-xl md:text-2xl text-foreground leading-relaxed">
            We design and deliver ambitious, creative paid ad strategies using real data to reach key goals: clicks, leads, bookings, and sales conversions. Our hyperlocal approach means your ads don't just reach people — they reach the right people, near the right locations, at the right time.
          </p>
        </div>
      </div>
    </section>

    {/* Static logo row */}
    <section className="bg-muted py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  </>
);

export default IntroLogos;
