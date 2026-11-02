import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import {
  AUTHORIZED_CASE_SLOTS,
  RUNA_PROJECTS_CONFIG,
} from '@/config/projects';

export const metadata: Metadata = {
  title: 'Projetos, Arquiteturas Digitais e Cases',
  description:
    'Conheça a estrutura técnica dos projetos desenvolvidos pela RUNA em sites de alta conversão, e-commerce, tráfego pago, automações e sistemas sob medida.',
};

export default function ProjetosPage() {
  return (
    <div>
      <section className="bg-runa-pattern-dark py-20 text-white border-b border-[#27594F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              — Arquitetura & Entregas RUNA
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white">
              Projetos e estruturas digitais construídas para performance.
            </h1>
            <p className="text-base sm:text-lg text-[#E8E7DF]/85 leading-relaxed">
              Apresentamos as arquiteturas técnicas que desenvolvemos para conectar aquisição de clientes, experiência web, automação e controle comercial.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#E8E7DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {RUNA_PROJECTS_CONFIG.map((project) => (
              <div
                key={project.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] shadow-sm"
              >
                <div className="relative h-64 w-full bg-[#13302a]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div className="space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C97F38]">
                      {project.category}
                    </span>
                    <h2 className="font-display text-2xl text-[#1c1c10]">
                      {project.title}
                    </h2>
                    <p className="text-sm text-[#4c524b] leading-relaxed">
                      {project.summary}
                    </p>
                    <div className="pt-3 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#27594F] block">
                        Destaques Técnicos:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#1c1c10]/90">
                        {project.architectureHighlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#d8d7cf]">
                    <Link
                      href={`/solucoes/${project.serviceSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#27594F] hover:text-[#C97F38]"
                    >
                      Ver detalhes da solução
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bloco configurável para inserção de evidências reais */}
          <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#27594F]/15 text-[#27594F]">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="font-display text-2xl text-[#1c1c10]">
                    Repositório Configurável de Cases Autorizados
                  </h3>
                  <p className="mt-1 text-sm text-[#4c524b] leading-relaxed">
                    Em respeito à confidencialidade estratégica dos nossos clientes e às boas práticas de governança, não exibimos nomes de marcas, depoimentos ou métricas sem autorização formal documentada. Novos cases validados são ativados diretamente na camada de configuração do sistema.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {AUTHORIZED_CASE_SLOTS.map((slot) => (
                    <div
                      key={slot.slotId}
                      className="rounded-2xl border border-dashed border-[#27594F]/40 bg-[#E8E7DF]/60 p-4"
                    >
                      <span className="text-xs font-bold text-[#27594F]">
                        {slot.segmentLabel}
                      </span>
                      <p className="mt-1 text-xs text-[#4c524b]">
                        {slot.statusNote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#fcfae5] border-t border-[#d8d7cf]">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-5">
          <h2 className="font-display text-3xl text-[#1c1c10]">
            Quer avaliar qual estrutura faz mais sentido para a sua empresa?
          </h2>
          <p className="text-sm sm:text-base text-[#4c524b]">
            Realize o diagnóstico digital gratuito e receba uma recomendação técnica imediata.
          </p>
          <div>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-sm font-semibold text-white hover:bg-[#b06b29]"
            >
              <Sparkles className="h-4 w-4" />
              Iniciar Diagnóstico Gratuito
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
