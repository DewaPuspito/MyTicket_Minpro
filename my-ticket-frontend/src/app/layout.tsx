// app/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/atomics/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Daftar path yang tidak ingin menampilkan navbar
  const hideNavbarRoutes = ["/signin", "/signup", "/event/[id]"];

  const hideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route.replace("[id]", ""))
  );

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
