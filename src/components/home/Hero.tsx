import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const platformIcons = [
  { name: "Facebook", icon: "📘" },
  { name: "Instagram", icon: "📸" },
  { name: "TikTok", icon: "🎵" },
  { name: "Google", icon: "🔍" },
  { name: "YouTube", icon: "▶️" },
  { name: "LinkedIn", icon: "💼" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-primary leading-none mb-8">
              HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
            </h1>

            {/* Platform Icons */}
            <div className="flex flex-wrap gap-4 mb-8 p-6 border-2 border-foreground/20 rounded-lg inline-flex">
              {platformIcons.map((platform) => (
                <div
                  key={platform.name}
                  className="w-10 h-10 flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer"
                  title={platform.name}
                >
                  {platform.icon}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
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
          </div>

          {/* Right Content - Hero Image */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-muted rounded-2xl p-8 shadow-2xl">
                <div className="bg-background rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-20 bg-primary/10 rounded flex items-center justify-center text-primary font-medium">
                      Your Ad Here
                    </div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
