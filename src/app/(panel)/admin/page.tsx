import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";
import { getDict } from "@/i18n/dictionaries";
import { Badge, Card, Stat } from "@/components/panel/ui";
import ProductTable from "@/components/panel/ProductTable";
import OrderTable from "@/components/panel/OrderTable";
import { setPartnerStatus } from "./actions";

const TABS = [
  ["mitra", "Mitra"],
  ["produk", "Produk"],
  ["pesanan", "Pesanan"],
] as const;

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const tab = (await searchParams).tab ?? "mitra";
  const t = getDict("id");

  const [partnerCount, pendingCount, productCount, paidAgg] = await Promise.all([
    db.partner.count(),
    db.partner.count({ where: { status: "PENDING" } }),
    db.product.count({ where: { status: "PUBLISHED" } }),
    db.order.aggregate({ where: { status: "PAID" }, _sum: { total: true }, _count: true }),
  ]);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">Admin Malewa Holiday</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Mitra" value={`${partnerCount}`} />
        <Stat label="Menunggu verifikasi" value={`${pendingCount}`} />
        <Stat label="Produk tayang" value={`${productCount}`} />
        <Stat label={`Transaksi lunas (${paidAgg._count})`} value={rupiah(paidAgg._sum.total ?? 0)} />
      </div>

      <nav className="flex gap-2">
        {TABS.map(([k, label]) => (
          <Link
            key={k}
            href={`/admin?tab=${k}`}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === k ? "bg-ink text-white" : "bg-white ring-1 ring-black/10 hover:ring-ink"}`}
          >
            {label}
            {k === "mitra" && pendingCount > 0 && <span className="ml-1.5 rounded-full bg-accent px-1.5 text-xs text-white">{pendingCount}</span>}
          </Link>
        ))}
      </nav>

      {tab === "mitra" && <PartnersTab t={t} />}
      {tab === "produk" && (
        <Card title="Semua produk">
          <ProductTable
            products={await db.product.findMany({ include: { partner: { select: { name: true } } }, orderBy: { updatedAt: "desc" } })}
            editBase="/admin/produk"
          />
        </Card>
      )}
      {tab === "pesanan" && (
        <Card title="Semua pesanan">
          <OrderTable rows={await db.orderItem.findMany({ include: { order: true }, orderBy: { order: { createdAt: "desc" } }, take: 100 })} />
        </Card>
      )}
    </div>
  );
}

async function PartnersTab({ t }: { t: ReturnType<typeof getDict> }) {
  const partners = await db.partner.findMany({
    include: { _count: { select: { products: true } }, users: { select: { email: true }, take: 1 } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });
  return (
    <Card title="Mitra">
      <div className="-mx-5 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="text-left text-xs text-neutral-500">
            <tr className="border-b">
              <th className="px-5 py-2">Mitra</th>
              <th className="px-2 py-2">Jenis</th>
              <th className="px-2 py-2">Kontak</th>
              <th className="px-2 py-2">Produk</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-5 py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-5 py-2">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-neutral-500">{p.city}, {p.province}</p>
                </td>
                <td className="px-2 py-2">{t.categories[p.category]?.name}</td>
                <td className="px-2 py-2 text-xs">
                  {p.users[0]?.email ?? "-"}
                  {p.phone && <p className="text-neutral-500">{p.phone}</p>}
                </td>
                <td className="px-2 py-2">{p._count.products}</td>
                <td className="px-2 py-2"><Badge status={p.status} /></td>
                <td className="px-5 py-2 text-right">
                  {p.status !== "ACTIVE" ? (
                    <form action={setPartnerStatus.bind(null, p.id, "ACTIVE")}>
                      <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white">
                        {p.status === "PENDING" ? "Setujui" : "Aktifkan"}
                      </button>
                    </form>
                  ) : (
                    <form action={setPartnerStatus.bind(null, p.id, "SUSPENDED")}>
                      <button className="text-xs text-red-600 hover:underline">Nonaktifkan</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
