import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import ProductForm from "@/components/panel/ProductForm";

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const product = await db.product.findUnique({ where: { id: (await params).id }, include: { partner: true } });
  if (!product) notFound();
  return (
    <div>
      <Link href="/admin?tab=produk" className="text-sm text-neutral-500 hover:text-ink">← Kembali</Link>
      <h1 className="mb-1 mt-1 text-2xl font-extrabold">Edit produk</h1>
      <p className="mb-5 text-sm text-neutral-500">Mitra: {product.partner.name}</p>
      <ProductForm product={product} defaults={{ category: product.category, city: product.city, province: product.province }} />
    </div>
  );
}
