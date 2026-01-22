import type { Metadata, Viewport } from "next"; //resizing on phone
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

// Scale phone
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation bar */}
        <nav style={{ backgroundColor: 'var(--mystery-accent)' }} className="p-4 shadow-md">
          <ul className="flex flex-wrap justify-center gap-4 md:gap-10 font-bold text-black uppercase list-none m-0 p-0 text-sm md:text-base">
            <li><Link href="/" className="hover:text-white transition whitespace-nowrap">|Home| </Link></li>
            <li><Link href="/spot-the-difference" className="hover:text-white transition whitespace-nowrap">|Game1: Spot Difference| </Link></li>
            <li><Link href="/mine-field" className="hover:text-white transition whitespace-nowrap">|Game2: Minefield| </Link></li>
            <li><Link href="/memory-game" className="hover:text-white transition whitespace-nowrap">|Game3: Memory| </Link></li>
            <li><Link href="/keep-talking" className="hover:text-white transition whitespace-nowrap">|Game4: Keep Talking| </Link></li>
          </ul>
        </nav>

        {/* Global web title */}
        <header className="text-center py-10">
          <h1 className="text-4xl sm:text-4x1 md:text-6xl font-serif font-bold text-[#a91c1b] tracking-tight">
            Murder Mystery: <br className="md:hidden"></br>Death by Design
          </h1>
        </header>

        <main className="w-full overflow-x-hidden">
          {children} 
        </main>
      </body>
    </html>
  );
}