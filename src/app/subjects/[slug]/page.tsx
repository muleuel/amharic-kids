import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActiveKid } from "@/lib/kid-session";
import { subjectTheme } from "@/lib/theme";

type LessonRow = {
  id: string;
  slug: string;
  title: string;
  titleAm: string;
  stars: number;
  unlocked: boolean;
};

export default async function SubjectPage(
  props: PageProps<"/subjects/[slug]">,
) {
  const { slug } = await props.params;
  const kid = await getActiveKid();
  if (!kid) redirect("/");

  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!subject) notFound();

  const progress = await prisma.progress.findMany({
    where: {
      kidId: kid.id,
      lessonId: { in: subject.lessons.map((l) => l.id) },
    },
  });
  const progressByLesson = new Map(progress.map((p) => [p.lessonId, p]));
  const theme = subjectTheme(subject.slug);

  const rows: LessonRow[] = [];
  let previousCompleted = true;
  for (const lesson of subject.lessons) {
    const p = progressByLesson.get(lesson.id);
    rows.push({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      titleAm: lesson.titleAm,
      stars: p?.stars ?? 0,
      unlocked: previousCompleted,
    });
    previousCompleted = p?.completed ?? false;
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="chunky-btn border-2 border-foreground/20 bg-white px-4 py-2 text-foreground/60"
        >
          ← Home
        </Link>
        <h1 className="flex items-center gap-2 text-3xl font-extrabold">
          <span>{subject.icon}</span>
          <span>{subject.name}</span>
          <span className="font-ethiopic text-2xl text-foreground/50">
            {subject.nameAm}
          </span>
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {rows.map((lesson) => {
          const card = (
            <div
              className={`bubble-card flex flex-col items-center gap-1 bg-white p-4 text-center ${
                lesson.unlocked
                  ? theme.border
                  : "border-foreground/15 opacity-60"
              }`}
            >
              <span className="font-ethiopic text-4xl">{lesson.titleAm}</span>
              <span className="font-bold">{lesson.title}</span>
              <span className="text-lg">
                {"⭐".repeat(lesson.stars)}
                {"☆".repeat(3 - lesson.stars)}
              </span>
              {!lesson.unlocked && <span className="text-2xl">🔒</span>}
            </div>
          );

          if (!lesson.unlocked) {
            return <div key={lesson.id}>{card}</div>;
          }

          return (
            <Link
              key={lesson.id}
              href={`/subjects/${subject.slug}/${lesson.slug}`}
            >
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
