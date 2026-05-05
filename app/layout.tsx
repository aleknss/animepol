import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://www.animepol.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Animepol — Catálogo de anime con análisis político",
    template: "%s | Animepol",
  },
  description:
    "Catálogo de anime con análisis político. Explora series y películas evaluadas en los ejes de libertad económica y personal según el diagrama de Nolan.",
  keywords: [
    "anime",
    "política",
    "libertad",
    "diagrama de Nolan",
    "análisis político",
    "catálogo de anime",
    "libertad económica",
    "libertad personal",
  ],
  authors: [{ name: "Animepol" }, { name: "Alek Suso" }],
  creator: "Alek Suso",
  publisher: "Animepol",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Animepol",
    title: "Animepol — Catálogo de anime con análisis político",
    description:
      "Explora series y películas evaluadas en los ejes de libertad económica y personal según el diagrama de Nolan.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Animepol" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animepol — Catálogo de anime con análisis político",
    description:
      "Explora series y películas evaluadas en los ejes de libertad económica y personal.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Animepol" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-flash" strategy="beforeInteractive">
          {`(function() {
            try {
              var t = localStorage.getItem('theme');
              if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Animepol",
              url: baseUrl,
              description:
                "Catálogo de anime con análisis político basado en el diagrama de Nolan.",
              inLanguage: "es",
            }),
          }}
        />
      </body>
    </html>
  );
}
