"use client";

import { useActionState } from "react";
import { registerPartner } from "../../actions";
import { Field, inputCls } from "@/components/panel/ui";
import { keepValuesSubmit } from "@/components/panel/submit";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(registerPartner, undefined);
  return (
    <form onSubmit={keepValuesSubmit(action)} className="grid gap-4 sm:grid-cols-2">
      <p className="text-sm font-bold sm:col-span-2">Data usaha</p>
      <Field label="Nama usaha" className="sm:col-span-2">
        <input name="businessName" required className={inputCls} placeholder="Contoh: Rendang Uni Ros" />
      </Field>
      <Field label="Jenis usaha">
        <select name="category" className={inputCls} defaultValue="rekreasi">
          <option value="rekreasi">Rekreasi / tempat wisata</option>
          <option value="akomodasi">Akomodasi / penginapan</option>
          <option value="transportasi">Transportasi / rental</option>
          <option value="pasa">Oleh-oleh / perlengkapan trip</option>
        </select>
      </Field>
      <Field label="No. WhatsApp usaha">
        <input name="phone" type="tel" required className={inputCls} placeholder="08xxxxxxxxxx" />
      </Field>
      <Field label="Kota / kabupaten">
        <input name="city" required className={inputCls} placeholder="Contoh: Bukittinggi" />
      </Field>
      <Field label="Provinsi">
        <input name="province" required defaultValue="Sumatera Barat" className={inputCls} />
      </Field>
      <p className="mt-2 text-sm font-bold sm:col-span-2">Akun login</p>
      <Field label="Nama penanggung jawab" className="sm:col-span-2">
        <input name="name" required className={inputCls} />
      </Field>
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" className={inputCls} />
      </Field>
      <Field label="Password" hint="Minimal 8 karakter">
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className={inputCls} />
      </Field>
      {state?.error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700 sm:col-span-2">{state.error}</p>}
      <button disabled={pending} className="rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110 disabled:opacity-60 sm:col-span-2">
        {pending ? "Memproses..." : "Daftar jadi mitra"}
      </button>
    </form>
  );
}
