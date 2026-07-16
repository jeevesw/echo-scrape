import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QUESTIONS, STAGE_LABELS } from "@/data/prosceniumQuizContent";
import { prng, shuffleFixedLast } from "@/lib/prosceniumShuffle";

interface QuizScreenProps {
  onComplete: (answers: Record<string, string>) => void;
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const seed = useMemo(() => Math.floor(Math.random() * 2 ** 31), []);
  const ordered = useMemo(
    () =>
      QUESTIONS.map((q, i) => ({
        ...q,
        options: shuffleFixedLast(q.options, prng(seed + i)),
      })),
    [seed]
  );

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = ordered[index];
  const total = ordered.length;
  const isLast = index === total - 1;
  const selected = answers[question.id];

  const handleNext = () => {
    if (!selected) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-20">
      <div className="mb-8 space-y-3">
        <div
          className="flex items-center justify-between uppercase"
          style={{
            color: "hsl(var(--muted-foreground))",
            fontSize: "13px",
            letterSpacing: "0.12em",
            fontWeight: 700,
          }}
        >
          <span>{STAGE_LABELS[question.stage]}</span>
          <span>
            Question {index + 1} of {total}
          </span>
        </div>
        <Progress
          value={((index + 1) / total) * 100}
          className="h-2 [&>div]:bg-white"
          style={{ background: "rgba(255,255,255,0.18)" }}
        />
      </div>

      <h2
        className="leading-tight mb-8 tracking-tight"
        style={{
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "clamp(24px, 3.4vw, 30px)",
        }}
      >
        {question.question}
      </h2>

      <RadioGroup
        value={selected ?? ""}
        onValueChange={(val) =>
          setAnswers((prev) => ({ ...prev, [question.id]: val }))
        }
        className="space-y-3"
      >
        {question.options.map((opt) => {
          const inputId = `${question.id}-${opt.id}`;
          const isSelected = selected === opt.id;
          return (
            <Label
              key={opt.id}
              htmlFor={inputId}
              className="flex items-start gap-3 cursor-pointer transition-colors"
              style={{
                padding: "15px 18px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.28)",
                background: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.06)",
                color: isSelected ? "#46003A" : "hsl(var(--body-text))",
                fontWeight: isSelected ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.06)";
              }}
            >
              <RadioGroupItem
                id={inputId}
                value={opt.id}
                className="mt-0.5"
                style={
                  isSelected
                    ? { borderColor: "#46003A", color: "#46003A" }
                    : { borderColor: "#FFFFFF", color: "#FFFFFF" }
                }
              />
              <span className="text-base md:text-lg font-normal leading-snug">{opt.label}</span>
            </Label>
          );
        })}
      </RadioGroup>

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={index === 0}
          className="uppercase hover:bg-transparent hover:text-white"
          style={{
            color: "hsl(var(--muted-foreground))",
            fontSize: "13px",
            letterSpacing: "0.12em",
            fontWeight: 700,
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selected}
          className="border-0 hover:bg-white/90 disabled:opacity-50"
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
          {isLast ? "See my recommendations" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default QuizScreen;