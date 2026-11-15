import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory, productsByCategory } from "@/data/products";
import Catalog, { type CatalogParams } from "@/components/Catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const cat = getCategory((await params).slug);
  return { title: cat ? `${cat.name} - Malewa Holiday` : "Malewa Holiday" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<CatalogParams>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl">
          {cat.emoji} {cat.name}
        </h1>
        <p className="text-neutral-500">{cat.tagline} di Sumatera Barat dan sekitarnya</p>
      </div>
      <Catalog products={productsByCategory(cat.slug)} params={await searchParams} action={`/kategori/${cat.slug}`} />
    </div>
  );
}
