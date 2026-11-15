"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { saveImage } from "@/lib/storage";
import type { FormState } from "./actions";

const lines = (v: unknown) =>
  String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);
const optInt = z.preprocess((v) => (v === "" || v == null ? undefined : Number(v)), z.number().int().min(0).optional());
const optText = z.preprocess((v) => (String(v ?? "").trim() === "" ? undefined : String(v).trim()), z.string().max(3000).optional());

const schema = z.object({
  name: z.string().trim().min(3, "Nama produk minimal 3 huruf").max(120),
  category: z.enum(["rekreasi", "akomodasi", "transportasi", "pasa"]),
  sub: z.preprocess((v) => (v === "" ? undefined : v), z.enum(["kuliner", "kerajinan", "perlengkapan"]).optional()),
  city: z.string().trim().min(2, "Kota wajib diisi"),
  province: z.string().trim().min(2),
  price: z.coerce.number().int().min(1000, "Harga minimal Rp1.000"),
  originalPrice: optInt,
  unit: z.enum(["person", "roomNight", "unitDay", "pack", "box", "piece", "sheet"]),
  stock: optInt,
  description: z.string().trim().min(20, "Deskripsi minimal 20 karakter").max(3000),
  emoji: z.string().trim().min(1).max(8),
  colorFrom: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  colorTo: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  nameEn: optText,
  descriptionEn: optText,
  nameMs: optText,
  descriptionMs: optText,
});

function slugify(s: string) {
  return (
    s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 60) +
    "-" +
    Math.random().toString(36).slice(2, 6)
  );
}

/** Simpan produk baru (productId null) atau edit produk yang ada. */
export async function saveProduct(productId: string | null, _: FormState, form: FormData): Promise<FormState> {
  const user = await currentUser();
  if (!user) redirect("/mitra/masuk");
  const isAdmin = user.role === "ADMIN";

  let existing = null;
  if (productId) {
    existing = await db.product.findUnique({ where: { id: productId } });
    if (!existing || (!isAdmin && existing.partnerId !== user.partnerId)) return { error: "Produk tidak ditemukan." };
  } else if (!user.partnerId) {
    return { error: "Hanya akun mitra yang bisa menambah produk." };
  }

  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const d = parsed.data;
  if (d.originalPrice !== undefined && d.originalPrice <= d.price) return { error: "Harga coret harus lebih besar dari harga jual." };

  let imageUrl = existing?.imageUrl ?? null;
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      imageUrl = await saveImage(file);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Gagal mengunggah foto." };
    }
  }
  if (form.get("removeImage") === "on") imageUrl = null;

  const data = {
    ...d,
    sub: d.category === "pasa" ? (d.sub ?? null) : null,
    originalPrice: d.originalPrice ?? null,
    stock: d.stock ?? null,
    nameEn: d.nameEn ?? null,
    descriptionEn: d.descriptionEn ?? null,
    nameMs: d.nameMs ?? null,
    descriptionMs: d.descriptionMs ?? null,
    highlights: lines(form.get("highlights")),
    highlightsEn: lines(form.get("highlightsEn")),
    highlightsMs: lines(form.get("highlightsMs")),
    imageUrl,
  };

  if (existing) await db.product.update({ where: { id: existing.id }, data });
  else await db.product.create({ data: { ...data, slug: slugify(d.name), partnerId: user.partnerId! } });

  revalidatePath("/", "layout");
  redirect(isAdmin ? "/admin?tab=produk" : "/mitra");
}

/** Tayangkan / sembunyikan produk dengan cepat dari daftar. */
export async function toggleProductStatus(productId: string) {
  const user = await currentUser();
  if (!user) redirect("/mitra/masuk");
  const p = await db.product.findUnique({ where: { id: productId } });
  if (!p || (user.role !== "ADMIN" && p.partnerId !== user.partnerId)) return;
  await db.product.update({ where: { id: p.id }, data: { status: p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } });
  revalidatePath("/", "layout");
}
