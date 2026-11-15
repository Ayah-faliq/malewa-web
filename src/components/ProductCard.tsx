import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { rupiah } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ p }: { p: Product }) {
  const cat = getCategory(p.category);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  return (
    <Link
      href={`/produk/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative">
        <ProductImage colors={p.colors} emoji={p.emoji} className="aspect-[4/3]" />
        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">
          {cat?.name}
        </span>
        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-white">
            Hemat {discount}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-accent">{p.name}</h3>
        <p className="mt-1 text-xs text-neutral-500">
          📍 {p.city}
          {p.province !== "Sumatera Barat" && `, ${p.province}`}
        </p>
        <p className="mt-1 text-xs">
          <span className="font-semibold text-amber-600">★ {p.rating.toFixed(1)}</span>{" "}
          <span className="text-neutral-400">({p.reviews.toLocaleString("id-ID")} ulasan)</span>
        </p>
        <div className="mt-auto pt-2">
          {p.originalPrice && <p className="text-xs text-neutral-400 line-through">{rupiah(p.originalPrice)}</p>}
          <p className="font-extrabold text-accent">
            {rupiah(p.price)}
            <span className="text-xs font-normal text-neutral-500"> {p.unit}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
