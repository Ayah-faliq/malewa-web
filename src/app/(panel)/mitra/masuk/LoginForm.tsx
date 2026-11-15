"use client";

import { useActionState } from "react";
import { login } from "../../actions";
import { Field, inputCls } from "@/components/panel/ui";
import { keepValuesSubmit } from "@/components/panel/submit";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form onSubmit={keepValuesSubmit(action)} className="space-y-4">
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" className={inputCls} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="current-password" className={inputCls} />
      </Field>
      {state?.error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110 disabled:opacity-60">
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
