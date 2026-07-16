import { Button } from "@/components/ui/button";
import { HERO, STAGE_LABELS, type Stage } from "@/data/prosceniumQuizContent";

const STAGE_ORDER: Stage[] = ["registration", "pre-event", "arrival", "during", "post-event"];

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
      <p
        className="uppercase mb-6"
        style={{
          color: "hsl(var(--muted-foreground))",
          fontSize: "13px",
          letterSpacing: "0.12em",
          fontWeight: 700,
        }}
      >
        {HERO.eyebrow}
      </p>
      <h1
        className="text-4xl md:text-6xl leading-[1.05] mb-8 tracking-tight"
        style={{ color: "#FFFFFF", fontWeight: 700 }}
      >
        {HERO.headline}
      </h1>
      <div
        className="space-y-4 text-lg md:text-xl mb-10"
        style={{ color: "hsl(var(--body-text))" }}
      >
        {HERO.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Button
        size="lg"
        onClick={onStart}
        className="border-0 hover:bg-white/90"
        style={{
          background: "#FFFFFF",
          color: "#46003A",
          fontWeight: 700,
          padding: "16px 36px",
          borderRadius: "8px",
          fontSize: "16px",
          height: "auto",
        }}
      >
        {HERO.cta}
      </Button>

      <div className="mt-14 flex flex-wrap gap-2" aria-hidden="true">
        {STAGE_ORDER.map((s) => (
          <span
            key={s}
            className="uppercase px-3 py-1.5 rounded-full"
            style={{
              fontSize: "13px",
              letterSpacing: "0.12em",
              fontWeight: 700,
              color: "hsl(var(--muted-foreground))",
              border: "1px solid rgba(255,255,255,0.28)",
            }}
          >
            {STAGE_LABELS[s]}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HeroScreen;