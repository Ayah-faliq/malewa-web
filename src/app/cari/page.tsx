import type { Metadata } from "next";
import { getCategory, products } from "@/data/products";
import Catalog, { type CatalogParams } from "@/components/Catalog";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: `${t.search.resultsFor} - Malewa Holiday` };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<CatalogParams> }) {
  const params = await searchParams;
  const { locale, t } = await getI18n();
  const cat = params.kategori ? getCategory(params.kategori) : undefined;
  const list = cat ? products.filter((p) => p.category === cat.slug) : products;
  const title = [params.q && `"${params.q}"`, params.kota, cat && t.categories[cat.slug].name].filter(Boolean).join(" · ");
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold">{title ? `${t.search.resultsFor}: ${title}` : t.search.all}</h1>
      <Catalog products={list} params={params} action="/cari" locale={locale} categorySlug={cat?.slug} />
    </div>
  );
}
