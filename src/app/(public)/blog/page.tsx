import type { Metadata } from 'next';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import Link from 'next/link';
import { RUNA_BLOG_POSTS, RUNA_CONTENT_IDEAS } from '@/config/blog';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { BookOpen, Sparkles, ArrowRight, Lightbulb, Compass } from 'lucide-react';

export const metadata: Metadata = pageMetadata({
  title: 'Blog: Google, Meta e IA para empresas',
  description:
    'Análises e guias práticos sobre Google Ads, Meta Ads, inteligência artificial, SEO e sites que convertem, explicados para quem decide.',
  path: '/blog',
  image: '/og/blog.jpg',
});

export default function BlogIndexPage() {
  const publishedPosts = RUNA_BLOG_POSTS.filter((p) => p.status === 'published');

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: 'Blog RUNA — Editorial & Inteligência Digital',
        description:
          'Análises e guias práticos sobre Google Ads, Meta Ads, inteligência artificial, SEO, CRM e sites que convertem para empresas.',
        inLanguage: 'pt-BR',
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'RUNA',
          url: SITE_URL,
        },
        blogPost: publishedPosts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updated,
          description: post.metaDescription,
          author: {
            '@type': 'Person',
            name: post.author,
          },
        })),
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
            name: 'Blog RUNA',
            item: `${SITE_URL}/blog`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#E8E7DF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-runa-pattern-dark text-[#fcfae5] py-16 sm:py-24 border-b border-[#27594F]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e59a54]">
              <BookOpen className="h-3.5 w-3.5" />
              Editorial &amp; Inteligência Digital RUNA
            </span>
            <h1 className="mt-5 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#fcfae5] leading-tight">
              Análises práticas sobre tráfego, tecnologia e inteligência comercial.
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#E8E7DF]/85">
              Conteúdo estratégico para empresários e gestores que buscam entender as mudanças do mercado digital, qualificar a captação de clientes e estruturar operações mais previsíveis.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogListClient posts={publishedPosts} />
        </div>
      </section>

      {/* Radar Editorial & Ideias de Conteúdo */}
      <section id="radar-editorial" className="border-t border-[#d8d7cf] bg-[#fcfae5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                <Lightbulb className="h-4 w-4" />
                Radar Editorial &amp; Pautas em Preparação
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-medium text-[#1c1c10]">
                Ideias de conteúdo e próximos guias por desafio de negócio
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4c524b]">
                Nossa pauta editorial nasce das dúvidas reais que aparecem nas reuniões de diagnóstico e operação. Veja os temas em estruturação nos 6 pilares da RUNA:
              </p>
            </div>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-xl border border-[#27594F]/30 bg-[#E8E7DF]/70 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1e4840] transition-colors hover:border-[#C97F38] hover:bg-[#E8E7DF]"
            >
              <Compass className="h-4 w-4 text-[#C97F38]" />
              Sugerir pauta ou tirar dúvida
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RUNA_CONTENT_IDEAS.map((idea) => (
              <div
                key={idea.id}
                className="flex flex-col justify-between rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/55 p-6 transition-all hover:border-[#C97F38]/60 hover:bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#1e4840] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#e59a54]">
                      {idea.pillar}
                    </span>
                    <span className="text-[11px] font-medium text-[#4c524b]">
                      Guia prático
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg sm:text-xl font-medium leading-snug text-[#1c1c10]">
                    {idea.title}
                  </h3>
                  <p className="mt-3 rounded-xl border border-[#d8d7cf]/80 bg-[#fcfae5] p-3 text-xs italic text-[#1e4840]">
                    “{idea.targetQuestion}”
                  </p>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#4c524b]">
                    {idea.angle}
                  </p>
                </div>

                <div className="mt-5 border-t border-[#d8d7cf] pt-4 flex items-center justify-between">
                  <Link
                    href={`/solucoes/${idea.relatedServiceSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#27594F] hover:text-[#C97F38]"
                  >
                    Ver solução relacionada
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={`/contato?servico=${idea.relatedServiceSlug}`}
                    className="text-xs font-semibold text-[#C97F38] hover:underline"
                  >
                    Conversar sobre isso
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-runa-pattern-dark p-8 sm:p-12 lg:p-14 text-[#fcfae5] shadow-xl border border-[#27594F]/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#e59a54]">
                  Diagnóstico Digital Gratuito
                </span>
                <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-medium text-[#fcfae5]">
                  Quer avaliar como sua empresa atrai e converte oportunidades hoje?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#E8E7DF]/85 max-w-2xl">
                  Responda 8 perguntas rápidas sobre aquisição, estrutura de site, processos comerciais e dados para receber um mapa de prioridades da sua operação.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
                >
                  <Sparkles className="h-4 w-4" />
                  Fazer Diagnóstico Gratuito
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/10"
                >
                  Falar com a equipe RUNA
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
