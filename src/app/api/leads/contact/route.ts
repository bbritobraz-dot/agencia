import { NextRequest, NextResponse } from 'next/server';
import { RUNA_SERVICES } from '@/config/services';
import {
  checkRateLimit,
  isValidEmail,
  sanitizeText,
} from '@/lib/security/rateLimiter';
import { createAdminServiceClient } from '@/lib/supabase/admin';
import { normalizePhoneBR } from '@/lib/utils/phone';

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateCheck = checkRateLimit(`contact_submit:${ip}`, 6, 60_000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Muitas tentativas em sequência. Aguarde alguns segundos e tente novamente.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) },
        }
      );
    }

    const body = await request.json();

    // Proteção Honeypot
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      return NextResponse.json({ error: 'Submissão inválida.' }, { status: 400 });
    }

    const name = sanitizeText(body.name, 120);
    const email = sanitizeText(body.email, 160).toLowerCase();
    const rawWhatsapp = sanitizeText(body.whatsapp || body.phone, 40);
    const whatsapp = normalizePhoneBR(rawWhatsapp);
    const company = sanitizeText(body.company, 140);
    const segment = sanitizeText(body.segment, 100) || null;
    const revenueRange = sanitizeText(body.revenue_range, 100) || null;
    const serviceInterest = sanitizeText(body.service_interest, 120) || 'Gestão de Tráfego Pago';
    const challengeSummary = sanitizeText(body.message, 1000);
    const privacyConsent = Boolean(body.privacy_consent);
    const marketingConsent = Boolean(body.marketing_consent);

    if (name.length < 2) {
      return NextResponse.json({ error: 'Informe seu nome completo.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
    }
    if (whatsapp.length < 12) {
      return NextResponse.json(
        { error: 'Informe um número de WhatsApp válido com DDD.' },
        { status: 400 }
      );
    }
    if (company.length < 2) {
      return NextResponse.json({ error: 'Informe o nome da sua empresa.' }, { status: 400 });
    }
    if (!privacyConsent) {
      return NextResponse.json(
        {
          error:
            'É necessário concordar com a Política de Privacidade (LGPD) para enviar a solicitação.',
        },
        { status: 400 }
      );
    }

    const matchedService =
      RUNA_SERVICES.find(
        (s) => s.slug === serviceInterest || s.title === serviceInterest
      ) || RUNA_SERVICES[0];

    const utms = body.utms || {};
    const utmSource = sanitizeText(utms.utm_source, 100) || null;
    const utmMedium = sanitizeText(utms.utm_medium, 100) || null;
    const utmCampaign = sanitizeText(utms.utm_campaign, 120) || null;
    const utmTerm = sanitizeText(utms.utm_term, 120) || null;
    const utmContent = sanitizeText(utms.utm_content, 120) || null;
    const referrer = sanitizeText(utms.referrer, 250) || null;
    const landingPage = sanitizeText(utms.landing_page, 180) || '/contato';

    const supabase = createAdminServiceClient();

    const { data: leadRecord, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: whatsapp,
        whatsapp,
        company,
        segment,
        revenue_range: revenueRange,
        stage_slug: 'novo_lead',
        commercial_status: 'Novo lead',
        lead_score: 65,
        maturity_level: 'Contato Comercial Direto',
        main_opportunities: challengeSummary
          ? [challengeSummary]
          : [`Interesse direto em ${matchedService.title}`],
        recommended_service: matchedService.title,
        recommended_services: [matchedService.title],
        source: 'Formulário Comercial',
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        referrer,
        landing_page: landingPage,
        privacy_consent: privacyConsent,
        marketing_consent: marketingConsent,
        consented_at: new Date().toISOString(),
        internal_notes: challengeSummary || null,
      })
      .select('id, stage_id')
      .single();

    if (leadError || !leadRecord) {
      return NextResponse.json(
        {
          error: `Erro ao registrar contato no Supabase: ${leadError?.message || 'Falha desconhecida'}`,
        },
        { status: 500 }
      );
    }

    await supabase.from('opportunities').insert({
      lead_id: leadRecord.id,
      stage_id: leadRecord.stage_id,
      stage_slug: 'novo_lead',
      title: `${company} — ${matchedService.title}`,
      service_slug: matchedService.slug,
      service_name: matchedService.title,
      probability: 30,
      status: 'open',
    });

    await supabase.from('lead_activities').insert({
      lead_id: leadRecord.id,
      actor_name: 'Sistema RUNA',
      activity_type: 'lead_created',
      to_stage: 'novo_lead',
      title: 'Lead criado via Formulário Comercial',
      description: challengeSummary
        ? `Interesse em ${matchedService.title}. Mensagem: "${challengeSummary}"`
        : `Solicitação comercial para ${matchedService.title}.`,
    });

    return NextResponse.json({
      success: true,
      leadId: leadRecord.id,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Erro interno ao enviar formulário comercial.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
