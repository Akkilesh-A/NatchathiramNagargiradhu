import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { NavBar } from "@/components";

const PPEditorial = localFont({ src: './fonts/PPEditorialNew-Ultralight.otf' })

export const metadata: Metadata = {
  title: "NatchathiramNagargiradhu",
  description: "Explore the cosmos in a new way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PPEditorial.className} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
