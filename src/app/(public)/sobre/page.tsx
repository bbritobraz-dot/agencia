import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Compass, Cpu, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre a RUNA — Marketing, Tecnologia e Automação',
  description:
    'A RUNA é uma agência de marketing, tecnologia e automação especializada em criar soluções digitais que ajudam empresas a atrair clientes, melhorar conversões e otimizar operações.',
};

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-runa-pattern-dark py-20 text-white border-b border-[#27594F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              — Sobre a RUNA
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">
              Unimos marketing estratégico, engenharia de software e inteligência de dados.
            </h1>
            <p className="text-base sm:text-lg text-[#E8E7DF]/85 leading-relaxed">
              A RUNA nasceu com uma tese clara: empresas modernas não crescem apenas com anúncios isolados nem apenas com código bonito. O crescimento previsível acontece quando aquisição, conversão, automação e gestão comercial operam como um único sistema.
            </p>
          </div>
        </div>
      </section>

      {/* Posicionamento e Visão */}
      <section className="py-20 bg-[#E8E7DF] border-b border-[#d8d7cf]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-3 shadow-md">
                <Image
                  src="/sobre.webp"
                  alt="Ambiente de trabalho RUNA"
                  width={600}
                  height={480}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                — Nossa Filosofia de Atuação
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1c1c10]">
                Rigor analítico, processos claros e soluções construídas para durar.
              </h2>
              <p className="text-base text-[#4c524b] leading-relaxed">
                Com base em engenharia e gestão de operações, aplicamos método científico ao marketing e ao desenvolvimento de produtos digitais. Cada campanha, landing page, fluxo de automação ou sistema de CRM parte de diagnóstico real e indicadores verificáveis.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5">
                  <Compass className="h-6 w-6 text-[#27594F] mb-3" />
                  <h3 className="text-sm font-bold text-[#1c1c10]">
                    Postura Consultiva
                  </h3>
                  <p className="mt-1.5 text-xs text-[#4c524b] leading-relaxed">
                    Antes de propor qualquer ferramenta ou canal, diagnosticamos os gargalos reais da sua operação.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5">
                  <Cpu className="h-6 w-6 text-[#C97F38] mb-3" />
                  <h3 className="text-sm font-bold text-[#1c1c10]">
                    Capacidade Técnica
                  </h3>
                  <p className="mt-1.5 text-xs text-[#4c524b] leading-relaxed">
                    Desenvolvemos desde páginas velozes até agentes de IA, integrações via API e sistemas sob medida.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5">
                  <BarChart3 className="h-6 w-6 text-[#00616D] mb-3" />
                  <h3 className="text-sm font-bold text-[#1c1c10]">
                    Foco em Mensuração
                  </h3>
                  <p className="mt-1.5 text-xs text-[#4c524b] leading-relaxed">
                    Implementamos rastreamento de funil completo para transformar dados brutos em decisões executivas.
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-2 text-sm text-[#1c1c10]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F]" />
                  Comunicação direta com especialistas, sem intermediários improdutivos
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F]" />
                  Propriedade total dos ativos desenvolvidos (contas, código e dados)
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F]" />
                  Transparência comercial e parceria baseada em entrega contínua
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#fcfae5]">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-5">
          <h2 className="font-display text-3xl text-[#1c1c10]">
            Vamos diagnosticar os próximos passos da sua empresa?
          </h2>
          <p className="text-sm sm:text-base text-[#4c524b]">
            Responda às 8 perguntas do nosso Diagnóstico Digital ou entre em contato direto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-sm font-semibold text-white hover:bg-[#b06b29]"
            >
              <Sparkles className="h-4 w-4" />
              Fazer Diagnóstico Gratuito
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-xl border border-[#27594F] px-7 py-4 text-sm font-semibold text-[#27594F] hover:bg-[#27594F] hover:text-white"
            >
              Falar com a RUNA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
