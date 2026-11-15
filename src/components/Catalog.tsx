import Link from "next/link";
import { getCategory, type Product } from "@/data/catalog";
import { searchableText } from "@/data/localize";
import { getDict, type Locale } from "@/i18n/dictionaries";
import ProductCard from "./ProductCard";

export type CatalogParams = { q?: string; kota?: string; urut?: string; kategori?: string; jenis?: string };

export function filterProducts(list: Product[], { q, kota, urut, jenis }: CatalogParams) {
  let out = list;
  if (q) {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    out = out.filter((p) => {
      const text = searchableText(p);
      return words.every((w) => text.includes(w));
    });
  }
  if (kota) out = out.filter((p) => p.city === kota);
  if (jenis) out = out.filter((p) => p.sub === jenis);
  if (urut === "termurah") out = [...out].sort((a, b) => a.price - b.price);
  else if (urut === "termahal") out = [...out].sort((a, b) => b.price - a.price);
  else if (urut === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
  else out = [...out].sort((a, b) => b.reviews - a.reviews);
  return out;
}

/** Katalog dengan filter berbasis query string. */
export default function Catalog({
  products,
  params,
  action,
  locale,
  categorySlug,
}: {
  products: Product[];
  params: CatalogParams;
  action: string;
  locale: Locale;
  /** Diisi saat katalog dibatasi satu kategori */
  categorySlug?: string;
}) {
  const t = getDict(locale);
  const result = filterProducts(products, params);
  const availableCities = [...new Set(products.map((p) => p.city))].sort();
  const subs = categorySlug ? getCategory(categorySlug)?.subcategories : undefined;
  const isSearch = action === "/cari";
  const field = "w-full rounded-lg bg-neutral-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand";

  const chipHref = (jenis?: string) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v && k !== "jenis") sp.set(k, v);
    if (jenis) sp.set("jenis", jenis);
    const s = sp.toString();
    return s ? `${action}?${s}` : action;
  };

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <form action={action} className="h-fit space-y-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 md:sticky md:top-32">
        {isSearch && categorySlug && <input type="hidden" name="kategori" value={categorySlug} />}
        {params.jenis && <input type="hidden" name="jenis" value={params.jenis} />}
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-neutral-500">{t.catalog.keyword}</span>
          <input name="q" defaultValue={params.q} placeholder={t.catalog.keywordPh} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-neutral-500">{t.catalog.region}</span>
          <select name="kota" defaultValue={params.kota ?? ""} className={field}>
            <option value="">{t.catalog.allRegions}</option>
            {availableCities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-neutral-500">{t.catalog.sortBy}</span>
          <select name="urut" defaultValue={params.urut ?? ""} className={field}>
            <option value="">{t.catalog.sortPopular}</option>
            <option value="rating">{t.catalog.sortRating}</option>
            <option value="termurah">{t.catalog.sortCheap}</option>
            <option value="termahal">{t.catalog.sortExpensive}</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-ink py-2 text-sm font-bold text-white hover:bg-black">{t.catalog.apply}</button>
          <Link
            href={isSearch && categorySlug ? `${action}?kategori=${categorySlug}` : action}
            className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100"
          >
            {t.catalog.reset}
          </Link>
        </div>
      </form>
      <div>
        {subs && (
          <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
            {[undefined, ...subs].map((s) => {
              const active = (params.jenis ?? undefined) === s;
              return (
                <Link
                  key={s ?? "all"}
                  href={chipHref(s)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ${
                    active ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-black/10 hover:ring-ink"
                  }`}
                >
                  {s ? t.subcategories[s] : t.catalog.allTypes}
                </Link>
              );
            })}
          </div>
        )}
        <p className="mb-3 text-sm text-neutral-500">{t.catalog.found(result.length)}</p>
        {result.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-neutral-500 ring-1 ring-black/5">{t.catalog.empty}</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {result.map((p) => (
              <ProductCard key={p.slug} p={p} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
