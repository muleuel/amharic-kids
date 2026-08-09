import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActiveKid } from "@/lib/kid-session";
import { DictionarySearch, type DictEntry } from "@/components/DictionarySearch";
import { FIDEL_FAMILIES, DICTIONARY_ALPHABET_ORDER } from "../../../prisma/content";

export default async function DictionaryPage() {
  const kid = await getActiveKid();
  if (!kid) redirect("/");

  const [words, fidel, numbers, lines] = await Promise.all([
    prisma.item.findMany({ where: { wordAm: { not: null } } }),
    prisma.item.findMany({ where: { symbol: { not: null } } }),
    prisma.item.findMany({ where: { numeral: { not: null } } }),
    prisma.dialogueLine.findMany(),
  ]);

  const seenPhrases = new Set<string>();
  const phrases = lines.filter((line) => {
    if (seenPhrases.has(line.am)) return false;
    seenPhrases.add(line.am);
    return true;
  });

  const entries: DictEntry[] = [
    ...words.map((w) => ({
      id: w.id,
      type: "word" as const,
      am: w.wordAm!,
      en: w.wordEn!,
      emoji: w.emoji ?? undefined,
    })),
    ...fidel.map((f) => ({
      id: f.id,
      type: "fidel" as const,
      am: f.symbol!,
      en: f.latin!,
    })),
    ...numbers.map((n) => ({
      id: n.id,
      type: "number" as const,
      am: n.numeral!,
      en: String(n.value),
    })),
    ...phrases.map((p) => ({
      id: p.id,
      type: "phrase" as const,
      am: p.am,
      en: p.en,
    })),
  ];

  const familyByName = new Map(FIDEL_FAMILIES.map((f) => [f.name, f]));
  const letters = DICTIONARY_ALPHABET_ORDER.map((name) => {
    const family = familyByName.get(name)!;
    return { name, base: family.chars[0], chars: family.chars };
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="chunky-btn border-2 border-foreground/20 bg-white px-4 py-2 text-foreground/60"
        >
          ← Home
        </Link>
        <h1 className="text-3xl font-extrabold">📖 Dictionary & Translate</h1>
      </div>
      <p className="text-foreground/60">
        Look up any word we&apos;ve taught so far, in Amharic or English.
      </p>
      <DictionarySearch entries={entries} letters={letters} />
    </div>
  );
}
