/**
 * Normaliza números de telefone brasileiros para o formato E.164 numérico (55 + DDD + Número)
 * e gera links diretos para o WhatsApp com mensagem contextualizada.
 */
export function normalizePhoneBR(rawPhone: string): string {
  const digits = (rawPhone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55') && digits.length >= 12) {
    return digits;
  }
  return `55${digits}`;
}

export function formatPhoneDisplay(rawPhone: string): string {
  const digits = (rawPhone || '').replace(/\D/g, '');
  const local = digits.startsWith('55') && digits.length >= 12 ? digits.slice(2) : digits;
  if (local.length === 11) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  }
  if (local.length === 10) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  }
  return rawPhone;
}

export function buildLeadWhatsAppUrl(params: {
  whatsapp: string;
  leadName: string;
  companyName?: string | null;
  recommendedService?: string | null;
  overallScore?: number | null;
}): string {
  const normalized = normalizePhoneBR(params.whatsapp);
  const firstName = params.leadName.split(' ')[0] || params.leadName;
  const companyPart = params.companyName ? ` da *${params.companyName}*` : '';
  const scorePart =
    typeof params.overallScore === 'number' && params.overallScore > 0
      ? ` Vi aqui o resultado do seu Diagnóstico Digital (${params.overallScore}/100)`
      : ' Recebemos o seu contato pelo site da RUNA';
  const servicePart = params.recommendedService
    ? ` com foco em *${params.recommendedService}*.`
    : '.';

  const message = `Olá, ${firstName}! Tudo bem? Aqui é da equipe consultiva da RUNA.${scorePart}${companyPart}${servicePart} Podemos conversar sobre os próximos passos?`;

  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
