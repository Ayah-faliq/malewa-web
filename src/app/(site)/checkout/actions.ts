"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { getCategory } from "@/data/catalog";
import { isValidPromo, PAYMENT_METHODS, totals } from "@/lib/pricing";
import { isLocale } from "@/i18n/dictionaries";

const schema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.email(),
    phone: z.string().trim().regex(/^[0-9+ ]{9,16}$/),
    address: z.string().trim().max(500).optional(),
    note: z.string().trim().max(500).optional(),
  }),
  payment: z.enum(PAYMENT_METHODS.map((p) => p.id) as [string, ...string[]]),
  promo: z.string().optional(),
  locale: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        qty: z.number().int().min(1).max(99),
        duration: z.number().int().min(1).max(30),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }),
    )
    .min(1)
    .max(50),
});

export type CreateOrderInput = z.input<typeof schema>;
export type CreateOrderResult = { ok: true; code: string } | { ok: false; error: "invalid" | "unavailable" | "address" };

function orderCode() {
  return "MLW" + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2, 4).toUpperCase();
}

/** Membuat pesanan. Harga diambil dari database, bukan dari browser. */
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { customer, payment, promo, items, locale } = parsed.data;

  const products = await db.product.findMany({
    where: { id: { in: items.map((i) => i.productId) }, status: "PUBLISHED", partner: { status: "ACTIVE" } },
  });
  const byId = new Map(products.map((p) => [p.id, p]));
  if (items.some((i) => !byId.has(i.productId))) return { ok: false, error: "unavailable" };

  const lines = items.map((i) => {
    const p = byId.get(i.productId)!;
    const cat = getCategory(p.category);
    const duration = cat?.hasDuration ? i.duration : 1;
    return {
      productId: p.id,
      productName: p.name,
      price: p.price,
      qty: i.qty,
      duration,
      date: cat?.hasDate ? i.date : undefined,
      subtotal: p.price * i.qty * duration,
    };
  });
  const needsShipping = items.some((i) => getCategory(byId.get(i.productId)!.category)?.needsShipping);
  if (needsShipping && !customer.address) return { ok: false, error: "address" };

  const sums = totals(
    lines.reduce((n, l) => n + l.subtotal, 0),
    { promo: isValidPromo(promo), shipping: needsShipping },
  );

  const order = await db.order.create({
    data: {
      code: orderCode(),
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      address: needsShipping ? customer.address : null,
      note: customer.note || null,
      locale: isLocale(locale) ? locale : "id",
      payment,
      ...sums,
      items: { create: lines },
    },
  });
  return { ok: true, code: order.code };
}
