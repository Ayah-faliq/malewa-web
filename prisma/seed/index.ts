// Isi database dengan data contoh + akun admin & akun demo mitra.
// Jalankan: npm run db:seed
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedProducts } from "./products";
import { productTranslations } from "./products.i18n";

const db = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@malewa.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("SEED_ADMIN_PASSWORD belum diisi di .env");

  await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: "Admin Malewa", role: "ADMIN", passwordHash: await bcrypt.hash(adminPassword, 10) },
  });

  // Data contoh hanya diisi saat database masih kosong, supaya data asli mitra tidak tertimpa
  // ketika seed ikut berjalan di setiap deploy. Paksa isi ulang dengan: npm run db:seed -- --force
  const force = process.argv.includes("--force");
  if (!force && (await db.product.count()) > 0) {
    console.log("Database sudah berisi produk, data contoh dilewati. Akun admin sudah dipastikan ada.");
    return;
  }

  // Satu mitra per nama mitra di data contoh
  const partnerIds = new Map<string, string>();
  for (const p of seedProducts) {
    if (partnerIds.has(p.partner)) continue;
    const existing = await db.partner.findFirst({ where: { name: p.partner } });
    const partner =
      existing ??
      (await db.partner.create({
        data: { name: p.partner, city: p.city, province: p.province, category: p.category, status: "ACTIVE" },
      }));
    partnerIds.set(p.partner, partner.id);
  }

  for (const p of seedProducts) {
    const tr = productTranslations[p.slug];
    const data = {
      partnerId: partnerIds.get(p.partner)!,
      category: p.category,
      sub: p.sub ?? null,
      status: "PUBLISHED" as const,
      city: p.city,
      province: p.province,
      price: p.price,
      originalPrice: p.originalPrice ?? null,
      unit: p.unit,
      rating: p.rating,
      reviews: p.reviews,
      emoji: p.emoji,
      colorFrom: p.colors[0],
      colorTo: p.colors[1],
      name: p.name,
      description: p.description,
      highlights: p.highlights,
      nameEn: tr?.en.name,
      descriptionEn: tr?.en.description,
      highlightsEn: tr?.en.highlights ?? [],
      nameMs: tr?.ms.name,
      descriptionMs: tr?.ms.description,
      highlightsMs: tr?.ms.highlights ?? [],
    };
    await db.product.upsert({ where: { slug: p.slug }, update: data, create: { slug: p.slug, ...data } });
  }

  // Akun demo mitra (password sama: demo12345)
  const demoHash = await bcrypt.hash("demo12345", 10);
  for (const [email, partnerName] of [
    ["mitra.rental@malewa.com", "Ranah Minang Rent"],
    ["mitra.pasa@malewa.com", "Pasa Malewa"],
  ] as const) {
    await db.user.upsert({
      where: { email },
      update: {},
      create: { email, name: partnerName, role: "PARTNER", passwordHash: demoHash, partnerId: partnerIds.get(partnerName) },
    });
  }

  console.log(`Seed selesai: ${seedProducts.length} produk, ${partnerIds.size} mitra.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
