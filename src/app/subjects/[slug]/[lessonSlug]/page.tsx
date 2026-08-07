import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActiveKid } from "@/lib/kid-session";
import { buildQuestions, shuffle } from "@/lib/quiz";
import { QuizGame } from "@/components/QuizGame";
import { DialogueGame } from "@/components/DialogueGame";

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
    include: {
      items: { orderBy: { order: "asc" } },
      dialogueLines: { orderBy: { order: "asc" } },
      dialogueQuestions: { orderBy: { order: "asc" } },
    },
  });
  if (!lesson) notFound();

  const nextLesson = await prisma.lesson.findUnique({
    where: {
      subjectId_order: { subjectId: subject.id, order: lesson.order + 1 },
    },
  });
  const backHref = `/subjects/${subject.slug}`;
  const nextLessonHref = nextLesson
    ? `/subjects/${subject.slug}/${nextLesson.slug}`
    : null;

  if (lesson.kind === "DIALOGUE") {
    const questions = shuffle(lesson.dialogueQuestions).map((q) => ({
      id: q.id,
      prompt: q.prompt,
      correct: q.correct,
      options: shuffle(q.options as string[]),
    }));

    return (
      <DialogueGame
        lessonId={lesson.id}
        backHref={backHref}
        nextLessonHref={nextLessonHref}
        lines={lesson.dialogueLines}
        questions={questions}
      />
    );
  }

  const questions = buildQuestions(subject.slug, lesson.slug, lesson.items);

  return (
    <QuizGame
      lessonId={lesson.id}
      subjectSlug={subject.slug}
      backHref={backHref}
      nextLessonHref={nextLessonHref}
      questions={questions}
    />
  );
}
