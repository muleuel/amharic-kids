# Fidel Friends 🎉

An interactive, Squla-style Amharic learning platform for kids. Kids pick a
playful profile and play through bite-sized games to learn the **Fidel**
(Ge'ez alphabet), **numbers**, and **vocabulary words**, earning stars and
badges along the way.

## Features

- **No-login kid profiles** — pick an avatar and a name, no passwords.
- **Fidel (alphabet)** — 32 lessons covering the full 7-order Amharic
  syllabary (224 characters), one family per lesson.
- **Numbers** — counting 1–10 and tens up to a hundred, in Ge'ez numerals.
- **Words** — vocabulary across animals, colors, family, food, and body
  parts, with emoji + English hints.
- **Stars & badges** — 0–3 stars per lesson based on score, with
  collectible badges (Fidel Master, Number Ninja, Word Wizard, Superstar...).
- **Sequential lesson unlocking** to guide kids through the content in order.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS v4
- Prisma + SQLite (via `@prisma/adapter-better-sqlite3`) — zero-config local
  database, no server to run

## Getting started

```bash
npm install
npm run db:push    # create the local SQLite database
npm run db:seed    # load the Fidel/numbers/words content and badges
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `prisma/schema.prisma` — data model (kids, subjects, lessons, items,
  progress, badges)
- `prisma/content.ts` — the raw Fidel/numbers/words content
- `prisma/seed.ts` — seeds the database from `content.ts`
- `src/lib/quiz.ts` — builds multiple-choice questions per subject type
- `src/components/QuizGame.tsx` — the shared interactive quiz UI
- `src/app/actions.ts` — server actions (profile selection, submitting
  lesson results, badge awarding)
