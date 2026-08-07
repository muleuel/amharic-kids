import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActiveKid } from "@/lib/kid-session";
import { buildQuestions } from "@/lib/quiz";
import { QuizGame } from "@/components/QuizGame";

export default async function LessonPage(
  props: PageProps<"/subjects/[slug]/[lessonSlug]">,
) {
  const { slug, lessonSlug } = await props.params;
  const kid = await getActiveKid();
  if (!kid) redirect("/");

  const subject = await prisma.subject.findUnique({ where: { slug } });
  if (!subject) notFound();

  const lesson = await prisma.lesson.findUnique({
    where: { subjectId_slug: { subjectId: subject.id, slug: lessonSlug } },
    include: { items: { orderBy: { order: "asc" } } },
  });
  if (!lesson) notFound();

  const nextLesson = await prisma.lesson.findUnique({
    where: {
      subjectId_order: { subjectId: subject.id, order: lesson.order + 1 },
    },
  });

  const questions = buildQuestions(subject.slug, lesson.slug, lesson.items);

  return (
    <QuizGame
      lessonId={lesson.id}
      subjectSlug={subject.slug}
      backHref={`/subjects/${subject.slug}`}
      nextLessonHref={
        nextLesson ? `/subjects/${subject.slug}/${nextLesson.slug}` : null
      }
      questions={questions}
    />
  );
}
