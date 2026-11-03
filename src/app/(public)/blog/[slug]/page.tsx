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
  ArticleInteractiveChecklist,
  ShareArticleButton,
} from '@/components/blog/ArticleInteractiveChecklist';
import { ServiceIcon } from '@/components/public/ServiceIcon';
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
      {/* JSON-LD Structured Data (BlogPosting only — no FAQPage rich result promise per Google rules) */}
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
                    Avalie tráfego, site, processo comercial e mensuração em menos de 2 minutos.
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
              {/* Executive Summary Box (Complement) */}
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

              {/* Intro Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                <p>
                  Seu próximo cliente pode começar pesquisando uma viagem, fazer perguntas sobre o destino e terminar procurando uma hospedagem. No Modo IA do Google, esse caminho pode acontecer em uma conversa.
                </p>

                <p>
                  Em 28 de outubro de 2026, o Google anunciou a expansão dos anúncios nessa experiência para dez novos países e incluiu o Brasil nos planos para o restante do ano. Até a verificação deste artigo, em{' '}
                  <strong className="font-semibold text-[#1c1c10]">3 de novembro de 2026</strong>, não havia data exata confirmada para a chegada brasileira.
                  <CitationRef ids={[1]} />
                </p>

                <p>
                  Para quem administra uma empresa, a oportunidade merece atenção: entender como a oferta pode aparecer durante essa pesquisa e preparar o site para receber o interesse gerado.
                </p>
              </div>

              {/* Section 1: O que é o Modo IA do Google? */}
              <section id="o-que-e-o-modo-ia" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  O que é o Modo IA do Google?
                </h2>
                <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  <p>
                    É uma experiência de pesquisa que permite fazer perguntas, receber respostas com inteligência artificial e continuar a conversa para detalhar uma necessidade. Ela se diferencia da Visão geral com IA, que pode aparecer na página tradicional de resultados.
                    <CitationRef ids={[2]} />
                  </p>

                  <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
                    <p className="text-sm sm:text-base leading-relaxed text-[#1c1c10]">
                      <strong className="font-semibold text-[#1e4840]">Exemplo ilustrativo:</strong>{' '}
                      uma pessoa pergunta sobre destinos para o feriado. Depois de considerar as sugestões, decide explorar Foz do Iguaçu e pergunta o que fazer em três dias. Mais adiante, procura uma hospedagem para a família, perto dos restaurantes.
                    </p>
                  </div>

                  <p>
                    Cada pergunta acrescenta contexto. Para uma empresa, esse percurso ajuda a pensar nas informações necessárias antes de alguém pedir um orçamento ou fazer uma reserva.
                  </p>
                </div>

                {/* Internal Image 1 — Lazy Loaded with Reserved Dimensions & Figcaption */}
                <figure className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#0D342C] shadow-md">
                  <picture className="block w-full">
                    <source
                      srcSet="/blog/anuncios-modo-ia-google-brasil/pesquisa-vira-conversa.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/blog/anuncios-modo-ia-google-brasil/pesquisa-vira-conversa.webp"
                      type="image/webp"
                    />
                    <img
                      src="/blog/anuncios-modo-ia-google-brasil/pesquisa-vira-conversa.png"
                      alt="Família planejando uma viagem a Foz do Iguaçu com perguntas que aprofundam a pesquisa."
                      width={1672}
                      height={941}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block"
                    />
                  </picture>
                  <figcaption className="border-t border-[#d8d7cf] bg-[#E8E7DF]/60 px-4 py-3 text-center text-xs sm:text-sm italic text-[#4c524b]">
                    Exemplo ilustrativo de uma pesquisa que se torna mais específica ao longo da conversa.
                  </figcaption>
                </figure>
              </section>

              {/* Section 2: Como entram os anúncios nessa conversa? */}
              <section id="como-entram-os-anuncios" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Como entram os anúncios nessa conversa?
                </h2>
                <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  <p>
                    Quando existe relevância comercial, anúncios podem aparecer dentro ou ao lado das respostas, com identificação de publicidade. A correspondência pode considerar a pergunta e, conforme a configuração elegível, o contexto da resposta.
                    <CitationRef ids={[2]} />
                  </p>

                  <p>
                    No exemplo da viagem, isso poderia abrir uma oportunidade para uma oferta de hospedagem. A situação é hipotética: a exibição depende da disponibilidade, da campanha e do leilão.
                  </p>

                  <p>
                    O Google também anunciou anúncios nas perguntas seguintes de uma conversa, chamados de multiturn, com lançamento nos Estados Unidos. Essa etapa não deve ser apresentada como já disponível no Brasil.
                    <CitationRef ids={[1]} />
                  </p>
                </div>
              </section>

              {/* Section 3: Minha empresa precisa criar uma campanha nova? */}
              <section id="precisa-criar-campanha-nova" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Minha empresa precisa criar uma campanha nova?
                </h2>
                <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  <p>
                    A documentação informa que campanhas elegíveis de Pesquisa, Shopping e Performance Max podem participar sem uma campanha ou verba separada exclusiva para o Modo IA. A elegibilidade acompanha a disponibilidade por mercado e idioma.
                    <CitationRef ids={[2]} />
                  </p>

                  <p>
                    Na prática, nossa orientação é começar pela operação existente: qual objetivo a campanha atende, qual página recebe o visitante e quais ações estão sendo medidas? Essas respostas tornam a avaliação de novas oportunidades mais objetiva.
                  </p>
                </div>
              </section>

              {/* Section 4: Também existe oportunidade no orgânico? */}
              <section id="oportunidade-no-organico" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Também existe oportunidade no orgânico?
                </h2>
                <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  <p>
                    Sim. Além dos espaços publicitários, as respostas podem trazer links para páginas usadas como fontes. O Google afirma que as boas práticas de SEO continuam relevantes nas experiências de busca com IA.
                    <CitationRef ids={[3]} />
                  </p>

                  <p>
                    Um hotel, por exemplo, pode publicar um guia sobre localização e transporte em Foz. Uma empresa de serviços pode explicar etapas, prazos e critérios de contratação. O ponto é responder bem às dúvidas que o cliente realmente tem.
                  </p>

                  <p>
                    Uma seção de perguntas frequentes também pode organizar informações úteis. Em vez de respostas genéricas, vale esclarecer condições específicas do negócio: o que está incluído, como funciona o atendimento e quais regiões são atendidas.
                  </p>

                  <p className="rounded-xl border border-[#27594F]/30 bg-[#1e4840]/5 p-4 text-sm sm:text-base">
                    <strong className="font-semibold text-[#1e4840]">
                      Publicidade e presença orgânica seguem caminhos distintos.
                    </strong>{' '}
                    Comprar anúncios não influencia as respostas orgânicas da IA.
                    <CitationRef ids={[2]} />
                  </p>
                </div>

                {/* Internal Image 2 — Lazy Loaded with Reserved Dimensions & Figcaption */}
                <figure className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#0D342C] shadow-md">
                  <picture className="block w-full">
                    <source
                      srcSet="/blog/anuncios-modo-ia-google-brasil/patrocinado-e-organico.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/blog/anuncios-modo-ia-google-brasil/patrocinado-e-organico.webp"
                      type="image/webp"
                    />
                    <img
                      src="/blog/anuncios-modo-ia-google-brasil/patrocinado-e-organico.png"
                      alt="Comparação entre um espaço patrocinado e uma página citada organicamente como fonte."
                      width={1672}
                      height={941}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block"
                    />
                  </picture>
                  <figcaption className="border-t border-[#d8d7cf] bg-[#E8E7DF]/60 px-4 py-3 text-center text-xs sm:text-sm italic text-[#4c524b]">
                    Representação ilustrativa das duas formas de presença; não reproduz uma tela real do Google.
                  </figcaption>
                </figure>

                {/* Complement: Comparative Synthesis Table */}
                <div className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
                  <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
                    Síntese Comparativa: Espaço Patrocinado vs. Fonte Orgânica
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                          <th className="p-3.5 font-semibold">Critério</th>
                          <th className="p-3.5 font-semibold text-[#b06b29]">Espaço Patrocinado (Ads)</th>
                          <th className="p-3.5 font-semibold text-[#1e4840]">Citação como Fonte (Orgânico)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                        <tr>
                          <td className="p-3.5 font-medium text-[#1c1c10]">Como participa</td>
                          <td className="p-3.5">Campanhas elegíveis (Pesquisa, Shopping e Performance Max) conforme mercado e leilão.</td>
                          <td className="p-3.5">Páginas indexadas com conteúdo útil, claro e alinhado às boas práticas de SEO.</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#1c1c10]">Identificação visual</td>
                          <td className="p-3.5">Exibido com identificação clara de publicidade / patrocinado.</td>
                          <td className="p-3.5">Links de páginas apresentadas como fontes para aprofundamento.</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#1c1c10]">Independência</td>
                          <td className="p-3.5" colSpan={2}>
                            Investir em anúncios não altera a seleção orgânica da IA, mas cuidar da qualidade do site fortalece tanto a conversão paga quanto a autoridade orgânica.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section 5: O que observar sobre os cliques? */}
              <section id="o-que-observar-sobre-cliques" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  O que observar sobre os cliques?
                </h2>
                <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  <p>
                    No comunicado de expansão, o Google relatou taxas de cliques semelhantes entre itens patrocinados e orgânicos em listas de produtos no Modo IA. Esse dado é específico desse contexto e não representa uma previsão para artigos, hotéis ou empresas de serviços.
                    <CitationRef ids={[1]} />
                  </p>

                  <p>
                    Nossa recomendação é acompanhar o caminho completo: visita, contato, oportunidade e venda. Um clique ganha valor quando a empresa consegue entender o que aconteceu depois dele.
                  </p>
                </div>
              </section>

              {/* Section 6: Como preparar sua empresa agora */}
              <section id="como-preparar-sua-empresa" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
                  Como preparar sua empresa agora
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  Estas são nossas prioridades de revisão:
                </p>

                <ol className="mt-6 space-y-4">
                  {[
                    {
                      num: '1',
                      title: 'Ouvir o comercial.',
                      text: 'Reunir perguntas que aparecem antes de propostas e compras para orientar páginas, conteúdo e anúncios.',
                    },
                    {
                      num: '2',
                      title: 'Explicar a oferta.',
                      text: 'Deixar claros os serviços, diferenciais, condições e próximo passo. Uma página precisa ajudar o visitante a decidir.',
                    },
                    {
                      num: '3',
                      title: 'Cuidar da navegação.',
                      text: 'Conferir a experiência no celular, o carregamento e o funcionamento de formulários e botões.',
                    },
                    {
                      num: '4',
                      title: 'Medir resultados comerciais.',
                      text: 'Separar um contato recebido de uma oportunidade qualificada e de uma venda concluída.',
                    },
                    {
                      num: '5',
                      title: 'Revisar antes de ampliar.',
                      text: 'Ajustar campanhas com base no objetivo e nos resultados, verificando quais recursos estão disponíveis na conta.',
                    },
                  ].map((item) => (
                    <li
                      key={item.num}
                      className="flex items-start gap-4 rounded-2xl border border-[#d8d7cf] bg-white/80 p-4 sm:p-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e4840] font-serif text-sm font-bold text-[#e59a54]">
                        {item.num}
                      </span>
                      <p className="text-sm sm:text-base leading-relaxed text-[#1c1c10]/90">
                        <strong className="font-semibold text-[#1c1c10]">{item.title}</strong>{' '}
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
                  A qualidade da página de destino é um dos fatores considerados na classificação dos anúncios, junto com lance, contexto e concorrência. Por isso, campanha e site devem ser pensados em conjunto.
                  <CitationRef ids={[4]} />
                </p>

                {/* Interactive Self-Assessment Checklist (Complement) */}
                <ArticleInteractiveChecklist />
              </section>

              {/* Section 7: Perguntas frequentes (Semantic HTML, no rich result promise) */}
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

              {/* Section 8: Final CTA Connected to Existing Site Routes */}
              <section
                id="sua-empresa-esta-preparada"
                className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
                  Sua empresa está preparada para receber esse interesse?
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
                  A preparação começa com uma pergunta simples: quando alguém encontra sua empresa, consegue entender a oferta e dar o próximo passo?
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
                  Na Runa, conectamos gestão de tráfego, criação de sites e acompanhamento de resultados para avaliar esse caminho. Se você quer revisar como sua empresa atrai e atende oportunidades,{' '}
                  <strong className="font-semibold text-[#e59a54]">
                    fale com a gente e conheça nosso diagnóstico
                  </strong>
                  .
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Conhecer e Fazer o Diagnóstico
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
                  >
                    Falar com a gente
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              {/* Section 9: Fontes Oficiais */}
              <section
                id="fontes"
                className="mt-12 scroll-mt-28 border-t border-[#d8d7cf] pt-8"
              >
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1c1c10]">
                  Fontes
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#4c524b]">
                  Fontes oficiais consultadas em 3 de novembro de 2026:
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
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
