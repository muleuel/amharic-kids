import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "kidId";

export async function getActiveKid() {
  const store = await cookies();
  const kidId = store.get(COOKIE_NAME)?.value;
  if (!kidId) return null;
  return prisma.kid.findUnique({ where: { id: kidId } });
}

export async function setActiveKid(kidId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, kidId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export async function clearActiveKid() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
