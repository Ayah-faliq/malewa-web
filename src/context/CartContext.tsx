"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/catalog";

/**
 * Item keranjang menyimpan salinan produk untuk ditampilkan.
 * Harga final selalu dihitung ulang dari database saat checkout (lihat src/app/checkout/actions.ts).
 */
export type CartItem = {
  id: string;
  product: Product;
  qty: number;
  /** Jumlah malam/hari, 1 untuk produk tanpa durasi */
  duration: number;
  date?: string;
};

export type CartLine = CartItem & { subtotal: number };

type CartCtx = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (item: Omit<CartItem, "id">) => void;
  update: (id: string, patch: Partial<CartItem>) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "malewa_cart_v2";

export function lineSubtotal(item: Pick<CartItem, "qty" | "duration">, price: number) {
  return price * item.qty * Math.max(1, item.duration);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const same = prev.find(
        (i) => i.product.id === item.product.id && i.date === item.date && i.duration === item.duration,
      );
      if (same) return prev.map((i) => (i === same ? { ...i, product: item.product, qty: i.qty + item.qty } : i));
      return [...prev, { ...item, id: Math.random().toString(36).slice(2, 10) }];
    });
  }, []);

  const update = useCallback((id: string, patch: Partial<CartItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const lines: CartLine[] = items.map((i) => ({ ...i, subtotal: lineSubtotal(i, i.product.price) }));
    return {
      items,
      lines,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.subtotal, 0),
      ready,
      add,
      update,
      remove,
      clear,
    };
  }, [items, ready, add, update, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart harus dipakai di dalam CartProvider");
  return c;
}
