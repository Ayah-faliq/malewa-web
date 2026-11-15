import { localeMeta, type Locale } from "@/i18n/dictionaries";

/** Harga selalu dalam Rupiah (IDR), format angka Indonesia. */
export function rupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export function tanggal(iso: string, locale: Locale = "id") {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString(localeMeta[locale].intl, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function count(n: number, locale: Locale) {
  return n.toLocaleString(localeMeta[locale].intl);
}
