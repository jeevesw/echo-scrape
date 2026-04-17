import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedStatCardProps {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
  duration?: number;
  formatValue?: (v: number) => string;
}

/**
 * Stat card matching the Mycelia callout style:
 * dark/transparent background card with primary border and animated count-up.
 * Designed for use over dark/parallax hero backgrounds.
 */
export function AnimatedStatCard({
  end,
  prefix,
  suffix,
  label,
  delay = 0,
  duration = 2500,
  formatValue,
}: AnimatedStatCardProps) {
  const { ref, displayValue } = useCountUp({ end, prefix, suffix, delay, duration, formatValue });
  return (
    <div
      ref={ref}
      className="bg-background border-2 border-primary rounded-xl px-6 py-4 text-center min-w-[140px]"
    >
      <span className="heading-display text-4xl text-primary block">{displayValue}</span>
      <span className="text-sm md:text-base text-muted-foreground uppercase tracking-wide mt-1 block">
        {label}
      </span>
    </div>
  );
}
