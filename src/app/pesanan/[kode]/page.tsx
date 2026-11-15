"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { loadOrder, type Order } from "@/context/CartContext";
import { getCategory } from "@/data/products";
import { rupiah, tanggal } from "@/lib/format";

export default function OrderPage({ params }: { params: Promise<{ kode: string }> }) {
  const { kode } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setOrder(loadOrder(kode) ?? null);
  }, [kode]);

  if (order === undefined) return <div className="mx-auto max-w-3xl px-4 py-10 text-neutral-500">Memuat pesanan...</div>;
  if (order === null)
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Pesanan {kode} tidak ditemukan</h1>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-bold text-white">Kembali ke beranda</Link>
      </div>
    );

  const va = "8808" + order.customer.phone.replace(/\D/g, "").slice(-10).padStart(10, "0");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className={`rounded-2xl p-6 text-center ${paid ? "bg-green-600 text-white" : "bg-ink text-white"}`}>
        <p className="text-5xl">{paid ? "🎉" : "⏳"}</p>
        <h1 className="mt-2 text-2xl font-extrabold">{paid ? "Pembayaran berhasil!" : "Selesaikan pembayaran"}</h1>
        <p className="mt-1 text-sm opacity-80">Kode pesanan <b className="text-brand">{order.code}</b></p>
      </div>

      {!paid && (
        <section className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <p className="text-sm text-neutral-500">Metode: <b className="text-ink">{order.payment}</b></p>
          {order.payment.startsWith("Virtual Account") && (
            <p className="mt-2">Nomor VA: <span className="font-mono text-xl font-bold tracking-wider">{va}</span></p>
          )}
          <p className="mt-2 text-sm">
            Total yang harus dibayar: <b className="text-xl text-accent">{rupiah(order.total)}</b>
          </p>
          <p className="mt-1 text-xs text-neutral-500">Bayar dalam 1x24 jam agar pesanan tidak dibatalkan otomatis.</p>
          <button onClick={() => setPaid(true)} className="mt-4 w-full rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110">
            Simulasikan pembayaran berhasil
          </button>
        </section>
      )}

      <section className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <h2 className="mb-3 font-bold">{paid ? "E-voucher & detail pesanan" : "Detail pesanan"}</h2>
        <ul className="space-y-3">
          {order.lines.map((l) => {
            const cat = getCategory(l.product.category)!;
            return (
              <li key={l.id} className="rounded-xl border border-dashed border-neutral-300 p-3">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-neutral-400">{cat.name} · {l.product.partner}</p>
                    <p className="font-bold">{l.product.name}</p>
                    <p className="text-xs text-neutral-500">
                      {l.qty}x{cat.durationLabel ? ` · ${l.duration} ${cat.durationLabel}` : ""}
                      {l.date ? ` · ${tanggal(l.date)}` : ""}
                    </p>
                  </div>
                  <p className="font-semibold">{rupiah(l.subtotal)}</p>
                </div>
                {paid && (
                  <p className="mt-2 rounded-lg bg-brand/20 px-3 py-1 font-mono text-sm">
                    {cat.needsShipping ? "📦 Dikemas, resi menyusul" : `🎫 Voucher: ${order.code}-${l.id.slice(0, 4).toUpperCase()}`}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 space-y-1 border-t pt-3 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{rupiah(order.subtotal)}</dd></div>
          {order.discount > 0 && <div className="flex justify-between text-green-700"><dt>Diskon</dt><dd>−{rupiah(order.discount)}</dd></div>}
          {order.shipping > 0 && <div className="flex justify-between"><dt>Ongkir</dt><dd>{rupiah(order.shipping)}</dd></div>}
          <div className="flex justify-between"><dt>Biaya layanan</dt><dd>{rupiah(order.serviceFee)}</dd></div>
          <div className="flex justify-between pt-1 text-base font-extrabold"><dt>Total</dt><dd>{rupiah(order.total)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-neutral-500">
          Pemesan: {order.customer.name} · {order.customer.email} · {order.customer.phone}
          {order.customer.address && <><br />Alamat: {order.customer.address}</>}
        </p>
      </section>

      <Link href="/" className="mt-6 block text-center font-bold text-accent hover:underline">← Kembali belanja</Link>
    </div>
  );
}
