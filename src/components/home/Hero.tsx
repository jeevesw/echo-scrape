import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.webp";

export function Hero() {
  return <section className="relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="animate-fade-in container-content mx-auto px-4 py-16 lg:py-24 lg:mx-0 lg:ml-auto lg:pr-8 lg:pl-4 xl:pl-8">
            <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-primary leading-none mb-8">
              HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
            </h1>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
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

          {/* Right Content - Hero Image flush to right edge */}
          <div className="animate-slide-in-right flex justify-end">
            <img
              src={heroImage}
              alt="Coppa Club campaign by Trapeze Media"
              className="w-full h-auto object-cover object-left"
            />
          </div>
        </div>
      </div>
    </section>;
}