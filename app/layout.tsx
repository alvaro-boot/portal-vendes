import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"

export const metadata: Metadata = {
  title: "Portal Vendes - Crea tu presencia digital",
  description:
    "Portal administrativo moderno para gestión de sitios web. Crea, gestiona y analiza tu presencia digital desde un solo lugar.",
  generator: "v0.app",
  keywords: "portal administrativo, sitios web, tienda online, analítica, gestión digital",
  authors: [{ name: "Portal Vendes" }],
  creator: "Portal Vendes",
  publisher: "Portal Vendes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portal-vendes.vercel.app"),
  openGraph: {
    title: "Portal Vendes - Crea tu presencia digital",
    description: "Portal administrativo moderno para gestión de sitios web",
    url: "https://portal-vendes.vercel.app",
    siteName: "Portal Vendes",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Vendes - Crea tu presencia digital",
    description: "Portal administrativo moderno para gestión de sitios web",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#551BB3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Portal Vendes" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
