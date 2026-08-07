"use client";

import { useState } from "react";
import { createKid, selectKid } from "@/app/actions";

const AVATARS = ["🦁", "🐯", "🐰", "🦊", "🐼", "🐸", "🦄", "🐶", "🐱", "🐵"];

export function ProfilePicker({
  kids,
}: {
  kids: { id: string; name: string; avatar: string; stars: number }[];
}) {
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [adding, setAdding] = useState(kids.length === 0);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-8 px-4 py-10 text-center">
      <div>
        <h1 className="text-4xl font-extrabold text-purple-dark sm:text-5xl">
          Fidel Friends 🎉
        </h1>
        <p className="mt-2 text-lg text-foreground/70">
          Who&apos;s playing today?
        </p>
      </div>

      {kids.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {kids.map((kid) => (
            <form action={selectKid.bind(null, kid.id)} key={kid.id}>
              <button
                type="submit"
                className="bubble-card flex w-32 flex-col items-center gap-1 border-purple bg-white p-4"
              >
                <span className="text-5xl">{kid.avatar}</span>
                <span className="font-bold text-purple-dark">{kid.name}</span>
                <span className="text-sm text-foreground/60">
                  ⭐ {kid.stars}
                </span>
              </button>
            </form>
          ))}
        </div>
      )}

      {!adding && (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="chunky-btn border-2 border-purple-dark bg-white px-6 py-3 text-purple-dark"
        >
          + New Player
        </button>
      )}

      {adding && (
        <form
          action={createKid}
          className="bubble-card flex w-full flex-col gap-4 border-sun bg-white p-6"
        >
          <div>
            <label className="mb-2 block text-left font-bold text-foreground/70">
              Pick a buddy
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {AVATARS.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`rounded-full border-4 p-2 text-3xl transition ${
                    avatar === a
                      ? "border-purple-dark bg-purple/15"
                      : "border-transparent"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <input type="hidden" name="avatar" value={avatar} />
          </div>
          <div>
            <label className="mb-2 block text-left font-bold text-foreground/70">
              What&apos;s your name?
            </label>
            <input
              name="name"
              required
              maxLength={20}
              placeholder="Type your name"
              className="w-full rounded-2xl border-4 border-purple/40 px-4 py-3 text-lg font-semibold outline-none focus:border-purple-dark"
            />
          </div>
          <button
            type="submit"
            className="chunky-btn bg-purple-dark px-6 py-3 text-lg text-white"
          >
            Let&apos;s Go! 🚀
          </button>
        </form>
      )}
    </div>
  );
}
