// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // Ensure standard Tailwind or CSS rules are here

export const metadata: Metadata = {
  title: "E-Commerce Performance Dashboard",
  description: "Next.js Architecture Prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">
        {/* Persistent Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-6">
          <div className="text-xl font-bold tracking-wider">⚡ Core Dash</div>
          <nav className="flex flex-col gap-3">
            <Link href="/products" className="hover:text-blue-400 transition-colors">SSG Products</Link>
            <Link href="/dashboard" className="hover:text-blue-400 transition-colors">SSR Dashboard</Link>
            <Link href="/posts" className="hover:text-blue-400 transition-colors">ISR Posts Feed</Link>
            <Link href="/todos" className="hover:text-blue-400 transition-colors">CSR Todo Filter</Link>
          </nav>
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}