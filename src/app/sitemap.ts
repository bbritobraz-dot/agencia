import type { MetadataRoute } from 'next';
import { RUNA_SERVICES } from '@/config/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://runamkt.com.br';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/solucoes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/diagnostico`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/projetos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contato`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/politica-de-privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = RUNA_SERVICES.map((service) => ({
    url: `${baseUrl}/solucoes/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
