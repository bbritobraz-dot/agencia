'use client';

/* eslint-disable @next/next/no-img-element */
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import {
  Bot,
  Check,
  Code2,
  Database,
  KanbanSquare,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
  Trophy,
  Workflow,
  X,
} from 'lucide-react';
import { RuneMark } from '@/components/public/HeroScene';

const EASE = [0.22, 1, 0.36, 1] as const;

const PARTNERS = [
  { src: '/selos/4.webp', alt: 'Meta Business Partner' },
  { src: '/selos/5.webp', alt: 'Google Partner' },
  { src: '/selos/1.webp', alt: 'Shopify Partner' },
  { src: '/selos/2.webp', alt: 'Nuvemshop Partner' },
  { src: '/selos/3.webp', alt: 'Kommo Partner' },
];

const CLIENT_LOGOS = Array.from({ length: 12 }, (_, i) => `/logo_clientes/${i + 1}.webp`);

const OWNED = [
  { icon: Megaphone, label: 'Contas de anúncio' },
  { icon: Code2, label: 'Código do site' },
  { icon: Database, label: 'Dados e leads' },
  { icon: Workflow, label: 'Automações' },
];

/* ---------------- Nó do fluxo ---------------- */
function Node({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: 'muted' | 'brand' | 'win';
}) {
  const styles = {
    muted: 'border-[#4c524b]/25 bg-white text-[#4c524b]',
    brand: 'border-white/20 bg-[#1e4840] text-[#C97F38]',
    win: 'border-[#C97F38] bg-[#C97F38] text-white',
  }[tone];
  return (
    <div className="relative z-10 flex w-16 flex-col items-center gap-1.5 sm:w-20">
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm sm:h-12 sm:w-12 ${styles}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className={`text-center text-[10px] font-semibold leading-tight sm:text-[11px] ${tone === 'muted' ? 'text-[#4c524b]' : 'text-[#e9e8dc]'}`}>
        {label}
      </span>
    </div>
  );
}

/* ---------------- Modelo fragmentado: leads vazando ---------------- */
function FragmentedFlow({ run, reduce }: { run: boolean; reduce: boolean }) {
  return (
    <div className="relative flex items-start justify-between px-1 pt-2">
      {/* conexões quebradas */}
      <div aria-hidden className="absolute left-[12%] right-[12%] top-[30px] flex justify-between">
        {[0, 1].map((i) => (
          <span key={i} className="mx-4 flex h-px flex-1 items-center justify-center gap-1 sm:mx-6">
            <span className="h-px flex-1 border-t-2 border-dashed border-[#4c524b]/30" />
            <X className="h-3.5 w-3.5 shrink-0 text-[#c0563a]" />
            <span className="h-px flex-1 border-t-2 border-dashed border-[#4c524b]/30" />
          </span>
        ))}
      </div>
      {/* leads que caem no meio do caminho */}
      {!reduce &&
        run &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute top-[26px] h-2.5 w-2.5 rounded-full bg-[#C97F38]"
            initial={{ left: '14%', y: 0, opacity: 0 }}
            animate={{
              left: ['14%', '30%', '33%', '33%'],
              y: [0, 0, 18, 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, repeatDelay: 0.4, times: [0, 0.45, 0.65, 1], ease: 'easeIn' }}
          />
        ))}
      {!reduce &&
        run &&
        [0, 1].map((i) => (
          <motion.span
            key={`b${i}`}
            aria-hidden
            className="absolute top-[26px] h-2.5 w-2.5 rounded-full bg-[#C97F38]"
            initial={{ left: '52%', y: 0, opacity: 0 }}
            animate={{ left: ['52%', '67%', '70%', '70%'], y: [0, 0, 18, 60], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.4, delay: 0.5 + i * 1.2, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.45, 0.65, 1], ease: 'easeIn' }}
          />
        ))}
      <Node icon={Megaphone} label="Agência de tráfego" tone="muted" />
      <Node icon={MonitorSmartphone} label="Freelancer do site" tone="muted" />
      <Node icon={MessageCircle} label="WhatsApp manual" tone="muted" />
    </div>
  );
}

/* ---------------- Ecossistema RUNA: tudo conectado ---------------- */
function IntegratedFlow({ run, reduce }: { run: boolean; reduce: boolean }) {
  return (
    <div className="relative flex items-start justify-between px-1 pt-2">
      <div aria-hidden className="absolute left-[10%] right-[10%] top-[30px] h-0.5 rounded bg-gradient-to-r from-[#C97F38]/40 via-[#C97F38]/70 to-[#C97F38]" />
      {!reduce &&
        run &&
        [0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute top-[26px] h-2.5 w-2.5 rounded-full bg-[#fcfae5] shadow-[0_0_10px_rgba(201,127,56,0.9)]"
            initial={{ left: '10%', opacity: 0 }}
            animate={{ left: ['10%', '88%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.75, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.9, 1] }}
          />
        ))}
      <Node icon={Megaphone} label="Anúncio" tone="brand" />
      <Node icon={MonitorSmartphone} label="Site" tone="brand" />
      <Node icon={Bot} label="IA no WhatsApp" tone="brand" />
      <Node icon={KanbanSquare} label="CRM" tone="brand" />
      <div className="relative">
        {!reduce && run && (
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-xl border-2 border-[#C97F38]"
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 0.75, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <Node icon={Trophy} label="Venda" tone="win" />
      </div>
    </div>
  );
}

/* ---------------- Seção ---------------- */
export function WhyRuna() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const run = useInView(ref, { amount: 0.3 });

  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="overflow-hidden border-b border-[#d8d7cf] bg-[#E8E7DF] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...enter()} className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Por que a RUNA</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-[#1c1c10] sm:text-5xl">
            Um time só. Nenhum lead perdido no caminho.
          </h2>
          <p className="mt-4 text-base text-[#4c524b] sm:text-lg">
            Quando tráfego, site e atendimento ficam com fornecedores diferentes, o cliente se perde entre eles.
          </p>
        </motion.div>

        {/* Comparação */}
        <div ref={ref} className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div {...enter(0.05)} className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4c524b]">Do jeito comum</span>
              <span className="rounded-full bg-[#c0563a]/10 px-3 py-1 text-[11px] font-semibold text-[#c0563a]">Leads vazando</span>
            </div>
            <div className="h-[120px]">
              <FragmentedFlow run={run} reduce={reduce} />
            </div>
            <ul className="mt-4 space-y-2.5 border-t border-[#d8d7cf] pt-5 text-sm text-[#4c524b]">
              {[
                '3 fornecedores e ninguém responde pelo resultado',
                'O lead esfria esperando alguém responder',
                'Ninguém sabe qual anúncio gerou a venda',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#c0563a]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...enter(0.15)}
            className="relative overflow-hidden rounded-3xl border border-[#27594F] bg-runa-pattern-dark p-6 text-[#fcfae5] shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                <RuneMark n={12} className="h-4 w-4" /> Com a RUNA
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Tudo conectado
              </span>
            </div>
            <div className="h-[120px]">
              <IntegratedFlow run={run} reduce={reduce} />
            </div>
            <ul className="mt-4 space-y-2.5 border-t border-white/10 pt-5 text-sm text-[#e9e8dc]">
              {[
                'Um time responsável do anúncio até a venda',
                'Resposta automática em segundos, 24 horas por dia',
                'Cada venda rastreada até o anúncio de origem',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C97F38]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Garantia: sem fidelidade */}
        <motion.div
          {...enter(0.1)}
          className="mt-5 flex flex-col gap-5 rounded-3xl border border-[#C97F38]/40 bg-[#fcfae5] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C97F38] text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-2xl text-[#1c1c10]">Sem fidelidade. Tudo é seu.</h3>
              <p className="mt-1 text-sm text-[#4c524b]">
                Se um dia você sair, leva tudo: nada fica preso na agência.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {OWNED.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-xl border border-[#27594F]/20 bg-[#E8E7DF] px-3.5 py-2 text-xs font-semibold text-[#27594F]"
              >
                <Icon className="h-4 w-4" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Provas: parceiros + clientes */}
        <motion.div {...enter(0.1)} className="mt-14">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-[#4c524b]">
            Parceiros oficiais
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {PARTNERS.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-12 w-auto opacity-80 mix-blend-multiply transition duration-300 hover:opacity-100 sm:h-14"
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-12">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-[#4c524b]">
            Empresas que já crescem com a RUNA
          </p>
          <div
            className="relative overflow-hidden bg-[#E8E7DF]"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <div
              className="flex w-max items-center gap-12 bg-[#E8E7DF] hover:[animation-play-state:paused]"
              style={reduce ? undefined : { animation: 'marquee 45s linear infinite' }}
            >
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={i < CLIENT_LOGOS.length ? 'Logo de cliente RUNA' : ''}
                  aria-hidden={i >= CLIENT_LOGOS.length}
                  loading="lazy"
                  className="h-14 w-28 object-contain opacity-60 mix-blend-multiply transition-opacity hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
