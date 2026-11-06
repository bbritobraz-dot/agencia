'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, Gift, LineChart } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '@/config/diagnosticQuestions';
import { trackRunaEvent } from '@/lib/analytics/tracker';

const EASE = [0.22, 1, 0.36, 1] as const;
const Q1 = DIAGNOSTIC_QUESTIONS[0];
const TOTAL = DIAGNOSTIC_QUESTIONS.length;

// Valores ilustrativos da prévia (o relatório real é calculado no diagnóstico)
const BASE_PILLARS = [
  { key: 'trafego', label: 'Tráfego pago', value: 35 },
  { key: 'site', label: 'Site e conversão', value: 58 },
  { key: 'ecommerce', label: 'Vendas online', value: 44 },
  { key: 'ia', label: 'Atendimento e IA', value: 22 },
  { key: 'crm', label: 'Gestão comercial', value: 50 },
  { key: 'dados', label: 'Dados e métricas', value: 30 },
];

const BASE_BOTTLENECKS = [
  'Leads esperam horas por resposta: atendimento sem automação.',
  'Conversões não rastreadas: não dá para saber qual anúncio vende.',
];

function statusOf(score: number) {
  if (score < 40) return { label: 'Inicial', color: 'text-[#e7a466]' };
  if (score < 70) return { label: 'Em evolução', color: 'text-[#C1C0AC]' };
  return { label: 'Avançado', color: 'text-emerald-300' };
}

/* ---------------- Número que conta até o valor ---------------- */
function CountUp({ to, run, reduce }: { to: number; run: boolean; reduce: boolean }) {
  const [v, setV] = useState(reduce ? to : 0);
  const from = useRef(0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      from.current = to;
      return;
    }
    const controls = animate(from.current, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (x) => setV(Math.round(x)),
    });
    from.current = to;
    return () => controls.stop();
  }, [to, run, reduce]);
  return <>{reduce ? to : v}</>;
}

/* ---------------- Prévia do relatório ---------------- */
function ReportPreview({ answerScore, bottleneck }: { answerScore: number | null; bottleneck?: string }) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const pillars = BASE_PILLARS.map((p) =>
    p.key === 'trafego' && answerScore !== null ? { ...p, value: answerScore, mine: true } : { ...p, mine: false },
  );
  const overall = Math.round(pillars.reduce((s, p) => s + p.value, 0) / pillars.length);
  const status = statusOf(overall);
  const bottlenecks = bottleneck ? [bottleneck, BASE_BOTTLENECKS[0]] : BASE_BOTTLENECKS;

  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-[#27594F] bg-runa-pattern-dark p-6 text-[#fcfae5] shadow-2xl sm:p-8"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">Prévia do relatório</span>
          <h3 className="mt-1 font-display text-xl text-white">Maturidade digital da sua empresa</h3>
        </div>
        <span className="rounded-lg bg-white/10 px-3 py-1 text-[11px] font-medium text-[#C1C0AC]">
          {answerScore === null ? 'Exemplo' : 'Com sua resposta'}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[150px_1fr] sm:items-center">
        {/* Nota geral */}
        <div className="relative mx-auto h-[150px] w-[150px]">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
            <motion.circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="#C97F38"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: inView ? C * (1 - overall / 100) : C }}
              transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl text-white">
              <CountUp to={overall} run={inView} reduce={reduce} />
            </span>
            <span className="text-[10px] text-[#C1C0AC]">de 100</span>
            <span className={`mt-0.5 text-[11px] font-semibold ${status.color}`}>{status.label}</span>
          </div>
        </div>

        {/* Barras por pilar */}
        <div className="space-y-2.5">
          {pillars.map((p, i) => (
            <div key={p.key}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className={p.mine ? 'font-semibold text-white' : 'text-[#C1C0AC]'}>
                  {p.label}
                  {p.mine && (
                    <span className="ml-1.5 rounded bg-[#C97F38] px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-white">
                      você
                    </span>
                  )}
                </span>
                <span className="font-mono text-[#C1C0AC]">{p.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full rounded-full ${p.mine ? 'bg-[#C97F38]' : p.value < 40 ? 'bg-[#e7a466]/80' : 'bg-[#8fb5a9]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${p.value}%` : 0 }}
                  transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.2 + i * 0.08, ease: EASE }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gargalos */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#13302a]/80 p-4">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#C97F38]">
          Principais gargalos encontrados
        </p>
        <ul className="space-y-2">
          <AnimatePresence initial={false} mode="popLayout">
            {bottlenecks.map((b, i) => (
              <motion.li
                key={b}
                layout
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.9 + i * 0.15, ease: EASE }}
                className="flex items-start gap-2 text-xs leading-relaxed text-[#e9e8dc]"
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e7a466]" />
                {b}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <p className="mt-4 text-[10px] text-[#C1C0AC]/80">
        Valores ilustrativos. Seu relatório real é calculado ao final das {TOTAL} perguntas.
      </p>
    </div>
  );
}

/* ---------------- Seção completa ---------------- */
export function DiagnosticTeaser() {
  const [picked, setPicked] = useState<string | null>(null);
  const option = Q1.options.find((o) => o.id === picked) ?? null;
  const continueHref = option ? `/diagnostico?q1=${encodeURIComponent(option.id)}` : '/diagnostico';

  function choose(id: string) {
    setPicked(id);
    trackRunaEvent('diagnostic_step_progress', { question_number: 1, category: Q1.category, source: 'home_teaser' });
  }

  return (
    <section className="border-b border-[#d8d7cf] bg-[#fcfae5] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Texto + pergunta interativa */}
          <motion.div
            className="space-y-6 lg:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              — Diagnóstico digital gratuito
            </span>
            <h2 className="font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
              Descubra em 2 minutos onde sua empresa está perdendo clientes.
            </h2>
            <p className="text-base leading-relaxed text-[#4c524b]">
              {TOTAL} perguntas rápidas e você recebe uma nota de 0 a 100, os gargalos de cada área e o que priorizar primeiro.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#1c1c10]/80">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#27594F]" /> 2 minutos</span>
              <span className="flex items-center gap-1.5"><LineChart className="h-4 w-4 text-[#27594F]" /> Resultado na hora</span>
              <span className="flex items-center gap-1.5"><Gift className="h-4 w-4 text-[#27594F]" /> 100% gratuito</span>
            </div>

            {/* Pergunta 1 — respondida aqui mesmo */}
            <div className="rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF] p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between text-xs font-semibold">
                <span className="text-[#27594F]">Pergunta 1 de {TOTAL} · {Q1.categoryLabel}</span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: TOTAL }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === 0 && option ? 'w-4 bg-[#C97F38]' : i === 0 ? 'w-4 bg-[#27594F]/40' : 'w-1.5 bg-[#27594F]/15'
                      }`}
                    />
                  ))}
                </span>
              </div>
              <p className="text-base font-semibold text-[#1c1c10]">{Q1.title}</p>

              <div className="mt-4 grid grid-cols-1 gap-2">
                {Q1.options.map((opt) => {
                  const on = picked === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => choose(opt.id)}
                      aria-pressed={on}
                      className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all ${
                        on
                          ? 'border-[#C97F38] bg-[#fcfae5] text-[#1c1c10] shadow-sm'
                          : 'border-[#d8d7cf] bg-[#fcfae5]/60 text-[#4c524b] hover:border-[#27594F] hover:bg-[#fcfae5] hover:text-[#1c1c10]'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          on ? 'border-[#C97F38] bg-[#C97F38]' : 'border-[#27594F]/40'
                        }`}
                      >
                        {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence initial={false}>
                {option && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-[#27594F]">
                        <CheckCircle2 className="h-4 w-4" /> 1 de {TOTAL} respondida. Veja sua prévia <span className="hidden lg:inline">ao lado</span><span className="lg:hidden">abaixo</span>.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href={continueHref}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 ${
                  option ? 'bg-[#C97F38] shadow-[#C97F38]/30 hover:bg-[#b06b29]' : 'bg-[#27594F] shadow-[#27594F]/20 hover:bg-[#1e4840]'
                }`}
              >
                {option ? `Continuar: faltam ${TOTAL - 1} perguntas` : 'Ver minha nota em 2 minutos'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Prévia do resultado */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <ReportPreview answerScore={option?.score ?? null} bottleneck={option && option.score < 75 ? option.bottleneckIfLow : undefined} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
