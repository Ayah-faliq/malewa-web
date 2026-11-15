"use client";

import { useActionState, useState } from "react";
import type { Product as DbProduct } from "@prisma/client";
import { saveProduct } from "@/app/(panel)/product-actions";
import ProductImage from "@/components/ProductImage";
import { Card, Field, inputCls } from "./ui";
import { keepValuesSubmit } from "./submit";

const UNITS: [string, string][] = [
  ["person", "/orang"],
  ["roomNight", "/kamar/malam"],
  ["unitDay", "/unit/hari"],
  ["pack", "/pak"],
  ["box", "/kotak"],
  ["piece", "/pcs"],
  ["sheet", "/lembar"],
];
const DEFAULT_UNIT: Record<string, string> = { rekreasi: "person", akomodasi: "roomNight", transportasi: "unitDay", pasa: "piece" };

export default function ProductForm({
  product,
  defaults,
}: {
  product?: DbProduct;
  defaults: { category: string; city: string; province: string };
}) {
  const [state, action, pending] = useActionState(saveProduct.bind(null, product?.id ?? null), undefined);
  const [category, setCategory] = useState(product?.category ?? defaults.category);
  const [unit, setUnit] = useState(product?.unit ?? DEFAULT_UNIT[defaults.category]);
  const [colors, setColors] = useState<[string, string]>([product?.colorFrom ?? "#111111", product?.colorTo ?? "#fbb900"]);
  const [emoji, setEmoji] = useState(product?.emoji ?? "📍");
  const [preview, setPreview] = useState<string | null>(product?.imageUrl ?? null);

  return (
    <form onSubmit={keepValuesSubmit(action)} className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <Card title="Info produk">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nama produk (Bahasa Indonesia)" className="sm:col-span-2">
              <input name="name" required defaultValue={product?.name} className={inputCls} placeholder="Contoh: Tiket Masuk Lembah Harau" />
            </Field>
            <Field label="Kategori">
              <select
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setUnit(DEFAULT_UNIT[e.target.value]);
                }}
                className={inputCls}
              >
                <option value="rekreasi">Rekreasi (tiket wisata)</option>
                <option value="akomodasi">Akomodasi (penginapan)</option>
                <option value="transportasi">Transportasi</option>
                <option value="pasa">Pasa Malewa (oleh-oleh & perlengkapan)</option>
              </select>
            </Field>
            {category === "pasa" ? (
              <Field label="Jenis">
                <select name="sub" defaultValue={product?.sub ?? "kuliner"} className={inputCls}>
                  <option value="kuliner">Kuliner khas</option>
                  <option value="kerajinan">Kerajinan & merchandise</option>
                  <option value="perlengkapan">Perlengkapan trip</option>
                </select>
              </Field>
            ) : (
              <input type="hidden" name="sub" value="" />
            )}
            <Field label="Kota / kabupaten">
              <input name="city" required defaultValue={product?.city ?? defaults.city} className={inputCls} />
            </Field>
            <Field label="Provinsi">
              <input name="province" required defaultValue={product?.province ?? defaults.province} className={inputCls} />
            </Field>
            <Field label="Deskripsi" className="sm:col-span-2">
              <textarea name="description" required rows={4} defaultValue={product?.description} className={inputCls} />
            </Field>
            <Field label="Yang didapat / keunggulan" hint="Satu poin per baris" className="sm:col-span-2">
              <textarea name="highlights" rows={4} defaultValue={product?.highlights.join("\n")} className={inputCls} placeholder={"Sarapan\nParkir gratis"} />
            </Field>
          </div>
        </Card>

        <Card title="Harga & stok">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Harga jual (Rp)">
              <input name="price" type="number" min={1000} step={500} required defaultValue={product?.price} className={inputCls} />
            </Field>
            <Field label="Satuan harga">
              <select name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={inputCls}>
                {UNITS.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Harga coret (opsional)" hint="Isi jika sedang promo, harus lebih besar dari harga jual">
              <input name="originalPrice" type="number" min={0} step={500} defaultValue={product?.originalPrice ?? ""} className={inputCls} />
            </Field>
            <Field label="Stok / kuota (opsional)" hint="Kosongkan jika tidak dibatasi">
              <input name="stock" type="number" min={0} defaultValue={product?.stock ?? ""} className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card title="Terjemahan (opsional)">
          <p className="mb-4 text-sm text-neutral-500">Jika dikosongkan, pengunjung berbahasa Inggris/Melayu akan melihat teks Bahasa Indonesia.</p>
          {(
            [
              ["En", "🇬🇧 English", product?.nameEn, product?.descriptionEn, product?.highlightsEn],
              ["Ms", "🇲🇾 Bahasa Melayu", product?.nameMs, product?.descriptionMs, product?.highlightsMs],
            ] as const
          ).map(([k, label, n, d, h]) => (
            <details key={k} className="mb-3 rounded-xl border border-neutral-200 p-3" open={!!n}>
              <summary className="cursor-pointer text-sm font-bold">{label}</summary>
              <div className="mt-3 grid gap-3">
                <Field label="Nama">
                  <input name={`name${k}`} defaultValue={n ?? ""} className={inputCls} />
                </Field>
                <Field label="Deskripsi">
                  <textarea name={`description${k}`} rows={3} defaultValue={d ?? ""} className={inputCls} />
                </Field>
                <Field label="Keunggulan" hint="Satu poin per baris">
                  <textarea name={`highlights${k}`} rows={3} defaultValue={h?.join("\n") ?? ""} className={inputCls} />
                </Field>
              </div>
            </details>
          ))}
        </Card>
      </div>

      <div className="space-y-5 lg:sticky lg:top-4 lg:h-fit">
        <Card title="Foto">
          <ProductImage colors={colors} emoji={emoji} src={preview} className="mb-3 aspect-[4/3] rounded-xl" />
          <Field label="Unggah foto" hint="JPG/PNG/WEBP, maks. 4 MB">
            <input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
          </Field>
          {product?.imageUrl && (
            <label className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
              <input type="checkbox" name="removeImage" onChange={(e) => setPreview(e.target.checked ? null : product.imageUrl)} /> Hapus foto
            </label>
          )}
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer text-neutral-500">Tampilan tanpa foto (ikon & warna)</summary>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Field label="Ikon">
                <input name="emoji" value={emoji} onChange={(e) => setEmoji(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Warna 1">
                <input name="colorFrom" type="color" value={colors[0]} onChange={(e) => setColors([e.target.value, colors[1]])} className="h-9 w-full rounded" />
              </Field>
              <Field label="Warna 2">
                <input name="colorTo" type="color" value={colors[1]} onChange={(e) => setColors([colors[0], e.target.value])} className="h-9 w-full rounded" />
              </Field>
            </div>
          </details>
        </Card>

        <Card title="Publikasi">
          <select name="status" defaultValue={product?.status ?? "PUBLISHED"} className={inputCls}>
            <option value="PUBLISHED">Tayang di website</option>
            <option value="DRAFT">Simpan sebagai draf</option>
          </select>
          {state?.error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{state.error}</p>}
          <button disabled={pending} className="mt-3 w-full rounded-xl bg-accent py-3 font-bold text-white hover:brightness-110 disabled:opacity-60">
            {pending ? "Menyimpan..." : "Simpan produk"}
          </button>
        </Card>
      </div>
    </form>
  );
}
