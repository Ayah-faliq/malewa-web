import { getDict, localeMeta, type Locale } from "@/i18n/dictionaries";
import type { Product } from "./catalog";

/** Kembalikan produk dengan nama, deskripsi, dan highlight dalam bahasa yang dipilih (jatuh ke Indonesia). */
export function localizeProduct(p: Product, locale: Locale): Product {
  if (locale === "id") return p;
  const tr = p.tr?.[locale];
  return tr ? { ...p, ...tr } : p;
}

export function unitText(p: Product, locale: Locale) {
  return getDict(locale).units[p.unit] ?? "";
}

const allDicts = () => (["id", "en", "ms"] as const).map((l) => getDict(l));

/** Teks yang bisa dicari: semua bahasa sekaligus, jadi "rendang" atau "beef" sama-sama ketemu. */
export function searchableText(p: Product) {
  return [
    p.name, p.city, p.province, p.partner, p.description,
    p.tr?.en?.name, p.tr?.en?.description, p.tr?.ms?.name, p.tr?.ms?.description,
    ...allDicts().map((d) => d.categories[p.category]?.name),
    ...(p.sub ? allDicts().map((d) => d.subcategories[p.sub!]) : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function intlLocale(locale: Locale) {
  return localeMeta[locale].intl;
}
