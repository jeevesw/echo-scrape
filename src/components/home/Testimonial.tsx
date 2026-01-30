import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Testimonial() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <blockquote className="text-2xl md:text-3xl text-foreground italic leading-relaxed">
          "I'm very proud to have built a company{" "}
          <Link to="/about" className="text-primary hover:underline">
            whose values
          </Link>{" "}
          reflect what I want to see more of in the world."
        </blockquote>
        <cite className="block mt-6 text-muted-foreground not-italic">
          — Kitty Newman, Director
        </cite>
        <div className="mt-10">
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
    </section>
  );
}
