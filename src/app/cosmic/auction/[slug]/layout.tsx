import type { Metadata } from "next";
import { SLUG_TO_SCIENTIST, AUCTION_SCIENTISTS } from "@/lib/auction/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scientist = SLUG_TO_SCIENTIST[slug];

  if (!scientist) {
    return { title: "Not Found | COSMIC Auction" };
  }

  return {
    title: `${scientist.name} Auction | COSMIC`,
    description: `Bid your Mad Scientists to win ${scientist.name} — ${scientist.tagline}`,
    openGraph: {
      type: "website",
      title: `${scientist.name} Auction | COSMIC`,
      description: `Bid your Mad Scientists to win ${scientist.name} — ${scientist.tagline}`,
      images: [scientist.fullSrc],
    },
    twitter: {
      card: "summary_large_image",
      title: `${scientist.name} Auction | COSMIC`,
      description: `Bid your Mad Scientists to win ${scientist.name} — ${scientist.tagline}`,
      images: [scientist.fullSrc],
    },
    alternates: {
      canonical: `/cosmic/auction/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return AUCTION_SCIENTISTS.map((s) => ({ slug: s.slug }));
}

export default function AuctionDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
