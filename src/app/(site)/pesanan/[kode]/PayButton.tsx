"use client";

import { useTransition } from "react";
import { simulatePayment } from "./actions";

export default function PayButton({ code, label }: { code: string; label: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(() => simulatePayment(code))}
      className="mt-4 w-full rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110 disabled:opacity-60"
    >
      {pending ? "…" : label}
    </button>
  );
}
