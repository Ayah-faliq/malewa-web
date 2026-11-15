import { getDict, localeMeta, type Locale } from "@/i18n/dictionaries";
import { getCategory, type Product } from "./products";
import { productTranslations } from "./products.i18n";

/** Kembalikan produk dengan nama, deskripsi, dan highlight dalam bahasa yang dipilih. */
export function localizeProduct(p: Product, locale: Locale): Product {
  if (locale === "id") return p;
  const tr = productTranslations[p.slug]?.[locale];
  return tr ? { ...p, ...tr } : p;
}

export function categoryText(slug: string, locale: Locale) {
  return getDict(locale).categories[slug];
}

export function unitText(p: Product, locale: Locale) {
  return getDict(locale).units[p.unit] ?? "";
}

/** Teks yang bisa dicari: semua bahasa sekaligus, jadi "rendang" atau "beef" sama-sama ketemu. */
export function searchableText(p: Product) {
  const tr = productTranslations[p.slug];
  const cat = getCategory(p.category);
  return [
    p.name, p.city, p.province, p.partner, p.description,
    tr?.en.name, tr?.en.description, tr?.ms.name, tr?.ms.description,
    cat ? Object.values({ id: getDict("id"), en: getDict("en"), ms: getDict("ms") }).map((d) => d.categories[cat.slug].name).join(" ") : "",
    p.sub ? ["id", "en", "ms"].map((l) => getDict(l as Locale).subcategories[p.sub!]).join(" ") : "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function intlLocale(locale: Locale) {
  return localeMeta[locale].intl;
}
