'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { ArrowRight, ClipboardList, Gift, RefreshCw, Rocket, Search } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Step {
  title: string;
  description: string;
  deliverable: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Prazo da etapa, ex.: "1 semana". Deixe vazio para não exibir. */
  duration?: string;
  recurring?: boolean;
}

const STEPS: Step[] = [
  {
    title: 'Entendemos sua operação',
    description: 'Analisamos como sua empresa atrai, atende e vende hoje, e onde as oportunidades estão se perdendo.',
    deliverable: 'Relatório de gargalos',
    icon: Search,
  },
  {
    title: 'Montamos o plano',
    description: 'Definimos o que fazer primeiro: as frentes com maior retorno para o momento da sua empresa.',
    deliverable: 'Plano de ação priorizado',
    icon: ClipboardList,
  },
  {
    title: 'Colocamos no ar',
    description: 'Criamos e conectamos campanhas, site, automações e CRM, tudo funcionando junto.',
    deliverable: 'Estrutura completa funcionando',
    icon: Rocket,
  },
  {
    title: 'Medimos e melhoramos',
    description: 'Acompanhamos os números de perto e ajustamos o que precisa, com reuniões de resultado com você.',
    deliverable: 'Relatório mensal de resultados',
    icon: RefreshCw,
    recurring: true,
  },
];

export function MethodTimeline() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [reached, setReached] = useState(reduce ? STEPS.length : 0);

  // Acende cada etapa quando a linha passa por ela
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    const n = Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.35));
    setReached((r) => Math.max(r, n));
  });

  return (
    <section id="metodologia" className="border-b border-[#d8d7cf] bg-[#E8E7DF] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Como trabalhamos</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-[#1c1c10] sm:text-5xl">
            Do primeiro contato aos resultados, em 4 etapas.
          </h2>
          <p className="mt-4 text-base text-[#4c524b] sm:text-lg">
            Você sabe o que acontece em cada fase e o que recebe ao final de cada uma.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Trilho horizontal (desktop) */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 rounded bg-[#27594F]/15 lg:block">
            <motion.div
              className="h-full origin-left rounded bg-gradient-to-r from-[#27594F] to-[#C97F38]"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>
          {/* Trilho vertical (celular) */}
          <div aria-hidden className="absolute bottom-10 left-7 top-7 w-0.5 rounded bg-[#27594F]/15 lg:hidden">
            <motion.div
              className="h-full w-full origin-top rounded bg-gradient-to-b from-[#27594F] to-[#C97F38]"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => {
              const on = i < reached;
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  {/* Nó */}
                  <div className="relative shrink-0">
                    <motion.span
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-colors duration-500 ${
                        on ? 'border-[#C97F38] bg-[#1e4840] text-[#C97F38]' : 'border-[#27594F]/20 bg-[#fcfae5] text-[#27594F]/50'
                      }`}
                      animate={on && !reduce ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <Icon className={`h-6 w-6 ${step.recurring && on && !reduce ? 'animate-[spin_6s_linear_infinite]' : ''}`} />
                    </motion.span>
                    <span
                      className={`absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full font-display text-xs transition-colors duration-500 ${
                        on ? 'bg-[#C97F38] text-white' : 'bg-[#d8d7cf] text-[#4c524b]'
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <motion.div
                    className="flex-1 pb-2 lg:mt-6 lg:px-2"
                    initial={{ opacity: 0.35, y: 12 }}
                    animate={on ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 12 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div className="flex flex-wrap items-center gap-2 lg:justify-center">
                      <h3 className="font-display text-xl text-[#1c1c10] sm:text-2xl">{step.title}</h3>
                      {step.recurring && (
                        <span className="rounded-full bg-[#27594F]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#27594F]">
                          Todo mês
                        </span>
                      )}
                    </div>
                    {step.duration && <p className="mt-1 text-xs font-semibold text-[#C97F38]">{step.duration}</p>}
                    <p className="mt-2 text-sm leading-relaxed text-[#4c524b]">{step.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#C97F38]/30 bg-[#fcfae5] px-3 py-2 text-xs text-[#1c1c10]">
                      <Gift className="h-3.5 w-3.5 text-[#C97F38]" />
                      <span>
                        <span className="text-[#4c524b]">Você recebe: </span>
                        <strong className="font-semibold">{step.deliverable}</strong>
                      </span>
                    </span>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Próximo passo */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl bg-runa-pattern-dark p-6 text-[#fcfae5] sm:p-8 lg:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">Etapa 1 começa aqui</p>
            <p className="mt-1 font-display text-2xl text-white">Faça o diagnóstico gratuito e veja seus gargalos em 2 minutos.</p>
          </div>
          <Link
            href="/diagnostico"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
          >
            Começar diagnóstico
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
