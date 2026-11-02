'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  AlertCircle,
} from 'lucide-react';
import { RUNA_SERVICES } from '@/config/services';
import { BUSINESS_SEGMENTS, REVENUE_RANGES } from '@/config/diagnosticQuestions';
import {
  buildRunaWhatsAppUrl,
  getCapturedUtms,
  trackRunaEvent,
} from '@/lib/analytics/tracker';

export function ContactForm({ initialService }: { initialService?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [segment, setSegment] = useState('');
  const [revenueRange, setRevenueRange] = useState('');
  const [serviceInterest, setServiceInterest] = useState(
    initialService || RUNA_SERVICES[0].title
  );
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(
          data.error ||
            'Não foi possível salvar os dados no momento. Verifique a conexão com o Supabase ou fale pelo WhatsApp.'
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
      setErrorMsg('Erro de comunicação com o servidor. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#27594F] bg-[#fcfae5] p-8 text-center space-y-5 shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#27594F]/15 text-[#27594F]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="font-display text-3xl text-[#1c1c10]">
          Solicitação registrada no CRM da RUNA!
        </h3>
        <p className="text-sm sm:text-base text-[#4c524b] max-w-lg mx-auto">
          Recebemos as informações da sua empresa. Nossa equipe consultiva analisará sua demanda e entrará em contato em breve.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={buildRunaWhatsAppUrl(
              `Olá! Acabei de enviar o formulário comercial pelo site da RUNA para a empresa ${company} (interesse em ${serviceInterest}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackRunaEvent('whatsapp_click', { placement: 'contact_success' })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe5a]"
          >
            <MessageCircle className="h-4 w-4" />
            Adiantar conversa no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-10 shadow-sm space-y-5"
    >
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
            Seu Nome *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Carlos Mendes"
            className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
            E-mail Corporativo *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="carlos@suaempresa.com.br"
            className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
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
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
            Solução de Interesse
          </label>
          <select
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
          >
            {RUNA_SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
            Segmento da Empresa
          </label>
          <select
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
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
            Faixa de Faturamento (Opcional)
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
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1c1c10] mb-1.5">
          Contexto ou Desafio Atual
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte brevemente o momento da sua empresa e o que você busca alcançar..."
          className="w-full rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-sm text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
        />
      </div>

      {/* Consentimentos LGPD separados */}
      <div className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/50 p-4 text-xs text-[#4c524b]">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#27594F]"
          />
          <span>
            Concordo com o tratamento dos dados informados para atendimento comercial pela RUNA, conforme a{' '}
            <Link href="/politica-de-privacidade" className="text-[#27594F] font-semibold underline">
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
            (Opcional) Aceito receber conteúdos técnicos, estudos e comunicações de marketing da RUNA.
          </span>
        </label>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#b06b29] disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Registrando solicitação...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar Solicitação Comercial
          </>
        )}
      </button>
    </form>
  );
}
