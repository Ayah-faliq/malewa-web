// Penyimpanan foto produk, dipilih otomatis sesuai env yang tersedia:
// 1. Supabase Storage jika SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY diisi (bucket "produk" dibuat otomatis, publik)
// 2. Vercel Blob jika BLOB_READ_WRITE_TOKEN diisi
// 3. Lokal: folder uploads-local/ yang disajikan lewat /api/uploads/[nama]
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "uploads-local");
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function saveImage(file: File): Promise<string> {
  const ext = ALLOWED.get(file.type);
  if (!ext) throw new Error("Format foto harus JPG, PNG, atau WEBP");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Ukuran foto maksimal 4 MB");
  const name = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const sbUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (sbUrl && sbKey) return uploadToSupabase(sbUrl, sbKey, name, file);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`produk/${name}`, file, { access: "public", contentType: file.type });
    return blob.url;
  }
  await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}

const SUPABASE_BUCKET = "produk";

async function uploadToSupabase(base: string, key: string, name: string, file: File) {
  const headers = { Authorization: `Bearer ${key}`, apikey: key };
  const body = Buffer.from(await file.arrayBuffer());
  const upload = () =>
    fetch(`${base}/storage/v1/object/${SUPABASE_BUCKET}/${name}`, {
      method: "POST",
      headers: { ...headers, "Content-Type": file.type, "Cache-Control": "31536000" },
      body,
    });
  let res = await upload();
  if (res.status === 404 || res.status === 400) {
    // Bucket belum ada: buat sebagai bucket publik, lalu coba lagi
    await fetch(`${base}/storage/v1/bucket`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id: SUPABASE_BUCKET, name: SUPABASE_BUCKET, public: true }),
    });
    res = await upload();
  }
  if (!res.ok) throw new Error(`Gagal mengunggah foto ke Supabase (${res.status})`);
  return `${base}/storage/v1/object/public/${SUPABASE_BUCKET}/${name}`;
}
