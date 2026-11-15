/** Gambar placeholder bergradasi. Ganti dengan foto asli mitra saat data sudah tersedia. */
export default function ProductImage({
  colors,
  emoji,
  className = "",
  size = "text-5xl",
}: {
  colors: [string, string];
  emoji: string;
  className?: string;
  size?: string;
}) {
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
