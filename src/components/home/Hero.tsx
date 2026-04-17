import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.webp";

const platformLogos = [
  { src: "/images/google-ads-logo.svg", alt: "Google Ads" },
  { src: "/images/facebook-logo.png", alt: "Facebook" },
  { src: "/images/instagram-logo.png", alt: "Instagram" },
  { src: "/images/tiktok-logo.png", alt: "TikTok" },
  { src: "/images/youtube-logo.png", alt: "YouTube" },
  { src: "/images/linkedin-logo.png", alt: "LinkedIn" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full">
        <div className="grid lg:grid-cols-2 items-center gap-8">
          <div className="animate-fade-in py-12 lg:py-16 pl-4 lg:pl-[max(1rem,calc((100vw-64rem)/2))]">
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary leading-none mb-6">
              HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
            </h1>

            <div className="mt-4 mb-6">
              <p className="text-sm text-muted-foreground mb-3">Delivering campaigns via:</p>
              <div className="flex flex-wrap items-center gap-6">
                {platformLogos.map((logo) => (
                  <img
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-8 object-contain"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>

          <div className="animate-slide-in-right flex justify-end py-6 lg:py-8">
            <img
              src={heroImage}
              alt="Coppa Club campaign by Trapeze Media"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
