# Fidel Friends 🎉

An interactive, Squla-style Amharic learning platform for kids. Kids pick a
playful profile and play through bite-sized games to learn the **Fidel**
(Ge'ez alphabet), **numbers**, **vocabulary words**, and **conversations**,
earning stars and badges along the way.

## Features

- **No-login kid profiles** — pick an avatar and a name, no passwords.
- **Fidel (alphabet)** — 32 lessons covering the full 7-order Amharic
  syllabary (224 characters), one family per lesson.
- **Numbers** — counting 1–10 and tens up to a hundred, in Ge'ez numerals.
- **Words** — vocabulary across animals, colors, family, food, and body
  parts, with emoji + English hints.
- **Conversations** — scripted dialogues (Family, Education, Time &
  Calendar, Greetings) between two recurring characters, read line by
  line, followed by comprehension questions — a step up for kids ready
  for full sentences.
- **Pronunciation** — tap-to-hear audio via the browser's built-in
  Web Speech API (needs an Amharic voice installed on the device).
- **Abugida Chant** — the traditional 33-row diagonal recitation of the
  Fidel, computed from the alphabet data.
- **Dictionary & Translate** — bidirectional Amharic/English search plus
  a full 11,000+ word English-Amharic dictionary (see Data sources below).
- **Stars & badges** — 0–3 stars per lesson based on score, with
  collectible badges (Fidel Master, Number Ninja, Word Wizard,
  Conversation Champ, Superstar...).
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
npm run db:seed    # load the Fidel/numbers/words/dialogue content and badges
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data sources

- `prisma/dictionary-data.json` (11,621 English-headword → Amharic-translation
  pairs) is derived from the [amharic-dictionary-database](https://github.com/Yidnekachew/amharic-dictionary-database)
  repository by Yidnekachew (CC0-1.0 / public domain). Only the short
  headword/translation pairs are used — the original dataset's full English
  dictionary definitions are intentionally excluded, since that text reads
  like content from a copyrighted published dictionary regardless of the
  wrapping repository's license.
- All other lesson content (Fidel, numbers, words, dialogues) is original,
  hand-authored for this project.

## Project structure

- `prisma/schema.prisma` — data model (kids, subjects, lessons, items,
  dialogue lines/questions, dictionary words, progress, badges)
- `prisma/content.ts` — the raw Fidel/numbers/words/dialogue content, plus
  the Abugida chant generator
- `prisma/dictionary-data.json` — the imported general dictionary (see Data
  sources)
- `prisma/seed.ts` — seeds the database from `content.ts` and
  `dictionary-data.json`
- `src/lib/quiz.ts` — builds multiple-choice questions per subject type
- `src/components/QuizGame.tsx` — the shared multiple-choice quiz UI
- `src/components/DialogueGame.tsx` — chat-style dialogue reader +
  comprehension quiz
- `src/components/SpeakButton.tsx` — Web Speech API pronunciation button
- `src/components/DictionarySearch.tsx` — dictionary search UI (curated
  vocabulary + debounced server-side search over the full dictionary)
- `src/app/actions.ts` — server actions (profile selection, submitting
  lesson results, badge awarding, dictionary search)
