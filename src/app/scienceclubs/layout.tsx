import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Science Clubs | Mad Scientists",
  description:
    "Create your own clubs based on Mad Scientists traits. Get a special Discord role, gated chat room, and grants.",
  openGraph: {
    type: "website",
    title: "Science Clubs | Mad Scientists",
    description:
      "Create your own clubs based on Mad Scientists traits. Get a special Discord role, gated chat room, and grants.",
    images: ["/images/hero-og.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Science Clubs | Mad Scientists",
    description:
      "Create your own clubs based on Mad Scientists traits. Get a special Discord role, gated chat room, and grants.",
    images: ["/images/hero-og.gif"],
  },
  alternates: {
    canonical: "/scienceclubs",
  },
};

export default function ScienceClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
