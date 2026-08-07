// Source data for the seed script. Kept separate from seed.ts so the raw
// content (which is large) is easy to scan and extend on its own.

export type FidelFamily = {
  /** Common family name shown in lesson titles, e.g. "Ha" */
  name: string;
  /** Simplified Latin consonant used to build transliterations */
  consonant: string;
  /** The 7 orders (Ge'ez, Kaib, Salis, Rabi, Hamis, Sadis, Sabi) */
  chars: [string, string, string, string, string, string, string];
  /** Special-case transliterations for glottal families where the "consonant" is silent */
  vowelsOnly?: boolean;
};

// The traditional 33-family Amharic Fidel chart. Each row is one consonant
// across its 7 vocalic orders. This is the standard chart taught in
// Ethiopian primary schools.
export const FIDEL_FAMILIES: FidelFamily[] = [
  { name: "Ha", consonant: "h", chars: ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"] },
  { name: "Le", consonant: "l", chars: ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"] },
  { name: "Hha", consonant: "h", chars: ["ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ"] },
  { name: "Me", consonant: "m", chars: ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"] },
  { name: "Sse", consonant: "s", chars: ["ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ"] },
  { name: "Re", consonant: "r", chars: ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"] },
  { name: "Se", consonant: "s", chars: ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"] },
  { name: "She", consonant: "sh", chars: ["ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ"] },
  { name: "Qe", consonant: "q", chars: ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ"] },
  { name: "Be", consonant: "b", chars: ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"] },
  { name: "Ve", consonant: "v", chars: ["ቨ", "ቩ", "ቪ", "ቫ", "ቬ", "ቭ", "ቮ"] },
  { name: "Te", consonant: "t", chars: ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"] },
  { name: "Che", consonant: "ch", chars: ["ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ"] },
  { name: "Ne", consonant: "n", chars: ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"] },
  { name: "Nye", consonant: "ny", chars: ["ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ"] },
  {
    name: "A",
    consonant: "",
    chars: ["አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ"],
    vowelsOnly: true,
  },
  { name: "Ke", consonant: "k", chars: ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ"] },
  { name: "Khe", consonant: "kh", chars: ["ኸ", "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ"] },
  { name: "We", consonant: "w", chars: ["ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ"] },
  { name: "Ze", consonant: "z", chars: ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ"] },
  { name: "Zhe", consonant: "zh", chars: ["ዠ", "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ"] },
  { name: "Ye", consonant: "y", chars: ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"] },
  { name: "De", consonant: "d", chars: ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ"] },
  { name: "Je", consonant: "j", chars: ["ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ"] },
  { name: "Ge", consonant: "g", chars: ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ"] },
  { name: "Tte", consonant: "t", chars: ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ"] },
  { name: "Cche", consonant: "ch", chars: ["ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ"] },
  { name: "Ppe", consonant: "p", chars: ["ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ"] },
  { name: "Tse", consonant: "ts", chars: ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ"] },
  { name: "Tse2", consonant: "ts", chars: ["ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ"] },
  { name: "Fe", consonant: "f", chars: ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ"] },
  { name: "Pe", consonant: "p", chars: ["ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ"] },
];

const ORDER_VOWELS = ["a", "u", "i", "aa", "e", "", "o"];
const GLOTTAL_VOWELS = ["a", "u", "i", "aa", "e", "i", "o"];

export function fidelLatin(family: FidelFamily, orderIndex: number): string {
  if (family.vowelsOnly) return GLOTTAL_VOWELS[orderIndex];
  const vowel = ORDER_VOWELS[orderIndex];
  return vowel ? `${family.consonant}${vowel}` : family.consonant;
}

export type NumberEntry = { numeral: string; value: number };

export const NUMBERS_ONES: NumberEntry[] = [
  { numeral: "፩", value: 1 },
  { numeral: "፪", value: 2 },
  { numeral: "፫", value: 3 },
  { numeral: "፬", value: 4 },
  { numeral: "፭", value: 5 },
  { numeral: "፮", value: 6 },
  { numeral: "፯", value: 7 },
  { numeral: "፰", value: 8 },
  { numeral: "፱", value: 9 },
  { numeral: "፲", value: 10 },
];

export const NUMBERS_TENS: NumberEntry[] = [
  { numeral: "፳", value: 20 },
  { numeral: "፴", value: 30 },
  { numeral: "፵", value: 40 },
  { numeral: "፶", value: 50 },
  { numeral: "፷", value: 60 },
  { numeral: "፸", value: 70 },
  { numeral: "፹", value: 80 },
  { numeral: "፺", value: 90 },
  { numeral: "፻", value: 100 },
];

export type WordEntry = { am: string; en: string; emoji: string };
export type WordCategory = { slug: string; title: string; titleAm: string; words: WordEntry[] };

export const WORD_CATEGORIES: WordCategory[] = [
  {
    slug: "animals",
    title: "Animals",
    titleAm: "እንስሳት",
    words: [
      { am: "ውሻ", en: "dog", emoji: "🐶" },
      { am: "ድመት", en: "cat", emoji: "🐱" },
      { am: "አንበሳ", en: "lion", emoji: "🦁" },
      { am: "ዝሆን", en: "elephant", emoji: "🐘" },
      { am: "ላም", en: "cow", emoji: "🐄" },
      { am: "ፈረስ", en: "horse", emoji: "🐴" },
      { am: "ዶሮ", en: "chicken", emoji: "🐔" },
      { am: "አሳ", en: "fish", emoji: "🐟" },
    ],
  },
  {
    slug: "colors",
    title: "Colors",
    titleAm: "ቀለማት",
    words: [
      { am: "ቀይ", en: "red", emoji: "🔴" },
      { am: "ሰማያዊ", en: "blue", emoji: "🔵" },
      { am: "ቢጫ", en: "yellow", emoji: "🟡" },
      { am: "አረንጓዴ", en: "green", emoji: "🟢" },
      { am: "ጥቁር", en: "black", emoji: "⚫" },
      { am: "ነጭ", en: "white", emoji: "⚪" },
      { am: "ብርቱካናማ", en: "orange", emoji: "🟠" },
      { am: "ሮዝ", en: "pink", emoji: "💗" },
    ],
  },
  {
    slug: "family",
    title: "Family",
    titleAm: "ቤተሰብ",
    words: [
      { am: "እናት", en: "mother", emoji: "👩" },
      { am: "አባት", en: "father", emoji: "👨" },
      { am: "እህት", en: "sister", emoji: "👧" },
      { am: "ወንድም", en: "brother", emoji: "👦" },
      { am: "አያት", en: "grandparent", emoji: "👴" },
      { am: "ልጅ", en: "child", emoji: "🧒" },
      { am: "ቤተሰብ", en: "family", emoji: "👪" },
      { am: "ሕፃን", en: "baby", emoji: "👶" },
    ],
  },
  {
    slug: "food",
    title: "Food",
    titleAm: "ምግብ",
    words: [
      { am: "ዳቦ", en: "bread", emoji: "🍞" },
      { am: "ውሃ", en: "water", emoji: "💧" },
      { am: "ወተት", en: "milk", emoji: "🥛" },
      { am: "ሙዝ", en: "banana", emoji: "🍌" },
      { am: "ፖም", en: "apple", emoji: "🍎" },
      { am: "እንቁላል", en: "egg", emoji: "🥚" },
      { am: "ማር", en: "honey", emoji: "🍯" },
      { am: "ብርቱካን", en: "orange", emoji: "🍊" },
    ],
  },
  {
    slug: "body",
    title: "Body",
    titleAm: "የሰውነት ክፍል",
    words: [
      { am: "ራስ", en: "head", emoji: "🗣️" },
      { am: "አይን", en: "eye", emoji: "👁️" },
      { am: "አፍ", en: "mouth", emoji: "👄" },
      { am: "እጅ", en: "hand", emoji: "✋" },
      { am: "እግር", en: "foot", emoji: "🦶" },
      { am: "ጆሮ", en: "ear", emoji: "👂" },
      { am: "አፍንጫ", en: "nose", emoji: "👃" },
      { am: "ጸጉር", en: "hair", emoji: "💇" },
    ],
  },
];
