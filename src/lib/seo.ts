import type { Metadata } from 'next';

/**
 * Endereço oficial do site. O domínio sem "www" redireciona (308) para este,
 * então canonical, sitemap e imagens de compartilhamento usam sempre o www.
 */
export const SITE_URL = 'https://www.airuna.com.br';
export const SITE_NAME = 'RUNA';

interface PageSeo {
  /** Título da página. O layout acrescenta " | RUNA" (use `absoluteTitle` para não acrescentar). */
  title: string;
  absoluteTitle?: boolean;
  /** Até ~155 caracteres para não ser cortada no Google. */
  description: string;
  /** Caminho da página, começando com "/". */
  path: string;
  /** Imagem 1200x630 em /public/og (padrão: a da home). */
  image?: string;
  imageAlt?: string;
}

/** Metadados completos e consistentes: título, descrição, canonical, Open Graph e Twitter. */
export function pageMetadata({ title, absoluteTitle, description, path, image = '/og/home.jpg', imageAlt }: PageSeo): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const shareTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt || shareTitle }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: SITE_NAME,
      url,
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
