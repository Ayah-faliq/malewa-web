import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/catalog";
import { getI18n } from "@/i18n/server";

export default async function Footer() {
  const { t } = await getI18n();
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt="Malewa Holiday" width={160} height={64} className="h-12 w-auto" />
          <p className="mt-3 text-sm">{t.footer.about}</p>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-brand">{t.footer.products}</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategori/${c.slug}`} className="hover:text-white">
                  {t.categories[c.slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-brand">{t.footer.partners}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mitra/daftar" className="hover:text-white">{t.footer.join}</Link></li>
            <li><Link href="/mitra/masuk" className="hover:text-white">{t.footer.help}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-brand">{t.footer.contact}</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 {t.footer.location}</li>
            <li>💬 {t.footer.wa}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Malewa Holiday · {t.footer.note}
      </div>
    </footer>
  );
}
