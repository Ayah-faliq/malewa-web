# Malewa Holiday (malewa-web)

Prototipe marketplace wisata ala Traveloka untuk Sumatera Barat dan sekitarnya. Menjual 4 kategori:

1. **Rekreasi** – tiket masuk destinasi wisata
2. **Akomodasi** – resort, hotel, penginapan
3. **Transportasi** – bus pariwisata, sewa mobil, shuttle, kapal
4. **Oleh-oleh** – kuliner & merchandise khas

## Fitur prototipe

- Beranda dengan pencarian, 4 kategori, promo, produk populer, dan daerah populer
- Katalog per kategori + pencarian dengan filter daerah & urutan harga/rating
- Halaman detail produk dengan form pemesanan (tanggal, jumlah, lama malam/hari)
- Keranjang (tersimpan di browser) dan checkout dengan kode promo `MALEWA10`
- Pembayaran **simulasi** (VA, QRIS, e-wallet, kartu) dan halaman e-voucher pesanan
- Bahasa Indonesia, harga Rupiah, responsif untuk HP

Data di `src/data/products.ts` masih **contoh**. Gambar produk masih placeholder bergradasi.

## Menjalankan

```bash
npm install
npm run dev   # http://localhost:3000
```

## Struktur

| Path | Isi |
| --- | --- |
| `src/app/page.tsx` | Beranda |
| `src/app/kategori/[slug]` | Katalog per kategori |
| `src/app/cari` | Hasil pencarian |
| `src/app/produk/[slug]` | Detail produk + pemesanan |
| `src/app/keranjang`, `src/app/checkout` | Keranjang & checkout |
| `src/app/pesanan/[kode]` | Status pembayaran & e-voucher |
| `src/data/products.ts` | Data kategori & produk contoh |
| `src/context/CartContext.tsx` | State keranjang & pesanan (localStorage) |

## Langkah berikutnya

- Database + panel admin/mitra untuk input produk, harga, stok, dan foto asli
- Akun pengguna (login) dan riwayat pesanan
- Integrasi payment gateway (Midtrans/Xendit) dan ongkir (RajaOngkir)
- Notifikasi e-voucher via email/WhatsApp
