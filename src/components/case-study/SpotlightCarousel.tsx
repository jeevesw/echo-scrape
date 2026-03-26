import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string;
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  const [centre, setCentre] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const len = images.length;
  const getIdx = (i: number) => ((i % len) + len) % len;

  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setCentre((prev) => (prev + 1) % len);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, lightboxOpen, len]);

  const handleClick = useCallback(() => setLightboxOpen(true), []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  const leftIdx = getIdx(centre - 1);
  const rightIdx = getIdx(centre + 1);

  return (
    <>
      <div className="relative w-full overflow-hidden cursor-pointer" onClick={handleClick}>
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        <div className="flex items-center justify-center gap-3 md:gap-4 px-2">
          {/* Left */}
          <CarouselSlot images={images} index={leftIdx} faded />
          {/* Centre */}
          <CarouselSlot images={images} index={centre} faded={false} />
          {/* Right */}
          <CarouselSlot images={images} index={rightIdx} faded />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCentre(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                centre === i ? "bg-primary w-5" : "bg-primary/30"
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
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/** A single slot that crossfades between images using stacked absolute layers */
function CarouselSlot({
  images,
  index,
  faded,
}: {
  images: { src: string; alt: string }[];
  index: number;
  faded: boolean;
}) {
  return (
    <div
      className={`flex-shrink-0 rounded-xl overflow-hidden shadow-lg relative transition-transform duration-500 ease-in-out ${
        faded ? "w-[28%] md:w-[30%] scale-90" : "w-[44%] md:w-[40%] scale-100"
      }`}
      style={{ opacity: faded ? 0.35 : 1 }}
    >
      {/* Stack all images, only the active one is visible */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`w-full h-auto object-cover transition-opacity duration-500 ease-in-out ${
            i === index ? "opacity-100 relative" : "opacity-0 absolute inset-0"
          }`}
          loading="lazy"
        />
      ))}
    </div>
  );
}
