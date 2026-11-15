/** Gambar placeholder bergradasi. Ganti dengan foto asli mitra saat data sudah tersedia. */
export default function ProductImage({
  colors,
  emoji,
  className = "",
  size = "text-5xl",
  src,
  alt = "",
}: {
  colors: [string, string];
  emoji: string;
  className?: string;
  size?: string;
  /** Foto asli dari mitra; jika ada, menggantikan placeholder */
  src?: string | null;
  alt?: string;
}) {
  if (src)
    return (
      <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
    );
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, #fff 0, transparent 40%), radial-gradient(circle at 80% 10%, #000 0, transparent 45%)",
        }}
      />
      <span className={`relative drop-shadow-lg ${size}`} aria-hidden>
        {emoji}
      </span>
    </div>
  );
}
