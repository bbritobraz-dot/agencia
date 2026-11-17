import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import {
  RUNA_SEGMENTS,
  getSegmentBySlug,
} from '@/config/segments';
import { RUNA_SERVICES } from '@/config/services';
import { RUNA_BLOG_POSTS } from '@/config/blog';
import { AUTHORIZED_PORTFOLIO, PORTFOLIO_TYPE_LABELS } from '@/config/projects';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RUNA_SEGMENTS.map((seg) => ({
    slug: seg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seg = getSegmentBySlug(slug);

  if (!seg) {
    return {
      title: 'Segmento não encontrado',
    };
  }

  return pageMetadata({
    title: seg.seoTitle,
    absoluteTitle: true,
    description: seg.metaDescription,
    path: `/segmentos/${seg.slug}`,
    image: '/og/gestao-de-trafego-pago.jpg',
    imageAlt: seg.h1,
  });
}

/**
 * Converte links em formato Markdown [texto](url) em <Link> internos ou <a> externos.
 */
function renderRichText(text: string, darkTone = false): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const linkClass = darkTone
    ? 'font-semibold text-[#e59a54] underline underline-offset-4 hover:text-white transition-colors'
    : 'font-semibold text-[#1e4840] underline underline-offset-4 hover:text-[#C97F38] transition-colors';

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const key = `${href}-${match.index}`;

    if (href.startsWith('/')) {
      parts.push(
        <Link key={key} href={href} className={linkClass}>
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 ${linkClass}`}
        >
          <span>{label}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default async function SegmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const seg = getSegmentBySlug(slug);

  if (!seg) {
    notFound();
  }

  const relatedServices = RUNA_SERVICES.filter((s) =>
    seg.relatedServiceSlugs.includes(s.slug)
  );
  const relatedBlogs = RUNA_BLOG_POSTS.filter(
    (b) => b.status === 'published' && seg.relatedBlogSlugs.includes(b.slug)
  );
  const portfolioItems = AUTHORIZED_PORTFOLIO.filter((p) =>
    seg.portfolioIds.includes(p.id)
  );
  const peerSegments = RUNA_SEGMENTS.filter(
    (item) => item.macroCategory === seg.macroCategory && item.slug !== seg.slug
  ).slice(0, 4);

  // Dados estruturados coerentes: Organization RUNA como provedora do serviço de marketing/tecnologia
  const structuredDataJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${seg.canonical}#webpage`,
        url: seg.canonical,
        name: seg.seoTitle,
        description: seg.metaDescription,
        inLanguage: 'pt-BR',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@type': 'Service',
          '@id': `${seg.canonical}#service`,
          name: seg.h1,
          serviceType: `Marketing digital, tráfego pago, site e automação comercial para ${seg.nicho.toLowerCase()}`,
          description: seg.metaDescription,
          url: seg.canonical,
          provider: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'RUNA',
            url: SITE_URL,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Brasil',
          },
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
          {
            '@type': 'ListItem',
            position: 3,
            name: seg.nicho,
            item: seg.canonical,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#E8E7DF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataJsonLd) }}
      />

      {/* Header / Hero with Single H1 */}
      <section className="bg-runa-pattern-dark text-[#fcfae5] pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-[#27594F]/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#C1C0AC]"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#e59a54] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5 text-[#C97F38]" />
              </li>
              <li>
                <Link
                  href="/segmentos"
                  className="hover:text-[#e59a54] transition-colors"
                >
                  Segmentos
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5 text-[#C97F38]" />
              </li>
              <li className="font-semibold text-[#fcfae5]">{seg.nicho}</li>
            </ol>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#e59a54]">
              <Layers className="h-3.5 w-3.5" />
              {seg.macroCategory}
            </span>
          </nav>

          {/* Single H1 on the page */}
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-[#fcfae5] max-w-4xl">
            {seg.h1}
          </h1>

          {/* Introductory Paragraphs */}
          <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#E8E7DF]/90 max-w-3xl">
            {seg.introParagraphs.map((para, idx) => (
              <p key={idx}>{renderRichText(para, true)}</p>
            ))}
          </div>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
            >
              <Sparkles className="h-4 w-4" />
              Fazer Diagnóstico Gratuito
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
            >
              Conversar sobre minha operação
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Sidebar */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                {/* Table of Contents */}
                <nav
                  aria-label="Índice da estratégia"
                  className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#27594F] mb-4">
                    <BookOpen className="h-4 w-4 text-[#C97F38]" />
                    Nesta Página
                  </div>
                  <ul className="space-y-2 text-sm">
                    {seg.sections.map((sec) => (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          className="block rounded-lg px-2.5 py-1.5 text-[#323630] transition-colors hover:bg-[#E8E7DF] hover:text-[#1e4840] font-medium"
                        >
                          {sec.title}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="#perguntas-frequentes"
                        className="block rounded-lg px-2.5 py-1.5 text-[#323630] transition-colors hover:bg-[#E8E7DF] hover:text-[#1e4840] font-medium"
                      >
                        Perguntas frequentes
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Related RUNA Solutions */}
                <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#C97F38] mb-3">
                    Soluções Integradas RUNA
                  </div>
                  <p className="text-xs text-[#4c524b] mb-4">
                    Pilares que estruturamos para operações em {seg.nicho.toLowerCase()}:
                  </p>
                  <div className="space-y-3">
                    {relatedServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`/solucoes/${service.slug}`}
                        className="group flex items-start gap-3 rounded-xl border border-[#d8d7cf]/80 bg-white/70 p-3.5 transition-all hover:border-[#C97F38] hover:bg-white"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e4840] text-[#fcfae5] group-hover:bg-[#C97F38] transition-colors">
                          <ServiceIcon name={service.iconName} className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1c1c10] group-hover:text-[#27594F]">
                            {service.title}
                          </div>
                          <div className="mt-0.5 text-[11px] text-[#4c524b] line-clamp-2">
                            {service.tagline}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recommended Blog Articles */}
                {relatedBlogs.length > 0 && (
                  <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#27594F] mb-3">
                      Guias Relacionados no Blog
                    </div>
                    <ul className="space-y-3">
                      {relatedBlogs.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="group block rounded-xl border border-[#d8d7cf]/80 bg-white/70 p-3 transition-all hover:border-[#C97F38] hover:bg-white"
                          >
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C97F38]">
                              {post.category}
                            </span>
                            <div className="mt-0.5 text-xs font-semibold text-[#1c1c10] group-hover:text-[#27594F] leading-snug">
                              {post.title}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Diagnostic Card */}
                <div className="rounded-2xl bg-runa-pattern-dark p-6 text-[#fcfae5] shadow-md">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#e59a54]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Diagnóstico em 2 Minutos
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-[#fcfae5]">
                    Descubra onde sua operação perde oportunidades hoje
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#E8E7DF]/80">
                    Responda 8 perguntas sobre aquisição, site, atendimento e dados para receber um mapa de prioridades.
                  </p>
                  <Link
                    href="/diagnostico"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#b06b29]"
                  >
                    Iniciar Diagnóstico Gratuito
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Column */}
            <article className="lg:col-span-8 order-1 lg:order-2 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-10 lg:p-12 shadow-sm">
              {/* Summary Strip */}
              <div className="mb-10 rounded-2xl border-l-4 border-[#C97F38] bg-[#E8E7DF]/65 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e4840]">
                  <CheckCircle2 className="h-4 w-4 text-[#C97F38]" />
                  Objetivo Estratégico — {seg.nicho}
                </div>
                <p className="mt-2 text-sm sm:text-base font-medium text-[#1c1c10]">
                  {seg.intent}.
                </p>
                <p className="mt-1.5 text-xs text-[#4c524b]">
                  Atendimento consultivo da RUNA em todo o Brasil a partir de Foz do Iguaçu, PR, integrando tráfego pago, arquitetura de site, automação comercial e CRM.
                </p>
              </div>

              {/* Dynamic H2 Sections */}
              <div className="space-y-12">
                {seg.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                      {section.title}
                    </h2>

                    {section.table && (
                      <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
                        <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
                          Critérios de Planejamento — {seg.nicho}
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                              <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                                {section.table.headers.map((h, i) => (
                                  <th
                                    key={i}
                                    className={`p-3.5 font-semibold ${
                                      i === 0
                                        ? 'text-[#1e4840]'
                                        : i === 1
                                        ? 'text-[#b06b29]'
                                        : 'text-[#1c1c10]'
                                    }`}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className={`p-3.5 ${
                                        cIdx === 0
                                          ? 'font-semibold text-[#1c1c10]'
                                          : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 space-y-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                      {section.paragraphs.map((para, pIdx) => (
                        <p key={pIdx}>{renderRichText(para)}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Authorized Portfolio Showcase (when available for this segment) */}
              {portfolioItems.length > 0 && (
                <section className="mt-12 rounded-2xl border border-[#27594F]/30 bg-[#E8E7DF]/55 p-6 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                        Portfólio Público Autorizado
                      </span>
                      <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium text-[#1c1c10]">
                        Entregas da RUNA relacionadas a {seg.nicho}
                      </h3>
                    </div>
                    <Link
                      href="/projetos"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e4840] hover:text-[#C97F38]"
                    >
                      Ver portfólio completo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {portfolioItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-xl border border-[#d8d7cf] bg-white p-4 shadow-sm"
                      >
                        <div>
                          <span className="inline-block rounded-md bg-[#1e4840]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#1e4840]">
                            {PORTFOLIO_TYPE_LABELS[item.type]}
                          </span>
                          <div className="mt-2 font-serif text-lg font-medium text-[#1c1c10]">
                            {item.client}
                          </div>
                          <p className="mt-1 text-xs text-[#4c524b]">
                            {item.segment}
                          </p>
                        </div>
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#C97F38] hover:underline"
                          >
                            Ver projeto no ar
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Perguntas Frequentes (Editorial FAQ) */}
              <section id="perguntas-frequentes" className="mt-12 scroll-mt-28 border-t border-[#d8d7cf] pt-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  <HelpCircle className="h-4 w-4" />
                  Dúvidas Frequentes
                </div>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Perguntas frequentes
                </h2>

                <div className="mt-6 space-y-4">
                  {seg.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#d8d7cf] bg-white/85 p-5 sm:p-6"
                    >
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
                        {renderRichText(faq.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Final CTA Banner */}
              <section className="mt-12 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#e59a54]">
                  Próximo Passo — {seg.nicho}
                </span>
                <p className="mt-3 font-serif text-xl sm:text-2xl leading-relaxed text-[#fcfae5]">
                  {renderRichText(seg.closingCtaMarkdown, true)}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Fazer Diagnóstico Digital Gratuito
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
                  >
                    Conversar com a equipe RUNA
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>

      {/* Peer Segments in the Same Macrocategory (Contextual Navigation without dumping all 30) */}
      {peerSegments.length > 0 && (
        <section className="border-t border-[#d8d7cf] bg-[#fcfae5] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  — {seg.macroCategory}
                </span>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Outras operações relacionadas
                </h2>
              </div>
              <Link
                href="/segmentos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e4840] hover:text-[#C97F38]"
              >
                <ArrowLeft className="h-4 w-4" />
                Ver índice com os 30 segmentos
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {peerSegments.map((peer) => (
                <Link
                  key={peer.slug}
                  href={`/segmentos/${peer.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-5 transition-all hover:border-[#C97F38] hover:bg-white"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97F38]">
                      {peer.nicho}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-medium text-[#1c1c10] group-hover:text-[#27594F] leading-snug">
                      {peer.h1}
                    </h3>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1e4840] group-hover:text-[#C97F38]">
                    Ver estratégia
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
