import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory } from "@/data/catalog";
import { getProductBySlug, listProducts } from "@/data/repo";
import { localizeProduct } from "@/data/localize";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import BookingForm from "@/components/BookingForm";
import { getI18n } from "@/i18n/server";
import { count } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { locale } = await getI18n();
  const raw = await getProductBySlug((await params).slug);
  if (!raw) return { title: "Malewa Holiday" };
  const p = localizeProduct(raw, locale);
  return { title: `${p.name} - Malewa Holiday`, description: p.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const raw = await getProductBySlug((await params).slug);
  if (!raw) notFound();
  const { locale, t } = await getI18n();
  const p = localizeProduct(raw, locale);
  const cat = getCategory(p.category)!;
  const catText = t.categories[cat.slug];
  const related = (await listProducts({ category: p.category, NOT: { slug: p.slug } }))
    .sort((a, b) => Number(b.sub === p.sub) - Number(a.sub === p.sub))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav className="mb-4 text-sm text-neutral-500">
        <Link href="/" className="hover:text-accent">{t.nav.home}</Link> /{" "}
        <Link href={`/kategori/${cat.slug}`} className="hover:text-accent">{catText.name}</Link> /{" "}
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
            <ProductImage colors={p.colors} emoji={p.emoji} src={p.imageUrl} alt={p.name} className="col-span-4 row-span-2 h-64 md:col-span-3 md:h-80" size="text-8xl" />
            <ProductImage colors={[p.colors[1], p.colors[0]]} emoji="📸" className="hidden md:flex" size="text-3xl" />
            <ProductImage colors={[p.colors[0], "#111111"]} emoji="🗺️" className="hidden md:flex" size="text-3xl" />
          </div>

          <div className="mt-5">
            <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-bold">
              {cat.emoji} {catText.name}
              {p.sub && ` · ${t.subcategories[p.sub]}`}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">{p.name}</h1>
            <p className="mt-1 text-sm text-neutral-600">
              📍 {p.city}, {p.province} · <span className="font-semibold text-amber-600">★ {p.rating.toFixed(1)}</span>{" "}
              ({count(p.reviews, locale)} {t.card.reviews})
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {t.product.partner}: <b className="text-ink">{p.partner}</b> ✅ {t.product.verified}
            </p>
          </div>

          <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <h2 className="mb-2 text-lg font-bold">{t.product.about}</h2>
            <p className="leading-relaxed text-neutral-700">{p.description}</p>
            <h3 className="mb-2 mt-5 font-bold">{t.product.whatYouGet}</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm"><span className="text-green-600">✔</span>{h}</li>
              ))}
            </ul>
          </section>

          <section className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <h2 className="mb-2 text-lg font-bold">{t.product.policy}</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
              {(cat.needsShipping ? t.product.policyShop : t.product.policyBooking).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <BookingForm product={raw} />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-extrabold">{t.product.others(catText.name)}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} p={r} locale={locale} />)}
          </div>
        </section>
      )}
    </div>
  );
}
