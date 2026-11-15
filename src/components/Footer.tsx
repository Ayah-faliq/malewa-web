import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="Malewa Holiday" width={160} height={64} className="h-12 w-auto" />
          <p className="mt-3 text-sm">
            Teman perjalanan Anda di Ranah Minang dan sekitarnya. Satu tempat untuk tiket wisata, penginapan,
            transportasi, dan oleh-oleh.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-brand">Produk</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategori/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-brand">Mitra</h3>
          <ul className="space-y-2 text-sm">
            <li>Daftar jadi mitra</li>
            <li>Pusat bantuan mitra</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-brand">Hubungi kami</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Padang, Sumatera Barat</li>
            <li>💬 WhatsApp CS 24 jam</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Malewa Holiday · Prototipe, data dan harga hanya contoh
      </div>
    </footer>
  );
}
