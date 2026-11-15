import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto mt-2 max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h1 className="text-2xl font-extrabold">Daftar Mitra Malewa Holiday</h1>
      <p className="mb-5 mt-1 text-sm text-neutral-500">
        Gratis. Setelah daftar, Anda bisa langsung menyiapkan produk. Produk tampil di website setelah tim Malewa memverifikasi usaha Anda.
      </p>
      <RegisterForm />
      <p className="mt-5 text-center text-sm text-neutral-500">
        Sudah punya akun? <Link href="/mitra/masuk" className="font-bold text-accent hover:underline">Masuk</Link>
      </p>
    </div>
  );
}
