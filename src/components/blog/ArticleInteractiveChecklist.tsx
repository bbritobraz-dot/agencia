'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, Share2, Check } from 'lucide-react';
import Link from 'next/link';

const CHECKLIST_ITEMS = [
  {
    id: 'comercial',
    title: '1. Alinhamento com o Comercial',
    description:
      'As principais dúvidas que surgem antes de propostas e compras já estão respondidas nas páginas do site e refletidas nos anúncios.',
  },
  {
    id: 'oferta',
    title: '2. Clareza da Oferta e Próximo Passo',
    description:
      'Qualquer visitante entende em poucos segundos o que sua empresa faz, para quem atende, seus diferenciais e como solicitar atendimento.',
  },
  {
    id: 'mobile',
    title: '3. Experiência Mobile e Velocidade',
    description:
      'O site carrega rapidamente no celular, sem saltos visuais, e os botões de WhatsApp e formulários funcionam sem fricção.',
  },
  {
    id: 'mensuracao',
    title: '4. Mensuração de Resultados Comerciais',
    description:
      'A operação diferencia cliques e contatos brutos de oportunidades realmente qualificadas e vendas fechadas no CRM.',
  },
  {
    id: 'campanhas',
    title: '5. Revisão de Campanhas e Páginas em Conjunto',
    description:
      'Campanhas de Pesquisa, Shopping ou Performance Max são revisadas junto com a qualidade das páginas de destino.',
  },
];

export function ArticleInteractiveChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const completedCount = checkedIds.length;
  const totalCount = CHECKLIST_ITEMS.length;

  return (
    <div className="my-10 rounded-2xl border border-[#27594F]/25 bg-[#fcfae5] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#d8d7cf] pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1e4840]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1e4840]">
            <Sparkles className="h-3.5 w-3.5 text-[#C97F38]" />
            Autoavaliação Prática RUNA
          </span>
          <h3 className="mt-2 font-serif text-xl sm:text-2xl font-medium text-[#1c1c10]">
            Checklist: sua operação está pronta para a busca conversacional?
          </h3>
          <p className="mt-1 text-sm text-[#4c524b]">
            Marque os pontos que sua empresa já executa hoje para visualizar prioridades de ajuste:
          </p>
        </div>

        <div className="shrink-0 rounded-xl bg-[#1e4840] px-4 py-3 text-center text-[#fcfae5]">
          <div className="text-2xl font-bold text-[#e59a54]">
            {completedCount}/{totalCount}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#E8E7DF]/80">
            Itens validados
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {CHECKLIST_ITEMS.map((item) => {
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
            ? 'Excelente base operacional! Quer aprofundar a análise em 6 pilares com pontuação detalhada?'
            : 'Identificou pontos em aberto? Faça nosso diagnóstico gratuito de 2 minutos para mapear seus gargalos.'}
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

export function ShareArticleButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && url) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-lg border border-[#d8d7cf] bg-[#fcfae5] px-3.5 py-2 text-xs font-semibold text-[#1c1c10] transition-colors hover:border-[#C97F38] hover:text-[#27594F]"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[#27594F]" />
          Link copiado!
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5 text-[#C97F38]" />
          Compartilhar artigo
        </>
      )}
    </button>
  );
}
