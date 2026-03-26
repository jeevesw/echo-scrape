import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Maximize2 } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string;
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const len = images.length;
  const getIdx = (i: number) => ((i % len) + len) % len;

  // Auto-rotate
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, lightboxOpen]);

  // Listen for transition end to do silent reset
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onEnd = (e: TransitionEvent) => {
      // Only react to the track's own transform transition
      if (e.target !== track || e.propertyName !== "transform") return;
      setIsTransitioning(false);
      setCurrentIndex((prev) => {
        if (prev >= len) {
          // Kill ALL transitions (track + children) for instant jump
          track.style.transition = "none";
          const items = track.querySelectorAll<HTMLElement>("[data-carousel-item]");
          items.forEach((el) => (el.style.transition = "none"));

          const newIdx = prev - len;
          requestAnimationFrame(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            track.offsetHeight; // force reflow
            requestAnimationFrame(() => {
              track.style.transition = "";
              items.forEach((el) => (el.style.transition = ""));
            });
          });
          return newIdx;
        }
        return prev;
      });
    };

    track.addEventListener("transitionend", onEnd);
    return () => track.removeEventListener("transitionend", onEnd);
  }, [len]);

  const handleClick = useCallback(() => setLightboxOpen(true), []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  // We only need 3 copies: one before, current, one after — enough runway
  const copies = 3;
  const extendedImages = Array.from({ length: copies }, () => images).flat();
  const totalExtended = extendedImages.length;

  // Offset into the middle copy
  const trackIndex = currentIndex + len;

  // Each item is 1/3 of container width; centre the active one
  const translatePct = -((trackIndex - 1) / totalExtended) * 100;

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        {/* Sliding track */}
        <div
          ref={trackRef}
          className="flex items-center transition-transform duration-700 ease-in-out"
          style={{
            width: `${(totalExtended / 3) * 100}%`,
            transform: `translateX(${translatePct}%)`,
          }}
        >
          {extendedImages.map((img, i) => {
            const isCentre = i === trackIndex;

            return (
              <div
                key={i}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / totalExtended}%` }}
              >
                <div
                  data-carousel-item
                  className={`rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out ${
                    isCentre
                      ? "opacity-100 scale-100"
                      : "opacity-35 scale-[0.88]"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getIdx(currentIndex) === i ? "bg-primary w-5" : "bg-primary/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox — portalled to document.body, 4×1 row */}
      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative z-10 flex gap-3 md:gap-4 w-full max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <div key={i} className="flex-1 rounded-xl overflow-hidden shadow-2xl">
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
