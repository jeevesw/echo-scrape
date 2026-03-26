import { useEffect, useState } from "react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

/* ─── Google Ad Card (reusable) ─── */
interface AdCardProps {
  variant: "mobile" | "desktop";
  visible: boolean;
}

const MobileAdCard = () => (
  <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.15)] p-3 w-[220px] text-left" style={{ fontFamily: "Arial, sans-serif" }}>
    <span className="text-[11px] font-bold text-[#1a1a1a] block mb-1">Sponsored</span>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[7px] font-bold shrink-0" style={{ backgroundColor: "#C9A84C" }}>
        COPPA
      </div>
      <div>
        <span className="text-[13px] font-bold text-[#1a1a1a] block leading-tight">Coppa Club</span>
        <span className="text-[10px] text-[#4d4d4d] block leading-tight">www.coppaclub.co.uk/cardiff/breakfast</span>
      </div>
    </div>
    <p className="text-[14px] font-medium leading-snug mb-2" style={{ color: "#1a0dab" }}>
      All-Day Cardiff Clubhouse — Join Us Any Time Of Day
    </p>
    <div className="w-full h-[90px] rounded-md flex items-center justify-center mb-2" style={{ backgroundColor: "#f0f0f0" }}>
      <span className="text-[11px] italic text-[#999]">[Photo]</span>
    </div>
    <p className="text-[10px] text-[#4d4d4d] leading-snug mb-2">
      Coppa Club Cardiff. From Morning Coffee &amp; Lunch, To Late Night Dinner and Drinks. Seasonal Eating With a British and Mediterranean Influence.
    </p>
    <div className="rounded-md px-2 py-1 flex items-center justify-center gap-2" style={{ backgroundColor: "#f5f5f5" }}>
      <span className="text-[10px] text-[#4d4d4d]">breakfast cardiff</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4d4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
    </div>
  </div>
);

const DesktopAdCard = () => (
  <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.15)] p-4 w-[300px] text-left" style={{ fontFamily: "Arial, sans-serif" }}>
    <span className="text-[11px] font-bold text-[#1a1a1a] block mb-1">Sponsored</span>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[7px] font-bold shrink-0" style={{ backgroundColor: "#C9A84C" }}>
        COPPA
      </div>
      <div>
        <span className="text-[13px] font-bold text-[#1a1a1a] block leading-tight">Coppa Club</span>
        <span className="text-[10px] text-[#4d4d4d] block leading-tight">www.coppaclub.co.uk/lobster/restaurant</span>
      </div>
    </div>
    <p className="text-[15px] font-medium leading-snug mb-2" style={{ color: "#1a0dab" }}>
      Riverside Bar &amp; BBQ — Coppa Club
    </p>
    <p className="text-[11px] text-[#4d4d4d] leading-snug mb-3">
      Serving up summertime drinks and grilling native lobster, giant prawns &amp; classic burgers. The Swan at Streatley is a converted 17th century inn with a terrace at the water's edge.
    </p>
    <div className="flex items-center gap-2 text-[11px]" style={{ color: "#1a0dab" }}>
      <span>Our Venues</span>
      <span className="text-[#4d4d4d]">·</span>
      <span>What's On</span>
    </div>
  </div>
);

/* ─── Device Frames ─── */

const PhoneFrame = () => (
  <div className="relative w-[220px] md:w-[260px]" style={{ aspectRatio: "260/520" }}>
    {/* Body */}
    <div className="absolute inset-0 rounded-[2rem] shadow-2xl" style={{ backgroundColor: "#1a1a1a" }}>
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full" style={{ backgroundColor: "#111" }} />
      {/* Status bar */}
      <div className="absolute top-3 left-6 right-6 flex justify-between items-center text-[9px] text-white/70 select-none">
        <span>11:11</span>
        <span className="flex gap-1">▪ ▪ ▪</span>
      </div>
      {/* Screen */}
      <div className="absolute inset-3 top-10 rounded-2xl bg-white overflow-hidden" />
    </div>
  </div>
);

const LaptopFrame = () => (
  <div className="relative w-[340px] md:w-[420px]">
    {/* Screen bezel */}
    <div className="rounded-t-xl p-2 shadow-xl" style={{ backgroundColor: "#e0e0e0" }}>
      {/* Browser chrome */}
      <div className="rounded-t-lg overflow-hidden" style={{ backgroundColor: "#f5f5f5" }}>
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
          <div className="flex-1 mx-4">
            <div className="rounded-md px-3 py-0.5 text-[9px] text-[#999] bg-white text-center">
              restaurant streatley
            </div>
          </div>
        </div>
        {/* Screen area */}
        <div className="bg-white relative" style={{ aspectRatio: "16/10" }}>
          {/* Wallpaper gradient on left third */}
          <div
            className="absolute inset-y-0 left-0 w-1/3"
            style={{ background: "linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)" }}
          />
        </div>
      </div>
    </div>
    {/* Keyboard / base */}
    <div className="h-3 rounded-b-lg mx-8" style={{ backgroundColor: "#d0d0d0" }} />
    <div className="h-1 rounded-b-md mx-20" style={{ backgroundColor: "#c0c0c0" }} />
  </div>
);

/* ─── Main Hero ─── */

const VariousEateriesHero = () => {
  const [showMobileAd, setShowMobileAd] = useState(false);
  const [showDesktopAd, setShowDesktopAd] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowMobileAd(true), 300);
    const t2 = setTimeout(() => setShowDesktopAd(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative w-full bg-primary overflow-hidden">
      <div className="container-content mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <ScrollReveal animation="left">
            <span className="text-primary-foreground/80 text-sm md:text-base uppercase tracking-[0.2em] font-light block mb-6">
              Case Study: Google Pay-Per-Click Ads
            </span>
            <h1
              className="heading-display text-primary-foreground uppercase leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Driving Restaurant Visits and Bookings.
            </h1>
          </ScrollReveal>

          {/* Right — Device Visuals */}
          <ScrollReveal animation="right">
            {/* Desktop layout: overlapping devices */}
            <div className="hidden md:block relative" style={{ minHeight: 480 }}>
              {/* Phone — left */}
              <div className="absolute left-0 top-0 z-10">
                <PhoneFrame />
                {/* Mobile ad card — floats over phone screen */}
                <div
                  className={`absolute top-14 left-4 z-20 transition-all duration-700 ease-out ${
                    showMobileAd
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <MobileAdCard />
                </div>
              </div>

              {/* Laptop — right, lower */}
              <div className="absolute right-0 top-16 z-[5]">
                <LaptopFrame />
                {/* Desktop ad card — floats over laptop screen */}
                <div
                  className={`absolute top-[72px] left-[50px] z-20 transition-all duration-700 ease-out ${
                    showDesktopAd
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <DesktopAdCard />
                </div>
              </div>
            </div>

            {/* Mobile layout: stacked, centered */}
            <div className="md:hidden flex flex-col items-center gap-8">
              {/* Phone + ad */}
              <div className="relative">
                <PhoneFrame />
                <div
                  className={`mt-[-40px] relative z-10 mx-auto transition-all duration-700 ease-out ${
                    showMobileAd
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <MobileAdCard />
                </div>
              </div>

              {/* Laptop + ad */}
              <div className="relative max-w-full">
                <div className="scale-[0.85] origin-top">
                  <LaptopFrame />
                </div>
                <div
                  className={`mt-[-30px] relative z-10 mx-auto transition-all duration-700 ease-out ${
                    showDesktopAd
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <DesktopAdCard />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VariousEateriesHero;
