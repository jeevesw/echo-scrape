import maximilesAd from "@/assets/services/maximiles-paid-social-ad.webp";

const logos = [
  { src: "/images/clients/warner-bros-discovery.svg", alt: "Warner Bros. Discovery" },
  { src: "/images/clients/ukhospitality.svg", alt: "UKHospitality" },
  { src: "/images/clients/pathe.svg", alt: "Pathé" },
  { src: "/images/clients/brighton-fringe.svg", alt: "Brighton Fringe" },
  { src: "/images/clients/patty-and-bun.svg", alt: "Patty & Bun" },
];

const IntroLogos = () => (
  <>
    {/* Pull quote + image */}
    <section className="bg-background py-16 lg:py-20 overflow-hidden">
      <div className="flex items-center">
        {/* Image flush left */}
        <div className="hidden lg:block flex-shrink-0 w-[28%]">
          <img
            src={maximilesAd}
            alt="Maximiles paid social ad creative"
            className="w-full h-auto object-cover object-right"
          />
        </div>

        {/* Text */}
        <div className="flex-1 px-8 md:px-16 lg:pl-12 lg:pr-16">
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl text-primary font-semibold leading-snug mb-4">
              Billions of active monthly social media users means billions of opportunities to get your brand seen — and booked.
            </p>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">
              We design and deliver ambitious, creative paid ads campaigns using real data to reach key goals: clicks, leads, bookings, and sales conversions. Our hyperlocal approach means your ads reach the right people, near the right locations, at the right time (and even under the right weather conditions, if you want to get that specific).
            </p>
          </div>
        </div>
      </div>
    </section>

  </>
);

export default IntroLogos;

export const PaidAdsLogoStrip = () => (
  <section className="bg-muted py-10">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-8 md:h-10"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </section>
);
