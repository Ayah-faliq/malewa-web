import { readFile } from "fs/promises";
import path from "path";
import { LOCAL_UPLOAD_DIR } from "@/lib/storage";

const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

/** Menyajikan foto yang diunggah saat berjalan lokal (tanpa Vercel Blob). */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!/^[a-z0-9-]+\.(jpg|png|webp)$/.test(name)) return new Response("Not found", { status: 404 });
  try {
    const data = await readFile(path.join(LOCAL_UPLOAD_DIR, name));
    return new Response(data, {
      headers: { "Content-Type": TYPES[name.split(".").pop()!], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
