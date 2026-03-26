import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string;
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  // currentIndex increments forever — never resets — to avoid snap-back
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const len = images.length;
  const getIdx = (i: number) => ((i % len) + len) % len;

  // Auto-rotate: increment forever
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, lightboxOpen]);

  // After each transition completes, silently reset index to avoid
  // the extended array growing too large. We jump back by `len` without animation.
  useEffect(() => {
    if (currentIndex < len * 2) return; // only reset when we've gone past 2nd copy
    const timeout = setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        setCurrentIndex((prev) => prev - len);
        // Re-enable transition on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.transition = "";
            }
          });
        });
      }
    }, 750); // after slide animation (700ms) completes
    return () => clearTimeout(timeout);
  }, [currentIndex, len]);

  const handleClick = useCallback(() => setLightboxOpen(true), []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  // Render 5 copies of the array to have enough runway for smooth infinite scroll
  const copies = 5;
  const extendedImages = Array.from({ length: copies }, () => images).flat();
  const totalExtended = extendedImages.length;

  // Centre index in the extended array — start in 2nd copy
  const extendedIndex = len * 2 + getIdx(currentIndex);
  // But since currentIndex can be large, we use it directly offset into the extended array
  const trackIndex = currentIndex + len; // offset so we start in the middle of the 5 copies

  // Each item is 1/3 of container width
  const itemFraction = 1 / 3;
  // Translate so the active item is centred (at position index 1 of 3 visible)
  const translateFraction = -(trackIndex - 1) * itemFraction;

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-pointer"
        style={undefined}
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
            transform: `translateX(${translateFraction / (totalExtended / 3) * 100}%)`,
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

      {/* Lightbox — portalled to document.body so it's truly full-page */}
      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-12 animate-fade-in"
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
            className="relative z-10 grid grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-2xl">
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
