'use client';

export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_page: string | null;
}

export interface CookieConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const UTM_STORAGE_KEY = 'runa_attribution_utms';
const CONSENT_STORAGE_KEY = 'runa_lgpd_consent_v1';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentState;
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: Omit<CookieConsentState, 'essential' | 'updatedAt'>): CookieConsentState {
  const state: CookieConsentState = {
    essential: true,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
    updatedAt: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('runa:consent-updated', { detail: state }));
  }
  return state;
}

export function captureAndPersistUtms(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      referrer: null,
      landing_page: null,
    };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const existingRaw = window.sessionStorage.getItem(UTM_STORAGE_KEY) || window.localStorage.getItem(UTM_STORAGE_KEY);
    const existing: Partial<UtmParams> = existingRaw ? JSON.parse(existingRaw) : {};

    const current: UtmParams = {
      utm_source: params.get('utm_source') || existing.utm_source || null,
      utm_medium: params.get('utm_medium') || existing.utm_medium || null,
      utm_campaign: params.get('utm_campaign') || existing.utm_campaign || null,
      utm_term: params.get('utm_term') || existing.utm_term || null,
      utm_content: params.get('utm_content') || existing.utm_content || null,
      referrer: existing.referrer || (document.referrer ? document.referrer : 'Direto'),
      landing_page: existing.landing_page || window.location.pathname,
    };

    const serialized = JSON.stringify(current);
    window.sessionStorage.setItem(UTM_STORAGE_KEY, serialized);
    window.localStorage.setItem(UTM_STORAGE_KEY, serialized);
    return current;
  } catch {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      referrer: null,
      landing_page: null,
    };
  }
}

export function getCapturedUtms(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      referrer: null,
      landing_page: null,
    };
  }
  return captureAndPersistUtms();
}

export type RunaAnalyticsEventName =
  | 'diagnostic_start'
  | 'diagnostic_step_progress'
  | 'diagnostic_abandon'
  | 'diagnostic_complete'
  | 'lead_created'
  | 'diagnostic_result_view'
  | 'whatsapp_click'
  | 'commercial_form_submit';

const PII_BLOCKED_KEYS = new Set([
  'name',
  'nome',
  'email',
  'phone',
  'telefone',
  'whatsapp',
  'cpf',
  'cnpj',
  'address',
  'message',
]);

function sanitizePayload(payload: Record<string, unknown> = {}): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (PII_BLOCKED_KEYS.has(key.toLowerCase())) {
      continue;
    }
    if (typeof value === 'string' && (value.includes('@') || /\d{8,}/.test(value))) {
      continue;
    }
    clean[key] = value;
  }
  return clean;
}

export function trackRunaEvent(
  eventName: RunaAnalyticsEventName,
  payload: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;

  const consent = getStoredConsent();
  const safePayload = sanitizePayload(payload);
  const utms = getCapturedUtms();

  const eventData = {
    event: eventName,
    ...safePayload,
    utm_source: utms.utm_source || 'direto',
    utm_medium: utms.utm_medium || 'organico',
    utm_campaign: utms.utm_campaign || 'institucional',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  if (!consent || consent.analytics) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, safePayload);
    }
  }

  if (consent?.marketing && typeof window.fbq === 'function') {
    if (eventName === 'whatsapp_click') {
      window.fbq('track', 'Contact', safePayload);
    } else if (eventName === 'lead_created' || eventName === 'commercial_form_submit') {
      window.fbq('track', 'Lead', safePayload);
    } else if (eventName === 'diagnostic_complete') {
      window.fbq('trackCustom', 'DiagnosticComplete', safePayload);
    } else {
      window.fbq('trackCustom', eventName, safePayload);
    }
  }
}

export function buildRunaWhatsAppUrl(customMessage?: string): string {
  const number = process.env.NEXT_PUBLIC_RUNA_WHATSAPP || '554584317910';
  const cleanNumber = number.replace(/\D/g, '');
  const defaultMsg =
    'Olá! Vim pelo site da RUNA e gostaria de conversar sobre soluções de marketing, tecnologia e automação para minha empresa.';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${cleanNumber}?text=${text}`;
}
