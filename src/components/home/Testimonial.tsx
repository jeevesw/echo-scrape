import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

export function Testimonial() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-content mx-auto px-4 text-center max-w-4xl relative">
        <ScrollReveal animation="scale">
          <blockquote className="text-2xl md:text-3xl lg:text-5xl text-foreground italic leading-relaxed">
            "I'm very proud to have built a company{" "}
            <Link to="/about" className="text-primary hover:underline font-semibold">
              whose values
            </Link>{" "}
            reflect what I want to see more of in the world."
          </blockquote>
          <cite className="block mt-8 text-xl text-muted-foreground not-italic">
            — <span className="font-semibold text-foreground">Kitty Newman</span>, Director
          </cite>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="mt-12">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
