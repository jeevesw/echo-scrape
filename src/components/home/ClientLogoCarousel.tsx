import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const logos = [
  { src: "/images/clients/asda.svg", alt: "ASDA", height: "h-10" },
  { src: "/images/clients/brighton-fringe.svg", alt: "Brighton Fringe", height: "h-14" },
  { src: "/images/clients/pathe.svg", alt: "Pathé", height: "h-12" },
  { src: "/images/clients/patty-and-bun.svg", alt: "Patty and Bun", height: "h-6" },
  { src: "/images/clients/radisson-hotels.svg", alt: "Radisson Hotels", height: "h-8" },
  { src: "/images/clients/searcys.svg", alt: "Searcys", height: "h-8" },
  { src: "/images/clients/various-eateries.svg", alt: "Various Eateries", height: "h-14" },
  { src: "/images/clients/vue-cinemas.svg", alt: "Vue Cinemas", height: "h-10" },
  { src: "/images/clients/warner-bros-discovery.svg", alt: "Warner Bros. Discovery", height: "h-8" },
  { src: "/images/clients/yo-sushi.svg", alt: "YO! Sushi", height: "h-12" },
];

// Duplicate logos for seamless infinite scroll
const allLogos = [...logos, ...logos];

export function ClientLogoCarousel() {
  return (
    <section className="py-12 bg-muted overflow-hidden">
      <ScrollReveal>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-logos items-center gap-16">
            {allLogos.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.height} w-auto object-contain`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
