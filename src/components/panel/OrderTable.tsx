import { getDict } from "@/i18n/dictionaries";
import { rupiah, tanggal } from "@/lib/format";
import { Badge } from "./ui";

export type OrderRow = {
  id: string; productName: string; qty: number; duration: number; date: string | null; subtotal: number; voucherCode: string | null;
  order: { code: string; status: string; customerName: string; customerPhone: string; address: string | null; createdAt: Date; payment: string };
};

export default function OrderTable({ rows }: { rows: OrderRow[] }) {
  const t = getDict("id");
  if (rows.length === 0) return <p className="py-6 text-center text-sm text-neutral-500">Belum ada pesanan.</p>;
  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="text-left text-xs text-neutral-500">
          <tr className="border-b">
            <th className="px-5 py-2">Pesanan</th>
            <th className="px-2 py-2">Produk</th>
            <th className="px-2 py-2">Pemesan</th>
            <th className="px-2 py-2">Total</th>
            <th className="px-5 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b align-top last:border-0">
              <td className="px-5 py-2">
                <p className="font-mono text-xs font-bold">{r.order.code}</p>
                <p className="text-xs text-neutral-500">{r.order.createdAt.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
              </td>
              <td className="px-2 py-2">
                <p className="font-semibold">{r.productName}</p>
                <p className="text-xs text-neutral-500">
                  {r.qty}x{r.duration > 1 ? ` · ${r.duration} malam/hari` : ""}
                  {r.date ? ` · ${tanggal(r.date)}` : ""}
                </p>
                {r.voucherCode && <p className="font-mono text-xs text-green-700">🎫 {r.voucherCode}</p>}
              </td>
              <td className="px-2 py-2">
                <p>{r.order.customerName}</p>
                <a href={`https://wa.me/${r.order.customerPhone.replace(/\D/g, "").replace(/^0/, "62")}`} target="_blank" rel="noreferrer" className="text-xs text-green-700 hover:underline">
                  WA {r.order.customerPhone}
                </a>
                {r.order.address && <p className="max-w-[200px] text-xs text-neutral-500">{r.order.address}</p>}
              </td>
              <td className="whitespace-nowrap px-2 py-2">
                {rupiah(r.subtotal)}
                <p className="text-xs text-neutral-400">{t.checkout.payments[r.order.payment] ?? r.order.payment}</p>
              </td>
              <td className="px-5 py-2"><Badge status={r.order.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
