import { prisma } from "@/lib/prisma";
import { getActiveKid } from "@/lib/kid-session";
import { ProfilePicker } from "@/components/ProfilePicker";
import { Dashboard } from "@/components/Dashboard";

export default async function Home() {
  const kid = await getActiveKid();

  if (!kid) {
    const kids = await prisma.kid.findMany({ orderBy: { createdAt: "asc" } });
    return <ProfilePicker kids={kids} />;
  }

  const [subjects, progress] = await Promise.all([
    prisma.subject.findMany({
      orderBy: { order: "asc" },
      include: { lessons: { select: { id: true } } },
    }),
    prisma.progress.findMany({ where: { kidId: kid.id } }),
  ]);

  const subjectSummaries = subjects.map((subject) => {
    const lessonIds = new Set(subject.lessons.map((l) => l.id));
    const kidProgress = progress.filter((p) => lessonIds.has(p.lessonId));
    return {
      slug: subject.slug,
      name: subject.name,
      nameAm: subject.nameAm,
      icon: subject.icon,
      totalLessons: subject.lessons.length,
      completedLessons: kidProgress.filter((p) => p.completed).length,
      starsEarned: kidProgress.reduce((sum, p) => sum + p.stars, 0),
      maxStars: subject.lessons.length * 3,
    };
  });

  return <Dashboard kid={kid} subjects={subjectSummaries} />;
}
