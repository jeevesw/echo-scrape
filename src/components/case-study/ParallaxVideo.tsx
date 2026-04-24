import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface ParallaxVideoProps {
  src: string;
  direction?: "left" | "right";
  className?: string;
  showMuteControl?: boolean;
}

export function ParallaxVideo({ 
  src, 
  direction = "left", 
  className = "",
  showMuteControl = false 
}: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [offset, setOffset] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl shadow-2xl group ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      
      {/* Mute/Unmute control */}
      {showMuteControl && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full 
                     text-foreground hover:bg-background hover:scale-110 
                     transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
}
