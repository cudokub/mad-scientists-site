import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "COSMIC Auction | Mad Scientists",
  description:
    "5 simultaneous auctions for 5 hand-crafted 1/1 COSMIC Mad Scientists. Bid your 10k collection NFTs to claim a legendary.",
  openGraph: {
    type: "website",
    title: "COSMIC Auction | Mad Scientists",
    description:
      "5 simultaneous auctions for 5 hand-crafted 1/1 COSMIC Mad Scientists. Bid your 10k collection NFTs to claim a legendary.",
    images: ["/images/cosmic-hero-2026-v4.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "COSMIC Auction | Mad Scientists",
    description:
      "5 simultaneous auctions for 5 hand-crafted 1/1 COSMIC Mad Scientists. Bid your 10k collection NFTs to claim a legendary.",
    images: ["/images/cosmic-hero-2026-v4.png"],
  },
  alternates: {
    canonical: "/cosmic/auction",
  },
};

export default function AuctionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
