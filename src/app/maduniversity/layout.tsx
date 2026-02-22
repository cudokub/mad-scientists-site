import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mad University | Mad Scientists",
  description:
    "Research and Reward. Create content, earn points, and climb the ranks at Mad University.",
  openGraph: {
    type: "website",
    title: "Mad University | Mad Scientists",
    description:
      "Research and Reward. Create content, earn points, and climb the ranks at Mad University.",
    images: ["/images/hero-og.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mad University | Mad Scientists",
    description:
      "Research and Reward. Create content, earn points, and climb the ranks at Mad University.",
    images: ["/images/hero-og.gif"],
  },
  alternates: {
    canonical: "/maduniversity",
  },
};

export default function MadUniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
