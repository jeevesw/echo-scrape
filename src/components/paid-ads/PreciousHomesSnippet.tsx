import { ParallaxVideo } from "@/components/case-study/ParallaxVideo";
import { useCountUp } from "@/hooks/use-count-up";

function AnimatedStatPill({ end, prefix, suffix, label, delay, formatValue }: {
  end: number; prefix?: string; suffix?: string; label: string; delay?: number;
  formatValue?: (v: number) => string;
}) {
  const { ref, displayValue } = useCountUp({ end, prefix, suffix, delay, duration: 2500, formatValue });
  return (
    <div ref={ref} className="bg-background border-2 border-primary rounded-xl px-5 py-3">
      <span className="heading-display text-2xl text-primary block">{displayValue}</span>
      <span className="text-sm text-muted-foreground block mt-1">{label}</span>
    </div>
  );
}

const PreciousHomesSnippet = () => (
  <div className="mt-20 pt-16 border-t border-border/40 max-w-5xl mx-auto">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="grid grid-cols-2 gap-4">
        <ParallaxVideo
          src="https://trapezemedia.co.uk/s/Testimonial_NoexperienceNeeded_PreciousHomes.mp4"
          direction="left"
          showMuteControl
          className="rounded-xl"
        />
        <ParallaxVideo
          src="https://trapezemedia.co.uk/s/Precious-Homes-Slideshow-01_2.mp4"
          direction="right"
          showMuteControl
          className="rounded-xl"
        />
      </div>

      <div>
        <span className="bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1 inline-block mb-4">
          Paid Social · Recruitment
        </span>

        <h3 className="heading-display text-3xl text-foreground mb-4">Precious Homes</h3>

        <div className="flex gap-3 flex-wrap mb-6">
          <AnimatedStatPill end={1} prefix="£" suffix=".88" label="Cost-per-lead average across all placements" delay={0} />
          <AnimatedStatPill end={76} suffix="%" label="Interviewees offered a job from 4% contact rate" delay={200} />
        </div>

        <p className="text-muted-foreground text-lg mb-6">
          Precious (formerly Precious Homes), one of the UK's leading care homes, approached us to help with recruitment after the COVID-19 pandemic, when staffing was a huge struggle for them. Our paid social ads boosted new hires while driving down costs-per-lead.
        </p>
      </div>
    </div>
  </div>
);

export default PreciousHomesSnippet;
