import { Link } from "react-router-dom";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

export function Clients() {
  return (
    <section className="bg-muted py-16 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <Link to="/case-studies" className="block group">
            <h3 className="heading-display text-xl text-center text-foreground group-hover:text-primary transition-colors">
              Who we've worked with
            </h3>
          </Link>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="mt-6 text-center text-muted-foreground max-w-3xl mx-auto">
            For more than a decade, we've been helping clients reach new audiences by managing and optimising{" "}
            <Link to="/services/paid-advertising" className="text-primary hover:underline font-medium">paid social ads</Link>,{" "}
            <Link to="/services/paid-advertising" className="text-primary hover:underline font-medium">paid search ads</Link>, and{" "}
            <Link to="/services/social-media-management" className="text-primary hover:underline font-medium">organic social</Link>, plus{" "}
            <Link to="/services/creative-services" className="text-primary hover:underline font-medium">web design and optimisation</Link>.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <p className="mt-4 text-center text-muted-foreground max-w-3xl mx-auto">
            Our successes include campaigns in the <span className="text-foreground font-medium">hospitality</span>, <span className="text-foreground font-medium">tourism</span>, and <span className="text-foreground font-medium">events</span> sectors, with renowned food, drink, and experience brands including Various Eateries, Hakkasan, and Brighton Fringe.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
