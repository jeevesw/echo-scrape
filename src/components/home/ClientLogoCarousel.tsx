import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
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
];

// Height mapping for known logos
const logoHeights: Record<string, string> = {
  "/images/clients/yo-sushi.svg": "h-12",
  "/images/clients/brighton-fringe.svg": "h-14",
  "/images/clients/various-eateries.svg": "h-14",
  "/images/clients/patty-and-bun.svg": "h-6",
};

export function ClientLogoCarousel() {
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
    src: cs.client_logo_url!,
    alt: cs.client_name,
    height: logoHeights[cs.client_logo_url!] || "h-10",
    testimonial: cs.testimonial_quote
      ? { quote: cs.testimonial_quote, credit: cs.testimonial_credit || "" }
      : undefined,
  }));

  // Deduplicate: CMS logos take priority over static ones with same src
  const cmsSrcs = new Set(cmsClientLogos.map((l) => l.src));
  const mergedLogos = [...cmsClientLogos, ...staticLogos.filter((l) => !cmsSrcs.has(l.src))];
  const allLogos = [...mergedLogos, ...mergedLogos];

  return (
    <section className="py-12 bg-muted overflow-visible relative z-20">
      <ScrollReveal>
        <TooltipProvider delayDuration={300}>
          <div className="relative overflow-x-clip overflow-y-visible">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

            <div className={`flex animate-scroll-logos items-center gap-16 ${paused ? "[animation-play-state:paused]" : ""}`}>
              {allLogos.map((logo, i) => (
                <div key={`${logo.alt}-${i}`} className="flex-shrink-0 flex items-center justify-center">
                  {logo.testimonial ? (
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                      >
                        <img src={logo.src} alt={logo.alt} className={`${logo.height} w-auto object-contain cursor-pointer`} loading="lazy" />
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
                    <img src={logo.src} alt={logo.alt} className={`${logo.height} w-auto object-contain`} loading="lazy" />
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
