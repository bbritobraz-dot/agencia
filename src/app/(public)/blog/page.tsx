import type { Metadata } from 'next';
import Link from 'next/link';
import { RUNA_BLOG_POSTS } from '@/config/blog';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Inteligência Digital | RUNA',
  description:
    'Artigos, análises estratégicas e guias práticos sobre Google Ads, Inteligência Artificial, SEO, Sites de Alta Conversão e Automação Comercial.',
  alternates: {
    canonical: 'https://runamkt.com.br/blog',
  },
};

export default function BlogIndexPage() {
  const publishedPosts = RUNA_BLOG_POSTS.filter((p) => p.status === 'published');

  return (
    <div className="min-h-screen bg-[#E8E7DF]">
      {/* Hero */}
      <section className="bg-runa-pattern-dark text-[#fcfae5] py-16 sm:py-24 border-b border-[#27594F]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e59a54]">
              <BookOpen className="h-3.5 w-3.5" />
              Editorial & Inteligência Digital RUNA
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

      {/* CTA Banner */}
      <section className="pb-20">
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
