import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Locale } from "@/lib/i18n/config";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benjamin Rodríguez | OPEX Engineer & Automation Specialist",
  description: "Six Sigma certified OPEX Engineer specializing in automation, AI integration, and full-stack development.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const validLang = lang as Locale;
  return (
    <html lang={validLang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0e27] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100`}
      >
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
