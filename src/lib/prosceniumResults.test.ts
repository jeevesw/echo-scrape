import { describe, it, expect } from "vitest";
import { getResults } from "./prosceniumResults";
import { QUESTIONS } from "@/data/prosceniumQuizContent";

function answersFor(state: "todo" | "doing" | "unsure" | "started"): Record<string, string> {
  const out: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.state === state);
    if (opt) out[q.id] = opt.id;
  }
  return out;
}

describe("getResults", () => {
  it("all-todo answers return 'starting' mode", () => {
    const res = getResults(answersFor("todo"));
    expect(res.mode).toBe("starting");
  });

  it("all-doing answers return 'ahead' mode", () => {
    const res = getResults(answersFor("doing"));
    expect(res.mode).toBe("ahead");
  });

  it("4+ unsures return 'unsure' mode", () => {
    // Start from all-doing, flip 4 scored answers to 'unsure'
    const answers = answersFor("doing");
    const scored = QUESTIONS.filter((q) => !q.baseline).slice(0, 4);
    for (const q of scored) {
      const u = q.options.find((o) => o.state === "unsure")!;
      answers[q.id] = u.id;
    }
    const res = getResults(answers);
    expect(res.mode).toBe("unsure");
  });

  it("baselines do not affect the mode", () => {
    // All scored 'doing' -> ahead. Flip baselines to 'todo' — mode must stay 'ahead'.
    const answers = answersFor("doing");
    const baselines = QUESTIONS.filter((q) => q.baseline);
    for (const q of baselines) {
      const t = q.options.find((o) => o.state === "todo")!;
      answers[q.id] = t.id;
    }
    const res = getResults(answers);
    expect(res.mode).toBe("ahead");
  });
});