import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mad Easy on Cosmos Hackathon | Mad Scientists",
  description:
    "Mad Scientists is launching Mad Easy on Cosmos, an AI-powered hackathon on Cosmos Hub for games, incentives, and onchain mad science.",
  openGraph: {
    type: "website",
    title: "Mad Easy on Cosmos Hackathon | Mad Scientists",
    description:
      "Experiment with AI on Cosmos Hub. Build gacha-inspired games, loot mechanics, bonding curves, social coordination games, and other onchain mad science.",
    images: ["/images/hackathon/announcement-clean.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mad Easy on Cosmos Hackathon | Mad Scientists",
    description:
      "An AI-powered hackathon on Cosmos Hub hosted by Mad Scientists.",
    images: ["/images/hackathon/announcement-clean.png"],
  },
  alternates: {
    canonical: "/hackathon",
  },
};

export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
