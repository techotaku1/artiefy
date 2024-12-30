import { type MetadataRoute } from "next";
import { getAllCourses } from "~/models/courseModels";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const courses = await getAllCourses();

  const courseUrls = courses.map((course) => ({
    url: `${baseUrl}/curso/${course.id}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = []; // Define categoryUrls properly

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/estudiantes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...courseUrls,
    ...categoryUrls,
  ];
}