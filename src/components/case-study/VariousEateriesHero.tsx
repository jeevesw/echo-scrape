import { useEffect, useState } from "react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

/* ─── Google Search Screen Content (partial, for inside device screens) ─── */

const PhoneSearchScreen = () => (
  <div className="w-full h-full bg-white flex flex-col text-left overflow-hidden">
    {/* Google logo */}
    <div className="flex justify-center pt-4 pb-2">
      <span className="text-[18px] font-bold tracking-tight select-none">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </span>
    </div>
    {/* Search bar */}
    <div className="mx-3 mb-2">
      <div className="flex items-center rounded-full border border-[#dfe1e5] px-3 py-1.5 text-[11px] text-[#1a1a1a]">
        <svg className="w-3 h-3 mr-2 text-[#9aa0a6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span>breakfast cardiff</span>
      </div>
    </div>
    {/* Tabs */}
    <div className="flex gap-3 px-3 text-[9px] text-[#5f6368] border-b border-[#ebebeb] pb-1.5">
      <span className="text-[#1a73e8] border-b-2 border-[#1a73e8] pb-1 font-medium">All</span>
      <span>Maps</span>
      <span>Images</span>
      <span>Shopping</span>
    </div>
    {/* Placeholder results */}
    <div className="px-3 pt-3 space-y-3 flex-1">
      <div className="space-y-1">
        <div className="h-1.5 w-24 rounded bg-[#e8e8e8]" />
        <div className="h-2 w-36 rounded bg-[#d0d0f0]" />
        <div className="h-1.5 w-full rounded bg-[#f0f0f0]" />
        <div className="h-1.5 w-4/5 rounded bg-[#f0f0f0]" />
      </div>
      <div className="space-y-1">
        <div className="h-1.5 w-20 rounded bg-[#e8e8e8]" />
        <div className="h-2 w-32 rounded bg-[#d0d0f0]" />
        <div className="h-1.5 w-full rounded bg-[#f0f0f0]" />
        <div className="h-1.5 w-3/4 rounded bg-[#f0f0f0]" />
      </div>
      <div className="space-y-1">
        <div className="h-1.5 w-28 rounded bg-[#e8e8e8]" />
        <div className="h-2 w-40 rounded bg-[#d0d0f0]" />
        <div className="h-1.5 w-full rounded bg-[#f0f0f0]" />
      </div>
    </div>
  </div>
);

const LaptopSearchScreen = () => (
  <div className="w-full h-full flex overflow-hidden">
    {/* Desktop wallpaper peeking on left */}
    <div className="w-[30%] shrink-0" style={{ background: "linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)" }} />
    {/* Browser content */}
    <div className="flex-1 bg-white flex flex-col text-left">
      {/* Placeholder results */}
      <div className="px-4 pt-3 space-y-2.5 flex-1">
        {/* Places-style result */}
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded bg-[#f0f0f0] shrink-0" />
          <div className="space-y-1 flex-1 pt-1">
            <div className="h-2 w-28 rounded bg-[#d0d0f0]" />
            <div className="h-1.5 w-20 rounded bg-[#e8e8e8]" />
            <div className="h-1.5 w-full rounded bg-[#f0f0f0]" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded bg-[#f0f0f0] shrink-0" />
          <div className="space-y-1 flex-1 pt-1">
            <div className="h-2 w-24 rounded bg-[#d0d0f0]" />
            <div className="h-1.5 w-16 rounded bg-[#e8e8e8]" />
            <div className="h-1.5 w-full rounded bg-[#f0f0f0]" />
          </div>
        </div>
        <div className="space-y-1 pt-1">
          <div className="h-1.5 w-20 rounded bg-[#e8e8e8]" />
          <div className="h-2 w-36 rounded bg-[#d0d0f0]" />
          <div className="h-1.5 w-full rounded bg-[#f0f0f0]" />
          <div className="h-1.5 w-4/5 rounded bg-[#f0f0f0]" />
        </div>
      </div>
    </div>
  </div>
);

/* ─── Ad Cards ─── */

const MobileAdCard = () => (
  <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] p-3 w-[220px] text-left" style={{ fontFamily: "Arial, sans-serif" }}>
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
  <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] p-4 w-[300px] text-left" style={{ fontFamily: "Arial, sans-serif" }}>
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
    {/* Chassis */}
    <div className="absolute inset-0 rounded-[40px] shadow-2xl overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-[22px] rounded-full z-10" style={{ backgroundColor: "#000" }} />
      {/* Status bar */}
      <div className="absolute top-3.5 left-7 right-7 flex justify-between items-center text-[9px] text-white/70 select-none z-10">
        <span className="font-medium">11:11</span>
        <span className="flex gap-0.5 text-[8px]">•&nbsp;•&nbsp;•</span>
      </div>
      {/* Inner screen */}
      <div className="absolute inset-[8px] top-[36px] rounded-[32px] overflow-hidden bg-white">
        <PhoneSearchScreen />
      </div>
    </div>
  </div>
);

const LaptopFrame = () => (
  <div className="relative w-[340px] md:w-[420px]">
    {/* Lid / screen portion */}
    <div className="relative rounded-t-xl overflow-hidden border-[6px] shadow-xl" style={{ borderColor: "#d0d0d0", backgroundColor: "#d0d0d0" }}>
      {/* Browser chrome */}
      <div className="rounded-t-sm overflow-hidden" style={{ backgroundColor: "#f5f5f5" }}>
        {/* Title bar with traffic lights */}
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
        {/* Screen content */}
        <div className="bg-white" style={{ aspectRatio: "16/10" }}>
          <LaptopSearchScreen />
        </div>
      </div>
    </div>
    {/* Hinge */}
    <div className="h-[3px] mx-1" style={{ backgroundColor: "#b8b8b8" }} />
    {/* Keyboard base — wider than lid */}
    <div className="relative h-[28px] rounded-b-lg mx-[-8px]" style={{ backgroundColor: "#c0c0c0" }}>
      <span className="absolute inset-x-0 top-2 text-center text-[7px] text-[#999] tracking-widest select-none">
        MacBook Pro
      </span>
    </div>
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

          {/* Right — Device Visuals (desktop: overlapping absolute) */}
          <div className="hidden md:block">
            <div className="relative" style={{ height: 540 }}>
              {/* Laptop — behind-right, lower z */}
              <div className="absolute z-[5]" style={{ left: 140, top: 80 }}>
                <LaptopFrame />
                {/* Desktop ad card — floats over bottom of laptop screen */}
                <div
                  className={`absolute z-[6] transition-all duration-700 ease-out ${
                    showDesktopAd ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ bottom: 60, left: "50%", transform: showDesktopAd ? "translateX(-50%)" : "translateX(-50%) translateY(2rem)" }}
                >
                  <DesktopAdCard />
                </div>
              </div>

              {/* Phone — front-left, higher z */}
              <div className="absolute z-[10]" style={{ left: 0, top: 40 }}>
                <PhoneFrame />
                {/* Mobile ad card — floats over bottom ~60% of phone screen */}
                <div
                  className={`absolute z-[11] left-1/2 transition-all duration-700 ease-out ${
                    showMobileAd ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ bottom: 20, transform: "translateX(-50%)" }}
                >
                  <MobileAdCard />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout: stacked, centred, normal flow */}
          <div className="md:hidden flex flex-col items-center gap-6">
            {/* Phone + card */}
            <div className="relative max-w-[300px] w-full flex flex-col items-center">
              <PhoneFrame />
              <div
                className={`-mt-10 relative z-10 transition-all duration-700 ease-out ${
                  showMobileAd ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <MobileAdCard />
              </div>
            </div>

            {/* Laptop + card */}
            <div className="relative max-w-[300px] w-full flex flex-col items-center">
              <div className="w-full scale-[0.8] origin-top">
                <LaptopFrame />
              </div>
              <div
                className={`-mt-6 relative z-10 transition-all duration-700 ease-out ${
                  showDesktopAd ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <DesktopAdCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VariousEateriesHero;
