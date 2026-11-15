// Terjemahan isi produk. Bahasa Indonesia ada di products.ts; di sini English (en) dan Bahasa Melayu (ms).
// Nanti dipindah ke database (kolom per bahasa) dan diisi lewat panel mitra/admin.

export type ProductText = { name: string; description: string; highlights: string[] };

export const productTranslations: Record<string, { en: ProductText; ms: ProductText }> = {
  "jam-gadang-bukittinggi": {
    en: { name: "Jam Gadang Clock Tower Climb", description: "Climb Bukittinggi's iconic clock tower and enjoy panoramic views of Mount Marapi, Mount Singgalang, and the city. Valid for one visit on the selected date.", highlights: ["Access to the upper floor", "Local guide available", "Open 8 AM - 5 PM"] },
    ms: { name: "Tiket Naik Menara Jam Gadang", description: "Naik ke puncak ikon bandar Bukittinggi dan nikmati panorama Gunung Marapi, Gunung Singgalang dan bandar dari ketinggian. Sah untuk satu lawatan pada tarikh dipilih.", highlights: ["Akses ke tingkat atas menara", "Pemandu tempatan disediakan", "Dibuka 8 pagi - 5 petang"] },
  },
  "ngarai-sianok-lobang-jepang": {
    en: { name: "Sianok Canyon & Japanese Tunnel", description: "Entry to Panorama Park with sweeping views of Sianok Canyon, plus a walk through the historic Japanese Tunnel from World War II.", highlights: ["Combo ticket for 2 sites", "Sianok Canyon photo spot", "1.4 km tunnel"] },
    ms: { name: "Ngarai Sianok & Lubang Jepun", description: "Pakej masuk Taman Panorama dengan pemandangan Ngarai Sianok yang megah, sambil meneroka terowong bersejarah Lubang Jepun dari Perang Dunia II.", highlights: ["Tiket gabungan 2 tarikan", "Tempat bergambar Ngarai Sianok", "Terowong sepanjang 1.4 km"] },
  },
  "lembah-harau": {
    en: { name: "Harau Valley Nature Area", description: "A valley framed by 100-500 m granite cliffs and the Sarasah waterfalls. Great for trekking, rock climbing, and relaxing among rice fields.", highlights: ["Sarasah Bunta Waterfall", "Echo Point", "Camping area"] },
    ms: { name: "Kawasan Pelancongan Lembah Harau", description: "Lembah dengan tebing granit setinggi 100-500 meter dan air terjun Sarasah. Sesuai untuk mendaki, memanjat tebing dan bersantai di tengah sawah.", highlights: ["Air Terjun Sarasah Bunta", "Echo Point", "Kawasan perkhemahan"] },
  },
  "istano-basa-pagaruyung": {
    en: { name: "Pagaruyung Royal Palace", description: "A grand replica of the Pagaruyung Kingdom palace in traditional Rumah Gadang style. Traditional costume rental for photos is available on site (extra charge).", highlights: ["Minangkabau culture museum", "Traditional costume rental", "Spacious family-friendly grounds"] },
    ms: { name: "Istana Pagaruyung", description: "Replika istana Kerajaan Pagaruyung dengan seni bina Rumah Gadang yang megah. Sewaan pakaian tradisional untuk bergambar tersedia di lokasi (caj tambahan).", highlights: ["Muzium budaya Minangkabau", "Sewa pakaian tradisional", "Taman luas untuk keluarga"] },
  },
  "mandeh-island-hopping": {
    en: { name: "Mandeh Island Hopping Tour", description: "A full-day boat tour to Setan, Sironjong, and Cubadak islands. Includes snorkelling, grilled fish lunch, and life jackets.", highlights: ["Boat + skipper", "Snorkelling gear", "Lunch", "Photo documentation"] },
    ms: { name: "Lawatan Pulau Kawasan Mandeh", description: "Lawatan bot sehari ke Pulau Setan, Pulau Sironjong dan Pulau Cubadak. Termasuk snorkeling, makan tengah hari ikan bakar dan jaket keselamatan.", highlights: ["Bot + jurumudi", "Peralatan snorkeling", "Makan tengah hari", "Dokumentasi"] },
  },
  "pantai-air-manis": {
    en: { name: "Air Manis Beach (Malin Kundang Stone)", description: "The legendary beach of the Malin Kundang stone. Enjoy the sunset, walk to Pisang Kecil Island at low tide, and try beachside food.", highlights: ["Malin Kundang stone site", "Sunset spot", "Ample parking"] },
    ms: { name: "Pantai Air Manis (Batu Malin Kundang)", description: "Pantai legenda tempat batu Malin Kundang. Nikmati matahari terbenam, berjalan ke Pulau Pisang Kecil ketika air surut dan juadah tepi pantai.", highlights: ["Tapak Batu Malin Kundang", "Tempat matahari terbenam", "Tempat letak kereta luas"] },
  },
  "tur-danau-toba-samosir": {
    en: { name: "Lake Toba & Samosir Day Tour", description: "Cross to Samosir Island and visit King Sidabutar's Tomb, the Siallagan Stone Chairs, and Tomok village. Includes return ferry and guide.", highlights: ["Return ferry", "Licensed guide", "Entrance tickets"] },
    ms: { name: "Lawatan Sehari Tasik Toba & Samosir", description: "Menyeberang ke Pulau Samosir, melawat Makam Raja Sidabutar, Kerusi Batu Siallagan dan kampung Tomok. Termasuk feri pergi-balik dan pemandu.", highlights: ["Feri pergi-balik", "Pemandu berlesen", "Tiket masuk tarikan"] },
  },
  "kerinci-kayu-aro": {
    en: { name: "Kayu Aro Tea Estate & Kaco Lake", description: "Visit Indonesia's oldest tea plantation and trek to the crystal-blue Kaco Lake. Includes local transport and guide.", highlights: ["3-hour trek", "Local guide", "Snacks & water"] },
    ms: { name: "Ladang Teh Kayu Aro & Tasik Kaco", description: "Lawatan ke ladang teh tertua di Indonesia dan mendaki ke Tasik Kaco yang biru jernih. Termasuk pengangkutan tempatan dan pemandu.", highlights: ["Mendaki 3 jam", "Pemandu tempatan", "Snek & air mineral"] },
  },
  "mentawai-surf-resort": {
    en: { name: "Mentawai Surf Resort", description: "Beachfront resort close to world-class waves. Wooden bungalows with sea views, three meals a day, and port transfers included.", highlights: ["Full board, 3 meals", "Port transfers", "Near surf breaks", "Wi-Fi"] },
    ms: { name: "Mentawai Surf Resort", description: "Resort tepi pantai berhampiran ombak bertaraf dunia. Banglo kayu dengan pemandangan laut, termasuk 3 kali makan sehari dan pengangkutan dari jeti.", highlights: ["Makan 3 kali sehari", "Pengangkutan dari jeti", "Dekat tempat meluncur", "Wi-Fi"] },
  },
  "harau-valley-ecolodge": {
    en: { name: "Harau Valley Ecolodge", description: "Eco-friendly cottages at the foot of Harau's cliffs. Wake up to the sound of waterfalls and mist over the rice fields.", highlights: ["Breakfast", "Cliff views", "Free bicycles"] },
    ms: { name: "Harau Valley Ecolodge", description: "Kotej mesra alam di kaki tebing Lembah Harau. Bangun pagi dengan bunyi air terjun dan kabus di sawah.", highlights: ["Sarapan", "Pemandangan tebing", "Basikal percuma"] },
  },
  "ngarai-view-hotel": {
    en: { name: "Ngarai View Hotel Bukittinggi", description: "A 4-star city-centre hotel, a 5-minute walk from Jam Gadang. Rooms with balconies overlooking Sianok Canyon.", highlights: ["Breakfast", "Swimming pool", "Free parking", "Near Jam Gadang"] },
    ms: { name: "Ngarai View Hotel Bukittinggi", description: "Hotel 4 bintang di pusat bandar, 5 minit berjalan kaki ke Jam Gadang. Bilik dengan balkoni menghadap Ngarai Sianok.", highlights: ["Sarapan", "Kolam renang", "Tempat letak kereta percuma", "Dekat Jam Gadang"] },
  },
  "maninjau-lakeside-cottage": {
    en: { name: "Maninjau Lakeside Cottage", description: "Cottages right on the shore of Lake Maninjau. Swim, kayak, or simply enjoy the sunset from the private jetty.", highlights: ["Private jetty", "Breakfast", "Kayak rental"] },
    ms: { name: "Maninjau Lakeside Cottage", description: "Kotej betul-betul di tepi Tasik Maninjau. Berenang, berkayak atau sekadar menikmati matahari terbenam dari jeti peribadi.", highlights: ["Jeti peribadi", "Sarapan", "Sewa kayak"] },
  },
  "homestay-pariangan": {
    en: { name: "Pariangan Rumah Gadang Homestay", description: "Stay in an authentic Rumah Gadang in one of the world's most beautiful villages. Cultural activities include cooking rendang and learning randai dance.", highlights: ["Authentic Rumah Gadang", "Minang breakfast", "Rendang cooking class"] },
    ms: { name: "Homestay Rumah Gadang Pariangan", description: "Menginap di Rumah Gadang asli di salah satu kampung tercantik di dunia. Pengalaman budaya: masak rendang bersama dan belajar randai.", highlights: ["Rumah Gadang asli", "Sarapan ala Minang", "Kelas masak rendang"] },
  },
  "mandeh-floating-villa": {
    en: { name: "Mandeh Bahari Resort", description: "Overwater villas with direct access to the calm sea of Mandeh. Perfect for honeymoons and families.", highlights: ["Overwater villa", "Breakfast", "Free canoe"] },
    ms: { name: "Resort Mandeh Bahari", description: "Vila atas air dengan akses terus ke laut tenang Kawasan Mandeh. Sesuai untuk bulan madu dan keluarga.", highlights: ["Vila atas air", "Sarapan", "Kanu percuma"] },
  },
  "toba-samosir-villa": {
    en: { name: "Samosir Lakeview Villa", description: "Batak-style villas with direct views of Lake Toba in Tuktuk Siadong.", highlights: ["Lake view", "Breakfast", "Scooter rental"] },
    ms: { name: "Samosir Lakeview Villa", description: "Vila gaya rumah Batak dengan pemandangan terus ke Tasik Toba di Tuktuk Siadong.", highlights: ["Pemandangan tasik", "Sarapan", "Sewa motosikal"] },
  },
  "bus-pariwisata-big-bus": {
    en: { name: "45-Seat Big Tour Bus", description: "A full-size coach for school, office, or large family groups. Price includes driver and fuel within West Sumatra.", highlights: ["45 reclining seats", "AC, karaoke, toilet", "Driver + fuel", "West Sumatra area"] },
    ms: { name: "Bas Persiaran Besar 45 Tempat Duduk", description: "Bas besar untuk rombongan sekolah, pejabat atau keluarga besar. Harga termasuk pemandu dan minyak untuk kawasan Sumatera Barat.", highlights: ["45 kerusi boleh baring", "Penghawa dingin, karaoke, tandas", "Pemandu + minyak", "Kawasan Sumbar"] },
  },
  "bus-pariwisata-medium": {
    en: { name: "31-Seat Medium Tour Bus", description: "A nimble medium bus for winding scenic routes like Kelok 44 and Anai Valley. Includes driver and fuel.", highlights: ["31 seats", "AC & audio", "Driver + fuel"] },
    ms: { name: "Bas Persiaran Sederhana 31 Tempat Duduk", description: "Bas sederhana yang lincah untuk laluan berliku seperti Kelok 44 dan Lembah Anai. Termasuk pemandu dan minyak.", highlights: ["31 tempat duduk", "Penghawa dingin & audio", "Pemandu + minyak"] },
  },
  "hiace-premio": {
    en: { name: "15-Seat Toyota Hiace Rental", description: "A comfortable minibus for small groups. Includes a driver who knows the tourist routes; fuel and tolls not included.", highlights: ["15 seats", "Experienced driver", "Airport/hotel pickup"] },
    ms: { name: "Sewa Toyota Hiace 15 Tempat Duduk", description: "Van selesa untuk rombongan kecil. Termasuk pemandu yang arif laluan pelancongan, tidak termasuk minyak dan tol.", highlights: ["15 tempat duduk", "Pemandu berpengalaman", "Ambil di lapangan terbang/hotel"] },
  },
  "innova-dengan-sopir": {
    en: { name: "Innova Reborn with Driver", description: "A 7-seat family car with a driver who doubles as your guide. Ideal for a Padang - Bukittinggi - Maninjau tour.", highlights: ["7 seats", "Driver + fuel", "12 hours of use"] },
    ms: { name: "Sewa Innova Reborn + Pemandu", description: "Kereta keluarga 7 tempat duduk dengan pemandu merangkap pemandu pelancong. Sesuai untuk lawatan Padang - Bukittinggi - Maninjau.", highlights: ["7 tempat duduk", "Pemandu + minyak", "Penggunaan 12 jam"] },
  },
  "avanza-lepas-kunci": {
    en: { name: "Self-Drive Avanza Rental", description: "Rent a car without a driver and explore at your own pace. Valid ID & driving licence required.", highlights: ["7 seats", "Basic insurance", "Delivered to your hotel"] },
    ms: { name: "Sewa Avanza Tanpa Pemandu", description: "Sewa kereta tanpa pemandu untuk anda yang ingin bebas meneroka. Wajib kad pengenalan & lesen memandu.", highlights: ["7 tempat duduk", "Insurans asas", "Dihantar ke hotel"] },
  },
  "shuttle-bandara-bim-bukittinggi": {
    en: { name: "BIM Airport - Bukittinggi Shuttle", description: "Door-to-door shuttle from Minangkabau International Airport straight to your hotel in Bukittinggi.", highlights: ["Hourly departures", "Door to door", "20 kg luggage"] },
    ms: { name: "Shuttle Lapangan Terbang BIM - Bukittinggi", description: "Perkhidmatan dari Lapangan Terbang Antarabangsa Minangkabau terus ke hotel anda di Bukittinggi.", highlights: ["Bertolak setiap jam", "Pintu ke pintu", "Bagasi 20 kg"] },
  },
  "fastboat-padang-mentawai": {
    en: { name: "Padang - Mentawai Fast Boat", description: "Fast boat from Muaro Port in Padang to Tuapejat, Mentawai. Travel time about 3.5 hours.", highlights: ["Air-conditioned seats", "Surfboard luggage OK", "One way"] },
    ms: { name: "Bot Laju Padang - Mentawai", description: "Bot laju dari Pelabuhan Muaro Padang ke Tuapejat, Mentawai. Masa perjalanan kira-kira 3.5 jam.", highlights: ["Kerusi berhawa dingin", "Bagasi papan luncur", "Sehala"] },
  },
  "rendang-daging-500g": {
    en: { name: "Beef Rendang 500 g", description: "Dry rendang slow-cooked for 8 hours over firewood. Vacuum-packed, keeps 3 months without preservatives. Safe to take home or abroad.", highlights: ["Vacuum-packed", "Keeps 3 months", "No preservatives", "Halal certified"] },
    ms: { name: "Rendang Daging Lembu 500 g", description: "Rendang kering dimasak 8 jam dengan kayu api. Pembungkusan vakum, tahan 3 bulan tanpa pengawet. Selamat dibawa pulang ke luar negara.", highlights: ["Pembungkusan vakum", "Tahan 3 bulan", "Tanpa pengawet", "Bersijil halal"] },
  },
  "keripik-balado-250g": {
    en: { name: "Sanjai Balado Cassava Chips 250 g", description: "Thin cassava chips coated in Bukittinggi's signature sweet-and-spicy balado chilli.", highlights: ["Crispy", "Sweet & spicy", "Resealable pack"] },
    ms: { name: "Kerepek Sanjai Balado 250 g", description: "Kerepek ubi kayu nipis dengan perencah balado pedas manis khas Bukittinggi.", highlights: ["Rangup", "Pedas manis", "Bungkusan ziplock"] },
  },
  "galamai-payakumbuh": {
    en: { name: "Payakumbuh Galamai", description: "A traditional Minang sweet made from glutinous rice flour, palm sugar, and coconut milk. Rich and fragrant.", highlights: ["Real palm sugar", "20 pieces"] },
    ms: { name: "Galamai Payakumbuh", description: "Dodol tradisional Minang daripada tepung pulut, gula enau dan santan. Lemak dan harum.", highlights: ["Gula enau asli", "Isi 20 potong"] },
  },
  "kopi-kawa-daun": {
    en: { name: "Kawa Daun Dried Coffee Leaves", description: "Dried coffee leaves brewed like tea, a traditional drink dating back to the colonial era.", highlights: ["100 g", "Free coconut-shell cup"] },
    ms: { name: "Kopi Kawa Daun Kering", description: "Daun kopi kering yang dibancuh seperti teh, minuman tradisional warisan zaman kolonial.", highlights: ["100 g", "Percuma cawan tempurung"] },
  },
  "songket-pandai-sikek": {
    en: { name: "Pandai Sikek Songket Cloth", description: "Hand-woven songket with gold thread in traditional Minangkabau motifs. Each piece takes 1-2 months to make.", highlights: ["Hand-woven", "Gold thread", "Certificate of authenticity"] },
    ms: { name: "Kain Songket Pandai Sikek", description: "Songket tenunan tangan dengan benang emas, motif tradisional Minangkabau. Mengambil masa 1-2 bulan sehelai.", highlights: ["Tenunan tangan", "Benang emas", "Sijil keaslian"] },
  },
  "kaos-jam-gadang": {
    en: { name: "Malewa Jam Gadang Edition T-Shirt", description: "30s combed cotton T-shirt featuring an exclusive Malewa Holiday Jam Gadang illustration.", highlights: ["30s combed cotton", "Sizes S - XXL", "Plastisol print"] },
    ms: { name: "Baju-T Malewa Edisi Jam Gadang", description: "Baju-T kapas combed 30s dengan reka bentuk ilustrasi Jam Gadang eksklusif Malewa Holiday.", highlights: ["Kapas combed 30s", "Saiz S - XXL", "Cetakan plastisol"] },
  },
  "bolu-meranti-medan": {
    en: { name: "Bolu Meranti Medan Roll Cake", description: "Medan's famous soft roll cake in a choice of flavours. Keeps for 5 days.", highlights: ["Cheese / chocolate", "Keeps 5 days"] },
    ms: { name: "Kek Gulung Bolu Meranti Medan", description: "Kek gulung lembut terkenal dari Medan dengan pelbagai pilihan perisa. Tahan 5 hari.", highlights: ["Perisa keju / coklat", "Tahan 5 hari"] },
  },
  "handuk-saset-10": {
    en: { name: "Compressed Travel Towels (10 pack)", description: "Candy-sized compressed cotton towels that expand into a 30x30 cm face towel when wet. Handy for treks, beaches, and bus rides.", highlights: ["10 tablets", "100% cotton", "Reusable"] },
    ms: { name: "Tuala Mampat Percutian (10 biji)", description: "Tuala kapas mampat sebesar gula-gula, mengembang menjadi tuala muka 30x30 cm apabila dibasahkan. Praktikal untuk mendaki, pantai dan perjalanan bas.", highlights: ["10 biji", "100% kapas", "Boleh guna semula"] },
  },
  "tas-travel-lipat-40l": {
    en: { name: "Foldable Travel Bag 40L", description: "A lightweight duffel that folds down to wallet size. Room for the extra souvenirs on your way home.", highlights: ["40 litre capacity", "Water-resistant nylon", "Slips over suitcase handle"] },
    ms: { name: "Beg Pelancongan Boleh Lipat 40L", description: "Beg duffel ringan yang boleh dilipat sekecil dompet. Muat untuk cenderahati tambahan selepas bercuti.", highlights: ["Kapasiti 40 liter", "Nilon kalis air", "Boleh disarung pada pemegang bagasi"] },
  },
  "bantal-leher-memory-foam": {
    en: { name: "Memory Foam Neck Pillow", description: "Your sleeping buddy on tour buses and planes. Supportive memory foam with a washable cover.", highlights: ["Memory foam", "Washable cover", "Free eye mask"] },
    ms: { name: "Bantal Leher Memory Foam", description: "Teman tidur dalam bas persiaran dan kapal terbang. Busa memory foam yang menyokong leher dengan sarung boleh dibasuh.", highlights: ["Memory foam", "Sarung boleh dibasuh", "Percuma penutup mata"] },
  },
  "dry-bag-10l": {
    en: { name: "Waterproof Dry Bag 10L", description: "A must for Mandeh island hopping and Mentawai trips. Keeps your phone, wallet, and clothes dry.", highlights: ["10 litre capacity", "Shoulder strap", "Splash & brief submersion proof"] },
    ms: { name: "Beg Kering Kalis Air 10L", description: "Wajib dibawa untuk lawatan pulau Mandeh dan Mentawai. Telefon, dompet dan pakaian kekal kering.", highlights: ["Kapasiti 10 liter", "Tali sandang", "Tahan percikan & rendaman singkat"] },
  },
  "jas-hujan-ponco": {
    en: { name: "Trekking Rain Poncho", description: "A lightweight poncho that also covers your backpack. Ideal for the changeable highland weather of Bukittinggi and Harau Valley.", highlights: ["Covers backpack", "Packs into a small pouch", "One size"] },
    ms: { name: "Ponco Hujan Mendaki", description: "Ponco ringan yang turut menutup beg galas. Sesuai untuk cuaca tanah tinggi Bukittinggi dan Lembah Harau yang cepat berubah.", highlights: ["Menutup beg galas", "Dilipat jadi kantung kecil", "Saiz bebas"] },
  },
  "travel-kit-toiletries": {
    en: { name: "6-in-1 Toiletries Travel Kit", description: "Soap, shampoo, toothbrush, toothpaste, comb, and spray bottle in a clear pouch. Meets cabin liquid rules.", highlights: ["6 items", "Clear pouch", "Cabin-friendly"] },
    ms: { name: "Kit Kelengkapan Diri 6-dalam-1", description: "Sabun, syampu, berus gigi, ubat gigi, sikat dan botol semburan dalam kantung lut sinar. Mematuhi peraturan cecair kabin.", highlights: ["6 item lengkap", "Kantung lut sinar", "Mesra kabin"] },
  },
};
