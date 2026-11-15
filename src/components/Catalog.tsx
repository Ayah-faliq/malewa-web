import Link from "next/link";
import { cities, type Product } from "@/data/products";
import ProductCard from "./ProductCard";

export type CatalogParams = { q?: string; kota?: string; urut?: string; kategori?: string };

export function filterProducts(list: Product[], { q, kota, urut }: CatalogParams) {
  let out = list;
  if (q) {
    const s = q.toLowerCase();
    out = out.filter((p) =>
      [p.name, p.city, p.province, p.partner, p.description].some((f) => f.toLowerCase().includes(s)),
    );
  }
  if (kota) out = out.filter((p) => p.city === kota);
  if (urut === "termurah") out = [...out].sort((a, b) => a.price - b.price);
  else if (urut === "termahal") out = [...out].sort((a, b) => b.price - a.price);
  else if (urut === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
  else out = [...out].sort((a, b) => b.reviews - a.reviews);
  return out;
}

/** Katalog dengan filter berbasis query string (tanpa JavaScript tambahan). */
export default function Catalog({
  products,
  params,
  action,
  hidden,
}: {
  products: Product[];
  params: CatalogParams;
  action: string;
  hidden?: Record<string, string>;
}) {
  const result = filterProducts(products, params);
  const availableCities = cities.filter((c) => products.some((p) => p.city === c));
  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <form action={action} className="h-fit space-y-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 md:sticky md:top-32">
        {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500">Kata kunci</label>
          <input name="q" defaultValue={params.q} placeholder="Cari..." className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500">Daerah</label>
          <select name="kota" defaultValue={params.kota ?? ""} className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-sm outline-none">
            <option value="">Semua daerah</option>
            {availableCities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500">Urutkan</label>
          <select name="urut" defaultValue={params.urut ?? ""} className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-sm outline-none">
            <option value="">Paling populer</option>
            <option value="rating">Rating tertinggi</option>
            <option value="termurah">Harga termurah</option>
            <option value="termahal">Harga termahal</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-ink py-2 text-sm font-bold text-white hover:bg-black">Terapkan</button>
          <Link href={hidden?.kategori ? `${action}?kategori=${hidden.kategori}` : action} className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100">
            Reset
          </Link>
        </div>
      </form>
      <div>
        <p className="mb-3 text-sm text-neutral-500">{result.length} produk ditemukan</p>
        {result.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-neutral-500 ring-1 ring-black/5">
            Belum ada produk yang cocok. Coba kata kunci atau daerah lain.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {result.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
