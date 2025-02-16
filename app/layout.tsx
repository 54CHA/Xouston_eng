import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/contexts/ModalContext";
import RequestModal from "@/components/RequestModal";
import YandexMetrika from "@/components/YandexMetrika";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://xouston.com"),
  title: "Xouston - Digital Lab | Web & Mobile Development",
  description:
    "Creating modern websites, mobile applications and Telegram Mini Apps. Professional development of digital solutions for business.",
  keywords:
    "web development, web applications, mobile apps, telegram mini apps, digital agency, web studio",
  openGraph: {
    title: "Xouston - Digital Lab | Web & App Development",
    description:
      "Creating modern websites, mobile applications and Telegram Mini Apps. Professional development of digital solutions for business.",
    url: "https://xouston.com",
    siteName: "Xouston Digital Lab",
    images: [
      {
        url: "/xouston_logo.png",
        width: 1200,
        height: 630,
        alt: "Xouston Digital Lab - Digital Solutions Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    yandex: "your-yandex-verification",
    google: "your-google-verification",
  },
  alternates: {
    canonical: "https://xouston.com",
  },
  authors: [{ name: "Xouston Digital Lab" }],
  category: "technology",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Xouston",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/xouston_logo.png" sizes="any" />
        <link rel="icon" href="/xouston_logo.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/xouston_logo.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <ModalProvider>
            <Navbar />
            {children}
            <RequestModal />
            <YandexMetrika />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
