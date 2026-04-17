import { useEffect, useRef, useState, useCallback } from "react";

const slides = [
  {
    src: "/images/read-and-co-wireframe.webp",
    label: "Wireframe",
  },
  {
    src: "/images/read-and-co-production.webp",
    label: "Production",
  },
];

export function ReadAndCoSlider() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasHinted, setHasHinted] = useState(false);
  const [isHinting, setIsHinting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Intersection observer — trigger hint animation once when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasHinted) {
          setHasHinted(true);
          setTimeout(() => {
            setIsHinting(true);
            setTimeout(() => setIsHinting(false), 900);
          }, 400);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasHinted]);

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)));
    setDragOffset(0);
  }, []);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setDragOffset(e.clientX - dragStartX.current);
    },
    [isDragging]
  );

  const onMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60 && current < slides.length - 1) goTo(current + 1);
    else if (dragOffset > 60 && current > 0) goTo(current - 1);
    else setDragOffset(0);
  }, [isDragging, dragOffset, current, goTo]);

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setDragOffset(e.touches[0].clientX - dragStartX.current);
  };

  const onTouchEnd = () => {
    if (dragOffset < -60 && current < slides.length - 1) goTo(current + 1);
    else if (dragOffset > 60 && current > 0) goTo(current - 1);
    else setDragOffset(0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // Calculate transform
  const baseTranslate = current * -100;
  const dragPercent = containerRef.current
    ? (dragOffset / containerRef.current.offsetWidth) * 100
    : 0;
  const hintTranslate = isHinting ? -12 : 0;
  const totalTranslate = baseTranslate + dragPercent + hintTranslate;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Slide track */}
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translateX(${totalTranslate}%)`,
            transition: isDragging || isHinting
              ? isHinting
                ? "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "none"
              : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative w-full flex-shrink-0">
              <img
                src={slide.src}
                alt={`Read & Co. — ${slide.label}`}
                className="w-full h-auto block"
                draggable={false}
              />
              {/* Label badge */}
              <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm tracking-wide uppercase">
                {slide.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-foreground hover:bg-white transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={() => goTo(current + 1)}
        disabled={current === slides.length - 1}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-foreground hover:bg-white transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
