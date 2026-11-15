"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getCategory } from "@/data/products";
import { rupiah, tanggal } from "@/lib/format";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const { lines, subtotal, update, remove, ready } = useCart();

  if (!ready) return <div className="mx-auto max-w-6xl px-4 py-10 text-neutral-500">Memuat keranjang...</div>;

  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 text-2xl font-extrabold">Keranjang masih kosong</h1>
        <p className="mt-2 text-neutral-500">Yuk cari destinasi, penginapan, atau oleh-oleh favoritmu.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-bold text-white">
          Mulai jelajah
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold">Keranjang</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-3">
          {lines.map((l) => {
            const cat = getCategory(l.product.category)!;
            return (
              <li key={l.id} className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
                <Link href={`/produk/${l.product.slug}`} className="shrink-0">
                  <ProductImage colors={l.product.colors} emoji={l.product.emoji} className="h-20 w-20 rounded-xl sm:h-24 sm:w-28" size="text-3xl" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase text-neutral-400">{cat.name}</p>
                  <Link href={`/produk/${l.product.slug}`} className="line-clamp-1 font-bold hover:text-accent">
                    {l.product.name}
                  </Link>
                  <p className="text-xs text-neutral-500">
                    {l.date && <>📅 {tanggal(l.date)} · </>}
                    {cat.durationLabel && <>{l.duration} {cat.durationLabel} · </>}
                    {rupiah(l.product.price)} {l.product.unit}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-lg bg-neutral-100">
                      <button aria-label="Kurangi" className="px-3 py-1 font-bold" onClick={() => l.qty > 1 && update(l.id, { qty: l.qty - 1 })}>−</button>
                      <span className="w-6 text-center text-sm font-bold">{l.qty}</span>
                      <button aria-label="Tambah" className="px-3 py-1 font-bold" onClick={() => update(l.id, { qty: l.qty + 1 })}>+</button>
                    </div>
                    <button onClick={() => remove(l.id)} className="text-xs text-red-600 hover:underline">Hapus</button>
                  </div>
                </div>
                <p className="shrink-0 font-extrabold">{rupiah(l.subtotal)}</p>
              </li>
            );
          })}
        </ul>
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 lg:sticky lg:top-32">
          <h2 className="font-bold">Ringkasan</h2>
          <div className="mt-3 flex justify-between text-sm">
            <span>Subtotal ({lines.length} item)</span>
            <span className="font-bold">{rupiah(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">Ongkir & biaya layanan dihitung di checkout.</p>
          <Link href="/checkout" className="mt-4 block rounded-xl bg-accent py-3 text-center font-bold text-white hover:brightness-110">
            Lanjut ke checkout
          </Link>
          <Link href="/" className="mt-2 block text-center text-sm text-neutral-500 hover:underline">
            Tambah produk lain
          </Link>
        </aside>
      </div>
    </div>
  );
}
