import Link from "next/link";
import { categories, pickFeatured, popularCities } from "@/data/catalog";
import { listCities, listProducts } from "@/data/repo";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import SearchBox from "@/components/SearchBox";
import { getI18n } from "@/i18n/server";
import { localizeProduct } from "@/data/localize";

export default async function Home() {
  const { locale, t } = await getI18n();
  const [products, cities] = await Promise.all([listProducts(), listCities()]);
  const promos = products.filter((p) => p.originalPrice);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 15% 20%, #e8572a 0, transparent 45%), radial-gradient(ellipse at 85% 70%, #fbb900 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16">
          <p className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand">
            {t.hero.badge}
          </p>
          <h1 className="font-display text-[1.75rem] leading-tight md:text-5xl">
            {t.hero.title1}
            <br />
            <span className="text-brand">{t.hero.title2}</span>
          </h1>
          <p className="mt-3 max-w-xl text-white/80">
            {t.hero.subtitle}
          </p>
          <div className="mt-6">
            <SearchBox locale={locale} cities={cities} />
          </div>
        </div>
      </section>

      {/* KATEGORI */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-brand"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-2xl">
                {c.emoji}
              </span>
              <span>
                <span className="block font-extrabold">{t.categories[c.slug].name}</span>
                <span className="block text-xs text-neutral-500">{t.categories[c.slug].tagline}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-accent to-brand p-6 text-ink md:flex-row md:items-center">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider">{t.promo.label}</p>
            <h2 className="font-display text-2xl">{t.promo.title}</h2>
            <p className="text-sm">{t.promo.body("MALEWA10")}</p>
          </div>
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {promos.map((p) => (
              <Link key={p.slug} href={`/produk/${p.slug}`} className="w-40 shrink-0 rounded-xl bg-white/90 p-2 text-xs font-semibold hover:bg-white">
                <ProductImage colors={p.colors} emoji={p.emoji} className="mb-1 h-16 rounded-lg" size="text-2xl" />
                <span className="line-clamp-1">{localizeProduct(p, locale).name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PER KATEGORI */}
      {categories.map((c) => (
        <section key={c.slug} className="mx-auto mt-12 max-w-6xl px-4">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-extrabold md:text-2xl">
                {c.emoji} {t.home.popular(t.categories[c.slug].name)}
              </h2>
              <p className="text-sm text-neutral-500">{t.categories[c.slug].tagline}</p>
            </div>
            <Link href={`/kategori/${c.slug}`} className="text-sm font-bold text-accent hover:underline">
              {t.home.seeAll}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {pickFeatured(products.filter((p) => p.category === c.slug))
              .map((p) => (
                <ProductCard key={p.slug} p={p} locale={locale} />
              ))}
          </div>
        </section>
      ))}

      {/* DESTINASI */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="mb-4 text-xl font-extrabold md:text-2xl">{t.home.regions}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {popularCities.map((c) => (
            <Link key={c.name} href={`/cari?kota=${encodeURIComponent(c.name)}`} className="group">
              <div className="overflow-hidden rounded-2xl">
                <ProductImage colors={c.colors} emoji={c.emoji} className="h-28 transition group-hover:scale-105" size="text-3xl" />
              </div>
              <p className="mt-1 text-sm font-bold">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* KENAPA MALEWA */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-black/5 md:grid-cols-3">
          {t.home.why.map(([icon, title, desc]) => (
            <div key={title} className="flex gap-3">
              <span className="text-3xl">{icon}</span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm text-neutral-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
