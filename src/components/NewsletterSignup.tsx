import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterSignupProps {
  heading?: string;
  subheading?: string;
}

export default function NewsletterSignup({
  heading = "Stay in the Loop",
  subheading = "Industry news and digital marketing insights, straight to your inbox.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "mailchimp-subscribe",
        { body: { email } }
      );

      if (fnError) throw fnError;

      if (data?.success) {
        setSuccess(true);
      } else if (data?.message === "You're already subscribed.") {
        setError("Looks like you're already on the list.");
      } else {
        setError("Something went wrong — please try again.");
      }
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-content mx-auto px-4 max-w-2xl text-center relative">
        <ScrollReveal>
          <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">{subheading}</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {success ? (
            <p className="text-lg font-semibold text-primary">
              You're in. Talk soon.
            </p>
          ) : (
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="bg-muted border-0 h-12 rounded-xl focus:ring-2 focus:ring-primary transition-all"
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                variant="hero"
                className="w-full sm:w-auto"
                onClick={handleSubmit}
                disabled={loading || !email}
              >
                {loading ? "Subscribing…" : "Subscribe"}
              </Button>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-8 text-sm text-muted-foreground">
            Until our next email arrives in your inbox, you can find our previous guides and insights{" "}
            <a href="/blog" className="text-primary hover:underline font-medium">
              on our blog
            </a>{" "}
            and{" "}
            <a
              href="https://www.instagram.com/trapezemedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              on our Instagram feed
            </a>
            .
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
