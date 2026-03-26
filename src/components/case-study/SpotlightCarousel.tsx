import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string;
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const len = images.length;
  const getIdx = (i: number) => ((i % len) + len) % len;

  // Measure max height on mount and lock it
  useEffect(() => {
    if (containerRef.current && containerHeight === null) {
      const h = containerRef.current.getBoundingClientRect().height;
      if (h > 0) setContainerHeight(h);
    }
  });

  // Auto-rotate
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, lightboxOpen]);

  const handleClick = useCallback(() => setLightboxOpen(true), []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  // Build an extended array: we render enough copies to allow smooth infinite scroll.
  // We show 3 at a time. Track has many items, we translate to keep current centre visible.
  // To create infinite illusion: render 3 copies of the array side by side.
  const extendedImages = [...images, ...images, ...images];
  const totalExtended = extendedImages.length;
  
  // The "real" centre in the extended array — offset by len so we start in the middle copy
  const extendedIndex = len + (currentIndex % len);
  
  // Each item width as percentage of container
  const itemWidthPercent = 33.333;
  // Track width
  const trackWidthPercent = totalExtended * itemWidthPercent;
  // Translate to centre the active item (put it at position 1 of the visible 3)
  const translatePercent = -((extendedIndex - 1) * itemWidthPercent);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-pointer"
        style={containerHeight ? { height: containerHeight } : undefined}
        onClick={handleClick}
      >
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        {/* Sliding track */}
        <div
          className="flex items-center transition-transform duration-700 ease-in-out"
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(${translatePercent / (totalExtended / 3)}%)`,
          }}
        >
          {extendedImages.map((img, i) => {
            const distFromCentre = Math.abs(i - extendedIndex);
            const isCentre = distFromCentre === 0;

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

      {/* Full-page lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-12 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Dark translucent backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image grid */}
          <div
            className="relative z-10 grid grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-2xl">
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
