"use client";

import { createContext, useContext } from "react";
import { getDict, type Locale } from "./dictionaries";

const LocaleCtx = createContext<Locale>("id");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleCtx.Provider value={locale}>{children}</LocaleCtx.Provider>;
}

export function useI18n() {
  const locale = useContext(LocaleCtx);
  return { locale, t: getDict(locale) };
}
