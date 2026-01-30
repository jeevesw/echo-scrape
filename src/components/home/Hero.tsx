import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

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
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-primary leading-none mb-8">
              HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
            </h1>

            {/* Platform Icons */}
            <div className="flex flex-wrap gap-4 mb-8 p-6 border-2 border-foreground/20 rounded-2xl inline-flex bg-background/50 backdrop-blur-sm shadow-depth">
              {platformIcons.map((platform, index) => (
                <div
                  key={platform.name}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:scale-125 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  title={platform.name}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {platform.icon}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a 
                  href="https://calendly.com/trapezemedia/discovery-call" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/paid-ads-quiz">
                  Take the Quiz
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="animate-slide-in-right">
            <div className="relative">
              {/* Animated blob background */}
              <div className="absolute -inset-8 bg-primary/10 blob blob-animate blur-2xl opacity-60" />
              
              {/* Main card */}
              <div className="relative bg-muted rounded-3xl p-8 shadow-depth-lg hover-lift">
                <div className="bg-background rounded-2xl p-6 shadow-lg">
                  {/* Browser dots */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" style={{ animationDelay: "0ms" }} />
                    <div className="w-3 h-3 rounded-full bg-warning animate-pulse" style={{ animationDelay: "200ms" }} />
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" style={{ animationDelay: "400ms" }} />
                  </div>
                  
                  {/* Content skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded-full w-3/4" />
                    <div className="h-4 bg-muted rounded-full w-1/2" />
                    <div className="h-24 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg animate-pulse-glow">
                      Your Ad Here
                    </div>
                    <div className="h-4 bg-muted rounded-full w-2/3" />
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-2xl rotate-12 animate-float" style={{ animationDelay: "0s" }} />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/15 rounded-full animate-float" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
