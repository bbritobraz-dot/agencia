'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react';
import { RUNA_SERVICES } from '@/config/services';
import { BUSINESS_SEGMENTS, REVENUE_RANGES } from '@/config/diagnosticQuestions';
import {
  buildRunaWhatsAppUrl,
  getCapturedUtms,
  trackRunaEvent,
} from '@/lib/analytics/tracker';

/** Valor enviado quando a pessoa ainda não sabe qual solução precisa */
const UNDECIDED = 'a-definir';

/* ---------------- Cartão do WhatsApp (canal mais rápido) ---------------- */
export function ContactWhatsAppCard() {
  const url = buildRunaWhatsAppUrl('Olá! Vim pela página de contato do site da RUNA e gostaria de conversar sobre a minha empresa.');
  // Mostra o número a partir da mesma configuração usada no link (fonte única)
  const digits = url.match(/wa\.me\/(\d+)/)?.[1] ?? '';
  const pretty =
    digits.length === 13
      ? `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
      : digits;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackRunaEvent('whatsapp_click', { placement: 'contact_page' })}
      className="group block rounded-3xl bg-runa-pattern-dark p-6 text-white shadow-xl transition-transform hover:-translate-y-0.5"
    >
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Mais rápido
      </span>
      <p className="mt-3 font-display text-2xl">Fale no WhatsApp</p>
      <p className="mt-1 text-sm text-[#E8E7DF]/80">{pretty}</p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors group-hover:bg-[#b06b29]">
        <MessageCircle className="h-4 w-4" />
        Abrir conversa
      </span>
    </a>
  );
}

export function ContactForm({ initialService }: { initialService?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [segment, setSegment] = useState('');
  const [revenueRange, setRevenueRange] = useState('');
  const [serviceInterest, setServiceInterest] = useState(initialService || UNDECIDED);
  const [message, setMessage] = useState('');
  // LGPD: consentimento precisa ser uma ação ativa da pessoa (começa desmarcado)
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const interestLabel = serviceInterest === UNDECIDED ? 'orientação inicial' : serviceInterest;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const utms = getCapturedUtms();
      const response = await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          company,
          segment,
          revenue_range: revenueRange,
          service_interest: serviceInterest,
          message,
          privacy_consent: privacyConsent,
          marketing_consent: marketingConsent,
          honeypot,
          utms,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Erros de validação (400) e limite (429) trazem mensagens para o visitante;
        // falhas internas nunca exibem detalhes técnicos.
        setErrorMsg(
          (response.status === 400 || response.status === 429) && data.error
            ? data.error
            : 'Não conseguimos enviar agora. Tente de novo em instantes ou fale com a gente no WhatsApp.',
        );
        setSubmitting(false);
        return;
      }

      // Eventos de Analytics sem PII
      trackRunaEvent('commercial_form_submit', {
        service_interest: serviceInterest,
        segment: segment || 'nao_informado',
      });
      trackRunaEvent('lead_created', {
        origin: 'commercial_form',
        recommended_service: serviceInterest,
      });

      setSubmitted(true);
    } catch {
      setErrorMsg('Falha de conexão. Verifique sua internet e tente de novo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const firstName = name.trim().split(/\s+/)[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5 rounded-3xl border border-[#27594F] bg-[#fcfae5] p-8 text-center shadow-lg sm:p-12"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#27594F] text-white"
        >
          <CheckCircle2 className="h-9 w-9" />
        </motion.div>
        <h3 className="font-display text-3xl text-[#1c1c10]">Recebemos sua mensagem{firstName ? `, ${firstName}` : ''}!</h3>
        <p className="mx-auto max-w-lg text-sm text-[#4c524b] sm:text-base">
          Vamos analisar o que você contou e responder pelo WhatsApp ou e-mail. Se quiser adiantar a conversa, chame agora:
        </p>
        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <a
            href={buildRunaWhatsAppUrl(
              `Olá! Acabei de enviar o formulário de contato do site da RUNA pela empresa ${company} (interesse: ${interestLabel}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackRunaEvent('whatsapp_click', { placement: 'contact_success' })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
          >
            <MessageCircle className="h-4 w-4" />
            Adiantar no WhatsApp
          </a>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#27594F] px-6 py-3.5 text-sm font-semibold text-[#27594F] transition-colors hover:bg-[#27594F] hover:text-white"
          >
            Fazer o diagnóstico enquanto isso
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  const inputCls =
    'w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] transition-colors focus:border-[#27594F] focus:outline-none focus:ring-2 focus:ring-[#27594F]/15';
  const labelCls = 'mb-1.5 block text-xs font-semibold text-[#1c1c10]';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm sm:p-10"
    >
      <div>
        <h2 className="font-display text-2xl text-[#1c1c10] sm:text-3xl">Conte o que você precisa</h2>
        <p className="mt-1 text-sm text-[#4c524b]">Respondemos pelo WhatsApp ou e-mail.</p>
      </div>

      {/* Honeypot oculto contra bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Não preencha este campo</label>
        <input
          id="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className={labelCls}>Seu nome</label>
          <input id="ct-name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos te chamar?" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ct-company" className={labelCls}>Empresa</label>
          <input id="ct-company" type="text" required autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da sua empresa" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ct-whatsapp" className={labelCls}>WhatsApp com DDD</label>
          <input id="ct-whatsapp" type="tel" required autoComplete="tel" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(45) 99999-9999" className={inputCls} />
        </div>
        <div>
          <label htmlFor="ct-email" className={labelCls}>E-mail</label>
          <input id="ct-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="ct-interest" className={labelCls}>Com o que podemos ajudar?</label>
        <select id="ct-interest" value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value)} className={inputCls}>
          <option value={UNDECIDED}>Ainda não sei: quero orientação</option>
          {RUNA_SERVICES.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ct-message" className={labelCls}>
          Mensagem <span className="font-normal text-[#4c524b]">(opcional)</span>
        </label>
        <textarea
          id="ct-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte rapidamente o momento da sua empresa e o que você quer alcançar."
          className={inputCls}
        />
      </div>

      <details className="group rounded-2xl border border-[#d8d7cf] bg-white/60 px-4 py-3">
        <summary className="cursor-pointer list-none text-xs font-semibold text-[#27594F] [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1.5">
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" />
            Mais detalhes (opcional)
          </span>
        </summary>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ct-segment" className={labelCls}>Segmento</label>
            <select id="ct-segment" value={segment} onChange={(e) => setSegment(e.target.value)} className={inputCls}>
              <option value="">Selecione...</option>
              {BUSINESS_SEGMENTS.map((seg) => (
                <option key={seg} value={seg}>{seg}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ct-revenue" className={labelCls}>Faturamento mensal</label>
            <select id="ct-revenue" value={revenueRange} onChange={(e) => setRevenueRange(e.target.value)} className={inputCls}>
              <option value="">Selecione...</option>
              {REVENUE_RANGES.map((rev) => (
                <option key={rev} value={rev}>{rev}</option>
              ))}
            </select>
          </div>
        </div>
      </details>

      {/* Consentimentos LGPD separados; o obrigatório começa desmarcado */}
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
            Concordo que a RUNA use estes dados para responder meu contato, conforme a{' '}
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

      {errorMsg && (
        <div className="flex flex-col gap-3 rounded-xl border border-[#c0563a]/30 bg-[#c0563a]/10 p-4 text-sm text-[#7a2e1c] sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {errorMsg}
          </span>
          <a
            href={buildRunaWhatsAppUrl('Olá! Tentei enviar o formulário de contato do site da RUNA e não consegui.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackRunaEvent('whatsapp_click', { placement: 'contact_submit_error' })}
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#27594F] underline-offset-4 hover:underline"
          >
            <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:bg-[#b06b29] disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar mensagem
          </>
        )}
      </button>
    </form>
  );
}
