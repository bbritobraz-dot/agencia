'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  SEGMENT_MACRO_CATEGORIES,
  type SegmentPageData,
} from '@/config/segments';
import { ArrowRight, Search, Layers, Sparkles } from 'lucide-react';

interface Props {
  segments: SegmentPageData[];
}

export function SegmentsExplorerClient({ segments }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [query, setQuery] = useState('');

  const filtered = segments.filter((seg) => {
    const matchesCategory =
      selectedCategory === 'Todos' || seg.macroCategory === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      seg.nicho.toLowerCase().includes(q) ||
      seg.h1.toLowerCase().includes(q) ||
      seg.metaDescription.toLowerCase().includes(q) ||
      seg.primaryKeyword.toLowerCase().includes(q) ||
      seg.relatedTerms.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-10">
      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {SEGMENT_MACRO_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#1e4840] text-[#fcfae5] shadow-sm'
                    : 'bg-[#E8E7DF] text-[#323630] hover:bg-[#d8d7cf]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a897c]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar seu segmento ou nicho..."
            className="w-full rounded-xl border border-[#d8d7cf] bg-white py-2 pl-9 pr-3.5 text-sm text-[#1c1c10] placeholder:text-[#8a897c] focus:border-[#27594F] focus:outline-none"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-xs text-[#4c524b] px-1">
        <span>
          Exibindo <strong className="text-[#1c1c10]">{filtered.length}</strong> de{' '}
          {segments.length} segmentos estruturados
        </span>
        {(selectedCategory !== 'Todos' || query.trim() !== '') && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Todos');
              setQuery('');
            }}
            className="font-semibold text-[#C97F38] hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-12 text-center">
          <p className="font-serif text-xl text-[#1c1c10]">
            Nenhum segmento encontrado para esse termo.
          </p>
          <p className="mt-2 text-sm text-[#4c524b]">
            Sua empresa atua em outro setor? Nossa metodologia adapta tráfego, site, automação e CRM para a realidade da sua operação.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setQuery('');
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1e4840] px-4 py-2.5 text-xs font-semibold text-white"
            >
              Ver todos os 30 segmentos
            </button>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 rounded-lg bg-[#C97F38] px-4 py-2.5 text-xs font-semibold text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Fazer diagnóstico da minha empresa
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((seg) => (
            <Link
              key={seg.slug}
              href={`/segmentos/${seg.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C97F38]/60 hover:shadow-xl hover:shadow-[#13302a]/10"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1e4840]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1e4840]">
                    <Layers className="h-3 w-3 text-[#C97F38]" />
                    {seg.macroCategory}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#C97F38]">
                    #{seg.pagina}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-xl sm:text-2xl font-medium leading-snug text-[#1c1c10] group-hover:text-[#27594F] transition-colors">
                  {seg.nicho}
                </h2>

                <p className="mt-2 text-xs font-semibold text-[#b06b29]">
                  {seg.h1}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#4c524b] line-clamp-3">
                  {seg.metaDescription}
                </p>
              </div>

              <div className="mt-6 border-t border-[#d8d7cf]/80 pt-4 flex items-center justify-between">
                <span className="text-[11px] text-[#4c524b] truncate max-w-[65%]">
                  {seg.intent}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#1e4840] group-hover:text-[#C97F38] transition-colors">
                  Ver estratégia
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
