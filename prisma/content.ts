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

// Advanced content: short scripted conversations between two recurring
// characters (Sara and Dawit), each followed by comprehension questions.
export type DialogueLineEntry = {
  speaker: string;
  speakerEmoji: string;
  am: string;
  en: string;
};

export type DialogueQuestionEntry = {
  prompt: string;
  correct: string;
  options: string[];
};

export type DialogueLesson = {
  slug: string;
  title: string;
  titleAm: string;
  lines: DialogueLineEntry[];
  questions: DialogueQuestionEntry[];
};

const SARA = { speaker: "Sara", speakerEmoji: "👧" };
const DAWIT = { speaker: "Dawit", speakerEmoji: "👦" };

export const DIALOGUE_LESSONS: DialogueLesson[] = [
  {
    slug: "family",
    title: "Family",
    titleAm: "ቤተሰብ",
    lines: [
      { ...SARA, am: "ሰላም! ስሜ ሳራ ነው።", en: "Hi! My name is Sara." },
      { ...DAWIT, am: "ሰላም ሳራ! ስሜ ዳዊት ነው።", en: "Hi Sara! My name is Dawit." },
      { ...SARA, am: "ቤተሰብህ ስንት ናቸው?", en: "How many are in your family?" },
      {
        ...DAWIT,
        am: "ቤተሰቤ አምስት ናቸው፡ አባቴ፣ እናቴ፣ ወንድሜ፣ እህቴ እና እኔ።",
        en: "My family is five: my father, my mother, my brother, my sister, and me.",
      },
      {
        ...DAWIT,
        am: "አንቺስ? ቤተሰብሽ ስንት ናቸው?",
        en: "And you? How many are in your family?",
      },
      {
        ...SARA,
        am: "ቤተሰቤ አራት ናቸው፡ አባቴ፣ እናቴ፣ ወንድሜ እና እኔ።",
        en: "My family is four: my father, my mother, my brother, and me.",
      },
      { ...SARA, am: "እኔ የመጀመሪያ ልጅ ነኝ።", en: "I am the first child." },
      { ...DAWIT, am: "እኔም እንዲሁ! ደስ ይላል።", en: "Me too! Nice." },
    ],
    questions: [
      {
        prompt: "የዳዊት ቤተሰብ ስንት ናቸው?",
        correct: "5",
        options: ["5", "4", "3", "6"],
      },
      {
        prompt: "የሳራ ቤተሰብ ስንት ናቸው?",
        correct: "4",
        options: ["5", "4", "3", "2"],
      },
      {
        prompt: "ማን የመጀመሪያ ልጅ ነው?",
        correct: "ሁለቱም",
        options: ["ሳራ", "ዳዊት", "ሁለቱም", "ማንም"],
      },
      {
        prompt: "የሳራ ጓደኛ ስም ማን ይባላል?",
        correct: "ዳዊት",
        options: ["ዳዊት", "ሮቤል", "ዮሴፍ", "አበበ"],
      },
    ],
  },
  {
    slug: "education",
    title: "Education",
    titleAm: "ትምህርት",
    lines: [
      { ...SARA, am: "ትምህርት ቤት ትወዳለህ?", en: "Do you like school?" },
      { ...DAWIT, am: "አዎ በጣም እወዳለሁ! አንቺስ?", en: "Yes, I like it a lot! And you?" },
      {
        ...SARA,
        am: "እኔም እወዳለሁ። የትኛውን ትምህርት ትወዳለህ?",
        en: "I like it too. Which subject do you like?",
      },
      {
        ...DAWIT,
        am: "ሂሳብ እወዳለሁ። አንቺስ የትኛውን ትወዳለሽ?",
        en: "I like math. And you, which one do you like?",
      },
      {
        ...SARA,
        am: "እኔ አማርኛ እወዳለሁ። መምህራችን ጥሩ ናቸው።",
        en: "I like Amharic. Our teacher is good.",
      },
      {
        ...DAWIT,
        am: "አዎ በጣም ጥሩ ናቸው! ወደ ትምህርት ቤት አብረን እንሂድ?",
        en: "Yes, very good! Shall we go to school together?",
      },
      {
        ...SARA,
        am: "እሺ! ደብተሬን እና እስክርቢቶዬን ያዝኩ።",
        en: "Okay! I have my notebook and pen.",
      },
      { ...DAWIT, am: "እኔም ደብተሬን ያዝኩ። እንሂድ!", en: "I have my notebook too. Let's go!" },
    ],
    questions: [
      {
        prompt: "ማን ትምህርት ቤት ይወዳል?",
        correct: "ሁለቱም",
        options: ["ሳራ", "ዳዊት", "ሁለቱም", "ማንም"],
      },
      {
        prompt: "ዳዊት የትኛውን ትምህርት ይወዳል?",
        correct: "ሂሳብ",
        options: ["ሂሳብ", "አማርኛ", "ሳይንስ", "እንግሊዝኛ"],
      },
      {
        prompt: "ሳራ የትኛውን ትምህርት ትወዳለች?",
        correct: "አማርኛ",
        options: ["አማርኛ", "ሂሳብ", "ስፖርት", "ሙዚቃ"],
      },
      {
        prompt: "መምህራቸው እንዴት ናቸው?",
        correct: "ጥሩ",
        options: ["ጥሩ", "መጥፎ", "ትንሽ", "አዲስ"],
      },
    ],
  },
  {
    slug: "time",
    title: "Time & Calendar",
    titleAm: "ጊዜ እና ቀን መቁጠሪያ",
    lines: [
      { ...SARA, am: "ዛሬ ስንተኛው ቀን ነው?", en: "What day is it today?" },
      {
        ...DAWIT,
        am: "ዛሬ ሰኞ ነው። ትምህርት ቤት የመጀመሪያ ቀን ነው።",
        en: "Today is Monday. It's the first day of school.",
      },
      { ...SARA, am: "የሳምንቱ ቀናት ስንት ናቸው?", en: "How many days are in the week?" },
      {
        ...DAWIT,
        am: "ሰባት ናቸው፡ ሰኞ፣ ማክሰኞ፣ ረቡዕ፣ ሐሙስ፣ ዓርብ፣ ቅዳሜ እና እሁድ።",
        en: "There are seven: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday.",
      },
      {
        ...SARA,
        am: "ቅዳሜ እና እሁድ የእረፍት ቀናት ናቸው፣ አይደል?",
        en: "Saturday and Sunday are rest days, right?",
      },
      { ...DAWIT, am: "አዎ፣ ልክ ነሽ!", en: "Yes, you're right!" },
      { ...SARA, am: "አሁን የትኛው ወር ነው?", en: "What month is it now?" },
      {
        ...DAWIT,
        am: "መስከረም ነው፣ የመጀመሪያው ወር።",
        en: "It's Meskerem, the first month.",
      },
      {
        ...SARA,
        am: "የኢትዮጵያ አቆጣጠር ስንት ወራት አሉት?",
        en: "How many months does the Ethiopian calendar have?",
      },
      {
        ...DAWIT,
        am: "አስራ ሦስት ወራት አሉት! አስራ ሁለቱ ወራት እያንዳንዳቸው ሠላሳ ቀናት አሏቸው፣ ጳጉሜ ግን አምስት ወይም ስድስት ቀናት ብቻ አላት።",
        en: "It has thirteen months! The twelve months each have thirty days, but Pagume has only five or six days.",
      },
      {
        ...SARA,
        am: "እንዴት ያለ ደስ የሚል አቆጣጠር ነው! ዓመቱስ ስንት ነው?",
        en: "What a nice calendar! What year is it?",
      },
      { ...DAWIT, am: "ሁለት ሺህ አስራ ስምንት ነው።", en: "It's 2018." },
      {
        ...SARA,
        am: "አዲስ ዓመት መቼ ነው የሚከበረው?",
        en: "When is the new year celebrated?",
      },
      {
        ...DAWIT,
        am: "መስከረም አንድ ቀን! እንቁጣጣሽ እንለዋለን።",
        en: "On the first day of Meskerem! We call it Enkutatash.",
      },
      { ...SARA, am: "ደስ ይላል! እኔ እንቁጣጣሽ በጣም እወዳለሁ።", en: "Nice! I love Enkutatash a lot." },
      {
        ...DAWIT,
        am: "እኔም እንዲሁ! አበባ እንለቅማለን እና እንዘፍናለን።",
        en: "Me too! We pick flowers and sing.",
      },
    ],
    questions: [
      {
        prompt: "የሳምንቱ ቀናት ስንት ናቸው?",
        correct: "7",
        options: ["7", "5", "6", "10"],
      },
      {
        prompt: "የመጀመሪያው ወር ስም ማን ይባላል?",
        correct: "መስከረም",
        options: ["መስከረም", "ጥቅምት", "ጳጉሜ", "ሰኔ"],
      },
      {
        prompt: "የኢትዮጵያ አቆጣጠር ስንት ወራት አሉት?",
        correct: "13",
        options: ["12", "13", "10", "7"],
      },
      {
        prompt: "አስራ ሁለቱ ወራት እያንዳንዳቸው ስንት ቀናት አሏቸው?",
        correct: "30",
        options: ["30", "31", "28", "25"],
      },
      {
        prompt: "እንቁጣጣሽ የሚከበረው መቼ ነው?",
        correct: "መስከረም አንድ",
        options: ["መስከረም አንድ", "ጥር አንድ", "ጳጉሜ አንድ", "ሰኔ አንድ"],
      },
      {
        prompt: "ቅዳሜ እና እሁድ ምን ዓይነት ቀናት ናቸው?",
        correct: "የእረፍት ቀናት",
        options: ["የእረፍት ቀናት", "የትምህርት ቀናት", "የስራ ቀናት", "በዓል ቀናት"],
      },
      {
        prompt: "በንግግሩ ውስጥ ዛሬ ስንተኛው ቀን ነው?",
        correct: "ሰኞ",
        options: ["ሰኞ", "ማክሰኞ", "ዓርብ", "እሁድ"],
      },
    ],
  },
  {
    slug: "greetings",
    title: "Greetings",
    titleAm: "ሰላምታ",
    lines: [
      {
        ...DAWIT,
        am: "እንደምን አደርሽ ሳራ? ጥዋት ነው።",
        en: "Good morning Sara! It's morning.",
      },
      {
        ...SARA,
        am: "ደህና አድሬያለሁ፣ አመሰግናለሁ! አንተስ እንደምን አደርክ?",
        en: "I spent the night well, thank you! And you?",
      },
      {
        ...DAWIT,
        am: 'እኔም ደህና አድሬያለሁ። ጥዋት ላይ "እንደምን አደርክ" ወይም "እንደምን አደርሽ" እንላለን።',
        en: 'I also spent the night well. In the morning we say "endemin aderk" (to a boy) or "endemin adersh" (to a girl).',
      },
      {
        ...SARA,
        am: "ገባኝ! ታዲያ ከሰዓት በኋላ ምን እንላለን?",
        en: "I understand! So what do we say in the afternoon?",
      },
      {
        ...DAWIT,
        am: 'ከሰዓት በኋላ "እንደምን ዋልክ" ወይም "እንደምን ዋልሽ" እንላለን። ትርጉሙ "ቀኑን እንዴት አሳለፍክ" ማለት ነው።',
        en: 'In the afternoon we say "endemin walk" or "endemin walsh". It means "how did you spend the day".',
      },
      { ...SARA, am: "እሺ፣ ማታ ስንገናኝስ?", en: "Okay, and when we meet in the evening?" },
      {
        ...DAWIT,
        am: 'ማታ "እንደምን አመሸህ" ወይም "እንደምን አመሽሽ" እንላለን።',
        en: 'In the evening we say "endemin ameshh" or "endemin ameshsh".',
      },
      {
        ...SARA,
        am: "ከመተኛታችን በፊት ደግሞ ምን እንላለን?",
        en: "And before we sleep, what do we say?",
      },
      {
        ...DAWIT,
        am: '"ደህና እደር" ወይም "ደህና እደሪ" እንላለን፣ ትርጉሙም "መልካም ሌሊት" ማለት ነው።',
        en: 'We say "dehna eder" or "dehna ederi", meaning "good night".',
      },
      {
        ...SARA,
        am: "ስንት ያምራል! ስንለያይስ ምን እንላለን?",
        en: "How nice! And when we part ways, what do we say?",
      },
      {
        ...DAWIT,
        am: '"ደህና ሁን" ወይም "ደህና ሁኚ" እንላለን፣ ማለትም "ደህና ሁን" ማለት ነው።',
        en: 'We say "dehna hun" or "dehna hugni", meaning "stay well".',
      },
      {
        ...SARA,
        am: "አመሰግናለሁ ዳዊት! ብዙ ተምሬያለሁ ዛሬ።",
        en: "Thank you Dawit! I learned a lot today.",
      },
      {
        ...DAWIT,
        am: "እኔም ደስ ብሎኛል! ደህና ሁኚ ሳራ፣ ነገ እንገናኝ።",
        en: "I'm happy too! Goodbye Sara, see you tomorrow.",
      },
      { ...SARA, am: "ደህና ሁን ዳዊት! ነገ እንገናኝ።", en: "Goodbye Dawit! See you tomorrow." },
    ],
    questions: [
      {
        prompt: "ጥዋት ላይ ምን እንላለን?",
        correct: "እንደምን አደርክ",
        options: ["እንደምን አደርክ", "እንደምን ዋልክ", "እንደምን አመሸህ", "ደህና ሁን"],
      },
      {
        prompt: "ከሰዓት በኋላ ምን እንላለን?",
        correct: "እንደምን ዋልክ",
        options: ["እንደምን ዋልክ", "እንደምን አደርክ", "ደህና እደር", "ደህና ሁን"],
      },
      {
        prompt: "ማታ ላይ ምን እንላለን?",
        correct: "እንደምን አመሸህ",
        options: ["እንደምን አመሸህ", "እንደምን አደርክ", "እንደምን ዋልክ", "ደህና ሁን"],
      },
      {
        prompt: "ከመተኛታችን በፊት ምን እንላለን?",
        correct: "ደህና እደር",
        options: ["ደህና እደር", "እንደምን ዋልክ", "እንደምን አደርክ", "ታዲያስ"],
      },
      {
        prompt: "ስንለያይ ምን እንላለን?",
        correct: "ደህና ሁን",
        options: ["ደህና ሁን", "ደህና እደር", "እንደምን አደርክ", "እንደምን ዋልክ"],
      },
      {
        prompt: "ሳራ ምን ተምራለች ዛሬ?",
        correct: "ሰላምታዎችን",
        options: ["ሰላምታዎችን", "ቁጥሮችን", "ወራትን", "እንስሳትን"],
      },
      {
        prompt: "ማን ለሳራ ሰላምታ አስተማራት?",
        correct: "ዳዊት",
        options: ["ዳዊት", "እናቷ", "አባቷ", "መምህር"],
      },
    ],
  },
];
