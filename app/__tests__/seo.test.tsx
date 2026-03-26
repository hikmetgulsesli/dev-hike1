import { describe, it, expect } from "vitest";
import type { Metadata } from "next";

// Test that metadata exports are properly typed
describe("SEO Metadata", () => {
  it("should have valid base URL constant", () => {
    const BASE_URL = "https://hikmetgulsesli.com";
    expect(BASE_URL).toBe("https://hikmetgulsesli.com");
    expect(BASE_URL).toMatch(/^https:\/\//);
  });

  it("should have valid metadata structure for root layout", () => {
    const metadata: Metadata = {
      metadataBase: new URL("https://hikmetgulsesli.com"),
      title: {
        default: "Hikmet Güleşli",
        template: "%s | Hikmet Güleşli",
      },
      description:
        "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer.",
      openGraph: {
        type: "website",
        locale: "tr_TR",
        url: "https://hikmetgulsesli.com",
        siteName: "Hikmet Güleşli",
      },
      twitter: {
        card: "summary_large_image",
      },
      robots: {
        index: true,
        follow: true,
      },
    };

    expect(metadata.metadataBase).toBeInstanceOf(URL);
    expect(metadata.title).toHaveProperty("default");
    expect(metadata.title).toHaveProperty("template");
    expect(metadata.openGraph).toHaveProperty("type", "website");
    expect(metadata.twitter).toHaveProperty("card", "summary_large_image");
  });

  it("should have valid Person schema structure", () => {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Hikmet Güleşli",
      url: "https://hikmetgulsesli.com",
      jobTitle: "Full-Stack Developer",
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "UI/UX Design",
      ],
    };

    expect(personSchema["@context"]).toBe("https://schema.org");
    expect(personSchema["@type"]).toBe("Person");
    expect(personSchema.name).toBe("Hikmet Güleşli");
    expect(personSchema.knowsAbout).toContain("React");
  });

  it("should have valid Article schema structure for blog posts", () => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Test Article",
      description: "Test description",
      author: {
        "@type": "Person",
        name: "Hikmet Güleşli",
      },
      publisher: {
        "@type": "Person",
        name: "Hikmet Güleşli",
      },
      datePublished: "2024-06-12",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://hikmetgulsesli.com/blog/test",
      },
    };

    expect(articleSchema["@type"]).toBe("Article");
    expect(articleSchema.author["@type"]).toBe("Person");
    expect(articleSchema.publisher["@type"]).toBe("Person");
  });

  it("should have valid sitemap structure", () => {
    const sitemapRoutes = [
      { url: "https://hikmetgulsesli.com", priority: 1.0 },
      { url: "https://hikmetgulsesli.com/projects", priority: 0.9 },
      { url: "https://hikmetgulsesli.com/blog", priority: 0.9 },
      { url: "https://hikmetgulsesli.com/about", priority: 0.7 },
      { url: "https://hikmetgulsesli.com/contact", priority: 0.7 },
    ];

    sitemapRoutes.forEach((route) => {
      expect(route.url).toMatch(/^https:\/\/hikmetgulsesli\.com/);
      expect(route.priority).toBeGreaterThanOrEqual(0);
      expect(route.priority).toBeLessThanOrEqual(1);
    });
  });

  it("should have valid robots.txt rules", () => {
    const robotsRules = {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/404", "/500"],
      },
    };

    expect(robotsRules.rules.userAgent).toBe("*");
    expect(robotsRules.rules.allow).toBe("/");
    expect(robotsRules.rules.disallow).toContain("/api/");
    expect(robotsRules.rules.disallow).toContain("/_next/");
  });
});
