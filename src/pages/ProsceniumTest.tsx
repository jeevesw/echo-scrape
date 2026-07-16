import { useState, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { PROSCENIUM_TOKENS, PROSCENIUM_GRADIENT } from "@/data/prosceniumQuizContent";
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
      style={{
        ...(PROSCENIUM_TOKENS as CSSProperties),
        backgroundImage: PROSCENIUM_GRADIENT,
        backgroundAttachment: "fixed",
        fontFamily: "'Montserrat', system-ui, sans-serif",
        color: "hsl(var(--body-text))",
      }}
      className="proscenium-scope min-h-screen antialiased"
    >
      <Helmet>
        <title>Proscenium — Accessibility in Events</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          .proscenium-scope :focus-visible {
            outline: 2px solid #FFFFFF !important;
            outline-offset: 2px !important;
            box-shadow: none !important;
          }
          .proscenium-scope ::selection { background: #FFFFFF; color: #46003A; }
        `}</style>
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