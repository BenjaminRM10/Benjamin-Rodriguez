import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Locale } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/server";
import { LocaleProvider } from "@/lib/i18n/client";
import type { CommonTranslations } from "@/lib/i18n/types";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0e27',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://appcreatorbr.com'), // Replace with actual domain if known, or use localhost for now
  title: {
    default: 'Benjamin Rodríguez | OPEX Engineer & Automation Specialist',
    template: '%s | Benjamin Rodríguez'
  },
  description: "Six Sigma certified OPEX Engineer specializing in automation, AI integration, and full-stack development. Transforming manufacturing processes with cutting-edge technology.",
  keywords: ["OPEX Engineer", "Automation", "Full-Stack Developer", "Next.js", "AI Integration", "Benjamin Rodríguez", "AppCreatorBR"],
  authors: [{ name: "Benjamin Rodríguez" }],
  creator: "Benjamin Rodríguez",
  publisher: "AppCreatorBR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appcreatorbr.com',
    title: 'Benjamin Rodríguez | OPEX Engineer & Automation Specialist',
    description: 'Six Sigma certified OPEX Engineer specializing in automation, AI integration, and full-stack development.',
    siteName: 'Benjamin Rodríguez Portfolio',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Benjamin Rodríguez Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benjamin Rodríguez | OPEX Engineer & Automation Specialist',
    description: 'Six Sigma certified OPEX Engineer specializing in automation, AI integration, and full-stack development.',
    images: ['/og-image.jpg'],
    creator: '@BenjaminRM10',
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: '/',
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

  // Load common translations for shared components
  const commonTranslations = await getTranslations<CommonTranslations>(validLang, 'common');

  return (
    <html lang={validLang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0e27] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100`}
      >
        <LocaleProvider value={{ locale: validLang }}>
          <ScrollProgress />
          <Navbar lang={validLang} translations={commonTranslations} />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <ScrollToTop />
          <Footer lang={validLang} translations={commonTranslations} />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
