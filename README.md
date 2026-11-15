# Malewa Holiday (malewa-web)

Prototipe marketplace wisata ala Traveloka untuk Sumatera Barat dan sekitarnya. Menjual 4 kategori:

1. **Rekreasi** – tiket masuk destinasi wisata
2. **Akomodasi** – resort, hotel, penginapan
3. **Transportasi** – bus pariwisata, sewa mobil, shuttle, kapal
4. **Pasa Malewa** – oleh-oleh (kuliner khas, kerajinan & merchandise) dan perlengkapan trip (handuk saset, tas traveling, dll.)

## Fitur prototipe

- Beranda dengan pencarian, 4 kategori, promo, produk populer, dan daerah populer
- Katalog per kategori + pencarian dengan filter daerah & urutan harga/rating
- Halaman detail produk dengan form pemesanan (tanggal, jumlah, lama malam/hari)
- Keranjang (tersimpan di browser) dan checkout dengan kode promo `MALEWA10`; pesanan tersimpan di database
- Pembayaran **simulasi** (VA, QRIS, e-wallet, kartu) dan halaman e-voucher pesanan
- Multi bahasa: Indonesia, English, Bahasa Melayu (pilih di header; otomatis mengikuti bahasa browser saat pertama kali buka). Harga tetap Rupiah
- Responsif untuk HP

Data awal di `prisma/seed/` masih **contoh**. Produk tanpa foto memakai placeholder bergradasi.

## Panel mitra & admin

- `/mitra/daftar` – usaha mendaftar jadi mitra (status **menunggu verifikasi**)
- `/mitra/masuk` – login mitra & admin
- `/mitra` – dashboard mitra: tambah/edit produk (3 bahasa, harga, harga coret, stok, foto), tayangkan/sembunyikan, lihat pesanan masuk + tombol WhatsApp pemesan
- `/admin` – setujui/nonaktifkan mitra, kelola semua produk, lihat semua pesanan

Produk hanya tampil di website jika statusnya **Tayang** dan mitranya **Aktif**. Harga saat checkout selalu dihitung ulang dari database.

Akun dari seed (lokal): admin sesuai `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` di `.env`, dan demo mitra `mitra.rental@malewa.com` / `mitra.pasa@malewa.com` dengan password `demo12345`.

## Menjalankan lokal

Butuh Node.js 20+ dan PostgreSQL.

```bash
cp .env.example .env        # isi DATABASE_URL, AUTH_SECRET, SEED_ADMIN_PASSWORD
npm install
npm run db:migrate          # buat tabel
npm run db:seed:local       # isi data contoh + akun admin
npm run dev                 # http://localhost:3000
```

## Online di Vercel + Supabase

1. **Supabase:** buat project di supabase.com (region Singapore). Klik tombol **Connect** → tab **ORMs** → **Prisma**, salin nilai `DATABASE_URL` dan `DIRECT_URL` (ganti `[YOUR-PASSWORD]` dengan password database).
2. **Foto produk:** di Supabase **Project Settings → API**, salin **Project URL** dan kunci **service_role**. Bucket `produk` dibuat otomatis saat foto pertama diunggah.
3. **Vercel:** Add New → Project → import repo `malewa-web`. Di **Settings → Environment Variables**, isi:
   - `DATABASE_URL`, `DIRECT_URL` (dari langkah 1)
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (dari langkah 2)
   - `AUTH_SECRET`: string acak ≥ 32 karakter
   - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`: akun admin pertama
4. Deploy. Script `vercel-build` otomatis menjalankan migrasi database, membuat akun admin, dan mengisi data contoh **hanya jika database masih kosong** (data mitra tidak pernah tertimpa).

## Struktur

| Path | Isi |
| --- | --- |
| `src/app/page.tsx` | Beranda |
| `src/app/kategori/[slug]` | Katalog per kategori |
| `src/app/cari` | Hasil pencarian |
| `src/app/produk/[slug]` | Detail produk + pemesanan |
| `src/app/keranjang`, `src/app/checkout` | Keranjang & checkout |
| `src/app/pesanan/[kode]` | Status pembayaran & e-voucher |
| `src/data/catalog.ts` | Kategori, tipe produk |
| `src/data/repo.ts` | Query produk dari database |
| `prisma/schema.prisma` | Skema database |
| `prisma/seed/` | Data contoh & terjemahannya |
| `src/app/(panel)/` | Panel mitra & admin |
| `src/i18n/dictionaries.ts` | Semua teks tampilan per bahasa |
| `src/context/CartContext.tsx` | Keranjang (localStorage) |

## Langkah berikutnya

- Kuota tiket/kamar per tanggal (saat ini stok masih total)
- Akun pengguna (login) dan riwayat pesanan
- Integrasi payment gateway (Midtrans/Xendit) dan ongkir (RajaOngkir)
- Notifikasi e-voucher via email/WhatsApp
