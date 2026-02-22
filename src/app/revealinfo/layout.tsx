import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reveal Info | Mad Scientists",
  description:
    "Use 10 $LAB tokens to reveal 1 Mad Scientist NFT. Learn how to reveal, trade $LAB, and explore tokenomics.",
  openGraph: {
    type: "website",
    title: "Reveal Info | Mad Scientists",
    description:
      "Use 10 $LAB tokens to reveal 1 Mad Scientist NFT. Learn how to reveal, trade $LAB, and explore tokenomics.",
    images: ["/images/hero-og.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reveal Info | Mad Scientists",
    description:
      "Use 10 $LAB tokens to reveal 1 Mad Scientist NFT. Learn how to reveal, trade $LAB, and explore tokenomics.",
    images: ["/images/hero-og.gif"],
  },
  alternates: {
    canonical: "/revealinfo",
  },
};

export default function RevealInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
