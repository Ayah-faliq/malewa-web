import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/i18n/client";
import { getI18n } from "@/i18n/server";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const display = Alfa_Slab_One({ variable: "--font-display-face", subsets: ["latin"], weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.meta.title, description: t.meta.description, icons: { icon: "/logo.png" } };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale } = await getI18n();
  return (
    <html lang={locale}>
      <body className={`${jakarta.variable} ${display.variable} font-sans antialiased`}>
        <LocaleProvider locale={locale}>
          <CartProvider>
            {children}
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
