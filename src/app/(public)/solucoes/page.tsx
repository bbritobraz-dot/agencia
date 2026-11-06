import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { RUNA_SERVICES, SERVICE_HOOKS } from '@/config/services';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import { ServiceDemo } from '@/components/public/ServicePageParts';

export const metadata: Metadata = {
  title: 'Soluções em Marketing, Tecnologia, IA e Sistemas Sob Medida',
  description:
    'Conheça as 6 frentes de atuação da RUNA: Gestão de Tráfego Pago, Sites e Landing Pages, E-commerce, Automações e IA, Sistemas Sob Medida e Dados e Analytics.',
};

export default function SolucoesPage() {
  return (
    <div>
      {/* Topo */}
      <section className="border-b border-[#27594F] bg-runa-pattern-dark py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Soluções RUNA</span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              Qual desafio você quer resolver primeiro?
            </h1>
            <p className="text-base leading-relaxed text-[#E8E7DF]/85 sm:text-lg">
              Seis soluções que funcionam sozinhas ou juntas: atrair clientes, converter visitas e automatizar a operação.
            </p>
          </div>
        </div>
      </section>

      {/* As 6 soluções */}
      <section className="bg-[#E8E7DF] py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {RUNA_SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/solucoes/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C97F38]/60 hover:shadow-xl hover:shadow-[#13302a]/10"
            >
              <div className="p-3 pb-0">
                <ServiceDemo slug={service.slug} compact />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#C97F38]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e4840]">
                    <ServiceIcon name={service.iconName} className="h-4 w-4" />
                  </span>
                  {SERVICE_HOOKS[service.id]}
                </div>
                <h2 className="mt-3 font-display text-2xl text-[#1c1c10] transition-colors group-hover:text-[#27594F]">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4c524b]">{service.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#27594F]">
                  Ver solução
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Não sabe por onde começar */}
      <section className="border-t border-[#d8d7cf] bg-[#fcfae5] py-14 lg:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#27594F] text-[#C97F38]">
              <Compass className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-2xl text-[#1c1c10] sm:text-3xl">Não sabe por onde começar?</h2>
              <p className="mt-1 text-sm text-[#4c524b] sm:text-base">
                O diagnóstico gratuito avalia sua empresa nas 6 áreas e mostra qual priorizar, em 2 minutos.
              </p>
            </div>
          </div>
          <Link
            href="/diagnostico"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
          >
            Fazer diagnóstico gratuito
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
