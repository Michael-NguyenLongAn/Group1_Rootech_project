import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Murder Mystery: Death by Design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav style={{ backgroundColor: 'var(--mystery-accent)' }} className="p-4">
          <ul className="flex justify-center space-x-10 font-bold text-black uppercase list-none m-0 p-0">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/spot-the-difference" className="hover:text-white transition">Game1: Spot Difference</Link></li>
            <li><Link href="/mine-field" className="hover:text-white transition">Game2: Minefield</Link></li>
            <li><Link href="/memory-game" className="hover:text-white transition">Game3: Memory</Link></li>
          </ul>
        </nav>

        {/* Global Web Title */}
        <header className="text-center py-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#a91c1b] tracking-tight">
            Murder Mystery: Death by Design
          </h1>
        </header>

        {children} 
      </body>
    </html>
  );
}