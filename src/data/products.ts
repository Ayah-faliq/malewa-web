// Data contoh untuk prototipe. Nanti diganti dengan data mitra asli dari database/admin.

export type CategorySlug = "rekreasi" | "akomodasi" | "transportasi" | "oleh-oleh";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  emoji: string;
  /** Label kuantitas di form pemesanan */
  qtyLabel: string;
  /** Label durasi (malam/hari), kosong jika tidak ada durasi */
  durationLabel?: string;
  /** Label tanggal di form pemesanan, kosong jika tidak butuh tanggal */
  dateLabel?: string;
  needsShipping?: boolean;
};

export const categories: Category[] = [
  {
    slug: "rekreasi",
    name: "Rekreasi",
    tagline: "Tiket masuk destinasi wisata",
    emoji: "🎟️",
    qtyLabel: "Jumlah tiket",
    dateLabel: "Tanggal kunjungan",
  },
  {
    slug: "akomodasi",
    name: "Akomodasi",
    tagline: "Resort, hotel & penginapan",
    emoji: "🏡",
    qtyLabel: "Jumlah kamar",
    durationLabel: "malam",
    dateLabel: "Tanggal check-in",
  },
  {
    slug: "transportasi",
    name: "Transportasi",
    tagline: "Bus pariwisata & sewa mobil",
    emoji: "🚌",
    qtyLabel: "Jumlah unit / kursi",
    durationLabel: "hari",
    dateLabel: "Tanggal berangkat",
  },
  {
    slug: "oleh-oleh",
    name: "Oleh-oleh",
    tagline: "Merchandise & kuliner khas",
    emoji: "🎁",
    qtyLabel: "Jumlah",
    needsShipping: true,
  },
];

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  city: string;
  province: string;
  price: number;
  /** Satuan harga, contoh: "/orang", "/kamar/malam" */
  unit: string;
  rating: number;
  reviews: number;
  partner: string;
  description: string;
  highlights: string[];
  /** Dua warna gradasi untuk gambar placeholder */
  colors: [string, string];
  emoji: string;
  /** Harga coret (opsional) untuk tampilan promo */
  originalPrice?: number;
};

const SUMBAR = "Sumatera Barat";

export const products: Product[] = [
  // ---------------- REKREASI ----------------
  {
    slug: "jam-gadang-bukittinggi",
    category: "rekreasi",
    name: "Tiket Naik Menara Jam Gadang",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 15000,
    unit: "/orang",
    rating: 4.7,
    reviews: 1284,
    partner: "Pemko Bukittinggi",
    description:
      "Naik ke puncak ikon kota Bukittinggi dan nikmati panorama Gunung Marapi, Gunung Singgalang, dan kota dari ketinggian. Tiket berlaku untuk satu kali kunjungan pada tanggal yang dipilih.",
    highlights: ["Akses ke lantai atas menara", "Pemandu lokal tersedia", "Buka 08.00 - 17.00 WIB"],
    colors: ["#7c2d12", "#f59e0b"],
    emoji: "🕰️",
  },
  {
    slug: "ngarai-sianok-lobang-jepang",
    category: "rekreasi",
    name: "Ngarai Sianok & Lobang Jepang",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 25000,
    unit: "/orang",
    rating: 4.8,
    reviews: 963,
    partner: "Taman Panorama Bukittinggi",
    description:
      "Paket masuk Taman Panorama dengan pemandangan Ngarai Sianok yang megah, sekaligus menjelajahi terowongan bersejarah Lobang Jepang peninggalan Perang Dunia II.",
    highlights: ["Tiket terusan 2 objek", "Spot foto Ngarai Sianok", "Terowongan sepanjang 1,4 km"],
    colors: ["#14532d", "#84cc16"],
    emoji: "🏞️",
  },
  {
    slug: "lembah-harau",
    category: "rekreasi",
    name: "Kawasan Wisata Lembah Harau",
    city: "Lima Puluh Kota",
    province: SUMBAR,
    price: 15000,
    unit: "/orang",
    rating: 4.8,
    reviews: 742,
    partner: "Pokdarwis Harau",
    description:
      "Lembah dengan tebing granit setinggi 100-500 meter dan air terjun Sarasah. Cocok untuk trekking, panjat tebing, dan bersantai di tengah sawah.",
    highlights: ["Air Terjun Sarasah Bunta", "Echo Point", "Area camping"],
    colors: ["#064e3b", "#10b981"],
    emoji: "⛰️",
  },
  {
    slug: "istano-basa-pagaruyung",
    category: "rekreasi",
    name: "Istano Basa Pagaruyung",
    city: "Tanah Datar",
    province: SUMBAR,
    price: 25000,
    unit: "/orang",
    rating: 4.7,
    reviews: 1105,
    partner: "Dinas Pariwisata Tanah Datar",
    description:
      "Replika istana Kerajaan Pagaruyung dengan arsitektur Rumah Gadang yang megah. Termasuk sewa pakaian adat untuk berfoto (dengan biaya tambahan di lokasi).",
    highlights: ["Museum budaya Minangkabau", "Sewa baju adat", "Taman luas untuk keluarga"],
    colors: ["#78350f", "#dc2626"],
    emoji: "🏯",
  },
  {
    slug: "mandeh-island-hopping",
    category: "rekreasi",
    name: "Island Hopping Kawasan Mandeh",
    city: "Pesisir Selatan",
    province: SUMBAR,
    price: 250000,
    originalPrice: 300000,
    unit: "/orang",
    rating: 4.9,
    reviews: 388,
    partner: "Mandeh Bahari Tour",
    description:
      "Tur perahu seharian mengunjungi Pulau Setan, Pulau Sironjong, dan Pulau Cubadak. Termasuk snorkeling, makan siang ikan bakar, dan pelampung.",
    highlights: ["Perahu + nakhoda", "Alat snorkeling", "Makan siang", "Dokumentasi"],
    colors: ["#0c4a6e", "#06b6d4"],
    emoji: "🏝️",
  },
  {
    slug: "pantai-air-manis",
    category: "rekreasi",
    name: "Pantai Air Manis (Batu Malin Kundang)",
    city: "Padang",
    province: SUMBAR,
    price: 10000,
    unit: "/orang",
    rating: 4.5,
    reviews: 1520,
    partner: "Pemko Padang",
    description:
      "Pantai legendaris tempat batu Malin Kundang berada. Nikmati sunset, jalan kaki ke Pulau Pisang Kecil saat air surut, dan kuliner pinggir pantai.",
    highlights: ["Situs Batu Malin Kundang", "Sunset spot", "Parkir luas"],
    colors: ["#1e3a8a", "#f97316"],
    emoji: "🌅",
  },
  {
    slug: "tur-danau-toba-samosir",
    category: "rekreasi",
    name: "Tur Sehari Danau Toba & Samosir",
    city: "Parapat",
    province: "Sumatera Utara",
    price: 350000,
    unit: "/orang",
    rating: 4.7,
    reviews: 512,
    partner: "Toba Explore",
    description:
      "Menyeberang ke Pulau Samosir, mengunjungi Makam Raja Sidabutar, Batu Kursi Siallagan, dan desa Tomok. Termasuk kapal pulang-pergi dan pemandu.",
    highlights: ["Kapal PP", "Pemandu berlisensi", "Tiket masuk objek"],
    colors: ["#1e40af", "#22c55e"],
    emoji: "🛶",
  },
  {
    slug: "kerinci-kayu-aro",
    category: "rekreasi",
    name: "Kebun Teh Kayu Aro & Danau Kaco",
    city: "Kerinci",
    province: "Jambi",
    price: 200000,
    unit: "/orang",
    rating: 4.6,
    reviews: 204,
    partner: "Kerinci Adventure",
    description:
      "Trip ke kebun teh tertua di Indonesia dan trekking ke Danau Kaco yang airnya biru jernih. Termasuk transportasi lokal dan pemandu.",
    highlights: ["Trekking 3 jam", "Pemandu lokal", "Snack & air mineral"],
    colors: ["#166534", "#a3e635"],
    emoji: "🍃",
  },

  // ---------------- AKOMODASI ----------------
  {
    slug: "mentawai-surf-resort",
    category: "akomodasi",
    name: "Mentawai Surf Resort",
    city: "Kepulauan Mentawai",
    province: SUMBAR,
    price: 3500000,
    unit: "/kamar/malam",
    rating: 4.9,
    reviews: 186,
    partner: "Mentawai Surf Resort",
    description:
      "Resort tepi pantai dekat ombak kelas dunia. Bungalow kayu dengan pemandangan laut, termasuk makan 3x sehari dan antar-jemput dari pelabuhan.",
    highlights: ["Full board 3x makan", "Antar-jemput pelabuhan", "Dekat spot surfing", "Wi-Fi"],
    colors: ["#0e7490", "#fde047"],
    emoji: "🏄",
  },
  {
    slug: "harau-valley-ecolodge",
    category: "akomodasi",
    name: "Harau Valley Ecolodge",
    city: "Lima Puluh Kota",
    province: SUMBAR,
    price: 650000,
    originalPrice: 750000,
    unit: "/kamar/malam",
    rating: 4.8,
    reviews: 402,
    partner: "Harau Valley Ecolodge",
    description:
      "Cottage ramah lingkungan di kaki tebing Lembah Harau. Bangun pagi dengan suara air terjun dan kabut di persawahan.",
    highlights: ["Sarapan", "Pemandangan tebing", "Sepeda gratis"],
    colors: ["#365314", "#facc15"],
    emoji: "🛖",
  },
  {
    slug: "ngarai-view-hotel",
    category: "akomodasi",
    name: "Ngarai View Hotel Bukittinggi",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 850000,
    unit: "/kamar/malam",
    rating: 4.6,
    reviews: 731,
    partner: "Ngarai View Hotel",
    description:
      "Hotel bintang 4 di pusat kota, 5 menit jalan kaki ke Jam Gadang. Kamar dengan balkon menghadap Ngarai Sianok.",
    highlights: ["Sarapan", "Kolam renang", "Parkir gratis", "Dekat Jam Gadang"],
    colors: ["#1f2937", "#f59e0b"],
    emoji: "🏨",
  },
  {
    slug: "maninjau-lakeside-cottage",
    category: "akomodasi",
    name: "Maninjau Lakeside Cottage",
    city: "Agam",
    province: SUMBAR,
    price: 450000,
    unit: "/kamar/malam",
    rating: 4.7,
    reviews: 298,
    partner: "Maninjau Lakeside",
    description:
      "Cottage langsung di tepi Danau Maninjau. Berenang, kayak, atau sekadar menikmati sunset di dermaga pribadi.",
    highlights: ["Dermaga pribadi", "Sarapan", "Sewa kayak"],
    colors: ["#075985", "#38bdf8"],
    emoji: "🏡",
  },
  {
    slug: "homestay-pariangan",
    category: "akomodasi",
    name: "Homestay Rumah Gadang Pariangan",
    city: "Tanah Datar",
    province: SUMBAR,
    price: 300000,
    unit: "/kamar/malam",
    rating: 4.8,
    reviews: 154,
    partner: "Pokdarwis Nagari Pariangan",
    description:
      "Menginap di Rumah Gadang asli di salah satu desa terindah di dunia. Pengalaman budaya: masak rendang bersama dan belajar randai.",
    highlights: ["Rumah Gadang asli", "Sarapan khas Minang", "Kelas masak rendang"],
    colors: ["#7f1d1d", "#fbbf24"],
    emoji: "🏠",
  },
  {
    slug: "mandeh-floating-villa",
    category: "akomodasi",
    name: "Resort Mandeh Bahari",
    city: "Pesisir Selatan",
    province: SUMBAR,
    price: 1250000,
    unit: "/kamar/malam",
    rating: 4.7,
    reviews: 221,
    partner: "Mandeh Bahari",
    description:
      "Villa di atas air dengan akses langsung ke laut tenang Kawasan Mandeh. Cocok untuk honeymoon dan keluarga.",
    highlights: ["Villa di atas air", "Sarapan", "Kano gratis"],
    colors: ["#155e75", "#5eead4"],
    emoji: "🌊",
  },
  {
    slug: "toba-samosir-villa",
    category: "akomodasi",
    name: "Samosir Lakeview Villa",
    city: "Samosir",
    province: "Sumatera Utara",
    price: 700000,
    unit: "/kamar/malam",
    rating: 4.6,
    reviews: 340,
    partner: "Samosir Lakeview",
    description:
      "Villa bergaya rumah Batak dengan pemandangan langsung ke Danau Toba di Tuktuk Siadong.",
    highlights: ["Pemandangan danau", "Sarapan", "Sewa motor"],
    colors: ["#1e3a8a", "#86efac"],
    emoji: "🏘️",
  },

  // ---------------- TRANSPORTASI ----------------
  {
    slug: "bus-pariwisata-big-bus",
    category: "transportasi",
    name: "Bus Pariwisata Big Bus 45 Kursi",
    city: "Padang",
    province: SUMBAR,
    price: 3500000,
    unit: "/unit/hari",
    rating: 4.8,
    reviews: 132,
    partner: "Minang Trans Wisata",
    description:
      "Bus besar untuk rombongan sekolah, kantor, atau keluarga besar. Harga termasuk sopir dan BBM untuk area Sumatera Barat.",
    highlights: ["45 kursi reclining", "AC, karaoke, toilet", "Sopir + BBM", "Area Sumbar"],
    colors: ["#111827", "#fbb900"],
    emoji: "🚌",
  },
  {
    slug: "bus-pariwisata-medium",
    category: "transportasi",
    name: "Bus Pariwisata Medium 31 Kursi",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 2500000,
    unit: "/unit/hari",
    rating: 4.7,
    reviews: 98,
    partner: "Minang Trans Wisata",
    description:
      "Bus medium yang lincah untuk jalur wisata berkelok seperti Kelok 44 dan Lembah Anai. Termasuk sopir dan BBM.",
    highlights: ["31 kursi", "AC & audio", "Sopir + BBM"],
    colors: ["#1f2937", "#f97316"],
    emoji: "🚍",
  },
  {
    slug: "hiace-premio",
    category: "transportasi",
    name: "Sewa Toyota Hiace 15 Kursi",
    city: "Padang",
    province: SUMBAR,
    price: 1300000,
    unit: "/unit/hari",
    rating: 4.8,
    reviews: 211,
    partner: "Ranah Minang Rent",
    description:
      "Minibus nyaman untuk rombongan kecil. Harga termasuk sopir yang paham rute wisata, belum termasuk BBM dan tol.",
    highlights: ["15 kursi", "Sopir berpengalaman", "Jemput di bandara/hotel"],
    colors: ["#334155", "#e2e8f0"],
    emoji: "🚐",
  },
  {
    slug: "innova-dengan-sopir",
    category: "transportasi",
    name: "Sewa Innova Reborn + Sopir",
    city: "Padang",
    province: SUMBAR,
    price: 750000,
    originalPrice: 850000,
    unit: "/unit/hari",
    rating: 4.9,
    reviews: 487,
    partner: "Ranah Minang Rent",
    description:
      "Mobil keluarga 7 kursi dengan sopir merangkap pemandu. Ideal untuk tur Padang - Bukittinggi - Maninjau.",
    highlights: ["7 kursi", "Sopir + BBM", "12 jam pemakaian"],
    colors: ["#475569", "#fbb900"],
    emoji: "🚙",
  },
  {
    slug: "avanza-lepas-kunci",
    category: "transportasi",
    name: "Sewa Avanza Lepas Kunci",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 400000,
    unit: "/unit/hari",
    rating: 4.5,
    reviews: 265,
    partner: "Jam Gadang Rent Car",
    description: "Sewa mobil tanpa sopir untuk Anda yang ingin bebas menjelajah. Wajib KTP & SIM A.",
    highlights: ["7 kursi", "Asuransi dasar", "Antar ke hotel"],
    colors: ["#64748b", "#f1f5f9"],
    emoji: "🚗",
  },
  {
    slug: "shuttle-bandara-bim-bukittinggi",
    category: "transportasi",
    name: "Shuttle Bandara BIM - Bukittinggi",
    city: "Padang Pariaman",
    province: SUMBAR,
    price: 120000,
    unit: "/orang",
    rating: 4.6,
    reviews: 890,
    partner: "Minang Shuttle",
    description:
      "Travel antar-jemput dari Bandara Internasional Minangkabau langsung ke hotel Anda di Bukittinggi.",
    highlights: ["Berangkat tiap jam", "Door to door", "Bagasi 20 kg"],
    colors: ["#0f172a", "#38bdf8"],
    emoji: "✈️",
  },
  {
    slug: "fastboat-padang-mentawai",
    category: "transportasi",
    name: "Fast Boat Padang - Mentawai",
    city: "Padang",
    province: SUMBAR,
    price: 300000,
    unit: "/orang",
    rating: 4.5,
    reviews: 412,
    partner: "Mentawai Fast",
    description: "Kapal cepat dari Pelabuhan Muaro Padang ke Tuapejat, Mentawai. Waktu tempuh sekitar 3,5 jam.",
    highlights: ["Kursi ber-AC", "Bagasi papan surfing", "Sekali jalan"],
    colors: ["#0c4a6e", "#e0f2fe"],
    emoji: "⛴️",
  },

  // ---------------- OLEH-OLEH ----------------
  {
    slug: "rendang-daging-500g",
    category: "oleh-oleh",
    name: "Rendang Daging Sapi 500 gr",
    city: "Padang",
    province: SUMBAR,
    price: 175000,
    unit: "/pak",
    rating: 4.9,
    reviews: 2310,
    partner: "Rendang Uni Ros",
    description:
      "Rendang kering dimasak 8 jam dengan kayu bakar. Kemasan vakum, tahan 3 bulan tanpa pengawet. Aman dibawa ke luar kota maupun luar negeri.",
    highlights: ["Kemasan vakum", "Tahan 3 bulan", "Tanpa pengawet", "Bersertifikat halal"],
    colors: ["#451a03", "#b45309"],
    emoji: "🍖",
  },
  {
    slug: "keripik-balado-250g",
    category: "oleh-oleh",
    name: "Keripik Sanjai Balado 250 gr",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 35000,
    unit: "/pak",
    rating: 4.8,
    reviews: 3021,
    partner: "Sanjai Ummi Aufa",
    description: "Keripik singkong tipis dengan bumbu balado pedas manis khas Bukittinggi.",
    highlights: ["Renyah", "Pedas manis", "Kemasan ziplock"],
    colors: ["#9a3412", "#fb923c"],
    emoji: "🌶️",
  },
  {
    slug: "galamai-payakumbuh",
    category: "oleh-oleh",
    name: "Galamai Payakumbuh",
    city: "Payakumbuh",
    province: SUMBAR,
    price: 30000,
    unit: "/kotak",
    rating: 4.7,
    reviews: 640,
    partner: "Galamai Mak Etek",
    description: "Dodol khas Minang dari tepung beras ketan, gula aren, dan santan. Legit dan harum.",
    highlights: ["Gula aren asli", "Isi 20 potong"],
    colors: ["#3f2a14", "#a16207"],
    emoji: "🍬",
  },
  {
    slug: "kopi-kawa-daun",
    category: "oleh-oleh",
    name: "Kopi Kawa Daun Kering",
    city: "Tanah Datar",
    province: SUMBAR,
    price: 40000,
    unit: "/pak",
    rating: 4.6,
    reviews: 318,
    partner: "Kawa Daun Tabek Patah",
    description: "Daun kopi kering yang diseduh seperti teh, minuman tradisional warisan zaman kolonial.",
    highlights: ["100 gr", "Bonus batok kelapa"],
    colors: ["#14532d", "#854d0e"],
    emoji: "🍵",
  },
  {
    slug: "songket-pandai-sikek",
    category: "oleh-oleh",
    name: "Kain Songket Pandai Sikek",
    city: "Tanah Datar",
    province: SUMBAR,
    price: 1500000,
    unit: "/lembar",
    rating: 4.9,
    reviews: 87,
    partner: "Tenun Pandai Sikek",
    description: "Songket tenun tangan dengan benang emas, motif tradisional Minangkabau. Dikerjakan 1-2 bulan per lembar.",
    highlights: ["Tenun tangan", "Benang emas", "Sertifikat keaslian"],
    colors: ["#7f1d1d", "#fbbf24"],
    emoji: "🧣",
  },
  {
    slug: "kaos-jam-gadang",
    category: "oleh-oleh",
    name: "Kaos Malewa Edisi Jam Gadang",
    city: "Bukittinggi",
    province: SUMBAR,
    price: 95000,
    unit: "/pcs",
    rating: 4.7,
    reviews: 152,
    partner: "Malewa Merchandise",
    description: "Kaos katun combed 30s dengan desain ilustrasi Jam Gadang eksklusif Malewa Holiday.",
    highlights: ["Katun combed 30s", "Ukuran S - XXL", "Sablon plastisol"],
    colors: ["#111111", "#fbb900"],
    emoji: "👕",
  },
  {
    slug: "bika-ambon-medan",
    category: "oleh-oleh",
    name: "Bolu Meranti Medan",
    city: "Medan",
    province: "Sumatera Utara",
    price: 90000,
    unit: "/kotak",
    rating: 4.8,
    reviews: 950,
    partner: "Toko Oleh-oleh Medan",
    description: "Bolu gulung lembut khas Medan dengan berbagai pilihan rasa. Tahan 5 hari.",
    highlights: ["Rasa keju / cokelat", "Tahan 5 hari"],
    colors: ["#78350f", "#fde68a"],
    emoji: "🍰",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export const cities = Array.from(new Set(products.map((p) => p.city))).sort();

export const popularCities = [
  { name: "Bukittinggi", emoji: "🕰️", colors: ["#7c2d12", "#f59e0b"] as [string, string] },
  { name: "Padang", emoji: "🌅", colors: ["#1e3a8a", "#f97316"] as [string, string] },
  { name: "Pesisir Selatan", emoji: "🏝️", colors: ["#0c4a6e", "#06b6d4"] as [string, string] },
  { name: "Kepulauan Mentawai", emoji: "🏄", colors: ["#0e7490", "#fde047"] as [string, string] },
  { name: "Lima Puluh Kota", emoji: "⛰️", colors: ["#064e3b", "#10b981"] as [string, string] },
  { name: "Tanah Datar", emoji: "🏯", colors: ["#78350f", "#dc2626"] as [string, string] },
];
