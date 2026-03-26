import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterSignupProps {
  heading?: string;
  subheading?: string;
}

const DEFAULT_HEADING = "The latest insights on the digital landscape, direct to your inbox";
const DEFAULT_SUBHEADING = "Ad industry trends, social media headlines, and digital marketing guides and insights, direct from the Trapeze Media team.";

export default function NewsletterSignup({
  heading,
  subheading,
}: NewsletterSignupProps) {
  const displayHeading = heading?.trim() || DEFAULT_HEADING;
  const displaySubheading = subheading?.trim() || DEFAULT_SUBHEADING;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        { body: { email, firstName } }
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
      <div className="container-content mx-auto px-4 max-w-2xl text-center relative">
        <ScrollReveal>
          <div className="border-2 border-primary rounded-2xl p-8 md:p-10">
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-4">
              {displayHeading}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">{displaySubheading}</p>

            {success ? (
              <p className="text-lg font-semibold text-primary">
                You're in. Talk soon.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-muted border-0 h-12 rounded-xl focus:ring-2 focus:ring-primary transition-all"
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-muted border-0 h-12 rounded-xl focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
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

            <p className="mt-6 text-sm text-foreground/60">
              Our emails are sent no more than four times each month. We respect your privacy.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
