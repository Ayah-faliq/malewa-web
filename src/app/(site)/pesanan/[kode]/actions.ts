"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

/** Simulasi callback payment gateway: tandai lunas dan terbitkan kode voucher. */
export async function simulatePayment(code: string) {
  const order = await db.order.findUnique({ where: { code }, include: { items: true } });
  if (!order || order.status !== "PENDING_PAYMENT") return;
  await db.$transaction([
    db.order.update({ where: { id: order.id }, data: { status: "PAID", paidAt: new Date() } }),
    ...order.items.map((it, i) =>
      db.orderItem.update({ where: { id: it.id }, data: { voucherCode: `${order.code}-${String(i + 1).padStart(2, "0")}` } }),
    ),
  ]);
  revalidatePath(`/pesanan/${code}`);
}
