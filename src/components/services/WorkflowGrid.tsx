import { useCountUp } from "@/hooks/use-count-up";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WorkflowGridProps {
  steps: Step[];
  columns?: 2 | 4;
  heading?: string;
  /** Adds a drawing progress line, staggered reveals and counting numerals. */
  animated?: boolean;
}

function StepNumeral({ value, animated }: { value: number; animated: boolean }) {
  const { ref, displayValue } = useCountUp({ end: value, duration: 900 });
  if (!animated) {
    return <span className="heading-display text-6xl text-primary/30 block mb-2">{value}</span>;
  }
  return (
    <span ref={ref} className="heading-display text-6xl text-primary/30 block mb-2">
      {displayValue}
    </span>
  );
}

export function WorkflowGrid({ steps, columns = 4, heading, animated = false }: WorkflowGridProps) {
  const reduced = usePrefersReducedMotion();
  const useMotion = animated && !reduced;
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">{heading}</h2>
        )}
        <div ref={ref} className="relative max-w-6xl mx-auto">
          <div
            className={`relative grid gap-8 ${
              columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"
            }`}
          >
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={
                  animated
                    ? `transition-all duration-500 ease-out ${
                        isRevealed || !useMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`
                    : undefined
                }
                style={animated ? { transitionDelay: `${i * 100}ms` } : undefined}
              >
                <StepNumeral value={step.number} animated={useMotion} />
                <h3 className="heading-display text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
