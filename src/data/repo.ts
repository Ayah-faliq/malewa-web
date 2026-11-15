// Akses data produk dari database untuk halaman publik (server only).
import type { Prisma, Product as DbProduct, Partner } from "@prisma/client";
import { db } from "@/lib/db";
import type { CategorySlug, Product, SubCategory, Unit } from "./catalog";

type Row = DbProduct & { partner: Pick<Partner, "name"> };

export function toProduct(r: Row): Product {
  return {
    id: r.id,
    slug: r.slug,
    category: r.category as CategorySlug,
    sub: (r.sub ?? undefined) as SubCategory | undefined,
    name: r.name,
    description: r.description,
    highlights: r.highlights,
    city: r.city,
    province: r.province,
    price: r.price,
    originalPrice: r.originalPrice ?? undefined,
    unit: r.unit as Unit,
    rating: r.rating,
    reviews: r.reviews,
    partner: r.partner.name,
    colors: [r.colorFrom, r.colorTo],
    emoji: r.emoji,
    imageUrl: r.imageUrl,
    stock: r.stock,
    tr: {
      ...(r.nameEn ? { en: { name: r.nameEn, description: r.descriptionEn || r.description, highlights: r.highlightsEn.length ? r.highlightsEn : r.highlights } } : {}),
      ...(r.nameMs ? { ms: { name: r.nameMs, description: r.descriptionMs || r.description, highlights: r.highlightsMs.length ? r.highlightsMs : r.highlights } } : {}),
    },
  };
}

/** Hanya produk berstatus PUBLISHED dari mitra ACTIVE yang tampil di website. */
const visible: Prisma.ProductWhereInput = { status: "PUBLISHED", partner: { status: "ACTIVE" } };
const include = { partner: { select: { name: true } } } as const;

export async function listProducts(where: Prisma.ProductWhereInput = {}) {
  const rows = await db.product.findMany({ where: { ...visible, ...where }, include, orderBy: { reviews: "desc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string) {
  const r = await db.product.findFirst({ where: { ...visible, slug }, include });
  return r ? toProduct(r) : null;
}

export async function listCities() {
  const rows = await db.product.findMany({ where: visible, select: { city: true }, distinct: ["city"], orderBy: { city: "asc" } });
  return rows.map((r) => r.city);
}
