import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "We'll be in touch with our latest insights.",
    });
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-content mx-auto px-4 max-w-2xl text-center relative">
        <ScrollReveal>
          <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Our emails are sent no more than four times each month. We respect your privacy.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-muted border-0 h-12 rounded-xl focus:ring-2 focus:ring-primary transition-all"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-muted border-0 h-12 rounded-xl focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-muted border-0 h-12 rounded-xl focus:ring-2 focus:ring-primary transition-all"
            />
            <Button type="submit" variant="hero" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-8 text-sm text-muted-foreground">
            Until our next email arrives in your inbox, you can find our previous guides and insights{" "}
            <a href="/blog" className="text-primary hover:underline font-medium">on our blog</a> and{" "}
            <a href="https://www.instagram.com/trapezemedia" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              on our Instagram feed
            </a>.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
