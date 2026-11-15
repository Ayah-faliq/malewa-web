"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export type FormState = { error?: string; ok?: boolean } | undefined;

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return { error: "Email atau password salah." };
  await createSession(user.id);
  redirect(user.role === "ADMIN" ? "/admin" : "/mitra");
}

const registerSchema = z.object({
  businessName: z.string().trim().min(3, "Nama usaha minimal 3 huruf"),
  category: z.enum(["rekreasi", "akomodasi", "transportasi", "pasa"]),
  city: z.string().trim().min(2, "Kota/kabupaten wajib diisi"),
  province: z.string().trim().min(2),
  phone: z.string().trim().regex(/^[0-9+ ]{9,16}$/, "Nomor WhatsApp tidak valid"),
  name: z.string().trim().min(2, "Nama penanggung jawab wajib diisi"),
  email: z.email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export async function registerPartner(_: FormState, form: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const d = parsed.data;
  const email = d.email.toLowerCase();
  if (await db.user.findUnique({ where: { email } })) return { error: "Email sudah terdaftar. Silakan masuk." };
  const user = await db.user.create({
    data: {
      email,
      name: d.name,
      role: "PARTNER",
      passwordHash: await bcrypt.hash(d.password, 10),
      partner: { create: { name: d.businessName, category: d.category, city: d.city, province: d.province, phone: d.phone } },
    },
  });
  await createSession(user.id);
  redirect("/mitra");
}

export async function logout() {
  await destroySession();
  redirect("/mitra/masuk");
}
