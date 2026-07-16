import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MODE_COPY,
  PANEL_HEADINGS,
  CELEBRATION_FRAMING,
} from "@/data/prosceniumQuizContent";
import { getResults } from "@/lib/prosceniumResults";
import { CaptureBox } from "./CaptureBox";

interface ResultsScreenProps {
  answers: Record<string, string>;
  onRestart: () => void;
}

export function ResultsScreen({ answers, onRestart }: ResultsScreenProps) {
  const { mode, groups, celebration } = getResults(answers);
  const modeCopy = MODE_COPY[mode];
  const headings = PANEL_HEADINGS[mode];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-6">
          {modeCopy.headline}
        </h1>
        <div className="space-y-4 text-lg text-foreground/85">
          {modeCopy.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </header>

      {groups.map((group) => {
        const heading =
          group.key === "primary" ? headings.primary : headings.secondary ?? "";
        return (
          <section key={group.key} className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
              {heading}
            </h2>
            <div className="space-y-6">
              {group.items.map((rec) => (
                <Card key={rec.id} className="p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">
                    {rec.copy.headline}
                  </h3>
                  <div className="space-y-3 text-foreground/85 leading-relaxed">
                    {rec.copy.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      {celebration.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
            {headings.celebration}
          </h2>
          <div className="bg-accent rounded-2xl p-6 md:p-8 space-y-5">
            {celebration.map((item) => (
              <div key={item.id}>
                <h3 className="font-display text-lg text-accent-foreground mb-1">
                  {item.headline}
                </h3>
                <p className="text-accent-foreground/85 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="space-y-4 text-lg text-foreground/85 mb-4">
        {CELEBRATION_FRAMING.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <CaptureBox />

      <div className="mt-10">
        <Button variant="outline" onClick={onRestart}>
          Start again
        </Button>
      </div>
    </div>
  );
}

export default ResultsScreen;