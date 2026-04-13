import { ShieldCheck } from "lucide-react";

export function TrackingCallout() {
  return (
    <section className="bg-foreground py-14 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="heading-display text-2xl md:text-3xl text-background mb-4">
              We Build Your Tracking Before We Touch Your Ads
            </h2>
            <p className="text-background/70 text-lg leading-relaxed">
              Most agencies start campaigns before tracking is right. We don't. Before any paid campaign goes live, we audit your analytics, configure pixel and tag events, and validate every conversion path — from click to booking. Two of our current clients came to us with zero confidence in their reporting. We rebuilt their measurement infrastructure from scratch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
