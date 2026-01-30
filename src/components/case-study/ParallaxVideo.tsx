import { useRef, useEffect, useState } from "react";

interface ParallaxVideoProps {
  src: string;
  direction?: "left" | "right";
  className?: string;
}

export function ParallaxVideo({ src, direction = "left", className = "" }: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      
      // Calculate offset based on position relative to viewport center
      const distanceFromCenter = elementCenter - windowCenter;
      const maxOffset = 50; // Maximum parallax offset in pixels
      const normalizedOffset = (distanceFromCenter / windowHeight) * maxOffset;
      
      setOffset(direction === "left" ? -normalizedOffset : normalizedOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
}
