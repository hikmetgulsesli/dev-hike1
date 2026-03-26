import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hikmetgulsesli.com";

// Static last modified date for pages that don't change often
const STATIC_DATE = new Date("2024-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: STATIC_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: STATIC_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: STATIC_DATE,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: STATIC_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Dynamic blog post slugs
    {
      url: `${BASE_URL}/blog/optimizing-react-60fps`,
      lastModified: new Date("2024-06-12"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Dynamic project slugs
    {
      url: `${BASE_URL}/projects/vesta-dashboard`,
      lastModified: new Date("2024-05-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return routes;
}
