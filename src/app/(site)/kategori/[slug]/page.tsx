import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory } from "@/data/catalog";
import { listProducts } from "@/data/repo";
import Catalog, { type CatalogParams } from "@/components/Catalog";
import { getI18n } from "@/i18n/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { t } = await getI18n();
  const cat = getCategory((await params).slug);
  return { title: cat ? `${t.categories[cat.slug].name} - Malewa Holiday` : "Malewa Holiday" };
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
  const { locale, t } = await getI18n();
  const text = t.categories[cat.slug];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl">
          {cat.emoji} {text.name}
        </h1>
        <p className="text-neutral-500">
          {text.tagline} {t.catalog.inRegion}
        </p>
      </div>
      <Catalog
        products={await listProducts({ category: cat.slug })}
        params={await searchParams}
        action={`/kategori/${cat.slug}`}
        locale={locale}
        categorySlug={cat.slug}
      />
    </div>
  );
}
