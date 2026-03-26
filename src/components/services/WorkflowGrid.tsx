interface Step {
  number: number;
  title: string;
  description: string;
}

interface WorkflowGridProps {
  steps: Step[];
  columns?: 2 | 4;
  heading?: string;
}

export function WorkflowGrid({ steps, columns = 4, heading }: WorkflowGridProps) {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">{heading}</h2>
        )}
        <div className={`grid gap-8 max-w-6xl mx-auto ${columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}>
          {steps.map((step) => (
            <div key={step.number}>
              <span className="heading-display text-6xl text-primary/30 block mb-2">{step.number}</span>
              <h3 className="heading-display text-xl text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
