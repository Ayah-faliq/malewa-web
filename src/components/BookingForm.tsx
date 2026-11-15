"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCategory, getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { rupiah } from "@/lib/format";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function BookingForm({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  const cat = getCategory(p.category)!;
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [duration, setDuration] = useState(1);
  const [date, setDate] = useState(todayPlus(1));
  const [added, setAdded] = useState(false);

  const total = p.price * qty * (cat.durationLabel ? duration : 1);

  function submit(goToCart: boolean) {
    add({
      productSlug: p.slug,
      qty,
      duration: cat.durationLabel ? duration : 1,
      date: cat.dateLabel ? date : undefined,
    });
    if (goToCart) router.push("/keranjang");
    else {
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      {p.originalPrice && <p className="text-sm text-neutral-400 line-through">{rupiah(p.originalPrice)}</p>}
      <p className="text-2xl font-extrabold text-accent">
        {rupiah(p.price)}
        <span className="text-sm font-normal text-neutral-500"> {p.unit}</span>
      </p>

      <div className="mt-4 space-y-3">
        {cat.dateLabel && (
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-neutral-500">{cat.dateLabel}</span>
            <input
              type="date"
              value={date}
              min={todayPlus(0)}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg bg-neutral-100 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            />
          </label>
        )}
        {cat.durationLabel && (
          <Stepper label={`Lama (${cat.durationLabel})`} value={duration} onChange={setDuration} max={30} />
        )}
        <Stepper label={cat.qtyLabel} value={qty} onChange={setQty} max={99} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-neutral-500">Total</span>
        <span className="text-xl font-extrabold">{rupiah(total)}</span>
      </div>

      <div className="mt-4 grid gap-2">
        <button onClick={() => submit(true)} className="rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110">
          Pesan sekarang
        </button>
        <button onClick={() => submit(false)} className="rounded-xl border-2 border-ink py-3 font-bold hover:bg-ink hover:text-white">
          {added ? "✔ Ditambahkan ke keranjang" : "+ Keranjang"}
        </button>
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max: number;
}) {
  return (
    <div>
      <span className="mb-1 block text-xs font-bold text-neutral-500">{label}</span>
      <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-1">
        <button
          type="button"
          aria-label={`Kurangi ${label}`}
          onClick={() => onChange(Math.max(1, value - 1))}
          className="h-8 w-8 rounded-md bg-white font-bold shadow-sm disabled:opacity-40"
          disabled={value <= 1}
        >
          −
        </button>
        <span className="font-bold">{value}</span>
        <button
          type="button"
          aria-label={`Tambah ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-8 w-8 rounded-md bg-white font-bold shadow-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}
