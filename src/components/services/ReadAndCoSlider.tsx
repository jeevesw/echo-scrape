import { useEffect, useRef, useState, useCallback } from "react";

export function ReadAndCoSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasHinted, setHasHinted] = useState(false);
  const [isHinting, setIsHinting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasHinted) {
          setHasHinted(true);
          setTimeout(() => setIsHinting(true), 500);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasHinted]);

  useEffect(() => {
    if (!isHinting) return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    setPosition(28);
    t1 = setTimeout(() => setPosition(72), 550);
    t2 = setTimeout(() => setPosition(50), 1100);
    t3 = setTimeout(() => setIsHinting(false), 1650);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isHinting]);

  const getPositionFromEvent = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setPosition(getPositionFromEvent(e.clientX));
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition(getPositionFromEvent(e.clientX));
  }, [isDragging, getPositionFromEvent]);

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setPosition(getPositionFromEvent(e.touches[0].clientX));
  };

  const onTouchMove = (e: React.TouchEvent) => setPosition(getPositionFromEvent(e.touches[0].clientX));

  const onTouchEnd = () => setIsDragging(false);

  const handleTransition = isDragging
    ? "none"
    : "left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const overlayTransition = isDragging
    ? "none"
    : "clip-path 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none"
      style={{ cursor: "col-resize", aspectRatio: "4/3" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        <img
          src="/images/read-and-co-production.webp"
          alt="Read & Co. — finished site"
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transition: overlayTransition,
        }}
      >
        <img
          src="/images/read-and-co-wireframe.webp"
          alt="Read & Co. — wireframe"
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transition: handleTransition }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10 pointer-events-none"
        style={{ left: `${position}%`, transition: handleTransition }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 5L17 10L13 15" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span
        className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm tracking-wide uppercase pointer-events-none"
        style={{ opacity: position > 12 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        Wireframe
      </span>
      <span
        className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm tracking-wide uppercase pointer-events-none"
        style={{ opacity: position < 88 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        Production
      </span>
    </div>
  );
}
