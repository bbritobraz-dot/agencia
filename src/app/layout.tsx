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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://runamkt.com.br'),
  title: {
    default: 'RUNA — Marketing, Tecnologia e Automação para Empresas',
    template: '%s | RUNA',
  },
  description:
    'Da aquisição de clientes à automação de processos, desenvolvemos estratégias, sites e sistemas que conectam marketing, tecnologia e resultados.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'RUNA — Marketing, Tecnologia e Automação',
    title: 'Marketing, tecnologia e inteligência para fazer sua empresa crescer.',
    description:
      'Da aquisição de clientes à automação de processos, desenvolvemos estratégias, sites e sistemas que conectam marketing, tecnologia e resultados.',
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
