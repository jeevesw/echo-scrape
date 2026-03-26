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

  const len = images.length;
  const getIdx = (i: number) => ((i % len) + len) % len;

  // Auto-rotate
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, lightboxOpen]);

  const handleClick = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  // Build a window of 5 images: far-left, left, centre, right, far-right
  // We render 5 and translate so centre is in the middle.
  // On each tick, we shift the track left, then after transition reset without animation.
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [renderIndex, setRenderIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // renderIndex is the "stable" centre; activeIndex drives the animation
  useEffect(() => {
    if (activeIndex === renderIndex) return;
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      setRenderIndex(activeIndex);
    }, 600); // match CSS duration
    return () => clearTimeout(timeout);
  }, [activeIndex, renderIndex]);

  // Generate 5 slots centred on renderIndex, shifted by 1 when transitioning forward
  const offset = isTransitioning ? 1 : 0;
  const slots = [-2, -1, 0, 1, 2].map((pos) => ({
    pos,
    idx: getIdx(renderIndex + pos + offset),
  }));

  // Each slot takes 33.33% width; track = 5 * 33.33% = 166.66%
  // Default: translate so slot[2] (index 0, centre) is centred → translateX(-33.33%)
  // When transitioning: translateX(-66.66%) to slide left by one slot
  const translateX = isTransitioning ? -66.666 : -33.333;

  return (
    <>
      <div className="relative w-full overflow-hidden cursor-pointer" onClick={handleClick}>
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        <div
          ref={trackRef}
          className={`flex items-center ${isTransitioning ? "transition-transform duration-600 ease-in-out" : ""}`}
          style={{
            width: `${(5 / 3) * 100}%`,
            transform: `translateX(${translateX}%)`,
          }}
        >
          {slots.map(({ pos, idx }) => {
            // Determine visual state: centre slot (pos 0 when not transitioning, pos -1 when transitioning)
            const isCentre = isTransitioning ? pos === -1 : pos === 0;
            const isNext = isTransitioning ? pos === 0 : false;

            return (
              <div
                key={`${renderIndex}-${pos}`}
                className="flex-shrink-0 px-1.5 md:px-2"
                style={{ width: `${100 / 5}%` }}
              >
                <div
                  className={`rounded-xl overflow-hidden shadow-lg transition-all duration-600 ease-in-out ${
                    isCentre || isNext
                      ? "opacity-100 scale-100"
                      : "opacity-35 scale-90"
                  }`}
                >
                  <img
                    src={images[idx].src}
                    alt={images[idx].alt}
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
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i); setRenderIndex(i); setIsTransitioning(false); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getIdx(isTransitioning ? activeIndex - 1 : renderIndex) === i ? "bg-primary w-5" : "bg-primary/30"
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
