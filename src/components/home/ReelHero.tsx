import reelAsset from "@/assets/we-are-trapeze-media.mp4.asset.json";
import { useEffect, useRef, useState } from "react";

export function ReelHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const updateVideoVisibility = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      setShowVideo(heroBottom > 0);
    };

    updateVideoVisibility();
    window.addEventListener("scroll", updateVideoVisibility, { passive: true });
    window.addEventListener("resize", updateVideoVisibility);

    return () => {
      window.removeEventListener("scroll", updateVideoVisibility);
      window.removeEventListener("resize", updateVideoVisibility);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full aspect-video">
      <video
        src={reelAsset.url}
        autoPlay
        loop
        muted
        playsInline
        className={`fixed top-20 lg:top-0 left-0 w-full aspect-video object-cover z-0 bg-black transition-opacity duration-200 ${showVideo ? "opacity-100" : "opacity-0"}`}
      />
    </section>
  );
}