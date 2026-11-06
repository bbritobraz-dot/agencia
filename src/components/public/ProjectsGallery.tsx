'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, X } from 'lucide-react';
import {
  AUTHORIZED_PORTFOLIO,
  PORTFOLIO_TYPE_LABELS,
  getServiceSlugForType,
  type AuthorizedPortfolioItem,
  type PortfolioType,
} from '@/config/projects';
import { getServiceBySlug } from '@/config/services';
import { ProjectCard } from '@/components/public/ProjectShowcase';
import { buildRunaWhatsAppUrl, trackRunaEvent } from '@/lib/analytics/tracker';

const EASE = [0.22, 1, 0.36, 1] as const;

type Filter = 'all' | PortfolioType;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'site', label: 'Sites' },
  { key: 'ecommerce', label: 'Lojas virtuais' },
  { key: 'landing', label: 'Landing pages' },
];

function countOf(f: Filter) {
  return f === 'all' ? AUTHORIZED_PORTFOLIO.length : AUTHORIZED_PORTFOLIO.filter((p) => p.type === f).length;
}

/* ---------------- Janela de detalhe do projeto ---------------- */
function ProjectModal({
  p,
  onClose,
  onPrev,
  onNext,
  position,
}: {
  p: AuthorizedPortfolioItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  position: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const serviceSlug = getServiceSlugForType(p.type);
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  const message = `Olá! Vi o projeto ${p.client} no site da RUNA e quero algo parecido para a minha empresa.`;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[#0d221d]/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Projeto ${p.client}`}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl bg-[#fcfae5] shadow-2xl sm:rounded-3xl"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Imagem grande */}
          <div className="relative bg-[#13302a] p-4 sm:p-6 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-[#d8d7cf] bg-[#f3f1e4] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#C97F38]/70" />
                <span className="h-2 w-2 rounded-full bg-[#C1C0AC]" />
                <span className="h-2 w-2 rounded-full bg-[#27594F]/60" />
                <span className="ml-2 truncate rounded bg-white/80 px-2 py-0.5 text-[10px] text-[#4c524b]">{p.client}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={p.id}
                  role="img"
                  aria-label={`Site ${p.client}`}
                  className="aspect-[1211/758]"
                  style={{
                    backgroundImage: `url(${p.imageUrl})`,
                    backgroundSize: '132.1% auto',
                    backgroundPosition: '50.6% 38.9%',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[#C1C0AC]">
              <button type="button" onClick={onPrev} className="flex items-center gap-1.5 rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>
              <span>{position}</span>
              <button type="button" onClick={onNext} className="flex items-center gap-1.5 rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">
                Próximo <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Informações */}
          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
            <span className="w-fit rounded-full border border-[#27594F]/20 bg-[#E8E7DF] px-3 py-1 text-[11px] font-semibold text-[#27594F]">
              {PORTFOLIO_TYPE_LABELS[p.type]}
            </span>
            <h2 className="mt-3 font-display text-3xl text-[#1c1c10]">{p.client}</h2>
            <p className="mt-1 text-sm text-[#4c524b]">{p.segment}</p>

            {service && (
              <div className="mt-6 rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C97F38]">Solução usada</p>
                <Link
                  href={`/solucoes/${service.slug}`}
                  className="group mt-1 flex items-center justify-between gap-2 text-sm font-semibold text-[#1c1c10] hover:text-[#27594F]"
                >
                  {service.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-1 text-xs text-[#4c524b]">{service.tagline}</p>
              </div>
            )}

            <div className="mt-auto space-y-3 pt-8">
              <a
                href={buildRunaWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRunaEvent('whatsapp_click', { placement: `project_${p.id}` })}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
              >
                <MessageCircle className="h-5 w-5" />
                Quero algo parecido
              </a>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#27594F] px-6 py-3.5 text-sm font-semibold text-[#27594F] transition-colors hover:bg-[#27594F] hover:text-white"
                >
                  Ver site no ar
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#fcfae5] text-[#1c1c10] shadow-md transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Galeria completa ---------------- */
export function ProjectsGallery() {
  const reduce = !!useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const list = filter === 'all' ? AUTHORIZED_PORTFOLIO : AUTHORIZED_PORTFOLIO.filter((p) => p.type === filter);
  const openIndex = list.findIndex((p) => p.id === openId);
  const open = openIndex >= 0 ? list[openIndex] : null;

  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0) return;
      setOpenId(list[(openIndex + dir + list.length) % list.length].id);
    },
    [list, openIndex],
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  return (
    <>
      <div role="tablist" aria-label="Filtrar projetos" className="mb-10 flex flex-wrap gap-2">
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
                on ? 'text-white' : 'text-[#27594F] hover:bg-[#fcfae5]'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 rounded-full bg-[#27594F]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {f.label} <span className={on ? 'text-white/70' : 'text-[#27594F]/50'}>{countOf(f.key)}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.04, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => setOpenId(p.id)}
                className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97F38] focus-visible:ring-offset-4 focus-visible:ring-offset-[#E8E7DF] rounded-2xl"
              >
                <ProjectCard p={p} reduce={reduce} hoverLabel="Ver projeto" linkOut={false} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <ProjectModal
            key="modal"
            p={open}
            onClose={close}
            onPrev={prev}
            onNext={next}
            position={`${openIndex + 1} de ${list.length}`}
          />
        )}
      </AnimatePresence>
    </>
  );
}
