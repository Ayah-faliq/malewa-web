"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count, ready } = useCart();
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-ink text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0" aria-label="Malewa Holiday - Beranda">
          <Image src="/logo.png" alt="Malewa Holiday" width={140} height={56} priority className="h-10 w-auto" />
        </Link>
        <form action="/cari" className="hidden flex-1 md:block">
          <input
            name="q"
            placeholder="Cari destinasi, penginapan, bus, atau oleh-oleh..."
            className="w-full rounded-full bg-white/10 px-4 py-2 text-sm placeholder:text-white/50 outline-none ring-brand focus:ring-2"
          />
        </form>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/keranjang"
            className="relative flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-ink hover:bg-brand-dark"
          >
            <span aria-hidden>🛒</span>
            <span className="hidden sm:inline">Keranjang</span>
            {ready && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      <nav className="border-t border-white/10">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 text-sm">
          {categories.map((c) => {
            const active = path?.startsWith(`/kategori/${c.slug}`);
            return (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className={`whitespace-nowrap border-b-2 px-3 py-2 ${
                  active ? "border-brand text-brand" : "border-transparent text-white/80 hover:text-white"
                }`}
              >
                {c.emoji} {c.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
