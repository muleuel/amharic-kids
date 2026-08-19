"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActiveKid, setActiveKid, clearActiveKid } from "@/lib/kid-session";
import { evaluateBadges, starsForScore } from "@/lib/rewards";

export async function createKid(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const avatar = String(formData.get("avatar") ?? "🦁");
  if (!name) return;

  const kid = await prisma.kid.create({ data: { name, avatar } });
  await setActiveKid(kid.id);
  revalidatePath("/");
  redirect("/");
}

export async function selectKid(kidId: string) {
  await setActiveKid(kidId);
  revalidatePath("/");
  redirect("/");
}

export async function switchProfile() {
  await clearActiveKid();
  revalidatePath("/");
  redirect("/");
}

export async function submitLessonResult(
  lessonId: string,
  correct: number,
  total: number,
) {
  const kid = await getActiveKid();
  if (!kid) throw new Error("No active kid profile");

  const stars = starsForScore(correct, total);

  const existing = await prisma.progress.findUnique({
    where: { kidId_lessonId: { kidId: kid.id, lessonId } },
  });
  const bestStars = Math.max(stars, existing?.stars ?? 0);
  const bestScore = Math.max(correct, existing?.bestScore ?? 0);

  await prisma.progress.upsert({
    where: { kidId_lessonId: { kidId: kid.id, lessonId } },
    update: {
      stars: bestStars,
      bestScore,
      completed: bestStars >= 1 || existing?.completed === true,
    },
    create: {
      kidId: kid.id,
      lessonId,
      stars,
      bestScore: correct,
      completed: stars >= 1,
    },
  });

  const agg = await prisma.progress.aggregate({
    where: { kidId: kid.id },
    _sum: { stars: true },
  });
  const totalStars = agg._sum.stars ?? 0;
  await prisma.kid.update({
    where: { id: kid.id },
    data: { stars: totalStars },
  });

  const newBadges = await evaluateBadges(kid.id);
  revalidatePath("/");
  revalidatePath("/rewards");

  return {
    starsEarned: stars,
    bestStars,
    totalStars,
    newBadges: newBadges.map((b) => ({
      slug: b.slug,
      name: b.name,
      nameAm: b.nameAm,
      icon: b.icon,
    })),
  };
}

const DICTIONARY_RESULT_LIMIT = 60;
const DICTIONARY_LETTER_LIMIT = 150;

export async function searchDictionaryWords(
  query: string,
  direction: "am" | "en",
) {
  const q = query.trim();
  if (!q) return [];

  const words =
    direction === "am"
      ? await prisma.dictionaryWord.findMany({
          where: { am: { contains: q } },
          take: DICTIONARY_RESULT_LIMIT,
          orderBy: { headword: "asc" },
        })
      : await prisma.dictionaryWord.findMany({
          where: { headword: { contains: q } },
          take: DICTIONARY_RESULT_LIMIT,
          orderBy: { headword: "asc" },
        });

  return words.map((w) => ({ id: w.id, headword: w.headword, am: w.am }));
}

export async function searchDictionaryByLetter(chars: string[]) {
  const words = await prisma.dictionaryWord.findMany({
    where: { OR: chars.map((c) => ({ am: { startsWith: c } })) },
    take: DICTIONARY_LETTER_LIMIT,
    orderBy: { am: "asc" },
  });
  return words.map((w) => ({ id: w.id, headword: w.headword, am: w.am }));
}
