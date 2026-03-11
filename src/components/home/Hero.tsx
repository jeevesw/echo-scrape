import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.webp";

const PHRASES = [
  "Hospitality Brands",
  "Restaurants, Bars, & Pubs",
  "Tourism & Travel Authorities",
  "Hospitality Organisations",
  "Lifestyle & Consumer Brands",
  "Hotels & Resorts",
  "Events & Festivals",
  "Private Medical Businesses",
  "D2C Crowdfunding Campaigns",
  "Indie & Franchise Shops",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      timeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % PHRASES.length);
        setIsVisible(true);
      }, 350);
    }, 2600);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="grid lg:grid-cols-2 items-center">
          <div className="animate-fade-in container-content mx-auto px-4 py-12 lg:py-16 lg:mx-0 lg:ml-auto lg:pr-8 lg:pl-4 xl:pl-8">
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary leading-none mb-6">
              HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
            </h1>

            <div className="mt-4 mb-6">
              <p className="text-lg md:text-xl text-muted-foreground font-normal">
                We are a digital marketing agency for
              </p>
              <div className="min-h-[1.2em]">
                <span
                  className={`heading-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary inline-block transition-all duration-300 ease-in-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  {PHRASES[currentIndex]}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a href="https://calendly.com/trapezemedia/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </a>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/paid-ads-quiz">Take the Quiz</Link>
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