import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePartner } from "@/lib/auth";
import { db } from "@/lib/db";
import ProductForm from "@/components/panel/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { partner } = await requirePartner();
  const product = await db.product.findFirst({ where: { id: (await params).id, partnerId: partner.id } });
  if (!product) notFound();
  return (
    <div>
      <Link href="/mitra" className="text-sm text-neutral-500 hover:text-ink">← Kembali</Link>
      <h1 className="mb-5 mt-1 text-2xl font-extrabold">Edit produk</h1>
      <ProductForm product={product} defaults={{ category: partner.category, city: partner.city, province: partner.province }} />
    </div>
  );
}
