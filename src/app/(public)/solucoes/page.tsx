import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { RUNA_SERVICES } from '@/config/services';
import { ServiceIcon } from '@/components/public/ServiceIcon';

export const metadata: Metadata = {
  title: 'Soluções em Marketing, Tecnologia, IA e Sistemas Sob Medida',
  description:
    'Conheça as 6 frentes de atuação da RUNA: Gestão de Tráfego Pago, Sites e Landing Pages, E-commerce, Automações e IA, Sistemas Sob Medida e Dados e Analytics.',
};

export default function SolucoesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-runa-pattern-dark py-20 text-white border-b border-[#27594F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              — Portfólio de Soluções RUNA
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">
              Soluções integradas para atrair clientes, converter oportunidades e automatizar sua operação.
            </h1>
            <p className="text-base sm:text-lg text-[#E8E7DF]/85 leading-relaxed">
              Atuamos em seis pilares complementares que unem marketing de performance, desenvolvimento web e engenharia de software para empresas que buscam crescimento sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Lista detalhada das 6 categorias */}
      <section className="py-20 bg-[#E8E7DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {RUNA_SERVICES.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e4840] text-[#C97F38]">
                      <ServiceIcon name={service.iconName} className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#27594F]">
                      Pilar {service.number}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl text-[#1c1c10]">
                    {service.title}
                  </h2>
                  <p className="text-sm font-medium text-[#C97F38]">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-[#4c524b] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href={`/solucoes/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#27594F] px-5 py-3 text-xs font-semibold text-white hover:bg-[#1e4840] transition-colors"
                    >
                      Ver detalhes da solução
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/contato?servico=${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#C97F38] px-5 py-3 text-xs font-semibold text-[#C97F38] hover:bg-[#C97F38] hover:text-white transition-colors"
                    >
                      {service.ctaLabel}
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t lg:border-t-0 lg:border-l border-[#d8d7cf] pt-6 lg:pt-0 lg:pl-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#27594F] mb-3">
                      Principais Frentes Técnicas
                    </h3>
                    <ul className="space-y-2.5 text-xs text-[#1c1c10]">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#C97F38] mb-3">
                      Aplicações Práticas
                    </h3>
                    <div className="space-y-3">
                      {service.applications.map((app) => (
                        <div
                          key={app.title}
                          className="rounded-xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-3"
                        >
                          <div className="text-xs font-bold text-[#1c1c10]">
                            {app.title}
                          </div>
                          <p className="mt-1 text-xs text-[#4c524b] leading-relaxed">
                            {app.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Diagnóstico */}
      <section className="py-16 bg-[#fcfae5] border-t border-[#d8d7cf]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-5">
          <h2 className="font-display text-3xl text-[#1c1c10]">
            Quer saber qual dessas soluções traz maior retorno imediato para o seu negócio?
          </h2>
          <p className="text-sm sm:text-base text-[#4c524b]">
            Nosso diagnóstico digital gamificado avalia sua empresa nas 6 categorias em menos de 2 minutos.
          </p>
          <div>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-sm font-semibold text-white hover:bg-[#b06b29]"
            >
              <Sparkles className="h-4 w-4" />
              Fazer Diagnóstico Gratuito Agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
