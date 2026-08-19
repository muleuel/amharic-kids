import { FIDEL_FAMILIES } from "../../prisma/content";

// Phonetic (SERA-style) Latin -> Ge'ez transliteration, e.g. "selam" -> "ሰላም".
// Consonant tokens are matched case-insensitively; doubling a letter selects
// the ejective/alternate member of a sound family so that ordinary
// capitalization (e.g. typing "Selam" at the start of a sentence) can never
// silently produce the wrong letter.
//
// Vowel suffixes select which of the 7 syllabic orders to use:
//   e -> 1st (ä)   u -> 2nd   i -> 3rd   a -> 4th
//   E -> 5th (é)   (none) -> 6th (ɨ)   o -> 7th

const CONSONANT_TOKENS: [string, string][] = [
  ["chh", "Cche"],
  ["sh", "She"],
  ["ny", "Nye"],
  ["kh", "Khe"],
  ["zh", "Zhe"],
  ["ch", "Che"],
  ["ts", "Tse"],
  ["hh", "Hha"],
  ["tt", "Tte"],
  ["pp", "Ppe"],
  ["ss", "Sse"],
  ["h", "Ha"],
  ["l", "Le"],
  ["m", "Me"],
  ["s", "Se"],
  ["r", "Re"],
  ["q", "Qe"],
  ["b", "Be"],
  ["v", "Ve"],
  ["t", "Te"],
  ["n", "Ne"],
  ["k", "Ke"],
  ["w", "We"],
  ["z", "Ze"],
  ["y", "Ye"],
  ["d", "De"],
  ["j", "Je"],
  ["g", "Ge"],
  ["p", "Pe"],
  ["f", "Fe"],
  ["x", "Xa"],
];
CONSONANT_TOKENS.sort((a, b) => b[0].length - a[0].length);

const VOWEL_TOKENS: [string, number][] = [
  ["e", 0],
  ["u", 1],
  ["i", 2],
  ["a", 3],
  ["E", 4],
  ["o", 6],
];

// Vowel-initial (glottal) syllables don't follow the consonant+vowel pattern
// above: the 6th-order glyph (እ) is extremely common as a word-starter
// (እናት, እግር, እንቁላል...) and is what a typist means by plain "i", not the
// 3rd-order ኢ. "a" means the base ግዕዝ letter አ, not the 4th-order ኣ, which
// needs the doubled "aa" instead.
const GLOTTAL_VOWEL_TOKENS: [string, number][] = [
  ["aa", 3],
  ["ii", 2],
  ["a", 0],
  ["u", 1],
  ["i", 5],
  ["E", 4],
  ["e", 4],
  ["o", 6],
];
GLOTTAL_VOWEL_TOKENS.sort((a, b) => b[0].length - a[0].length);

const FAMILY_BY_NAME = new Map(FIDEL_FAMILIES.map((f) => [f.name, f]));
const GLOTTAL_FAMILY = FAMILY_BY_NAME.get("A")!;

export type PhoneticSegment = { latin: string; amharic: string };

// Greedy left-to-right parse. Unrecognized characters (already-typed Amharic
// Unicode, digits, punctuation, spaces) pass through untouched, so native
// Amharic keyboard/IME input and pasted text work correctly alongside
// phonetic Latin typing.
export function transliterateSegments(input: string): PhoneticSegment[] {
  const lower = input.toLowerCase();
  const segments: PhoneticSegment[] = [];
  let i = 0;

  while (i < lower.length) {
    const consonant = CONSONANT_TOKENS.find(([token]) =>
      lower.startsWith(token, i),
    );

    if (consonant) {
      const [token, familyName] = consonant;
      const family = FAMILY_BY_NAME.get(familyName)!;
      let consumed = token.length;
      let orderIndex = 5; // bare consonant -> 6th order

      const rest = input.slice(i + consumed);
      const vowel = VOWEL_TOKENS.find(([v]) => rest.startsWith(v));
      if (vowel) {
        orderIndex = vowel[1];
        consumed += vowel[0].length;
      }

      segments.push({
        latin: input.slice(i, i + consumed),
        amharic: family.chars[orderIndex],
      });
      i += consumed;
      continue;
    }

    const rest = input.slice(i);
    const glottal = GLOTTAL_VOWEL_TOKENS.find(([v]) => rest.startsWith(v));
    if (glottal) {
      segments.push({
        latin: input.slice(i, i + glottal[0].length),
        amharic: GLOTTAL_FAMILY.chars[glottal[1]],
      });
      i += glottal[0].length;
      continue;
    }

    segments.push({ latin: input[i], amharic: input[i] });
    i += 1;
  }

  return segments;
}

export function phoneticToGeez(input: string): string {
  return transliterateSegments(input)
    .map((s) => s.amharic)
    .join("");
}
