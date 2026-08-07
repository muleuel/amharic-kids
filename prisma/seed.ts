import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import {
  FIDEL_FAMILIES,
  NUMBERS_ONES,
  NUMBERS_TENS,
  WORD_CATEGORIES,
  DIALOGUE_LESSONS,
  fidelLatin,
} from "./content";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Wipe existing content so the seed is safely re-runnable.
  await prisma.kidBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.item.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.subject.deleteMany();

  const fidel = await prisma.subject.create({
    data: {
      slug: "fidel",
      name: "Alphabet",
      nameAm: "ፊደል",
      icon: "🔤",
      color: "purple",
      order: 1,
    },
  });

  const numbers = await prisma.subject.create({
    data: {
      slug: "numbers",
      name: "Numbers",
      nameAm: "ቁጥሮች",
      icon: "🔢",
      color: "blue",
      order: 2,
    },
  });

  const words = await prisma.subject.create({
    data: {
      slug: "words",
      name: "Words",
      nameAm: "ቃላት",
      icon: "📚",
      color: "orange",
      order: 3,
    },
  });

  const dialogues = await prisma.subject.create({
    data: {
      slug: "dialogues",
      name: "Conversations",
      nameAm: "ንግግሮች",
      icon: "💬",
      color: "teal",
      order: 4,
    },
  });

  // --- Fidel: one lesson per consonant family, 7 orders each ---
  for (const [i, family] of FIDEL_FAMILIES.entries()) {
    const lesson = await prisma.lesson.create({
      data: {
        subjectId: fidel.id,
        slug: `family-${i + 1}`,
        title: family.name,
        titleAm: family.chars[5],
        order: i + 1,
      },
    });
    await prisma.item.createMany({
      data: family.chars.map((symbol, orderIndex) => ({
        lessonId: lesson.id,
        order: orderIndex + 1,
        symbol,
        latin: fidelLatin(family, orderIndex),
        family: family.name,
      })),
    });
  }

  // --- Numbers: counting 1-10, then tens up to 100 ---
  const countingLesson = await prisma.lesson.create({
    data: {
      subjectId: numbers.id,
      slug: "counting",
      title: "Counting 1-10",
      titleAm: "ከ፩ እስከ ፲",
      order: 1,
    },
  });
  await prisma.item.createMany({
    data: NUMBERS_ONES.map((n, i) => ({
      lessonId: countingLesson.id,
      order: i + 1,
      numeral: n.numeral,
      value: n.value,
    })),
  });

  const tensLesson = await prisma.lesson.create({
    data: {
      subjectId: numbers.id,
      slug: "tens",
      title: "Tens to a Hundred",
      titleAm: "ከ፳ እስከ ፻",
      order: 2,
    },
  });
  await prisma.item.createMany({
    data: NUMBERS_TENS.map((n, i) => ({
      lessonId: tensLesson.id,
      order: i + 1,
      numeral: n.numeral,
      value: n.value,
    })),
  });

  // --- Words: one lesson per vocabulary category ---
  for (const [i, category] of WORD_CATEGORIES.entries()) {
    const lesson = await prisma.lesson.create({
      data: {
        subjectId: words.id,
        slug: category.slug,
        title: category.title,
        titleAm: category.titleAm,
        order: i + 1,
      },
    });
    await prisma.item.createMany({
      data: category.words.map((w, j) => ({
        lessonId: lesson.id,
        order: j + 1,
        wordAm: w.am,
        wordEn: w.en,
        emoji: w.emoji,
        category: category.slug,
      })),
    });
  }

  // --- Conversations: scripted dialogues with comprehension questions ---
  for (const [i, dialogue] of DIALOGUE_LESSONS.entries()) {
    const lesson = await prisma.lesson.create({
      data: {
        subjectId: dialogues.id,
        slug: dialogue.slug,
        title: dialogue.title,
        titleAm: dialogue.titleAm,
        order: i + 1,
        kind: "DIALOGUE",
      },
    });
    await prisma.dialogueLine.createMany({
      data: dialogue.lines.map((line, j) => ({
        lessonId: lesson.id,
        order: j + 1,
        speaker: line.speaker,
        speakerEmoji: line.speakerEmoji,
        am: line.am,
        en: line.en,
      })),
    });
    await prisma.dialogueQuestion.createMany({
      data: dialogue.questions.map((q, j) => ({
        lessonId: lesson.id,
        order: j + 1,
        prompt: q.prompt,
        correct: q.correct,
        options: q.options,
      })),
    });
  }

  // --- Badges ---
  await prisma.badge.createMany({
    data: [
      {
        slug: "first-steps",
        name: "First Steps",
        nameAm: "የመጀመሪያ እርምጃ",
        icon: "👣",
        description: "Complete your very first lesson.",
      },
      {
        slug: "fidel-explorer",
        name: "Fidel Explorer",
        nameAm: "የፊደል አሳሽ",
        icon: "🧭",
        description: "Complete your first Fidel lesson.",
      },
      {
        slug: "fidel-master",
        name: "Fidel Master",
        nameAm: "የፊደል ጌታ",
        icon: "🏆",
        description: "Complete every Fidel lesson.",
      },
      {
        slug: "number-ninja",
        name: "Number Ninja",
        nameAm: "የቁጥር ጀግና",
        icon: "🥷",
        description: "Complete every Numbers lesson.",
      },
      {
        slug: "word-wizard",
        name: "Word Wizard",
        nameAm: "የቃላት ጠንቋይ",
        icon: "🪄",
        description: "Complete every Words lesson.",
      },
      {
        slug: "conversation-champ",
        name: "Conversation Champ",
        nameAm: "የንግግር ባለሙያ",
        icon: "💬",
        description: "Complete every Conversations lesson.",
      },
      {
        slug: "perfectionist",
        name: "Perfectionist",
        nameAm: "ፍጹም",
        icon: "💯",
        description: "Earn 3 stars on 10 different lessons.",
      },
      {
        slug: "superstar",
        name: "Superstar",
        nameAm: "ኮከብ",
        icon: "🌟",
        description: "Earn 50 stars in total.",
      },
    ],
  });

  const lessonCount = await prisma.lesson.count();
  const itemCount = await prisma.item.count();
  const dialogueLineCount = await prisma.dialogueLine.count();
  console.log(
    `Seeded ${lessonCount} lessons, ${itemCount} items, and ${dialogueLineCount} dialogue lines across 4 subjects.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
