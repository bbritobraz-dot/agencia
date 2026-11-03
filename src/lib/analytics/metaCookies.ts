'use client';

/**
 * Utilitário robusto de captura de identificadores e cookies da Meta
 * Conforme especificações oficiais: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc
 */

export interface MetaTrackingParams {
  fbp: string | null;
  fbc: string | null;
  fbclid: string | null;
  landingUrl: string | null;
  referrer: string | null;
}

const FBCLID_STORAGE_KEY = 'runa_meta_fbclid_v1';
const FBC_STORAGE_KEY = 'runa_meta_fbc_v1';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Captura e persiste os cookies da Meta (_fbp, _fbc) e o parâmetro fbclid.
 * Quando fbclid está presente na URL, constrói e persiste _fbc no formato:
 * fb.1.<timestamp_ms>.<fbclid>
 */
export function captureAndPersistMetaParams(): MetaTrackingParams {
  if (typeof window === 'undefined') {
    return {
      fbp: null,
      fbc: null,
      fbclid: null,
      landingUrl: null,
      referrer: null,
    };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const currentFbclid = urlParams.get('fbclid');

    // 1. Persistência de fbclid durante toda a sessão de navegação do usuário
    if (currentFbclid && currentFbclid.trim().length > 0) {
      window.sessionStorage.setItem(FBCLID_STORAGE_KEY, currentFbclid.trim());
      // Constrói _fbc no formato documentado pela Meta caso não exista cookie oficial
      const creationTime = Date.now();
      const generatedFbc = `fb.1.${creationTime}.${currentFbclid.trim()}`;
      window.sessionStorage.setItem(FBC_STORAGE_KEY, generatedFbc);
    }

    const persistedFbclid =
      currentFbclid || window.sessionStorage.getItem(FBCLID_STORAGE_KEY) || null;

    // 2. Cookie _fbp (Meta Browser ID)
    const cookieFbp = getCookie('_fbp');

    // 3. Cookie _fbc (Meta Click ID)
    const cookieFbc =
      getCookie('_fbc') ||
      window.sessionStorage.getItem(FBC_STORAGE_KEY) ||
      (persistedFbclid ? `fb.1.${Date.now()}.${persistedFbclid}` : null);

    return {
      fbp: cookieFbp,
      fbc: cookieFbc,
      fbclid: persistedFbclid,
      landingUrl: window.location.href,
      referrer: document.referrer || null,
    };
  } catch {
    return {
      fbp: null,
      fbc: null,
      fbclid: null,
      landingUrl: null,
      referrer: null,
    };
  }
}
