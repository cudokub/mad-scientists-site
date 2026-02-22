import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holders Snapshot | Mad Scientists",
  description:
    "Daily snapshot of Mad Scientists NFT holders. Download Stargaze and Osmosis address lists.",
  openGraph: {
    type: "website",
    title: "Holders Snapshot | Mad Scientists",
    description:
      "Daily snapshot of Mad Scientists NFT holders. Download Stargaze and Osmosis address lists.",
    images: ["/images/hero-og.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holders Snapshot | Mad Scientists",
    description:
      "Daily snapshot of Mad Scientists NFT holders. Download Stargaze and Osmosis address lists.",
    images: ["/images/hero-og.gif"],
  },
  alternates: {
    canonical: "/snapshot",
  },
};

export default function SnapshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
