import type { Metadata } from 'next';
import { DM_Sans, Libre_Caslon_Text } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/seo';
import { RUNA_SERVICES } from '@/config/services';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const libreCaslon = Libre_Caslon_Text({
  variable: '--font-display',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RUNA — Marketing, Tecnologia e Inteligência para Empresas',
    template: '%s | RUNA',
  },
  description:
    'Tráfego pago, sites que convertem, automações com IA e CRM próprio. A RUNA conecta aquisição, tecnologia e dados para sua empresa crescer.',
  keywords: [
    'agência de marketing e tecnologia',
    'gestão de tráfego pago',
    'Google Ads',
    'Meta Ads',
    'sites de alta conversão',
    'landing pages',
    'automação com IA',
    'WhatsApp com IA',
    'CRM próprio',
    'inteligência comercial',
    'SEO local',
    'RUNA',
  ],
  authors: [{ name: 'RUNA', url: SITE_URL }],
  creator: 'RUNA',
  publisher: 'RUNA',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '200x200', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Padrão para páginas sem metadados próprios (cada página define título, canonical e imagem via pageMetadata)
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'RUNA',
    title: 'RUNA | Marketing, tecnologia e automação para empresas',
    description:
      'Tráfego pago, sites que convertem, automações com IA e CRM próprio. A RUNA conecta aquisição, tecnologia e dados para sua empresa crescer.',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'RUNA: marketing, tecnologia e automação' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RUNA | Marketing, tecnologia e automação para empresas',
    description:
      'Tráfego pago, sites que convertem, automações com IA e CRM próprio. A RUNA conecta aquisição, tecnologia e dados para sua empresa crescer.',
    images: ['/og/home.jpg'],
  },
};

const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'RUNA',
      legalName: 'Agência RUNA',
      taxID: '53.486.863/0001-87',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/og/home.jpg`,
      description:
        'Agência de marketing orientado a dados, tecnologia e automação com IA. Gestão de tráfego pago (Google Ads e Meta Ads), sites e landing pages, e-commerce, automações no WhatsApp com IA, sistemas sob medida (CRMs proprietários) e dados/analytics.',
      telephone: '+55-45-98822-9849',
      email: 'contato@airuna.com.br',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Foz do Iguaçu',
        addressRegion: 'PR',
        addressCountry: 'BR',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
      founder: {
        '@type': 'Person',
        name: 'Bruno',
        jobTitle: 'Fundador & Estrategista Digital',
        url: `${SITE_URL}/sobre`,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+55-45-98822-9849',
          contactType: 'sales',
          email: 'contato@airuna.com.br',
          areaServed: 'BR',
          availableLanguage: ['Portuguese'],
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Soluções Digitais e Engenharia Comercial RUNA',
        itemListElement: RUNA_SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.summary,
            url: `${SITE_URL}/solucoes/${s.slug}`,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'RUNA',
      inLanguage: 'pt-BR',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${libreCaslon.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#E8E7DF] text-[#1c1c10]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
