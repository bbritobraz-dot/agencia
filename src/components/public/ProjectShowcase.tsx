'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import {
  AUTHORIZED_PORTFOLIO,
  PORTFOLIO_TYPE_LABELS,
  type AuthorizedPortfolioItem,
  type PortfolioType,
} from '@/config/projects';

const EASE = [0.22, 1, 0.36, 1] as const;
const HOME_LIMIT = 6;

type Filter = 'all' | PortfolioType;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'site', label: 'Sites' },
  { key: 'ecommerce', label: 'Lojas virtuais' },
  { key: 'landing', label: 'Landing pages' },
];

function count(f: Filter) {
  return f === 'all' ? AUTHORIZED_PORTFOLIO.length : AUTHORIZED_PORTFOLIO.filter((p) => p.type === f).length;
}

/* ---------------- Card do projeto ---------------- */
export function ProjectCard({
  p,
  reduce,
  hoverLabel,
  linkOut = true,
}: {
  p: AuthorizedPortfolioItem;
  reduce: boolean;
  /** Texto exibido no hover; por padrão "Ver site no ar" ou o tipo do projeto */
  hoverLabel?: string;
  /** false quando o card já está dentro de um botão (ex.: galeria com janela de detalhe) */
  linkOut?: boolean;
}) {
  const inner = (
    <>
      {/* Janela de navegador com o print recortado do mockup */}
      <div className={`flex flex-col overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#13302a]/15`}>
        <div className="flex items-center gap-1.5 border-b border-[#d8d7cf] bg-[#f3f1e4] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#C97F38]/70" />
          <span className="h-2 w-2 rounded-full bg-[#C1C0AC]" />
          <span className="h-2 w-2 rounded-full bg-[#27594F]/60" />
          <span className="ml-2 truncate rounded bg-white/80 px-2 py-0.5 text-[10px] text-[#4c524b]">{p.client}</span>
        </div>
        <div className="relative aspect-[1211/758] overflow-hidden">
          <div
            role="img"
            aria-label={`Site ${p.client}`}
            className={`absolute inset-0 transition-transform duration-[1.2s] ease-out ${reduce ? '' : 'group-hover:scale-[1.06]'}`}
            style={{
              backgroundImage: `url(${p.imageUrl})`,
              backgroundSize: '132.1% auto',
              backgroundPosition: '50.6% 38.9%',
            }}
          />
          {/* camada no hover */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#13302a]/85 via-[#13302a]/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
              {hoverLabel ?? (p.liveUrl ? 'Ver site no ar' : PORTFOLIO_TYPE_LABELS[p.type])}
              {(hoverLabel || p.liveUrl) && <ArrowUpRight className="h-4 w-4" />}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="font-display text-lg text-[#1c1c10]">{p.client}</h3>
          <p className="truncate text-xs text-[#4c524b]">{p.segment}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#27594F]/20 bg-[#E8E7DF] px-2.5 py-1 text-[10px] font-semibold text-[#27594F]">
          {PORTFOLIO_TYPE_LABELS[p.type]}
        </span>
      </div>
    </>
  );

  return p.liveUrl && linkOut ? (
    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
      {inner}
    </a>
  ) : (
    <div className="group flex h-full flex-col">{inner}</div>
  );
}

/* ---------------- Seção ---------------- */
export function ProjectShowcase() {
  const reduce = !!useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');

  const list =
    filter === 'all'
      ? AUTHORIZED_PORTFOLIO.slice(0, HOME_LIMIT)
      : AUTHORIZED_PORTFOLIO.filter((p) => p.type === filter);

  return (
    <section id="projetos" className="border-b border-[#d8d7cf] bg-[#fcfae5] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Projetos</span>
            <h2 className="font-display text-3xl leading-tight text-[#1c1c10] sm:text-5xl">
              Sites e lojas que já estão no ar.
            </h2>
            <p className="text-base text-[#4c524b]">
              De clínicas a e-commerces: cada projeto desenhado para o negócio e o público de cada cliente.
            </p>
          </div>

          {/* Filtros */}
          <div role="tablist" aria-label="Filtrar projetos" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    on ? 'text-white' : 'text-[#27594F] hover:bg-[#E8E7DF]'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-[#27594F]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className={on ? 'text-white/70' : 'text-[#27594F]/50'}>{count(f.key)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grade bento */}
        <motion.div
          layout
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => {
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05, ease: EASE }}
                  className="w-[82%] shrink-0 snap-start sm:w-auto"
                >
                  <ProjectCard p={p} reduce={reduce} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#d8d7cf] pt-8 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-[#4c524b]">
            <ShieldCheck className="h-4 w-4 text-[#27594F]" />
            Projetos exibidos com autorização dos clientes.
          </p>
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#27594F] px-5 py-3 text-sm font-semibold text-[#27594F] transition-colors hover:bg-[#27594F] hover:text-white"
          >
            Ver todos os projetos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
