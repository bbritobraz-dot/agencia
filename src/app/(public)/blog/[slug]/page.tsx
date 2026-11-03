import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  RUNA_BLOG_POSTS,
  getBlogPostBySlug,
  formatBlogDate,
} from '@/config/blog';
import { RUNA_SERVICES } from '@/config/services';
import {
  ShareArticleButton,
} from '@/components/blog/ArticleInteractiveChecklist';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import { GoogleModoIaArticleContent } from '@/components/blog/GoogleModoIaArticleContent';
import { MetaAndromedaArticleContent } from '@/components/blog/MetaAndromedaArticleContent';
import { SiteBuscasIaArticleContent } from '@/components/blog/SiteBuscasIaArticleContent';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  ListChecks,
  Sparkles,
  Tag,
  User,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_DOMAIN = 'https://runamkt.com.br';

export async function generateStaticParams() {
  return RUNA_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artigo não encontrado | RUNA',
    };
  }

  const canonicalUrl = `${SITE_DOMAIN}/blog/${post.slug}`;

  return {
    title: `${post.seoTitle} | RUNA`,
    description: post.metaDescription,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: canonicalUrl,
      title: post.seoTitle,
      description: post.metaDescription,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${SITE_DOMAIN}${post.cover.webp}`,
          width: post.cover.width,
          height: post.cover.height,
          alt: post.cover.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.metaDescription,
      images: [`${SITE_DOMAIN}${post.cover.webp}`],
    },
  };
}

function CitationRef({ ids }: { ids: number[] }) {
  return (
    <sup className="ml-0.5 inline-flex items-center gap-0.5 font-sans text-[11px] font-semibold">
      {ids.map((id) => (
        <a
          key={id}
          href={`#fonte-${id}`}
          className="text-[#C97F38] hover:text-[#27594F] hover:underline px-0.5"
          title={`Ver fonte oficial [${id}]`}
        >
          [{id}]
        </a>
      ))}
    </sup>
  );
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_DOMAIN}/blog/${post.slug}`;
  const relatedServices = RUNA_SERVICES.filter((service) =>
    post.relatedServiceSlugs.includes(service.slug)
  );

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: post.title,
    alternativeHeadline: post.seoTitle,
    description: post.metaDescription,
    image: [
      `${SITE_DOMAIN}${post.cover.avif}`,
      `${SITE_DOMAIN}${post.cover.webp}`,
      `${SITE_DOMAIN}${post.cover.png}`,
    ],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RUNA',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_DOMAIN}/logo-green.webp`,
      },
    },
    datePublished: post.date,
    dateModified: post.updated,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    inLanguage: 'pt-BR',
    url: canonicalUrl,
  };

  return (
    <div className="min-h-screen bg-[#E8E7DF]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />

      {/* Article Header */}
      <section className="bg-runa-pattern-dark text-[#fcfae5] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#27594F]/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#E8E7DF]/80 hover:text-[#e59a54] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Blog RUNA
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#e59a54]">
              {post.category}
            </span>
          </div>

          {/* Single H1 on the page */}
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-[#fcfae5]">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-xl leading-relaxed text-[#E8E7DF]/85 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Metadata Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#27594F]/60 pt-6 text-xs sm:text-sm text-[#C1C0AC]">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C97F38] text-white font-bold">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#fcfae5]">Por {post.author}</div>
                  <div className="text-[11px] text-[#C1C0AC]">{post.authorRole}</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#e59a54]" />
                Publicado em {formatBlogDate(post.date)}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#e59a54]" />
                {post.readingTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md border border-[#fcfae5]/15 bg-white/5 px-2.5 py-1 text-xs text-[#E8E7DF]"
                >
                  <Tag className="h-3 w-3 text-[#e59a54]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Hero Cover Illustration (No Cropping, Reserved Dimensions, Eager Loading) */}
      <section className="-mt-8 sm:-mt-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <figure className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#d8d7cf] bg-[#0D342C] shadow-2xl">
            <picture className="block w-full">
              <source srcSet={post.cover.avif} type="image/avif" />
              <source srcSet={post.cover.webp} type="image/webp" />
              <img
                src={post.cover.png}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                loading="eager"
                fetchPriority="high"
                className="w-full h-auto block"
              />
            </picture>
            <figcaption className="border-t border-[#27594F]/40 bg-[#fcfae5] px-4 py-3 text-center text-xs italic text-[#4c524b]">
              {post.cover.alt}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Main Article Body + Sidebar */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sticky Left/Right Sidebar on Desktop */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                {/* Table of Contents */}
                <nav
                  aria-label="Índice do artigo"
                  className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#27594F] mb-4">
                    <BookOpen className="h-4 w-4 text-[#C97F38]" />
                    Neste Artigo
                  </div>
                  <ul className="space-y-2.5 text-sm">
                    {post.toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block rounded-lg px-2.5 py-1.5 text-[#323630] transition-colors hover:bg-[#E8E7DF] hover:text-[#1e4840] font-medium"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-[#d8d7cf] flex items-center justify-between">
                    <ShareArticleButton title={post.title} />
                  </div>
                </nav>

                {/* Related RUNA Solutions */}
                <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#C97F38] mb-3">
                    Soluções Relacionadas
                  </div>
                  <p className="text-xs text-[#4c524b] mb-4">
                    Como a RUNA apoia sua empresa nos pilares abordados neste artigo:
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

                {/* Diagnostic Quick Card */}
                <div className="rounded-2xl bg-runa-pattern-dark p-6 text-[#fcfae5] shadow-md">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#e59a54]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Diagnóstico Gratuito
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-[#fcfae5]">
                    Descubra onde estão os gargalos digitais da sua empresa
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#E8E7DF]/80">
                    Avalie tráfego, criativos, processo comercial e mensuração em menos de 2 minutos.
                  </p>
                  <Link
                    href="/diagnostico"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#b06b29]"
                  >
                    Iniciar Diagnóstico
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Article Content Column */}
            <article className="lg:col-span-8 order-1 lg:order-2 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-10 lg:p-12 shadow-sm">
              {/* Executive Summary Box */}
              <div className="mb-10 rounded-2xl border-l-4 border-[#C97F38] bg-[#E8E7DF]/65 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e4840]">
                  <ListChecks className="h-4 w-4 text-[#C97F38]" />
                  Resumo Executivo — O que você precisa saber
                </div>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#323630]">
                  {post.executiveSummary.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#27594F]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Article Content based on slug */}
              {post.slug === 'preparar-site-buscas-ia' ? (
                <SiteBuscasIaArticleContent post={post} />
              ) : post.slug === 'meta-andromeda-ia-anuncios' ? (
                <MetaAndromedaArticleContent post={post} />
              ) : (
                <GoogleModoIaArticleContent post={post} />
              )}

              {/* Perguntas Frequentes */}
              <section id="perguntas-frequentes" className="mt-12 scroll-mt-28">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  <HelpCircle className="h-4 w-4" />
                  Dúvidas Diretas
                </div>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Perguntas frequentes
                </h2>

                <div className="mt-6 space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6"
                    >
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
                        {faq.answer}
                        {faq.citations && <CitationRef ids={faq.citations} />}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Fontes Oficiais */}
              <section
                id={post.slug === 'meta-andromeda-ia-anuncios' ? 'fontes-oficiais' : 'fontes'}
                className="mt-12 scroll-mt-28 border-t border-[#d8d7cf] pt-8"
              >
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1c1c10]">
                  Fontes oficiais
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#4c524b]">
                  {post.slug === 'meta-andromeda-ia-anuncios'
                    ? 'Fontes técnicas oficiais consultadas:'
                    : 'Fontes oficiais consultadas em 3 de novembro de 2026:'}
                </p>

                <ol className="mt-4 space-y-3 text-xs sm:text-sm text-[#323630]">
                  {post.sources.map((source) => (
                    <li
                      key={source.id}
                      id={`fonte-${source.id}`}
                      className="flex items-start gap-2.5 rounded-xl border border-[#d8d7cf]/80 bg-[#E8E7DF]/40 p-3.5 scroll-mt-28"
                    >
                      <span className="font-bold text-[#C97F38]">[{source.id}]</span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-[#1e4840] hover:text-[#C97F38] hover:underline break-words"
                      >
                        <span>{source.label}.</span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ol>

                {post.slug === 'meta-andromeda-ia-anuncios' && (
                  <p className="mt-4 text-xs italic text-[#4c524b]">
                    *As orientações de criação, testes e gestão apresentadas neste artigo são análise editorial aplicada ao contexto empresarial.
                  </p>
                )}
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
