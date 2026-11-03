'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ANDROMEDA_CHECKLIST = [
  {
    id: 'hipoteses',
    title: '1. Hipótese Clara por Anúncio',
    description:
      'Cada criativo testa um motivo de compra concreto (ex: sabor vs. conforto vs. conveniência), e não apenas variações superficiais sem pergunta de aprendizado.',
  },
  {
    id: 'argumento-formato',
    title: '2. Separação de Argumento e Formato',
    description:
      'A equipe sabe distinguir a dor/necessidade do cliente (argumento) da embalagem visual (Reels, estático, carrossel, demonstração ou depoimento).',
  },
  {
    id: 'experimento',
    title: '3. Desenho de Teste com Orçamento Definido',
    description:
      'Período mínimo de validação, orçamento reservado e compreensão de que o algoritmo distribui volumes desiguais em campanhas contínuas.',
  },
  {
    id: 'crm-vendas',
    title: '4. Integração do Clique à Venda Real no CRM',
    description:
      'A empresa não decide investimento olhando apenas CPC ou CTR: os leads gerados no WhatsApp e formulários são rastreados até a proposta e o fechamento.',
  },
  {
    id: 'rotina-revisao',
    title: '5. Rotina de Aprendizado Contínuo',
    description:
      'Reuniões de marketing iniciam revisando o que funcionou e decidindo qual a próxima hipótese prioritária a ser testada com base em dados comerciais.',
  },
];

export function AndromedaInteractiveChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const completedCount = checkedIds.length;
  const totalCount = ANDROMEDA_CHECKLIST.length;

  return (
    <div className="my-10 rounded-2xl border border-[#27594F]/25 bg-[#fcfae5] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#d8d7cf] pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1e4840]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1e4840]">
            <Sparkles className="h-3.5 w-3.5 text-[#C97F38]" />
            Autoavaliação Prática RUNA
          </span>
          <h3 className="mt-2 font-serif text-xl sm:text-2xl font-medium text-[#1c1c10]">
            Checklist: sua gestão de anúncios testa hipóteses reais de negócio?
          </h3>
          <p className="mt-1 text-sm text-[#4c524b]">
            Marque os pontos que sua empresa já pratica na criação, veiculação e análise de anúncios:
          </p>
        </div>

        <div className="shrink-0 rounded-xl bg-[#1e4840] px-4 py-3 text-center text-[#fcfae5]">
          <div className="text-2xl font-bold text-[#e59a54]">
            {completedCount}/{totalCount}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#E8E7DF]/80">
            Pontos validados
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {ANDROMEDA_CHECKLIST.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                isChecked
                  ? 'border-[#27594F] bg-[#1e4840]/5'
                  : 'border-[#d8d7cf] bg-white/70 hover:border-[#C97F38]/60'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="h-5 w-5 text-[#27594F]" />
                ) : (
                  <Circle className="h-5 w-5 text-[#8a897c]" />
                )}
              </div>
              <div>
                <div
                  className={`text-sm sm:text-base font-semibold ${
                    isChecked ? 'text-[#1e4840]' : 'text-[#1c1c10]'
                  }`}
                >
                  {item.title}
                </div>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#4c524b]">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl bg-[#E8E7DF]/70 p-4 border border-[#d8d7cf]">
        <p className="text-xs sm:text-sm text-[#323630]">
          {completedCount === totalCount
            ? 'Processo comercial maduro! Quer descobrir novas oportunidades de escala com o diagnóstico RUNA?'
            : 'Faltam etapas para conectar anúncios a vendas reais? Faça nosso diagnóstico gratuito de 2 minutos.'}
        </p>
        <Link
          href="/diagnostico"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#C97F38] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b06b29]"
        >
          Avaliar no Diagnóstico RUNA
        </Link>
      </div>
    </div>
  );
}
