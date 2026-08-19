"use client";

import { useEffect, useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { subjectTheme } from "@/lib/theme";
import { searchDictionaryWords, searchDictionaryByLetter } from "@/app/actions";

export type DictEntry = {
  id: string;
  type: "word" | "fidel" | "number" | "phrase" | "dictionary";
  am: string;
  en: string;
  emoji?: string;
};

export type DictLetter = { name: string; base: string; chars: string[] };

const TYPE_ICON: Record<DictEntry["type"], string> = {
  word: "📚",
  fidel: "🔤",
  number: "🔢",
  phrase: "💬",
  dictionary: "📖",
};

const PREVIEW_COUNT = 12;
const DEBOUNCE_MS = 250;

type Mode =
  | { kind: "none" }
  | { kind: "amharic"; query: string }
  | { kind: "english"; query: string }
  | { kind: "letter"; letter: DictLetter };

export function DictionarySearch({
  entries,
  letters,
}: {
  entries: DictEntry[];
  letters: DictLetter[];
}) {
  const [amText, setAmText] = useState("");
  const [enText, setEnText] = useState("");
  const [mode, setMode] = useState<Mode>({ kind: "none" });
  const [bigResults, setBigResults] = useState<DictEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = subjectTheme("dialogues");

  function handleAmChange(value: string) {
    setAmText(value);
    setEnText("");
    const next: Mode = value.trim()
      ? { kind: "amharic", query: value.trim() }
      : { kind: "none" };
    if (next.kind !== "none") setLoading(true);
    setMode(next);
  }

  function handleEnChange(value: string) {
    setEnText(value);
    setAmText("");
    const next: Mode = value.trim()
      ? { kind: "english", query: value.trim() }
      : { kind: "none" };
    if (next.kind !== "none") setLoading(true);
    setMode(next);
  }

  function handleLetterClick(letter: DictLetter) {
    setAmText("");
    setEnText("");
    setMode((prev) => {
      const next: Mode =
        prev.kind === "letter" && prev.letter.name === letter.name
          ? { kind: "none" }
          : { kind: "letter", letter };
      if (next.kind !== "none") setLoading(true);
      return next;
    });
  }

  // Debounced fetch against the full 11k+ word dictionary, which lives in
  // the database rather than being shipped to the client all at once.
  useEffect(() => {
    if (mode.kind === "none") return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const words =
        mode.kind === "letter"
          ? await searchDictionaryByLetter(mode.letter.chars)
          : await searchDictionaryWords(
              mode.kind === "amharic" ? mode.query : mode.query,
              mode.kind === "amharic" ? "am" : "en",
            );
      if (cancelled) return;
      setBigResults(
        words.map((w) => ({
          id: w.id,
          type: "dictionary" as const,
          am: w.am,
          en: w.headword,
        })),
      );
      setLoading(false);
    }, DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mode]);

  const curatedResults: DictEntry[] | null = (() => {
    if (mode.kind === "amharic") {
      return entries.filter((e) => e.am.includes(mode.query));
    }
    if (mode.kind === "english") {
      const q = mode.query.toLowerCase();
      return entries.filter((e) => e.en.toLowerCase().includes(q));
    }
    if (mode.kind === "letter") {
      return entries.filter((e) =>
        mode.letter.chars.some((c) => e.am.startsWith(c)),
      );
    }
    return null;
  })();

  const results =
    curatedResults === null ? null : [...curatedResults, ...bigResults];
  const selectedLetterName = mode.kind === "letter" ? mode.letter.name : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bubble-card flex items-center gap-3 border-purple-dark bg-white p-4">
          <span className="text-2xl">🇪🇹</span>
          <input
            value={amText}
            onChange={(e) => handleAmChange(e.target.value)}
            placeholder="Type in Amharic..."
            className="font-ethiopic flex-1 text-xl font-semibold outline-none"
          />
        </div>
        <div className="bubble-card flex items-center gap-3 border-blue-dark bg-white p-4">
          <span className="text-2xl">🇬🇧</span>
          <input
            value={enText}
            onChange={(e) => handleEnChange(e.target.value)}
            placeholder="Type in English..."
            className="flex-1 text-xl font-semibold outline-none"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-extrabold text-foreground/70">
          🔤 Browse by letter
        </h2>
        <div className="flex flex-wrap gap-2">
          {letters.map((letter) => (
            <button
              key={letter.name}
              onClick={() => handleLetterClick(letter)}
              className={`chunky-btn font-ethiopic h-12 w-12 border-2 text-2xl font-bold ${
                selectedLetterName === letter.name
                  ? `${theme.bg} border-teal-dark text-white`
                  : "border-foreground/15 bg-white"
              }`}
            >
              {letter.base}
            </button>
          ))}
        </div>
      </div>

      {mode.kind === "none" && (
        <p className="text-center text-sm font-semibold text-foreground/50">
          Type a word above, or tap a letter — search the full dictionary.
        </p>
      )}
      {loading && (
        <p className="text-center text-sm font-semibold text-foreground/40">
          Searching...
        </p>
      )}
      {results && !loading && results.length === 0 && (
        <p className="text-center font-bold text-foreground/50">
          No matches found.
        </p>
      )}

      {results && results.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((entry) => (
            <ResultCard key={entry.id} entry={entry} theme={theme.border} />
          ))}
        </div>
      )}

      {mode.kind === "none" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {entries.slice(0, PREVIEW_COUNT).map((entry) => (
            <ResultCard key={entry.id} entry={entry} theme={theme.border} />
          ))}
        </div>
      )}
    </div>
  );
}

function ResultCard({ entry, theme }: { entry: DictEntry; theme: string }) {
  return (
    <div className={`bubble-card flex items-center gap-3 bg-white p-3 ${theme}`}>
      <span className="text-xl" title={entry.type}>
        {entry.emoji ?? TYPE_ICON[entry.type]}
      </span>
      <div className="flex-1">
        <p className="font-ethiopic text-xl font-bold">{entry.am}</p>
        <p className="text-sm text-foreground/60">{entry.en}</p>
      </div>
      <SpeakButton text={entry.am} size="sm" />
    </div>
  );
}
