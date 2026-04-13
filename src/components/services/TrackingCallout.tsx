import emailPattern from "@/assets/email-pattern.png";

export function TrackingCallout() {
  return (
    <section className="relative py-14 lg:py-16 overflow-hidden">
      {/* Solid brand pink background */}
      <div className="absolute inset-0 bg-primary" />
      {/* Tiling pattern – white icons over pink, no blend mode */}
      {/* opacity: 0.07  ← subtler */}
      {/* opacity: 0.10  ← bolder (active) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ backgroundImage: `url(${emailPattern})`, backgroundRepeat: "repeat", backgroundSize: "120px 120px", filter: "invert(1)", opacity: 0.10 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-display text-2xl md:text-3xl text-primary-foreground mb-4">
            Before running ads, let's sort your tracking
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Most agencies start campaigns before tracking is right. We don't. Before any paid campaign goes live, we audit your analytics, configure pixel and tag events, and validate every conversion path — from click to booking. Two of our current clients came to us with zero confidence in their reporting. We rebuilt their measurement infrastructure from scratch.
          </p>
        </div>
      </div>
    </section>
  );
}
