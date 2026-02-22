import type { Metadata } from "next";
import { Pixelify_Sans, Reddit_Mono } from "next/font/google";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const redditMono = Reddit_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mad Scientists on Osmosis",
  description:
    "Explore Mad Scientists NFTs: the PFP collection on Osmosis blockchain. Join our innovative digital collectibles journey and secure your unique art piece today.",
  openGraph: {
    type: "website",
    title: "Mad Scientists on Osmosis",
    description:
      "Explore Mad Scientists NFTs: the PFP collection on Osmosis blockchain. Join our innovative digital collectibles journey and secure your unique art piece today.",
    images: ["/images/hero-og.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mad Scientists on Osmosis",
    description:
      "Explore Mad Scientists NFTs: the PFP collection on Osmosis blockchain. Join our innovative digital collectibles journey and secure your unique art piece today.",
    images: ["/images/hero-og.gif"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} ${redditMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
