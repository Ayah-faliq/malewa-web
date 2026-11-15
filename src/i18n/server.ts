import { cookies, headers } from "next/headers";
import { defaultLocale, getDict, isLocale, LOCALE_COOKIE, type Locale } from "./dictionaries";

/** Bahasa dari cookie; jika belum dipilih, tebak dari Accept-Language browser. */
export async function getLocale(): Promise<Locale> {
  const c = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(c)) return c;
  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  const first = accept.split(",")[0]?.trim() ?? "";
  if (first.startsWith("ms")) return "ms";
  if (first.startsWith("en")) return "en";
  return defaultLocale;
}

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: getDict(locale) };
}
