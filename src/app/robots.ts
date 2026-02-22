import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cosmic",
    },
    sitemap: "https://madscientists.io/sitemap.xml",
  };
}
