import Link from "next/link";
import { requirePartner } from "@/lib/auth";
import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";
import { Badge, Card, Stat } from "@/components/panel/ui";
import ProductTable from "@/components/panel/ProductTable";
import OrderTable from "@/components/panel/OrderTable";

export default async function PartnerDashboard() {
  const { partner } = await requirePartner();
  const [products, orderItems] = await Promise.all([
    db.product.findMany({ where: { partnerId: partner.id }, orderBy: { updatedAt: "desc" } }),
    db.orderItem.findMany({
      where: { product: { partnerId: partner.id } },
      include: { order: true },
      orderBy: { order: { createdAt: "desc" } },
      take: 50,
    }),
  ]);
  const paid = orderItems.filter((o) => o.order.status === "PAID");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">{partner.name}</h1>
          <p className="text-sm text-neutral-500">
            {partner.city}, {partner.province} · <Badge status={partner.status} />
          </p>
        </div>
        <Link href="/mitra/produk/baru" className="rounded-xl bg-accent px-4 py-2.5 font-bold text-white hover:brightness-110">
          + Tambah produk
        </Link>
      </div>

      {partner.status === "PENDING" && (
        <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
          ⏳ Akun usaha Anda sedang diverifikasi tim Malewa. Anda sudah bisa menambah produk; produk akan tampil di website setelah verifikasi selesai.
        </div>
      )}
      {partner.status === "SUSPENDED" && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
          Akun usaha Anda sedang dinonaktifkan. Produk tidak tampil di website. Hubungi tim Malewa.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Produk tayang" value={String(products.filter((p) => p.status === "PUBLISHED").length)} />
        <Stat label="Total produk" value={String(products.length)} />
        <Stat label="Pesanan lunas" value={String(paid.length)} />
        <Stat label="Pendapatan kotor" value={rupiah(paid.reduce((n, o) => n + o.subtotal, 0))} />
      </div>

      <Card title="Produk saya">
        <ProductTable products={products} editBase="/mitra/produk" />
      </Card>
      <Card title="Pesanan masuk">
        <OrderTable rows={orderItems} />
      </Card>
    </div>
  );
}
