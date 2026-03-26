import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string; // "bg-muted" or "bg-background" to match fade edges
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto-rotate
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, lightboxOpen]);

  const handleClick = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  // Determine the gradient colour to match background
  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        {/* Images track */}
        <div
          className="flex transition-transform duration-700 ease-in-out cursor-pointer"
          style={{
            transform: `translateX(calc(-${activeIndex * (100 / images.length)}% + ${50 - 100 / images.length / 2}%))`,
            width: `${images.length * 33.333}%`,
          }}
          onClick={handleClick}
        >
          {images.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                className="flex-shrink-0 px-3 transition-all duration-700"
                style={{ width: `${100 / images.length}%` }}
              >
                <div
                  className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ${
                    isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"
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
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-primary w-6" : "bg-primary/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-background hover:text-background/80 transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="grid grid-cols-2 gap-4 max-w-5xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
