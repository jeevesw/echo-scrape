import { useQuery } from "@tanstack/react-query";
import type { CSSProperties } from "react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

// Static logos that don't have case studies
const staticLogos: ClientLogo[] = [
  { src: "/images/clients/asda.svg", alt: "ASDA", height: "h-10" },
  { src: "/images/clients/pathe.svg", alt: "Pathé", height: "h-12" },
  { src: "/images/clients/radisson-hotels.svg", alt: "Radisson Hotels", height: "h-8" },
  { src: "/images/clients/searcys.svg", alt: "Searcys", height: "h-8" },
  { src: "/images/clients/vue-cinemas.svg", alt: "Vue Cinemas", height: "h-10" },
  { src: "/images/clients/warner-bros-discovery.svg", alt: "Warner Bros. Discovery", height: "h-8" },
  { src: "/images/clients/ukhospitality.svg", alt: "UKHospitality", height: "h-10" },
];

// Height mapping for known logos
const logoHeights: Record<string, string> = {
  "/images/clients/yo-sushi.svg": "h-12",
  "/images/clients/brighton-fringe.svg": "h-14",
  "/images/clients/various-eateries.svg": "h-10 md:h-12",
  "/images/clients/various-eateries-carousel.svg": "h-10 md:h-12",
  "/images/clients/patty-and-bun.svg": "h-6",
};

const carouselLogoSrcs: Record<string, string> = {
  "/images/clients/various-eateries.svg": "/images/clients/various-eateries-carousel.svg",
};

export function ClientLogoCarousel({ background = "muted" }: { background?: "muted" | "background" } = {}) {
  const bgClass = background === "background" ? "bg-background" : "bg-muted";
  const fadeFrom = background === "background" ? "from-background" : "from-muted";
  const [paused, setPaused] = useState(false);

  const { data: cmsLogos = [] } = useQuery({
    queryKey: ["carousel-logos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("client_name, client_logo_url, testimonial_quote, testimonial_credit")
        .eq("is_published", true)
        .not("client_logo_url", "is", null)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Merge CMS logos with static ones
  const cmsClientLogos: ClientLogo[] = cmsLogos.map((cs) => ({
    src: carouselLogoSrcs[cs.client_logo_url!] || cs.client_logo_url!,
    alt: cs.client_name,
    height: logoHeights[carouselLogoSrcs[cs.client_logo_url!] || cs.client_logo_url!] || "h-10",
    testimonial: cs.testimonial_quote
      ? { quote: cs.testimonial_quote, credit: cs.testimonial_credit || "" }
      : undefined,
  }));

  // Deduplicate: CMS logos take priority over static ones with same src
  const cmsSrcs = new Set(cmsClientLogos.map((l) => l.src));
  const mergedLogos = [...cmsClientLogos, ...staticLogos.filter((l) => !cmsSrcs.has(l.src))];
  const trackStyle = {
    "--logo-loop-width-mobile": `${mergedLogos.length * 8.25}rem`,
    "--logo-loop-width-desktop": `${mergedLogos.length * 12}rem`,
  } as CSSProperties;

  const renderLogo = (logo: ClientLogo, index: number, group: number) => {
    const image = (
      <img
        src={logo.src}
        alt={logo.alt}
        className={`${logo.height} max-h-12 md:max-h-14 max-w-full w-auto object-contain block`}
        loading="eager"
        decoding="async"
      />
    );

    return (
      <div key={`${logo.alt}-${group}-${index}`} className="logo-carousel-item">
        {logo.testimonial ? (
          <Tooltip>
            <TooltipTrigger
              asChild
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {image}
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs p-4 text-left" onPointerDownOutside={(e) => e.preventDefault()}>
              <p className="text-sm italic text-popover-foreground leading-relaxed mb-1.5">
                "{logo.testimonial.quote}"
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {logo.testimonial.credit}
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          image
        )}
      </div>
    );
  };

  return (
    <section className={`py-3 md:py-12 ${bgClass} overflow-hidden md:overflow-visible relative z-20`}>
      <TooltipProvider delayDuration={300}>
        <div className="relative overflow-hidden md:overflow-x-clip md:overflow-y-visible">
          <div className={`hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r ${fadeFrom} to-transparent z-10 pointer-events-none`} />
          <div className={`hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l ${fadeFrom} to-transparent z-10 pointer-events-none`} />

          <div className={`logo-carousel-track ${paused ? "[animation-play-state:paused]" : ""}`} style={trackStyle}>
            {[0, 1, 2].map((group) => (
              <div key={group} className="logo-carousel-group" aria-hidden={group > 0}>
                {mergedLogos.map((logo, i) => renderLogo(logo, i, group))}
              </div>
            ))}
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
}
