// Metadata kategori dan tipe produk. Data produk ada di database (lihat prisma/schema.prisma).

export type CategorySlug = "rekreasi" | "akomodasi" | "transportasi" | "pasa";
export type SubCategory = "kuliner" | "kerajinan" | "perlengkapan";
export type Unit = "person" | "roomNight" | "unitDay" | "pack" | "box" | "piece" | "sheet";

/** Teks kategori (nama, label form) ada di src/i18n/dictionaries.ts */
export type Category = {
  slug: CategorySlug;
  emoji: string;
  hasDate: boolean;
  hasDuration: boolean;
  needsShipping?: boolean;
  subcategories?: SubCategory[];
};

export const categories: Category[] = [
  { slug: "rekreasi", emoji: "🎟️", hasDate: true, hasDuration: false },
  { slug: "akomodasi", emoji: "🏡", hasDate: true, hasDuration: true },
  { slug: "transportasi", emoji: "🚌", hasDate: true, hasDuration: true },
  { slug: "pasa", emoji: "🛍️", hasDate: false, hasDuration: false, needsShipping: true, subcategories: ["kuliner", "kerajinan", "perlengkapan"] },
];

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  city: string;
  province: string;
  price: number;
  unit: Unit;
  /** Sub-kategori, khusus Pasa Malewa */
  sub?: SubCategory;
  rating: number;
  reviews: number;
  partner: string;
  description: string;
  highlights: string[];
  /** Dua warna gradasi untuk gambar placeholder */
  colors: [string, string];
  emoji: string;
  /** Harga coret (opsional) untuk tampilan promo */
  originalPrice?: number;
  id: string;
  imageUrl?: string | null;
  stock?: number | null;
  /** Terjemahan teks produk */
  tr?: Partial<Record<"en" | "ms", ProductText>>;
};

export type ProductText = { name: string; description: string; highlights: string[] };


export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** Untuk beranda: ambil produk bergiliran per sub-kategori supaya isi Pasa Malewa terlihat beragam. */
export function pickFeatured(list: Product[], n = 4) {
  const groups = new Map<string, Product[]>();
  for (const p of list) groups.set(p.sub ?? "", [...(groups.get(p.sub ?? "") ?? []), p]);
  if (groups.size <= 1) return list.slice(0, n);
  const out: Product[] = [];
  const queues = [...groups.values()];
  for (let i = 0; out.length < n && i < list.length * 2; i++) {
    const next = queues[i % queues.length].shift();
    if (next) out.push(next);
  }
  return out;
}

export const popularCities = [
  { name: "Bukittinggi", emoji: "🕰️", colors: ["#7c2d12", "#f59e0b"] as [string, string] },
  { name: "Padang", emoji: "🌅", colors: ["#1e3a8a", "#f97316"] as [string, string] },
  { name: "Pesisir Selatan", emoji: "🏝️", colors: ["#0c4a6e", "#06b6d4"] as [string, string] },
  { name: "Kepulauan Mentawai", emoji: "🏄", colors: ["#0e7490", "#fde047"] as [string, string] },
  { name: "Lima Puluh Kota", emoji: "⛰️", colors: ["#064e3b", "#10b981"] as [string, string] },
  { name: "Tanah Datar", emoji: "🏯", colors: ["#78350f", "#dc2626"] as [string, string] },
];
