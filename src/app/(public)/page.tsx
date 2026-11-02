'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Layers,
  Workflow,
  Gauge,
  MessageCircle,
} from 'lucide-react';
import { RUNA_SERVICES } from '@/config/services';
import {
  AUTHORIZED_CASE_SLOTS,
  RUNA_PROJECTS_CONFIG,
} from '@/config/projects';
import { DIAGNOSTIC_QUESTIONS } from '@/config/diagnosticQuestions';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import { buildRunaWhatsAppUrl, trackRunaEvent } from '@/lib/analytics/tracker';

const BENEFITS = [
  {
    icon: Layers,
    title: 'Visão Integrada: Marketing + Engenharia',
    description:
      'Unimos aquisição de tráfego, desenvolvimento web, automações e sistemas em um único parceiro técnico, eliminando ruídos entre agências e desenvolvedores.',
  },
  {
    icon: Gauge,
    title: 'Decisões Orientadas por Dados Reais',
    description:
      'Estruturamos o rastreamento ponta a ponta (GA4, GTM, API de Conversões e UTMs) para que cada investimento seja avaliado pelo impacto no funil comercial.',
  },
  {
    icon: Workflow,
    title: 'Processos Comerciais Automatizados',
    description:
      'Integramos captação, atendimento com agentes de IA e CRM para reduzir o tempo de resposta e aumentar o aproveitamento das oportunidades geradas.',
  },
  {
    icon: ShieldCheck,
    title: 'Ativos Digitais Próprios e Sem Fidelidade Forçada',
    description:
      'Suas contas de anúncio, código, banco de dados e automações pertencem à sua empresa, com acompanhamento consultivo transparente.',
  },
];

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Diagnóstico e Auditoria Técnica',
    description:
      'Mapeamos sua estrutura atual de aquisição, conversão web, atendimento comercial, sistemas e mensuração para identificar os gargalos reais.',
  },
  {
    step: '02',
    title: 'Arquitetura e Planejamento',
    description:
      'Desenhamos o plano de ação priorizando as frentes de maior retorno: campanhas, páginas, e-commerce, fluxos de IA ou sistemas sob medida.',
  },
  {
    step: '03',
    title: 'Implementação e Integração',
    description:
      'Desenvolvemos e configuramos os ativos digitais conectando mídia paga, páginas de alta velocidade, rastreamento de dados e CRM.',
  },
  {
    step: '04',
    title: 'Otimização Contínua e Escala',
    description:
      'Monitoramos indicadores de funil, realizamos ajustes constantes e evoluímos a operação com reuniões executivas e relatórios claros.',
  },
];

export default function HomePage() {
  const previewQuestions = DIAGNOSTIC_QUESTIONS.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO PREMIUM */}
      <section className="relative border-b border-[#d8d7cf] bg-[#E8E7DF] pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#27594F]/30 bg-[#fcfae5] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#27594F]">
                <span className="h-2 w-2 rounded-full bg-[#C97F38]" />
                Marketing · Tecnologia · Automação
              </div>

              <h1 className="font-display text-4xl font-normal tracking-tight text-[#1c1c10] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
                Marketing, tecnologia e inteligência para fazer sua empresa crescer.
              </h1>

              <div className="h-1 w-20 rounded-full bg-[#C97F38]" />

              <p className="max-w-2xl text-lg leading-relaxed text-[#4c524b] sm:text-xl">
                Da aquisição de clientes à automação de processos, desenvolvemos estratégias, sites e sistemas que conectam marketing, tecnologia e resultados.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#C97F38] px-7 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b06b29] hover:-translate-y-0.5"
                >
                  <Sparkles className="h-5 w-5" />
                  Iniciar Diagnóstico Digital Gratuito
                </Link>
                <Link
                  href="/solucoes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#27594F] bg-[#fcfae5] px-6 py-4 text-base font-semibold text-[#27594F] transition-all hover:bg-[#27594F] hover:text-white"
                >
                  Conhecer soluções
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-medium text-[#1c1c10]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0" />
                  Diagnóstico em 2 minutos com pontuação imediata
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0" />
                  Atuação consultiva para empresários e gestores
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0" />
                  Arquitetura própria sem contratos de fidelidade
                </div>
              </div>
            </motion.div>

            {/* Painel Executivo Visual no Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-runa-pattern-dark rounded-3xl border border-[#27594F] p-6 sm:p-8 text-[#fcfae5] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                      Ecossistema Integrado RUNA
                    </span>
                    <h2 className="font-display text-xl text-white mt-1">
                      6 Pilares de Crescimento Digital
                    </h2>
                  </div>
                  <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-[#C1C0AC]">
                    Full-Funnel
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {RUNA_SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/solucoes/${service.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-[#C97F38] hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#C97F38]">
                          {service.number}
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-[#fcfae5]">
                          {service.title}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#C1C0AC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C97F38]" />
                    </Link>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-[#13302a]/90 p-4 border border-[#27594F]">
                  <p className="text-xs text-[#C1C0AC] leading-relaxed">
                    Não sabe por qual frente começar? Nosso diagnóstico avalia sua empresa nas 6 áreas e recomenda o plano ideal.
                  </p>
                  <Link
                    href="/diagnostico"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C97F38] hover:underline"
                  >
                    Mapear gargalos da minha empresa →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PRÉVIA DO DIAGNÓSTICO GAMIFICADO */}
      <section className="py-20 bg-[#fcfae5] border-b border-[#d8d7cf]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                — Diagnóstico Digital Interativo
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1c1c10] leading-tight">
                Descubra em 8 perguntas onde estão os gargalos do seu crescimento.
              </h2>
              <p className="text-base text-[#4c524b] leading-relaxed">
                Desenvolvemos uma ferramenta de diagnóstico gamificado para empresários. Ao responder às 8 perguntas sobre sua operação, nosso motor calcula imediatamente sua pontuação geral e por categoria, identifica os principais gargalos e recomenda as soluções prioritárias.
              </p>
              <ul className="space-y-2.5 text-sm text-[#1c1c10]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F]" />
                  Pontuação de Maturidade Digital (0 a 100) por pilar
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F]" />
                  Identificação imediata de gargalos em tráfego, site, IA e CRM
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F]" />
                  Resultado exibido na tela assim que você conclui o envio
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#27594F] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1e4840]"
                >
                  Começar diagnóstico completo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#d8d7cf] bg-[#E8E7DF] p-6 sm:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#27594F]">
                      Prévia do Diagnóstico RUNA
                    </span>
                    <h3 className="text-lg font-bold text-[#1c1c10]">
                      Exemplos de dimensões avaliadas (8 etapas)
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#C97F38]/15 px-3.5 py-1 text-xs font-bold text-[#C97F38]">
                    100% Gratuito
                  </span>
                </div>

                <div className="space-y-4">
                  {previewQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 sm:p-5 transition-all hover:border-[#C97F38]"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-[#27594F] mb-1.5">
                        <span>
                          Pergunta 0{q.number} · {q.categoryLabel}
                        </span>
                        <span className="text-[#C97F38]">Peso técnico ativo</span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-[#1c1c10]">
                        {q.title}
                      </p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.slice(0, 2).map((opt) => (
                          <Link
                            key={opt.id}
                            href="/diagnostico"
                            className="rounded-lg border border-[#d8d7cf] bg-[#E8E7DF]/60 px-3 py-2 text-xs text-[#4c524b] hover:border-[#27594F] hover:text-[#1c1c10] transition-colors"
                          >
                            • {opt.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#1e4840] p-4 text-white">
                  <span className="text-xs sm:text-sm text-[#E8E7DF]">
                    Responda as 8 perguntas e desbloqueie o relatório de oportunidades da sua empresa.
                  </span>
                  <Link
                    href="/diagnostico"
                    className="shrink-0 rounded-lg bg-[#C97F38] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#b06b29]"
                  >
                    Responder agora →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO PREMIUM DE SERVIÇOS (6 CATEGORIAS) */}
      <section className="py-24 bg-runa-pattern-dark text-[#fcfae5]" id="servicos">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                — Nossas 6 Categorias de Soluções
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white">
                Engenharia digital, marketing e automação sob o mesmo teto.
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-[#E8E7DF]/80">
              Cada solução foi desenhada para resolver um ponto crítico da jornada comercial: atrair o público certo, converter com eficiência e operar com inteligência.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {RUNA_SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#13302a]/85 p-7 shadow-xl transition-all hover:border-[#C97F38]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C97F38]/20 text-[#C97F38] border border-[#C97F38]/40">
                      <ServiceIcon name={service.iconName} className="h-6 w-6" />
                    </div>
                    <span className="font-display text-2xl text-white/30">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#E8E7DF]/80 leading-relaxed mb-5">
                    {service.summary}
                  </p>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C97F38] block mb-2.5">
                      Exemplos de Aplicações:
                    </span>
                    <ul className="space-y-2 text-xs text-[#E8E7DF]/90">
                      {service.applications.map((app) => (
                        <li key={app.title} className="flex items-start gap-2">
                          <span className="text-[#C97F38] font-bold">›</span>
                          <span>
                            <strong className="text-white">{app.title}:</strong>{' '}
                            {app.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <Link
                    href={`/solucoes/${service.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C97F38] px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#b06b29]"
                  >
                    {service.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFÍCIOS */}
      <section className="py-24 bg-[#E8E7DF] border-b border-[#d8d7cf]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                — Por que escolher a RUNA
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1c1c10]">
                Tecnologia e método analítico aplicados ao crescimento comercial.
              </h2>
              <p className="text-base text-[#4c524b] leading-relaxed">
                Empresas frequentemente contratam tráfego pago de um lado, desenvolvimento de site de outro e tentam gerenciar os leads manualmente no WhatsApp. Na RUNA, construímos o ecossistema completo para que nenhuma oportunidade se perca pelo caminho.
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-3">
                <Image
                  src="/sobre.webp"
                  alt="Equipe e estrutura consultiva RUNA"
                  width={540}
                  height={360}
                  className="w-full h-56 object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BENEFITS.map((benefit) => {
                const IconComp = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#27594F] text-white">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1c1c10] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[#4c524b] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJETOS E CASES (CONFIGURÁVEL, SEM INVENTAR DADOS) */}
      <section className="py-24 bg-[#fcfae5] border-b border-[#d8d7cf]" id="projetos">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                — Arquitetura de Projetos e Cases
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1c1c10]">
                Estruturas digitais e soluções desenvolvidas pela RUNA.
              </h2>
            </div>
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#27594F] hover:text-[#C97F38]"
            >
              Ver página completa de projetos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {RUNA_PROJECTS_CONFIG.map((project) => (
              <div
                key={project.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 shadow-sm"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#13302a]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="text-xs font-semibold text-[#C97F38]">
                      {project.category}
                    </span>
                    <h3 className="mt-1.5 font-display text-xl text-[#1c1c10]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4c524b] leading-relaxed">
                      {project.summary}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-[#1c1c10]/85">
                      {project.architectureHighlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#27594F] font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#d8d7cf]">
                    <Link
                      href={`/solucoes/${project.serviceSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#27594F] hover:text-[#C97F38]"
                    >
                      Explorar solução relacionada →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slots configuráveis para evidências reais futuras */}
          <div className="mt-12 rounded-2xl border border-dashed border-[#27594F]/40 bg-[#E8E7DF]/50 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#1c1c10]">
                  Política de Transparência em Cases e Indicadores
                </h4>
                <p className="text-xs text-[#4c524b] mt-1">
                  A RUNA não publica números genéricos, marcas ou depoimentos não auditados. Nossos estudos de caso detalhados são apresentados em reunião diagnóstica mediante autorização formal de cada cliente.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {AUTHORIZED_CASE_SLOTS.map((slot) => (
                  <span
                    key={slot.slotId}
                    className="rounded-lg border border-[#d8d7cf] bg-[#fcfae5] px-3 py-1.5 text-xs font-medium text-[#27594F]"
                  >
                    {slot.segmentLabel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. METODOLOGIA DE TRABALHO */}
      <section className="py-24 bg-[#E8E7DF] border-b border-[#d8d7cf]" id="metodologia">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              — Metodologia de Trabalho
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1c1c10]">
              Processo estruturado da estratégia à operação contínua.
            </h2>
            <p className="text-base text-[#4c524b]">
              Cada projeto segue quatro etapas claras para garantir alinhamento técnico, velocidade de entrega e mensuração de ponta a ponta.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {METHODOLOGY_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e4840] font-display text-lg text-[#C97F38]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-[#1c1c10]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#4c524b] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-24 bg-runa-pattern-dark text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
            Próximo Passo Estratégico
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight">
            Descubra exatamente o que sua empresa precisa para destravar o próximo nível de crescimento.
          </h2>
          <p className="text-base sm:text-lg text-[#E8E7DF]/85 max-w-2xl mx-auto">
            Realize agora o Diagnóstico Digital Gratuito de 8 perguntas ou fale diretamente com nossa equipe consultiva.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/diagnostico"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b06b29]"
            >
              <Sparkles className="h-5 w-5" />
              Fazer Diagnóstico Gratuito
            </Link>
            <a
              href={buildRunaWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRunaEvent('whatsapp_click', { placement: 'home_final_cta' })}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-semibold text-white transition-all hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" />
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
