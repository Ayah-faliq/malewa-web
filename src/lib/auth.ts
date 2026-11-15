// Sesi login panel mitra/admin: JWT bertanda tangan di cookie httpOnly.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";
import { db } from "@/lib/db";

const COOKIE = "malewa_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET belum diatur (minimal 32 karakter)");
  return new TextEncoder().encode(s);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

/** Pengguna yang sedang login (beserta mitranya), atau null. */
export async function currentUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub) return null;
    return await db.user.findUnique({ where: { id: payload.sub }, include: { partner: true } });
  } catch {
    return null;
  }
}

export async function requirePartner() {
  const user = await currentUser();
  if (!user) redirect("/mitra/masuk");
  if (user.role === "ADMIN") redirect("/admin");
  if (!user.partner) redirect("/mitra/masuk");
  return { user, partner: user.partner };
}

export async function requireAdmin() {
  const user = await currentUser();
  if (!user) redirect("/mitra/masuk");
  if (user.role !== "ADMIN") redirect("/mitra");
  return user;
}
