import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { RUNA_SEGMENTS } from '@/config/segments';
import { SegmentsExplorerClient } from '@/components/public/SegmentsExplorerClient';
import { ArrowRight, Compass, Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = pageMetadata({
  title: 'Segmentos atendidos: tráfego, sites e IA por nicho',
  description:
    'Estratégias de tráfego pago, estrutura de site, automações com IA e CRM desenhadas para 30 segmentos de negócios em todo o Brasil.',
  path: '/segmentos',
  image: '/og/solucoes.jpg',
});

export default function SegmentosIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/segmentos#collection`,
        url: `${SITE_URL}/segmentos`,
        name: 'Segmentos Atendidos pela RUNA — Estratégias por Nicho',
        description:
          'Guias estratégicos e operacionais de tráfego pago, sites, automações e CRM da RUNA para 30 nichos empresariais.',
        inLanguage: 'pt-BR',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#organization`,
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: RUNA_SEGMENTS.length,
          itemListElement: RUNA_SEGMENTS.map((seg, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: seg.nicho,
            url: seg.canonical,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Segmentos',
            item: `${SITE_URL}/segmentos`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#E8E7DF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-runa-pattern-dark text-[#fcfae5] py-16 sm:py-24 border-b border-[#27594F]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e59a54]">
              <Layers className="h-3.5 w-3.5" />
              Estratégia Digital por Segmento · 30 Nichos
            </span>
            <h1 className="mt-5 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#fcfae5] leading-tight">
              Como conectamos anúncios, site e atendimento na realidade do seu setor.
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#E8E7DF]/85">
              Cada operação tem um comportamento de compra, um ciclo de decisão e restrições próprias. Escolha seu segmento abaixo para ver quais canais priorizar, como estruturar criativos, o que preparar no site e como acompanhar oportunidades no CRM.
            </p>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-[#C97F38]/40 bg-[#C97F38]/15 p-4">
              <dt className="text-[11px] uppercase tracking-widest text-[#e59a54]">Segmentos</dt>
              <dd className="mt-1 font-serif text-2xl sm:text-3xl text-white">30</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-[11px] uppercase tracking-widest text-[#C1C0AC]">Soluções Integradas</dt>
              <dd className="mt-1 font-serif text-2xl sm:text-3xl text-white">6</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-[11px] uppercase tracking-widest text-[#C1C0AC]">Atendimento</dt>
              <dd className="mt-1 font-serif text-2xl sm:text-3xl text-white">Nacional</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Explorer Grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SegmentsExplorerClient segments={RUNA_SEGMENTS} />
        </div>
      </section>

      {/* Como usar / Governança */}
      <section className="border-t border-[#d8d7cf] bg-[#fcfae5] py-14 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#27594F] text-[#C97F38]">
              <Compass className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-[#1c1c10] sm:text-3xl">
                Quer avaliar o momento atual da sua operação?
              </h2>
              <p className="mt-1 text-sm text-[#4c524b] sm:text-base max-w-2xl">
                A seleção final de canais e estrutura depende de demanda local, margem, verba, capacidade de atendimento e regras do seu setor. Faça nosso diagnóstico gratuito ou converse diretamente com a equipe.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
            >
              <Sparkles className="h-4 w-4" />
              Diagnóstico gratuito
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#27594F]/30 bg-[#E8E7DF] px-5 py-3.5 text-sm font-semibold text-[#1e4840] transition-colors hover:border-[#C97F38]"
            >
              Falar com a RUNA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
