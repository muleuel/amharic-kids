import { prisma } from "@/lib/prisma";

export async function evaluateBadges(kidId: string) {
  const kid = await prisma.kid.findUniqueOrThrow({
    where: { id: kidId },
    include: { progress: true, badges: true },
  });

  const completedLessons = kid.progress.filter((p) => p.completed);
  const earnedSlugs: string[] = [];

  if (completedLessons.length >= 1) earnedSlugs.push("first-steps");

  const subjects = await prisma.subject.findMany({
    include: { lessons: { select: { id: true } } },
  });

  for (const subject of subjects) {
    const lessonIds = new Set(subject.lessons.map((l) => l.id));
    const doneForSubject = completedLessons.filter((p) =>
      lessonIds.has(p.lessonId),
    );
    if (subject.slug === "fidel" && doneForSubject.length >= 1) {
      earnedSlugs.push("fidel-explorer");
    }
    if (lessonIds.size > 0 && doneForSubject.length >= lessonIds.size) {
      if (subject.slug === "fidel") earnedSlugs.push("fidel-master");
      if (subject.slug === "numbers") earnedSlugs.push("number-ninja");
      if (subject.slug === "words") earnedSlugs.push("word-wizard");
    }
  }

  const perfectCount = kid.progress.filter((p) => p.stars === 3).length;
  if (perfectCount >= 10) earnedSlugs.push("perfectionist");
  if (kid.stars >= 50) earnedSlugs.push("superstar");

  if (earnedSlugs.length === 0) return [];

  const alreadyEarned = new Set(kid.badges.map((kb) => kb.badgeId));
  const badges = await prisma.badge.findMany({
    where: { slug: { in: earnedSlugs } },
  });

  const newlyEarned = [];
  for (const badge of badges) {
    if (!alreadyEarned.has(badge.id)) {
      await prisma.kidBadge.create({ data: { kidId, badgeId: badge.id } });
      newlyEarned.push(badge);
    }
  }
  return newlyEarned;
}

export function starsForScore(correct: number, total: number) {
  const pct = total > 0 ? correct / total : 0;
  if (pct >= 1) return 3;
  if (pct >= 0.75) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}
