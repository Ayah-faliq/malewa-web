// Aturan biaya yang dipakai bersama oleh tampilan checkout dan server.
export const SHIPPING_FEE = 25000;
export const SERVICE_FEE = 5000;
export const PROMO_CODE = "MALEWA10";
export const PROMO_RATE = 0.1;

export const PAYMENT_METHODS = [
  { id: "va-bni", icon: "🏦" },
  { id: "va-bsi", icon: "🏦" },
  { id: "va-nagari", icon: "🏦" },
  { id: "qris", icon: "📱" },
  { id: "ewallet", icon: "👛" },
  { id: "cc", icon: "💳" },
] as const;

export function isValidPromo(code: string | undefined | null) {
  return (code ?? "").trim().toUpperCase() === PROMO_CODE;
}

export function totals(subtotal: number, opts: { promo: boolean; shipping: boolean }) {
  const discount = opts.promo ? Math.round(subtotal * PROMO_RATE) : 0;
  const shipping = opts.shipping ? SHIPPING_FEE : 0;
  return { subtotal, discount, shipping, serviceFee: SERVICE_FEE, total: subtotal - discount + shipping + SERVICE_FEE };
}
