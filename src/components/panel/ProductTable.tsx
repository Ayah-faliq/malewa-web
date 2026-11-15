import Link from "next/link";
import { toggleProductStatus } from "@/app/(panel)/product-actions";
import { getDict } from "@/i18n/dictionaries";
import { rupiah } from "@/lib/format";
import ProductImage from "@/components/ProductImage";
import { Badge } from "./ui";

type Row = {
  id: string; slug: string; name: string; category: string; sub: string | null; price: number; unit: string; status: string;
  imageUrl: string | null; emoji: string; colorFrom: string; colorTo: string; stock: number | null; partner?: { name: string };
};

export default function ProductTable({ products, editBase }: { products: Row[]; editBase: string }) {
  const t = getDict("id");
  if (products.length === 0) return <p className="py-6 text-center text-sm text-neutral-500">Belum ada produk.</p>;
  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="text-left text-xs text-neutral-500">
          <tr className="border-b">
            <th className="px-5 py-2">Produk</th>
            <th className="px-2 py-2">Harga</th>
            <th className="px-2 py-2">Stok</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-5 py-2 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="px-5 py-2">
                <div className="flex items-center gap-3">
                  <ProductImage colors={[p.colorFrom, p.colorTo]} emoji={p.emoji} src={p.imageUrl} className="h-10 w-14 shrink-0 rounded-lg" size="text-lg" />
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-semibold">{p.name}</p>
                    <p className="text-xs text-neutral-500">
                      {p.sub ? t.subcategories[p.sub] : t.categories[p.category]?.name}
                      {p.partner && ` · ${p.partner.name}`}
                    </p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-2 py-2">
                {rupiah(p.price)}
                <span className="text-xs text-neutral-400"> {t.units[p.unit]}</span>
              </td>
              <td className="px-2 py-2">{p.stock ?? "∞"}</td>
              <td className="px-2 py-2"><Badge status={p.status} /></td>
              <td className="whitespace-nowrap px-5 py-2 text-right">
                <form action={toggleProductStatus.bind(null, p.id)} className="inline">
                  <button className="mr-3 text-xs text-neutral-500 hover:text-ink">{p.status === "PUBLISHED" ? "Sembunyikan" : "Tayangkan"}</button>
                </form>
                <Link href={`${editBase}/${p.id}`} className="rounded-lg bg-ink px-3 py-1.5 text-xs font-bold text-white">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
