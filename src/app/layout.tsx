import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/header';
import Footer from './components/footer';
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
  title: "KPB Litter Data",
  description: "View and edit litter data",
  icons: ["/favicon.png"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col gap-8 justify-between h-full">
        <div className="flex flex-col gap-2">
          <Link
            href="#main-content"
            className="absolute top-[-3em] bg-white focus:top-[0px] p-1 rounded-xs">
            Skip to main content
          </Link>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
