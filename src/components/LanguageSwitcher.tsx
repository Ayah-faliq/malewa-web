"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, localeMeta, locales, type Locale } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/client";

export default function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, start] = useTransition();

  function change(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    start(() => router.refresh());
  }

  return (
    <label className={`relative flex items-center ${pending ? "opacity-60" : ""}`}>
      <span className="sr-only">{t.nav.language}</span>
      <select
        value={locale}
        onChange={(e) => change(e.target.value as Locale)}
        className="cursor-pointer appearance-none rounded-full bg-white/10 py-2 pl-3 pr-7 text-sm font-semibold text-white outline-none hover:bg-white/20 focus:ring-2 focus:ring-brand"
        aria-label={t.nav.language}
      >
        {locales.map((l) => (
          <option key={l} value={l} className="text-ink">
            {localeMeta[l].flag} {localeMeta[l].short}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 text-[10px] text-white/70">▼</span>
    </label>
  );
}
