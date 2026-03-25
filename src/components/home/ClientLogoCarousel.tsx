import { useState } from "react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClientLogo {
  src: string;
  alt: string;
  height: string;
  testimonial?: {
    quote: string;
    credit: string;
  };
}

const logos: ClientLogo[] = [
  { src: "/images/clients/asda.svg", alt: "ASDA", height: "h-10" },
  {
    src: "/images/clients/brighton-fringe.svg",
    alt: "Brighton Fringe",
    height: "h-14",
    testimonial: {
      quote: "You could feel the passion from the whole team; their knowledge and skill is so pronounced",
      credit: "— Marketing Manager",
    },
  },
  { src: "/images/clients/pathe.svg", alt: "Pathé", height: "h-12" },
  {
    src: "/images/clients/patty-and-bun.svg",
    alt: "Patty and Bun",
    height: "h-6",
    testimonial: {
      quote: "Trapeze Media completely changed how we viewed working with an agency",
      credit: "— Founder",
    },
  },
  { src: "/images/clients/radisson-hotels.svg", alt: "Radisson Hotels", height: "h-8" },
  { src: "/images/clients/searcys.svg", alt: "Searcys", height: "h-8" },
  {
    src: "/images/clients/various-eateries.svg",
    alt: "Various Eateries",
    height: "h-14",
    testimonial: {
      quote: "I'd recommend Trapeze Media to anyone that's looking to improve their paid ads performance",
      credit: "— Digital Marketing Director at Various Eateries",
    },
  },
  { src: "/images/clients/vue-cinemas.svg", alt: "Vue Cinemas", height: "h-10" },
  { src: "/images/clients/warner-bros-discovery.svg", alt: "Warner Bros. Discovery", height: "h-8" },
  {
    src: "/images/clients/yo-sushi.svg",
    alt: "YO! Sushi",
    height: "h-12",
    testimonial: {
      quote: "Trapeze Media are a business growth partner who have helped us achieve an incremental ROI through paid ads",
      credit: "— Senior Growth & Digital Marketing Manager at YO! Sushi",
    },
  },
];

const allLogos = [...logos, ...logos];

export function ClientLogoCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-12 bg-muted overflow-visible relative z-20">
      <ScrollReveal>
        <TooltipProvider delayDuration={300}>
          <div className="relative overflow-x-clip overflow-y-visible">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

            <div
              className={`flex animate-scroll-logos items-center gap-16 ${paused ? "[animation-play-state:paused]" : ""}`}
            >
              {allLogos.map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  {logo.testimonial ? (
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`${logo.height} w-auto object-contain cursor-pointer`}
                          loading="lazy"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-xs p-4 text-left"
                        onPointerDownOutside={(e) => e.preventDefault()}
                      >
                        <p className="text-sm italic text-popover-foreground leading-relaxed mb-1.5">
                          "{logo.testimonial.quote}"
                        </p>
                        <p className="text-xs font-medium text-muted-foreground">
                          {logo.testimonial.credit}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`${logo.height} w-auto object-contain`}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </ScrollReveal>
    </section>
  );
}
