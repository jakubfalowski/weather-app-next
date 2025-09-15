import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/components/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Insights – Next.js",
  description: "SSR/CSR, Edge, caching, streaming, Server Actions, Tailwind",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-dvh antialiased bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900")}>        
        <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur bg-white/70 dark:bg-slate-950/60">
          <div className="container-nice py-3 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">Weather Insights</a>
            <nav className="text-sm opacity-80">
              <a className="hover:opacity-100" href="/">Demo</a>
            </nav>
          </div>
        </header>
        <main className="container-nice py-6">{children}</main>
        <footer className="container-nice py-8 text-xs opacity-70">Built with Next.js App Router · Open‑Meteo</footer>
      </body>
    </html>
  );
}
