'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BellRing,
  Bot,
  CheckCircle2,
  KanbanSquare,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  ShoppingBag,
  TrendingUp,
  UserPlus,
} from 'lucide-react';

/*
 * Cena viva do hero: sites rodando, automações e notificações em loop,
 * usando os assets oficiais da RUNA (logos, padrões e paleta).
 * Paleta: #27594F (verde) · #00616D (petróleo) · #C97F38 (cobre) · #C1C0AC (areia)
 */

const LOGO = (n: number) => `/LOGOS/Logotipo_Runa%20Oficial%20(${n}).webp`;

const FLOW = [
  { icon: Megaphone, label: 'Anúncio Meta Ads' },
  { icon: MousePointerClick, label: 'Landing page' },
  { icon: Bot, label: 'Agente de IA', rune: true },
  { icon: KanbanSquare, label: 'CRM · Pipeline' },
  { icon: MessageCircle, label: 'WhatsApp' },
];

const TOASTS = [
  { icon: UserPlus, title: 'Novo lead captado', sub: 'Campanha · Estética Premium', tone: 'green' },
  { icon: Bot, title: 'IA respondeu em 4s', sub: 'Qualificação automática', tone: 'teal' },
  { icon: KanbanSquare, title: 'Lead movido → Proposta', sub: 'Pipeline atualizado', tone: 'green' },
  { icon: ShoppingBag, title: 'Venda aprovada', sub: 'R$ 2.480,00 · E-commerce', tone: 'copper' },
  { icon: BellRing, title: 'Relatório semanal enviado', sub: 'GA4 + API de Conversões', tone: 'teal' },
] as const;

const TONE: Record<string, string> = {
  green: 'bg-[#27594F]',
  teal: 'bg-[#00616D]',
  copper: 'bg-[#C97F38]',
};

export function useTicker(length: number, ms: number, enabled = true) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, enabled]);
  return i;
}

/** Símbolo ᛟ da RUNA recortado do PNG oficial (que tem muita margem). */
export function RuneMark({ n = 10, className = '' }: { n?: number; className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO(n)} alt="" className="absolute inset-0 h-full w-full scale-[4.2] object-contain" />
    </span>
  );
}

/* ---------------- Página sendo construída (wireframe vivo) ---------------- */
export function PageBuilder({ reduce }: { reduce: boolean }) {
  const cycle = useTicker(1000, 6000, !reduce);
  const block = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 8, scaleX: 0.6 },
    animate: { opacity: 1, y: 0, scaleX: 1 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#27594F]/25 bg-[#fcfae5] p-3 shadow-2xl shadow-[#13302a]/25">
      <div key={cycle} className="space-y-2">
        <div className="flex items-center justify-between">
          { }
          <motion.img {...block(0)} src={LOGO(4)} alt="" className="-my-3 h-8 w-16 origin-left scale-[2.6] object-contain" />
          <motion.div {...block(0.1)} className="flex gap-1.5 origin-right">
            <span className="h-1.5 w-6 rounded bg-[#C1C0AC]" />
            <span className="h-1.5 w-6 rounded bg-[#C1C0AC]" />
            <span className="h-1.5 w-6 rounded bg-[#C97F38]" />
          </motion.div>
        </div>
        <motion.div {...block(0.35)} className="origin-left rounded-lg bg-[#27594F] p-3">
          <div className="h-2 w-3/4 rounded bg-[#fcfae5]/90" />
          <div className="mt-1.5 h-2 w-1/2 rounded bg-[#fcfae5]/60" />
          <div className="mt-3 h-4 w-16 rounded bg-[#C97F38]" />
        </motion.div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} {...block(0.7 + i * 0.15)} className="origin-bottom rounded-md bg-[#E8E7DF] p-1.5">
              <div className="h-5 rounded bg-[#00616D]/25" />
              <div className="mt-1 h-1 w-3/4 rounded bg-[#C1C0AC]" />
            </motion.div>
          ))}
        </div>
        <motion.div {...block(1.3)} className="flex items-center justify-between rounded-md border border-[#27594F]/15 bg-white/70 px-2 py-1.5">
          <div className="flex items-center gap-1 text-[9px] font-semibold text-[#27594F]">
            <TrendingUp className="h-3 w-3" /> Conversões
          </div>
          <svg viewBox="0 0 60 16" className="h-4 w-14">
            <motion.path
              d="M1 14 L10 11 L18 12 L27 7 L36 8 L45 4 L59 2"
              fill="none"
              stroke="#C97F38"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }}
            />
          </svg>
          <span className="text-[9px] font-bold text-[#C97F38]">+38%</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Fluxo de automação ---------------- */
export function AutomationFlow({ reduce }: { reduce: boolean }) {
  const active = useTicker(FLOW.length, 1100, !reduce);
  return (
    <div className="rounded-2xl border border-white/10 bg-[#13302a]/95 p-3 text-[#fcfae5] shadow-2xl shadow-[#13302a]/40 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#C97F38]">Automação ativa</span>
        <span className="flex items-center gap-1 text-[9px] text-[#C1C0AC]">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          ao vivo
        </span>
      </div>
      <div className="relative space-y-1.5">
        <div className="absolute left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-[#C97F38]/60 via-white/20 to-[#27594F]" />
        {FLOW.map((step, i) => {
          const on = i === active;
          const Icon = step.icon;
          return (
            <div key={step.label} className="relative flex items-center gap-2">
              <span
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${
                  on ? 'border-[#C97F38] bg-[#C97F38]' : 'border-white/15 bg-[#1e4840]'
                }`}
              >
                {step.rune ? <RuneMark n={20} className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                {on && !reduce && (
                  <motion.span
                    layoutId="flow-pulse"
                    className="absolute inset-0 rounded-full ring-2 ring-[#C97F38]/60"
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  />
                )}
              </span>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${on ? 'text-white' : 'text-[#C1C0AC]'}`}>
                {step.label}
              </span>
              {on && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Notificações em sequência ---------------- */
function Notifications({ reduce }: { reduce: boolean }) {
  const idx = useTicker(TOASTS.length, 2600, !reduce);
  const t = TOASTS[idx];
  const Icon = t.icon;
  return (
    <div className="relative h-[52px] w-[230px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: -14, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center gap-2.5 rounded-xl border border-[#27594F]/15 bg-white/95 px-3 shadow-xl shadow-[#13302a]/15"
        >
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${TONE[t.tone]}`}>
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-[#1c1c10]">{t.title}</p>
            <p className="truncate text-[10px] text-[#4c524b]">{t.sub}</p>
          </div>
          <span className="ml-auto self-start pt-2 text-[9px] text-[#4c524b]/70">agora</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Camada de fundo da seção (padrão + selo) ---------------- */
export function HeroBackdrop() {
  const reduce = !!useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Padrão rúnico oficial deslizando devagar */}
      <motion.div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage: "url('/patterns/Patterns_Runa%20(3).webp')",
          backgroundSize: '520px 520px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 45%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 45%, black 100%)',
        }}
        animate={reduce ? undefined : { backgroundPositionY: ['0px', '-520px'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      {/* Selo RUNA girando */}
      { }
      <motion.img
        src={LOGO(16)}
        alt=""
        className="absolute -right-40 -bottom-48 h-[46rem] w-[46rem] opacity-[0.18] mix-blend-multiply"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

/* ---------------- Elementos flutuando ao redor do painel ---------------- */
export function HeroScene() {
  const reduce = !!useReducedMotion();
  const float = (amp: number, dur: number, delay = 0) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -amp, 0] },
          transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' as const, delay },
        };

  const enter = (delay: number, from: { x?: number; y?: number }) => ({
    initial: { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* PageBuilder e AutomationFlow ficam exportados para uso em outras seções */}
      <motion.div {...enter(1.5, { y: -16 })} className="absolute -right-4 -top-10 z-20 sm:-right-8">
        <motion.div {...float(4, 5, 0.2)}>
          <Notifications reduce={reduce} />
        </motion.div>
      </motion.div>
    </div>
  );
}
