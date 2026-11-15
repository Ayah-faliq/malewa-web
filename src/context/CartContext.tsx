"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/data/products";

export type CartItem = {
  id: string;
  productSlug: string;
  qty: number;
  /** Jumlah malam/hari, 1 untuk produk tanpa durasi */
  duration: number;
  date?: string;
};

export type CartLine = CartItem & { product: Product; subtotal: number };

export type Order = {
  code: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string; address?: string; note?: string };
  payment: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  serviceFee: number;
  total: number;
};

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
const KEY = "malewa_cart_v1";

export function lineSubtotal(item: CartItem, product: Product) {
  return product.price * item.qty * Math.max(1, item.duration);
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
        (i) => i.productSlug === item.productSlug && i.date === item.date && i.duration === item.duration,
      );
      if (same) return prev.map((i) => (i === same ? { ...i, qty: i.qty + item.qty } : i));
      return [...prev, { ...item, id: Math.random().toString(36).slice(2, 10) }];
    });
  }, []);

  const update = useCallback((id: string, patch: Partial<CartItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const lines: CartLine[] = items.flatMap((i) => {
      const product = getProduct(i.productSlug);
      return product ? [{ ...i, product, subtotal: lineSubtotal(i, product) }] : [];
    });
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

const ORDERS_KEY = "malewa_orders_v1";

export function saveOrder(order: Order) {
  try {
    const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as Order[];
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...all].slice(0, 20)));
  } catch {}
}

export function loadOrder(code: string): Order | undefined {
  try {
    const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as Order[];
    return all.find((o) => o.code === code);
  } catch {
    return undefined;
  }
}
