import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Bingbot',
          'DuckDuckBot',
          'Applebot',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
