import Link from "next/link";
import { switchProfile } from "@/app/actions";
import { subjectTheme } from "@/lib/theme";

type SubjectSummary = {
  slug: string;
  name: string;
  nameAm: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
  starsEarned: number;
  maxStars: number;
};

export function Dashboard({
  kid,
  subjects,
}: {
  kid: { id: string; name: string; avatar: string; stars: number };
  subjects: SubjectSummary[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-5xl">{kid.avatar}</span>
          <div>
            <p className="text-2xl font-extrabold text-purple-dark">
              Hi, {kid.name}!
            </p>
            <p className="font-bold text-sun-700">⭐ {kid.stars} stars</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dictionary"
            className="chunky-btn border-2 border-teal-dark bg-white px-4 py-2 text-teal-dark"
          >
            📖 Dictionary
          </Link>
          <Link
            href="/rewards"
            className="chunky-btn border-2 border-pink bg-white px-4 py-2 text-pink"
          >
            🏅 My Rewards
          </Link>
          <form action={switchProfile}>
            <button
              type="submit"
              className="chunky-btn border-2 border-foreground/20 bg-white px-4 py-2 text-foreground/60"
            >
              Switch Player
            </button>
          </form>
        </div>
      </header>

      <div>
        <h2 className="mb-4 text-xl font-extrabold text-foreground/80">
          What do you want to learn today?
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {subjects.map((subject) => {
            const theme = subjectTheme(subject.slug);
            const pct =
              subject.totalLessons > 0
                ? Math.round(
                    (subject.completedLessons / subject.totalLessons) * 100,
                  )
                : 0;
            return (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
                className={`bubble-card flex flex-col items-center gap-2 bg-white p-6 text-center ${theme.border}`}
              >
                <span className="text-6xl">{subject.icon}</span>
                <span className="text-xl font-extrabold text-foreground">
                  {subject.name}
                </span>
                <span className="font-ethiopic text-lg text-foreground/60">
                  {subject.nameAm}
                </span>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className={`h-full ${theme.bg}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground/60">
                  {subject.completedLessons}/{subject.totalLessons} lessons ·
                  ⭐ {subject.starsEarned}/{subject.maxStars}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
