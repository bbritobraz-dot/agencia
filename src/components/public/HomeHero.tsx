'use client';

import Link from 'next/link';
import { useRef, type MouseEvent } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { HeroBackdrop, HeroScene } from '@/components/public/HeroScene';
import { PillarsFlow } from '@/components/public/PillarsFlow';

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = 'Marketing, tecnologia e inteligência para fazer sua empresa';
const HIGHLIGHT = 'crescer.';

const CHECKS = [
  'Diagnóstico em 2 minutos com pontuação imediata',
  'Atuação consultiva para empresários e gestores',
  'Arquitetura própria sem contratos de fidelidade',
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE } },
});

export function HomeHero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Spotlight que segue o mouse no fundo do hero
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(201,127,56,0.16), transparent 70%)`;

  // Inclinação 3D do painel
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), springCfg);
  const glareX = useTransform(tiltX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(tiltY, [-0.5, 0.5], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(400px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), transparent 60%)`;

  function handleSectionMove(e: MouseEvent<HTMLElement>) {
    if (reduce || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  function handlePanelMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !panelRef.current) return;
    const r = panelRef.current.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width - 0.5);
    tiltY.set((e.clientY - r.top) / r.height - 0.5);
  }

  function resetPanel() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const words = HEADLINE.split(' ');

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      className="relative isolate overflow-hidden border-b border-[#d8d7cf] bg-[#E8E7DF] pt-12 pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Fundo animado: manchas de luz + grade sutil + spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#C97F38]/20 blur-3xl"
          animate={reduce ? undefined : { x: [0, 80, -20, 0], y: [0, 40, 90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 right-[-6rem] h-[32rem] w-[32rem] rounded-full bg-[#27594F]/20 blur-3xl"
          animate={reduce ? undefined : { x: [0, -90, 30, 0], y: [0, -50, -10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(39,89,79,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(39,89,79,0.08) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 30% 40%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, black 20%, transparent 75%)',
          }}
        />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      </div>
      <HeroBackdrop />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-[#27594F]/30 bg-[#fcfae5] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#27594F]"
            >
              <span className="relative flex h-2 w-2">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#C97F38]"
                    animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <span className="relative h-2 w-2 rounded-full bg-[#C97F38]" />
              </span>
              Marketing · Tecnologia · Automação
            </motion.div>

            <motion.h1
              variants={container}
              aria-label={`${HEADLINE} ${HIGHLIGHT}`}
              className="font-display text-4xl font-normal tracking-tight text-[#1c1c10] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]"
            >
              {words.map((w, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={reduce ? fadeUp(0) : word} className="inline-block">
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
              <span aria-hidden className="relative inline-block whitespace-nowrap">
                <motion.span variants={reduce ? fadeUp(0) : word} className="relative z-10 inline-block text-[#27594F]">
                  {HIGHLIGHT}
                </motion.span>
                <svg
                  className="absolute -bottom-1 left-0 z-0 h-[0.4em] w-full overflow-visible"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 14 C 50 4, 120 4, 198 12"
                    fill="none"
                    stroke="#C97F38"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: reduce ? 0 : 1.05, ease: EASE }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.div
              className="h-1 w-20 origin-left rounded-full bg-[#C97F38]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            />

            <motion.p
              variants={fadeUp(1.05)}
              className="max-w-2xl text-lg leading-relaxed text-[#4c524b] sm:text-xl"
            >
              Da aquisição de clientes à automação de processos, desenvolvemos estratégias, sites e sistemas que conectam marketing, tecnologia e resultados.
            </motion.p>

            <motion.div
              variants={fadeUp(1.2)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/diagnostico"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#C97F38] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:bg-[#b06b29] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C97F38]/40"
              >
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    animate={{ x: ['0%', '450%'] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.2, delay: 2, ease: 'easeInOut' }}
                  />
                )}
                <Sparkles className="relative h-5 w-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative">Iniciar Diagnóstico Digital Gratuito</span>
              </Link>
              <Link
                href="/solucoes"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#27594F] bg-[#fcfae5] px-6 py-4 text-base font-semibold text-[#27594F] transition-all hover:bg-[#27594F] hover:text-white"
              >
                Conhecer soluções
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } } }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-medium text-[#1c1c10]/80"
            >
              {CHECKS.map((text) => (
                <motion.div key={text} variants={fadeUp(0)} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0" />
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Painel Executivo Visual no Hero — com inclinação 3D */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="relative lg:col-span-5 [perspective:1200px] mt-10 lg:mt-0"
          >
            <HeroScene />
            <motion.div
              ref={panelRef}
              onMouseMove={handlePanelMove}
              onMouseLeave={resetPanel}
              style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative z-10 bg-runa-pattern-dark rounded-3xl border border-[#27594F] p-6 sm:p-8 text-[#fcfae5] shadow-2xl"
            >
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ background: glare }}
                />
              )}

              <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                    Ecossistema Integrado RUNA
                  </span>
                  <h2 className="font-display text-xl text-white mt-1">
                    6 Pilares de Crescimento Digital
                  </h2>
                </div>
                <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-[#C1C0AC]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Full-Funnel
                </span>
              </div>

              <PillarsFlow />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.35, ease: EASE }}
                className="relative mt-6 rounded-2xl bg-[#13302a]/90 p-4 border border-[#27594F]"
              >
                <p className="text-xs text-[#C1C0AC] leading-relaxed">
                  Não sabe por qual frente começar? Nosso diagnóstico avalia sua empresa nas 6 áreas e recomenda o plano ideal.
                </p>
                <Link
                  href="/diagnostico"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C97F38] hover:underline"
                >
                  Mapear gargalos da minha empresa →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
