import type { Item } from "@prisma/client";

export type Question = {
  id: string;
  kind: "symbol" | "count" | "numeral" | "emoji";
  prompt: string;
  correct: string;
  options: string[];
  hint?: string;
};

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickOptions(correct: string, pool: string[]): string[] {
  const distractors = shuffle(pool.filter((v) => v !== correct)).slice(0, 3);
  return shuffle([correct, ...distractors]);
}

export function buildQuestions(
  subjectSlug: string,
  lessonSlug: string,
  items: Item[],
): Question[] {
  if (subjectSlug === "fidel") {
    const pool = items.map((i) => i.latin!);
    return shuffle(items).map((item) => ({
      id: item.id,
      kind: "symbol",
      prompt: item.symbol!,
      correct: item.latin!,
      options: pickOptions(item.latin!, pool),
    }));
  }

  if (subjectSlug === "numbers") {
    if (lessonSlug === "tens") {
      const pool = items.map((i) => String(i.value));
      return shuffle(items).map((item) => ({
        id: item.id,
        kind: "numeral",
        prompt: item.numeral!,
        correct: String(item.value),
        options: pickOptions(String(item.value), pool),
      }));
    }
    const pool = items.map((i) => i.numeral!);
    return shuffle(items).map((item) => ({
      id: item.id,
      kind: "count",
      prompt: String(item.value),
      correct: item.numeral!,
      options: pickOptions(item.numeral!, pool),
    }));
  }

  // words
  const pool = items.map((i) => i.wordAm!);
  return shuffle(items).map((item) => ({
    id: item.id,
    kind: "emoji",
    prompt: item.emoji!,
    correct: item.wordAm!,
    options: pickOptions(item.wordAm!, pool),
    hint: item.wordEn ?? undefined,
  }));
}
