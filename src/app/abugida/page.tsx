import Link from "next/link";
import { redirect } from "next/navigation";
import { getActiveKid } from "@/lib/kid-session";
import { buildAbugidaChant } from "../../../prisma/content";
import { SpeakButton } from "@/components/SpeakButton";

export default async function AbugidaPage() {
  const kid = await getActiveKid();
  if (!kid) redirect("/");

  const rows = buildAbugidaChant();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/subjects/fidel"
          className="chunky-btn border-2 border-foreground/20 bg-white px-4 py-2 text-foreground/60"
        >
          ← Alphabet
        </Link>
        <h1 className="text-3xl font-extrabold">🎵 Abugida Chant</h1>
      </div>
      <p className="text-foreground/60">
        A traditional way to practice reading the Fidel: each row reads
        across different letters. The first four symbols of row one —{" "}
        <span className="font-ethiopic font-bold">አ ቡ ጊ ዳ</span> — are where
        the word &quot;abugida&quot; itself comes from!
      </p>

      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="bubble-card flex items-center gap-3 border-purple bg-white p-3"
          >
            <span className="w-6 shrink-0 text-center font-bold text-foreground/30">
              {i + 1}
            </span>
            <div className="flex flex-1 flex-wrap justify-between gap-2">
              {row.map((cell, j) => (
                <div key={j} className="flex flex-col items-center">
                  <span className="font-ethiopic text-3xl font-bold">
                    {cell.symbol}
                  </span>
                  <span className="text-xs text-foreground/40">
                    {cell.latin}
                  </span>
                </div>
              ))}
            </div>
            <SpeakButton
              text={row.map((c) => c.symbol).join(" ")}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
