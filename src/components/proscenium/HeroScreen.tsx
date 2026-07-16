import { Button } from "@/components/ui/button";
import { HERO, STAGE_LABELS, type Stage } from "@/data/prosceniumQuizContent";

const STAGE_ORDER: Stage[] = ["registration", "pre-event", "arrival", "during", "post-event"];

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
      <p className="text-sm uppercase tracking-[0.2em] text-primary/80 mb-6">
        {HERO.eyebrow}
      </p>
      <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-foreground mb-8">
        {HERO.headline}
      </h1>
      <div className="space-y-4 text-lg text-foreground/85 mb-10">
        {HERO.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Button size="lg" onClick={onStart}>
        {HERO.cta}
      </Button>

      <div className="mt-14 flex flex-wrap gap-2" aria-hidden="true">
        {STAGE_ORDER.map((s) => (
          <span
            key={s}
            className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary/40 text-primary"
          >
            {STAGE_LABELS[s]}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HeroScreen;