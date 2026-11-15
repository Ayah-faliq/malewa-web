export const locales = ["id", "en", "ms"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";
export const LOCALE_COOKIE = "malewa_lang";

export const localeMeta: Record<Locale, { label: string; short: string; flag: string; intl: string }> = {
  id: { label: "Bahasa Indonesia", short: "ID", flag: "🇮🇩", intl: "id-ID" },
  en: { label: "English", short: "EN", flag: "🇬🇧", intl: "en-GB" },
  ms: { label: "Bahasa Melayu", short: "MS", flag: "🇲🇾", intl: "ms-MY" },
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (locales as readonly string[]).includes(v);
}

type CategoryText = { name: string; tagline: string; qtyLabel: string; durationLabel?: string; dateLabel?: string };

export type Dict = {
  meta: { title: string; description: string };
  nav: { home: string; cart: string; searchPlaceholder: string; language: string };
  hero: { badge: string; title1: string; title2: string; subtitle: string };
  searchBox: { placeholder: string; allCategories: string; allRegions: string; search: string };
  promo: { label: string; title: string; body: (code: string) => string };
  home: { popular: (cat: string) => string; seeAll: string; regions: string; why: [string, string, string][] };
  footer: { about: string; products: string; partners: string; join: string; help: string; contact: string; location: string; wa: string; note: string };
  catalog: {
    keyword: string; keywordPh: string; region: string; allRegions: string; type: string; allTypes: string;
    sortBy: string; sortPopular: string; sortRating: string; sortCheap: string; sortExpensive: string;
    apply: string; reset: string; found: (n: number) => string; empty: string; inRegion: string;
  };
  search: { resultsFor: string; all: string };
  card: { save: (n: number) => string; reviews: string };
  product: {
    partner: string; verified: string; about: string; whatYouGet: string; policy: string;
    policyShop: string[]; policyBooking: string[]; others: (cat: string) => string;
  };
  booking: { total: string; bookNow: string; buyNow: string; addToCart: string; added: string; length: (u: string) => string; decrease: string; increase: string };
  cart: {
    title: string; loading: string; emptyTitle: string; emptyBody: string; explore: string; remove: string;
    summary: string; subtotalItems: (n: number) => string; feesNote: string; toCheckout: string; addMore: string;
  };
  checkout: {
    title: string; loading: string; nothing: string; backHome: string; step1: string; fullName: string; fullNamePh: string;
    email: string; phone: string; address: string; addressPh: string; note: string; notePh: string; step2: string;
    payNote: string; yourOrder: string; promoPh: string; apply: string; promoInvalid: string; promoApplied: (c: string) => string;
    subtotal: string; discount: string; shipping: string; serviceFee: string; total: string; pay: string; processing: string;
    payments: Record<string, string>;
    errors: Record<"invalid" | "unavailable" | "address", string>;
  };
  order: {
    loading: string; notFound: (c: string) => string; paidTitle: string; payTitle: string; code: string; method: string;
    va: string; amountDue: string; payWithin: string; simulate: string; voucherTitle: string; detailTitle: string;
    shippingStatus: string; voucher: string; customer: string; address: string; back: string;
  };
  units: Record<string, string>;
  categories: Record<string, CategoryText>;
  subcategories: Record<string, string>;
};

const id: Dict = {
  meta: {
    title: "Malewa Holiday - Tiket Wisata, Penginapan, Transportasi & Oleh-oleh Sumatera Barat",
    description: "Pesan tiket wisata, resort & penginapan, bus pariwisata & sewa mobil, serta oleh-oleh dan perlengkapan trip Sumatera Barat dalam satu tempat.",
  },
  nav: { home: "Beranda", cart: "Keranjang", searchPlaceholder: "Cari destinasi, penginapan, bus, atau oleh-oleh...", language: "Bahasa" },
  hero: {
    badge: "Jelajahi Ranah Minang & Sumatera",
    title1: "Liburan ke Sumatera Barat,",
    title2: "semua dalam satu genggaman.",
    subtitle: "Tiket wisata, resort & penginapan, bus pariwisata, sewa mobil, oleh-oleh, sampai perlengkapan trip. Langsung dari mitra lokal terpercaya.",
  },
  searchBox: { placeholder: "Mau ke mana? Contoh: Jam Gadang, Mentawai, rendang", allCategories: "Semua kategori", allRegions: "Semua daerah", search: "Cari" },
  promo: { label: "Promo pembukaan", title: "Hemat hingga 17% untuk mitra pilihan", body: (c) => `Pakai kode ${c} di checkout untuk diskon tambahan 10%.` },
  home: {
    popular: (c) => `${c} populer`,
    seeAll: "Lihat semua →",
    regions: "Jelajahi berdasarkan daerah",
    why: [
      ["🤝", "Mitra lokal terverifikasi", "Bekerja sama langsung dengan pengelola wisata, hotel, dan UMKM."],
      ["💳", "Bayar mudah", "Transfer bank, QRIS, e-wallet, dan kartu kredit."],
      ["📲", "E-voucher instan", "Tiket dan voucher langsung terkirim setelah pembayaran."],
    ],
  },
  footer: {
    about: "Teman perjalanan Anda di Ranah Minang dan sekitarnya. Satu tempat untuk tiket wisata, penginapan, transportasi, oleh-oleh, dan perlengkapan trip.",
    products: "Produk", partners: "Mitra", join: "Daftar jadi mitra", help: "Pusat bantuan mitra", contact: "Hubungi kami",
    location: "Padang, Sumatera Barat", wa: "WhatsApp CS 24 jam", note: "Prototipe, data dan harga hanya contoh",
  },
  catalog: {
    keyword: "Kata kunci", keywordPh: "Cari...", region: "Daerah", allRegions: "Semua daerah", type: "Jenis", allTypes: "Semua jenis",
    sortBy: "Urutkan", sortPopular: "Paling populer", sortRating: "Rating tertinggi", sortCheap: "Harga termurah", sortExpensive: "Harga termahal",
    apply: "Terapkan", reset: "Reset", found: (n) => `${n} produk ditemukan`, empty: "Belum ada produk yang cocok. Coba kata kunci atau daerah lain.",
    inRegion: "di Sumatera Barat dan sekitarnya",
  },
  search: { resultsFor: "Hasil pencarian", all: "Semua produk" },
  card: { save: (n) => `Hemat ${n}%`, reviews: "ulasan" },
  product: {
    partner: "Mitra", verified: "Terverifikasi", about: "Tentang", whatYouGet: "Yang Anda dapatkan", policy: "Kebijakan",
    policyShop: ["Dikirim 1x24 jam setelah pembayaran dikonfirmasi.", "Retur jika barang rusak saat diterima (sertakan video unboxing)."],
    policyBooking: ["E-voucher dikirim ke email & WhatsApp setelah pembayaran.", "Refund penuh jika dibatalkan paling lambat H-3.", "Reschedule gratis 1x, tergantung ketersediaan mitra."],
    others: (c) => `${c} lainnya`,
  },
  booking: { total: "Total", bookNow: "Pesan sekarang", buyNow: "Beli sekarang", addToCart: "+ Keranjang", added: "✔ Ditambahkan ke keranjang", length: (u) => `Lama (${u})`, decrease: "Kurangi", increase: "Tambah" },
  cart: {
    title: "Keranjang", loading: "Memuat keranjang...", emptyTitle: "Keranjang masih kosong", emptyBody: "Yuk cari destinasi, penginapan, atau oleh-oleh favoritmu.",
    explore: "Mulai jelajah", remove: "Hapus", summary: "Ringkasan", subtotalItems: (n) => `Subtotal (${n} item)`,
    feesNote: "Ongkir & biaya layanan dihitung di checkout.", toCheckout: "Lanjut ke checkout", addMore: "Tambah produk lain",
  },
  checkout: {
    title: "Checkout", loading: "Memuat...", nothing: "Tidak ada yang perlu dibayar", backHome: "Kembali ke beranda",
    step1: "1. Data pemesan", fullName: "Nama lengkap (sesuai KTP/paspor)", fullNamePh: "Contoh: Andre Syahputra", email: "Email", phone: "No. WhatsApp",
    address: "Alamat pengiriman", addressPh: "Jalan, kelurahan, kecamatan, kota, kode pos", note: "Catatan untuk mitra (opsional)",
    notePh: "Contoh: jemput di Hotel X jam 08.00", step2: "2. Metode pembayaran",
    payNote: "ⓘ Prototipe: pembayaran masih simulasi. Nanti dihubungkan ke payment gateway (mis. Midtrans / Xendit).",
    yourOrder: "Pesanan Anda", promoPh: "Kode promo", apply: "Pakai", promoInvalid: "Kode promo tidak valid", promoApplied: (c) => `✔ Promo ${c} dipakai`,
    subtotal: "Subtotal", discount: "Diskon promo", shipping: "Ongkir", serviceFee: "Biaya layanan", total: "Total bayar", pay: "Bayar sekarang", processing: "Memproses...",
    payments: { "va-bni": "Virtual Account BNI", "va-bsi": "Virtual Account BSI", "va-nagari": "Virtual Account Bank Nagari", qris: "QRIS (semua e-wallet & m-banking)", ewallet: "GoPay / OVO / DANA", cc: "Kartu Kredit / Debit" },
    errors: { invalid: "Data belum lengkap atau tidak valid. Periksa kembali isian Anda.", unavailable: "Ada produk di keranjang yang sudah tidak tersedia. Hapus lalu coba lagi.", address: "Alamat pengiriman wajib diisi." },
  },
  order: {
    loading: "Memuat pesanan...", notFound: (c) => `Pesanan ${c} tidak ditemukan`, paidTitle: "Pembayaran berhasil!", payTitle: "Selesaikan pembayaran",
    code: "Kode pesanan", method: "Metode", va: "Nomor VA", amountDue: "Total yang harus dibayar", payWithin: "Bayar dalam 1x24 jam agar pesanan tidak dibatalkan otomatis.",
    simulate: "Simulasikan pembayaran berhasil", voucherTitle: "E-voucher & detail pesanan", detailTitle: "Detail pesanan",
    shippingStatus: "📦 Dikemas, resi menyusul", voucher: "Voucher", customer: "Pemesan", address: "Alamat", back: "← Kembali belanja",
  },
  units: { person: "/orang", roomNight: "/kamar/malam", unitDay: "/unit/hari", pack: "/pak", box: "/kotak", piece: "/pcs", sheet: "/lembar" },
  categories: {
    rekreasi: { name: "Rekreasi", tagline: "Tiket masuk destinasi wisata", qtyLabel: "Jumlah tiket", dateLabel: "Tanggal kunjungan" },
    akomodasi: { name: "Akomodasi", tagline: "Resort, hotel & penginapan", qtyLabel: "Jumlah kamar", durationLabel: "malam", dateLabel: "Tanggal check-in" },
    transportasi: { name: "Transportasi", tagline: "Bus pariwisata & sewa mobil", qtyLabel: "Jumlah unit / kursi", durationLabel: "hari", dateLabel: "Tanggal berangkat" },
    pasa: { name: "Pasa Malewa", tagline: "Oleh-oleh & perlengkapan trip", qtyLabel: "Jumlah" },
  },
  subcategories: { kuliner: "Kuliner khas", kerajinan: "Kerajinan & merchandise", perlengkapan: "Perlengkapan trip" },
};

const en: Dict = {
  meta: {
    title: "Malewa Holiday - Attraction Tickets, Stays, Transport & Souvenirs in West Sumatra",
    description: "Book attraction tickets, resorts & stays, tour buses & car rentals, plus souvenirs and travel gear for West Sumatra, all in one place.",
  },
  nav: { home: "Home", cart: "Cart", searchPlaceholder: "Search attractions, stays, buses, or souvenirs...", language: "Language" },
  hero: {
    badge: "Explore Minangkabau & Sumatra",
    title1: "Your West Sumatra holiday,",
    title2: "all in one place.",
    subtitle: "Attraction tickets, resorts & stays, tour buses, car rentals, souvenirs and travel gear. Straight from trusted local partners.",
  },
  searchBox: { placeholder: "Where to? e.g. Jam Gadang, Mentawai, rendang", allCategories: "All categories", allRegions: "All regions", search: "Search" },
  promo: { label: "Launch promo", title: "Save up to 17% with selected partners", body: (c) => `Use code ${c} at checkout for an extra 10% off.` },
  home: {
    popular: (c) => `Popular in ${c}`,
    seeAll: "See all →",
    regions: "Explore by region",
    why: [
      ["🤝", "Verified local partners", "We work directly with attraction operators, hotels, and local businesses."],
      ["💳", "Easy payment", "Bank transfer, QRIS, e-wallets, and credit cards."],
      ["📲", "Instant e-voucher", "Tickets and vouchers are sent right after payment."],
    ],
  },
  footer: {
    about: "Your travel companion in Minangkabau and beyond. One place for attraction tickets, stays, transport, souvenirs, and travel gear.",
    products: "Products", partners: "Partners", join: "Become a partner", help: "Partner help centre", contact: "Contact us",
    location: "Padang, West Sumatra", wa: "24/7 WhatsApp support", note: "Prototype, data and prices are samples only",
  },
  catalog: {
    keyword: "Keyword", keywordPh: "Search...", region: "Region", allRegions: "All regions", type: "Type", allTypes: "All types",
    sortBy: "Sort by", sortPopular: "Most popular", sortRating: "Highest rated", sortCheap: "Lowest price", sortExpensive: "Highest price",
    apply: "Apply", reset: "Reset", found: (n) => `${n} product${n === 1 ? "" : "s"} found`, empty: "No matching products yet. Try another keyword or region.",
    inRegion: "in West Sumatra and nearby",
  },
  search: { resultsFor: "Search results", all: "All products" },
  card: { save: (n) => `Save ${n}%`, reviews: "reviews" },
  product: {
    partner: "Partner", verified: "Verified", about: "About", whatYouGet: "What's included", policy: "Policy",
    policyShop: ["Ships within 24 hours after payment is confirmed.", "Returns accepted if the item arrives damaged (unboxing video required)."],
    policyBooking: ["E-voucher sent to your email & WhatsApp after payment.", "Full refund if cancelled at least 3 days before.", "One free reschedule, subject to partner availability."],
    others: (c) => `More in ${c}`,
  },
  booking: { total: "Total", bookNow: "Book now", buyNow: "Buy now", addToCart: "+ Cart", added: "✔ Added to cart", length: (u) => `Length (${u})`, decrease: "Decrease", increase: "Increase" },
  cart: {
    title: "Cart", loading: "Loading cart...", emptyTitle: "Your cart is empty", emptyBody: "Find your favourite attractions, stays, or souvenirs.",
    explore: "Start exploring", remove: "Remove", summary: "Summary", subtotalItems: (n) => `Subtotal (${n} item${n === 1 ? "" : "s"})`,
    feesNote: "Shipping & service fees are calculated at checkout.", toCheckout: "Continue to checkout", addMore: "Add more products",
  },
  checkout: {
    title: "Checkout", loading: "Loading...", nothing: "Nothing to pay", backHome: "Back to home",
    step1: "1. Contact details", fullName: "Full name (as on ID/passport)", fullNamePh: "e.g. John Smith", email: "Email", phone: "WhatsApp number",
    address: "Shipping address", addressPh: "Street, district, city, postcode", note: "Note for partner (optional)",
    notePh: "e.g. pick up at Hotel X at 8 AM", step2: "2. Payment method",
    payNote: "ⓘ Prototype: payment is simulated. It will be connected to a payment gateway (e.g. Midtrans / Xendit).",
    yourOrder: "Your order", promoPh: "Promo code", apply: "Apply", promoInvalid: "Invalid promo code", promoApplied: (c) => `✔ Promo ${c} applied`,
    subtotal: "Subtotal", discount: "Promo discount", shipping: "Shipping", serviceFee: "Service fee", total: "Total", pay: "Pay now", processing: "Processing...",
    payments: { "va-bni": "BNI Virtual Account", "va-bsi": "BSI Virtual Account", "va-nagari": "Bank Nagari Virtual Account", qris: "QRIS (all e-wallets & mobile banking)", ewallet: "GoPay / OVO / DANA", cc: "Credit / Debit card" },
    errors: { invalid: "Some details are missing or invalid. Please check the form.", unavailable: "A product in your cart is no longer available. Remove it and try again.", address: "Shipping address is required." },
  },
  order: {
    loading: "Loading order...", notFound: (c) => `Order ${c} not found`, paidTitle: "Payment successful!", payTitle: "Complete your payment",
    code: "Order code", method: "Method", va: "VA number", amountDue: "Amount due", payWithin: "Pay within 24 hours or the order will be cancelled automatically.",
    simulate: "Simulate successful payment", voucherTitle: "E-vouchers & order details", detailTitle: "Order details",
    shippingStatus: "📦 Packing, tracking number to follow", voucher: "Voucher", customer: "Customer", address: "Address", back: "← Continue shopping",
  },
  units: { person: "/person", roomNight: "/room/night", unitDay: "/vehicle/day", pack: "/pack", box: "/box", piece: "/pc", sheet: "/piece" },
  categories: {
    rekreasi: { name: "Attractions", tagline: "Tourist attraction tickets", qtyLabel: "Tickets", dateLabel: "Visit date" },
    akomodasi: { name: "Stays", tagline: "Resorts, hotels & homestays", qtyLabel: "Rooms", durationLabel: "nights", dateLabel: "Check-in date" },
    transportasi: { name: "Transport", tagline: "Tour buses & car rentals", qtyLabel: "Vehicles / seats", durationLabel: "days", dateLabel: "Departure date" },
    pasa: { name: "Malewa Market", tagline: "Souvenirs & travel gear", qtyLabel: "Quantity" },
  },
  subcategories: { kuliner: "Local delicacies", kerajinan: "Crafts & merchandise", perlengkapan: "Travel gear" },
};

const ms: Dict = {
  meta: {
    title: "Malewa Holiday - Tiket Tarikan, Penginapan, Pengangkutan & Cenderahati Sumatera Barat",
    description: "Tempah tiket tarikan, resort & penginapan, bas persiaran & sewa kereta, serta cenderahati dan kelengkapan percutian Sumatera Barat di satu tempat.",
  },
  nav: { home: "Utama", cart: "Troli", searchPlaceholder: "Cari tarikan, penginapan, bas, atau cenderahati...", language: "Bahasa" },
  hero: {
    badge: "Terokai Ranah Minang & Sumatera",
    title1: "Percutian ke Sumatera Barat,",
    title2: "semuanya di hujung jari.",
    subtitle: "Tiket tarikan, resort & penginapan, bas persiaran, sewa kereta, cenderahati dan kelengkapan percutian. Terus daripada rakan tempatan yang dipercayai.",
  },
  searchBox: { placeholder: "Nak ke mana? Contoh: Jam Gadang, Mentawai, rendang", allCategories: "Semua kategori", allRegions: "Semua kawasan", search: "Cari" },
  promo: { label: "Promosi pelancaran", title: "Jimat sehingga 17% dengan rakan pilihan", body: (c) => `Guna kod ${c} semasa pembayaran untuk diskaun tambahan 10%.` },
  home: {
    popular: (c) => `${c} popular`,
    seeAll: "Lihat semua →",
    regions: "Terokai mengikut kawasan",
    why: [
      ["🤝", "Rakan tempatan disahkan", "Bekerjasama terus dengan pengendali pelancongan, hotel, dan PKS."],
      ["💳", "Bayaran mudah", "Pindahan bank, QRIS, e-dompet, dan kad kredit."],
      ["📲", "E-baucar segera", "Tiket dan baucar dihantar sejurus selepas pembayaran."],
    ],
  },
  footer: {
    about: "Teman perjalanan anda di Ranah Minang dan sekitarnya. Satu tempat untuk tiket tarikan, penginapan, pengangkutan, cenderahati dan kelengkapan percutian.",
    products: "Produk", partners: "Rakan kongsi", join: "Daftar sebagai rakan", help: "Pusat bantuan rakan", contact: "Hubungi kami",
    location: "Padang, Sumatera Barat", wa: "Khidmat WhatsApp 24 jam", note: "Prototaip, data dan harga hanya contoh",
  },
  catalog: {
    keyword: "Kata kunci", keywordPh: "Cari...", region: "Kawasan", allRegions: "Semua kawasan", type: "Jenis", allTypes: "Semua jenis",
    sortBy: "Susun ikut", sortPopular: "Paling popular", sortRating: "Penarafan tertinggi", sortCheap: "Harga terendah", sortExpensive: "Harga tertinggi",
    apply: "Guna", reset: "Set semula", found: (n) => `${n} produk dijumpai`, empty: "Tiada produk yang sepadan. Cuba kata kunci atau kawasan lain.",
    inRegion: "di Sumatera Barat dan sekitarnya",
  },
  search: { resultsFor: "Hasil carian", all: "Semua produk" },
  card: { save: (n) => `Jimat ${n}%`, reviews: "ulasan" },
  product: {
    partner: "Rakan", verified: "Disahkan", about: "Tentang", whatYouGet: "Termasuk", policy: "Polisi",
    policyShop: ["Dihantar dalam 24 jam selepas pembayaran disahkan.", "Pemulangan diterima jika barang rosak semasa diterima (sertakan video unboxing)."],
    policyBooking: ["E-baucar dihantar ke e-mel & WhatsApp selepas pembayaran.", "Bayaran balik penuh jika dibatalkan sekurang-kurangnya 3 hari sebelum.", "Tukar tarikh percuma sekali, tertakluk kepada kekosongan."],
    others: (c) => `${c} lain`,
  },
  booking: { total: "Jumlah", bookNow: "Tempah sekarang", buyNow: "Beli sekarang", addToCart: "+ Troli", added: "✔ Ditambah ke troli", length: (u) => `Tempoh (${u})`, decrease: "Kurang", increase: "Tambah" },
  cart: {
    title: "Troli", loading: "Memuatkan troli...", emptyTitle: "Troli anda kosong", emptyBody: "Jom cari tarikan, penginapan, atau cenderahati kegemaran anda.",
    explore: "Mula meneroka", remove: "Buang", summary: "Ringkasan", subtotalItems: (n) => `Subjumlah (${n} item)`,
    feesNote: "Kos penghantaran & caj perkhidmatan dikira semasa pembayaran.", toCheckout: "Teruskan ke pembayaran", addMore: "Tambah produk lain",
  },
  checkout: {
    title: "Pembayaran", loading: "Memuatkan...", nothing: "Tiada apa-apa untuk dibayar", backHome: "Kembali ke laman utama",
    step1: "1. Maklumat penempah", fullName: "Nama penuh (seperti dalam IC/pasport)", fullNamePh: "Contoh: Ahmad bin Ali", email: "E-mel", phone: "No. WhatsApp",
    address: "Alamat penghantaran", addressPh: "Jalan, kawasan, bandar, poskod", note: "Nota untuk rakan (pilihan)",
    notePh: "Contoh: ambil di Hotel X pukul 8 pagi", step2: "2. Kaedah pembayaran",
    payNote: "ⓘ Prototaip: pembayaran hanya simulasi. Akan disambungkan ke gerbang pembayaran (cth. Midtrans / Xendit).",
    yourOrder: "Pesanan anda", promoPh: "Kod promosi", apply: "Guna", promoInvalid: "Kod promosi tidak sah", promoApplied: (c) => `✔ Promosi ${c} digunakan`,
    subtotal: "Subjumlah", discount: "Diskaun promosi", shipping: "Penghantaran", serviceFee: "Caj perkhidmatan", total: "Jumlah bayaran", pay: "Bayar sekarang", processing: "Memproses...",
    payments: { "va-bni": "Akaun Maya BNI", "va-bsi": "Akaun Maya BSI", "va-nagari": "Akaun Maya Bank Nagari", qris: "QRIS (semua e-dompet & perbankan mudah alih)", ewallet: "GoPay / OVO / DANA", cc: "Kad Kredit / Debit" },
    errors: { invalid: "Maklumat tidak lengkap atau tidak sah. Sila semak semula.", unavailable: "Terdapat produk dalam troli yang tidak lagi tersedia. Buang dan cuba lagi.", address: "Alamat penghantaran wajib diisi." },
  },
  order: {
    loading: "Memuatkan pesanan...", notFound: (c) => `Pesanan ${c} tidak dijumpai`, paidTitle: "Pembayaran berjaya!", payTitle: "Selesaikan pembayaran",
    code: "Kod pesanan", method: "Kaedah", va: "Nombor akaun maya", amountDue: "Jumlah perlu dibayar", payWithin: "Bayar dalam 24 jam atau pesanan akan dibatalkan secara automatik.",
    simulate: "Simulasi pembayaran berjaya", voucherTitle: "E-baucar & butiran pesanan", detailTitle: "Butiran pesanan",
    shippingStatus: "📦 Sedang dibungkus, nombor penjejakan menyusul", voucher: "Baucar", customer: "Penempah", address: "Alamat", back: "← Teruskan membeli-belah",
  },
  units: { person: "/orang", roomNight: "/bilik/malam", unitDay: "/unit/hari", pack: "/pek", box: "/kotak", piece: "/helai", sheet: "/helai" },
  categories: {
    rekreasi: { name: "Rekreasi", tagline: "Tiket masuk tarikan pelancongan", qtyLabel: "Bilangan tiket", dateLabel: "Tarikh lawatan" },
    akomodasi: { name: "Penginapan", tagline: "Resort, hotel & homestay", qtyLabel: "Bilangan bilik", durationLabel: "malam", dateLabel: "Tarikh daftar masuk" },
    transportasi: { name: "Pengangkutan", tagline: "Bas persiaran & sewa kereta", qtyLabel: "Bilangan unit / tempat duduk", durationLabel: "hari", dateLabel: "Tarikh bertolak" },
    pasa: { name: "Pasar Malewa", tagline: "Cenderahati & kelengkapan percutian", qtyLabel: "Kuantiti" },
  },
  subcategories: { kuliner: "Makanan tradisional", kerajinan: "Kraf & barangan", perlengkapan: "Kelengkapan percutian" },
};

export const dictionaries: Record<Locale, Dict> = { id, en, ms };

export function getDict(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
