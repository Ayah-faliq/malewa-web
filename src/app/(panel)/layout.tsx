import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logout } from "./actions";

export const metadata = { title: "Panel Mitra - Malewa Holiday", robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href={user?.role === "ADMIN" ? "/admin" : "/mitra"} className="flex items-center gap-3">
            <Image src="/logo.png" alt="Malewa Holiday" width={120} height={48} className="h-9 w-auto" />
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-ink">
              {user?.role === "ADMIN" ? "Admin" : "Panel Mitra"}
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="/" className="hidden text-white/70 hover:text-white sm:inline">Lihat website ↗</Link>
            {user && (
              <>
                <span className="hidden text-white/70 md:inline">{user.partner?.name ?? user.name}</span>
                <form action={logout}>
                  <button className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">Keluar</button>
                </form>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
