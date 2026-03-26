import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface SpotlightCarouselProps {
  images: { src: string; alt: string }[];
  bgClass?: string;
  interval?: number;
}

export function SpotlightCarousel({ images, bgClass = "bg-background", interval = 2000 }: SpotlightCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const len = images.length;
  const getIdx = (i: number) => ((i % len) + len) % len;

  // Auto-rotate every {interval}ms
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setAnimating(true);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, lightboxOpen]);

  // When animating flag is set, wait for CSS transition then advance index
  useEffect(() => {
    if (!animating) return;
    const timeout = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
      setAnimating(false);
    }, 500); // transition duration
    return () => clearTimeout(timeout);
  }, [animating]);

  const handleClick = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const isMuted = bgClass.includes("muted");
  const fadeColor = isMuted
    ? "from-[hsl(var(--muted))]"
    : "from-[hsl(var(--background))]";

  // Show 3 visible images: left, centre, right
  const leftIdx = getIdx(activeIndex - 1);
  const centreIdx = getIdx(activeIndex);
  const rightIdx = getIdx(activeIndex + 1);
  // Pre-stage the next one off-screen right
  const farRightIdx = getIdx(activeIndex + 2);

  const items = [
    { idx: leftIdx, role: "left" },
    { idx: centreIdx, role: "centre" },
    { idx: rightIdx, role: "right" },
    { idx: farRightIdx, role: "far-right" },
  ];

  return (
    <>
      <div className="relative w-full overflow-hidden cursor-pointer" onClick={handleClick}>
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r ${fadeColor} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l ${fadeColor} to-transparent z-10 pointer-events-none`} />

        <div className="relative flex items-center justify-center gap-3 md:gap-4 px-2">
          {items.map(({ idx, role }) => {
            let classes = "flex-shrink-0 rounded-xl overflow-hidden shadow-lg";
            let width: string;
            let opacity: number;
            let scale: string;
            let translateX: string;

            if (animating) {
              // During animation: everything shifts one position left
              if (role === "left") {
                // Slides off to the left, fading out
                classes += " absolute left-0";
                width = "28%";
                opacity = 0;
                scale = "scale-75";
                translateX = "-100%";
              } else if (role === "centre") {
                // Was centre, becomes left (fades)
                width = "28%";
                opacity = 0.35;
                scale = "scale-90";
                translateX = "0";
              } else if (role === "right") {
                // Was right, becomes centre (highlights)
                width = "50%";
                opacity = 1;
                scale = "scale-100";
                translateX = "0";
              } else {
                // far-right enters as new right
                width = "28%";
                opacity = 0.35;
                scale = "scale-90";
                translateX = "0";
              }
            } else {
              if (role === "far-right") continue;
              if (role === "centre") {
                width = "50%";
                opacity = 1;
                scale = "scale-100";
                translateX = "0";
              } else {
                width = "28%";
                opacity = 0.35;
                scale = "scale-90";
                translateX = "0";
              }
            }

            if (!animating && role === "far-right") return null;

            return (
              <div
                key={`${activeIndex}-${role}`}
                className={`${classes} transition-all duration-500 ease-in-out ${scale}`}
                style={{
                  width,
                  opacity,
                  transform: `${scale === "scale-75" ? "scale(0.75)" : scale === "scale-90" ? "scale(0.9)" : "scale(1)"} translateX(${translateX})`,
                  maxWidth: role === "centre" || (animating && role === "right") ? "50%" : "28%",
                }}
              >
                <img
                  src={images[idx].src}
                  alt={images[idx].alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i); setAnimating(false); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getIdx(activeIndex) === i ? "bg-primary w-5" : "bg-primary/30"
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
