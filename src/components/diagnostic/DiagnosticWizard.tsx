'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, animate, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Gift,
  LineChart,
  Loader2,
  Lock,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  BUSINESS_SEGMENTS,
  DIAGNOSTIC_CATEGORY_LABELS,
  DIAGNOSTIC_QUESTIONS,
  REVENUE_RANGES,
  type DiagnosticCategoryKey,
} from '@/config/diagnosticQuestions';
import {
  calculateDiagnosticResult,
  type DiagnosticCalculationResult,
} from '@/lib/diagnostic/scoringEngine';
import {
  buildRunaWhatsAppUrl,
  getCapturedUtms,
  trackRunaEvent,
} from '@/lib/analytics/tracker';
import { captureAndPersistMetaParams } from '@/lib/analytics/metaCookies';

type WizardPhase = 'intro' | 'questions' | 'lead_capture' | 'result';

const EASE = [0.22, 1, 0.36, 1] as const;
const CATEGORY_ORDER = Object.keys(DIAGNOSTIC_CATEGORY_LABELS) as DiagnosticCategoryKey[];

/* ---------------- Resultado salvo no navegador (sobrevive a recarregar) ---------------- */
const STORAGE_KEY = 'runa_diagnostic_result_v1';
const STORAGE_TTL_MS = 6 * 60 * 60 * 1000; // 6 horas

interface SavedResult {
  result: DiagnosticCalculationResult;
  company: string;
  savedAt: number;
}

function subscribeStorage(cb: () => void) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}
function readStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function parseSaved(raw: string | null): SavedResult | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as SavedResult;
    if (!data?.result || Date.now() - data.savedAt > STORAGE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

const STATUS_COLOR: Record<string, string> = {
  Crítico: 'bg-[#c0563a]',
  Atenção: 'bg-[#C97F38]',
  Bom: 'bg-[#27594F]',
  Excelente: 'bg-emerald-600',
};

/* ---------------- Número animado ---------------- */
function CountUp({ to, reduce }: { to: number; reduce: boolean }) {
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, reduce]);
  return <>{reduce ? to : v}</>;
}

/* ---------------- Anel da nota ---------------- */
function ScoreRing({ score, reduce, size = 150 }: { score: number; reduce: boolean; size?: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
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
          animate={{ strokeDashoffset: C * (1 - score / 100) }}
          transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl text-white">
          <CountUp to={score} reduce={reduce} />
        </span>
        <span className="text-[11px] text-[#C1C0AC]">de 100</span>
      </div>
    </div>
  );
}

export function DiagnosticWizard({ initialQ1 }: { initialQ1?: string } = {}) {
  const reduce = !!useReducedMotion();

  // Resposta da 1ª pergunta vinda da home (?q1=...): começa direto na pergunta 2
  const prefilledQ1 = DIAGNOSTIC_QUESTIONS[0].options.some((o) => o.id === initialQ1)
    ? initialQ1
    : undefined;
  const [phase, setPhase] = useState<WizardPhase>(prefilledQ1 ? 'questions' : 'intro');
  const [currentIndex, setCurrentIndex] = useState(prefilledQ1 ? 1 : 0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    prefilledQ1 ? { [DIAGNOSTIC_QUESTIONS[0].id]: prefilledQ1 } : {},
  );

  useEffect(() => {
    if (!prefilledQ1) return;
    trackRunaEvent('diagnostic_start', { total_questions: DIAGNOSTIC_QUESTIONS.length, source: 'home_teaser' });
    trackRunaEvent('StartDiagnostic', {
      total_questions: DIAGNOSTIC_QUESTIONS.length,
      flow: 'gamified_quiz',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dados cadastrais do Lead
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [segment, setSegment] = useState('');
  const [revenueRange, setRevenueRange] = useState('');
  const [website, setWebsite] = useState('');
  // LGPD: consentimento precisa ser uma ação ativa da pessoa (começa desmarcado)
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Estado de submissão e resultado
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticCalculationResult | null>(null);
  const [resultCompany, setResultCompany] = useState('');

  // Resultado anterior salvo neste navegador
  const savedRaw = useSyncExternalStore(subscribeStorage, readStorage, () => null);
  const saved = useMemo(() => parseSaved(savedRaw), [savedRaw]);

  // Rastreamento de abandono por etapa
  const phaseRef = useRef<WizardPhase>(phase);
  const stepRef = useRef<number>(currentIndex + 1);
  useEffect(() => {
    phaseRef.current = phase;
    stepRef.current = currentIndex + 1;
  }, [phase, currentIndex]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (phaseRef.current === 'questions' || phaseRef.current === 'lead_capture') {
        trackRunaEvent('diagnostic_abandon', {
          abandoned_phase: phaseRef.current,
          abandoned_step: stepRef.current,
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent =
    phase === 'questions'
      ? Math.round((answeredCount / totalQuestions) * 100)
      : phase === 'intro'
        ? 0
        : 100;

  // Nota parcial por área enquanto a pessoa responde
  const partialByCategory = useMemo(() => {
    const buckets: Partial<Record<DiagnosticCategoryKey, number[]>> = {};
    for (const q of DIAGNOSTIC_QUESTIONS) {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      if (!opt) continue;
      (buckets[q.category] ??= []).push(opt.score);
    }
    return CATEGORY_ORDER.map((cat) => {
      const list = buckets[cat];
      return {
        cat,
        label: DIAGNOSTIC_CATEGORY_LABELS[cat],
        score: list ? Math.round(list.reduce((a, b) => a + b, 0) / list.length) : null,
      };
    });
  }, [answers]);

  // Prévia da nota antes do formulário (mesmo cálculo usado no servidor)
  const preview = useMemo(
    () => (answeredCount === totalQuestions ? calculateDiagnosticResult(answers) : null),
    [answers, answeredCount, totalQuestions],
  );

  const handleStart = () => {
    trackRunaEvent('diagnostic_start', { total_questions: totalQuestions });
    trackRunaEvent('StartDiagnostic', {
      total_questions: totalQuestions,
      flow: 'gamified_quiz',
    });
    setPhase('questions');
    setCurrentIndex(0);
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
    setSubmitError(null);
    setPhase('intro');
    setCurrentIndex(0);
  };

  const showSaved = () => {
    if (!saved) return;
    setResult(saved.result);
    setResultCompany(saved.company);
    setPhase('result');
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    trackRunaEvent('diagnostic_step_progress', {
      question_number: currentQuestion.number,
      category: currentQuestion.category,
    });

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 220);
    } else {
      setTimeout(() => {
        setPhase('lead_capture');
      }, 220);
    }
  };

  const handleBack = () => {
    if (phase === 'lead_capture') {
      setPhase('questions');
      setCurrentIndex(totalQuestions - 1);
    } else if (phase === 'questions' && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (phase === 'questions' && currentIndex === 0) {
      setPhase('intro');
    }
  };

  const handleSubmitDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const utms = getCapturedUtms();
      const metaParams = captureAndPersistMetaParams();
      const response = await fetch('/api/diagnostics/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          company,
          segment,
          revenue_range: revenueRange,
          website,
          privacy_consent: privacyConsent,
          marketing_consent: marketingConsent,
          honeypot,
          answers,
          utms,
          meta: metaParams,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        // Erros de validação (400) trazem mensagens pensadas para o visitante;
        // falhas internas nunca expõem detalhes técnicos.
        setSubmitError(
          response.status === 400 && data.error
            ? data.error
            : response.status === 429
              ? 'Muitas tentativas em pouco tempo. Aguarde um minuto e tente de novo.'
              : 'Não conseguimos salvar agora. Tente de novo em instantes ou fale com a gente no WhatsApp.',
        );
        setSubmitting(false);
        return;
      }

      setResult(data.result);
      setResultCompany(company);
      setPhase('result');
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ result: data.result, company, savedAt: Date.now() } satisfies SavedResult),
        );
      } catch {
        // navegador sem armazenamento: o resultado só não persiste
      }

      // ID único para deduplicação perfeita entre Meta Pixel e Conversions API (CAPI)
      const leadEventId = data.leadEventId || `lead_${data.leadId}`;

      // Disparar eventos de Analytics com deduplication event_id
      trackRunaEvent('diagnostic_complete', {
        overall_score: data.result.overallScore,
        maturity_level: data.result.maturityLevel,
        primary_recommendation: data.result.primaryRecommendation,
      });
      trackRunaEvent(
        'lead_created',
        {
          origin: 'diagnostic_quiz',
          overall_score: data.result.overallScore,
          recommended_service: data.result.primaryRecommendation,
          company_name: company,
        },
        { eventID: leadEventId }
      );
      trackRunaEvent('diagnostic_result_view', {
        overall_score: data.result.overallScore,
        maturity_level: data.result.maturityLevel,
      });
    } catch {
      setSubmitError('Falha de conexão. Verifique sua internet e tente de novo.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] transition-colors focus:border-[#27594F] focus:outline-none focus:ring-2 focus:ring-[#27594F]/15';
  const labelCls = 'mb-1 block text-xs font-semibold text-[#1c1c10]';

  return (
    <div className="mx-auto max-w-5xl">
      <AnimatePresence mode="wait">
        {/* FASE 1: INTRO */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 text-center shadow-lg sm:p-12"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#27594F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#27594F]">
              <Sparkles className="h-4 w-4 text-[#C97F38]" />
              Diagnóstico digital gratuito
            </div>

            <h1 className="font-display text-3xl leading-tight text-[#1c1c10] sm:text-5xl">
              Descubra em 2 minutos onde sua empresa está perdendo clientes.
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#4c524b] sm:text-lg">
              {totalQuestions} perguntas rápidas e você recebe uma nota de 0 a 100, os gargalos de cada área e o que priorizar primeiro.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-[#1c1c10]/80">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#27594F]" /> 2 minutos</span>
              <span className="flex items-center gap-1.5"><LineChart className="h-4 w-4 text-[#27594F]" /> Nota na hora</span>
              <span className="flex items-center gap-1.5"><Gift className="h-4 w-4 text-[#27594F]" /> 100% gratuito</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#C97F38] px-9 py-4 text-base font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29] sm:w-auto"
              >
                Começar diagnóstico
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {saved && (
              <button
                type="button"
                onClick={showSaved}
                className="mx-auto flex items-center gap-2 text-sm font-semibold text-[#27594F] underline-offset-4 hover:underline"
              >
                <BarChart3 className="h-4 w-4" />
                Ver o resultado de {saved.company} que você acabou de fazer
              </button>
            )}
          </motion.div>
        )}

        {/* FASE 2: PERGUNTAS + MAPA DA EMPRESA */}
        {phase === 'questions' && currentQuestion && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12"
          >
            <div className="lg:col-span-8">
              {/* Progresso */}
              <div className="mb-4 flex items-center gap-3">
                <span className="shrink-0 font-mono text-xs font-semibold text-[#27594F]">
                  {answeredCount}/{totalQuestions}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#d8d7cf]/60">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#27594F] to-[#C97F38]"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-lg sm:p-10"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4c524b] hover:text-[#1c1c10]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Voltar
                    </button>
                    <span className="rounded-full bg-[#27594F]/10 px-3 py-1 text-xs font-semibold text-[#27594F]">
                      Pergunta {currentQuestion.number} de {totalQuestions} · {currentQuestion.categoryLabel}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display text-2xl leading-snug text-[#1c1c10] sm:text-3xl">
                      {currentQuestion.title}
                    </h2>
                    <p className="text-sm text-[#4c524b]">{currentQuestion.subtitle}</p>
                  </div>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                          aria-pressed={isSelected}
                          className={`w-full rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                            isSelected
                              ? 'border-[#C97F38] bg-[#C97F38]/10 shadow-sm'
                              : 'border-[#d8d7cf] bg-white hover:border-[#27594F] hover:bg-[#E8E7DF]/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="text-sm font-bold text-[#1c1c10] sm:text-base">{option.label}</div>
                              <p className="text-xs text-[#4c524b] sm:text-sm">{option.description}</p>
                            </div>
                            <div
                              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                isSelected ? 'border-[#C97F38] bg-[#C97F38] text-white' : 'border-[#d8d7cf]'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="h-4 w-4" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mapa da empresa: áreas se preenchendo conforme as respostas */}
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-[#27594F] bg-runa-pattern-dark p-5 text-[#fcfae5] shadow-xl lg:sticky lg:top-28">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">Mapa da sua empresa</p>
                <p className="mt-1 text-xs text-[#C1C0AC]">Cada resposta revela uma área.</p>
                <ul className="mt-4 space-y-3">
                  {partialByCategory.map((c) => {
                    const isCurrent = c.cat === currentQuestion.category;
                    return (
                      <li key={c.cat}>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className={isCurrent ? 'font-semibold text-white' : 'text-[#C1C0AC]'}>{c.label}</span>
                          <span className="font-mono text-[#C1C0AC]">{c.score === null ? '—' : '✓'}</span>
                        </div>
                        <div className={`h-1.5 overflow-hidden rounded-full ${isCurrent ? 'bg-[#C97F38]/25' : 'bg-white/10'}`}>
                          <motion.div
                            className="h-full rounded-full bg-[#C97F38]"
                            initial={false}
                            animate={{ width: c.score === null ? '0%' : `${Math.max(c.score, 8)}%` }}
                            transition={{ duration: 0.6, ease: EASE }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 hidden text-[11px] text-[#C1C0AC]/80 lg:block">A nota final aparece logo depois da última pergunta.</p>
              </div>
            </aside>
          </motion.div>
        )}

        {/* FASE 3: PRÉVIA DA NOTA + FORMULÁRIO */}
        {phase === 'lead_capture' && preview && (
          <motion.div
            key="lead_capture"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12"
          >
            {/* Prévia: nota visível, detalhes bloqueados */}
            <div className="rounded-3xl border border-[#27594F] bg-runa-pattern-dark p-6 text-[#fcfae5] shadow-xl sm:p-8 lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">Sua nota está pronta</p>
              <div className="mt-5 flex items-center gap-5">
                <ScoreRing score={preview.overallScore} reduce={reduce} size={130} />
                <div>
                  <p className="text-xs text-[#C1C0AC]">Nível de maturidade</p>
                  <p className="font-display text-2xl text-white">{preview.maturityLevel}</p>
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#13302a]/80 p-4">
                <div aria-hidden className="pointer-events-none select-none space-y-2.5 blur-[5px]">
                  {preview.categoryDetails.map((c) => (
                    <div key={c.category}>
                      <div className="mb-1 flex justify-between text-[11px] text-[#C1C0AC]">
                        <span>{c.label}</span>
                        <span>{c.score}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#C97F38]" style={{ width: `${c.score}%` }} />
                      </div>
                    </div>
                  ))}
                  <p className="pt-2 text-xs text-[#e9e8dc]">{preview.bottlenecks[0]?.description}</p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#13302a]/40 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C97F38] text-white">
                    <Lock className="h-5 w-5" />
                  </span>
                  <p className="px-6 text-sm font-semibold text-white">
                    Nota por área, gargalos e plano de ação
                  </p>
                  <p className="text-xs text-[#C1C0AC]">
                    Liberados ao preencher <span className="hidden lg:inline">ao lado</span>
                    <span className="lg:hidden">abaixo</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Formulário enxuto */}
            <div className="space-y-5 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-lg sm:p-8 lg:col-span-7">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4c524b] hover:text-[#1c1c10]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Revisar respostas
                </button>
                <span className="rounded-full bg-[#C97F38]/15 px-3 py-1 text-xs font-semibold text-[#b06b29]">
                  {totalQuestions}/{totalQuestions} respondidas
                </span>
              </div>

              <div>
                <h2 className="font-display text-2xl text-[#1c1c10] sm:text-3xl">Receba seu relatório completo</h2>
                <p className="mt-1 text-sm text-[#4c524b]">
                  Leva 30 segundos. O relatório aparece na tela assim que você enviar.
                </p>
              </div>

              <form onSubmit={handleSubmitDiagnostic} className="space-y-4">
                {/* Honeypot anti-spam */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dg-name" className={labelCls}>Seu nome</label>
                    <input id="dg-name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos te chamar?" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="dg-company" className={labelCls}>Empresa</label>
                    <input id="dg-company" type="text" required autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da sua empresa" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="dg-whatsapp" className={labelCls}>WhatsApp com DDD</label>
                    <input id="dg-whatsapp" type="tel" required autoComplete="tel" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(45) 99999-9999" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="dg-email" className={labelCls}>E-mail</label>
                    <input id="dg-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className={inputCls} />
                  </div>
                </div>

                <details className="group rounded-2xl border border-[#d8d7cf] bg-white/60 px-4 py-3">
                  <summary className="cursor-pointer list-none text-xs font-semibold text-[#27594F] [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex items-center gap-1.5">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" />
                      Mais detalhes (opcional): ajudam a deixar a análise mais precisa
                    </span>
                  </summary>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="dg-segment" className={labelCls}>Segmento</label>
                      <select id="dg-segment" value={segment} onChange={(e) => setSegment(e.target.value)} className={inputCls}>
                        <option value="">Selecione...</option>
                        {BUSINESS_SEGMENTS.map((seg) => (
                          <option key={seg} value={seg}>{seg}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="dg-revenue" className={labelCls}>Faturamento mensal</label>
                      <select id="dg-revenue" value={revenueRange} onChange={(e) => setRevenueRange(e.target.value)} className={inputCls}>
                        <option value="">Selecione...</option>
                        {REVENUE_RANGES.map((rev) => (
                          <option key={rev} value={rev}>{rev}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="dg-site" className={labelCls}>Site ou Instagram</label>
                      <input id="dg-site" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="suaempresa.com.br" className={inputCls} />
                    </div>
                  </div>
                </details>

                {/* Consentimento LGPD: começa desmarcado */}
                <div className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/50 p-4 text-xs text-[#4c524b]">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      required
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#27594F]"
                    />
                    <span>
                      Concordo que a RUNA guarde minhas respostas e contato para me enviar a análise, conforme a{' '}
                      <Link href="/politica-de-privacidade" className="font-semibold text-[#27594F] underline">
                        Política de Privacidade
                      </Link>
                      .
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#C97F38]"
                    />
                    <span>Quero receber conteúdos sobre marketing, tecnologia e IA (opcional).</span>
                  </label>
                </div>

                {submitError && (
                  <div className="flex flex-col gap-3 rounded-xl border border-[#c0563a]/30 bg-[#c0563a]/10 p-4 text-sm text-[#7a2e1c] sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {submitError}
                    </span>
                    <a
                      href={buildRunaWhatsAppUrl(
                        `Olá! Tentei concluir o diagnóstico no site da RUNA e não consegui enviar. Minha nota prévia foi ${preview.overallScore}/100.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackRunaEvent('whatsapp_click', { placement: 'diagnostic_submit_error' })}
                      className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#27594F] underline-offset-4 hover:underline"
                    >
                      <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:bg-[#b06b29] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Preparando seu relatório...
                    </>
                  ) : (
                    <>
                      Ver meu relatório completo
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* FASE 4: RELATÓRIO */}
        {phase === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Nota geral */}
            <div className="rounded-3xl border border-[#27594F] bg-runa-pattern-dark p-6 text-white shadow-2xl sm:p-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Relatório de {resultCompany || 'sua empresa'}
                </span>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C1C0AC] hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Refazer diagnóstico
                </button>
              </div>

              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[#13302a]/90 p-6 text-center lg:col-span-4">
                  <ScoreRing score={result.overallScore} reduce={reduce} />
                  <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-white">
                    {result.maturityLevel}
                  </span>
                </div>

                <div className="space-y-4 lg:col-span-8">
                  <h2 className="font-display text-2xl text-white sm:text-3xl">O que sua nota diz</h2>
                  <p className="text-sm leading-relaxed text-[#E8E7DF]/90 sm:text-base">{result.maturityDescription}</p>
                  <div className="rounded-xl border border-[#C97F38]/40 bg-[#C97F38]/15 p-4">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#C97F38]">Comece por aqui</span>
                    <span className="text-lg font-bold text-white">{result.primaryRecommendation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota por área */}
            <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#27594F]" />
                <h3 className="font-display text-2xl text-[#1c1c10]">Nota por área</h3>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {result.categoryDetails.map((cat, i) => (
                  <div key={cat.category} className="space-y-2 rounded-2xl border border-[#d8d7cf] bg-white p-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#1c1c10]">{cat.label}</span>
                      <span className="text-[#27594F]">
                        {cat.score}/100 · {cat.status}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8E7DF]">
                      <motion.div
                        className={`h-full rounded-full ${STATUS_COLOR[cat.status] ?? 'bg-[#27594F]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.2 + i * 0.08, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gargalos */}
            {result.bottlenecks.length > 0 && (
              <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm sm:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#C97F38]" />
                  <h3 className="font-display text-2xl text-[#1c1c10]">Onde sua empresa está perdendo oportunidades</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {result.bottlenecks.map((b, index) => (
                    <div key={`${b.category}_${index}`} className="space-y-1.5 rounded-2xl border border-[#C97F38]/30 bg-[#C97F38]/[0.06] p-4">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#9a5c20]">{b.categoryLabel}</span>
                        <span className="rounded bg-[#C97F38]/20 px-2 py-0.5 text-[11px] text-[#7a4615]">
                          Impacto {b.severity === 'Alta' ? 'alto' : 'médio'}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#1c1c10] sm:text-sm">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plano de ação */}
            <div className="space-y-6 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm sm:p-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Plano de ação</span>
                <h3 className="mt-1 font-display text-2xl text-[#1c1c10]">O que priorizar na sua empresa</h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {result.recommendedServices.map((rec) => (
                  <div key={rec.slug} className="flex flex-col justify-between rounded-2xl border border-[#d8d7cf] bg-white p-5">
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-[#27594F]/15 px-3 py-0.5 text-[11px] font-bold text-[#27594F]">
                        {rec.priority}
                      </span>
                      <h4 className="font-display text-xl text-[#1c1c10]">{rec.title}</h4>
                      <p className="text-xs leading-relaxed text-[#4c524b]">{rec.reason}</p>
                    </div>
                    <div className="mt-4 border-t border-[#d8d7cf] pt-3">
                      <Link href={`/solucoes/${rec.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#C97F38] hover:underline">
                        Conhecer esta solução →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#1e4840] p-6 text-white sm:flex-row">
                <div className="space-y-1">
                  <h4 className="text-base font-bold">Quer conversar sobre sua nota ({result.overallScore}/100)?</h4>
                  <p className="text-xs text-[#E8E7DF]/80">
                    A gente analisa seu resultado com você e mostra por onde começar, sem compromisso.
                  </p>
                </div>
                <a
                  href={buildRunaWhatsAppUrl(
                    `Olá! Acabei de concluir o Diagnóstico Digital da RUNA para a empresa ${resultCompany}. Minha pontuação foi ${result.overallScore}/100 (${result.maturityLevel}) e a recomendação principal foi ${result.primaryRecommendation}. Gostaria de conversar sobre os próximos passos!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackRunaEvent('whatsapp_click', {
                      placement: 'diagnostic_result',
                      overall_score: result.overallScore,
                    })
                  }
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Conversar no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
