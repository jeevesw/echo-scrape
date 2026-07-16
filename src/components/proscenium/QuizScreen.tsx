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
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
          <span>{STAGE_LABELS[question.stage]}</span>
          <span>
            Question {index + 1} of {total}
          </span>
        </div>
        <Progress value={((index + 1) / total) * 100} />
      </div>

      <h2 className="font-display text-2xl md:text-3xl leading-tight mb-8">
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
          return (
            <Label
              key={opt.id}
              htmlFor={inputId}
              className="flex items-start gap-3 p-4 rounded-md border border-border cursor-pointer hover:bg-accent/60 has-[:checked]:border-primary has-[:checked]:bg-accent transition-colors"
            >
              <RadioGroupItem id={inputId} value={opt.id} className="mt-0.5" />
              <span className="text-base font-normal leading-snug">{opt.label}</span>
            </Label>
          );
        })}
      </RadioGroup>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} disabled={index === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selected}>
          {isLast ? "See my recommendations" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default QuizScreen;