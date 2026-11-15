import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const user = await currentUser();
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/mitra");
  return (
    <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h1 className="text-2xl font-extrabold">Masuk Panel Mitra</h1>
      <p className="mb-5 mt-1 text-sm text-neutral-500">Kelola produk, harga, foto, dan pesanan usaha Anda di Malewa Holiday.</p>
      <LoginForm />
      <p className="mt-5 text-center text-sm text-neutral-500">
        Belum jadi mitra?{" "}
        <Link href="/mitra/daftar" className="font-bold text-accent hover:underline">Daftar sekarang</Link>
      </p>
    </div>
  );
}
