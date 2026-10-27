import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bydaisy.com";
  const currentDate = new Date().toISOString();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/wedding-planner", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/wedding-organizer", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/decoration-styling", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/pricelist", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/vendors", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tradisi", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/reviews", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/journal", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
