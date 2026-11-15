"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveOrder, useCart, type Order } from "@/context/CartContext";
import { getCategory } from "@/data/products";
import { rupiah, tanggal } from "@/lib/format";
import { localizeProduct } from "@/data/localize";
import { useI18n } from "@/i18n/client";

const PAYMENTS = [
  { id: "va-bni", icon: "🏦" },
  { id: "va-bsi", icon: "🏦" },
  { id: "va-nagari", icon: "🏦" },
  { id: "qris", icon: "📱" },
  { id: "ewallet", icon: "👛" },
  { id: "cc", icon: "💳" },
];

const SHIPPING = 25000;
const SERVICE_FEE = 5000;
const PROMO_CODE = "MALEWA10";

export default function CheckoutPage() {
  const { lines, subtotal, clear, ready } = useCart();
  const router = useRouter();
  const { locale, t } = useI18n();
  const [payment, setPayment] = useState(PAYMENTS[0].id);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const needsShipping = lines.some((l) => getCategory(l.product.category)?.needsShipping);
  const shipping = needsShipping ? SHIPPING : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping + SERVICE_FEE;

  if (!ready) return <div className="mx-auto max-w-6xl px-4 py-10 text-neutral-500">{t.checkout.loading}</div>;
  if (lines.length === 0 && !submitting)
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">{t.checkout.nothing}</h1>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-bold text-white">{t.checkout.backHome}</Link>
      </div>
    );

  function applyPromo() {
    if (promo.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError(t.checkout.promoInvalid);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSubmitting(true);
    const code = "MLW" + Date.now().toString(36).toUpperCase().slice(-6);
    const order: Order = {
      code,
      createdAt: new Date().toISOString(),
      customer: {
        name: String(f.get("name")),
        email: String(f.get("email")),
        phone: String(f.get("phone")),
        address: needsShipping ? String(f.get("address")) : undefined,
        note: String(f.get("note") || ""),
      },
      payment,
      lines,
      subtotal,
      shipping,
      discount,
      serviceFee: SERVICE_FEE,
      total,
    };
    saveOrder(order);
    // Simulasi proses ke payment gateway
    setTimeout(() => {
      router.push(`/pesanan/${code}`);
      clear();
    }, 800);
  }

  const input = "w-full rounded-lg bg-neutral-100 px-3 py-2.5 outline-none focus:ring-2 focus:ring-brand";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold">{t.checkout.title}</h1>
      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <h2 className="mb-3 font-bold">{t.checkout.step1}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-bold text-neutral-500">{t.checkout.fullName}</span>
                <input name="name" required className={input} placeholder={t.checkout.fullNamePh} />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold text-neutral-500">{t.checkout.email}</span>
                <input name="email" type="email" required className={input} placeholder="nama@email.com" />
              </label>
              <label>
                <span className="mb-1 block text-xs font-bold text-neutral-500">{t.checkout.phone}</span>
                <input name="phone" type="tel" required pattern="[0-9+ ]{9,16}" className={input} placeholder="08xxxxxxxxxx" />
              </label>
              {needsShipping && (
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-xs font-bold text-neutral-500">{t.checkout.address}</span>
                  <textarea name="address" required rows={3} className={input} placeholder={t.checkout.addressPh} />
                </label>
              )}
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-bold text-neutral-500">{t.checkout.note}</span>
                <input name="note" className={input} placeholder={t.checkout.notePh} />
              </label>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <h2 className="mb-3 font-bold">{t.checkout.step2}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 text-sm ${
                    payment === p.id ? "border-accent bg-accent/5" : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} className="accent-[#e8572a]" />
                  <span className="text-xl">{p.icon}</span>
                  <span className="font-semibold">{t.checkout.payments[p.id]}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              {t.checkout.payNote}
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 lg:sticky lg:top-32">
          <h2 className="mb-3 font-bold">{t.checkout.yourOrder}</h2>
          <ul className="space-y-3 border-b pb-3">
            {lines.map((l) => {
              const cat = getCategory(l.product.category)!;
              const text = t.categories[cat.slug];
              return (
                <li key={l.id} className="flex justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-semibold">{localizeProduct(l.product, locale).name}</p>
                    <p className="text-xs text-neutral-500">
                      {l.qty}x{cat.hasDuration ? ` · ${l.duration} ${text.durationLabel}` : ""}
                      {l.date ? ` · ${tanggal(l.date, locale)}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold">{rupiah(l.subtotal)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder={t.checkout.promoPh}
              className="min-w-0 flex-1 rounded-lg bg-neutral-100 px-3 py-2 text-sm uppercase outline-none focus:ring-2 focus:ring-brand"
            />
            <button type="button" onClick={applyPromo} className="rounded-lg bg-ink px-3 text-sm font-bold text-white">
              {t.checkout.apply}
            </button>
          </div>
          {promoError && <p className="mt-1 text-xs text-red-600">{promoError}</p>}
          {promoApplied && <p className="mt-1 text-xs text-green-700">{t.checkout.promoApplied(PROMO_CODE)}</p>}

          <dl className="mt-4 space-y-1 text-sm">
            <Row label={t.checkout.subtotal} value={rupiah(subtotal)} />
            {discount > 0 && <Row label={t.checkout.discount} value={"−" + rupiah(discount)} className="text-green-700" />}
            {needsShipping && <Row label={t.checkout.shipping} value={rupiah(shipping)} />}
            <Row label={t.checkout.serviceFee} value={rupiah(SERVICE_FEE)} />
          </dl>
          <div className="mt-3 flex justify-between border-t pt-3">
            <span className="font-bold">{t.checkout.total}</span>
            <span className="text-xl font-extrabold text-accent">{rupiah(total)}</span>
          </div>
          <button disabled={submitting} className="mt-4 w-full rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110 disabled:opacity-60">
            {submitting ? t.checkout.processing : t.checkout.pay}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Row({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <dt className="text-neutral-600">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
