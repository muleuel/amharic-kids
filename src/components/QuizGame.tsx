"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitLessonResult } from "@/app/actions";
import type { Question } from "@/lib/quiz";
import { subjectTheme } from "@/lib/theme";
import { SpeakButton } from "@/components/SpeakButton";

const AMHARIC_OPTION_KINDS = new Set<Question["kind"]>(["emoji", "count"]);

type Result = Awaited<ReturnType<typeof submitLessonResult>>;

export function QuizGame({
  lessonId,
  subjectSlug,
  backHref,
  nextLessonHref,
  questions,
}: {
  lessonId: string;
  subjectSlug: string;
  backHref: string;
  nextLessonHref: string | null;
  questions: Question[];
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const theme = subjectTheme(subjectSlug);
  const question = questions[index];
  const isLast = index === questions.length - 1;
  const showAmharicOptions = AMHARIC_OPTION_KINDS.has(question?.kind);

  async function handleAnswer(option: string) {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === question.correct;
    const nextCorrect = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) setCorrectCount(nextCorrect);

    if (isLast) {
      setSubmitting(true);
      const res = await submitLessonResult(
        lessonId,
        nextCorrect,
        questions.length,
      );
      setResult(res);
      setSubmitting(false);
    }
  }

  function handleNext() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function handleRetry() {
    router.refresh();
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setResult(null);
  }

  if (result) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-10 text-center">
        <div className="animate-pop text-7xl">
          {result.bestStars === 3 ? "🏆" : result.bestStars > 0 ? "🎉" : "💪"}
        </div>
        <h2 className="text-3xl font-extrabold">
          {correctCount} / {questions.length} correct!
        </h2>
        <div className="text-4xl">
          {"⭐".repeat(result.bestStars)}
          {"☆".repeat(3 - result.bestStars)}
        </div>
        <p className="font-bold text-foreground/60">
          Total stars: ⭐ {result.totalStars}
        </p>

        {result.newBadges.length > 0 && (
          <div className="bubble-card flex flex-col items-center gap-2 border-sun bg-white p-4">
            <p className="font-extrabold text-orange-dark">New badge!</p>
            {result.newBadges.map((b) => (
              <div key={b.slug} className="flex items-center gap-2">
                <span className="text-3xl">{b.icon}</span>
                <span className="font-bold">{b.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleRetry}
            className="chunky-btn border-2 border-foreground/20 bg-white px-5 py-3"
          >
            🔁 Play Again
          </button>
          {nextLessonHref && (
            <Link
              href={nextLessonHref}
              className={`chunky-btn ${theme.bg} px-5 py-3 text-white`}
            >
              Next Lesson →
            </Link>
          )}
          <Link
            href={backHref}
            className="chunky-btn border-2 border-foreground/20 bg-white px-5 py-3"
          >
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="chunky-btn border-2 border-foreground/20 bg-white px-4 py-2 text-foreground/60"
        >
          ← Exit
        </Link>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-foreground/10">
          <div
            className={`h-full ${theme.bg} transition-all`}
            style={{ width: `${(index / questions.length) * 100}%` }}
          />
        </div>
        <span className="font-bold text-foreground/50">
          {index + 1}/{questions.length}
        </span>
      </div>

      <div className="bubble-card flex flex-1 flex-col items-center justify-center gap-8 border-white bg-white p-8">
        <Prompt question={question} />

        <div className="grid w-full grid-cols-2 gap-4">
          {question.options.map((option) => {
            const isSelected = selected === option;
            const isCorrectOption = option === question.correct;
            let style = `border-foreground/15 bg-white`;
            if (selected) {
              if (isCorrectOption) style = "border-green bg-green/15";
              else if (isSelected) style = "border-pink bg-pink/15";
            }
            return (
              <div key={option} className="relative">
                <button
                  disabled={!!selected || submitting}
                  onClick={() => handleAnswer(option)}
                  className={`chunky-btn w-full border-4 px-4 py-5 text-2xl font-bold ${style} ${
                    showAmharicOptions ? "font-ethiopic" : ""
                  }`}
                >
                  {option}
                </button>
                {showAmharicOptions && (
                  <div className="absolute -top-3 -right-3">
                    <SpeakButton text={option} size="sm" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selected && question.hint && (
          <p className="text-foreground/50">({question.hint})</p>
        )}

        {selected && !isLast && (
          <button
            onClick={handleNext}
            className={`chunky-btn ${theme.bg} px-8 py-3 text-lg text-white`}
          >
            Next →
          </button>
        )}
        {selected && isLast && submitting && (
          <p className="font-bold text-foreground/50">Saving...</p>
        )}
      </div>
    </div>
  );
}

function Prompt({ question }: { question: Question }) {
  if (question.kind === "count") {
    const n = Number(question.prompt);
    return (
      <div className="flex max-w-sm flex-wrap justify-center gap-1 text-5xl">
        {Array.from({ length: n }).map((_, i) => (
          <span key={i}>🍎</span>
        ))}
      </div>
    );
  }
  if (question.kind === "numeral" || question.kind === "symbol") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-ethiopic text-8xl font-bold">
          {question.prompt}
        </div>
        <SpeakButton text={question.prompt} />
      </div>
    );
  }
  return <div className="text-8xl">{question.prompt}</div>;
}
