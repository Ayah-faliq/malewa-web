"use client";

import { startTransition, type FormEvent } from "react";

/**
 * Kirim form ke server action tanpa mengosongkan isian (React mereset form yang memakai prop action).
 * Jadi jika ada error validasi, mitra tidak perlu mengetik ulang.
 */
export function keepValuesSubmit(action: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
}
