'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { getStoredConsent, saveCookieConsent } from '@/lib/analytics/tracker';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveCookieConsent({ analytics: true, marketing: true });
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    saveCookieConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  const handleSaveCustom = () => {
    saveCookieConsent({ analytics: analyticsConsent, marketing: marketingConsent });
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-20 z-50 max-w-xl rounded-2xl border border-[#27594F] bg-[#13302a] p-5 text-[#fcfae5] shadow-2xl">
      <div className="flex items-start gap-3">
        <ShieldCheck className="h-6 w-6 shrink-0 text-[#C97F38] mt-0.5" />
        <div className="space-y-2 text-xs leading-relaxed">
          <p className="text-sm font-semibold text-white">
            Privacidade e Governança de Dados (LGPD)
          </p>
          <p className="text-[#E8E7DF]/85">
            Utilizamos cookies essenciais para o funcionamento do site e, mediante seu consentimento, métricas anônimas de desempenho e marketing. Nenhum dado pessoal sensível é exposto em eventos de analytics. Consulte nossa{' '}
            <Link href="/politica-de-privacidade" className="text-[#C97F38] underline">
              Política de Privacidade
            </Link>
            .
          </p>

          {customizeOpen && (
            <div className="mt-3 space-y-2 rounded-xl border border-[#27594F]/80 bg-[#1e4840]/70 p-3">
              <label className="flex items-center justify-between gap-2 text-xs">
                <span>
                  <strong className="text-white">Essenciais (Obrigatórios):</strong> Segurança, sessão e envio de formulários.
                </span>
                <input type="checkbox" checked disabled className="h-4 w-4 accent-[#C97F38]" />
              </label>

              <label className="flex items-center justify-between gap-2 text-xs cursor-pointer">
                <span>
                  <strong className="text-white">Desempenho e Analytics:</strong> Mensuração agregada de uso do diagnóstico e páginas.
                </span>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="h-4 w-4 accent-[#C97F38]"
                />
              </label>

              <label className="flex items-center justify-between gap-2 text-xs cursor-pointer">
                <span>
                  <strong className="text-white">Marketing e Mídia (Separado):</strong> Atribuição de campanhas publicitárias (Meta/Google).
                </span>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="h-4 w-4 accent-[#C97F38]"
                />
              </label>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-lg bg-[#C97F38] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#b06b29] transition-colors"
            >
              Aceitar todos
            </button>
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="rounded-lg border border-[#C1C0AC]/40 px-3 py-2 text-xs font-medium text-[#E8E7DF] hover:bg-white/10 transition-colors"
            >
              Apenas essenciais
            </button>
            {!customizeOpen ? (
              <button
                type="button"
                onClick={() => setCustomizeOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs text-[#C1C0AC] hover:text-white"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Preferências
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="rounded-lg bg-[#27594F] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#00616D] transition-colors"
              >
                Salvar preferências
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
