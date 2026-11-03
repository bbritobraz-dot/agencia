'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Loader2,
  MessageCircle,
  Trophy,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import {
  BUSINESS_SEGMENTS,
  DIAGNOSTIC_QUESTIONS,
  REVENUE_RANGES,
} from '@/config/diagnosticQuestions';
import { DiagnosticCalculationResult } from '@/lib/diagnostic/scoringEngine';
import {
  buildRunaWhatsAppUrl,
  getCapturedUtms,
  trackRunaEvent,
} from '@/lib/analytics/tracker';
import { captureAndPersistMetaParams } from '@/lib/analytics/metaCookies';

type WizardPhase = 'intro' | 'questions' | 'lead_capture' | 'result';

export function DiagnosticWizard() {
  const [phase, setPhase] = useState<WizardPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Dados cadastrais do Lead
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [segment, setSegment] = useState('');
  const [revenueRange, setRevenueRange] = useState('');
  const [website, setWebsite] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Estado de submissão e resultado
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticCalculationResult | null>(null);
  const [savedLeadId, setSavedLeadId] = useState<string | null>(null);

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
  const progressPercent =
    phase === 'intro'
      ? 0
      : phase === 'questions'
      ? Math.round(((currentIndex + 1) / (totalQuestions + 1)) * 100)
      : phase === 'lead_capture'
      ? 92
      : 100;

  const handleStart = () => {
    trackRunaEvent('diagnostic_start', { total_questions: totalQuestions });
    trackRunaEvent('StartDiagnostic', {
      total_questions: totalQuestions,
      flow: 'gamified_quiz',
    });
    setPhase('questions');
    setCurrentIndex(0);
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
      }, 180);
    } else {
      setTimeout(() => {
        setPhase('lead_capture');
      }, 180);
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

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitError(
          data.error ||
            'Não foi possível salvar o diagnóstico no banco de dados Supabase. Verifique as credenciais em .env.local.'
        );
        setSubmitting(false);
        return;
      }

      setResult(data.result);
      setSavedLeadId(data.leadId);
      setPhase('result');

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
      setSubmitError(
        'Falha de conexão ao salvar o diagnóstico. Tente novamente.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Barra superior de progresso gamificado */}
      {phase !== 'intro' && (
        <div className="mb-6 rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#27594F] mb-2">
            <span>
              {phase === 'questions'
                ? `Etapa ${currentIndex + 1} de ${totalQuestions} · ${currentQuestion.categoryLabel}`
                : phase === 'lead_capture'
                ? 'Etapa Final · Geração do Relatório Executivo'
                : 'Diagnóstico Concluído e Salvo'}
            </span>
            <span className="font-mono text-[#C97F38]">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E8E7DF]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#27594F] to-[#C97F38]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* FASE 1: INTRO */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-12 shadow-lg text-center space-y-6"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#27594F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#27594F]">
              <Sparkles className="h-4 w-4 text-[#C97F38]" />
              Avaliação Interativa em 8 Perguntas
            </div>

            <h1 className="font-display text-3xl sm:text-5xl text-[#1c1c10] leading-tight">
              Diagnóstico de Maturidade Digital e Crescimento Empresarial
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#4c524b] leading-relaxed">
              Avalie gratuitamente os 6 pilares digitais da sua empresa (Tráfego Pago, Sites, E-commerce, Automações e IA, Sistemas/CRM e Dados). Ao concluir, você recebe imediatamente sua pontuação detalhada, os principais gargalos e o plano de serviços recomendado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-2">
              <div className="rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-4">
                <div className="text-xs font-bold text-[#C97F38]">01 · Rápido</div>
                <p className="mt-1 text-xs text-[#1c1c10]">
                  8 perguntas objetivas pensadas para empresários e gestores.
                </p>
              </div>
              <div className="rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-4">
                <div className="text-xs font-bold text-[#27594F]">02 · Analítico</div>
                <p className="mt-1 text-xs text-[#1c1c10]">
                  Pontuação calculada geral e por categoria de 0 a 100 pontos.
                </p>
              </div>
              <div className="rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-4">
                <div className="text-xs font-bold text-[#00616D]">03 · Imediato</div>
                <p className="mt-1 text-xs text-[#1c1c10]">
                  Resultado exibido na tela assim que as respostas são salvas.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-[#C97F38] px-9 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b06b29] hover:-translate-y-0.5"
              >
                Iniciar Diagnóstico Agora
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* FASE 2: 8 PERGUNTAS */}
        {phase === 'questions' && currentQuestion && (
          <motion.div
            key={`question_${currentQuestion.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-10 shadow-lg space-y-6"
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
              <span className="rounded-full bg-[#27594F]/15 px-3 py-1 text-xs font-bold text-[#27594F]">
                Pergunta {currentQuestion.number} de {totalQuestions}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl text-[#1c1c10] leading-snug">
                {currentQuestion.title}
              </h2>
              <p className="text-sm text-[#4c524b]">{currentQuestion.subtitle}</p>
            </div>

            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                    className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all ${
                      isSelected
                        ? 'border-[#C97F38] bg-[#C97F38]/10 shadow-sm'
                        : 'border-[#d8d7cf] bg-white hover:border-[#27594F] hover:bg-[#E8E7DF]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm sm:text-base font-bold text-[#1c1c10]">
                          {option.label}
                        </div>
                        <p className="text-xs sm:text-sm text-[#4c524b]">
                          {option.description}
                        </p>
                      </div>
                      <div
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? 'border-[#C97F38] bg-[#C97F38] text-white'
                            : 'border-[#d8d7cf]'
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
        )}

        {/* FASE 3: FORMULÁRIO DE CAPTURA E SALVAMENTO */}
        {phase === 'lead_capture' && (
          <motion.div
            key="lead_capture"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-10 shadow-lg space-y-6"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4c524b] hover:text-[#1c1c10]"
              >
                <ArrowLeft className="h-4 w-4" />
                Revisar última pergunta
              </button>
              <span className="rounded-full bg-[#C97F38]/15 px-3 py-1 text-xs font-bold text-[#C97F38]">
                8/8 Perguntas Respondidas
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl text-[#1c1c10]">
                Suas respostas estão prontas para processamento!
              </h2>
              <p className="text-sm text-[#4c524b]">
                Informe os dados da sua empresa abaixo para salvar o diagnóstico e exibir imediatamente sua pontuação geral, análise por categoria e recomendações.
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@suaempresa.com.br"
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(45) 99999-9999"
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nome da sua empresa"
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    Segmento *
                  </label>
                  <select
                    required
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  >
                    <option value="">Selecione...</option>
                    {BUSINESS_SEGMENTS.map((seg) => (
                      <option key={seg} value={seg}>
                        {seg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    Faixa de Faturamento
                  </label>
                  <select
                    value={revenueRange}
                    onChange={(e) => setRevenueRange(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  >
                    <option value="">Opcional...</option>
                    {REVENUE_RANGES.map((rev) => (
                      <option key={rev} value={rev}>
                        {rev}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1">
                    Site ou Instagram (Opcional)
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="suaempresa.com.br"
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Consentimento LGPD */}
              <div className="space-y-2 rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/50 p-4 text-xs text-[#4c524b]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#27594F]"
                  />
                  <span>
                    Autorizo o armazenamento das respostas do diagnóstico e dados de contato para análise consultiva da RUNA conforme a{' '}
                    <Link
                      href="/politica-de-privacidade"
                      className="text-[#27594F] font-semibold underline"
                    >
                      Política de Privacidade (LGPD)
                    </Link>
                    . *
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#C97F38]"
                  />
                  <span>
                    (Opcional) Desejo receber conteúdos estratégicos e materiais sobre marketing, tecnologia e IA.
                  </span>
                </label>
              </div>

              {submitError && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b06b29] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Salvando diagnóstico e calculando resultado...
                  </>
                ) : (
                  <>
                    <Trophy className="h-5 w-5" />
                    Salvar e Ver Meu Resultado Agora
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* FASE 4: RESULTADO IMEDIATO APÓS SALVAMENTO */}
        {phase === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Card Principal de Score */}
            <div className="bg-runa-pattern-dark rounded-3xl border border-[#27594F] p-6 sm:p-10 text-white shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4 mb-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Diagnóstico Registrado para {company}
                </div>
                {savedLeadId && (
                  <span className="text-[11px] font-mono text-[#C1C0AC]">
                    Protocolo CRM #{savedLeadId.slice(0, 8)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-[#13302a]/90 p-6 text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C1C0AC]">
                    Pontuação Geral
                  </span>
                  <div className="my-2 font-display text-6xl text-[#C97F38]">
                    {result.overallScore}
                    <span className="text-2xl text-white/60">/100</span>
                  </div>
                  <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-white">
                    Nível: {result.maturityLevel}
                  </span>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <h2 className="font-display text-2xl sm:text-3xl text-white">
                    Análise Executiva do Seu Cenário Digital
                  </h2>
                  <p className="text-sm sm:text-base text-[#E8E7DF]/90 leading-relaxed">
                    {result.maturityDescription}
                  </p>
                  <div className="rounded-xl border border-[#C97F38]/40 bg-[#C97F38]/15 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C97F38] block">
                      Frente Prioritária Recomendada:
                    </span>
                    <span className="text-lg font-bold text-white">
                      {result.primaryRecommendation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pontuação por Categoria (6 Pilares) */}
            <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-5 w-5 text-[#27594F]" />
                <h3 className="font-display text-2xl text-[#1c1c10]">
                  Pontuação por Categoria
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {result.categoryDetails.map((cat) => (
                  <div
                    key={cat.category}
                    className="rounded-2xl border border-[#d8d7cf] bg-white p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#1c1c10]">{cat.label}</span>
                      <span className="text-[#27594F]">{cat.score}/100 ({cat.status})</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8E7DF]">
                      <div
                        className="h-full rounded-full bg-[#27594F]"
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principais Gargalos Identificados */}
            <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="h-5 w-5 text-[#C97F38]" />
                <h3 className="font-display text-2xl text-[#1c1c10]">
                  Principais Gargalos Identificados
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.bottlenecks.map((b, index) => (
                  <div
                    key={`${b.category}_${index}`}
                    className="rounded-2xl border border-amber-500/30 bg-amber-50/60 p-4 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#9a5c20]">{b.categoryLabel}</span>
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] text-amber-900">
                        Criticidade {b.severity}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1c1c10] leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Soluções Recomendadas */}
            <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  — Plano de Ação Recomendado
                </span>
                <h3 className="font-display text-2xl text-[#1c1c10] mt-1">
                  Serviços Relacionados para Destravar Seu Crescimento
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {result.recommendedServices.map((rec) => (
                  <div
                    key={rec.slug}
                    className="flex flex-col justify-between rounded-2xl border border-[#d8d7cf] bg-white p-5"
                  >
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-[#27594F]/15 px-3 py-0.5 text-[11px] font-bold text-[#27594F]">
                        {rec.priority}
                      </span>
                      <h4 className="font-display text-xl text-[#1c1c10]">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-[#4c524b] leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#d8d7cf]">
                      <Link
                        href={`/solucoes/${rec.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#C97F38] hover:underline"
                      >
                        Conhecer esta solução →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Conversa no WhatsApp com o diagnóstico pronto */}
              <div className="rounded-2xl bg-[#1e4840] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold">
                    Quer debater seu resultado ({result.overallScore}/100) com um especialista da RUNA?
                  </h4>
                  <p className="text-xs text-[#E8E7DF]/80">
                    Suas respostas já estão salvas em nosso CRM interno. Clique ao lado para iniciar a conversa no WhatsApp.
                  </p>
                </div>
                <a
                  href={buildRunaWhatsAppUrl(
                    `Olá! Acabei de concluir o Diagnóstico Digital da RUNA para a empresa ${company}. Minha pontuação foi ${result.overallScore}/100 (${result.maturityLevel}) e a recomendação principal foi ${result.primaryRecommendation}. Gostaria de conversar sobre os próximos passos!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackRunaEvent('whatsapp_click', {
                      placement: 'diagnostic_result',
                      overall_score: result.overallScore,
                    })
                  }
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#1ebe5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp sobre meu diagnóstico
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
