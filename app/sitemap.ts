import { MetadataRoute } from 'next'
import categoriesData from '@/data/categories.json'

const SITE_URL = 'https://vager.kz'

export default function sitemap(): MetadataRoute.Sitemap {
  // Основные страницы
  const pages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Страницы категорий
  const categoryPages: MetadataRoute.Sitemap = categoriesData
    .filter((cat) => cat.slug && cat.product_count > 0)
    .map((cat) => ({
      url: `${SITE_URL}/catalog/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [...pages, ...categoryPages]
}
