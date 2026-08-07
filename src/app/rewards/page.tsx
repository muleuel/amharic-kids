import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActiveKid } from "@/lib/kid-session";

export default async function RewardsPage() {
  const kid = await getActiveKid();
  if (!kid) redirect("/");

  const [badges, earned] = await Promise.all([
    prisma.badge.findMany(),
    prisma.kidBadge.findMany({ where: { kidId: kid.id } }),
  ]);
  const earnedIds = new Set(earned.map((e) => e.badgeId));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="chunky-btn border-2 border-foreground/20 bg-white px-4 py-2 text-foreground/60"
        >
          ← Home
        </Link>
        <h1 className="text-3xl font-extrabold">🏅 My Rewards</h1>
      </div>

      <div className="bubble-card flex items-center gap-4 border-sun bg-white p-6">
        <span className="text-6xl">{kid.avatar}</span>
        <div>
          <p className="text-xl font-extrabold">{kid.name}</p>
          <p className="text-lg font-bold text-orange-dark">
            ⭐ {kid.stars} total stars
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {badges.map((badge) => {
          const isEarned = earnedIds.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`bubble-card flex items-center gap-4 bg-white p-4 ${
                isEarned ? "border-sun" : "border-foreground/10 opacity-50"
              }`}
            >
              <span className="text-5xl">{isEarned ? badge.icon : "🔒"}</span>
              <div>
                <p className="font-extrabold">{badge.name}</p>
                <p className="font-ethiopic text-foreground/50">
                  {badge.nameAm}
                </p>
                <p className="text-sm text-foreground/60">
                  {badge.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
