import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "COSMIC | Mad Scientists",
  description:
    "5 hand-crafted 1/1 Mad Scientists. Each one unique. Bid your 10k collection NFTs to claim a COSMIC scientist.",
  openGraph: {
    type: "website",
    title: "COSMIC | Mad Scientists",
    description:
      "5 hand-crafted 1/1 Mad Scientists. Each one unique. Bid your 10k collection NFTs to claim a COSMIC scientist.",
    images: ["/images/cosmic-hero-2026.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "COSMIC | Mad Scientists",
    description:
      "5 hand-crafted 1/1 Mad Scientists. Each one unique. Bid your 10k collection NFTs to claim a COSMIC scientist.",
    images: ["/images/cosmic-hero-2026.png"],
  },
};

export default function CosmicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
