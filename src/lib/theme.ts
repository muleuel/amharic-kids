export type SubjectSlug = "fidel" | "numbers" | "words";

export const SUBJECT_THEME: Record<
  SubjectSlug,
  { bg: string; bgSoft: string; border: string; text: string; ring: string }
> = {
  fidel: {
    bg: "bg-purple",
    bgSoft: "bg-purple/15",
    border: "border-purple-dark",
    text: "text-purple-dark",
    ring: "ring-purple",
  },
  numbers: {
    bg: "bg-blue",
    bgSoft: "bg-blue/15",
    border: "border-blue-dark",
    text: "text-blue-dark",
    ring: "ring-blue",
  },
  words: {
    bg: "bg-orange",
    bgSoft: "bg-orange/15",
    border: "border-orange-dark",
    text: "text-orange-dark",
    ring: "ring-orange",
  },
};

export function subjectTheme(slug: string) {
  return SUBJECT_THEME[slug as SubjectSlug] ?? SUBJECT_THEME.fidel;
}
