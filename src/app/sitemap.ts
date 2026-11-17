import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { RUNA_SERVICES } from '@/config/services';
import { RUNA_BLOG_POSTS } from '@/config/blog';
import { RUNA_SEGMENTS } from '@/config/segments';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${baseUrl}/og/home.jpg`],
    },
    {
      url: `${baseUrl}/solucoes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/og/solucoes.jpg`],
    },
    {
      url: `${baseUrl}/segmentos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/og/solucoes.jpg`],
    },
    {
      url: `${baseUrl}/diagnostico`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${baseUrl}/og/diagnostico.jpg`],
    },
    {
      url: `${baseUrl}/projetos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/projetos.jpg`],
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${baseUrl}/og/sobre.jpg`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/og/blog.jpg`],
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/og/contato.jpg`],
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = RUNA_SERVICES.map((service) => ({
    url: `${baseUrl}/solucoes/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: [`${baseUrl}/og/${service.slug}.jpg`],
  }));

  const segmentRoutes: MetadataRoute.Sitemap = RUNA_SEGMENTS.map((seg) => ({
    url: seg.canonical,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = RUNA_BLOG_POSTS.filter(
    (post) => post.status === 'published'
  ).map((post) => {
    const coverOg = post.cover.png.replace(/\.png$/, '-og.jpg');
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}${coverOg}`, `${baseUrl}${post.cover.webp}`],
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...segmentRoutes, ...blogRoutes];
}
