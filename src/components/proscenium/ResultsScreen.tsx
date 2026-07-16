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
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <header className="mb-12">
        <h1
          className="text-4xl md:text-5xl leading-tight mb-6 tracking-tight"
          style={{ color: "#FFFFFF", fontWeight: 700 }}
        >
          {modeCopy.headline}
        </h1>
        <div className="space-y-4 text-lg" style={{ color: "hsl(var(--body-text))" }}>
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
            <h2
              className="text-2xl md:text-3xl mb-6 tracking-tight"
              style={{ color: "#FFFFFF", fontWeight: 700 }}
            >
              {heading}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {group.items.map((rec) => (
                <Card
                  key={rec.id}
                  className="p-6 md:p-8 border-0 h-full"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    borderRadius: "12px",
                    color: "hsl(var(--body-text))",
                  }}
                >
                  <h3
                    className="text-xl md:text-2xl mb-4 tracking-tight"
                    style={{ color: "#FFFFFF", fontWeight: 700 }}
                  >
                    {rec.copy.headline}
                  </h3>
                  <div
                    className="space-y-3 leading-relaxed"
                    style={{ color: "hsl(var(--body-text))" }}
                  >
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
          <h2
            className="text-2xl md:text-3xl mb-6 tracking-tight"
            style={{ color: "#FFFFFF", fontWeight: 700 }}
          >
            {headings.celebration}
          </h2>
          <div
            className="rounded-2xl p-6 md:p-8 grid gap-6 md:grid-cols-2"
            style={{ background: "#FFFFFF", color: "#46003A" }}
          >
            {celebration.map((item) => (
              <div key={item.id}>
                <h3
                  className="text-lg mb-1 tracking-tight"
                  style={{ color: "#46003A", fontWeight: 700 }}
                >
                  {item.headline}
                </h3>
                <p className="leading-relaxed" style={{ color: "#46003A" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div
        className="space-y-4 text-lg mb-4"
        style={{ color: "hsl(var(--body-text))" }}
      >
        {CELEBRATION_FRAMING.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <CaptureBox />

      <div className="mt-10">
        <Button
          variant="outline"
          onClick={onRestart}
          className="bg-transparent hover:bg-white/10"
          style={{
            border: "1px solid rgba(255,255,255,0.28)",
            color: "hsl(var(--body-text))",
          }}
        >
          Start again
        </Button>
      </div>
    </div>
  );
}

export default ResultsScreen;