import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-count-up";
import myceliaImage from "@/assets/case-studies/mycelia-board-game.webp";

function AnimatedStatCard({ end, prefix, suffix, label, delay }: {
  end: number; prefix?: string; suffix?: string; label: string; delay?: number;
}) {
  const { ref, displayValue } = useCountUp({ end, prefix, suffix, delay, duration: 2500 });
  return (
    <div ref={ref} className="bg-background border-2 border-primary rounded-xl px-6 py-4 text-center min-w-[140px]">
      <span className="heading-display text-4xl text-primary">{displayValue}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wide mt-1 block">{label}</span>
    </div>
  );
}

const MyceliaCallout = () => (
  <section className="relative overflow-hidden min-h-[420px]">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${myceliaImage})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

    <div className="relative z-10 flex flex-col justify-end px-8 md:px-16 py-32 max-w-5xl mx-auto">
      <p className="text-white text-xs tracking-widest font-semibold uppercase mb-3">
        Meta Lead Generation · Case Study
      </p>

      <h2 className="heading-display text-3xl lg:text-5xl text-white leading-tight mb-6">
        Half a Million Raised: Lead Generation for 'Mycelia' Board Game Kickstarter
      </h2>

      <div className="flex gap-4 flex-wrap">
        <AnimatedStatCard end={10492} label="Backers" delay={0} formatValue={(v) => v.toLocaleString()} />
        <AnimatedStatCard end={50} suffix=" mins" label="Funded In" delay={200} />
        <AnimatedStatCard end={545804} prefix="£" label="Raised" delay={400} formatValue={(v) => v.toLocaleString()} />
      </div>

      <div className="mt-6">
        <Button variant="hero" asChild>
          <Link to="/case-studies/mycelia">
            Read the Full Case Study →
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default MyceliaCallout;
