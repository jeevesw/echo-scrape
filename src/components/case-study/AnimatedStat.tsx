import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedStatProps {
  value: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  formatValue?: (value: number) => string;
  size?: "default" | "compact";
}

export function AnimatedStat({ 
  value, 
  suffix = "", 
  prefix = "", 
  label,
  delay = 0,
  formatValue,
  size = "default",
}: AnimatedStatProps) {
  const { ref, displayValue } = useCountUp({
    end: value,
    duration: 2500,
    delay,
    suffix,
    prefix,
    formatValue,
  });

  const valueClasses = size === "compact"
    ? "heading-display text-4xl md:text-5xl text-primary block relative"
    : "heading-display text-6xl md:text-7xl lg:text-8xl text-primary block relative transition-transform duration-500 group-hover:scale-105";

  return (
    <div ref={ref} className="text-center group overflow-hidden">
      <div className="relative">
        <span className={valueClasses}>
          {displayValue}
        </span>
      </div>
      <span className="text-foreground text-base md:text-lg mt-3 block font-medium">
        {label}
      </span>
    </div>
  );
}
