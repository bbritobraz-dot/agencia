import type { Metadata } from 'next';
import { DM_Sans, Libre_Caslon_Text } from 'next/font/google';
import './globals.css';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://airuna.com.br'),
  title: {
    default: 'RUNA — Marketing, Tecnologia e Inteligência para Empresas',
    template: '%s | RUNA',
  },
  description:
    'Estratégias de tráfego pago, sites de alta conversão, automações inteligentes e CRM próprio. Conectamos aquisição, tecnologia e dados para sua empresa crescer.',
  keywords: [
    'agência de marketing e tecnologia',
    'gestão de tráfego pago',
    'Google Ads',
    'Meta Ads',
    'sites de alta conversão',
    'automação com IA',
    'CRM próprio',
    'inteligência comercial',
    'RUNA',
  ],
  authors: [{ name: 'RUNA', url: 'https://airuna.com.br' }],
  creator: 'RUNA',
  publisher: 'RUNA',
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'RUNA — Marketing, Tecnologia e Automação',
    title: 'RUNA — Marketing, Tecnologia e Inteligência para Fazer sua Empresa Crescer',
    description:
      'Da aquisição de clientes à automação de processos: estratégias de tráfego pago, sites rápidos, CRM próprio e inteligência de dados sob medida.',
    url: 'https://airuna.com.br',
    images: [
      {
        url: 'https://airuna.com.br/logo-green.webp',
        width: 1200,
        height: 630,
        alt: 'RUNA — Marketing, Tecnologia e Automação',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RUNA — Marketing, Tecnologia e Inteligência para Empresas',
    description:
      'Tráfego pago, desenvolvimento de sites, automações com IA e CRM próprio integrados para gerar previsibilidade comercial.',
    images: ['https://airuna.com.br/logo-green.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${libreCaslon.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#E8E7DF] text-[#1c1c10]">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
