'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { RUNA_SERVICES, SERVICE_HOOKS, type ServiceCategory } from '@/config/services';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import {
  AdsDemo,
  AutomationDemo,
  CheckoutDemo,
  DashboardDemo,
  KanbanDemo,
  SiteDemo,
} from '@/components/public/ServiceDemos';

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 6500;

export const HOOKS = SERVICE_HOOKS;

export const DEMOS: Record<string, ComponentType<{ reduce: boolean }>> = {
  'trafego-pago': AdsDemo,
  'sites-landing-pages': SiteDemo,
  ecommerce: CheckoutDemo,
  'automacoes-ia': AutomationDemo,
  'sistemas-sob-medida': KanbanDemo,
  'dados-analytics': DashboardDemo,
};

const DESKTOP_QUERY = '(min-width: 1024px)';
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/* ---------------- Palco da demonstração ---------------- */
export function DemoStage({ service, reduce, compact = false }: { service: ServiceCategory; reduce: boolean; compact?: boolean }) {
  const Demo = DEMOS[service.id];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#E8E7DF] ${
        compact ? 'h-[300px]' : 'h-[340px]'
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{ backgroundImage: "url('/patterns/Patterns_Runa%20(3).webp')", backgroundSize: '360px' }}
      />
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#C97F38]/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#27594F]/20 blur-3xl" />
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          aria-hidden
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={compact ? 'scale-[0.88] sm:scale-100' : 'scale-[0.85] sm:scale-100 lg:scale-110 xl:scale-[1.2]'}
        >
          {Demo && <Demo reduce={reduce} />}
        </motion.div>
      </AnimatePresence>
      <span className="absolute bottom-3 right-4 text-[10px] text-[#4c524b]/70">Demonstração ilustrativa</span>
    </div>
  );
}

/* ---------------- Texto + CTA da solução ---------------- */
function ServiceDetail({ service }: { service: ServiceCategory }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
        {service.number} · {service.shortTitle}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-snug text-white sm:text-3xl">{service.tagline}</h3>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {service.highlights.slice(0, 4).map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-[#E8E7DF]/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C97F38]" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={`/solucoes/${service.slug}`}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
        >
          Ver solução completa
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href="/diagnostico" className="text-sm font-medium text-[#C1C0AC] underline-offset-4 hover:text-white hover:underline">
          ou descubra se é sua prioridade no diagnóstico →
        </Link>
      </div>
    </div>
  );
}

/* ---------------- Seção ---------------- */
export function SolutionsExplorer() {
  const reduce = !!useReducedMotion();
  const isDesktop = useIsDesktop();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  // Avança sozinho enquanto ninguém interagiu e a seção está na tela
  useEffect(() => {
    if (reduce || touched || !inView || !isDesktop) return;
    const id = setInterval(() => setActive((a) => (a + 1) % RUNA_SERVICES.length), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, touched, inView, isDesktop]);

  function select(i: number) {
    setTouched(true);
    setActive(i);
  }

  const service = RUNA_SERVICES[active];

  return (
    <section ref={ref} id="servicos" className="bg-runa-pattern-dark py-20 text-[#fcfae5] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 flex flex-col justify-between gap-4 lg:mb-14 lg:flex-row lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Soluções RUNA</span>
            <h2 className="font-display text-3xl text-white sm:text-5xl">Qual desafio você quer resolver primeiro?</h2>
          </div>
          <p className="max-w-md text-sm text-[#E8E7DF]/80 sm:text-base">
            Escolha um ponto da sua operação e veja como a RUNA resolve: marketing, tecnologia e automação no mesmo time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Lista de desafios */}
          <div role="tablist" aria-label="Soluções" className="space-y-2 lg:col-span-4">
            {RUNA_SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <div key={s.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`painel-${s.id}`}
                    onClick={() => select(i)}
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                      on ? 'border-[#C97F38]/70 bg-white/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07]'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                        on ? 'border-[#C97F38] bg-[#C97F38] text-white' : 'border-white/15 bg-[#13302a] text-[#C97F38]'
                      }`}
                    >
                      <ServiceIcon name={s.iconName} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${on ? 'text-white' : 'text-[#e9e8dc]'}`}>{HOOKS[s.id]}</span>
                      <span className="block text-xs text-[#C1C0AC]">{s.shortTitle}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#C1C0AC] transition-transform lg:-rotate-90 ${on ? 'rotate-180 text-[#C97F38] lg:-rotate-90' : ''}`}
                    />
                    {/* progresso do avanço automático */}
                    {on && !touched && !reduce && inView && isDesktop && (
                      <motion.span
                        key={`p-${active}`}
                        aria-hidden
                        className="absolute bottom-0 left-0 hidden h-0.5 bg-[#C97F38] lg:block"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>

                  {/* Celular: abre como acordeão */}
                  <AnimatePresence initial={false}>
                    {on && !isDesktop && (
                      <motion.div
                        id={`painel-${s.id}-mobile`}
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <div className="space-y-5 pb-4 pt-3">
                          <DemoStage service={s} reduce={reduce} compact />
                          <ServiceDetail service={s} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop: painel da solução escolhida */}
          <div id={`painel-${service.id}`} role="tabpanel" className="hidden lg:col-span-8 lg:block">
            {isDesktop && (
            <div className="rounded-3xl border border-white/10 bg-[#13302a]/70 p-6 shadow-2xl backdrop-blur-sm">
              <DemoStage service={service} reduce={reduce} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  className="mt-6 px-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ServiceDetail service={service} />
                </motion.div>
              </AnimatePresence>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
