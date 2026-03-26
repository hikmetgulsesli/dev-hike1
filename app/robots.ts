import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://hikmetgulsesli.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/404", "/500"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
