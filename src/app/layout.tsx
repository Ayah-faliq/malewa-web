import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const display = Alfa_Slab_One({ variable: "--font-display-face", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Malewa Holiday - Tiket Wisata, Penginapan, Transportasi & Oleh-oleh Sumatera Barat",
  description:
    "Pesan tiket masuk destinasi wisata, resort & penginapan, bus pariwisata & sewa mobil, serta oleh-oleh khas Sumatera Barat dalam satu tempat.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${display.variable} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
