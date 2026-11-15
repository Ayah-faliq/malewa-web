import Link from "next/link";
import { requirePartner } from "@/lib/auth";
import ProductForm from "@/components/panel/ProductForm";

export default async function NewProductPage() {
  const { partner } = await requirePartner();
  return (
    <div>
      <Link href="/mitra" className="text-sm text-neutral-500 hover:text-ink">← Kembali</Link>
      <h1 className="mb-5 mt-1 text-2xl font-extrabold">Tambah produk</h1>
      <ProductForm defaults={{ category: partner.category, city: partner.city, province: partner.province }} />
    </div>
  );
}
