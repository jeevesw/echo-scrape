import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Instagram, Linkedin, Mail, Phone, Calendar, ArrowRight } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || name.length > 100) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    if (!message || message.length > 5000) {
      toast({ title: "Please enter a message", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("contact-form", {
        body: { name, email, message, phone: formData.phone.trim() || undefined },
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "", phone: "" });
    } catch (err) {
      console.error("Contact form error", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at info@trapezemedia.co.uk",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left - Contact Info */}
            <div className="animate-fade-in">
              <div className="border-l-4 border-primary pl-6 mb-8">
                <h1 className="heading-display text-5xl md:text-6xl text-primary">
                  LET'S TALK.
                </h1>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <a 
                    href="mailto:info@trapezemedia.co.uk" 
                    className="text-lg text-primary hover:underline"
                  >
                    info@trapezemedia.co.uk
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <a 
                    href="tel:07989478792" 
                    className="text-lg text-primary hover:underline"
                  >
                    07989 478 792
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Prefer to book a time?</p>
                <Button variant="hero" asChild>
                  <a
                    href="https://calendly.com/trapezemedia/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 mt-10">
                <a 
                  href="https://www.instagram.com/trapezemedia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/trapeze-media" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="animate-slide-in-right">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name <span className="text-muted-foreground">(required)</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-0 border-b border-border rounded-none focus:ring-0 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Email <span className="text-muted-foreground">(required)</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-0 border-b border-border rounded-none focus:ring-0 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-muted-foreground">(required)</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="border-0 border-b border-border rounded-none focus:ring-0 bg-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Request a call — enter your phone number <span className="text-muted-foreground">(optional)</span>:
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-0 border-b border-border rounded-none focus:ring-0 bg-transparent"
                  />
                </div>
                <Button type="submit" variant="hero">
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-display text-4xl mb-4">Email Us:</h2>
          <a 
            href="mailto:info@trapezemedia.co.uk" 
            className="text-2xl underline hover:no-underline"
          >
            INFO@TRAPEZEMEDIA.CO.UK
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
