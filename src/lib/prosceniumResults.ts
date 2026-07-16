import {
  QUESTIONS,
  PRACTICES,
  BASELINE_COPY,
  type Mode,
  type QuizQuestion,
  type RecommendationCopy,
  type State,
} from "@/data/prosceniumQuizContent";

export interface Recommendation {
  id: string;
  state: Exclude<State, "doing">;
  copy: RecommendationCopy;
  impact: number;
  effort: number;
}

export interface CelebrationItem {
  id: string;
  headline: string;
  body: string;
}

export interface ResultsGroup {
  key: "primary" | "secondary";
  items: Recommendation[];
}

export interface Results {
  mode: Mode;
  groups: ResultsGroup[];
  celebration: CelebrationItem[];
}

function resolveState(q: QuizQuestion, optionId: string | undefined): State | null {
  if (!optionId) return null;
  const opt = q.options.find((o) => o.id === optionId);
  return opt ? opt.state : null;
}

function pickCopy(state: Exclude<State, "doing">, practiceId: string): RecommendationCopy {
  const practice = PRACTICES[practiceId];
  if (state === "started") return practice.copy.started;
  return practice.copy.todo; // "todo" and "unsure"
}

export function getResults(answers: Record<string, string>): Results {
  const scored = QUESTIONS.filter((q) => !q.baseline);
  const baselines = QUESTIONS.filter((q) => q.baseline);

  const scoredStates = scored.map((q) => ({ q, state: resolveState(q, answers[q.id]) }));

  let todo = 0;
  let started = 0;
  let unsure = 0;
  let doing = 0;
  for (const { state } of scoredStates) {
    if (state === "todo") todo++;
    else if (state === "started") started++;
    else if (state === "unsure") unsure++;
    else if (state === "doing") doing++;
  }

  const gaps = todo + started + unsure;
  const scoredCount = scored.length; // 8

  let mode: Mode;
  if (gaps <= 2) mode = "ahead";
  else if (unsure / scoredCount >= 0.4) mode = "unsure";
  else if ((todo + unsure) / scoredCount >= 0.6) mode = "starting";
  else mode = "balanced";

  // Recommendations
  const recs: Recommendation[] = scoredStates
    .filter(({ state }) => state === "todo" || state === "started" || state === "unsure")
    .map(({ q, state }) => {
      const practice = PRACTICES[q.id];
      const s = state as Exclude<State, "doing">;
      return {
        id: q.id,
        state: s,
        copy: pickCopy(s, q.id),
        impact: practice.impact,
        effort: practice.effort,
      };
    });

  if (mode === "starting") {
    recs.sort((a, b) => a.effort - b.effort || b.impact - a.impact);
  } else {
    recs.sort((a, b) => b.impact - a.impact || a.effort - b.effort);
  }

  const cap = mode === "ahead" ? 2 : 4;
  const capped = recs.slice(0, cap);

  let groups: ResultsGroup[];
  if (mode === "starting") {
    groups = [
      { key: "primary", items: capped.slice(0, 2) },
      { key: "secondary", items: capped.slice(2, 4) },
    ].filter((g) => g.items.length > 0) as ResultsGroup[];
  } else {
    groups = [{ key: "primary", items: capped }];
  }

  // Celebration
  const celebration: CelebrationItem[] = [];
  for (const q of baselines) {
    if (resolveState(q, answers[q.id]) === "doing") {
      const c = BASELINE_COPY[q.id];
      if (c) celebration.push({ id: q.id, headline: c.headline, body: c.body });
    }
  }
  for (const q of scored) {
    if (resolveState(q, answers[q.id]) === "doing") {
      const c = PRACTICES[q.id].copy.doing;
      celebration.push({ id: q.id, headline: c.headline, body: c.body.join(" ") });
    }
  }

  return { mode, groups, celebration };
}