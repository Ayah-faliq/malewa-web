import { categories } from "@/data/catalog";
import { getDict, type Locale } from "@/i18n/dictionaries";

export default function SearchBox({ locale, cities }: { locale: Locale; cities: string[] }) {
  const t = getDict(locale);
  const field = "rounded-xl bg-neutral-100 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand";
  return (
    <form action="/cari" className="grid gap-2 rounded-2xl bg-white p-3 text-ink shadow-xl md:grid-cols-[1fr_180px_180px_auto]">
      <input name="q" placeholder={t.searchBox.placeholder} className={`${field} px-4`} />
      <select name="kategori" defaultValue="" className={field}>
        <option value="">{t.searchBox.allCategories}</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {t.categories[c.slug].name}
          </option>
        ))}
      </select>
      <select name="kota" defaultValue="" className={field}>
        <option value="">{t.searchBox.allRegions}</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button className="rounded-xl bg-accent px-6 py-3 font-bold text-white hover:brightness-110">{t.searchBox.search}</button>
    </form>
  );
}
