import { useState, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { PROSCENIUM_TOKENS } from "@/data/prosceniumQuizContent";
import { PasswordGate } from "@/components/proscenium/PasswordGate";
import { HeroScreen } from "@/components/proscenium/HeroScreen";
import { QuizScreen } from "@/components/proscenium/QuizScreen";
import { ResultsScreen } from "@/components/proscenium/ResultsScreen";

type Screen = "hero" | "quiz" | "results";

export default function ProsceniumTest() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div
      style={PROSCENIUM_TOKENS as CSSProperties}
      className="min-h-screen bg-background text-foreground font-body antialiased"
    >
      <Helmet>
        <title>Proscenium — Accessibility in Events</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <PasswordGate>
        {screen === "hero" && <HeroScreen onStart={() => setScreen("quiz")} />}
        {screen === "quiz" && (
          <QuizScreen
            onComplete={(a) => {
              setAnswers(a);
              setScreen("results");
            }}
          />
        )}
        {screen === "results" && (
          <ResultsScreen
            answers={answers}
            onRestart={() => {
              setAnswers({});
              setScreen("hero");
            }}
          />
        )}
      </PasswordGate>
    </div>
  );
}