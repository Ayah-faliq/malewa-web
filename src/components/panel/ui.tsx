// Komponen kecil untuk panel mitra/admin.


export const inputCls = "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-bold text-neutral-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-neutral-400">{hint}</span>}
    </label>
  );
}

export function Card({ title, action, children }: { title?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-bold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

const badgeColors: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-800",
  ACTIVE: "bg-green-100 text-green-800",
  PAID: "bg-green-100 text-green-800",
  DRAFT: "bg-neutral-200 text-neutral-700",
  PENDING: "bg-amber-100 text-amber-800",
  PENDING_PAYMENT: "bg-amber-100 text-amber-800",
  SUSPENDED: "bg-red-100 text-red-700",
  CANCELLED: "bg-red-100 text-red-700",
};
const badgeText: Record<string, string> = {
  PUBLISHED: "Tayang",
  DRAFT: "Draf",
  ACTIVE: "Aktif",
  PENDING: "Menunggu verifikasi",
  SUSPENDED: "Dinonaktifkan",
  PAID: "Lunas",
  PENDING_PAYMENT: "Belum bayar",
  CANCELLED: "Batal",
};

export function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColors[status] ?? "bg-neutral-100"}`}>
      {badgeText[status] ?? status}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <p className="text-xs font-semibold text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  );
}
