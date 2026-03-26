import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string;
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const len = images.length;

  // Infinite index helper
  const getIdx = (offset: number) => ((activeIndex + offset) % len + len) % len;

  // Auto-rotate continuously
  useEffect(() => {
    if (lightboxOpen) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [interval, lightboxOpen]);

  const handleClick = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  // Show 3 images: left (faded), centre (highlighted), right (faded)
  const leftIdx = getIdx(-1);
  const centreIdx = getIdx(0);
  const rightIdx = getIdx(1);

  const slots = [
    { idx: leftIdx, position: "left" as const },
    { idx: centreIdx, position: "centre" as const },
    { idx: rightIdx, position: "right" as const },
  ];

  return (
    <>
      <div className="relative w-full overflow-hidden cursor-pointer" onClick={handleClick}>
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        <div className="flex items-center justify-center gap-3 md:gap-4 px-2">
          {slots.map(({ idx, position }) => (
            <div
              key={`${activeIndex}-${position}`}
              className={`flex-shrink-0 rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${
                position === "centre"
                  ? "opacity-100 scale-100 w-[50%] md:w-[45%]"
                  : "opacity-35 scale-90 w-[28%] md:w-[30%]"
              }`}
            >
              <img
                src={images[idx].src}
                alt={images[idx].alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getIdx(0) === i ? "bg-primary w-5" : "bg-primary/30"
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
