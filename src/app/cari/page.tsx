import { getCategory, products } from "@/data/products";
import Catalog, { type CatalogParams } from "@/components/Catalog";

export const metadata = { title: "Cari - Malewa Holiday" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<CatalogParams> }) {
  const params = await searchParams;
  const cat = params.kategori ? getCategory(params.kategori) : undefined;
  const list = cat ? products.filter((p) => p.category === cat.slug) : products;
  const title = [params.q && `"${params.q}"`, params.kota, cat?.name].filter(Boolean).join(" · ");
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold">{title ? `Hasil pencarian: ${title}` : "Semua produk"}</h1>
      <Catalog products={list} params={params} action="/cari" hidden={cat ? { kategori: cat.slug } : undefined} />
    </div>
  );
}
