import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  formatValue?: (value: number) => string;
}

export function AnimatedStat({ 
  value, 
  suffix = "", 
  prefix = "", 
  label,
  delay = 0,
  formatValue,
}: AnimatedStatProps) {
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 2500,
    delay,
    suffix,
    prefix,
    formatValue,
  });

  return (
    <div ref={ref} className="text-center group">
      <div className="relative">
        <span className="heading-display text-6xl md:text-7xl lg:text-8xl text-primary block relative transition-transform duration-500 group-hover:scale-105">
          {displayValue}
        </span>
      </div>
      <span className="text-foreground text-lg md:text-xl mt-4 block font-medium">
        {label}
      </span>
    </div>
  );
}
