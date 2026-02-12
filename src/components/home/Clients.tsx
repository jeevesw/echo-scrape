import { ScrollReveal } from "@/hooks/use-scroll-reveal";

export function Clients() {
  return (
    <section className="bg-muted py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
      
      <div className="container-content mx-auto px-4 relative">
        <ScrollReveal>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            For more than a decade, we've been helping clients reach new audiences by managing and optimising paid social ads, paid search ads, and organic social, plus web design and optimisation.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
