import crypto from 'crypto';

export interface MetaUserData {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
}

export interface MetaCustomData {
  currency?: string;
  value?: number;
  order_id?: string;
  lead_id?: string;
  content_name?: string;
  status?: string;
  [key: string]: unknown;
}

export interface MetaCapiEventPayload {
  eventName: string;
  eventId: string;
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: 'website' | 'system_generated' | 'chat' | 'other';
  userData: MetaUserData;
  customData?: MetaCustomData;
}

export interface MetaCapiResponse {
  success: boolean;
  eventsReceived?: number;
  fbtraceId?: string;
  error?: string;
  rawResponse?: unknown;
}

/**
 * Normaliza e gera SHA-256 para campos PII (e-mail, telefone, nome)
 * Conforme exigências da Meta:
 * - Email: trim, lowercase, SHA-256
 * - Phone: remover qualquer caractere não numérico, incluir DDI (ex: 5545...), SHA-256
 */
export function hashSha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim()).digest('hex');
}

export function normalizeAndHashEmail(email?: string | null): string | undefined {
  if (!email || !email.includes('@')) return undefined;
  return hashSha256(email.trim().toLowerCase());
}

export function normalizeAndHashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  const numbersOnly = phone.replace(/\D/g, '');
  if (numbersOnly.length < 10) return undefined;
  // Se não começar com 55 (Brasil), adiciona
  const fullPhone = numbersOnly.startsWith('55') ? numbersOnly : `55${numbersOnly}`;
  return hashSha256(fullPhone);
}

export function normalizeAndHashName(name?: string | null): { fn?: string; ln?: string } {
  if (!name || name.trim().length === 0) return {};
  const parts = name.trim().toLowerCase().split(/\s+/);
  const fn = parts[0] ? hashSha256(parts[0]) : undefined;
  const ln = parts.length > 1 ? hashSha256(parts.slice(1).join(' ')) : undefined;
  return { fn, ln };
}

/**
 * Envia um evento individual ou em lote para a Meta Conversions API (Graph API)
 */
export async function sendMetaCapiEvent(
  event: MetaCapiEventPayload
): Promise<MetaCapiResponse> {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '1696612548734206';
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const apiVersion = process.env.META_API_VERSION || 'v22.0';
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!accessToken) {
    console.warn('[Meta CAPI] META_CAPI_ACCESS_TOKEN não configurado. Evento não enviado.');
    return {
      success: false,
      error: 'META_CAPI_ACCESS_TOKEN não configurado no servidor.',
    };
  }

  const { fn, ln } = normalizeAndHashName(event.userData.firstName);
  const em = normalizeAndHashEmail(event.userData.email);
  const ph = normalizeAndHashPhone(event.userData.phone);

  const userPayload: Record<string, unknown> = {};
  if (em) userPayload.em = [em];
  if (ph) userPayload.ph = [ph];
  if (fn) userPayload.fn = [fn];
  if (ln) userPayload.ln = [ln];
  if (event.userData.clientIpAddress && event.userData.clientIpAddress !== 'unknown') {
    userPayload.client_ip_address = event.userData.clientIpAddress;
  }
  if (event.userData.clientUserAgent) {
    userPayload.client_user_agent = event.userData.clientUserAgent;
  }
  if (event.userData.fbp) {
    userPayload.fbp = event.userData.fbp;
  }
  if (event.userData.fbc) {
    userPayload.fbc = event.userData.fbc;
  }

  const eventTime = event.eventTime || Math.floor(Date.now() / 1000);
  const actionSource = event.actionSource || 'system_generated';

  const singleEvent: Record<string, unknown> = {
    event_name: event.eventName,
    event_time: eventTime,
    event_id: event.eventId,
    action_source: actionSource,
    user_data: userPayload,
  };

  if (event.eventSourceUrl) {
    singleEvent.event_source_url = event.eventSourceUrl;
  }

  if (event.customData) {
    singleEvent.custom_data = event.customData;
  }

  const requestBody: Record<string, unknown> = {
    data: [singleEvent],
  };

  if (testEventCode && testEventCode.trim().length > 0) {
    requestBody.test_event_code = testEventCode.trim();
  }

  const endpoint = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${encodeURIComponent(
    accessToken
  )}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage =
        result?.error?.message || `Erro HTTP ${response.status} ao enviar evento para Meta CAPI.`;
      console.error('[Meta CAPI Error]', result);
      return {
        success: false,
        error: errorMessage,
        rawResponse: result,
      };
    }

    return {
      success: true,
      eventsReceived: result.events_received,
      fbtraceId: result.fbtrace_id,
      rawResponse: result,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Falha na conexão de rede com a Meta Graph API.';
    console.error('[Meta CAPI Network Error]', err);
    return {
      success: false,
      error: message,
    };
  }
}
