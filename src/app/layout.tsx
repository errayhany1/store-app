import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telegram Store Manager",
  description: "Manage inventory, orders, and profits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden md:flex">
            <Sidebar />
          </aside>
          {/* Mobile Bottom Nav can be added later, for now using Sidebar only or Mobile Menu */}
          <div className="md:hidden absolute bottom-0 w-full z-50">
            {/* Mobile Nav Placeholder - Using Sidebar visible on mobile for now as simple left strip icon-only */}
            {/* For PWA, often a bottom Tab Bar is better, but let's stick to responsive sidebar for simplicity first */}
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {/* Mobile Header could go here */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
