import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"
import { APP_URL } from "@/lib/config"

import "./globals.css"

const baseUrl = APP_URL

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Candid — Anonymous messages, honestly",
    template: "%s — Candid",
  },
  description:
    "Share your link, collect honest anonymous messages, and answer the ones you love. Your personal space for candid feedback.",
  applicationName: "Candid",
  keywords: [
    "anonymous messages",
    "candid",
    "honest feedback",
    "ask me anything",
    "anonymous Q&A",
    "ngl alternative",
    "anonymous notes",
    "sayout",
  ],
  authors: [{ name: "Avik Mukherjee" }],
  creator: "Avik Mukherjee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Candid",
    title: "Candid — Anonymous messages, honestly",
    description:
      "Share your link, collect honest anonymous messages, and answer the ones you love. Your personal space for candid feedback.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candid — Anonymous messages, honestly",
    description:
      "Share your link, collect honest anonymous messages, and answer the ones you love.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon" }],
  },
  manifest: "/site.webmanifest",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
