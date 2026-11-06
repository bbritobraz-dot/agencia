'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RUNA_SERVICES } from '@/config/services';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import { useTicker } from '@/components/public/HeroScene';

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 1800;

/**
 * Os 6 pilares como um fluxo de automação "ao vivo":
 * cada etapa acende em sequência; passar o mouse pausa e destaca;
 * clicar leva para a página da solução.
 */
export function PillarsFlow() {
  const reduce = !!useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const auto = useTicker(RUNA_SERVICES.length, STEP_MS, !reduce && hovered === null);
  const active = hovered ?? (reduce ? -1 : auto);

  return (
    <motion.div
      className="relative mt-5 space-y-2.5"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.75 } } }}
      onMouseLeave={() => setHovered(null)}
    >
      {/* trilho do fluxo */}
      <div aria-hidden className="absolute left-[27px] top-5 bottom-5 w-px bg-gradient-to-b from-[#C97F38]/70 via-white/15 to-[#27594F]" />

      {RUNA_SERVICES.map((service, i) => {
        const on = i === active;
        const done = !reduce && hovered === null && i < active;
        return (
          <motion.div
            key={service.id}
            variants={{
              hidden: { opacity: 0, x: 24 },
              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            <Link
              href={`/solucoes/${service.slug}`}
              className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 transition-colors duration-300 ${
                on ? 'border-[#C97F38]/70 bg-white/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/10'
              }`}
            >
              {/* nó do fluxo */}
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  on
                    ? 'border-[#C97F38] bg-[#C97F38] text-white'
                    : done
                      ? 'border-[#C97F38]/50 bg-[#1e4840] text-[#C97F38]'
                      : 'border-white/15 bg-[#1e4840] text-[#C1C0AC]'
                }`}
              >
                <ServiceIcon name={service.iconName} className="h-4 w-4" />
                {on && !reduce && (
                  <motion.span
                    layoutId="pillar-pulse"
                    className="absolute -inset-1 rounded-full ring-2 ring-[#C97F38]/50"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] text-[#C97F38]">{service.number}</span>
                <span className={`block truncate text-sm font-semibold transition-colors ${on ? 'text-white' : 'text-[#e9e8dc]'}`}>
                  {service.title}
                </span>
              </span>

              {on ? (
                <motion.span
                  key="on"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1 text-[10px] font-semibold text-[#C97F38]"
                >
                  {hovered === i ? 'Ver solução' : 'Executando'}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.span>
              ) : done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400/80" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-[#C1C0AC]/70" />
              )}

              {/* barra de progresso da etapa ativa */}
              {on && !reduce && hovered === null && (
                <motion.span
                  key={`bar-${auto}`}
                  aria-hidden
                  className="absolute bottom-0 left-0 h-0.5 bg-[#C97F38]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
