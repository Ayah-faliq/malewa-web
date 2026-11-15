import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCategory, type Product } from "@/data/catalog";
import { localizeProduct } from "@/data/localize";
import { toProduct } from "@/data/repo";
import { getI18n } from "@/i18n/server";
import { rupiah, tanggal } from "@/lib/format";
import PayButton from "./PayButton";

export const metadata = { robots: { index: false } };

export default async function OrderPage({ params }: { params: Promise<{ kode: string }> }) {
  const { kode } = await params;
  const { locale, t } = await getI18n();
  const order = await db.order.findUnique({
    where: { code: kode },
    include: { items: { include: { product: { include: { partner: { select: { name: true } } } } } } },
  });
  if (!order) notFound();

  const paid = order.status === "PAID";
  const paymentLabel = t.checkout.payments[order.payment] ?? order.payment;
  const va = "8808" + order.customerPhone.replace(/\D/g, "").slice(-10).padStart(10, "0");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className={`rounded-2xl p-6 text-center text-white ${paid ? "bg-green-600" : "bg-ink"}`}>
        <p className="text-5xl">{paid ? "🎉" : "⏳"}</p>
        <h1 className="mt-2 text-2xl font-extrabold">{paid ? t.order.paidTitle : t.order.payTitle}</h1>
        <p className="mt-1 text-sm opacity-80">
          {t.order.code} <b className="text-brand">{order.code}</b>
        </p>
      </div>

      {!paid && (
        <section className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <p className="text-sm text-neutral-500">
            {t.order.method}: <b className="text-ink">{paymentLabel}</b>
          </p>
          {order.payment.startsWith("va-") && (
            <p className="mt-2">
              {t.order.va}: <span className="font-mono text-xl font-bold tracking-wider">{va}</span>
            </p>
          )}
          <p className="mt-2 text-sm">
            {t.order.amountDue}: <b className="text-xl text-accent">{rupiah(order.total)}</b>
          </p>
          <p className="mt-1 text-xs text-neutral-500">{t.order.payWithin}</p>
          <PayButton code={order.code} label={t.order.simulate} />
        </section>
      )}

      <section className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <h2 className="mb-3 font-bold">{paid ? t.order.voucherTitle : t.order.detailTitle}</h2>
        <ul className="space-y-3">
          {order.items.map((it) => {
            const p: Product = localizeProduct(toProduct(it.product), locale);
            const cat = getCategory(p.category)!;
            const text = t.categories[cat.slug];
            return (
              <li key={it.id} className="rounded-xl border border-dashed border-neutral-300 p-3">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-neutral-400">
                      {p.sub ? t.subcategories[p.sub] : text.name} · {p.partner}
                    </p>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs text-neutral-500">
                      {it.qty}x{cat.hasDuration ? ` · ${it.duration} ${text.durationLabel}` : ""}
                      {it.date ? ` · ${tanggal(it.date, locale)}` : ""}
                    </p>
                  </div>
                  <p className="font-semibold">{rupiah(it.subtotal)}</p>
                </div>
                {paid && (
                  <p className="mt-2 rounded-lg bg-brand/20 px-3 py-1 font-mono text-sm">
                    {cat.needsShipping ? t.order.shippingStatus : `🎫 ${t.order.voucher}: ${it.voucherCode}`}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 space-y-1 border-t pt-3 text-sm">
          <div className="flex justify-between"><dt>{t.checkout.subtotal}</dt><dd>{rupiah(order.subtotal)}</dd></div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-700"><dt>{t.checkout.discount}</dt><dd>−{rupiah(order.discount)}</dd></div>
          )}
          {order.shipping > 0 && <div className="flex justify-between"><dt>{t.checkout.shipping}</dt><dd>{rupiah(order.shipping)}</dd></div>}
          <div className="flex justify-between"><dt>{t.checkout.serviceFee}</dt><dd>{rupiah(order.serviceFee)}</dd></div>
          <div className="flex justify-between pt-1 text-base font-extrabold"><dt>{t.checkout.total}</dt><dd>{rupiah(order.total)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-neutral-500">
          {t.order.customer}: {order.customerName} · {order.customerEmail} · {order.customerPhone}
          {order.address && (
            <>
              <br />
              {t.order.address}: {order.address}
            </>
          )}
        </p>
      </section>

      <Link href="/" className="mt-6 block text-center font-bold text-accent hover:underline">
        {t.order.back}
      </Link>
    </div>
  );
}
