"use client";

import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { subjectTheme } from "@/lib/theme";

export type DictEntry = {
  id: string;
  type: "word" | "fidel" | "number" | "phrase";
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
};

const PREVIEW_COUNT = 12;

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
  const theme = subjectTheme("dialogues");

  function handleAmChange(value: string) {
    setAmText(value);
    setEnText("");
    setMode(value.trim() ? { kind: "amharic", query: value.trim() } : { kind: "none" });
  }

  function handleEnChange(value: string) {
    setEnText(value);
    setAmText("");
    setMode(value.trim() ? { kind: "english", query: value.trim() } : { kind: "none" });
  }

  function handleLetterClick(letter: DictLetter) {
    setAmText("");
    setEnText("");
    setMode((prev) =>
      prev.kind === "letter" && prev.letter.name === letter.name
        ? { kind: "none" }
        : { kind: "letter", letter },
    );
  }

  const results = useMemo(() => {
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
  }, [entries, mode]);

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
          Type a word above, or tap a letter — {entries.length} entries in
          total.
        </p>
      )}
      {results && results.length === 0 && (
        <p className="text-center font-bold text-foreground/50">
          No matches yet — that word isn&apos;t in our lessons.
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
