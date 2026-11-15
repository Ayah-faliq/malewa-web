import { categories, cities } from "@/data/products";

export default function SearchBox() {
  return (
    <form action="/cari" className="grid gap-2 rounded-2xl bg-white p-3 text-ink shadow-xl md:grid-cols-[1fr_180px_180px_auto]">
      <input
        name="q"
        placeholder="Mau ke mana? Contoh: Jam Gadang, Mentawai, rendang"
        className="rounded-xl bg-neutral-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
      />
      <select name="kategori" defaultValue="" className="rounded-xl bg-neutral-100 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand">
        <option value="">Semua kategori</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="kota" defaultValue="" className="rounded-xl bg-neutral-100 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand">
        <option value="">Semua daerah</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button className="rounded-xl bg-accent px-6 py-3 font-bold text-white hover:brightness-110">Cari</button>
    </form>
  );
}
