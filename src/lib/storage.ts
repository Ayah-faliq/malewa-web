// Penyimpanan foto produk.
// Online (Vercel): pakai Vercel Blob jika BLOB_READ_WRITE_TOKEN diisi.
// Lokal: simpan di folder uploads-local/ dan disajikan lewat /api/uploads/[nama].
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

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`produk/${name}`, file, { access: "public", contentType: file.type });
    return blob.url;
  }
  await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}
