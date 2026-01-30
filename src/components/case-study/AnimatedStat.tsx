import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

export function AnimatedStat({ 
  value, 
  suffix = "", 
  prefix = "", 
  label,
  delay = 0 
}: AnimatedStatProps) {
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 2500,
    delay,
    suffix,
    prefix,
  });

  return (
    <div ref={ref} className="text-center group">
      <div className="relative">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
        
        <span className="heading-display text-6xl md:text-7xl lg:text-8xl text-primary block relative">
          {displayValue}
        </span>
      </div>
      <span className="text-foreground text-lg md:text-xl mt-4 block font-medium">
        {label}
      </span>
    </div>
  );
}
